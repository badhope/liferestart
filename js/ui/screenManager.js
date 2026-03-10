/**
 * 屏幕管理系统
 * 处理游戏各界面之间的切换和交互
 */

class ScreenManager {
    /**
     * 创建屏幕管理器实例
     */
    constructor() {
        this.currentScreen = 'title-screen';
        this.screens = {};
        this.transitioning = false;
        
        // 初始化所有屏幕元素
        this.initScreens();
        
        // 绑定事件
        this.bindEvents();
    }

    /**
     * 初始化所有屏幕
     */
    initScreens() {
        const screenElements = document.querySelectorAll('.screen');
        
        screenElements.forEach(screen => {
            this.screens[screen.id] = screen;
        });
    }

    /**
     * 切换屏幕
     * @param {string} screenId - 屏幕ID
     * @param {Function} callback - 切换后的回调
     */
    showScreen(screenId, callback) {
        if (this.transitioning) return;
        if (!this.screens[screenId]) {
            console.error(`Screen not found: ${screenId}`);
            return;
        }
        
        this.transitioning = true;
        
        // 隐藏当前屏幕
        const currentScreenEl = this.screens[this.currentScreen];
        if (currentScreenEl) {
            currentScreenEl.classList.remove('active');
        }
        
        // 显示新屏幕
        setTimeout(() => {
            const newScreenEl = this.screens[screenId];
            newScreenEl.classList.add('active');
            
            this.currentScreen = screenId;
            this.transitioning = false;
            
            if (callback) {
                callback();
            }
        }, CONFIG.ANIMATION.fadeOutDuration);
    }

    /**
     * 显示标题画面
     */
    showTitleScreen() {
        this.showScreen('title-screen');
    }

    /**
     * 显示角色创建画面
     */
    showCreateScreen() {
        this.showScreen('create-screen');
    }

    /**
     * 显示游戏画面
     */
    showGameScreen() {
        this.showScreen('game-screen');
    }

    /**
     * 显示总结画面
     */
    showSummaryScreen() {
        this.showScreen('summary-screen');
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 标题画面按钮
        const startBtn = document.getElementById('start-game');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.showCreateScreen();
            });
        }

        // 返回按钮
        const backBtn = document.getElementById('back-to-title');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.showTitleScreen();
            });
        }

        // 创建角色确认
        const confirmBtn = document.getElementById('confirm-create');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                if (window.game) {
                    window.game.createCharacter();
                }
            });
        }

        // 重新开始
        const restartBtn = document.getElementById('restart-game');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                if (window.game) {
                    window.game.restart();
                }
            });
        }

        // 从总结返回标题
        const backToTitleFromSummary = document.getElementById('back-to-title-from-summary');
        if (backToTitleFromSummary) {
            backToTitleFromSummary.addEventListener('click', () => {
                this.showTitleScreen();
            });
        }
    }

    /**
     * 获取当前屏幕ID
     * @returns {string} 当前屏幕ID
     */
    getCurrentScreen() {
        return this.currentScreen;
    }

    /**
     * 检查是否在指定屏幕
     * @param {string} screenId - 屏幕ID
     * @returns {boolean} 是否在指定屏幕
     */
    isOnScreen(screenId) {
        return this.currentScreen === screenId;
    }
}

/**
 * UI更新器
 * 负责游戏界面的动态更新
 */
class UIUpdater {
    /**
     * 创建UI更新器实例
     * @param {ScreenManager} screenManager - 屏幕管理器
     */
    constructor(screenManager) {
        this.screenManager = screenManager;
    }

    /**
     * 更新玩家信息显示
     * @param {Player} player - 玩家对象
     */
    updatePlayerInfo(player) {
        // 玩家名称
        const nameEl = document.getElementById('player-name-display');
        if (nameEl) {
            nameEl.textContent = player.name;
        }

        // 年龄
        const ageEl = document.getElementById('player-age');
        if (ageEl) {
            ageEl.textContent = `${player.age}岁`;
        }

        // 性别图标
        const genderEl = document.getElementById('player-gender');
        if (genderEl) {
            genderEl.textContent = CONFIG.GENDERS[player.gender].icon;
        }

        // 人生阶段
        const stageEl = document.getElementById('life-stage');
        if (stageEl) {
            stageEl.textContent = player.lifeStage.icon + ' ' + player.lifeStage.name;
        }
    }

    /**
     * 更新属性显示
     * @param {Object} attributes - 属性对象
     */
    updateAttributes(attributes) {
        const attrs = ['intelligence', 'constitution', 'charisma', 'luck'];
        
        attrs.forEach(attr => {
            const el = document.getElementById(`display-${attr}`);
            if (el) {
                el.textContent = attributes[attr];
                
                // 添加动画效果
                el.classList.add('pulse');
                setTimeout(() => el.classList.remove('pulse'), 300);
            }
        });
    }

    /**
     * 更新金钱显示
     * @param {number} money - 金额
     */
    updateMoney(money) {
        const moneyEl = document.getElementById('display-money');
        if (moneyEl) {
            moneyEl.textContent = Utils.formatNumber(money);
        }
    }

