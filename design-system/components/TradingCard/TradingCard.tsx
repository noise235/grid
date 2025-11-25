// 交易卡片组件 Trading Card Component
// 专门用于显示交易相关信息的卡片

import React from 'react';
import { cn } from '../../utils/cn';

export interface TradingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 交易对 */
  pair: string;
  /** 当前价格 */
  price: number;
  /** 价格变化 */
  priceChange: number;
  /** 价格变化百分比 */
  priceChangePercent: number;
  /** 24小时成交量 */
  volume24h?: number;
  /** 是否显示详细信息 */
  showDetails?: boolean;
  /** 点击回调 */
  onClick?: () => void;
}

export const TradingCard = React.forwardRef<HTMLDivElement, TradingCardProps>(
  (
    {
      className,
      pair,
      price,
      priceChange,
      priceChangePercent,
      volume24h,
      showDetails = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const isPositive = priceChange >= 0;
    const priceColor = isPositive ? 'text-success-400' : 'text-danger-400';
    
    return (
      <div
        ref={ref}
        className={cn(
          'bg-background-card border border-border-primary rounded-lg p-4',
          'hover:shadow-dark-lg transition-all duration-200',
          onClick && 'cursor-pointer hover:border-border-secondary',
          className
        )}
        onClick={onClick}
        {...props}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary font-mono">
            {pair}
          </h3>
          <div className={cn(
            'px-2 py-1 rounded text-xs font-medium',
            isPositive 
              ? 'bg-success-900/30 text-success-300 border border-success-700/50'
              : 'bg-danger-900/30 text-danger-300 border border-danger-700/50'
          )}>
            {isPositive ? '↗' : '↘'} {priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary text-sm">当前价格</span>
            <span className="text-xl font-mono font-bold text-text-primary">
              ${price.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text-secondary text-sm">24h变化</span>
            <span className={cn('font-mono font-semibold', priceColor)}>
              {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}
            </span>
          </div>
          
          {showDetails && volume24h && (
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">24h成交量</span>
              <span className="font-mono text-text-primary">
                ${volume24h.toLocaleString()}
              </span>
            </div>
          )}
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-3 border-t border-border-primary">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-tertiary">最高</span>
                <div className="font-mono text-text-primary">
                  ${(price * 1.05).toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-text-tertiary">最低</span>
                <div className="font-mono text-text-primary">
                  ${(price * 0.95).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

TradingCard.displayName = 'TradingCard';
