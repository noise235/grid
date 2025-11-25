// 阴影系统 Shadow System
// 适用于深色主题的阴影效果

export const shadows = {
  // 基础阴影 Base Shadows
  none: 'none',
  
  // 小阴影 - 用于按钮、小卡片
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  
  // 默认阴影 - 用于卡片、下拉菜单
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  
  // 大阴影 - 用于弹窗、侧边栏
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
  
  // 超大阴影 - 用于模态框
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
  
  // 巨大阴影 - 用于全屏覆盖
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',

  // 内阴影 Inner Shadows
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  
  // 特殊阴影效果
  glow: {
    // 发光效果 - 用于聚焦状态
    blue: '0 0 0 3px rgba(14, 165, 233, 0.3)',
    green: '0 0 0 3px rgba(34, 197, 94, 0.3)',
    red: '0 0 0 3px rgba(239, 68, 68, 0.3)',
    yellow: '0 0 0 3px rgba(245, 158, 11, 0.3)',
  },

  // 边框阴影 - 用于输入框聚焦
  outline: {
    blue: '0 0 0 2px rgba(14, 165, 233, 0.5)',
    green: '0 0 0 2px rgba(34, 197, 94, 0.5)',
    red: '0 0 0 2px rgba(239, 68, 68, 0.5)',
    yellow: '0 0 0 2px rgba(245, 158, 11, 0.5)',
  },

  // 深色主题专用阴影
  dark: {
    // 卡片阴影 - 在深色背景上更明显
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.4)',
    
    // 弹出层阴影
    popover: '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.5)',
    
    // 模态框阴影
    modal: '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.6)',
    
    // 导航栏阴影
    navbar: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    
    // 侧边栏阴影
    sidebar: '2px 0 8px 0 rgba(0, 0, 0, 0.5)',
  },

  // 交互状态阴影
  interactive: {
    // 悬停状态
    hover: '0 8px 12px -2px rgba(0, 0, 0, 0.5), 0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    
    // 按下状态
    pressed: '0 2px 4px -1px rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
    
    // 聚焦状态
    focus: '0 0 0 3px rgba(14, 165, 233, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  }
} as const;

// 语义化阴影 Semantic Shadows
export const semanticShadows = {
  // 组件阴影
  button: {
    default: shadows.sm,
    hover: shadows.md,
    pressed: shadows.inner,
    focus: shadows.interactive.focus,
  },

  card: {
    default: shadows.dark.card,
    hover: shadows.interactive.hover,
    elevated: shadows.lg,
  },

  modal: {
    backdrop: shadows.dark.modal,
    content: shadows.xl,
  },

  dropdown: {
    default: shadows.dark.popover,
  },

  tooltip: {
    default: shadows.lg,
  },

  navigation: {
    navbar: shadows.dark.navbar,
    sidebar: shadows.dark.sidebar,
  },

  // 状态阴影
  success: shadows.glow.green,
  error: shadows.glow.red,
  warning: shadows.glow.yellow,
  info: shadows.glow.blue,
} as const;

export type ShadowToken = typeof shadows;
export type SemanticShadowToken = typeof semanticShadows;
