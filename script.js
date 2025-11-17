// 【【【【 新增：定义“掌握”的标准 】】】】
// 当峰值焦虑低于或等于 20 时，我们认为该步骤“已掌握”
const MASTERY_THRESHOLD = 20;


// 【“专业措施库”】
const MASTER_SKILLS = [
    { id: 'cope-breath', type: 'calm', text: '5次深呼吸 (吸4秒, 屏4秒, 呼6秒)' },
    { id: 'cope-grounding', type: 'calm', text: '5-4-3-2-1 感知法 (看5样, 听4声...)' },
    { id: 'cope-water', type: 'calm', text: '喝一口冷水，感受它流下喉咙' },
    { id: 'cope-stretch', type: 'calm', text: '站起来，拉伸肩颈 30 秒' },
    { id: 'cope-distract-count', type: 'distract', text: '从100倒数，每次减7 (100, 93, 86...)' },
    { id: 'cope-distract-object', type: 'distract', text: '找一种颜色，列出房间里所有该颜色的物品' },
    { id: 'cope-thought', type: 'cognitive', text: '对自己说：“这只是焦虑，它会过去的”' },
    { id: 'cope-future', type: 'cognitive', text: '想一件1小时后要做的、具体的、简单的小事' }
];


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
    
    // 【【【【 新增：获取“感悟”输入框 】】】】
    const reflectionGroup = document.getElementById('reflection-group');
    const reflectionTextInput = document.getElementById('reflection-text');

    // (应对工具箱)
    const copingToolkit = document.getElementById('coping-toolkit');
    const copingFeedback = document.getElementById('coping-feedback');


    // --- 2. 状态变量 ---
    let currentCodename = null;
    let userData = null;
    let currentItemIndex = null; 
    let isNewItem = false;       

    // --- 3. 核心功能函数 ---

    /**
     * 【【【【 新增：动态渲染工具箱 】】】】
     */
    function renderCopingToolkit() {
        copingToolkit.innerHTML = ''; 

        const categories = {
            calm: '🧘‍♀️ 使身体平静',
            distract: '🧠 转移注意力',
            cognitive: '💡 调整想法'
        };

        ['calm', 'distract', 'cognitive'].forEach(categoryKey => {
            
            const categoryLi = document.createElement('li');
            categoryLi.innerHTML = `<label class="coping-category-label">${categories[categoryKey]}</label>`;
            copingToolkit.appendChild(categoryLi);

            MASTER_SKILLS.filter(skill => skill.type === categoryKey)
                         .forEach(skill => {
                const skillLi = document.createElement('li');
                skillLi.innerHTML = `
                    <input type="checkbox" id="${skill.id}" data-skill="${skill.text}">
                    <label for="${skill.id}">${skill.text}</label>
                `;
                copingToolkit.appendChild(skillLi);
            });
        });
    }


    /**
     * 【【【【 修改：登录时填充工具箱 】】】】
     */
    function login() {
        const codename = codenameInput.value.trim();
        if (codename.length === 0) {
            alert('请输入一个代号');
            return;
        }
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
        
        renderCopingToolkit(); // 【【【 新增调用 】】】
        renderLadder();
    }
    
    function saveData() {
        if (currentCodename && userData) {
            localStorage.setItem(currentCodename, JSON.stringify(userData));
        }
    }

    function handleAddItem(event) {
        event.preventDefault(); 
        const name = itemNameInput.value;
        if (name) {
            const newItem = { name: name, logs: [] };
            userData.ladder.push(newItem); 
            const newIndex = userData.ladder.length - 1;
            isNewItem = true; 
            logPractice(newIndex); 
            itemNameInput.value = '';
        } else {
            alert('请输入有效的情境名称');
        }
    }

    function sortLadder() {
        // 按“初始评估”的峰值排序
        userData.ladder.sort((a, b) => {
            const peakA = a.logs.length > 0 ? a.logs[0].peak : 1000; 
            const peakB = b.logs.length > 0 ? b.logs[0].peak : 1000; 
            return peakA - peakB;
        });
    }

    /**
     * 【【【【 V10 升级：隐藏/显示“感悟”框 】】】】
     */
    function logPractice(itemIndex) {
        currentItemIndex = itemIndex; 
        const item = userData.ladder[itemIndex];
        sudsForm.reset(); 
        reflectionTextInput.value = ''; 

        if (isNewItem) {
            // “添加新条目” 流程
            modalTitle.textContent = `评估 "${item.name}" 的难度`;
            peakInputGroup.style.display = 'block';
            finalInputGroup.style.display = 'none'; 
            reflectionGroup.style.display = 'none'; // 【新】隐藏“感悟”
            peakSudsInput.labels[0].textContent = "你【预估】的焦虑【峰值】 (0-10):";
            finalSudsInput.required = false; 
        } else {
            // “记录练习” 流程
            modalTitle.textContent = `记录 "${item.name}" 的练习`;
            peakInputGroup.style.display = 'block';
            finalInputGroup.style.display = 'block'; 
            reflectionGroup.style.display = 'block'; // 【新】显示“感悟”
            peakSudsInput.labels[0].textContent = "【峰值】焦虑 (0-10):";
            finalSudsInput.required = true; 
        }
        sudsModal.showModal(); 
    }

    /**
     * 【【【【 V10 升级：保存“感悟” 】】】】
     */
    function handleSudsSubmit(event) {
        event.preventDefault(); 
        const peak = parseInt(peakSudsInput.value) * 10;
        let final;
        let reflection = reflectionTextInput.value.trim(); // 【新】获取“感悟”

        if (isNewItem) {
            final = peak; 
            reflection = "初始评估"; // 【新】给初始评估一个默认感悟
        } else {
            final = parseInt(finalSudsInput.value) * 10;
        }
        
        if (isNaN(peak)) {
             alert("请输入有效的【峰值】数字。"); return;
        }
        if (!isNewItem && isNaN(final)) {
             alert("请输入有效的【结束时】数字。"); return;
        }
        if (!isNewItem && final > peak) {
            alert("提示：结束时的焦虑分数不应高于峰值分数。"); return;
        }

        const newLog = {
            date: new Date().toLocaleString(),
            peak: peak,
            final: final,
            reflection: reflection // 【【【 新增 】】】
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
     * 【【【【 V9 升级：智能报告 】】】】
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
                        <p>这很艰难，但你坚持下来了。要不要现在尝试一下右侧“应对工具箱”中的一个技巧来帮助自己平复？</p>
                    </div>
                `;
            }
        }
        reportContainer.innerHTML = reportHTML;
    }


    /**
     * 【【【【 V10 重大升级：渲染“可点击”的日志 】】】】
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

            // 【【【 新增：生成“日志摘要”和“完整历史”的 HTML 】】】
            
            let logsSummaryHTML = '<div class="item-logs">';
            let historyHTML = `<div class="logs-history" id="history-${index}" style="display:none;">`; // 默认内联隐藏

            if (item.logs.length > 0) {
                // 1. 生成完整的、可点击的“感悟”历史
                item.logs.slice().reverse().forEach((log, logIndex) => { // .slice().reverse() 让最新的在最上面
                    historyHTML += `
                        <div class="log-entry">
                            <strong>日志 ${item.logs.length - logIndex} (${log.date})</strong>
                            <p>Peak: ${log.peak} | Final: ${log.final}</p>
                            ${log.reflection ? `<p class="log-reflection">“${log.reflection}”</p>` : ''}
                        </div>
                    `;
                });

                // 2. 生成摘要（只显示最新日志）
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


            // 设置阶梯项的 class
            itemElement.className = isMastered ? 'ladder-item mastered' : 'ladder-item';
            
            // 组合最终的 HTML
            itemElement.innerHTML = `
                <div class="item-header">
                    <h4>${displaySuds} - ${item.name}</h4>
                    <button class="log-button" data-index="${index}">记录练习</button>
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
        if (isNewItem) {
            userData.ladder.pop();
        }
        isNewItem = false; 
        sudsModal.close(); 
    });
    
    // 【【【【 V10 升级：事件监听器 】】】】
    ladderContainer.addEventListener('click', (event) => {
        
        // 1. 用户点击了“记录练习”按钮
        if (event.target.classList.contains('log-button')) {
            isNewItem = false; 
            const index = event.target.dataset.index;
            logPractice(parseInt(index));
        }

        // 2. 【【【 全新：用户点击了“查看感悟”按钮 】】】
        if (event.target.classList.contains('view-history-btn')) {
            const targetId = event.target.dataset.target;
            const historyDiv = document.getElementById(targetId);
            
            if (historyDiv) {
                // 切换显示状态
                if (historyDiv.style.display === 'none' || historyDiv.style.display === '') {
                    historyDiv.style.display = 'block';
                    event.target.textContent = '收起感悟'; // 更改按钮文字
                } else {
                    historyDiv.style.display = 'none';
                    // 从 historyDiv 的子元素数量（条目数）来恢复按钮文字
                    event.target.textContent = `查看全部 ${historyDiv.children.length} 条感悟`;
                }
            }
        }
    });

    // (应对工具箱的监听器)
    copingToolkit.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox' && event.target.checked) {
            
            const skillName = event.target.dataset.skill;
            const checkbox = event.target;

            copingFeedback.innerHTML = `⭐ <strong>你做的很棒！</strong> 已完成“${skillName}”`;
            copingFeedback.className = 'show'; 

            setTimeout(() => {
                copingFeedback.className = '';
            }, 2000);

            setTimeout(() => {
                checkbox.checked = false;
            }, 1000);
        }
    });

});