// 卡片组件 Card Component
// 基于设计系统的卡片实现

import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 卡片变体 */
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  /** 卡片尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否可悬停 */
  hoverable?: boolean;
  /** 是否可点击 */
  clickable?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 标题 */
  title?: string;
  /** 副标题 */
  subtitle?: string;
  /** 右侧操作区域 */
  action?: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const cardVariants = {
  default: [
    'bg-background-card border border-border-primary',
    'shadow-dark-card',
  ],
  elevated: [
    'bg-background-card border border-border-primary',
    'shadow-lg',
  ],
  outlined: [
    'bg-transparent border-2 border-border-primary',
  ],
  ghost: [
    'bg-transparent border-none',
  ],
};

const cardSizes = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const cardInteractive = {
  hoverable: 'hover:shadow-interactive-hover transition-shadow duration-200',
  clickable: 'cursor-pointer hover:shadow-interactive-hover active:shadow-pressed transition-all duration-200',
};

// 主卡片组件
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      hoverable = false,
      clickable = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // 基础样式
          'rounded-lg overflow-hidden',
          
          // 变体样式
          cardVariants[variant],
          
          // 尺寸样式
          cardSizes[size],
          
          // 交互样式
          hoverable && cardInteractive.hoverable,
          clickable && cardInteractive.clickable,
          
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// 卡片头部组件
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    {
      className,
      title,
      subtitle,
      action,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start justify-between',
          'pb-4 border-b border-border-primary',
          className
        )}
        {...props}
      >
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="text-lg font-semibold text-text-primary truncate">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-text-secondary">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        
        {action && (
          <div className="flex-shrink-0 ml-4">
            {action}
          </div>
        )}
      </div>
    );
  }
);

// 卡片内容组件
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'text-text-primary',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// 卡片底部组件
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'pt-4 border-t border-border-primary',
          'flex items-center justify-between',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// 设置显示名称
Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
