// 字体系统 Typography System
// 适用于金融交易平台的字体规范

export const typography = {
  // 字体族 Font Families
  fontFamily: {
    sans: [
      'Inter', 
      '-apple-system', 
      'BlinkMacSystemFont', 
      'Segoe UI', 
      'Roboto', 
      'Helvetica Neue', 
      'Arial', 
      'sans-serif'
    ],
    mono: [
      'JetBrains Mono',
      'Fira Code', 
      'Monaco', 
      'Consolas', 
      'Liberation Mono', 
      'Courier New', 
      'monospace'
    ],
    display: [
      'Inter Display',
      'Inter', 
      '-apple-system', 
      'BlinkMacSystemFont', 
      'sans-serif'
    ]
  },

  // 字体大小 Font Sizes
  fontSize: {
    xs: '0.75rem',    // 12px - 小标签
    sm: '0.875rem',   // 14px - 辅助文本
    base: '1rem',     // 16px - 基础文本
    lg: '1.125rem',   // 18px - 大文本
    xl: '1.25rem',    // 20px - 小标题
    '2xl': '1.5rem',  // 24px - 中标题
    '3xl': '1.875rem', // 30px - 大标题
    '4xl': '2.25rem', // 36px - 超大标题
    '5xl': '3rem',    // 48px - 展示标题
    '6xl': '3.75rem', // 60px - 英雄标题
  },

  // 字重 Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // 行高 Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // 字间距 Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // 预定义文本样式 Text Styles
  textStyles: {
    // 标题样式
    'display-2xl': {
      fontSize: '4.5rem',   // 72px
      lineHeight: '1.1',
      fontWeight: '800',
      letterSpacing: '-0.025em',
    },
    'display-xl': {
      fontSize: '3.75rem',  // 60px
      lineHeight: '1.1',
      fontWeight: '800',
      letterSpacing: '-0.025em',
    },
    'display-lg': {
      fontSize: '3rem',     // 48px
      lineHeight: '1.2',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    'display-md': {
      fontSize: '2.25rem',  // 36px
      lineHeight: '1.2',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    'display-sm': {
      fontSize: '1.875rem', // 30px
      lineHeight: '1.3',
      fontWeight: '600',
      letterSpacing: '-0.025em',
    },

    // 标题样式
    'heading-xl': {
      fontSize: '1.5rem',   // 24px
      lineHeight: '1.3',
      fontWeight: '600',
    },
    'heading-lg': {
      fontSize: '1.25rem',  // 20px
      lineHeight: '1.4',
      fontWeight: '600',
    },
    'heading-md': {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.4',
      fontWeight: '600',
    },
    'heading-sm': {
      fontSize: '1rem',     // 16px
      lineHeight: '1.5',
      fontWeight: '600',
    },

    // 正文样式
    'body-xl': {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.6',
      fontWeight: '400',
    },
    'body-lg': {
      fontSize: '1rem',     // 16px
      lineHeight: '1.6',
      fontWeight: '400',
    },
    'body-md': {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5',
      fontWeight: '400',
    },
    'body-sm': {
      fontSize: '0.75rem',  // 12px
      lineHeight: '1.5',
      fontWeight: '400',
    },

    // 标签样式
    'label-xl': {
      fontSize: '1rem',     // 16px
      lineHeight: '1.5',
      fontWeight: '500',
    },
    'label-lg': {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5',
      fontWeight: '500',
    },
    'label-md': {
      fontSize: '0.75rem',  // 12px
      lineHeight: '1.5',
      fontWeight: '500',
    },
    'label-sm': {
      fontSize: '0.6875rem', // 11px
      lineHeight: '1.4',
      fontWeight: '500',
    },

    // 代码样式
    'code-xl': {
      fontSize: '1rem',     // 16px
      lineHeight: '1.6',
      fontWeight: '400',
      fontFamily: 'mono',
    },
    'code-lg': {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.6',
      fontWeight: '400',
      fontFamily: 'mono',
    },
    'code-md': {
      fontSize: '0.75rem',  // 12px
      lineHeight: '1.5',
      fontWeight: '400',
      fontFamily: 'mono',
    },
    'code-sm': {
      fontSize: '0.6875rem', // 11px
      lineHeight: '1.4',
      fontWeight: '400',
      fontFamily: 'mono',
    },

    // 数字样式 (用于交易数据)
    'number-xl': {
      fontSize: '1.5rem',   // 24px
      lineHeight: '1.2',
      fontWeight: '600',
      fontFamily: 'mono',
      letterSpacing: '0.025em',
    },
    'number-lg': {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.3',
      fontWeight: '600',
      fontFamily: 'mono',
      letterSpacing: '0.025em',
    },
    'number-md': {
      fontSize: '1rem',     // 16px
      lineHeight: '1.4',
      fontWeight: '500',
      fontFamily: 'mono',
      letterSpacing: '0.025em',
    },
    'number-sm': {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.4',
      fontWeight: '500',
      fontFamily: 'mono',
      letterSpacing: '0.025em',
    },
  }
} as const;

export type TypographyToken = typeof typography;
