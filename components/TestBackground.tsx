// 测试动画背景 - 非常明显的动画效果
import React from 'react';

export const TestBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -999 }}
    >
      {/* 基础背景 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0e1a 0%, #141b2d 50%, #1e2a3a 100%)'
        }}
      />
      
      {/* 非常明显的移动网格 */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79, 158, 255, 0.3) 2px, transparent 2px),
            linear-gradient(90deg, rgba(79, 158, 255, 0.3) 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px',
          animation: 'moveGrid 3s linear infinite'
        }}
      />
      
      {/* 大的脉动圆点 */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary-400"
            style={{
              width: '12px',
              height: '12px',
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `bigPulse ${1 + i * 0.2}s ease-in-out infinite`,
              opacity: 0.8
            }}
          />
        ))}
      </div>
      
      {/* 快速移动的光条 */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent"
            style={{
              width: '300px',
              top: `${15 + i * 15}%`,
              left: '-300px',
              animation: `fastMove ${2 + i * 0.5}s linear infinite`,
              opacity: 0.6
            }}
          />
        ))}
      </div>
      
      {/* 旋转的方块 */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute border-2 border-primary-400"
            style={{
              width: '30px',
              height: '30px',
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animation: `rotate ${2 + i * 0.3}s linear infinite`,
              opacity: 0.5
            }}
          />
        ))}
      </div>
      
      {/* 中心大发光 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(79, 158, 255, 0.2) 0%, transparent 50%)',
          animation: 'bigBreathe 2s ease-in-out infinite'
        }}
      />
      
      {/* 动画定义 */}
      <style jsx>{`
        @keyframes moveGrid {
          0% { 
            background-position: 0 0, 0 0; 
          }
          100% { 
            background-position: 40px 40px, 40px 40px; 
          }
        }
        
        @keyframes bigPulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(2);
          }
        }
        
        @keyframes fastMove {
          0% { 
            left: -300px; 
            opacity: 0;
          }
          20% { 
            opacity: 0.8;
          }
          80% { 
            opacity: 0.8;
          }
          100% { 
            left: 100%; 
            opacity: 0;
          }
        }
        
        @keyframes rotate {
          0% { 
            transform: rotate(0deg) scale(1);
          }
          50% { 
            transform: rotate(180deg) scale(1.2);
          }
          100% { 
            transform: rotate(360deg) scale(1);
          }
        }
        
        @keyframes bigBreathe {
          0%, 100% { 
            opacity: 0.1; 
            transform: scale(0.8);
          }
          50% { 
            opacity: 0.3; 
            transform: scale(1.2);
          }
        }
      `}</style>
      
      {/* 顶部滚动文字 */}
      <div className="absolute top-10 left-0 w-full overflow-hidden">
        <div 
          className="text-primary-400 text-lg font-mono opacity-30 whitespace-nowrap"
          style={{
            animation: 'scrollText 8s linear infinite'
          }}
        >
          NOISE GRID • TURN NOISE INTO ALPHA • DYNAMIC TRADING • 
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scrollText {
          0% { 
            transform: translateX(100%); 
          }
          100% { 
            transform: translateX(-100%); 
          }
        }
      `}</style>
    </div>
  );
};
