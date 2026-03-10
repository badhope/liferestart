/**
 * 存档系统
 * 负责游戏的保存和读取功能
 */

const SaveSystem = {
    /**
     * 保存游戏
     * @param {Object} saveData - 存档数据
     * @param {number} slot - 存档槽位 (0-2)
     * @returns {boolean} 是否保存成功
     */
    save: function(saveData, slot = 0) {
        try {
            const saves = this.getAllSaves();
            saves[slot] = {
                timestamp: Date.now(),
                data: saveData
            };
            
            localStorage.setItem(CONFIG.SAVE.key, JSON.stringify(saves));
            return true;
        } catch (e) {
            console.error('保存失败:', e);
            return false;
        }
    },

    /**
     * 读取存档
     * @param {number} slot - 存档槽位
     * @returns {Object|null} 存档数据，如果没有则返回null
     */
    load: function(slot = 0) {
        try {
            const saves = this.getAllSaves();
            if (saves[slot] && saves[slot].data) {
                return saves[slot].data;
            }
            return null;
        } catch (e) {
            console.error('读取失败:', e);
            return null;
        }
    },

    /**
     * 获取所有存档
     * @returns {Array} 存档数组
     */
    getAllSaves: function() {
        try {
            const data = localStorage.getItem(CONFIG.SAVE.key);
            return data ? JSON.parse(data) : [null, null, null];
        } catch (e) {
            return [null, null, null];
        }
    },

    /**
     * 删除存档
     * @param {number} slot - 存档槽位
     * @returns {boolean} 是否删除成功
     */
    deleteSave: function(slot = 0) {
        try {
            const saves = this.getAllSaves();
            saves[slot] = null;
            localStorage.setItem(CONFIG.SAVE.key, JSON.stringify(saves));
            return true;
        } catch (e) {
            console.error('删除失败:', e);
            return false;
        }
    },

    /**
     * 检查是否有存档
     * @returns {boolean} 是否有存档
     */
    hasSave: function() {
        const saves = this.getAllSaves();
        return saves.some(save => save !== null);
    },

    /**
     * 获取最新存档
     * @returns {Object|null} 最新存档数据
     */
    getLatestSave: function() {
        const saves = this.getAllSaves();
        let latest = null;
        let latestTime = 0;
        
        saves.forEach(save => {
            if (save && save.timestamp > latestTime) {
                latest = save;
                latestTime = save.timestamp;
            }
        });
        
        return latest ? latest.data : null;
    },

    /**
     * 格式化存档时间
     * @param {number} timestamp - 时间戳
     * @returns {string} 格式化后的时间字符串
     */
    formatTime: function(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        // 小于1小时
        if (diff < 3600000) {
            const minutes = Math.floor(diff / 60000);
            return minutes <= 1 ? '刚刚' : `${minutes}分钟前`;
        }
        
        // 小于24小时
        if (diff < 86400000) {
            const hours = Math.floor(diff / 3600000);
            return `${hours}小时前`;
        }
        
        // 小于7天
        if (diff < 604800000) {
            const days = Math.floor(diff / 86400000);
            return `${days}天前`;
        }
        
        // 超过7天
        return date.toLocaleDateString('zh-CN');
    },

    /**
     * 导出存档（JSON格式）
     * @param {Object} saveData - 存档数据
     * @returns {string} JSON字符串
     */
    exportSave: function(saveData) {
        return JSON.stringify(saveData, null, 2);
    },

    /**
     * 导入存档（从JSON）
     * @param {string} jsonString - JSON字符串
     * @returns {Object|null} 解析后的存档数据
     */
    importSave: function(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            // 验证存档数据格式
            if (data.version && data.player) {
                return data;
            }
            return null;
        } catch (e) {
            console.error('导入失败:', e);
            return null;
        }
    },

    /**
     * 自动保存
     * @param {Object} gameEngine - 游戏引擎实例
     */
    autoSave: function(gameEngine) {
        const saveData = gameEngine.getSaveData();
        return this.save(saveData, 0);  // 默认使用第一个槽位
    }
};

/**
 * 本地存储键名（用于其他用途）
 */
const STORAGE_KEYS = {
    SETTINGS: 'lifeRestart_settings',
    STATISTICS: 'lifeRestart_statistics',
    ACHIEVEMENTS: 'lifeRestart_achievements'
};

/**
 * 设置管理器
 */
const SettingsManager = {
    /**
     * 获取设置
     * @returns {Object} 设置对象
     */
    get: function() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
            return data ? JSON.parse(data) : this.getDefaultSettings();
        } catch (e) {
            return this.getDefaultSettings();
        }
    },

    /**
     * 获取默认设置
     * @returns {Object} 默认设置
     */
    getDefaultSettings: function() {
        return {
            soundEnabled: true,
            musicEnabled: true,
            volume: 0.5,
            autoSave: true,
            fastMode: false
        };
    },

    /**
     * 保存设置
     * @param {Object} settings - 设置对象
     */
    save: function(settings) {
        try {
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        } catch (e) {
            console.error('保存设置失败:', e);
        }
    },

    /**
     * 更新单个设置
     * @param {string} key - 设置键
     * @param {*} value - 设置值
     */
    set: function(key, value) {
        const settings = this.get();
        settings[key] = value;
        this.save(settings);
    }
};

/**
 * 统计系统
 */
const Statistics = {
    /**
     * 获取统计信息
     * @returns {Object} 统计对象
     */
    get: function() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.STATISTICS);
            return data ? JSON.parse(data) : this.getDefaultStats();
        } catch (e) {
            return this.getDefaultStats();
        }
    },

    /**
     * 获取默认统计
     * @returns {Object} 默认统计
     */
    getDefaultStats: function() {
        return {
            totalGames: 0,
            totalPlayTime: 0,
            averageAge: 0,
            highestAge: 0,
            richestMoney: 0,
            bestRank: null,
            mostPlayedGender: null,
            achievements: []
        };
    },

    /**
     * 更新统计
     * @param {Object} gameData - 游戏数据
     */
    update: function(gameData) {
        const stats = this.get();
        
        // 更新总游戏次数
        stats.totalGames++;
        
        // 更新最高年龄
        if (gameData.player.age > stats.highestAge) {
            stats.highestAge = gameData.player.age;
        }
        
        // 更新最富有
        if (gameData.player.totalMoney > stats.richestMoney) {
            stats.richestMoney = gameData.player.totalMoney;
        }
        
        // 计算平均年龄
        const totalAge = stats.averageAge * (stats.totalGames - 1) + gameData.player.age;
        stats.averageAge = Math.round(totalAge / stats.totalGames);
        
        // 保存
        this.save(stats);
    },

    /**
     * 保存统计
     * @param {Object} stats - 统计对象
     */
    save: function(stats) {
        try {
            localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
        } catch (e) {
            console.error('保存统计失败:', e);
        }
    },

    /**
     * 重置统计
     */
    reset: function() {
        this.save(this.getDefaultStats());
    }
};
