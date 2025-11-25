// 优雅动画背景组件 - 专业金融平台风格
import React from 'react';

export const ElegantBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -999 }}
    >
      {/* 主背景渐变 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0e1a 0%, #141b2d 50%, #1e2a3a 100%)'
        }}
      />
      
      {/* 微妙的网格背景 */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79, 158, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 158, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'subtleGrid 30s ease-in-out infinite'
        }}
      />
      
      {/* 微妙的浮动粒子 */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary-400"
            style={{
              width: '2px',
              height: '2px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `gentleFloat ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: 0.3
            }}
          />
        ))}
      </div>
      
      {/* 轻微的光晕效果 */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79, 158, 255, 0.08) 0%, transparent 70%)',
            left: '20%',
            top: '30%',
            animation: 'gentlePulse 12s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79, 158, 255, 0.06) 0%, transparent 70%)',
            right: '25%',
            bottom: '35%',
            animation: 'gentlePulse 15s ease-in-out infinite reverse'
          }}
        />
      </div>
      
      {/* 极其微妙的移动线条 */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"
            style={{
              width: '400px',
              top: `${25 + i * 25}%`,
              left: '-400px',
              animation: `gentleMove ${20 + i * 5}s linear infinite`,
              animationDelay: `${i * 8}s`,
              opacity: 0.1
            }}
          />
        ))}
      </div>
      
      {/* CSS动画定义 */}
      <style jsx>{`
        @keyframes subtleGrid {
          0%, 100% { 
            background-position: 0 0, 0 0; 
            opacity: 0.2;
          }
          50% { 
            background-position: 30px 30px, 30px 30px; 
            opacity: 0.15;
          }
        }
        
        @keyframes gentleFloat {
          0%, 100% { 
            opacity: 0.2; 
            transform: translateY(0px) translateX(0px);
          }
          25% { 
            opacity: 0.4; 
            transform: translateY(-15px) translateX(10px);
          }
          50% { 
            opacity: 0.3; 
            transform: translateY(-8px) translateX(-5px);
          }
          75% { 
            opacity: 0.4; 
            transform: translateY(5px) translateX(8px);
          }
        }
        
        @keyframes gentlePulse {
          0%, 100% { 
            opacity: 0.08; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.12; 
            transform: scale(1.1);
          }
        }
        
        @keyframes gentleMove {
          0% { 
            left: -400px; 
            opacity: 0;
          }
          10% { 
            opacity: 0.1;
          }
          90% { 
            opacity: 0.1;
          }
          100% { 
            left: 100%; 
            opacity: 0;
          }
        }
      `}</style>
      
      {/* 顶部微妙的噪点纹理 */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(79, 158, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(79, 158, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 120px 120px',
          animation: 'noisePattern 25s linear infinite'
        }}
      />
      
      <style jsx>{`
        @keyframes noisePattern {
          0% { 
            background-position: 0 0, 0 0; 
          }
          100% { 
            background-position: 100px 100px, 120px 120px; 
          }
        }
      `}</style>
    </div>
  );
};
