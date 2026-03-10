/**
 * 游戏事件数据
 * 包含所有随机事件、职业事件、特殊事件等
 * 事件按人生阶段和类型分类
 */

const EVENTS = {
    /**
     * 婴儿期事件 (0-3岁)
     */
    baby: [
        {
            id: 'baby_1',
            title: '出生的家庭',
            description: '你出生在一个普通的家庭，父母都是工薪阶层。虽然不富裕，但充满了温暖。',
            choices: [
                { text: '健康成长', effects: { constitution: 1 } }
            ]
        },
        {
            id: 'baby_2',
            title: '母乳喂养',
            description: '母亲坚持母乳喂养你，这让你获得了很好的抵抗力。',
            choices: [
                { text: '好好喝奶', effects: { constitution: 1 } }
            ]
        },
        {
            id: 'baby_3',
            title: '早教班',
            description: '父母给你报了早教班，希望你能赢在起跑线上。',
            choices: [
                { text: '努力学习', effects: { intelligence: 1 }, cost: 500 },
                { text: '尽情玩耍', effects: { charisma: 1 } }
            ]
        },
        {
            id: 'baby_4',
            title: '第一次生病',
            description: '你发了一场高烧，父母彻夜未眠地照顾你。',
            choices: [
                { text: '坚强面对', effects: { constitution: -1, luck: 1 } }
            ]
        },
        {
            id: 'baby_5',
            title: '可爱的宝宝',
            description: '亲戚朋友们都夸你可爱讨喜。',
            choices: [
                { text: '礼貌回应', effects: { charisma: 1 } }
            ]
        }
    ],

    /**
     * 童年期事件 (4-12岁)
     */
    child: [
        {
            id: 'child_1',
            title: '上小学',
            description: '你正式成为一名小学生，开始了学习生涯。第一天上学，你既兴奋又紧张。',
            choices: [
                { text: '努力学习', effects: { intelligence: 2 }, probability: 0.7 },
                { text: '广交朋友', effects: { charisma: 2 }, probability: 0.7 }
            ]
        },
        {
            id: 'child_2',
            title: '奥数班',
            description: '父母发现你在数学方面有天赋，给你报了奥数班。',
            choices: [
                { text: '认真钻研', effects: { intelligence: 2 }, cost: 2000 },
                { text: '应付了事', effects: { intelligence: -1 } }
            ]
        },
        {
            id: 'child_3',
            title: '体育课',
            description: '你非常喜欢体育课，尤其是跑步和球类运动。',
            choices: [
                { text: '加强锻炼', effects: { constitution: 2 } },
                { text: '随便玩玩', effects: { constitution: 1 } }
            ]
        },
        {
            id: 'child_4',
            title: '班长竞选',
            description: '班级选举班长，你决定参加竞选。',
            choices: [
                { text: '认真准备演讲', effects: { charisma: 2, intelligence: 1 }, probability: 0.6 },
                { text: '只是试试看', effects: { charisma: 1 }, probability: 0.4 }
            ]
        },
        {
            id: 'child_5',
            title: '意外受伤',
            description: '在玩耍时你不小心摔倒了，膝盖擦破了。',
            choices: [
                { text: '坚强不哭', effects: { constitution: 1, luck: 1 } },
                { text: '哭闹不止', effects: { charisma: -1 } }
            ]
        },
        {
            id: 'child_6',
            title: '获得奖状',
            description: '你因为表现出色，获得了"三好学生"奖状！',
            choices: [
                { text: '再接再厉', effects: { intelligence: 1, charisma: 1 } }
            ]
        },
        {
            id: 'child_7',
            title: '转学',
            description: '由于父母工作调动，你需要转到新学校读书。',
            choices: [
                { text: '努力适应', effects: { charisma: 1, intelligence: 1 }, probability: 0.6 },
                { text: '怀念旧友', effects: { charisma: -1, luck: -1 }, probability: 0.4 }
            ]
        },
        {
            id: 'child_8',
            title: '兴趣爱好',
            description: '你发现自己在绘画/音乐方面很有兴趣。',
            choices: [
                { text: '报班学习', effects: { charisma: 2, intelligence: 1 }, cost: 3000 },
                { text: '自学成才', effects: { charisma: 1 } }
            ]
        },
        {
            id: 'child_9',
            title: '小升初考试',
            description: '小学毕业了，面临着初中择校的关键时刻。',
            choices: [
                { text: '冲击重点中学', effects: { intelligence: 1, luck: -1 }, cost: 5000, probability: 0.5 },
                { text: '就近入学', effects: { luck: 1 } }
            ]
        },
        {
            id: 'child_10',
            title: '网络世界',
            description: '你第一次接触到电脑和网络，发现了新世界。',
            choices: [
                { text: '学习编程', effects: { intelligence: 2 } },
                { text: '沉迷游戏', effects: { intelligence: -1, charisma: 1 }, probability: 0.6 }
            ]
        }
    ],

    /**
     * 少年期事件 (13-18岁)
     */
    teen: [
        {
            id: 'teen_1',
            title: '青春期',
            description: '你进入了青春期，身体和心理都发生了很大变化。',
            choices: [
                { text: '正确面对', effects: { constitution: 1, charisma: 1 } },
                { text: '迷茫困惑', effects: { charisma: -1, luck: -1 } }
            ]
        },
        {
            id: 'teen_2',
            title: '中考',
            description: '人生中第一次重要考试——中考。',
            choices: [
                { text: '全力以赴', effects: { intelligence: 2, constitution: -1 }, probability: 0.7 },
                { text: '顺其自然', effects: { luck: 1 }, probability: 0.3 }
            ]
        },
        {
            id: 'teen_3',
            title: '高中生活',
            description: '你考上了理想的高中，结识了新同学。',
            choices: [
                { text: '专注学习', effects: { intelligence: 2 } },
                { text: '社交为主', effects: { charisma: 2 } },
                { text: '全面发展', effects: { intelligence: 1, charisma: 1, constitution: 1 } }
            ]
        },
        {
            id: 'teen_4',
            title: '初恋',
            description: '你遇到了一个让你心动的人，经历了人生第一次心动。',
            choices: [
                { text: '大胆追求', effects: { charisma: 2, luck: -1 }, probability: 0.5 },
                { text: '默默喜欢', effects: { charisma: 1 }, probability: 0.7 },
                { text: '专注于学习', effects: { intelligence: 1 } }
            ]
        },
        {
            id: 'teen_5',
            title: '高考',
            description: '人生最重要的考试——高考。这是改变命运的时刻！',
            choices: [
                { text: '超常发挥', effects: { intelligence: 2, luck: 2 }, probability: 0.2 },
                { text: '正常发挥', effects: { intelligence: 1 } },
                { text: '发挥失常', effects: { intelligence: -1, luck: -1 }, probability: 0.3 }
            ]
        },
        {
            id: 'teen_6',
            title: '大学选择',
            description: '高考结束，面临着选择大学和专业的关键时刻。',
            choices: [
                { text: '追求兴趣', effects: { intelligence: 1, charisma: 1 } },
                { text: '就业导向', effects: { luck: 2, constitution: 1 } },
                { text: '名校光环', effects: { charisma: 2, intelligence: 1 } }
            ]
        },
        {
            id: 'teen_7',
            title: '课外活动',
            description: '学校组织了丰富的课外活动。',
            choices: [
                { text: '参加社团', effects: { charisma: 2 } },
                { text: '参加竞赛', effects: { intelligence: 2 }, probability: 0.6 },
                { text: '专注学习', effects: { intelligence: 1 } }
            ]
        },
        {
            id: 'teen_8',
            title: '意外事故',
            description: '一场意外让你的生活发生了改变。',
            choices: [
                { text: '乐观面对', effects: { constitution: 1, charisma: 1 } },
                { text: '消极沉沦', effects: { constitution: -2, charisma: -1 } }
            ]
        },
        {
            id: 'teen_9',
            title: '获奖经历',
            description: '你在某项比赛中获得了优异成绩。',
            choices: [
                { text: '继续努力', effects: { intelligence: 1, charisma: 2 } }
            ]
        },
        {
            id: 'teen_10',
            title: '勤工俭学',
            description: '你开始兼职工作，赚取生活费。',
            choices: [
                { text: '努力工作', effects: { constitution: 1, charisma: 1 }, money: 2000 },
                { text: '随便应付', effects: { luck: -1 }, money: 500 }
            ]
        }
    ],

    /**
     * 青年期事件 (19-35岁)
     */
    young: [
        {
            id: 'young_1',
            title: '大学入学',
            description: '你怀着期待和忐忑的心情走进了大学校园。',
            choices: [
                { text: '努力学习', effects: { intelligence: 2 } },
                { text: '参加社团', effects: { charisma: 2 } },
                { text: '打工赚钱', effects: { constitution: 1, luck: 1 }, money: 3000 }
            ]
        },
        {
            id: 'young_2',
            title: '恋爱',
            description: '你遇到了生命中的那个TA，坠入爱河。',
            choices: [
                { text: '认真经营', effects: { charisma: 2, luck: 1 } },
                { text: '随心所欲', effects: { charisma: 1, luck: -1 }, probability: 0.5 }
            ]
        },
        {
            id: 'young_3',
            title: '实习机会',
            description: '你获得了一家知名公司的实习机会。',
            choices: [
                { text: '好好表现', effects: { intelligence: 1, charisma: 1, luck: 1 }, probability: 0.7 },
                { text: '敷衍了事', effects: { luck: -1 } }
            ]
        },
        {
            id: 'young_4',
            title: '毕业求职',
            description: '大学毕业后，你开始了求职之路。',
            choices: [
                { text: '大公司', effects: { intelligence: 1, charisma: 1 }, probability: 0.4 },
                { text: '创业', effects: { luck: -1, charisma: 2 }, probability: 0.3 },
                { text: '稳定工作', effects: { constitution: 1, luck: 1 } }
            ]
        },
        {
            id: 'young_5',
            title: '第一份工作',
            description: '你找到了人生中的第一份工作。',
            choices: [
                { text: '努力奋斗', effects: { intelligence: 2, constitution: 1 } },
                { text: '得过且过', effects: { luck: -1 } }
            ]
        },
        {
            id: 'young_6',
            title: '职场竞争',
            description: '公司内部晋升机会，你和同事之间形成了竞争。',
            choices: [
                { text: '凭实力竞争', effects: { intelligence: 2, constitution: -1 }, probability: 0.6 },
                { text: '搞好人际关系', effects: { charisma: 2, intelligence: -1 }, probability: 0.5 },
                { text: '顺其自然', effects: { luck: 1 } }
            ]
        },
        {
            id: 'young_7',
            title: '买房',
            description: '你决定买房安定下来，这是人生中的大事。',
            choices: [
                { text: '贷款买房', effects: { luck: 1 }, cost: -100000 },
                { text: '租房观望', effects: { luck: -1 } }
            ]
        },
        {
            id: 'young_8',
            title: '结婚',
            description: '你遇到了对的人，决定携手共度余生。',
            choices: [
                { text: '浪漫婚礼', effects: { charisma: 1, luck: 1 }, cost: -50000 },
                { text: '简单温馨', effects: { charisma: 1 }, cost: -10000 }
            ]
        },
        {
            id: 'young_9',
            title: '生子',
            description: '你们爱情的结晶诞生了！',
            choices: [
                { text: '精心培养', effects: { constitution: -1, luck: 1 }, cost: -20000 },
                { text: '顺其自然', effects: { luck: -1 } }
            ]
        },
        {
            id: 'young_10',
            title: '投资理财',
            description: '你有了一些积蓄，考虑投资理财。',
            choices: [
                { text: '股票投资', effects: { luck: 2 }, money: 50000, probability: 0.3 },
                { text: '稳健理财', effects: { luck: 1 }, money: 10000 },
                { text: '银行存款', effects: { luck: 0 }, money: 3000 }
            ]
        },
        {
            id: 'young_11',
            title: '职业转型',
            description: '你对当前工作产生了倦怠感，考虑转型。',
            choices: [
                { text: '考研深造', effects: { intelligence: 2, constitution: -1 }, cost: -20000 },
                { text: '转行', effects: { charisma: 1, luck: -1 }, probability: 0.5 },
                { text: '继续坚持', effects: { constitution: 1 } }
            ]
        },
        {
            id: 'young_12',
            title: '健身习惯',
            description: '你开始关注健康，养成了健身的习惯。',
            choices: [
                { text: '坚持锻炼', effects: { constitution: 3 } },
                { text: '偶尔运动', effects: { constitution: 1 } }
            ]
        },
        {
            id: 'young_13',
            title: '社交网络',
            description: '你在社交网络上变得很活跃。',
            choices: [
                { text: '分享生活', effects: { charisma: 2 } },
                { text: '低调行事', effects: { luck: 1 } }
            ]
        },
        {
            id: 'young_14',
            title: '健康检查',
            description: '你去做了一次全面体检。',
            choices: [
                { text: '全面检查', effects: { constitution: 1 }, cost: -1000 },
                { text: '简单检查', effects: { luck: 0 }, cost: -300 }
            ]
        },
        {
            id: 'young_15',
            title: '职位晋升',
            description: '你获得了职位晋升！',
            choices: [
                { text: '接受', effects: { charisma: 1, intelligence: 1 }, money: 20000 }
            ]
        }
    ],

    /**
     * 中年期事件 (36-55岁)
     */
    middle: [
        {
            id: 'middle_1',
            title: '职业危机',
            description: '公司面临裁员，你感受到了职场危机。',
            choices: [
                { text: '提升技能', effects: { intelligence: 2 }, cost: -5000 },
                { text: '搞好人脉', effects: { charisma: 2 } },
                { text: '另谋出路', effects: { luck: -1, charisma: 1 }, probability: 0.6 }
            ]
        },
        {
            id: 'middle_2',
            title: '孩子教育',
            description: '孩子到了关键的教育阶段，你需要投入更多精力。',
            choices: [
                { text: '全力投入', effects: { constitution: -1, luck: 1 }, cost: -30000 },
                { text: '顺其自然', effects: { luck: -1 } }
            ]
        },
        {
            id: 'middle_3',
            title: '家庭矛盾',
            description: '家庭生活中出现了一些矛盾。',
            choices: [
                { text: '沟通解决', effects: { charisma: 2, luck: 1 } },
                { text: '冷战处理', effects: { charisma: -2, luck: -1 } }
            ]
        },
        {
            id: 'middle_4',
            title: '事业高峰',
            description: '你的事业迎来了高峰期！',
            choices: [
                { text: '继续拼搏', effects: { intelligence: 1, constitution: -1 }, money: 100000 },
                { text: '享受生活', effects: { charisma: 1, constitution: 1 }, money: 50000 }
            ]
        },
        {
            id: 'middle_5',
            title: '健康问题',
            description: '身体开始出现一些小问题。',
            choices: [
                { text: '积极治疗', effects: { constitution: 1, luck: 1 }, cost: -5000 },
                { text: '忽视不管', effects: { constitution: -2, luck: -1 } }
            ]
        },
        {
            id: 'middle_6',
            title: '再次创业',
            description: '你有了新的创业想法。',
            choices: [
                { text: '放手一搏', effects: { luck: 2 }, money: 100000, probability: 0.4 },
                { text: '谨慎观望', effects: { luck: 0 } }
            ]
        },
        {
            id: 'middle_7',
            title: '父母赡养',
            description: '父母年龄大了，需要你的照顾。',
            choices: [
                { text: '悉心照顾', effects: { charisma: 1, constitution: -1 }, cost: -20000 },
                { text: '请护工照顾', effects: { luck: 0 }, cost: -10000 }
            ]
        },
        {
            id: 'middle_8',
            title: '中年危机',
            description: '你感受到了传说中的"中年危机"。',
            choices: [
                { text: '调整心态', effects: { constitution: 1, charisma: 1 } },
                { text: '寻求刺激', effects: { luck: -2, charisma: -1 }, probability: 0.4 }
            ]
        },
        {
            id: 'middle_9',
            title: '房产投资',
            description: '你考虑进行房产投资。',
            choices: [
                { text: '投资房产', effects: { luck: 1 }, money: 200000, probability: 0.6 },
                { text: '继续观望', effects: { luck: 0 } }
            ]
        },
        {
            id: 'middle_10',
            title: '社交圈变化',
            description: '你的社交圈发生了很大变化。',
            choices: [
                { text: '经营人脉', effects: { charisma: 2 } },
                { text: '精简社交', effects: { constitution: 1 } }
            ]
        },
        {
            id: 'middle_11',
            title: '兴趣爱好',
            description: '你培养了新的兴趣爱好。',
            choices: [
                { text: '深入发展', effects: { charisma: 2, constitution: 1 }, cost: -5000 },
                { text: '浅尝辄止', effects: { charisma: 1 } }
            ]
        },
        {
            id: 'middle_12',
            title: '继续教育',
            description: '你决定继续学习，提升自己。',
            choices: [
                { text: '报班学习', effects: { intelligence: 2 }, cost: -10000 },
                { text: '自学成才', effects: { intelligence: 1 } }
            ]
        },
        {
            id: 'middle_13',
            title: '退休规划',
            description: '你开始规划退休生活。',
            choices: [
                { text: '提前准备', effects: { luck: 2 }, money: 50000 },
                { text: '到时候再说', effects: { luck: -1 } }
            ]
        },
        {
            id: 'middle_14',
            title: '家庭旅行',
            description: '你决定带家人一起去旅行。',
            choices: [
                { text: '豪华游', effects: { charisma: 1, constitution: 1 }, cost: -30000 },
                { text: '经济游', effects: { charisma: 1 }, cost: -10000 }
            ]
        },
        {
            id: 'middle_15',
            title: '技能传授',
            description: '你开始向年轻人传授经验。',
            choices: [
                { text: '耐心指导', effects: { charisma: 2, intelligence: 1 } },
                { text: '敷衍了事', effects: { charisma: -1 } }
            ]
        }
    ],

    /**
     * 老年期事件 (56-100岁)
     */
    elder: [
        {
            id: 'elder_1',
            title: '退休',
            description: '你正式退休了，离开了工作岗位。',
            choices: [
                { text: '享受退休生活', effects: { constitution: 1, charisma: 1 } },
                { text: '继续发挥余热', effects: { intelligence: 1, constitution: -1 } }
            ]
        },
        {
            id: 'elder_2',
            title: '健康老化',
            description: '身体各项机能开始老化。',
            choices: [
                { text: '积极锻炼', effects: { constitution: 2 } },
                { text: '保养为主', effects: { constitution: 1 }, cost: -10000 }
            ]
        },
        {
            id: 'elder_3',
            title: '子孙满堂',
            description: '孙子孙女绕膝，享受天伦之乐。',
            choices: [
                { text: '含饴弄孙', effects: { charisma: 2, constitution: 1 } },
                { text: '各自安好', effects: { luck: -1 } }
            ]
        },
        {
            id: 'elder_4',
            title: '回忆录',
            description: '你决定写一本回忆录，记录一生的故事。',
            choices: [
                { text: '认真撰写', effects: { intelligence: 2, charisma: 1 } },
                { text: '简单记录', effects: { intelligence: 1 } }
            ]
        },
        {
            id: 'elder_5',
            title: '老友聚会',
            description: '多年未见的老同学组织聚会。',
            choices: [
                { text: '参加聚会', effects: { charisma: 2, constitution: -1 } },
                { text: '遗憾缺席', effects: { charisma: -1 } }
            ]
        },
        {
            id: 'elder_6',
            title: '重大疾病',
            description: '一场大病让你住进了医院。',
            choices: [
                { text: '积极治疗', effects: { constitution: -1, luck: 1 }, cost: -50000, probability: 0.6 },
                { text: '保守治疗', effects: { constitution: -2 }, cost: -10000 }
            ]
        },
        {
            id: 'elder_7',
            title: '遗产规划',
            description: '你开始规划遗产分配。',
            choices: [
                { text: '提前安排', effects: { luck: 1 } },
                { text: '顺其自然', effects: { luck: -1 } }
            ]
        },
        {
            id: 'elder_8',
            title: '老年大学',
            description: '你报名参加了老年大学，学习新知识。',
            choices: [
                { text: '认真学习', effects: { intelligence: 2, constitution: 1 } },
                { text: '随便听听', effects: { intelligence: 1 } }
            ]
        },
        {
            id: 'elder_9',
            title: '旅游养老',
            description: '你决定去各地旅游，享受晚年生活。',
            choices: [
                { text: '环游世界', effects: { charisma: 2, constitution: -1 }, cost: -100000 },
                { text: '国内旅游', effects: { charisma: 1 }, cost: -30000 }
            ]
        },
        {
            id: 'elder_10',
            title: '丧偶',
            description: '人生中最痛苦的时刻之一——失去挚爱。',
            choices: [
                { text: '坚强面对', effects: { constitution: -1, charisma: 1 } },
                { text: '悲痛欲绝', effects: { constitution: -3, charisma: -1 } }
            ]
        },
        {
            id: 'elder_11',
            title: '兴趣爱好',
            description: '你有更多时间培养兴趣爱好。',
            choices: [
                { text: '培养新爱好', effects: { constitution: 1, charisma: 1 } },
                { text: '重拾旧爱好', effects: { charisma: 1 } }
            ]
        },
        {
            id: 'elder_12',
            title: '社会公益',
            description: '你开始参与一些公益活动。',
            choices: [
                { text: '积极参加', effects: { charisma: 2, constitution: 1 }, cost: -5000 },
                { text: '偶尔参与', effects: { charisma: 1 } }
            ]
        },
        {
            id: 'elder_13',
            title: '精神信仰',
            description: '你开始思考人生的意义和归宿。',
            choices: [
                { text: '皈依信仰', effects: { charisma: 1, constitution: 1 } },
                { text: '哲学思考', effects: { intelligence: 2 } }
            ]
        },
        {
            id: 'elder_14',
            title: '寿宴',
            description: '子女为你举办了盛大的寿宴。',
            choices: [
                { text: '开心接受', effects: { charisma: 2 } }
            ]
        },
        {
            id: 'elder_15',
            title: '临终关怀',
            description: '你住进了临终关怀医院，回顾一生。',
            choices: [
                { text: '坦然面对', effects: { charisma: 1 } },
                { text: '心中有憾', effects: { luck: -1 } }
            ]
        }
    ],

    /**
     * 全阶段通用事件
     * 可在任何人生阶段触发
     */
    universal: [
        {
            id: 'universal_1',
            title: '彩票中奖',
            description: '你买了张彩票，竟然中奖了！',
            choices: [
                { text: '合理规划', effects: { luck: 2 }, money: 1000000 },
                { text: '挥霍无度', effects: { charisma: -1, luck: 1 }, money: 500000 }
            ],
            probability: 0.05
        },
        {
            id: 'universal_2',
            title: '意外之财',
            description: '你意外获得了一笔钱。',
            choices: [
                { text: '存入银行', effects: { luck: 1 }, money: 10000 },
                { text: '投资理财', effects: { luck: 2 }, money: 20000, probability: 0.5 }
            ],
            probability: 0.1
        },
        {
            id: 'universal_3',
            title: '感冒发烧',
            description: '你感冒了，需要看医生。',
            choices: [
                { text: '及时就医', effects: { constitution: 1 }, cost: -500 },
                { text: '硬扛过去', effects: { constitution: -1 }, probability: 0.3 }
            ]
        },
        {
            id: 'universal_4',
            title: '朋友借钱',
            description: '一个朋友向你借钱。',
            choices: [
                { text: '慷慨借出', effects: { charisma: 2, luck: -1 }, money: -5000 },
                { text: '婉言拒绝', effects: { charisma: -1, luck: 1 } }
            ]
        },
        {
            id: 'universal_5',
            title: '拾金不昧',
            description: '你捡到了一个钱包。',
            choices: [
                { text: '归还失主', effects: { charisma: 2, luck: 2 } },
                { text: '据为己有', effects: { charisma: -2, luck: -1 }, money: 2000 }
            ]
        },
        {
            id: 'universal_6',
            title: '发表演讲',
            description: '你有机会在公众面前发表演讲。',
            choices: [
                { text: '精心准备', effects: { charisma: 2, intelligence: 1 }, probability: 0.7 },
                { text: '临场发挥', effects: { charisma: 1 }, probability: 0.5 }
            ]
        },
        {
            id: 'universal_7',
            title: '学习新技能',
            description: '你决定学习一项新技能。',
            choices: [
                { text: '认真学', effects: { intelligence: 2, constitution: -1 }, cost: -3000 },
                { text: '随便学学', effects: { intelligence: 1 } }
            ]
        },
        {
            id: 'universal_8',
            title: '健身锻炼',
            description: '你开始进行体育锻炼。',
            choices: [
                { text: '坚持锻炼', effects: { constitution: 2 } },
                { text: '偶尔锻炼', effects: { constitution: 1 } }
            ]
        },
        {
            id: 'universal_9',
            title: '慈善捐款',
            description: '你看到了一个募捐活动。',
            choices: [
                { text: '慷慨解囊', effects: { charisma: 2, luck: 1 }, cost: -1000 },
                { text: '视而不见', effects: { luck: -1 } }
            ]
        },
        {
            id: 'universal_10',
            title: '旅游出行',
            description: '你计划去旅游放松一下。',
            choices: [
                { text: '出境游', effects: { charisma: 2, constitution: 1 }, cost: -20000 },
                { text: '国内游', effects: { charisma: 1 }, cost: -5000 },
                { text: '取消行程', effects: { luck: -1 } }
            ]
        },
        {
            id: 'universal_11',
            title: '健身锻炼',
            description: '你开始进行系统的健身训练。',
            choices: [
                { text: '坚持训练', effects: { constitution: 3 }, cost: -5000 },
                { text: '偶尔去去', effects: { constitution: 1 } }
            ]
        },
        {
            id: 'universal_12',
            title: '阅读书籍',
            description: '你读到一本很有启发性的书。',
            choices: [
                { text: '深入思考', effects: { intelligence: 2 } },
                { text: '随便翻翻', effects: { intelligence: 1 } }
            ]
        },
        {
            id: 'universal_13',
            title: '志愿服务',
            description: '你参加了一次志愿者活动。',
            choices: [
                { text: '认真参与', effects: { charisma: 2, constitution: 1 } },
                { text: '应付了事', effects: { charisma: -1 } }
            ]
        },
        {
            id: 'universal_14',
            title: '意外受伤',
            description: '你遇到了一个意外，受了点伤。',
            choices: [
                { text: '及时治疗', effects: { constitution: 1 }, cost: -2000 },
                { text: '自行处理', effects: { constitution: -1 }, probability: 0.5 }
            ]
        },
        {
            id: 'universal_15',
            title: '中奖',
            description: '你参加抽奖活动竟然中奖了！',
            choices: [
                { text: '再接再厉', effects: { luck: 1 }, money: 5000 },
                { text: '保持低调', effects: { luck: 2 } }
            ]
        },
        {
            id: 'universal_16',
            title: '继承遗产',
            description: '你意外继承了一笔遗产。',
            choices: [
                { text: '合理使用', effects: { luck: 2, charisma: 1 }, money: 100000 },
                { text: '大肆挥霍', effects: { charisma: -1, luck: 1 }, money: 80000 }
            ]
        },
        {
            id: 'universal_17',
            title: '遇到贵人',
            description: '你在人生中遇到了一个贵人。',
            choices: [
                { text: '虚心请教', effects: { intelligence: 2, charisma: 1 } },
                { text: '简单感谢', effects: { charisma: 1 } }
            ]
        },
        {
            id: 'universal_18',
            title: '搬家',
            description: '你需要搬到新地方居住。',
            choices: [
                { text: '搬到繁华区', effects: { charisma: 1, luck: -1 }, cost: -10000 },
                { text: '搬到安静区', effects: { constitution: 1, luck: 1 }, cost: -5000 }
            ]
        },
        {
            id: 'universal_19',
            title: '学车',
            description: '你决定去考驾照。',
            choices: [
                { text: '认真学', effects: { intelligence: 1, constitution: 1 }, cost: -5000 },
                { text: '速成班', effects: { luck: -1, constitution: -1 }, cost: -3000 }
            ]
        },
        {
            id: 'universal_20',
            title: '整形手术',
            description: '你对外貌有了新的追求。',
            choices: [
                { text: '大胆尝试', effects: { charisma: 3, constitution: -1 }, cost: -50000, probability: 0.6 },
                { text: '自然最美', effects: { charisma: 1 } }
            ]
        }
    ]
};

