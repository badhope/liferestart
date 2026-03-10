/**
 * 动画系统
 * 处理游戏中的各种动画效果
 */

class AnimationManager {
    /**
     * 创建动画管理器实例
     */
    constructor() {
        this.animations = [];
        this.runningAnimations = new Set();
    }

    /**
     * 淡入效果
     * @param {HTMLElement} element - 目标元素
     * @param {number} duration - 持续时间
     * @returns {Promise} 完成Promise
     */
    fadeIn(element, duration = 300) {
        return new Promise(resolve => {
            element.style.opacity = '0';
            element.style.display = 'block';
            
            let start = null;
            
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                
                element.style.opacity = progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    /**
     * 淡出效果
     * @param {HTMLElement} element - 目标元素
     * @param {number} duration - 持续时间
     * @returns {Promise} 完成Promise
     */
    fadeOut(element, duration = 300) {
        return new Promise(resolve => {
            let start = null;
            const startOpacity = parseFloat(getComputedStyle(element).opacity) || 1;
            
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                
                element.style.opacity = startOpacity * (1 - progress);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    /**
     * 弹跳效果
     * @param {HTMLElement} element - 目标元素
     * @returns {Promise} 完成Promise
     */
    bounce(element) {
        return new Promise(resolve => {
            element.classList.add('bounce');
            
            setTimeout(() => {
                element.classList.remove('bounce');
                resolve();
            }, 600);
        });
    }

    /**
     * 脉冲效果
     * @param {HTMLElement} element - 目标元素
     * @param {number} duration - 持续时间
     */
    pulse(element, duration = 300) {
        element.classList.add('pulse');
        
        setTimeout(() => {
            element.classList.remove('pulse');
        }, duration);
    }

    /**
     * 震动效果
     * @param {HTMLElement} element - 目标元素
     * @param {number} duration - 持续时间
     */
    shake(element, duration = 500) {
        element.classList.add('shake');
        
        setTimeout(() => {
            element.classList.remove('shake');
        }, duration);
    }

    /**
     * 滑动进入效果
     * @param {HTMLElement} element - 目标元素
     * @param {string} direction - 方向 ('left', 'right', 'up', 'down')
     * @param {number} duration - 持续时间
     * @returns {Promise} 完成Promise
     */
    slideIn(element, direction = 'up', duration = 300) {
        return new Promise(resolve => {
            const transformMap = {
                up: 'translateY(50px)',
                down: 'translateY(-50px)',
                left: 'translateX(50px)',
                right: 'translateX(-50px)'
            };
            
            element.style.opacity = '0';
            element.style.transform = transformMap[direction];
            element.style.display = 'block';
            
            let start = null;
            
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                
                // 使用缓动函数
                const eased = 1 - Math.pow(1 - progress, 3);
                
                element.style.opacity = eased;
                element.style.transform = transformMap[direction].replace(/\d+px/, 
                    (parseInt(transformMap[direction]) * (1 - eased)) + 'px');
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.transform = '';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    /**
     * 数字滚动动画
     * @param {HTMLElement} element - 目标元素
     * @param {number} start - 起始值
     * @param {number} end - 结束值
     * @param {number} duration - 持续时间
     * @returns {Promise} 完成Promise
     */
    countUp(element, start, end, duration = 500) {
        return new Promise(resolve => {
            let startTime = null;
            
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                
                // 缓动函数
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(start + (end - start) * eased);
                
                element.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.textContent = end;
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    /**
     * 闪烁效果
     * @param {HTMLElement} element - 目标元素
     * @param {number} times - 闪烁次数
     */
    blink(element, times = 3) {
        let count = 0;
        
        const blinkInterval = setInterval(() => {
            element.style.opacity = element.style.opacity === '0' ? '1' : '0';
            count++;
            
            if (count >= times * 2) {
                clearInterval(blinkInterval);
                element.style.opacity = '1';
            }
        }, 150);
    }

    /**
     * 属性变化动画
     * @param {HTMLElement} element - 目标元素
     * @param {number} change - 变化值
     */
    attributeChange(element, change) {
        if (change === 0) return;
        
        const isPositive = change > 0;
        const color = isPositive ? '#22c55e' : '#ef4444';
        const sign = isPositive ? '+' : '';
        
        // 创建变化指示器
        const indicator = document.createElement('span');
        indicator.className = 'attr-change-indicator';
        indicator.textContent = `${sign}${change}`;
        indicator.style.color = color;
        indicator.style.position = 'absolute';
        indicator.style.right = '-30px';
        indicator.style.fontWeight = 'bold';
        indicator.style.animation = 'floatUp 1s ease forwards';
        
        element.parentElement.style.position = 'relative';
        element.parentElement.appendChild(indicator);
        
        // 1秒后移除
        setTimeout(() => {
            indicator.remove();
        }, 1000);
    }

    /**
     * 屏幕震动效果
     * @param {HTMLElement} container - 容器元素
     * @param {number} intensity - 强度
     */
    screenShake(container, intensity = 5) {
        container.classList.add('screen-shake');
        
        setTimeout(() => {
            container.classList.remove('screen-shake');
        }, 500);
    }

    /**
     * 添加CSS动画到文档
     */
    addCSSToDocument() {
        if (document.getElementById('animation-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            @keyframes floatUp {
                0% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-20px); }
            }
            
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes glow {
                0%, 100% { box-shadow: 0 0 5px currentColor; }
                50% { box-shadow: 0 0 20px currentColor; }
            }
            
            .pulse { animation: pulse 0.3s ease; }
            .bounce { animation: bounce 0.6s ease; }
            .shake { animation: shake 0.5s ease; }
            .fade-in-up { animation: fadeInUp 0.5s ease; }
            .glow { animation: glow 1.5s ease infinite; }
            
            .screen-shake {
                animation: shake 0.5s ease;
            }
            
            .age-up {
                animation: pulse 0.5s ease;
                color: #22c55e;
            }
            
            .stage-change {
                animation: bounce 0.6s ease;
            }
            
            .result-message {
                animation: fadeInUp 0.3s ease;
                color: #22c55e;
                font-weight: 600;
                margin: 10px 0;
            }
            
            .waiting {
                color: var(--text-muted);
                font-style: italic;
                text-align: center;
                padding: 40px;
            }
        `;
        
        document.head.appendChild(style);
    }
}

/**
 * 效果音管理器（预留接口）
 */
class SoundManager {
    constructor() {
        this.enabled = true;
        this.volume = 0.5;
    }

    play(type) {
        if (!this.enabled) return;
        // 这里可以添加音效播放逻辑
        // 使用 Web Audio API 或 HTML5 Audio
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}
