import React, { useState } from 'react';

interface GridStrategy {
  name: string;
  exchange: string;
  symbol: string;
  gridType: 'arithmetic' | 'geometric';
  priceRange: {
    upper: number;
    lower: number;
  };
  gridCount: number;
  investment: number;
  riskSettings: {
    stopLoss: number;
    maxPosition: number;
    autoRebalance: boolean;
  };
  aiRecommendation: boolean;
}

// 简单的按钮组件
const Button: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string; 
  variant?: 'primary' | 'outline';
}> = ({ children, onClick, className = '', variant = 'primary' }) => {
  const baseClass = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variantClass = variant === 'primary' 
    ? 'bg-primary-500 hover:bg-primary-600 text-white' 
    : 'border border-border-primary hover:border-primary-400 text-text-primary';
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
};

// 简单的卡片组件
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-background-secondary border border-border-primary rounded-lg ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-6 border-b border-border-primary">
    {children}
  </div>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CreateGridPage: React.FC = () => {
  const [strategy, setStrategy] = useState<GridStrategy>({
    name: '',
    exchange: 'binance',
    symbol: 'BTCUSDT',
    gridType: 'arithmetic',
    priceRange: {
      upper: 45000,
      lower: 40000
    },
    gridCount: 20,
    investment: 1000,
    riskSettings: {
      stopLoss: 10,
      maxPosition: 50,
      autoRebalance: true
    },
    aiRecommendation: false
  });

  const [activeStep, setActiveStep] = useState(1);

  const exchanges = [
    { id: 'binance', name: 'Binance', status: 'connected' },
    { id: 'okx', name: 'OKX', status: 'connected' },
    { id: 'bybit', name: 'Bybit', status: 'disconnected' }
  ];

  const symbols = [
    { symbol: 'BTCUSDT', price: 43250, change: '+2.5%' },
    { symbol: 'ETHUSDT', price: 2680, change: '-1.2%' },
    { symbol: 'BNBUSDT', price: 245, change: '+0.8%' }
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setStrategy(prev => {
        const parentObj = prev[parent as keyof GridStrategy] as any;
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: value
          }
        };
      });
    } else {
      setStrategy(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const calculateGridSpacing = () => {
    const range = strategy.priceRange.upper - strategy.priceRange.lower;
    return range / strategy.gridCount;
  };

  const estimateProfit = () => {
    const spacing = calculateGridSpacing();
    const profitPerGrid = (spacing / strategy.priceRange.lower) * 100;
    return (profitPerGrid * strategy.gridCount * 0.7).toFixed(2); // 估算70%成功率
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <div className="border-b border-border-primary bg-background-secondary/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">创建网格策略</h1>
              <p className="text-text-secondary mt-1">配置您的网格交易参数</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => window.history.back()}>
                取消
              </Button>
              <Button 
                className="bg-primary-500 hover:bg-primary-600"
                onClick={() => console.log('创建策略', strategy)}
              >
                创建策略
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧配置面板 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 步骤指示器 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {[
                    { step: 1, title: '基础设置', desc: '选择交易所和币种' },
                    { step: 2, title: '网格参数', desc: '配置价格区间和密度' },
                    { step: 3, title: '风险控制', desc: '设置止损和仓位管理' },
                    { step: 4, title: '确认创建', desc: '检查参数并启动' }
                  ].map((item, index) => (
                    <div key={item.step} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        activeStep >= item.step 
                          ? 'bg-primary-500 border-primary-500 text-white' 
                          : 'border-border-primary text-text-secondary'
                      }`}>
                        {item.step}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-text-primary">{item.title}</div>
                        <div className="text-xs text-text-secondary">{item.desc}</div>
                      </div>
                      {index < 3 && (
                        <div className={`w-16 h-0.5 mx-4 ${
                          activeStep > item.step ? 'bg-primary-500' : 'bg-border-primary'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 步骤1: 基础设置 */}
            {activeStep === 1 && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-text-primary">基础设置</h3>
                  <p className="text-text-secondary">选择交易所、币种和策略名称</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 策略名称 */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      策略名称
                    </label>
                    <input
                      type="text"
                      value={strategy.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="输入策略名称"
                      className="input-base w-full"
                    />
                  </div>

                  {/* 交易所选择 */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      选择交易所
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {exchanges.map((exchange) => (
                        <div
                          key={exchange.id}
                          onClick={() => handleInputChange('exchange', exchange.id)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            strategy.exchange === exchange.id
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-border-primary hover:border-primary-400'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-sm font-medium text-text-primary">{exchange.name}</div>
                            <div className={`text-xs mt-1 ${
                              exchange.status === 'connected' ? 'text-chart-green' : 'text-chart-red'
                            }`}>
                              {exchange.status === 'connected' ? '已连接' : '未连接'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 币种选择 */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      选择交易对
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {symbols.map((coin) => (
                        <div
                          key={coin.symbol}
                          onClick={() => handleInputChange('symbol', coin.symbol)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            strategy.symbol === coin.symbol
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-border-primary hover:border-primary-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-text-primary">{coin.symbol}</div>
                              <div className="text-xs text-text-secondary">现货交易</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-text-primary">
                                ${coin.price.toLocaleString()}
                              </div>
                              <div className={`text-xs ${
                                coin.change.startsWith('+') ? 'text-chart-green' : 'text-chart-red'
                              }`}>
                                {coin.change}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={() => setActiveStep(2)}
                      className="bg-primary-500 hover:bg-primary-600"
                    >
                      下一步
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 步骤2: 网格参数 */}
            {activeStep === 2 && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-text-primary">网格参数配置</h3>
                  <p className="text-text-secondary">设置价格区间、网格密度和投资金额</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 网格类型 */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      网格类型
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gridType"
                          value="arithmetic"
                          checked={strategy.gridType === 'arithmetic'}
                          onChange={(e) => handleInputChange('gridType', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-text-primary">等差网格</span>
                        <span className="text-xs text-text-secondary ml-2">价格间距相等</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gridType"
                          value="geometric"
                          checked={strategy.gridType === 'geometric'}
                          onChange={(e) => handleInputChange('gridType', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-text-primary">等比网格</span>
                        <span className="text-xs text-text-secondary ml-2">价格比例相等</span>
                      </label>
                    </div>
                  </div>

                  {/* 价格区间 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        上限价格 (USDT)
                      </label>
                      <input
                        type="number"
                        value={strategy.priceRange.upper}
                        onChange={(e) => handleInputChange('priceRange.upper', Number(e.target.value))}
                        className="input-base w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        下限价格 (USDT)
                      </label>
                      <input
                        type="number"
                        value={strategy.priceRange.lower}
                        onChange={(e) => handleInputChange('priceRange.lower', Number(e.target.value))}
                        className="input-base w-full"
                      />
                    </div>
                  </div>

                  {/* 网格数量 */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      网格数量: {strategy.gridCount}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={strategy.gridCount}
                      onChange={(e) => handleInputChange('gridCount', Number(e.target.value))}
                      className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-text-secondary mt-1">
                      <span>5 (稀疏)</span>
                      <span>50 (适中)</span>
                      <span>100 (密集)</span>
                    </div>
                  </div>

                  {/* 投资金额 */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      投资金额 (USDT)
                    </label>
                    <input
                      type="number"
                      value={strategy.investment}
                      onChange={(e) => handleInputChange('investment', Number(e.target.value))}
                      className="input-base w-full"
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setActiveStep(1)}
                    >
                      上一步
                    </Button>
                    <Button 
                      onClick={() => setActiveStep(3)}
                      className="bg-primary-500 hover:bg-primary-600"
                    >
                      下一步
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 步骤3: 风险控制 */}
            {activeStep === 3 && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-text-primary">风险控制设置</h3>
                  <p className="text-text-secondary">配置止损、仓位管理和自动化选项</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 止损设置 */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      止损比例 (%)
                    </label>
                    <input
                      type="number"
                      value={strategy.riskSettings.stopLoss}
                      onChange={(e) => handleInputChange('riskSettings.stopLoss', Number(e.target.value))}
                      className="input-base w-full"
                      placeholder="输入止损比例"
                    />
                    <p className="text-xs text-text-secondary mt-1">
                      当总亏损达到此比例时自动停止策略
                    </p>
                  </div>

                  {/* 最大仓位 */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      最大仓位比例 (%)
                    </label>
                    <input
                      type="number"
                      value={strategy.riskSettings.maxPosition}
                      onChange={(e) => handleInputChange('riskSettings.maxPosition', Number(e.target.value))}
                      className="input-base w-full"
                      placeholder="输入最大仓位比例"
                    />
                    <p className="text-xs text-text-secondary mt-1">
                      单个币种最大持仓占总资金的比例
                    </p>
                  </div>

                  {/* 自动再平衡 */}
                  <div className="flex items-center justify-between p-4 bg-background-secondary rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-text-primary">自动再平衡</div>
                      <div className="text-xs text-text-secondary">
                        当价格偏离网格时自动调整参数
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={strategy.riskSettings.autoRebalance}
                        onChange={(e) => handleInputChange('riskSettings.autoRebalance', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-background-primary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>

                  {/* AI推荐 */}
                  <div className="flex items-center justify-between p-4 bg-background-secondary rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-text-primary">启用AI推荐</div>
                      <div className="text-xs text-text-secondary">
                        使用AI分析市场数据并优化网格参数
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={strategy.aiRecommendation}
                        onChange={(e) => handleInputChange('aiRecommendation', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-background-primary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setActiveStep(2)}
                    >
                      上一步
                    </Button>
                    <Button 
                      onClick={() => setActiveStep(4)}
                      className="bg-primary-500 hover:bg-primary-600"
                    >
                      下一步
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 步骤4: 确认创建 */}
            {activeStep === 4 && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-text-primary">确认策略参数</h3>
                  <p className="text-text-secondary">请检查所有配置参数，确认无误后创建策略</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-background-secondary rounded-lg">
                    <div>
                      <div className="text-xs text-text-secondary">策略名称</div>
                      <div className="text-sm font-medium text-text-primary">{strategy.name || '未命名策略'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">交易对</div>
                      <div className="text-sm font-medium text-text-primary">{strategy.symbol}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">价格区间</div>
                      <div className="text-sm font-medium text-text-primary">
                        ${strategy.priceRange.lower.toLocaleString()} - ${strategy.priceRange.upper.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">网格数量</div>
                      <div className="text-sm font-medium text-text-primary">{strategy.gridCount} 个</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">投资金额</div>
                      <div className="text-sm font-medium text-text-primary">${strategy.investment.toLocaleString()} USDT</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">止损比例</div>
                      <div className="text-sm font-medium text-text-primary">{strategy.riskSettings.stopLoss}%</div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setActiveStep(3)}
                    >
                      上一步
                    </Button>
                    <Button 
                      onClick={() => {
                        console.log('创建策略:', strategy);
                        // 这里添加创建策略的逻辑
                        alert('策略创建成功！');
                      }}
                      className="bg-chart-green hover:bg-chart-green/80"
                    >
                      确认创建
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 右侧预览面板 */}
          <div className="space-y-6">
            {/* 网格预览 */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-text-primary">网格预览</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 简单的网格可视化 */}
                  <div className="h-48 bg-background-secondary rounded-lg p-4 relative overflow-hidden">
                    <div className="absolute inset-0 p-4">
                      {/* 价格轴 */}
                      <div className="absolute left-0 top-4 bottom-4 w-12 flex flex-col justify-between text-xs text-text-secondary">
                        <span>${strategy.priceRange.upper.toLocaleString()}</span>
                        <span>${((strategy.priceRange.upper + strategy.priceRange.lower) / 2).toLocaleString()}</span>
                        <span>${strategy.priceRange.lower.toLocaleString()}</span>
                      </div>
                      
                      {/* 网格线 */}
                      <div className="ml-12 h-full relative">
                        {Array.from({ length: Math.min(strategy.gridCount, 10) }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-full border-t border-primary-500/30"
                            style={{ top: `${(i / Math.min(strategy.gridCount, 10)) * 100}%` }}
                          />
                        ))}
                        
                        {/* 当前价格线 */}
                        <div 
                          className="absolute w-full border-t-2 border-chart-orange"
                          style={{ top: '60%' }}
                        >
                          <span className="absolute right-0 -top-2 text-xs text-chart-orange bg-background-primary px-1 rounded">
                            当前价格
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 网格统计 */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-background-secondary rounded">
                      <div className="text-text-secondary text-xs">网格间距</div>
                      <div className="text-text-primary font-medium">
                        ${calculateGridSpacing().toFixed(2)}
                      </div>
                    </div>
                    <div className="p-3 bg-background-secondary rounded">
                      <div className="text-text-secondary text-xs">预期收益率</div>
                      <div className="text-chart-green font-medium">
                        {estimateProfit()}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 风险提示 */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-text-primary">风险提示</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-chart-red rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-text-secondary">
                      网格交易适合震荡市场，单边行情可能导致亏损
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-chart-orange rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-text-secondary">
                      请确保设置合理的止损比例以控制风险
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-chart-blue rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-text-secondary">
                      建议先用小额资金测试策略效果
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGridPage;
