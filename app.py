import os
import requests
import json
from flask import Flask, request, jsonify, send_file, send_from_directory 

app = Flask(__name__) 

# --- 1. 配置 API 密钥 (从文件读取) ---
try:
    with open('deepseek_key.txt', 'r') as f:
        DEEPSEEK_API_KEY = f.read().strip()
except FileNotFoundError:
    raise EnvironmentError("错误：未找到 'deepseek_key.txt' 文件。请创建此文件，并将 DeepSeek 密钥复制到其中。")

if not DEEPSEEK_API_KEY or not DEEPSEEK_API_KEY.startswith('sk-'):
    raise EnvironmentError("错误：deepseek_key.txt 中的密钥无效或为空。")

print("--- 2. 成功加载 API 密钥 ---")

DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions"

# --- 2. 定义 AI 指令 (SYSTEM PROMPTS) ---
SYSTEM_PROMPT_SUGGESTION = """
你是一个专业的心理咨询助手。请根据用户的描述，提供 3 个具体、可操作的应对技巧，并给出每条建议的【理由】与【使用详解】。

【必须返回 JSON 数组，数组元素为对象，且每个对象包含以下字段：id, text, reason, howto】
- id：唯一标识，例如 "skill-1"；
- text：建议本身，语言简洁；
- reason：给出这条建议的理由（20-40字，贴合用户描述，不要空话）；
- howto：具体使用步骤（30-80字，分句表达，避免列表符号）。

【不要返回 markdown；严格返回 JSON】
格式示例：
[
  {"id":"skill-1","text":"进行5次深呼吸","reason":"你的心率升高，呼吸法能降低生理唤醒","howto":"坐直，吸气4秒、屏息7秒、呼气8秒，共5轮；注意腹式呼吸。"},
  {"id":"skill-2","text":"喝一口冰水","reason":"冷刺激能带来即时的稳固感","howto":"缓慢喝下，专注喉咙的感觉，做3次，期间保持肩颈放松。"}
]
"""
SYSTEM_PROMPT_REFLECTION = """
你是一位温暖、富有同理心的认知行为疗法(CBT)教练。
用户刚刚完成了暴露练习。我会提供他的【焦虑峰值】(0-100)、【结束时焦虑】(0-100)以及他的【感悟】。
请根据这些数据和文字，给他一段简短的点评（100字以内）。
- 如果分数下降明显，请强调“习惯化”和他的勇气。
- 如果分数未下降，请鼓励他坚持，并解释这是正常的波动。
- 语气要像朋友一样支持和肯定。
"""

# --- 3. 路由：服务前端文件 ---
@app.route("/")
def serve_index():
    return send_file("index.html")

# 仅显式暴露必要的静态资源，避免泄露敏感文件
@app.route("/style.css")
def serve_style():
    return send_file("style.css")

@app.route("/script.js")
def serve_script():
    return send_file("script.js")


# --- 4. API 接口 A：获取建议 (JSON) ---
@app.route("/get-ai-suggestion", methods=["POST"])
def get_ai_suggestion():
    try:
        user_prompt = request.json.get("prompt")
        if not user_prompt: return jsonify({"error": "没有收到 prompt"}), 400

        headers = {"Authorization": f"Bearer {DEEPSEEK_API_KEY}", "Content-Type": "application/json"}
        payload = {
            "model": "deepseek-chat", 
            "messages": [ {"role": "system", "content": SYSTEM_PROMPT_SUGGESTION}, {"role": "user", "content": user_prompt} ],
            "response_format": { "type": "json_object" } 
        }

        response = requests.post("https://api.deepseek.com/chat/completions", headers=headers, json=payload, timeout=30) 
        response.raise_for_status() 
        content = response.json()["choices"][0]["message"]["content"]

        # 尝试解析为 JSON；并做兼容处理，确保返回为 [{id, text}, ...]
        try:
            parsed = json.loads(content)
        except Exception as parse_err:
            print(f"解析 AI 建议失败: {parse_err}. 原始内容片段: {content[:200]}")
            return jsonify({"error": "AI 返回格式异常"}), 502

        # 兼容对象/数组两种返回形式
        if isinstance(parsed, dict):
            candidates = None
            for key in ("skills", "suggestions", "items", "data"):
                if key in parsed and isinstance(parsed[key], list):
                    candidates = parsed[key]
                    break
            if candidates is None:
                candidates = []
        elif isinstance(parsed, list):
            candidates = parsed
        else:
            candidates = []

        # 规范化为 {id, text, reason, howto}
        normalized = []
        for i, item in enumerate(candidates):
            if isinstance(item, str):
                normalized.append({
                    "id": f"skill-{i+1}",
                    "text": item,
                    "reason": "这是一条常用的缓解策略，可帮助你稳定情绪。",
                    "howto": "按照建议进行1-3分钟，专注当下的感受，必要时重复一次。"
                })
            elif isinstance(item, dict):
                text = item.get("text") or item.get("content") or item.get("title") or ""
                _id = item.get("id") or item.get("ID") or item.get("name") or f"skill-{i+1}"
                reason = item.get("reason") or item.get("why") or item.get("rationale") or ""
                howto = item.get("howto") or item.get("how_to") or item.get("usage") or item.get("steps") or ""
                if text:
                    normalized.append({
                        "id": _id,
                        "text": text,
                        "reason": reason if isinstance(reason, str) and reason.strip() else "这是一条常用的缓解策略，可帮助你稳定情绪。",
                        "howto": howto if isinstance(howto, str) and howto.strip() else "按照建议进行1-3分钟，专注当下的感受，必要时重复一次。"
                    })

        if not normalized:
            return jsonify({"error": "AI 未生成建议"}), 502

        return jsonify(normalized)

    except Exception as e:
        print(f"建议生成失败: {e}")
        return jsonify({"error": "建议生成失败，请重试。"}), 500


# --- 5. API 接口 B：分析日记 (文本) ---
@app.route("/analyze-reflection", methods=["POST"])
def analyze_reflection():
    try:
        data = request.json
        user_input = (
            f"用户刚刚完成了暴露练习。数据如下：峰值焦虑 {data['peak']}/100，结束时焦虑 {data['final']}/100。"
            f"用户的感悟是：“{data['reflection']}”。请按照你教练的人设，用 100 字以内简短地给他点评。"
        )
        headers = {"Authorization": f"Bearer {DEEPSEEK_API_KEY}", "Content-Type": "application/json"}
        payload = {
            "model": "deepseek-chat", 
            "messages": [ {"role": "system", "content": SYSTEM_PROMPT_REFLECTION}, {"role": "user", "content": user_input} ]
        }

        response = requests.post("https://api.deepseek.com/chat/completions", headers=headers, json=payload, timeout=30) 
        response.raise_for_status() 

        feedback_text = response.json()["choices"][0]["message"]["content"]
        return jsonify({"feedback": feedback_text})

    except Exception as e:
        print(f"日记分析失败: {e}")
        return jsonify({"feedback": "你做得很棒！AI 暂时无法连接，请下次再试。"}), 200

# --- 6. 启动服务器 ---
if __name__ == "__main__":
    print("--- 3. 准备启动 Flask 服务器 ---")
    
    # 【【【 V22 修复：打印正确的可点击链接 】】】
    print("-" * 40)
    print("✅ 请在浏览器打开: http://127.0.0.1:5001/")
    print("-" * 40)
    
    app.run(host='0.0.0.0', port=5001, debug=True)