// Language Switcher Component
// 语言切换组件

import React from 'react';
import { cn } from '../../utils/cn';

export interface LanguageSwitcherProps {
  /** Current language */
  currentLanguage: 'en' | 'zh';
  /** Language change callback */
  onLanguageChange: (language: 'en' | 'zh') => void;
  /** Component size */
  size?: 'sm' | 'md';
  /** Additional CSS classes */
  className?: string;
}

export const LanguageSwitcher = React.forwardRef<HTMLDivElement, LanguageSwitcherProps>(
  ({ currentLanguage, onLanguageChange, size = 'md', className }, ref) => {
    const languages = [
      { code: 'en' as const, label: 'EN', name: 'English' },
      { code: 'zh' as const, label: '中', name: '中文' },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center bg-background-tertiary rounded-lg border border-border-primary',
          size === 'sm' ? 'p-1' : 'p-1.5',
          className
        )}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={cn(
              'px-2 py-1 text-xs font-medium rounded transition-all duration-200',
              size === 'sm' ? 'min-w-[24px]' : 'min-w-[28px]',
              currentLanguage === lang.code
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
            )}
            title={lang.name}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }
);

LanguageSwitcher.displayName = 'LanguageSwitcher';
