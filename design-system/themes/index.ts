// 主题系统 Theme System
// 导出所有主题配置

export * from './dark';

import { darkTheme } from './dark';

// 主题映射
export const themes = {
  dark: darkTheme,
} as const;

// 默认主题
export const defaultTheme = darkTheme;

// 主题类型
export type Theme = typeof darkTheme;
export type ThemeName = keyof typeof themes;
