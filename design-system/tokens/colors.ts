// 颜色系统 Color System
// 基于图片中的深色主题和金融平台风格

export const colors = {
  // 主色调 Primary Colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe', 
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // 主蓝色
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  // 辅助色 Secondary Colors  
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // 成功色 Success Colors (绿色 - 盈利)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // 危险色 Danger Colors (红色 - 亏损)
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // 警告色 Warning Colors (黄色)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // 中性色 Neutral Colors (深色主题)
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // 背景色 Background Colors (深色主题)
  background: {
    primary: '#0f172a',    // 主背景 - 深蓝黑
    secondary: '#1e293b',  // 次级背景 - 深灰蓝
    tertiary: '#334155',   // 三级背景 - 中灰蓝
    card: '#1e293b',       // 卡片背景
    modal: '#0f172a',      // 弹窗背景
    overlay: 'rgba(15, 23, 42, 0.8)', // 遮罩层
  },

  // 文本色 Text Colors
  text: {
    primary: '#f8fafc',    // 主文本 - 白色
    secondary: '#cbd5e1',  // 次级文本 - 浅灰
    tertiary: '#94a3b8',   // 三级文本 - 中灰
    disabled: '#64748b',   // 禁用文本 - 深灰
    inverse: '#0f172a',    // 反色文本 - 深色
  },

  // 边框色 Border Colors
  border: {
    primary: '#334155',    // 主边框
    secondary: '#475569',  // 次级边框
    focus: '#0ea5e9',      // 聚焦边框
    error: '#ef4444',      // 错误边框
    success: '#22c55e',    // 成功边框
  },

  // 特殊用途色 Special Purpose Colors
  special: {
    // 数据可视化
    chart: {
      line1: '#0ea5e9',    // 图表线条1 - 蓝色
      line2: '#22c55e',    // 图表线条2 - 绿色  
      line3: '#f59e0b',    // 图表线条3 - 橙色
      line4: '#ef4444',    // 图表线条4 - 红色
      line5: '#8b5cf6',    // 图表线条5 - 紫色
      grid: '#334155',     // 网格线
      axis: '#64748b',     // 坐标轴
    },
    
    // 交易相关
    trading: {
      buy: '#22c55e',      // 买入 - 绿色
      sell: '#ef4444',     // 卖出 - 红色
      profit: '#22c55e',   // 盈利 - 绿色
      loss: '#ef4444',     // 亏损 - 红色
      neutral: '#64748b',  // 中性 - 灰色
    },

    // 状态指示
    status: {
      online: '#22c55e',   // 在线 - 绿色
      offline: '#64748b',  // 离线 - 灰色
      error: '#ef4444',    // 错误 - 红色
      warning: '#f59e0b',  // 警告 - 橙色
      info: '#0ea5e9',     // 信息 - 蓝色
    }
  }
} as const;

// 颜色工具函数
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // 将十六进制颜色转换为带透明度的rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export type ColorToken = typeof colors;
