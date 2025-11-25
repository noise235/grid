// 类名合并工具 Class Name Utility
// 用于合并和条件化CSS类名

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并CSS类名的工具函数
 * 结合了clsx和tailwind-merge的功能
 * @param inputs - 类名输入
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