/**
 * 职业数据
 * 包含各种职业及其属性要求
 */
const CAREERS = {
    education: [
        { name: '教师', salary: 8000, required: { intelligence: 6, charisma: 6 } },
        { name: '教授', salary: 15000, required: { intelligence: 8, charisma: 7 } },
        { name: '培训师', salary: 12000, required: { intelligence: 7, charisma: 8 } }
    ],
    tech: [
        { name: '程序员', salary: 15000, required: { intelligence: 8 } },
        { name: '架构师', salary: 30000, required: { intelligence: 9 } },
        { name: 'CTO', salary: 50000, required: { intelligence: 10, charisma: 7 } }
    ],
    business: [
        { name: '销售', salary: 10000, required: { charisma: 7, luck: 6 } },
        { name: '经理', salary: 20000, required: { charisma: 8, intelligence: 7 } },
        { name: 'CEO', salary: 80000, required: { charisma: 10, intelligence: 9, luck: 8 } }
    ],
    medical: [
        { name: '护士', salary: 8000, required: { constitution: 7, charisma: 6 } },
        { name: '医生', salary: 20000, required: { intelligence: 8, constitution: 7 } },
        { name: '主任医师', salary: 40000, required: { intelligence: 10, constitution: 8 } }
    ],
    art: [
        { name: '设计师', salary: 10000, required: { intelligence: 7, charisma: 6 } },
        { name: '摄影师', salary: 12000, required: { charisma: 7, luck: 6 } },
        { name: '艺术家', salary: 20000, required: { charisma: 10, intelligence: 7 } }
    ],
    public: [
        { name: '公务员', salary: 10000, required: { intelligence: 6, charisma: 6 } },
        { name: '警察', salary: 12000, required: { constitution: 8, charisma: 6 } },
        { name: '官员', salary: 30000, required: { charisma: 9, intelligence: 8, luck: 7 } }
    ]
};

/**
 * 获取指定人生阶段的事件
 * @param {string} stageId - 人生阶段ID
 * @returns {Array} 事件数组
 */
function getEventsByStage(stageId) {
    return EVENTS[stageId] || [];
}

/**
 * 获取所有可用事件（包含通用事件）
 * @param {string} stageId - 人生阶段ID
 * @returns {Array} 合并后的事件数组
 */
function getAllEventsForStage(stageId) {
    const stageEvents = getEventsByStage(stageId);
    const universalEvents = EVENTS.universal;
    return [...stageEvents, ...universalEvents];
}

/**
 * 根据条件过滤事件
 * @param {Array} events - 事件数组
 * @param {Object} player - 玩家对象
 * @returns {Array} 过滤后的事件数组
 */
function filterEvents(events, player) {
    return events.filter(event => {
        if (event.probability !== undefined) {
            return Math.random() < event.probability;
        }
        return true;
    });
}
