// 按钮组件 Button Component
// 基于设计系统的按钮实现

import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮变体 */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 是否为加载状态 */
  loading?: boolean;
  /** 是否为全宽按钮 */
  fullWidth?: boolean;
  /** 左侧图标 */
  leftIcon?: React.ReactNode;
  /** 右侧图标 */
  rightIcon?: React.ReactNode;
}

const buttonVariants = {
  primary: [
    'bg-primary-500 text-white border-transparent',
    'hover:bg-primary-600 hover:shadow-md',
    'active:bg-primary-700 active:shadow-sm',
    'focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-2 focus:ring-offset-background-primary',
    'disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed',
  ],
  secondary: [
    'bg-background-tertiary text-text-primary border-border-primary',
    'hover:bg-secondary-700 hover:shadow-md',
    'active:bg-secondary-800 active:shadow-sm',
    'focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-2 focus:ring-offset-background-primary',
    'disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed',
  ],
  ghost: [
    'bg-transparent text-text-primary border-transparent',
    'hover:bg-background-tertiary hover:shadow-sm',
    'active:bg-secondary-800 active:shadow-inner',
    'focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-2 focus:ring-offset-background-primary',
    'disabled:text-neutral-500 disabled:cursor-not-allowed',
  ],
  danger: [
    'bg-danger-500 text-white border-transparent',
    'hover:bg-danger-600 hover:shadow-md',
    'active:bg-danger-700 active:shadow-sm',
    'focus:ring-2 focus:ring-danger-500/30 focus:ring-offset-2 focus:ring-offset-background-primary',
    'disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed',
  ],
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm font-medium rounded-md',
  md: 'px-4 py-2 text-sm font-medium rounded-lg',
  lg: 'px-6 py-3 text-base font-medium rounded-lg',
  xl: 'px-8 py-4 text-lg font-semibold rounded-xl',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          // 基础样式
          'inline-flex items-center justify-center gap-2',
          'border font-medium transition-all duration-200',
          'focus:outline-none focus:ring-offset-background-primary',
          
          // 尺寸样式
          buttonSizes[size],
          
          // 变体样式
          buttonVariants[variant],
          
          // 全宽样式
          fullWidth && 'w-full',
          
          // 加载状态样式
          loading && 'cursor-wait',
          
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {/* 左侧图标 */}
        {leftIcon && !loading && (
          <span className="flex-shrink-0">
            {leftIcon}
          </span>
        )}
        
        {/* 加载指示器 */}
        {loading && (
          <span className="flex-shrink-0">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        
        {/* 按钮文本 */}
        {children && (
          <span className={cn(
            'truncate',
            loading && 'opacity-70'
          )}>
            {children}
          </span>
        )}
        
        {/* 右侧图标 */}
        {rightIcon && !loading && (
          <span className="flex-shrink-0">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
