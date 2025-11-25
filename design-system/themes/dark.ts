// 深色主题 Dark Theme
// 基于图片风格的深色主题配置

import { colors } from '../tokens/colors';

export const darkTheme = {
  name: 'dark',
  
  // 颜色映射 Color Mapping
  colors: {
    // 背景色
    background: {
      primary: colors.background.primary,     // #0f172a - 主背景
      secondary: colors.background.secondary, // #1e293b - 次级背景
      tertiary: colors.background.tertiary,   // #334155 - 三级背景
      card: colors.background.card,           // #1e293b - 卡片背景
      modal: colors.background.modal,         // #0f172a - 弹窗背景
      overlay: colors.background.overlay,     // rgba(15, 23, 42, 0.8) - 遮罩
    },

    // 文本色
    text: {
      primary: colors.text.primary,     // #f8fafc - 主文本
      secondary: colors.text.secondary, // #cbd5e1 - 次级文本
      tertiary: colors.text.tertiary,   // #94a3b8 - 三级文本
      disabled: colors.text.disabled,   // #64748b - 禁用文本
      inverse: colors.text.inverse,     // #0f172a - 反色文本
    },

    // 边框色
    border: {
      primary: colors.border.primary,   // #334155 - 主边框
      secondary: colors.border.secondary, // #475569 - 次级边框
      focus: colors.border.focus,       // #0ea5e9 - 聚焦边框
      error: colors.border.error,       // #ef4444 - 错误边框
      success: colors.border.success,   // #22c55e - 成功边框
    },

    // 品牌色
    primary: colors.primary,
    secondary: colors.secondary,

    // 状态色
    success: colors.success,
    danger: colors.danger,
    warning: colors.warning,

    // 特殊用途色
    trading: colors.special.trading,
    status: colors.special.status,
    chart: colors.special.chart,
  },

  // 组件样式 Component Styles
  components: {
    // 按钮样式
    button: {
      primary: {
        background: colors.primary[500],
        backgroundHover: colors.primary[600],
        backgroundPressed: colors.primary[700],
        text: colors.text.inverse,
        border: 'transparent',
      },
      secondary: {
        background: colors.background.tertiary,
        backgroundHover: colors.secondary[700],
        backgroundPressed: colors.secondary[800],
        text: colors.text.primary,
        border: colors.border.primary,
      },
      ghost: {
        background: 'transparent',
        backgroundHover: colors.background.tertiary,
        backgroundPressed: colors.secondary[800],
        text: colors.text.primary,
        border: 'transparent',
      },
      danger: {
        background: colors.danger[500],
        backgroundHover: colors.danger[600],
        backgroundPressed: colors.danger[700],
        text: colors.text.inverse,
        border: 'transparent',
      },
    },

    // 输入框样式
    input: {
      background: colors.background.secondary,
      backgroundFocus: colors.background.secondary,
      text: colors.text.primary,
      placeholder: colors.text.tertiary,
      border: colors.border.primary,
      borderFocus: colors.border.focus,
      borderError: colors.border.error,
    },

    // 卡片样式
    card: {
      background: colors.background.card,
      border: colors.border.primary,
      text: colors.text.primary,
    },

    // 导航样式
    navigation: {
      background: colors.background.primary,
      border: colors.border.primary,
      text: colors.text.primary,
      textActive: colors.primary[400],
      backgroundActive: colors.background.tertiary,
    },

    // 侧边栏样式
    sidebar: {
      background: colors.background.secondary,
      border: colors.border.primary,
      text: colors.text.primary,
      textActive: colors.primary[400],
      backgroundActive: colors.background.tertiary,
    },

    // 模态框样式
    modal: {
      background: colors.background.modal,
      overlay: colors.background.overlay,
      border: colors.border.primary,
      text: colors.text.primary,
    },

    // 表格样式
    table: {
      background: colors.background.card,
      backgroundStripe: colors.background.tertiary,
      border: colors.border.primary,
      text: colors.text.primary,
      textHeader: colors.text.secondary,
    },

    // 图表样式
    chart: {
      background: colors.background.card,
      grid: colors.special.chart.grid,
      axis: colors.special.chart.axis,
      lines: [
        colors.special.chart.line1,
        colors.special.chart.line2,
        colors.special.chart.line3,
        colors.special.chart.line4,
        colors.special.chart.line5,
      ],
    },

    // 交易相关样式
    trading: {
      buy: colors.special.trading.buy,
      sell: colors.special.trading.sell,
      profit: colors.special.trading.profit,
      loss: colors.special.trading.loss,
      neutral: colors.special.trading.neutral,
    },

    // 状态指示器样式
    status: {
      online: colors.special.status.online,
      offline: colors.special.status.offline,
      error: colors.special.status.error,
      warning: colors.special.status.warning,
      info: colors.special.status.info,
    },
  },

  // 语义化颜色 Semantic Colors
  semantic: {
    // 成功状态
    success: {
      background: colors.success[900],
      border: colors.success[700],
      text: colors.success[300],
      icon: colors.success[400],
    },

    // 错误状态
    error: {
      background: colors.danger[900],
      border: colors.danger[700],
      text: colors.danger[300],
      icon: colors.danger[400],
    },

    // 警告状态
    warning: {
      background: colors.warning[900],
      border: colors.warning[700],
      text: colors.warning[300],
      icon: colors.warning[400],
    },

    // 信息状态
    info: {
      background: colors.primary[900],
      border: colors.primary[700],
      text: colors.primary[300],
      icon: colors.primary[400],
    },
  },
} as const;

export type DarkTheme = typeof darkTheme;
