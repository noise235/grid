// Animated Background Component - 动态网格/噪点波动背景
// 为首页Hero区块提供科技感的动态背景效果

import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 网格参数
    const gridSize = 50;
    const noiseIntensity = 0.3;
    const waveSpeed = 0.02;
    const particleCount = 100;

    // 粒子系统
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.life = Math.random() * 100;
        this.maxLife = 100;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        // 边界检测
        if (this.x < 0 || this.x > canvasWidth || 
            this.y < 0 || this.y > canvasHeight || 
            this.life <= 0) {
          this.x = Math.random() * canvasWidth;
          this.y = Math.random() * canvasHeight;
          this.life = this.maxLife;
        }
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const alpha = (this.life / this.maxLife) * 0.6;
        const pulse = Math.sin(time * 0.005 + this.x * 0.01) * 0.3 + 0.7;
        
        ctx.fillStyle = `rgba(79, 158, 255, ${alpha * pulse})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 创建粒子
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // 动画循环
    let time = 0;
    const animate = () => {
      // 清除画布，保持透明
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 1;

      // 绘制动态网格
      ctx.strokeStyle = 'rgba(79, 158, 255, 0.1)';
      ctx.lineWidth = 1;

      // 垂直线
      for (let x = 0; x < canvas.width; x += gridSize) {
        const wave = Math.sin(time * waveSpeed + x * 0.01) * noiseIntensity;
        const opacity = 0.05 + Math.abs(wave) * 0.1;
        
        ctx.strokeStyle = `rgba(79, 158, 255, ${opacity})`;
        ctx.beginPath();
        
        for (let y = 0; y < canvas.height; y += 10) {
          const noise = Math.sin(time * waveSpeed * 2 + y * 0.02) * wave * 20;
          if (y === 0) {
            ctx.moveTo(x + noise, y);
          } else {
            ctx.lineTo(x + noise, y);
          }
        }
        ctx.stroke();
      }

      // 水平线
      for (let y = 0; y < canvas.height; y += gridSize) {
        const wave = Math.cos(time * waveSpeed + y * 0.01) * noiseIntensity;
        const opacity = 0.05 + Math.abs(wave) * 0.1;
        
        ctx.strokeStyle = `rgba(79, 158, 255, ${opacity})`;
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 10) {
          const noise = Math.cos(time * waveSpeed * 2 + x * 0.02) * wave * 20;
          if (x === 0) {
            ctx.moveTo(x, y + noise);
          } else {
            ctx.lineTo(x, y + noise);
          }
        }
        ctx.stroke();
      }

      // 绘制噪点粒子
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx, time);
      });

      // 绘制连接线
      ctx.strokeStyle = 'rgba(79, 158, 255, 0.2)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.3;
            ctx.strokeStyle = `rgba(79, 158, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 添加中心发光效果
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const glowRadius = 200 + Math.sin(time * 0.01) * 50;
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, glowRadius
      );
      gradient.addColorStop(0, 'rgba(79, 158, 255, 0.1)');
      gradient.addColorStop(0.5, 'rgba(79, 158, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(79, 158, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(135deg, #0a0e1a 0%, #141b2d 50%, #1e2a3a 100%)'
        }}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${className}`}
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0.8
        }}
      />
    </div>
  );
};

// 静态网格背景组件（性能优化版本）
export const StaticGridBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className = '' 
}) => {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        background: `
          linear-gradient(135deg, #0a0e1a 0%, #141b2d 50%, #1e2a3a 100%),
          radial-gradient(circle at 50% 50%, rgba(79, 158, 255, 0.1) 0%, transparent 50%),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 49px,
            rgba(79, 158, 255, 0.05) 50px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 49px,
            rgba(79, 158, 255, 0.05) 50px
          )
        `,
        backgroundSize: '100% 100%, 400px 400px, 50px 50px, 50px 50px',
        animation: 'backgroundShift 20s ease-in-out infinite'
      }}
    >
      {/* CSS动画关键帧 */}
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
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full opacity-30"
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
