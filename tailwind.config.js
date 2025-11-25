/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 背景色系 - 基于图片中的深色主题
        background: {
          primary: '#0a0e1a',     // 最深背景 - 深蓝黑
          secondary: '#141b2d',   // 次背景 - 深蓝灰
          tertiary: '#1e2a3a',    // 三级背景 - 中蓝灰
          card: '#141b2d',        // 卡片背景
          modal: '#1e2a3a',       // 模态框背景
          overlay: 'rgba(10, 14, 26, 0.9)', // 遮罩层
          sidebar: '#0f1419',     // 侧边栏背景
        },
        
        // 文本色系 - 高对比度
        text: {
          primary: '#ffffff',     // 主文本 - 纯白
          secondary: '#b8c5d1',   // 次文本 - 浅蓝灰
          tertiary: '#8892a0',    // 三级文本 - 中灰
          inverse: '#0a0e1a',     // 反色文本 - 深色
          accent: '#4f9eff',      // 强调文本 - 蓝色
        },
        
        // 边框色系 - 微妙边框
        border: {
          primary: '#2a3441',     // 主边框 - 深灰蓝
          secondary: '#3d4b5c',   // 次边框 - 中灰蓝
          focus: '#4f9eff',       // 聚焦边框 - 蓝色
          error: '#ff4757',       // 错误边框 - 红色
          success: '#2ed573',     // 成功边框 - 绿色
        },
        
        // 主色系 - 蓝色调
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b8dcff',
          300: '#7cc4ff',
          400: '#4f9eff',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e2a5a',
        },
        
        // 次色系 - 灰蓝调
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        
        // 成功色系 - 绿色调
        success: {
          50: '#f0fff4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#2ed573',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        
        // 警告色系 - 橙色调
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#ffa726',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        
        // 危险色系 - 红色调
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#ff4757',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        
        // 图表颜色 - 专业金融色彩
        chart: {
          green: '#2ed573',       // 涨幅绿
          red: '#ff4757',         // 跌幅红
          blue: '#4f9eff',        // 中性蓝
          yellow: '#ffa726',      // 警告黄
          purple: '#a55eea',      // 紫色
          cyan: '#26d0ce',        // 青色
        },
      },
      
      // 阴影系统 - 深色主题优化
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
        'dark-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        'dark-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)',
        'glow-blue': '0 0 20px rgba(79, 158, 255, 0.3)',
        'glow-green': '0 0 20px rgba(46, 213, 115, 0.3)',
        'glow-red': '0 0 20px rgba(255, 71, 87, 0.3)',
      },
      
      // 字体系统 - 现代字体
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // 间距系统
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // 动画系统 - 流畅动画
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(79, 158, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(79, 158, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      // 渐变系统
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #4f9eff 0%, #2563eb 100%)',
        'gradient-success': 'linear-gradient(135deg, #2ed573 0%, #22c55e 100%)',
        'gradient-danger': 'linear-gradient(135deg, #ff4757 0%, #ef4444 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0e1a 0%, #141b2d 100%)',
      },
      
      // Z-index 系统
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
};
