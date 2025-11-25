// 混合背景组件 - Canvas动画 + CSS效果
import React, { useEffect, useRef } from 'react';

interface HybridBackgroundProps {
  className?: string;
}

export const HybridBackground: React.FC<HybridBackgroundProps> = ({ 
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

    // 简化的粒子系统
    const particleCount = 50;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }> = [];

    // 初始化粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        life: Math.random() * 100,
        maxLife: 100
      });
    }

    // 动画循环
    let time = 0;
    const animate = () => {
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      // 绘制简化网格
      ctx.strokeStyle = 'rgba(79, 158, 255, 0.08)';
      ctx.lineWidth = 0.5;

      const gridSize = 60;
      const waveSpeed = 0.01;
      const waveAmplitude = 15;

      // 垂直网格线
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 20) {
          const wave = Math.sin(time * waveSpeed + x * 0.005) * waveAmplitude;
          const xPos = x + wave;
          if (y === 0) {
            ctx.moveTo(xPos, y);
          } else {
            ctx.lineTo(xPos, y);
          }
        }
        ctx.stroke();
      }

      // 水平网格线
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 20) {
          const wave = Math.cos(time * waveSpeed + y * 0.005) * waveAmplitude;
          const yPos = y + wave;
          if (x === 0) {
            ctx.moveTo(x, yPos);
          } else {
            ctx.lineTo(x, yPos);
          }
        }
        ctx.stroke();
      }

      // 更新和绘制粒子
      particles.forEach(particle => {
        // 更新位置
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        // 边界检测和重生
        if (particle.x < 0 || particle.x > canvas.width || 
            particle.y < 0 || particle.y > canvas.height || 
            particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = particle.maxLife;
        }

        // 绘制粒子
        const alpha = (particle.life / particle.maxLife) * 0.4;
        const pulse = Math.sin(time * 0.003 + particle.x * 0.01) * 0.2 + 0.8;
        
        ctx.fillStyle = `rgba(79, 158, 255, ${alpha * pulse})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 绘制粒子连接线
      ctx.strokeStyle = 'rgba(79, 158, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.2;
            ctx.strokeStyle = `rgba(79, 158, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

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
      {/* CSS背景层 */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `
            linear-gradient(135deg, #0a0e1a 0%, #141b2d 50%, #1e2a3a 100%),
            radial-gradient(circle at 30% 70%, rgba(79, 158, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(79, 158, 255, 0.03) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Canvas动画层 */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${className}`}
        style={{ 
          opacity: 0.9
        }}
      />
      
      {/* CSS粒子层 */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