    /**
     * 更新事件显示
     * @param {Object} event - 事件对象
     */
    updateEvent(event) {
        // 更新事件文本
        const eventTextEl = document.getElementById('event-text');
        if (eventTextEl) {
            let html = `<h3>${event.title}</h3><p>${event.description}</p>`;
            eventTextEl.innerHTML = html;
        }

        // 更新选项按钮
        const choicesEl = document.getElementById('event-choices');
        if (choicesEl) {
            choicesEl.innerHTML = '';
            
            event.choices.forEach((choice, index) => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = choice.text;
                btn.addEventListener('click', () => {
                    if (window.game) {
                        window.game.makeChoice(index);
                    }
                });
                choicesEl.appendChild(btn);
            });
        }
    }

    /**
     * 清空事件显示
     */
    clearEvent() {
        const eventTextEl = document.getElementById('event-text');
        const choicesEl = document.getElementById('event-choices');
        
        if (eventTextEl) {
            eventTextEl.innerHTML = '<p class="waiting">等待新事件...</p>';
        }
        
        if (choicesEl) {
            choicesEl.innerHTML = '';
        }
    }

    /**
     * 显示年龄增长动画
     * @param {number} age - 新年龄
     */
    showAgeChange(age) {
        const ageEl = document.getElementById('player-age');
        if (ageEl) {
            ageEl.classList.add('age-up');
            setTimeout(() => ageEl.classList.remove('age-up'), 500);
        }
    }

    /**
     * 更新人生阶段显示
     * @param {Object} stage - 人生阶段对象
     */
    updateLifeStage(stage) {
        const stageEl = document.getElementById('life-stage');
        if (stageEl) {
            // 添加阶段变化动画
            stageEl.classList.add('stage-change');
            setTimeout(() => stageEl.classList.remove('stage-change'), 1000);
            
            stageEl.textContent = stage.icon + ' ' + stage.name;
        }

        // 更新头像
        this.updateAvatar(stage);
    }

    /**
     * 更新角色头像
     * @param {Object} stage - 人生阶段
     * @param {string} gender - 性别
     */
    updateAvatar(stage, gender) {
        const avatarEl = document.getElementById('character-avatar');
        if (!avatarEl || !window.game || !window.game.player) return;

        const player = window.game.player;
        const genderEmoji = CONFIG.GENDERS[player.gender].avatarEmoji;
        
        const faceEl = avatarEl.querySelector('.avatar-face');
        if (faceEl) {
            faceEl.textContent = genderEmoji;
        }

        // 根据阶段调整头像颜色
        const colors = {
            baby: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            child: 'linear-gradient(135deg, #34d399, #10b981)',
            teen: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
            young: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            middle: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            elder: 'linear-gradient(135deg, #a78bfa, #8b5cf6)'
        };

        avatarEl.style.background = colors[stage.id] || colors.young;
    }

    /**
     * 更新总结画面
     * @param {Object} ending - 结局对象
     * @param {Player} player - 玩家对象
     */
    updateSummary(ending, player) {
        // 基本信息
        document.getElementById('final-name').textContent = player.name;
        document.getElementById('final-age').textContent = `享年: ${player.age}岁`;
        document.getElementById('final-gender').textContent = `性别: ${CONFIG.GENDERS[player.gender].name}`;

        // 统计数据
        document.getElementById('final-max-int').textContent = player.maxAttributes.intelligence;
        document.getElementById('final-max-con').textContent = player.maxAttributes.constitution;
        document.getElementById('final-max-cha').textContent = player.maxAttributes.charisma;
        document.getElementById('final-total-money').textContent = Utils.formatNumber(player.totalMoney) + '元';
        document.getElementById('final-events').textContent = player.eventsCount + '个';

        // 结局评价
        const evalEl = document.getElementById('summary-evaluation');
        if (evalEl) {
            evalEl.innerHTML = `
                <h3>${ending.type.emoji} ${ending.type.name}</h3>
                <p>${ending.evaluation}</p>
            `;
        }

        // 排名
        const rankEl = document.getElementById('summary-rank');
        if (rankEl) {
            rankEl.innerHTML = `
                <p><strong>人生评级:</strong> ${ending.rank}</p>
            `;
        }

        // 成就
        if (ending.achievements && ending.achievements.length > 0) {
            const rankEl = document.getElementById('summary-rank');
            if (rankEl) {
                const achievementsHtml = ending.achievements.map(a => 
                    `<span title="${a.desc}">${a.emoji} ${a.name}</span>`
                ).join(' ');
                rankEl.innerHTML += `
                    <div class="achievements" style="margin-top: 15px;">
                        <p><strong>成就:</strong></p>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                            ${achievementsHtml}
                        </div>
                    </div>
                `;
            }
        }

        // 最终头像
        const finalAvatar = document.getElementById('final-avatar');
        if (finalAvatar) {
            finalAvatar.textContent = CONFIG.GENDERS[player.gender].avatarEmoji;
        }
    }

    /**
     * 更新按钮状态
     * @param {boolean} isAutoPlaying - 是否自动播放
     * @param {number} speed - 游戏速度
     */
    updateButtonStates(isAutoPlaying, speed) {
        const autoBtn = document.getElementById('auto-play');
        const speedBtn = document.getElementById('speed-control');
        
        if (autoBtn) {
            autoBtn.textContent = isAutoPlaying ? '停止自动' : '自动播放';
            autoBtn.classList.toggle('btn-active', isAutoPlaying);
        }
        
        if (speedBtn) {
            speedBtn.textContent = `速度 ${speed}x`;
        }
    }

    /**
     * 显示结果消息
     * @param {Object} result - 结果对象
     */
    showResultMessage(result) {
        if (!result.messages || result.messages.length === 0) return;

        const eventTextEl = document.getElementById('event-text');
        if (!eventTextEl) return;

        const messagesHtml = result.messages.map(msg => 
            `<p class="result-message">${msg}</p>`
        ).join('');

        eventTextEl.innerHTML += messagesHtml;

        // 自动滚动到底部
        eventTextEl.scrollTop = eventTextEl.scrollHeight;
    }
}
