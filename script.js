// --- 定义“掌握”的标准 ---
const MASTERY_THRESHOLD = 20;

// 【【【 V12 最终 AI 大脑：“专业措施库” (近 50 条) 】】】
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

// --- V12 智能 AI “大脑”：关键词地图 ---
const AI_SUGGESTION_DB = {
    '呼吸': 'calm', '心跳': 'calm', '紧张': 'calm', '发抖': 'calm', '身体': 'calm',
    '想太多': 'distract', '停不下来': 'distract', '胡思乱想': 'distract', 
    '担心': 'cognitive', '害怕': 'cognitive', '恐慌': 'cognitive',
    '难过': 'self_soothe', '悲伤': 'self_soothe', '累': 'self_soothe', '孤独': 'self_soothe'
};


document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 获取所有 HTML 元素 ---
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
    const suggestionDetailsPanel = document.getElementById('suggestion-details-panel');
    const copingFeedback = document.getElementById('coping-feedback');
    const satisfactionPanel = document.getElementById('satisfaction-panel');
    const solveYesButton = document.getElementById('solve-yes');
    const solveNoButton = document.getElementById('solve-no');

    const welcomeModal = document.getElementById('welcome-modal');
    const closeWelcomeButton = document.getElementById('close-welcome-button');
    const showInstructionsButton = document.getElementById('show-instructions');
    const calendarContainer = document.getElementById('calendar-container');
    
    const calendarDetailsModal = document.getElementById('calendar-details-modal');
    const calendarDetailsDate = document.getElementById('calendar-details-date');
    const calendarDetailsList = document.getElementById('calendar-details-list');
    const closeCalendarDetailsBtn = document.getElementById('close-calendar-details');

    // --- 2. 状态变量 ---
    let currentCodename = null;
    let userData = null;
    let currentItemIndex = null; 
    let isNewItem = false;
    let totalAiSuggestions = 0;
    let completedAiSuggestions = 0;
    // 记录最近一次用于生成 AI 建议的提示词，便于“需要新的建议”时复用
    let lastAiPrompt = '';

    // --- 3. 核心功能函数 ---

    function showWelcomeModal() {
        if (!localStorage.getItem('hasSeenWelcome')) {
            welcomeModal.showModal();
        }
    }

    function getRandomItems(arr, n) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    // 根据提示词或建议文本，推断所属类别
    function detectCategory(promptOrText) {
        const s = (promptOrText || '').toLowerCase();
        for (const keyword in AI_SUGGESTION_DB) {
            if (s.includes(keyword)) return AI_SUGGESTION_DB[keyword];
        }
        return null;
    }

    // 生成建议理由（降级时使用）
    function generateReason(text, prompt) {
        const category = detectCategory(prompt + ' ' + text);
        switch (category) {
            case 'calm':
                return '你的生理唤醒较高，此建议可帮助降低心率与紧张感，稳定当下。';
            case 'distract':
                return '你的思绪过度聚焦于担忧，转移注意力能打断反刍，缓解焦虑。';
            case 'cognitive':
                return '你可能陷入灾难化或绝对化思维，认知调整能让你更客观地看待情境。';
            case 'self_soothe':
                return '你需要安全感与自我关怀，感官舒缓能带来身心的放松与支持。';
            default:
                return '基于你的描述，这条建议能在短时间内提升掌控感，帮助缓解当前不适。';
        }
    }

    // 生成使用详解（降级时使用）
    function generateHowTo(text) {
        const s = (text || '').toLowerCase();
        if (s.includes('4-7-8') || s.includes('呼吸')) {
            return '坐直，吸气4秒、屏息7秒、呼气8秒，共5轮；以腹式呼吸为主，专注呼吸节奏。';
        }
        if (s.includes('5-4-3-2-1')) {
            return '环顾四周：看5样、摸4样、听3声、闻2味、尝1味；每一步都专注于真实感受。';
        }
        if (s.includes('倒数') || s.includes('计数')) {
            return '选择一个数字序列（如从100每次减7），口算并默念；持续1-3分钟直到思绪趋稳。';
        }
        if (s.includes('写') || s.includes('记录')) {
            return '拿起纸笔，写下当下位置和日期或担忧主题；把注意力转向纸面与手部动作。';
        }
        if (s.includes('音乐')) {
            return '播放一首熟悉的平静音乐，专注于某一种乐器的声音，至少持续1-2分钟。';
        }
        if (s.includes('伸展') || s.includes('拉伸') || s.includes('开合跳')) {
            return '选择温和的身体动作（拉伸或原地踏步），缓慢进行30-60秒，留意肌肉紧张与放松变化。';
        }
        if (s.includes('冷水') || s.includes('冰水')) {
            return '用冷水轻拍脸颊或手腕，或慢慢喝一口冰水，感受冰凉触感带来的稳定。';
        }
        if (s.includes('茶') || s.includes('护手霜')) {
            return '准备热茶或护手霜，缓慢饮用或涂抹并关注气味与触感，让感官带来安定。';
        }
        return '按照建议进行1-3分钟，放慢速度并专注当下的感受；若焦虑仍高，可再重复一次。';
    }

    /**
     * 【【【 V24：AI 日记分析引擎 】】】
     */
    function analyzeReflection(text, peak, final) {
        const lowerText = text.toLowerCase();
        let feedback = "";
        const improvement = peak - final;

        if (improvement >= 30) { 
            feedback = "太棒了！你的焦虑水平出现了显著下降，这正是**“习惯化”**发生的铁证。你的大脑正在学习这个情境是安全的。";
        } else if (final <= 20 && peak <= 30) { 
            feedback = "看起来这个任务对你来说已经比较轻松了。这说明你的舒适区正在扩大！也许下次我们可以尝试稍微难一点的挑战？";
        } else if (final > 50) { 
            feedback = "我注意到结束时你的焦虑感依然较强。这很不容易，但请记住：**你坚持下来了，没有逃跑**，这本身就是巨大的胜利。";
        } else {
            feedback = "你完成了一次标准的暴露练习。焦虑感的起伏是正常的，每一次坚持都在为你积累心理韧性。";
        }
        if (lowerText.includes("难") || lowerText.includes("怕") || lowerText.includes("恐怖")) {
            feedback += " 面对恐惧确实很难，但你刚才展现了非凡的勇气。";
        }
        if (lowerText.includes("开心") || lowerText.includes("棒") || lowerText.includes("成功")) {
            feedback += " 这种积极的感受是你的奖赏，请记住这一刻的成就感！";
        }
        if (lowerText.includes("身体") || lowerText.includes("心跳") || lowerText.includes("手抖")) {
            feedback += " 身体的反应只是‘假警报’，你刚才很好地与它们共处了。";
        }
        return feedback;
    }

    /**
     * 【【【 V12 重大升级：“智能随机” AI 逻辑 】】】
     */
    function getAiSuggestions(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        let suggestions = new Set(); 
        let matchedCategories = new Set();
        const targetQuantity = 3;

        for (const keyword in AI_SUGGESTION_DB) {
            if (lowerPrompt.includes(keyword)) {
                matchedCategories.add(AI_SUGGESTION_DB[keyword]);
            }
        }
        if (matchedCategories.size > 0) {
            let relevantSkills = [];
            matchedCategories.forEach(category => {
                if (MASTER_SKILLS_DB[category]) relevantSkills = relevantSkills.concat(MASTER_SKILLS_DB[category]);
            });
            getRandomItems(relevantSkills, 3).forEach(skill => suggestions.add(skill));
        }
        let otherSkills = [];
        ['calm', 'distract', 'cognitive', 'self_soothe'].forEach(category => {
            if (!matchedCategories.has(category)) otherSkills = otherSkills.concat(MASTER_SKILLS_DB[category]);
        });
        const needed = targetQuantity - suggestions.size;
        if (otherSkills.length > 0 && needed > 0) {
             getRandomItems(otherSkills, needed).forEach(skill => suggestions.add(skill));
        }
        if (suggestions.size < targetQuantity) {
            const allSkills = [].concat(...Object.values(MASTER_SKILLS_DB));
            const needed_final = targetQuantity - suggestions.size;
            getRandomItems(allSkills, needed_final).forEach(skill => { if(skill) suggestions.add(skill); });
        }
        return Array.from(suggestions).slice(0, targetQuantity);
    }

    // --- 后端接口：获取 AI 建议（带降级回退） ---
    async function fetchAiSuggestionsRemote(prompt) {
        try {
            const res = await fetch('/get-ai-suggestion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (!Array.isArray(data) || data.length === 0) throw new Error('Empty suggestions');
            // 规范化并最多取 3 条
            const normalized = data
                .filter(it => it && it.id && it.text)
                .map(it => ({
                    id: String(it.id),
                    text: String(it.text),
                    reason: (typeof it.reason === 'string' && it.reason.trim()) ? it.reason.trim() : generateReason(it.text, prompt),
                    howto: (typeof it.howto === 'string' && it.howto.trim()) ? it.howto.trim() : generateHowTo(it.text)
                }))
                .slice(0, 3);
            if (normalized.length === 0) throw new Error('Invalid suggestions');
            return normalized;
        } catch (err) {
            console.warn('AI 建议接口失败，降级使用本地库：', err);
            return null;
        }
    }

    // --- 后端接口：分析日记（带降级回退） ---
    async function fetchReflectionFeedbackRemote(text, peak, final) {
        try {
            const res = await fetch('/analyze-reflection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ peak, final, reflection: text })
            });
            const data = await res.json();
            if (data && typeof data.feedback === 'string' && data.feedback.trim().length > 0) {
                return data.feedback.trim();
            }
            throw new Error('Missing feedback');
        } catch (err) {
            console.warn('日记分析接口失败，使用本地引擎：', err);
            return null;
        }
    }

    function renderAiSuggestions(skills) {
        copingToolkit.innerHTML = ''; 
        copingInstructions.textContent = '请尝试完成 AI 生成的以下建议：'; 
        copingFeedback.className = ''; 
        copingFeedback.innerHTML = '';
        if (suggestionDetailsPanel) suggestionDetailsPanel.innerHTML = '';
        totalAiSuggestions = skills.length;
        completedAiSuggestions = 0;
        
        if (totalAiSuggestions === 0) {
            copingInstructions.textContent = 'AI 没有生成建议，请重试。';
            satisfactionPanel.style.display = 'none';
            return;
        }
        const details = [];
        skills.forEach(skill => {
            if (skill && skill.id && skill.text) { 
                const skillLi = document.createElement('li');
                skillLi.className = 'ai-suggestion';
                skillLi.innerHTML = `
                    <input type="checkbox" id="${skill.id}" data-skill="${skill.text}">
                    <label for="${skill.id}">${skill.text}</label>
                `;
                copingToolkit.appendChild(skillLi);
                const reason = skill.reason && skill.reason.trim() ? skill.reason.trim() : generateReason(skill.text, lastAiPrompt);
                const howto = skill.howto && skill.howto.trim() ? skill.howto.trim() : generateHowTo(skill.text);
                details.push(`
                    <div class="detail-entry">
                        <strong>${skill.text}</strong>
                        <p>理由：${reason}</p>
                        <p>使用详解：${howto}</p>
                    </div>
                `);
            }
        });
        if (suggestionDetailsPanel && details.length > 0) {
            suggestionDetailsPanel.innerHTML = details.join('');
        }
        satisfactionPanel.style.display = 'block';
        solveYesButton.disabled = true; 
        solveNoButton.disabled = true;
    }

    function handleSatisfaction(isSolved) {
        satisfactionPanel.style.display = 'none';
        copingFeedback.className = '';
        copingFeedback.innerHTML = '';
        copingToolkit.innerHTML = ''; 
        if (suggestionDetailsPanel) suggestionDetailsPanel.innerHTML = '';
        if (isSolved) {
            copingFeedback.innerHTML = "🎉 **太棒了！** 恭喜你克服了这次困境。";
            copingFeedback.className = 'show report-success';
            setTimeout(() => {
                copingFeedback.className = '';
                copingFeedback.innerHTML = '';
                copingInstructions.textContent = '请描述你现在的感受或困扰：';
            }, 3000);
        } else {
            copingFeedback.innerHTML = "♻️ 正在生成新建议...";
            copingFeedback.className = 'show';
            aiForm.dispatchEvent(new Event('submit', { bubbles: true })); 
        }
    }

    function login() {
        const codename = codenameInput.value.trim();
        if (codename.length === 0) { alert('请输入一个代号'); return; }
        currentCodename = codename;
        const storedData = localStorage.getItem(currentCodename);
        if (storedData) {
            userData = JSON.parse(storedData);
            if (!userData.itemCreationDates) userData.itemCreationDates = {}; 
        } else {
            userData = { ladder: [], itemCreationDates: {} };
        }
        loginView.style.display = 'none';
        appView.style.display = 'grid'; 
        welcomeMessage.textContent = `欢迎回来, ${currentCodename}!`;
        renderLadder();
        renderCalendar(); 
        showWelcomeModal(); 
    }
    
    function saveData() {
        if (currentCodename && userData) localStorage.setItem(currentCodename, JSON.stringify(userData));
    }

    function saveItemCreationDate(itemName) {
        const now = new Date();
        const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        if (!userData.itemCreationDates[todayKey]) { userData.itemCreationDates[todayKey] = []; }
        else if (!Array.isArray(userData.itemCreationDates[todayKey])) { userData.itemCreationDates[todayKey] = []; }
        userData.itemCreationDates[todayKey].push(itemName);
        saveData();
    }

    function showCalendarDetails(event, date, tasks) {
        calendarDetailsDate.textContent = date;
        calendarDetailsList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            calendarDetailsList.appendChild(li);
        });
        calendarDetailsModal.show(); 
        const rect = event.target.getBoundingClientRect();
        const modalRect = calendarDetailsModal.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        let left = rect.right + window.scrollX + 10; 
        if (left + modalRect.width > window.innerWidth) { left = rect.left + window.scrollX - modalRect.width - 10; }
        calendarDetailsModal.style.top = `${top}px`;
        calendarDetailsModal.style.left = `${left}px`;
    }

    function renderCalendar(year = new Date().getFullYear(), month = new Date().getMonth()) {
        calendarContainer.innerHTML = ''; 
        const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        const dayNames = ["日", "一", "二", "三", "四", "五", "六"]; 
        const firstDayOfMonth = new Date(year, month, 1).getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate(); 
        const titleRow = document.createElement('div');
        titleRow.style.gridColumn = '1 / 8';
        titleRow.style.textAlign = 'center';
        titleRow.style.paddingBottom = '5px';
        titleRow.innerHTML = `<h4>${year}年 ${monthNames[month]}</h4>`;
        calendarContainer.appendChild(titleRow);

        dayNames.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-day-header';
            header.textContent = day;
            calendarContainer.appendChild(header);
        });
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-date other-month';
            calendarContainer.appendChild(emptyDay);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.className = 'calendar-date current-month';
            const tasks = userData.itemCreationDates[dateStr];
            if (tasks && Array.isArray(tasks) && tasks.length > 0) {
                dayElement.classList.add('has-item-added');
                dayElement.title = `点击查看当日任务`;
                dayElement.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    showCalendarDetails(e, dateStr, tasks);
                });
            }
            calendarContainer.appendChild(dayElement);
        }
    }

    function handleAddItem(event) {
        event.preventDefault(); 
        const name = itemNameInput.value.trim(); 
        if (!name) { alert('请输入有效的情境名称'); return; }
        const isDuplicate = userData.ladder.some(item => item.name === name);
        if (isDuplicate) { alert(`错误：阶梯项 "${name}" 已经添加过了！`); return; }
        const newItem = { name: name, logs: [] };
        userData.ladder.push(newItem); 
        const newIndex = userData.ladder.length - 1;
        isNewItem = true; 
        saveItemCreationDate(name); 
        renderCalendar(); 
        logPractice(newIndex); 
        itemNameInput.value = '';
    }

    function sortLadder() {
        userData.ladder.sort((a, b) => {
            const peakA = a.logs.length > 0 ? a.logs[0].peak : 1000; 
            const peakB = b.logs.length > 0 ? b.logs[0].peak : 1000; 
            return peakA - peakB;
        });
    }

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

    function handleDeleteItem(index) {
        const item = userData.ladder[index];
        if (!item) return; 
        const isConfirmed = confirm(`你确定要删除阶梯项 "${item.name}" 吗？\n\n【警告】此操作不可撤销！`);
        if (isConfirmed) {
            const nameToDelete = item.name;
            userData.ladder.splice(index, 1);
            for (const date in userData.itemCreationDates) {
                if (Array.isArray(userData.itemCreationDates[date])) {
                    userData.itemCreationDates[date] = userData.itemCreationDates[date].filter(name => name !== nameToDelete);
                }
            }
            saveData();
            renderLadder();
            renderCalendar(); 
            reportContainer.className = 'report-box report-default';
            reportContainer.innerHTML = `<p>已删除条目：“${item.name}”</p>`;
        }
    }

    async function handleSudsSubmit(event) {
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
        
        let aiFeedbackText = "";
        if (!isNewItem) {
            // 优先使用后端 AI；失败则回退到本地分析
            reportContainer.className = 'report-box report-default';
            reportContainer.innerHTML = '<p>🤖 AI 正在为你的练习生成点评...</p>';
            const remoteFeedback = await fetchReflectionFeedbackRemote(reflection, peak, final);
            if (remoteFeedback) {
                aiFeedbackText = remoteFeedback;
            } else {
                aiFeedbackText = analyzeReflection(reflection, peak, final);
                // 提示用户已使用本地回退
                reportContainer.innerHTML = '<p>⚠️ AI 暂不可用，已使用本地分析生成点评。</p>';
            }
        }

        const newLog = { date: new Date().toLocaleString(), peak: peak, final: final, reflection: reflection, aiFeedback: aiFeedbackText };
        userData.ladder[currentItemIndex].logs.push(newLog);
        const wasNewItem = isNewItem;
        isNewItem = false;
        if (wasNewItem) { sortLadder(); }
        saveData();
        renderLadder(); 
        if (!wasNewItem) { generateReport(userData.ladder[currentItemIndex]); }
        else {
            reportContainer.className = 'report-box report-success'; 
            reportContainer.innerHTML = `<p>✅ 已成功添加并评估“${userData.ladder[currentItemIndex].name}”！</p>`;
        }
        sudsModal.close(); 
    }

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
                if (!reportContainer.className.includes('warning')) { reportContainer.className = 'report-box report-warning'; }
                reportHTML += `<p>💡 <strong>重要提示：</strong> 我们注意到你结束时的焦虑 (${lastLog.final}) 仍然很高。请一定记住“黄金法则”：<strong>尽量待在情境中，直到焦虑至少下降 50%</strong>！</p>`;
            } else if (lastLog.final <= (lastLog.peak / 2)) {
                 reportHTML += `<p>👍 <strong>练习有效：</strong> 你成功地将焦虑从 ${lastLog.peak} 降低到了 ${lastLog.final} (下降超过一半)，做得好！</p>`;
            } else {
                 reportHTML += `<p>👍 <strong>练习有效：：</strong> 你成功地将焦虑从 ${lastLog.peak} 降低到了 ${lastLog.final}，做得好！</p>`;
            }
            if (lastLog.peak >= 50) {
                reportHTML += `
                    <div class="coping-suggestion">
                        <p><strong>你的焦虑度较高 (${lastLog.peak})。</strong></p>
                        <p>这很艰难，但你坚持下来了。要不要现在向 AI 助手描述下感受，获取一些定制的应对技巧？</p>
                    </div>
                `;
            }
            if (lastLog.aiFeedback) {
                reportHTML += `<div class="ai-feedback-box"><div class="ai-feedback-text">${lastLog.aiFeedback}</div></div>`;
            }
        }
        reportContainer.innerHTML = reportHTML;

        // 生成报告后，同步在右侧的“你的 AI 建议”栏展示针对最新练习的建议
        if (logs.length > 0) {
            const latest = logs[logs.length - 1];
            let prompt = '';
            if (latest.reflection && latest.reflection.trim().length > 0) {
                prompt = latest.reflection.trim();
            } else {
                prompt = `我刚完成暴露练习，峰值 ${latest.peak}/100，结束时 ${latest.final}/100。请给我3个具体、可操作的应对技巧。`;
            }
            copingInstructions.textContent = '基于你刚才的练习，AI 为你生成了建议：';
            lastAiPrompt = prompt; // 记录最近一次用于生成建议的提示词，便于“需要新的建议”复用
            (async () => {
                const remote = await fetchAiSuggestionsRemote(prompt);
                if (remote) {
                    renderAiSuggestions(remote);
                } else {
                    const fallback = getAiSuggestions(prompt);
                    // 渲染时会自动生成理由与详解
                    renderAiSuggestions(fallback);
                    copingFeedback.innerHTML = '⚠️ AI 服务暂不可用，已使用本地建议库生成方案。';
                    copingFeedback.className = 'show';
                    setTimeout(() => { copingFeedback.className = ''; }, 3000);
                }
            })();
        }
    }

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
                if (latestLog.peak <= MASTERY_THRESHOLD && item.logs.length > 1) isMastered = true;
                displaySuds = latestLog.peak; 
            } else if (item.logs.length > 0) displaySuds = item.logs[0].peak;

            let logsSummaryHTML = '<div class="item-logs">';
            let historyHTML = `<div class="logs-history" id="history-${index}" style="display:none;">`; 
            if (item.logs.length > 0) {
                item.logs.slice().reverse().forEach((log, logIndex) => { 
                    historyHTML += `
                        <div class="log-entry">
                            <strong>日志 ${item.logs.length - logIndex} (${log.date})</strong>
                            <p>Peak: ${log.peak} | Final: ${log.final}</p>
                            ${log.reflection ? `<p class="log-reflection">“${log.reflection}”</p>` : ''}
                            ${log.aiFeedback ? `<p style="font-size:0.9em; color:#0d47a1; margin-top:5px;">🤖 AI: ${log.aiFeedback}</p>` : ''}
                        </div>
                    `;
                });
                logsSummaryHTML += `<p><strong>最新:</strong> ${latestLog.date} (峰: ${latestLog.peak}, 终: ${latestLog.final})</p>`;
                logsSummaryHTML += `
                    <button class="view-history-btn" data-target="history-${index}">
                        查看全部 ${item.logs.length} 条感悟
                    </button>
                `;
            } else logsSummaryHTML += '<p>暂无评估 (请点击记录)</p>';
            
            logsSummaryHTML += '</div>';
            historyHTML += '</div>';
            itemElement.className = isMastered ? 'ladder-item mastered' : 'ladder-item';
            itemElement.innerHTML = `<div class="item-header"><h4>${displaySuds} - ${item.name}</h4><div class="item-actions"><button class="log-button" data-index="${index}">记录练习</button><button class="delete-button" data-index="${index}">🗑️</button></div></div>${logsSummaryHTML} ${historyHTML}`;
            ladderContainer.appendChild(itemElement);
        });
    }

    // --- 4. 绑定事件监听器 ---
    loginButton.addEventListener('click', () => { login(); });
    addItemForm.addEventListener('submit', handleAddItem);
    sudsForm.addEventListener('submit', handleSudsSubmit);
    modalCancelButton.addEventListener('click', () => {
        if (isNewItem) { userData.ladder.pop(); }
        isNewItem = false; 
        sudsModal.close(); 
    });
    ladderContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('log-button')) {
            isNewItem = false; 
            const index = event.target.dataset.index;
            logPractice(parseInt(index));
        } else if (event.target.classList.contains('view-history-btn')) {
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
        } else if (event.target.classList.contains('delete-button')) {
            const index = event.target.dataset.index;
            handleDeleteItem(parseInt(index));
        }
    });
    solveYesButton.addEventListener('click', () => handleSatisfaction(true));
    solveNoButton.addEventListener('click', () => handleSatisfaction(false));
    // 从最新日志构造一个合理的默认提示词（当输入框为空时使用）
    function buildPromptFromLatestLog() {
        if (!userData || !Array.isArray(userData.ladder)) return null;
        let log = null;
        if (currentItemIndex !== null && userData.ladder[currentItemIndex] && userData.ladder[currentItemIndex].logs && userData.ladder[currentItemIndex].logs.length > 0) {
            const item = userData.ladder[currentItemIndex];
            log = item.logs[item.logs.length - 1];
        } else {
            for (const item of userData.ladder) {
                if (item.logs && item.logs.length > 0) {
                    log = item.logs[item.logs.length - 1];
                }
            }
        }
        if (!log) return null;
        if (log.reflection && log.reflection.trim().length > 0) return log.reflection.trim();
        return `我刚完成暴露练习，峰值 ${log.peak}/100，结束时 ${log.final}/100。请给我3个具体、可操作的应对技巧。`;
    }

    aiForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const inputPrompt = aiInput.value.trim();
        let prompt = inputPrompt || (lastAiPrompt ? lastAiPrompt.trim() : '');
        if (!prompt) {
            const fallbackPrompt = buildPromptFromLatestLog();
            prompt = fallbackPrompt || '我正在经历焦虑，请结合常见情境给出3个具体、可操作的应对技巧。';
        }
        // 记录使用过的提示词，供后续“需要新的建议”复用
        lastAiPrompt = prompt;
        aiSubmitButton.disabled = true;
        aiSubmitButton.textContent = 'AI 思考中...';
        copingInstructions.textContent = 'AI 正在为你生成专属建议...';
        copingToolkit.innerHTML = ''; 

        // 先尝试后端调用；失败则回退到本地库
        const remote = await fetchAiSuggestionsRemote(prompt);
        if (remote) {
            renderAiSuggestions(remote);
        } else {
            const fallback = getAiSuggestions(prompt);
            renderAiSuggestions(fallback);
            copingFeedback.innerHTML = '⚠️ AI 服务暂不可用，已使用本地建议库生成方案。';
            copingFeedback.className = 'show';
            setTimeout(() => { copingFeedback.className = ''; }, 3000);
        }

        aiSubmitButton.disabled = false;
        aiSubmitButton.textContent = '获取 AI 建议';
    });
    copingToolkit.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox' && event.target.checked) {
            completedAiSuggestions++; 
            event.target.disabled = true;
            if (completedAiSuggestions === totalAiSuggestions && totalAiSuggestions > 0) {
                solveYesButton.disabled = false;
                solveNoButton.disabled = false;
                copingFeedback.innerHTML = "✅ **3项已完成！** 请在下方进行最终评估。";
                copingFeedback.className = 'show';
            } else {
                copingFeedback.innerHTML = `✅ (${completedAiSuggestions}/${totalAiSuggestions}) 已完成一项！`;
                copingFeedback.className = 'show';
            }
            setTimeout(() => { if (completedAiSuggestions !== totalAiSuggestions) copingFeedback.className = ''; }, 2000);
        }
    });
    closeWelcomeButton.addEventListener('click', () => {
        localStorage.setItem('hasSeenWelcome', 'true');
        welcomeModal.close();
    });
    showInstructionsButton.addEventListener('click', () => { welcomeModal.showModal(); });
    closeCalendarDetailsBtn.addEventListener('click', () => { calendarDetailsModal.close(); });
    calendarDetailsModal.addEventListener('click', (e) => {
        const rect = calendarDetailsModal.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
            calendarDetailsModal.close();
        }
    });
});