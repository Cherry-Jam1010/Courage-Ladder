// --- 定义“掌握”的标准 ---
const MASTERY_THRESHOLD = 20;

// --- 【【【【 V12 最终 AI 大脑：“专业措施库” (近 50 条) 】】】】 ---
const MASTER_SKILLS_DB = {
    // 1. 使身体平静 (Grounding & Calming)
    calm: [
        { id: 'ai-c1', text: '进行 5 次“4-7-8”呼吸 (吸4, 屏7, 呼8)' },
        { id: 'ai-c2', text: '使用 5-4-3-2-1 感知法 (看5样, 听4声...)' },
        { id: 'ai-c3', text: '喝一口冰水，并专注于它流过喉咙的感觉' },
        { id: 'ai-c4', text: '站起来，用力拉伸你的手臂和肩颈 30 秒' },
        { id: 'ai-c5', text: '用双手紧握拳头 5 秒，然后完全放松' },
        { id: 'ai-c6', text: '用冷水拍打你的脸颊或手腕' },
        { id: 'ai-c7', text: '双脚用力踩地，感受地面的坚实' },
        { id: 'ai-c8', text: '慢慢地转动你的脚踝和手腕' },
        { id: 'ai-c9', text: '找一个物体，只专注于它的纹理和温度' },
        { id: 'ai-c10', text: '如果可以，去洗个热水澡或泡手' }
    ],
    // 2. 转移注意力 (Distraction)
    distract: [
        { id: 'ai-d1', text: '从 100 倒数，每次减 7 (100, 93, 86...)' },
        { id: 'ai-d2', text: '找一种颜色 (比如蓝色)，列出房间里所有蓝色的物品' },
        { id: 'ai-d3', text: '按字母表顺序，A-Z，每个字母想一个动物 (A-Ant...)' },
        { id: 'ai-d4', text: '做一件简单的家务，比如擦桌子或叠衣服' },
        { id: 'ai-d5', text: '打开窗户，数一数你看到了多少辆车或多少棵树' },
        { id: 'ai-d6', text: '快速地做 10 个开合跳或原地踏步' },
        { id: 'ai-d7', text: '换个房间，或者如果可能的话，出去走 5 分钟' },
        { id: 'ai-d8', text: '在脑中“默写”一个你熟悉的名字或地址' },
        { id: 'ai-d9', text: '打开音乐，试着只听某一种乐器 (比如鼓声)' },
        { id: 'ai-d10', text: '看一个有趣的短视频 (限制5分钟)' },
        { id: 'ai-d11', text: '找一张纸，写下你现在的位置和今天的日期' },
        { id: 'ai-d12', text: '在 1 分钟内，尽可能多地想出“水果”的种类' }
    ],
    // 3. 调整想法 (Cognitive Reappraisal)
    cognitive: [
        { id: 'ai-r1', text: '对自己说：“这只是焦虑，它不是危险，它会过去的”' },
        { id: 'ai-r2', text: '问自己：“我担心的这个‘最坏情况’，发生的几率是100%吗？”' },
        { id: 'ai-r3', text: '回想一个你以前克服过的、类似的感觉' },
        { id: 'ai-r4', text: '把你的“担心”写下来，然后把它放到“半小时后再担心”的盒子里' },
        { id: 'ai-r5', text: '告诉自己：“我的感受是真实的，但我的想法不一定是事实”' },
        { id: 'ai-r6', text: '挑战这个想法：“有什么证据支持这个想法？有什么证据反对它？”' },
        { id: 'ai-r7', text: '如果你的朋友也这么想，你会对他说什么？' },
        { id: 'ai-r8', text: '专注于你“能”控制的，而不是你“不能”控制的' },
        { id: 'ai-r9', text: '这是一个“情绪脑”的反应，而不是“理智脑”' },
        { id: 'ai-r10', text: '这个焦虑的感觉会持续多久？它会永远持续吗？(不会)' }
    ],
    // 4. 感官舒缓 (Self-Soothe)
    self_soothe: [
        { id: 'ai-s1', text: '找一个柔软的东西（毛毯、宠物），触摸它' },
        { id: 'ai-s2', text: '泡一杯热茶（无咖啡因），慢慢喝下' },
        { id: 'ai-s3', text: '听一首你最喜欢的、平静的歌曲' },
        { id: 'ai-s4', text: '闻一闻让你舒服的味道（如薰衣草、咖啡豆）' },
        { id: 'ai-s5', text: '吃一小块你喜欢的食物（如黑巧克力），慢慢品尝' },
        { id: 'ai-s6', text: '用护手霜，并专注于涂抹它的感觉' },
        { id: 'ai-s7', text: '看一张你喜欢的照片或风景画' },
        { id: 'ai-s8', text: '轻轻地、缓慢地拍打你的手臂或大腿' },
        { id: 'ai-s9', text: '对自己说一句友善的话（例如：“你正在尽力”）' }
    ]
};

