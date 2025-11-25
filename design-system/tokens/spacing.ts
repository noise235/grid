// 间距系统 Spacing System
// 基于8px网格系统的间距规范

export const spacing = {
  // 基础间距 Base Spacing (8px grid)
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

// 语义化间距 Semantic Spacing
export const semanticSpacing = {
  // 组件内部间距
  component: {
    xs: spacing[1],    // 4px - 最小间距
    sm: spacing[2],    // 8px - 小间距
    md: spacing[4],    // 16px - 中等间距
    lg: spacing[6],    // 24px - 大间距
    xl: spacing[8],    // 32px - 超大间距
  },

  // 布局间距
  layout: {
    xs: spacing[4],    // 16px - 最小布局间距
    sm: spacing[6],    // 24px - 小布局间距
    md: spacing[8],    // 32px - 中等布局间距
    lg: spacing[12],   // 48px - 大布局间距
    xl: spacing[16],   // 64px - 超大布局间距
    '2xl': spacing[24], // 96px - 巨大布局间距
  },

  // 容器内边距
  container: {
    xs: spacing[3],    // 12px
    sm: spacing[4],    // 16px
    md: spacing[6],    // 24px
    lg: spacing[8],    // 32px
    xl: spacing[12],   // 48px
  },

  // 卡片间距
  card: {
    padding: spacing[6],     // 24px - 卡片内边距
    gap: spacing[4],         // 16px - 卡片内元素间距
    margin: spacing[4],      // 16px - 卡片外边距
  },

  // 表单间距
  form: {
    fieldGap: spacing[4],    // 16px - 表单字段间距
    labelGap: spacing[2],    // 8px - 标签与输入框间距
    groupGap: spacing[6],    // 24px - 表单组间距
    buttonGap: spacing[3],   // 12px - 按钮间距
  },

  // 导航间距
  navigation: {
    itemGap: spacing[6],     // 24px - 导航项间距
    padding: spacing[4],     // 16px - 导航内边距
    height: spacing[16],     // 64px - 导航栏高度
  },

  // 侧边栏间距
  sidebar: {
    width: spacing[64],      // 256px - 侧边栏宽度
    padding: spacing[4],     // 16px - 侧边栏内边距
    itemGap: spacing[2],     // 8px - 侧边栏项间距
  },

  // 弹窗间距
  modal: {
    padding: spacing[6],     // 24px - 弹窗内边距
    gap: spacing[4],         // 16px - 弹窗内元素间距
    margin: spacing[4],      // 16px - 弹窗边距
  },

  // 表格间距
  table: {
    cellPadding: spacing[3], // 12px - 表格单元格内边距
    rowGap: spacing[1],      // 4px - 表格行间距
    headerPadding: spacing[4], // 16px - 表头内边距
  },

  // 图表间距
  chart: {
    margin: spacing[4],      // 16px - 图表外边距
    padding: spacing[6],     // 24px - 图表内边距
    legendGap: spacing[4],   // 16px - 图例间距
  }
} as const;

// 响应式间距 Responsive Spacing
export const responsiveSpacing = {
  // 移动端间距调整
  mobile: {
    container: spacing[4],   // 16px - 移动端容器内边距
    section: spacing[8],     // 32px - 移动端区块间距
    component: spacing[3],   // 12px - 移动端组件间距
  },

  // 平板端间距调整
  tablet: {
    container: spacing[6],   // 24px - 平板端容器内边距
    section: spacing[12],    // 48px - 平板端区块间距
    component: spacing[4],   // 16px - 平板端组件间距
  },

  // 桌面端间距调整
  desktop: {
    container: spacing[8],   // 32px - 桌面端容器内边距
    section: spacing[16],    // 64px - 桌面端区块间距
    component: spacing[6],   // 24px - 桌面端组件间距
  }
} as const;

export type SpacingToken = typeof spacing;
export type SemanticSpacingToken = typeof semanticSpacing;
