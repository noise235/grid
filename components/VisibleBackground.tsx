// 可见动画背景组件 - 确保动画效果明显
import React from 'react';

interface VisibleBackgroundProps {
  className?: string;
}

export const VisibleBackground: React.FC<VisibleBackgroundProps> = ({ 
  className = '' 
}) => {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    >
      {/* 主背景渐变 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0e1a 0%, #141b2d 50%, #1e2a3a 100%)'
        }}
      />
      
      {/* 动态网格背景 */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79, 158, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 158, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />
      
      {/* 发光圆点 */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary-400"
            style={{
              width: '4px',
              height: '4px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>
      
      {/* 移动的光线 */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"
            style={{
              width: '200px',
              top: `${20 + i * 30}%`,
              left: '-200px',
              animation: `moveRight ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 2}s`,
              opacity: 0.4
            }}
          />
        ))}
      </div>
      
      {/* 中心发光效果 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(79, 158, 255, 0.1) 0%, transparent 60%)',
          animation: 'breathe 4s ease-in-out infinite'
        }}
      />
      
      {/* CSS动画定义 */}
      <style jsx>{`
        @keyframes gridMove {
          0% { 
            background-position: 0 0, 0 0; 
            transform: translateX(0) translateY(0);
          }
          25% { 
            background-position: 25px 12px, 12px 25px; 
            transform: translateX(5px) translateY(-3px);
          }
          50% { 
            background-position: 50px 0, 0 50px; 
            transform: translateX(0) translateY(5px);
          }
          75% { 
            background-position: 25px -12px, -12px 25px; 
            transform: translateX(-5px) translateY(-3px);
          }
          100% { 
            background-position: 0 0, 0 0; 
            transform: translateX(0) translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.5);
          }
        }
        
        @keyframes moveRight {
          0% { 
            left: -200px; 
            opacity: 0;
          }
          10% { 
            opacity: 0.4;
          }
          90% { 
            opacity: 0.4;
          }
          100% { 
            left: 100%; 
            opacity: 0;
          }
        }
        
        @keyframes breathe {
          0%, 100% { 
            opacity: 0.1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.2; 
            transform: scale(1.1);
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-10px) rotate(120deg); 
          }
          66% { 
            transform: translateY(5px) rotate(240deg); 
          }
        }
      `}</style>
      
      {/* 浮动几何图形 */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute border border-primary-400 opacity-20"
            style={{
              width: '20px',
              height: '20px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              borderRadius: i % 2 === 0 ? '50%' : '0'
            }}
          />
        ))}
      </div>
    </div>
  );
};