// --- 【【【【 V12 智能 AI “大脑”：关键词地图 】】】】 ---
const AI_SUGGESTION_DB = {
    // 关键词：建议类别
    '呼吸': 'calm',
    '心跳': 'calm',
    '紧张': 'calm',
    '发抖': 'calm',
    '身体': 'calm',
    '想太多': 'distract',
    '停不下来': 'distract',
    '胡思乱想': 'distract',
    '担心': 'cognitive',
    '害怕': 'cognitive',
    '恐慌': 'cognitive',
    '难过': 'self_soothe',
    '悲伤': 'self_soothe',
    '累': 'self_soothe',
    '孤独': 'self_soothe'
};


document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 获取所有 HTML 元素 ---
    // (V11 的所有元素保持不变)
    const loginView = document.getElementById('login-view');
    const codenameInput = document.getElementById('codename-input');
    const loginButton = document.getElementById('login-button');
    const appView = document.getElementById('app-view');
    const welcomeMessage = document.getElementById('welcome-message');
    const addItemForm = document.getElementById('add-item-form');
    const itemNameInput = document.getElementById('item-name');
    const ladderContainer = document.getElementById('ladder-container');
    const reportContainer = document.getElementById('report-container');
    const sudsModal = document.getElementById('suds-modal');
    const sudsForm = document.getElementById('suds-form');
    const modalTitle = document.getElementById('modal-title');
    const peakInputGroup = document.getElementById('peak-input-group');
    const finalInputGroup = document.getElementById('final-input-group');
    const peakSudsInput = document.getElementById('peak-suds');
    const finalSudsInput = document.getElementById('final-suds');
    const modalCancelButton = document.getElementById('modal-cancel-button');
    const reflectionGroup = document.getElementById('reflection-group');
    const reflectionTextInput = document.getElementById('reflection-text');
    const aiForm = document.getElementById('ai-form');
    const aiInput = document.getElementById('ai-input');
    const aiSubmitButton = document.getElementById('ai-submit-button');
    const copingInstructions = document.getElementById('coping-instructions');
    const copingToolkit = document.getElementById('coping-toolkit');
    const copingFeedback = document.getElementById('coping-feedback');

    // --- 2. 状态变量 --- (V11 保持不变)
    let currentCodename = null;
    let userData = null;
    let currentItemIndex = null; 
    let isNewItem = false;
    let totalAiSuggestions = 0;
    let completedAiSuggestions = 0;

    // --- 3. 核心功能函数 ---

    /**
     * 【【【【 随机洗牌并获取 N 个元素 】】】】
     */
    function getRandomItems(arr, n) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    /**
     * 【【【【 V12 重大升级：“智能随机” AI 逻辑 】】】】
     */
    function getAiSuggestions(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        let suggestions = new Set(); 
        let matchedCategories = new Set();

        for (const keyword in AI_SUGGESTION_DB) {
            if (lowerPrompt.includes(keyword)) {
                matchedCategories.add(AI_SUGGESTION_DB[keyword]);
            }
        }

        if (matchedCategories.size > 0) {
            let relevantSkills = [];
            matchedCategories.forEach(category => {
                if (MASTER_SKILLS_DB[category]) { 
                    relevantSkills = relevantSkills.concat(MASTER_SKILLS_DB[category]);
                }
            });
            getRandomItems(relevantSkills, 3).forEach(skill => suggestions.add(skill));
        }

        let otherSkills = [];
        ['calm', 'distract', 'cognitive', 'self_soothe'].forEach(category => {
            if (!matchedCategories.has(category)) {
                if (MASTER_SKILLS_DB[category]) { 
                    otherSkills = otherSkills.concat(MASTER_SKILLS_DB[category]);
                }
            }
        });
        
        const needed = 5 - suggestions.size;
        
        if (otherSkills.length > 0 && needed > 0) {
             getRandomItems(otherSkills, needed).forEach(skill => suggestions.add(skill));
        }

        if (suggestions.size < 5) {
            const allSkills = [].concat(...Object.values(MASTER_SKILLS_DB));
            const needed_final = 5 - suggestions.size;
            getRandomItems(allSkills, needed_final).forEach(skill => {
                if(skill) suggestions.add(skill); 
            });
        }
        return Array.from(suggestions).slice(0, 5);
    }


    /**
     * 【【【 渲染 AI 建议 】】】
     */
    function renderAiSuggestions(skills) {
        copingToolkit.innerHTML = ''; 
        copingInstructions.textContent = '请尝试完成 AI 生成的以下建议：'; 
        copingFeedback.className = ''; 
        copingFeedback.innerHTML = '';

        totalAiSuggestions = skills.length;
        completedAiSuggestions = 0;
        
        if (totalAiSuggestions === 0) {
            copingInstructions.textContent = 'AI 没有生成建议，请重试。';
            return;
        }

        skills.forEach(skill => {
            if (skill && skill.id && skill.text) { 
                const skillLi = document.createElement('li');
                skillLi.className = 'ai-suggestion';
                skillLi.innerHTML = `
                    <input type="checkbox" id="${skill.id}" data-skill="${skill.text}">
                    <label for="${skill.id}">${skill.text}</label>
                `;
                copingToolkit.appendChild(skillLi);
            }
        });
    }

    
    /**
     * 登录
     */
    function login() {
        const codename = codenameInput.value.trim();
        if (codename.length === 0) { alert('请输入一个代号'); return; }
        currentCodename = codename;
        const storedData = localStorage.getItem(currentCodename);
        if (storedData) {
            userData = JSON.parse(storedData);
        } else {
            userData = { ladder: [] };
        }
        
        loginView.style.display = 'none';
        appView.style.display = 'grid'; 
        welcomeMessage.textContent = `欢迎回来, ${currentCodename}!`;
        renderLadder();
    }
    
    /**
     * 保存数据
     */
    function saveData() {
        if (currentCodename && userData) {
            localStorage.setItem(currentCodename, JSON.stringify(userData));
        }
    }

    /**
     * 【【【【 V14 最终升级：添加“查重”功能 】】】】
     */
    function handleAddItem(event) {
        event.preventDefault(); 
        const name = itemNameInput.value.trim(); // 1. 清除首尾空格

        // 2. 检查是否为空
        if (!name) { 
            alert('请输入有效的情境名称');
            return;
        }

        // 3. 【【【【 查重逻辑 】】】】
        // 检查 userData.ladder 数组中，是否“有” (some) 任何一个 item 的 name
        // 和我们新输入的 name 完全相同
        const isDuplicate = userData.ladder.some(item => item.name === name);

        if (isDuplicate) {
            // 4. 如果重复，报错并停止
            alert(`错误：阶梯项 "${name}" 已经添加过了！`);
            return; // 停止函数，不执行后续添加
        }
        
        // 5. 如果一切正常（不为空，不重复），则添加
        const newItem = { name: name, logs: [] };
        userData.ladder.push(newItem); 
        const newIndex = userData.ladder.length - 1;
        isNewItem = true; 
        logPractice(newIndex); 
        itemNameInput.value = '';
    }

    /**
     * 排序阶梯（按初始评估）
     */
    function sortLadder() {
        userData.ladder.sort((a, b) => {
            const peakA = a.logs.length > 0 ? a.logs[0].peak : 1000; 
            const peakB = b.logs.length > 0 ? b.logs[0].peak : 1000; 
            return peakA - peakB;
        });
    }

    /**
     * 打开“记录”模态框
     */
    function logPractice(itemIndex) {
        currentItemIndex = itemIndex; 
        const item = userData.ladder[itemIndex];
        sudsForm.reset(); 
        reflectionTextInput.value = ''; 

        if (isNewItem) {
            modalTitle.textContent = `评估 "${item.name}" 的难度`;
            peakInputGroup.style.display = 'block';
            finalInputGroup.style.display = 'none'; 
            reflectionGroup.style.display = 'none'; 
            peakSudsInput.labels[0].textContent = "你【预估】的焦虑【峰值】 (0-10):";
            finalSudsInput.required = false; 
        } else {
            modalTitle.textContent = `记录 "${item.name}" 的练习`;
            peakInputGroup.style.display = 'block';
            finalInputGroup.style.display = 'block'; 
            reflectionGroup.style.display = 'block'; 
            peakSudsInput.labels[0].textContent = "【峰值】焦虑 (0-10):";
            finalSudsInput.required = true; 
        }
        sudsModal.showModal(); 
    }

    /**
     * 处理“记录”模态框的提交（保存感悟）
     */
    function handleSudsSubmit(event) {
        event.preventDefault(); 
        const peak = parseInt(peakSudsInput.value) * 10;
        let final;
        let reflection = reflectionTextInput.value.trim(); 

        if (isNewItem) {
            final = peak; 
            reflection = "初始评估"; 
        } else {
            final = parseInt(finalSudsInput.value) * 10;
        }
        
        if (isNaN(peak)) { alert("请输入有效的【峰值】数字。"); return; }
        if (!isNewItem && isNaN(final)) { alert("请输入有效的【结束时】数字。"); return; }
        if (!isNewItem && final > peak) { alert("提示：结束时的焦虑分数不应高于峰值分数。"); return; }

        const newLog = {
            date: new Date().toLocaleString(),
            peak: peak,
            final: final,
            reflection: reflection 
        };

        userData.ladder[currentItemIndex].logs.push(newLog);
        const wasNewItem = isNewItem;
        isNewItem = false;
        
        if (wasNewItem) {
            sortLadder(); 
        }
        saveData();
        renderLadder(); 
        
        if (!wasNewItem) {
            generateReport(userData.ladder[currentItemIndex]);
        } else {
            reportContainer.className = 'report-box report-success'; 
            reportContainer.innerHTML = `<p>✅ 已成功添加并评估“${userData.ladder[currentItemIndex].name}”！</p>`;
        }
        sudsModal.close(); 
    }

    /**
     * 【【【【 V13 新增：处理删除阶梯项的函数 】】】】
     */
    function handleDeleteItem(index) {
        const item = userData.ladder[index];
        if (!item) return; // 安全检查

        // 弹出确认框
        const isConfirmed = confirm(`你确定要删除阶梯项 "${item.name}" 吗？\n\n【警告】此操作不可撤销，所有 ${item.logs.length} 条日志将一同删除！`);

        if (isConfirmed) {
            userData.ladder.splice(index, 1);
            saveData();
            renderLadder();
            reportContainer.className = 'report-box report-default';
            reportContainer.innerHTML = `<p>已删除条目：“${item.name}”</p>`;
        }
    }


    /**
     * 生成智能报告（带峰值检测）
     */
    function generateReport(item) {
        const logs = item.logs;
        let reportHTML = `<h4>"${item.name}" 的分析:</h4>`;
        if (logs.length === 0) {
            reportContainer.className = 'report-box report-default'; 
            reportHTML += "<p>你还没有该项的练习记录。</p>";
        } else if (logs.length === 1) {
            const firstLog = logs[0];
            reportContainer.className = 'report-box report-success'; 
            reportHTML += `<p>这是你的第一次评估！你预估的峰值焦虑为 ${firstLog.peak}。请点击“记录练习”按钮开始你的第一次挑战！</p>`;
        } else {
            const lastLog = logs[logs.length - 1];
            const prevLog = logs[logs.length - 2];
            if (lastLog.peak < prevLog.peak) {
                reportContainer.className = 'report-box report-success'; 
                reportHTML += `<p>✅ <strong>进展喜人！</strong> 你的峰值焦虑从 ${prevLog.peak} <strong>下降到了 ${lastLog.peak}</strong>！</p>`;
            } else {
                reportContainer.className = 'report-box report-warning'; 
                reportHTML += `<p>⚠️ <strong>进展平稳！</strong> 你的峰值焦虑 (${lastLog.peak}) 没有下降。这<strong>完全正常</strong>，重要的是你坚持了练习！</p>`;
            }
            if (lastLog.final > (lastLog.peak / 2) && lastLog.peak > 20) {
                if (!reportContainer.className.includes('warning')) { 
                     reportContainer.className = 'report-box report-warning';
                }
                reportHTML += `<p>💡 <strong>重要提示：</strong> 我们注意到你结束时的焦虑 (${lastLog.final}) 仍然很高。请一定记住“黄金法则”：<strong>尽量待在情境中，直到焦虑至少下降 50%</strong>！</p>`;
            } else if (lastLog.final <= (lastLog.peak / 2)) {
                 reportHTML += `<p>👍 <strong>练习有效：</strong> 你成功地将焦虑从 ${lastLog.peak} 降低到了 ${lastLog.final} (下降超过一半)，做得好！</p>`;
            } else {
                 reportHTML += `<p>👍 <strong>练习有效：</strong> 你成功地将焦虑从 ${lastLog.peak} 降低到了 ${lastLog.final}，做得好！</p>`;
            }
            if (lastLog.peak >= 50) {
                reportHTML += `
                    <div class="coping-suggestion">
                        <p><strong>你的焦虑度较高 (${lastLog.peak})。</strong></p>
                        <p>这很艰难，但你坚持下来了。要不要现在向 AI 助手描述下感受，获取一些定制的应对技巧？</p>
                    </div>
                `;
            }
        }
        reportContainer.innerHTML = reportHTML;
    }


    /**
     * 【【【【 V13 升级：渲染“删除”按钮 】】】】
     */
    function renderLadder() {
        ladderContainer.innerHTML = '';
        if (userData.ladder.length === 0) {
            ladderContainer.innerHTML = '<p>你的阶梯还是空的，请从上方添加条目。</p>';
            return;
        }

        userData.ladder.forEach((item, index) => {
            const itemElement = document.createElement('div');
            const latestLog = item.logs.length > 0 ? item.logs[item.logs.length - 1] : null;
            let isMastered = false;
            let displaySuds = "N/A"; 
            
            if (latestLog) {
                if (latestLog.peak <= MASTERY_THRESHOLD && item.logs.length > 1) { 
                    isMastered = true;
                }
                displaySuds = latestLog.peak; 
            } else if (item.logs.length > 0) { 
                 displaySuds = item.logs[0].peak;
            }

            let logsSummaryHTML = '<div class="item-logs">';
            let historyHTML = `<div class="logs-history" id="history-${index}" style="display:none;">`; 

            if (item.logs.length > 0) {
                item.logs.slice().reverse().forEach((log, logIndex) => { 
                    historyHTML += `
                        <div class="log-entry">
                            <strong>日志 ${item.logs.length - logIndex} (${log.date})</strong>
                            <p>Peak: ${log.peak} | Final: ${log.final}</p>
                            ${log.reflection ? `<p class="log-reflection">“${log.reflection}”</p>` : ''}
                        </div>
                    `;
                });
                logsSummaryHTML += `<p><strong>最新:</strong> ${latestLog.date} (峰: ${latestLog.peak}, 终: ${latestLog.final})</p>`;
                logsSummaryHTML += `
                    <button class="view-history-btn" data-target="history-${index}">
                        查看全部 ${item.logs.length} 条感悟
                    </button>
                `;
            } else {
                logsSummaryHTML += '<p>暂无评估 (请点击记录)</p>';
            }
            logsSummaryHTML += '</div>';
            historyHTML += '</div>';
            itemElement.className = isMastered ? 'ladder-item mastered' : 'ladder-item';
            
            itemElement.innerHTML = `
                <div class="item-header">
                    <h4>${displaySuds} - ${item.name}</h4>
                    <div class="item-actions">
                        <button class="log-button" data-index="${index}">记录练习</button>
                        <button class="delete-button" data-index="${index}">🗑️</button>
                    </div>
                </div>
                ${logsSummaryHTML}
                ${historyHTML}
            `;
            ladderContainer.appendChild(itemElement);
        });
    }


    // --- 4. 绑定事件监听器 ---

    loginButton.addEventListener('click', login);
    addItemForm.addEventListener('submit', handleAddItem);
    sudsForm.addEventListener('submit', handleSudsSubmit);

    modalCancelButton.addEventListener('click', () => {
        if (isNewItem) { userData.ladder.pop(); }
        isNewItem = false; 
        sudsModal.close(); 
    });
    
    // 【【【【 V13 升级：主事件监听器，添加“删除”逻辑 】】】】
    ladderContainer.addEventListener('click', (event) => {
        
        // 检查是否点击了“记录”按钮
        if (event.target.classList.contains('log-button')) {
            isNewItem = false; 
            const index = event.target.dataset.index;
            logPractice(parseInt(index));
        }
        // 检查是否点击了“查看感悟”按钮
        else if (event.target.classList.contains('view-history-btn')) {
            const targetId = event.target.dataset.target;
            const historyDiv = document.getElementById(targetId);
            if (historyDiv) {
                if (historyDiv.style.display === 'none' || historyDiv.style.display === '') {
                    historyDiv.style.display = 'block';
                    event.target.textContent = '收起感悟';
                } else {
                    historyDiv.style.display = 'none';
                    event.target.textContent = `查看全部 ${historyDiv.children.length} 条感悟`;
                }
            }
        }
        // 【【【 全新：检查是否点击了“删除”按钮 】】】
        else if (event.target.classList.contains('delete-button')) {
            const index = event.target.dataset.index;
            handleDeleteItem(parseInt(index));
        }
    });

    /**
     * 【【【 V12 智能随机 AI 事件监听器 】】】
     */
    aiForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const prompt = aiInput.value;
        if (!prompt) return;

        aiSubmitButton.disabled = true;
        aiSubmitButton.textContent = 'AI 思考中...';
        copingInstructions.textContent = 'AI 正在为你生成专属建议...';
        copingToolkit.innerHTML = ''; 

        setTimeout(() => {
            const suggestions = getAiSuggestions(prompt); 
            renderAiSuggestions(suggestions);
            aiSubmitButton.disabled = false;
            aiSubmitButton.textContent = '获取 AI 建议';
        }, 1000); 
    });


    /**
     * 【【【 V11 “应对工具箱”监听器，实现“全部完成” 】】】
     */
    copingToolkit.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox' && event.target.checked) {
            
            completedAiSuggestions++; 
            event.target.disabled = true;

            if (completedAiSuggestions === totalAiSuggestions && totalAiSuggestions > 0) {
                copingFeedback.innerHTML = `⭐ <strong>你做的很棒！</strong> 已全部完成！`;
                copingFeedback.className = 'show'; 
            } else {
                copingFeedback.innerHTML = `✅ (${completedAiSuggestions}/${totalAiSuggestions}) 已完成一项！`;
                copingFeedback.className = 'show';
            }

            setTimeout(() => {
                copingFeedback.className = '';
            }, 2000);
        }
    });

});