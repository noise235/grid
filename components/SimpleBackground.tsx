// 简化版背景组件 - 确保内容正常显示
import React from 'react';

interface SimpleBackgroundProps {
  className?: string;
}

export const SimpleBackground: React.FC<SimpleBackgroundProps> = ({ 
  className = '' 
}) => {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        background: `
          linear-gradient(135deg, #0a0e1a 0%, #141b2d 50%, #1e2a3a 100%),
          radial-gradient(circle at 50% 50%, rgba(79, 158, 255, 0.1) 0%, transparent 50%),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 49px,
            rgba(79, 158, 255, 0.03) 50px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 49px,
            rgba(79, 158, 255, 0.03) 50px
          )
        `,
        backgroundSize: '100% 100%, 400px 400px, 50px 50px, 50px 50px',
        animation: 'backgroundShift 20s ease-in-out infinite',
        zIndex: -10
      }}
    >
      {/* CSS动画 */}
      <style jsx>{`
        @keyframes backgroundShift {
          0%, 100% { 
            background-position: 0% 0%, 0% 0%, 0px 0px, 0px 0px; 
          }
          25% { 
            background-position: 0% 0%, 100px 100px, 10px 5px, 5px 10px; 
          }
          50% { 
            background-position: 0% 0%, 200px 0px, 20px 10px, 10px 20px; 
          }
          75% { 
            background-position: 0% 0%, 100px -100px, 10px 15px, 15px 10px; 
          }
        }
      `}</style>
      
      {/* 浮动粒子效果 */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
