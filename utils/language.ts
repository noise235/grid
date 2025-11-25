// Language utilities and translations
// 语言工具和翻译功能

export type Language = 'en' | 'zh';

export interface Translations {
  // Navigation
  home: string;
  dashboard: string;
  strategy: string;
  arbitrage: string;
  aiAssistant: string;
  docs: string;
  login: string;
  signup: string;
  account: string;
  
  // Dashboard
  totalAssets: string;
  todayPnL: string;
  activeStrategies: string;
  todayTrades: string;
  gridTrading: string;
  arbitrageMonitoring: string;
  aiSignals: string;
  riskMonitoring: string;
  
  // Strategy Management
  strategyManagement: string;
  createStrategy: string;
  totalStrategies: string;
  running: string;
  paused: string;
  totalInvestment: string;
  totalPnL: string;
  edit: string;
  start: string;
  stop: string;
  details: string;
  
  // Grid Strategy
  gridStrategy: string;
  priceRange: string;
  gridCount: string;
  winRate: string;
  totalTrades: string;
  
  // System Messages
  systemMessages: string;
  quickActions: string;
  marketOverview: string;
  connectionStatus: string;
  connected: string;
  lastUpdate: string;
  
  // AI Recommendations
  aiRecommendations: string;
  confidence: string;
  reason: string;
  acceptSuggestion: string;
  viewDetails: string;
  
  // Common
  cancel: string;
  confirm: string;
  save: string;
  delete: string;
  close: string;
  refresh: string;
  loading: string;
  success: string;
  error: string;
  warning: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    dashboard: 'Dashboard',
    strategy: 'Strategy',
    arbitrage: 'Arbitrage',
    aiAssistant: 'AI Assistant',
    docs: 'Docs',
    login: 'Login',
    signup: 'Sign Up',
    account: 'Account',
    
    // Dashboard
    totalAssets: 'Total Assets',
    todayPnL: 'Today P&L',
    activeStrategies: 'Active Strategies',
    todayTrades: 'Today Trades',
    gridTrading: 'Grid Trading',
    arbitrageMonitoring: 'Arbitrage Monitoring',
    aiSignals: 'AI Signals',
    riskMonitoring: 'Risk Monitoring',
    
    // Strategy Management
    strategyManagement: 'Strategy Management',
    createStrategy: 'Create Strategy',
    totalStrategies: 'Total Strategies',
    running: 'Running',
    paused: 'Paused',
    totalInvestment: 'Total Investment',
    totalPnL: 'Total P&L',
    edit: 'Edit',
    start: 'Start',
    stop: 'Stop',
    details: 'Details',
    
    // Grid Strategy
    gridStrategy: 'Grid Strategy',
    priceRange: 'Price Range',
    gridCount: 'Grid Count',
    winRate: 'Win Rate',
    totalTrades: 'Total Trades',
    
    // System Messages
    systemMessages: 'System Messages',
    quickActions: 'Quick Actions',
    marketOverview: 'Market Overview',
    connectionStatus: 'Connection Status',
    connected: 'Connected',
    lastUpdate: 'Last Update',
    
    // AI Recommendations
    aiRecommendations: 'AI Recommendations',
    confidence: 'Confidence',
    reason: 'Reason',
    acceptSuggestion: 'Accept Suggestion',
    viewDetails: 'View Details',
    
    // Common
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    close: 'Close',
    refresh: 'Refresh',
    loading: 'Loading',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
  },
  zh: {
    // Navigation
    home: '首页',
    dashboard: '交易系统',
    strategy: '策略管理',
    arbitrage: '套利监控',
    aiAssistant: 'AI助手',
    docs: '文档',
    login: '登录',
    signup: '注册',
    account: '账户',
    
    // Dashboard
    totalAssets: '总资产',
    todayPnL: '今日盈亏',
    activeStrategies: '活跃策略',
    todayTrades: '今日交易',
    gridTrading: '网格交易',
    arbitrageMonitoring: '套利监控',
    aiSignals: 'AI信号',
    riskMonitoring: '风险监控',
    
    // Strategy Management
    strategyManagement: '策略管理',
    createStrategy: '创建策略',
    totalStrategies: '总策略数',
    running: '运行中',
    paused: '已暂停',
    totalInvestment: '总投入',
    totalPnL: '总盈亏',
    edit: '编辑',
    start: '启动',
    stop: '停止',
    details: '详情',
    
    // Grid Strategy
    gridStrategy: '网格策略',
    priceRange: '价格区间',
    gridCount: '网格数量',
    winRate: '胜率',
    totalTrades: '总交易',
    
    // System Messages
    systemMessages: '系统消息',
    quickActions: '快速操作',
    marketOverview: '市场概况',
    connectionStatus: '连接状态',
    connected: '已连接',
    lastUpdate: '最后更新',
    
    // AI Recommendations
    aiRecommendations: 'AI推荐',
    confidence: '置信度',
    reason: '分析原因',
    acceptSuggestion: '采纳建议',
    viewDetails: '查看详情',
    
    // Common
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    close: '关闭',
    refresh: '刷新',
    loading: '加载中',
    success: '成功',
    error: '错误',
    warning: '警告',
  },
};

export const getTranslation = (language: Language, key: keyof Translations): string => {
  return translations[language][key] || key;
};

export const t = (language: Language) => (key: keyof Translations): string => {
  return getTranslation(language, key);
};
