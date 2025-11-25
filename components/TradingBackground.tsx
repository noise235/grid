// 交易背景组件 - 体现K线走势和市场噪音
import React, { useEffect, useRef } from 'react';

export const TradingBackground: React.FC = () => {
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

    // 模拟K线数据
    const generateKlineData = (count: number) => {
      const data = [];
      let price = 100;
      for (let i = 0; i < count; i++) {
        // 添加趋势和噪音
        const trend = Math.sin(i * 0.02) * 0.5; // 长期趋势
        const noise = (Math.random() - 0.5) * 2; // 市场噪音
        const change = trend + noise;
        
        price += change;
        data.push({
          price: price,
          volume: Math.random() * 50 + 10,
          time: i
        });
      }
      return data;
    };

    // 生成多条K线数据（代表不同交易对）
    const klineData = [
      generateKlineData(200), // BTC
      generateKlineData(200), // ETH  
      generateKlineData(200), // BNB
    ];

    // 网格参数
    const gridCols = Math.floor(canvas.width / 40);
    const gridRows = Math.floor(canvas.height / 40);
    
    // 动画循环
    let time = 0;
    const animate = () => {
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.5;

      // 绘制基础网格（受K线影响）
      ctx.strokeStyle = 'rgba(79, 158, 255, 0.25)';
      ctx.lineWidth = 1;

      // 垂直网格线 - 受价格波动影响
      for (let x = 0; x <= gridCols; x++) {
        const xPos = (x / gridCols) * canvas.width;
        const dataIndex = Math.floor((time + x * 2) % klineData[0].length);
        const priceInfluence = (klineData[0][dataIndex]?.price - 100) * 0.1;
        
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 20) {
          // 添加价格波动和噪音影响
          const noise = Math.sin(time * 0.01 + y * 0.005) * 8;
          const finalX = xPos + priceInfluence * 3 + noise;
          
          if (y === 0) {
            ctx.moveTo(finalX, y);
          } else {
            ctx.lineTo(finalX, y);
          }
        }
        ctx.stroke();
      }

      // 水平网格线 - 受成交量影响
      for (let y = 0; y <= gridRows; y++) {
        const yPos = (y / gridRows) * canvas.height;
        const dataIndex = Math.floor((time + y) % klineData[1].length);
        const volumeInfluence = (klineData[1][dataIndex]?.volume - 30) * 0.05;
        
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 20) {
          // 添加成交量波动影响
          const noise = Math.cos(time * 0.008 + x * 0.003) * 6;
          const finalY = yPos + volumeInfluence * 2 + noise;
          
          if (x === 0) {
            ctx.moveTo(x, finalY);
          } else {
            ctx.lineTo(x, finalY);
          }
        }
        ctx.stroke();
      }

      // 绘制价格走势线（更明显）
      klineData.forEach((data, index) => {
        const colors = ['rgba(79, 158, 255, 0.4)', 'rgba(46, 213, 115, 0.35)', 'rgba(255, 165, 0, 0.3)'];
        ctx.strokeStyle = colors[index];
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        data.forEach((point, i) => {
          if (i < time % data.length) {
            const x = (i / data.length) * canvas.width;
            const y = canvas.height - ((point.price - 80) / 40) * canvas.height * 0.3 - canvas.height * 0.1 - index * 50;
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
        });
        ctx.stroke();
      });

      // 绘制市场噪音粒子
      const noiseParticles = 30;
      for (let i = 0; i < noiseParticles; i++) {
        const x = ((time * 2 + i * 50) % (canvas.width + 100)) - 50;
        const y = (Math.sin(time * 0.01 + i) * 0.5 + 0.5) * canvas.height;
        
        // 粒子大小受市场波动影响
        const dataIndex = Math.floor((time + i * 10) % klineData[2].length);
        const volatility = Math.abs(klineData[2][dataIndex]?.price - 100) * 0.02;
        const size = 1 + volatility;
        
        const alpha = 0.5 + Math.sin(time * 0.02 + i) * 0.3;
        ctx.fillStyle = `rgba(79, 158, 255, ${Math.max(0.2, alpha)})`;
        ctx.beginPath();
        ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 绘制网格与K线交点的买卖信号
      const currentKlineProgress = (time * 0.5) % klineData[0].length;
      const maxSignals = Math.floor(currentKlineProgress / 5); // 随着K线发展，信号逐渐增多
      
      // 遍历网格交点，寻找与K线的交汇点
      for (let gridX = 0; gridX <= gridCols; gridX += 2) {
        for (let gridY = 0; gridY <= gridRows; gridY += 2) {
          const signalIndex = gridX * gridRows + gridY;
          
          // 只显示已经"发展到"的信号
          if (signalIndex < maxSignals) {
            const baseX = (gridX / gridCols) * canvas.width;
            const baseY = (gridY / gridRows) * canvas.height;
            
            // 获取该网格点对应的K线数据
            const klineIndex = Math.floor((time * 0.3 + signalIndex * 3) % klineData[0].length);
            const currentPrice = klineData[0][klineIndex]?.price || 100;
            const prevPrice = klineData[0][Math.max(0, klineIndex - 1)]?.price || 100;
            const priceChange = currentPrice - prevPrice;
            
            // 计算网格变形后的实际位置
            const priceInfluence = (currentPrice - 100) * 0.3;
            const volumeInfluence = (klineData[1][klineIndex]?.volume - 30) * 0.1;
            const noiseX = Math.sin(time * 0.01 + baseY * 0.005) * 8;
            const noiseY = Math.cos(time * 0.008 + baseX * 0.003) * 6;
            
            const finalX = baseX + priceInfluence * 3 + noiseX;
            const finalY = baseY + volumeInfluence * 2 + noiseY;
            
            // 只在价格变化显著时显示信号
            if (Math.abs(priceChange) > 0.3) {
              const isUptrend = priceChange > 0;
              const signalStrength = Math.abs(priceChange) / 3;
              const signalAge = (currentKlineProgress - signalIndex * 5) / 20;
              const ageAlpha = Math.max(0.2, 1 - signalAge * 0.5);
              
              if (isUptrend) {
                // 买入信号 - 绿色向上箭头
                const size = 5 + signalStrength * 4;
                const alpha = (0.7 + Math.sin(time * 0.03 + signalIndex) * 0.2) * ageAlpha;
                ctx.fillStyle = `rgba(46, 213, 115, ${alpha})`;
                
                // 绘制向上三角形
                ctx.beginPath();
                ctx.moveTo(finalX, finalY - size);
                ctx.lineTo(finalX - size * 0.7, finalY + size * 0.4);
                ctx.lineTo(finalX + size * 0.7, finalY + size * 0.4);
                ctx.closePath();
                ctx.fill();
                
                // 添加发光效果
                const gradient = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, size * 2.5);
                gradient.addColorStop(0, `rgba(46, 213, 115, ${alpha * 0.5})`);
                gradient.addColorStop(1, 'rgba(46, 213, 115, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(finalX, finalY, size * 2.5, 0, Math.PI * 2);
                ctx.fill();
                
              } else {
                // 卖出信号 - 红色向下箭头
                const size = 5 + signalStrength * 4;
                const alpha = (0.7 + Math.sin(time * 0.03 + signalIndex) * 0.2) * ageAlpha;
                ctx.fillStyle = `rgba(255, 71, 87, ${alpha})`;
                
                // 绘制向下三角形
                ctx.beginPath();
                ctx.moveTo(finalX, finalY + size);
                ctx.lineTo(finalX - size * 0.7, finalY - size * 0.4);
                ctx.lineTo(finalX + size * 0.7, finalY - size * 0.4);
                ctx.closePath();
                ctx.fill();
                
                // 添加发光效果
                const gradient = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, size * 2.5);
                gradient.addColorStop(0, `rgba(255, 71, 87, ${alpha * 0.5})`);
                gradient.addColorStop(1, 'rgba(255, 71, 87, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(finalX, finalY, size * 2.5, 0, Math.PI * 2);
                ctx.fill();
              }
              
              // 添加网格交点标记
              ctx.strokeStyle = `rgba(79, 158, 255, ${0.3 * ageAlpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(finalX, finalY, 3, 0, Math.PI * 2);
              ctx.stroke();
              
              // 添加信号波纹效果（新信号更明显）
              if (signalAge < 0.5) {
                const rippleRadius = (time * 3 + signalIndex * 5) % 25;
                const rippleAlpha = (1 - (rippleRadius / 25)) * (0.5 - signalAge);
                const rippleColor = isUptrend ? 'rgba(46, 213, 115,' : 'rgba(255, 71, 87,';
                
                ctx.strokeStyle = rippleColor + rippleAlpha + ')';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(finalX, finalY, rippleRadius, 0, Math.PI * 2);
                ctx.stroke();
              }
            }
          }
        }
      }

      // 绘制支撑阻力位
      const supportResistanceLevels = 5;
      for (let i = 0; i < supportResistanceLevels; i++) {
        const y = (i + 1) * (canvas.height / (supportResistanceLevels + 1));
        const strength = Math.sin(time * 0.01 + i) * 0.3 + 0.7;
        
        // 支撑位 - 绿色虚线
        if (i % 2 === 0) {
          ctx.strokeStyle = `rgba(46, 213, 115, ${0.2 * strength})`;
          ctx.lineWidth = 2;
          ctx.setLineDash([10, 5]);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        } else {
          // 阻力位 - 红色虚线
          ctx.strokeStyle = `rgba(255, 71, 87, ${0.2 * strength})`;
          ctx.lineWidth = 2;
          ctx.setLineDash([10, 5]);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        ctx.setLineDash([]); // 重置虚线
      }

      // 绘制网格交点的套利机会
      const intersectionCount = 10;
      for (let i = 0; i < intersectionCount; i++) {
        const x = ((time * 0.8 + i * 80) % (canvas.width + 160)) - 80;
        const y = ((time * 0.6 + i * 50) % (canvas.height + 100)) - 50;
        
        // 套利机会 - 脉动的蓝色光点
        const pulseSize = 8 + Math.sin(time * 0.1 + i) * 4;
        const pulseAlpha = 0.3 + Math.sin(time * 0.08 + i * 0.5) * 0.2;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize);
        gradient.addColorStop(0, `rgba(79, 158, 255, ${pulseAlpha})`);
        gradient.addColorStop(0.7, `rgba(79, 158, 255, ${pulseAlpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(79, 158, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        // 添加十字线表示精确交易点
        ctx.strokeStyle = `rgba(79, 158, 255, ${pulseAlpha * 0.8})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 6, y);
        ctx.lineTo(x + 6, y);
        ctx.moveTo(x, y - 6);
        ctx.lineTo(x, y + 6);
        ctx.stroke();
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
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -999 }}
    >
      {/* 基础背景渐变 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0e1a 0%, #141b2d 50%, #1e2a3a 100%)'
        }}
      />
      
      {/* Canvas动画层 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          opacity: 0.8
        }}
      />
      
    </div>
  );
};
