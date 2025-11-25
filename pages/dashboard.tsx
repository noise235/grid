// Trading System Dashboard - Unified Interface
// Left sidebar navigation + Right content area

import React, { useState } from 'react';
import { Button } from '../design-system/components/Button/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../design-system/components/Card/Card';
import { LanguageSwitcher } from '../design-system/components/LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

// Grid Strategy Creation Component
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

const CreateGridStrategyComponent: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
  const [backtestResults, setBacktestResults] = useState<any>(null);
  const [isBacktesting, setIsBacktesting] = useState(false);

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
    return (profitPerGrid * strategy.gridCount * 0.7).toFixed(2);
  };

  const runBacktest = async () => {
    setIsBacktesting(true);
    
    // 模拟回测计算过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 生成模拟回测结果
    const mockBacktestData = {
      period: '30 days',
      totalTrades: Math.floor(Math.random() * 200) + 50,
      winRate: (Math.random() * 30 + 60).toFixed(1), // 60-90%
      totalReturn: (Math.random() * 20 + 5).toFixed(2), // 5-25%
      maxDrawdown: (Math.random() * 5 + 2).toFixed(2), // 2-7%
      sharpeRatio: (Math.random() * 1.5 + 1).toFixed(2), // 1-2.5
      profitFactor: (Math.random() * 1 + 1.5).toFixed(2), // 1.5-2.5
      avgTradeReturn: (Math.random() * 2 + 0.5).toFixed(3), // 0.5-2.5%
      dailyReturns: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        return: (Math.random() * 4 - 2).toFixed(2) // -2% to +2%
      })),
      gridPerformance: {
        executedOrders: Math.floor(Math.random() * 100) + 20,
        avgSpread: calculateGridSpacing().toFixed(2),
        bestPerformingGrid: Math.floor(Math.random() * strategy.gridCount) + 1,
        worstPerformingGrid: Math.floor(Math.random() * strategy.gridCount) + 1
      }
    };
    
    setBacktestResults(mockBacktestData);
    setIsBacktesting(false);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      {/* Main Content - 4-Step Grid Creation */}
      <div className="xl:col-span-3 space-y-6">
        <div className="space-y-6">
          <div className="flex items-center">
            <button 
              onClick={onBack} 
              className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-all duration-200 hover:bg-background-secondary rounded-lg px-4 py-2 -ml-3"
              style={{ minWidth: 'auto', whiteSpace: 'nowrap', display: 'inline-flex' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
          <div className="border-l-4 border-primary-500 pl-6">
            <h2 className="text-3xl font-bold text-text-primary mb-2">Create Grid Strategy</h2>
            <p className="text-text-secondary text-lg">Configure your grid trading parameters with AI assistance</p>
          </div>
        </div>

        {/* Step Indicator */}
        <Card variant="default" className="bg-gradient-to-r from-background-secondary to-background-primary border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              {[
                { step: 1, title: 'Basic Settings', desc: 'Select exchange and trading pair', icon: '⚙️' },
                { step: 2, title: 'Grid Parameters', desc: 'Configure price range and density', icon: '📊' },
                { step: 3, title: 'Risk Control', desc: 'Set stop loss and position management', icon: '🛡️' },
                { step: 4, title: 'Confirm Creation', desc: 'Review parameters and launch', icon: '🚀' }
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      activeStep >= item.step 
                        ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/30' 
                        : activeStep === item.step - 1
                        ? 'border-primary-300 text-primary-300 bg-primary-500/10'
                        : 'border-border-primary text-text-secondary bg-background-primary'
                    }`}>
                      {activeStep >= item.step ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm font-bold">{item.step}</span>
                      )}
                    </div>
                    <div className="mt-3 text-center max-w-32">
                      <div className={`text-sm font-semibold ${
                        activeStep >= item.step ? 'text-primary-400' : 'text-text-primary'
                      }`}>
                        {item.title}
                      </div>
                      <div className="text-xs text-text-secondary mt-1 leading-tight">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  {index < 3 && (
                    <div className="flex-1 mx-6">
                      <div className={`h-0.5 rounded-full transition-all duration-500 ${
                        activeStep > item.step 
                          ? 'bg-gradient-to-r from-primary-500 to-primary-400' 
                          : 'bg-border-primary'
                      }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Basic Settings */}
        {activeStep === 1 && (
          <Card variant="default" className="border-0 shadow-xl bg-gradient-to-br from-background-primary to-background-secondary">
            <CardHeader title="Basic Settings" />
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Strategy Name */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Strategy Name
                  </label>
                  <input
                    type="text"
                    value={strategy.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter a descriptive name for your strategy"
                    className="w-full px-4 py-3 bg-background-secondary border border-border-primary rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-primary-400"
                  />
                </div>

                {/* Exchange Selection */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Select Exchange
                  </label>
                  <select 
                    value={strategy.exchange}
                    onChange={(e) => handleInputChange('exchange', e.target.value)}
                    className="w-full px-4 py-3 bg-background-secondary border border-border-primary rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-primary-400 cursor-pointer"
                  >
                    {exchanges.map((exchange) => (
                      <option key={exchange.id} value={exchange.id}>
                        {exchange.name} - {exchange.status === 'connected' ? 'Connected' : 'Disconnected'}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-text-secondary mt-1">
                    Only connected exchanges are available for trading
                  </p>
                </div>

                {/* Trading Pair Selection */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Select Trading Pair
                  </label>
                  <select 
                    value={strategy.symbol}
                    onChange={(e) => handleInputChange('symbol', e.target.value)}
                    className="w-full px-4 py-3 bg-background-secondary border border-border-primary rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-primary-400 cursor-pointer"
                  >
                    {symbols.map((coin) => (
                      <option key={coin.symbol} value={coin.symbol}>
                        {coin.symbol} - ${coin.price.toLocaleString()} ({coin.change})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-text-secondary mt-1">
                    Current market prices and 24h changes are shown
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={() => setActiveStep(2)} 
                    variant="primary"
                    className="px-8 py-3 rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
                  >
                    Next Step →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Grid Parameters */}
        {activeStep === 2 && (
          <Card variant="default">
            <CardHeader title="Grid Parameters Configuration" />
            <CardContent>
              <div className="space-y-6">
                {/* Grid Type */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Grid Type
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
                      <span className="text-text-primary">Arithmetic Grid</span>
                      <span className="text-xs text-text-secondary ml-2">Equal price intervals</span>
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
                      <span className="text-text-primary">Geometric Grid</span>
                      <span className="text-xs text-text-secondary ml-2">Equal price ratios</span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Upper Price (USDT)
                    </label>
                    <input
                      type="number"
                      value={strategy.priceRange.upper}
                      onChange={(e) => handleInputChange('priceRange.upper', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Lower Price (USDT)
                    </label>
                    <input
                      type="number"
                      value={strategy.priceRange.lower}
                      onChange={(e) => handleInputChange('priceRange.lower', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Grid Count */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Grid Count: {strategy.gridCount}
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
                    <span>5 (Sparse)</span>
                    <span>50 (Moderate)</span>
                    <span>100 (Dense)</span>
                  </div>
                </div>

                {/* Investment Amount */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Investment Amount (USDT)
                  </label>
                  <input
                    type="number"
                    value={strategy.investment}
                    onChange={(e) => handleInputChange('investment', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setActiveStep(1)}>
                    Previous Step
                  </Button>
                  <Button onClick={() => setActiveStep(3)} variant="primary">
                    Next Step
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Risk Control */}
        {activeStep === 3 && (
          <Card variant="default">
            <CardHeader title="Risk Control Settings" />
            <CardContent>
              <div className="space-y-6">
                {/* Stop Loss */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Stop Loss Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={strategy.riskSettings.stopLoss}
                    onChange={(e) => handleInputChange('riskSettings.stopLoss', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter stop loss percentage"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    Strategy will stop automatically when total loss reaches this percentage
                  </p>
                </div>

                {/* Max Position */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Maximum Position Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={strategy.riskSettings.maxPosition}
                    onChange={(e) => handleInputChange('riskSettings.maxPosition', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter maximum position percentage"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    Maximum position size as percentage of total capital
                  </p>
                </div>

                {/* Auto Rebalance */}
                <div className="flex items-center justify-between p-4 bg-background-secondary rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-text-primary">Auto Rebalance</div>
                    <div className="text-xs text-text-secondary">
                      Automatically adjust parameters when price deviates from grid
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

                {/* AI Recommendation */}
                <div className="flex items-center justify-between p-4 bg-background-secondary rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-text-primary">Enable AI Recommendation</div>
                    <div className="text-xs text-text-secondary">
                      Use AI to analyze market data and optimize grid parameters
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
                  <Button variant="ghost" onClick={() => setActiveStep(2)}>
                    Previous Step
                  </Button>
                  <Button onClick={() => setActiveStep(4)} variant="primary">
                    Next Step
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirm Creation */}
        {activeStep === 4 && (
          <div className="space-y-6">
            <Card variant="default">
              <CardHeader title="Confirm Strategy Parameters" />
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-background-secondary rounded-lg">
                    <div>
                      <div className="text-xs text-text-secondary">Strategy Name</div>
                      <div className="text-sm font-medium text-text-primary">{strategy.name || 'Unnamed Strategy'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">Trading Pair</div>
                      <div className="text-sm font-medium text-text-primary">{strategy.symbol}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">Price Range</div>
                      <div className="text-sm font-medium text-text-primary">
                        ${strategy.priceRange.lower.toLocaleString()} - ${strategy.priceRange.upper.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">Grid Count</div>
                      <div className="text-sm font-medium text-text-primary">{strategy.gridCount} grids</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">Investment Amount</div>
                      <div className="text-sm font-medium text-text-primary">${strategy.investment.toLocaleString()} USDT</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">Stop Loss</div>
                      <div className="text-sm font-medium text-text-primary">{strategy.riskSettings.stopLoss}%</div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={() => setActiveStep(3)}>
                      Previous Step
                    </Button>
                    <div className="flex gap-3">
                      <Button 
                        onClick={runBacktest}
                        variant="ghost"
                        disabled={isBacktesting}
                      >
                        {isBacktesting ? 'Running Backtest...' : 'Run Backtest (30 Days)'}
                      </Button>
                      <Button 
                        onClick={() => {
                          console.log('Creating strategy:', strategy);
                          alert('Strategy created successfully!');
                        }}
                        variant="primary"
                      >
                        Confirm Creation
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backtest Results */}
            {backtestResults && (
              <Card variant="default">
                <CardHeader title="Backtest Results (Past 30 Days)" />
                <CardContent>
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-background-secondary rounded-lg text-center">
                        <div className="text-xs text-text-secondary">Total Return</div>
                        <div className="text-lg font-bold text-chart-green">+{backtestResults.totalReturn}%</div>
                      </div>
                      <div className="p-4 bg-background-secondary rounded-lg text-center">
                        <div className="text-xs text-text-secondary">Win Rate</div>
                        <div className="text-lg font-bold text-text-primary">{backtestResults.winRate}%</div>
                      </div>
                      <div className="p-4 bg-background-secondary rounded-lg text-center">
                        <div className="text-xs text-text-secondary">Max Drawdown</div>
                        <div className="text-lg font-bold text-chart-red">-{backtestResults.maxDrawdown}%</div>
                      </div>
                      <div className="p-4 bg-background-secondary rounded-lg text-center">
                        <div className="text-xs text-text-secondary">Sharpe Ratio</div>
                        <div className="text-lg font-bold text-text-primary">{backtestResults.sharpeRatio}</div>
                      </div>
                    </div>

                    {/* Performance Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-text-primary mb-3">Trading Statistics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Total Trades</span>
                            <span className="text-text-primary">{backtestResults.totalTrades}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Profit Factor</span>
                            <span className="text-text-primary">{backtestResults.profitFactor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Avg Trade Return</span>
                            <span className="text-text-primary">{backtestResults.avgTradeReturn}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Executed Orders</span>
                            <span className="text-text-primary">{backtestResults.gridPerformance.executedOrders}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-text-primary mb-3">Grid Performance</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Avg Grid Spread</span>
                            <span className="text-text-primary">${backtestResults.gridPerformance.avgSpread}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Best Grid Level</span>
                            <span className="text-chart-green">Grid #{backtestResults.gridPerformance.bestPerformingGrid}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Worst Grid Level</span>
                            <span className="text-chart-red">Grid #{backtestResults.gridPerformance.worstPerformingGrid}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Grid Efficiency</span>
                            <span className="text-text-primary">{((backtestResults.gridPerformance.executedOrders / backtestResults.totalTrades) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Daily Returns Chart */}
                    <div>
                      <h4 className="text-sm font-medium text-text-primary mb-3">Daily Returns (Last 30 Days)</h4>
                      <div className="h-32 bg-background-primary rounded-lg p-4 relative overflow-hidden">
                        <div className="flex items-end justify-between h-full">
                          {backtestResults.dailyReturns.slice(-15).map((day: any, index: number) => (
                            <div key={index} className="flex flex-col items-center">
                              <div 
                                className={`w-2 ${day.return >= 0 ? 'bg-chart-green' : 'bg-chart-red'} rounded-t`}
                                style={{ 
                                  height: `${Math.abs(parseFloat(day.return)) * 20 + 10}px`,
                                  marginBottom: day.return < 0 ? '0' : 'auto',
                                  marginTop: day.return >= 0 ? 'auto' : '0'
                                }}
                              />
                              <div className="text-xs text-text-secondary mt-1 transform rotate-45 origin-left">
                                {day.date.split('-')[2]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Risk Analysis */}
                    <div className="p-4 bg-background-secondary rounded-lg">
                      <h4 className="text-sm font-medium text-text-primary mb-2">Risk Analysis</h4>
                      <div className="text-sm text-text-secondary">
                        <p>
                          Based on historical data, this strategy shows a <strong className="text-text-primary">{backtestResults.winRate}%</strong> win rate 
                          with a maximum drawdown of <strong className="text-chart-red">{backtestResults.maxDrawdown}%</strong>. 
                          The Sharpe ratio of <strong className="text-text-primary">{backtestResults.sharpeRatio}</strong> indicates 
                          {parseFloat(backtestResults.sharpeRatio) > 1.5 ? ' excellent' : parseFloat(backtestResults.sharpeRatio) > 1 ? ' good' : ' moderate'} risk-adjusted returns.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Grid Preview */}
        <Card variant="default">
          <CardHeader title="Grid Preview" />
          <CardContent>
            <div className="h-48 bg-background-primary rounded-lg p-4 relative overflow-hidden">
              <div className="absolute inset-0 p-4">
                {/* Price Axis */}
                <div className="absolute left-0 top-4 bottom-4 w-12 flex flex-col justify-between text-xs text-text-secondary">
                  <span>${strategy.priceRange.upper.toLocaleString()}</span>
                  <span>${((strategy.priceRange.upper + strategy.priceRange.lower) / 2).toLocaleString()}</span>
                  <span>${strategy.priceRange.lower.toLocaleString()}</span>
                </div>
                
                {/* Grid Lines */}
                <div className="ml-12 h-full relative">
                  {Array.from({ length: Math.min(strategy.gridCount, 10) }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full border-t border-primary-500/30"
                      style={{ top: `${(i / Math.min(strategy.gridCount, 10)) * 100}%` }}
                    />
                  ))}
                  
                  {/* Current Price Line */}
                  <div 
                    className="absolute w-full border-t-2 border-chart-orange"
                    style={{ top: '60%' }}
                  >
                    <span className="absolute right-0 -top-2 text-xs text-chart-orange bg-background-primary px-1 rounded">
                      Current Price
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Grid Statistics */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="p-3 bg-background-secondary rounded">
                <div className="text-text-secondary text-xs">Grid Spacing</div>
                <div className="text-text-primary font-medium">
                  ${calculateGridSpacing().toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-background-secondary rounded">
                <div className="text-text-secondary text-xs">Expected Profit</div>
                <div className="text-chart-green font-medium">
                  {estimateProfit()}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Sidebar */}
      <div className="xl:col-span-1">
        <Card variant="default" className="sticky top-6">
          <CardHeader title="AI Assistant" />
          <CardContent>
            <div className="space-y-4">
              {/* AI Chat Interface */}
              <div className="h-96 bg-background-primary rounded-lg p-3 overflow-y-auto">
                <div className="space-y-3">
                  {/* AI Message */}
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-xs text-white">
                      AI
                    </div>
                    <div className="flex-1 bg-background-secondary rounded-lg p-3">
                      <p className="text-sm text-text-primary">
                        Hello! I can help you optimize your grid strategy parameters. What trading pair are you interested in?
                      </p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex items-start space-x-2 justify-end">
                    <div className="flex-1 bg-primary-500/20 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-text-primary">
                        I want to create a BTC/USDT grid strategy
                      </p>
                    </div>
                    <div className="w-6 h-6 bg-text-secondary rounded-full flex items-center justify-center text-xs text-white">
                      U
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-xs text-white">
                      AI
                    </div>
                    <div className="flex-1 bg-background-secondary rounded-lg p-3">
                      <p className="text-sm text-text-primary">
                        Great choice! Based on current BTC volatility, I recommend:
                      </p>
                      <ul className="text-xs text-text-secondary mt-2 space-y-1">
                        <li>Price range: $40,000 - $48,000</li>
                        <li>Grid count: 15-20 grids</li>
                        <li>Investment: Start with $1,000</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full text-left justify-start">
                  Suggest optimal parameters
                </Button>
                <Button variant="ghost" size="sm" className="w-full text-left justify-start">
                  Analyze market conditions
                </Button>
                <Button variant="ghost" size="sm" className="w-full text-left justify-start">
                  Risk assessment
                </Button>
                <Button variant="ghost" size="sm" className="w-full text-left justify-start">
                  Backtest strategy
                </Button>
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask AI about grid parameters..."
                  className="flex-1 px-3 py-2 text-sm bg-background-primary border border-border-primary rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button variant="primary" size="sm">
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Strategy Market Component (Grid Trading Content)
const StrategyMarketComponent: React.FC<{ onCreateStrategy: () => void }> = ({ onCreateStrategy }) => {
  // Mock data for grid strategies (from grid.tsx)
  const mockGridData = {
    strategies: [
      { 
        id: 1, 
        name: 'BTC Grid Strategy A', 
        status: 'running', 
        pnl: 1250.30, 
        pnlPercent: 2.1,
        pair: 'BTC/USDT',
        gridCount: 20,
        priceRange: { min: 42000, max: 48000 },
        investment: 10000,
        winRate: 68.5
      },
      { 
        id: 2, 
        name: 'ETH Grid Strategy B', 
        status: 'running', 
        pnl: 890.50, 
        pnlPercent: 1.8,
        pair: 'ETH/USDT',
        gridCount: 15,
        priceRange: { min: 2600, max: 2900 },
        investment: 5000,
        winRate: 72.3
      },
      { 
        id: 3, 
        name: 'USDT Grid Strategy', 
        status: 'paused', 
        pnl: -120.20, 
        pnlPercent: -0.3,
        pair: 'BNB/USDT',
        gridCount: 25,
        priceRange: { min: 580, max: 620 },
        investment: 3000,
        winRate: 45.2
      },
    ],
    performance: {
      totalPnL: 2020.60,
      totalInvestment: 18000,
      avgWinRate: 62.0,
      activeGrids: 2
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Strategy Market</h2>
          <p className="text-text-secondary">Manage and monitor your grid trading strategies</p>
        </div>
        <Button 
          variant="primary"
          onClick={onCreateStrategy}
        >
          Create New Strategy
        </Button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="default">
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-success-400">
                +${mockGridData.performance.totalPnL.toLocaleString()}
              </div>
              <div className="text-sm text-text-secondary">Total P&L</div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="default">
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-text-primary">
                ${mockGridData.performance.totalInvestment.toLocaleString()}
              </div>
              <div className="text-sm text-text-secondary">Total Investment</div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="default">
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-primary-400">
                {mockGridData.performance.avgWinRate}%
              </div>
              <div className="text-sm text-text-secondary">Average Win Rate</div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="default">
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-text-primary">
                {mockGridData.performance.activeGrids}
              </div>
              <div className="text-sm text-text-secondary">Active Grids</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid Strategies List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockGridData.strategies.map((strategy) => (
          <Card key={strategy.id} variant="default" hoverable>
            <CardHeader 
              title={strategy.name}
              action={
                <span className={`px-2 py-1 text-xs rounded-full ${
                  strategy.status === 'running' 
                    ? 'bg-success-900 text-success-300' 
                    : 'bg-warning-900 text-warning-300'
                }`}>
                  {strategy.status === 'running' ? 'Running' : 'Paused'}
                </span>
              }
            />
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Trading Pair</span>
                  <span className="font-mono font-semibold text-text-primary">{strategy.pair}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-text-secondary">P&L</span>
                  <span className={`font-mono font-semibold ${
                    strategy.pnl >= 0 ? 'text-success-400' : 'text-danger-400'
                  }`}>
                    {strategy.pnl >= 0 ? '+' : ''}${strategy.pnl}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-text-secondary">Return</span>
                  <span className={`font-mono font-semibold ${
                    strategy.pnlPercent >= 0 ? 'text-success-400' : 'text-danger-400'
                  }`}>
                    {strategy.pnlPercent >= 0 ? '+' : ''}{strategy.pnlPercent}%
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-text-secondary">Grid Count</span>
                  <span className="font-mono text-text-primary">{strategy.gridCount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-text-secondary">Price Range</span>
                  <span className="font-mono text-text-primary">
                    ${strategy.priceRange.min.toLocaleString()} - ${strategy.priceRange.max.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-text-secondary">Win Rate</span>
                  <span className="font-mono text-success-400">{strategy.winRate}%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full">
                <Button variant="ghost" size="sm" className="flex-1">Edit</Button>
                <Button variant="ghost" size="sm" className="flex-1">Details</Button>
                <Button 
                  variant={strategy.status === 'running' ? 'danger' : 'primary'} 
                  size="sm"
                  className="flex-1"
                >
                  {strategy.status === 'running' ? 'Stop' : 'Start'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Grid Visualization Section */}
      <Card variant="default">
        <CardHeader title="Grid Visualization" />
        <CardContent>
          <div className="h-96 bg-background-tertiary rounded-lg flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-text-tertiary">Grid Trading Chart</span>
              <p className="text-sm text-text-tertiary mt-2">Interactive grid visualization will be displayed here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Consolidated mock data
const mockData = {
  portfolio: {
    totalValue: 125840.50,
    todayPnL: 2340.80,
    activeStrategies: 8,
    totalTrades: 156,
    totalInvestment: 120000,
    maxDrawdown: -2.3,
    sharpeRatio: 1.85,
    winRate: 68.5,
    profitFactor: 1.42
  },
  gridStrategies: [
    { id: 1, name: 'BTC Grid Strategy A', status: 'running', pnl: 1250.30, pnlPercent: 2.1, pair: 'BTC/USDT', gridCount: 20, investment: 10000 },
    { id: 2, name: 'ETH Grid Strategy B', status: 'running', pnl: 890.50, pnlPercent: 1.8, pair: 'ETH/USDT', gridCount: 15, investment: 5000 },
    { id: 3, name: 'BNB Grid Strategy', status: 'paused', pnl: -120.20, pnlPercent: -0.3, pair: 'BNB/USDT', gridCount: 25, investment: 3000 },
  ],
  arbitrageOpportunities: [
    { id: 1, pair: 'BTC/USDT', exchange1: 'Binance', exchange2: 'OKX', spread: 0.15, volume: 2.5, profit: 161.75 },
    { id: 2, pair: 'ETH/USDT', exchange1: 'Huobi', exchange2: 'Binance', spread: 0.08, volume: 5.2, profit: 11.18 },
  ],
  aiSignals: [
    { id: 1, type: 'long', asset: 'BTC', confidence: 85, reason: 'Technical indicators bullish', targetPrice: 45200 },
    { id: 2, type: 'short', asset: 'ETH', confidence: 72, reason: 'Fund outflow detected', targetPrice: 2580 },
  ],
  riskAlerts: [
    { id: 1, type: 'warning', message: 'BTC position approaching stop loss', severity: 'medium' },
    { id: 2, type: 'critical', message: 'SOL position exceeds risk threshold', severity: 'high' },
  ],
  apiConnections: [
    {
      id: 1,
      exchange: 'Binance',
      name: 'Main Trading Account',
      status: 'connected',
      permissions: ['spot', 'futures', 'margin'],
      lastUsed: '2024-11-25 14:30:00',
      createdAt: '2024-11-20 09:15:00',
      apiKey: 'bina_****_****_****_1234',
      testConnection: true,
      rateLimit: { used: 850, limit: 1200, resetTime: '2024-11-25 15:00:00' }
    },
    {
      id: 2,
      exchange: 'OKX',
      name: 'Arbitrage Account',
      status: 'connected',
      permissions: ['spot', 'futures'],
      lastUsed: '2024-11-25 14:25:00',
      createdAt: '2024-11-22 16:20:00',
      apiKey: 'okx_****_****_****_5678',
      testConnection: true,
      rateLimit: { used: 320, limit: 600, resetTime: '2024-11-25 15:00:00' }
    },
    {
      id: 3,
      exchange: 'Huobi',
      name: 'Grid Strategy Account',
      status: 'error',
      permissions: ['spot'],
      lastUsed: '2024-11-24 18:45:00',
      createdAt: '2024-11-18 11:30:00',
      apiKey: 'huobi_****_****_****_9012',
      testConnection: false,
      rateLimit: { used: 0, limit: 500, resetTime: '2024-11-25 15:00:00' },
      error: 'Invalid API signature'
    },
    {
      id: 4,
      exchange: 'Coinbase',
      name: 'Backup Account',
      status: 'disconnected',
      permissions: ['spot'],
      lastUsed: '2024-11-20 12:15:00',
      createdAt: '2024-11-15 14:45:00',
      apiKey: 'coinbase_****_****_****_3456',
      testConnection: false,
      rateLimit: { used: 0, limit: 300, resetTime: '2024-11-25 15:00:00' }
    }
  ]
};

export default function Dashboard() {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');
  
  // API Management states
  const [apiConnections, setApiConnections] = useState(mockData.apiConnections);
  const [showAddApiModal, setShowAddApiModal] = useState(false);
  const [editingApi, setEditingApi] = useState<any>(null);
  const [newApiForm, setNewApiForm] = useState({
    exchange: '',
    name: '',
    apiKey: '',
    secretKey: '',
    passphrase: '',
    permissions: [] as string[]
  });

  const renderIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      overview: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />,
      grid: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
      arbitrage: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
      ai: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
      risk: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />,
      market: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
      history: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      api: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />,
      settings: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>,
    };
    return icons[type] || null;
  };

  // API Management functions
  const handleAddApi = () => {
    const newApi = {
      id: Date.now(),
      exchange: newApiForm.exchange,
      name: newApiForm.name,
      status: 'disconnected',
      permissions: newApiForm.permissions,
      lastUsed: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      apiKey: newApiForm.apiKey.replace(/(.{4})(.*)(.{4})/, '$1****$3'),
      testConnection: false,
      rateLimit: { used: 0, limit: 1000, resetTime: new Date(Date.now() + 3600000).toISOString() }
    };
    setApiConnections([...apiConnections, newApi as any]);
    setShowAddApiModal(false);
    setNewApiForm({ exchange: '', name: '', apiKey: '', secretKey: '', passphrase: '', permissions: [] });
  };

  const handleEditApi = (api: any) => {
    setEditingApi(api);
    setNewApiForm({
      exchange: api.exchange,
      name: api.name,
      apiKey: '',
      secretKey: '',
      passphrase: '',
      permissions: api.permissions
    });
    setShowAddApiModal(true);
  };

  const handleUpdateApi = () => {
    if (editingApi) {
      const updatedConnections = apiConnections.map(conn => 
        conn.id === editingApi.id 
          ? { ...conn, name: newApiForm.name, permissions: newApiForm.permissions }
          : conn
      );
      setApiConnections(updatedConnections);
      setEditingApi(null);
      setShowAddApiModal(false);
      setNewApiForm({ exchange: '', name: '', apiKey: '', secretKey: '', passphrase: '', permissions: [] });
    }
  };

  const handleDeleteApi = (id: number) => {
    setApiConnections(apiConnections.filter(conn => conn.id !== id));
  };

  const handleTestConnection = (id: number) => {
    const updatedConnections = apiConnections.map(conn => 
      conn.id === id 
        ? { ...conn, status: 'connected', testConnection: true, lastUsed: new Date().toISOString() }
        : conn
    );
    setApiConnections(updatedConnections);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'status-connected';
      case 'error': return 'status-error';
      case 'disconnected': return 'status-disconnected';
      default: return 'status-disconnected';
    }
  };

  const getExchangeIcon = (exchange: string) => {
    const icons: Record<string, string> = {
      'Binance': '🟡',
      'OKX': '⚫',
      'Huobi': '🔵',
      'Coinbase': '🔷',
      'Kraken': '🟣',
      'Bybit': '🟠'
    };
    return icons[exchange] || '🔗';
  };

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'grid', label: 'Grid Trading' },
    { id: 'arbitrage', label: 'Arbitrage' },
    { id: 'ai', label: 'AI Assistant' },
    { id: 'risk', label: 'Risk Monitoring' },
    { id: 'divider' },
    { id: 'market', label: 'Strategy Market' },
    { id: 'history', label: 'Trading History' },
    { id: 'api', label: 'API Management' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Top Navigation */}
      <nav className="nav-base px-6 py-4 border-b border-border-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold text-text-primary flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              </svg>
              Noise Grid
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <a href="/" className="nav-item">Home</a>
              <a href="/dashboard" className="nav-item-active">Dashboard</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} size="sm" />
            <div className="text-sm text-text-secondary">
              Total: <span className="text-text-primary font-mono font-semibold">${mockData.portfolio.totalValue.toLocaleString()}</span>
            </div>
            <Button variant="ghost" size="sm">Account</Button>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="sidebar-base w-64 border-r border-border-primary overflow-y-auto">
          <div className="p-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                if (item.id === 'divider') return <div key="divider" className="border-t border-border-primary my-4" />;
                return (
                  <button key={item.id} onClick={() => setActiveSection(item.id)} className={`w-full ${activeSection === item.id ? 'sidebar-item-active' : 'sidebar-item'} flex items-center gap-3`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{renderIcon(item.id)}</svg>
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card variant="default"><CardContent><div className="text-center"><div className="text-2xl font-mono font-bold text-text-primary">${mockData.portfolio.totalValue.toLocaleString()}</div><div className="text-sm text-text-secondary">Total Assets</div></div></CardContent></Card>
                <Card variant="default"><CardContent><div className="text-center"><div className="text-2xl font-mono font-bold text-chart-green">+${mockData.portfolio.todayPnL.toLocaleString()}</div><div className="text-sm text-text-secondary">Today P&L</div></div></CardContent></Card>
                <Card variant="default"><CardContent><div className="text-center"><div className="text-2xl font-mono font-bold text-primary-400">{mockData.portfolio.activeStrategies}</div><div className="text-sm text-text-secondary">Active Strategies</div></div></CardContent></Card>
                <Card variant="default"><CardContent><div className="text-center"><div className="text-2xl font-mono font-bold text-text-primary">{mockData.portfolio.totalTrades}</div><div className="text-sm text-text-secondary">Today Trades</div></div></CardContent></Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card variant="default"><CardHeader title="Active Strategies" /><CardContent><div className="space-y-3">{mockData.gridStrategies.slice(0,3).map(s => <div key={s.id} className="flex justify-between p-3 bg-background-secondary rounded"><div><div className="font-medium text-text-primary">{s.name}</div><div className="text-sm text-text-secondary">{s.status}</div></div><div className={`font-mono ${s.pnl >= 0 ? 'text-chart-green' : 'text-chart-red'}`}>{s.pnl >= 0 ? '+' : ''}${s.pnl}</div></div>)}</div></CardContent></Card>
                <Card variant="default"><CardHeader title="Market Overview" /><CardContent><div className="space-y-3"><div className="flex justify-between"><span className="text-text-secondary">BTC/USDT</span><span className="font-mono text-chart-green">$43,250</span></div><div className="flex justify-between"><span className="text-text-secondary">ETH/USDT</span><span className="font-mono text-chart-red">$2,680</span></div></div></CardContent></Card>
              </div>
            </div>
          )}

          {activeSection === 'grid' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text-primary">Grid Trading</h2>
                <Button 
                  variant="primary"
                  onClick={() => setActiveSection('create-grid')}
                >
                  Create New Strategy
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockData.gridStrategies.map(strategy => (
                  <Card key={strategy.id} variant="default" hoverable>
                    <CardHeader title={strategy.name} action={<span className={`px-2 py-1 text-xs rounded-full ${strategy.status === 'running' ? 'bg-success-900/20 text-chart-green border border-success-500/30' : 'bg-warning-900/20 text-warning-400 border border-warning-500/30'}`}>{strategy.status}</span>} />
                    <CardContent><div className="space-y-3"><div className="flex justify-between"><span className="text-text-secondary">Pair</span><span className="font-mono text-text-primary">{strategy.pair}</span></div><div className="flex justify-between"><span className="text-text-secondary">P&L</span><span className={`font-mono ${strategy.pnl >= 0 ? 'text-chart-green' : 'text-chart-red'}`}>{strategy.pnl >= 0 ? '+' : ''}${strategy.pnl}</span></div><div className="flex justify-between"><span className="text-text-secondary">Grid Count</span><span className="font-mono text-text-primary">{strategy.gridCount}</span></div></div></CardContent>
                    <CardFooter><div className="flex gap-2 w-full"><Button variant="ghost" size="sm" className="flex-1">Edit</Button><Button variant={strategy.status === 'running' ? 'danger' : 'primary'} size="sm" className="flex-1">{strategy.status === 'running' ? 'Stop' : 'Start'}</Button></div></CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'create-grid' && (
            <CreateGridStrategyComponent onBack={() => setActiveSection('grid')} />
          )}

          {activeSection === 'arbitrage' && (
            <div className="space-y-4">
              <div className="bg-background-secondary p-4 rounded">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Strategy Type</label>
                    <select className="w-full px-2 py-1 bg-background-primary border border-border-primary rounded text-xs">
                      <option>Period Arbitrage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Min Spread (%)</label>
                    <input type="text" defaultValue="0.05" className="w-full px-2 py-1 bg-background-primary border border-border-primary rounded text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Max Spread (%)</label>
                    <input type="text" defaultValue="0.02" className="w-full px-2 py-1 bg-background-primary border border-border-primary rounded text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Exchange Type</label>
                    <select className="w-full px-2 py-1 bg-background-primary border border-border-primary rounded text-xs">
                      <option>All Exchanges</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Buy & Sell</label>
                    <select className="w-full px-2 py-1 bg-background-primary border border-border-primary rounded text-xs">
                      <option>Market Order</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Sell & Buy</label>
                    <select className="w-full px-2 py-1 bg-background-primary border border-border-primary rounded text-xs">
                      <option>Market Order</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Position Allocation</label>
                    <select className="w-full px-2 py-1 bg-background-primary border border-border-primary rounded text-xs">
                      <option>Not Allocated</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Spread (%)</label>
                    <input type="text" defaultValue="0.05" className="w-full px-2 py-1 bg-background-primary border border-border-primary rounded text-xs" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm">Start Auto Trading</Button>
                  <Button variant="secondary" size="sm">Save Strategy</Button>
                  <Button variant="ghost" size="sm">Reset</Button>
                </div>
              </div>
              <div className="bg-background-primary border border-border-primary rounded overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-background-secondary">
                    <tr>
                      <th className="text-left py-2 px-3 text-text-secondary">Trading Pair</th>
                      <th className="text-left py-2 px-3 text-text-secondary">Strategy</th>
                      <th className="text-left py-2 px-3 text-text-secondary">Price (Buy)</th>
                      <th className="text-left py-2 px-3 text-text-secondary">Price (Sell)</th>
                      <th className="text-left py-2 px-3 text-text-secondary">24H Change (%)</th>
                      <th className="text-left py-2 px-3 text-text-secondary">24H Volume</th>
                      <th className="text-left py-2 px-3 text-text-secondary">Net Amount</th>
                      <th className="text-left py-2 px-3 text-text-secondary">Position Status</th>
                      <th className="text-left py-2 px-3 text-text-secondary">Expected ROI</th>
                      <th className="text-left py-2 px-3 text-text-secondary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-primary hover:bg-background-secondary/30">
                      <td className="py-2 px-3">
                        <div className="font-mono font-semibold text-text-primary">SOL-USDT</div>
                        <div className="text-xs text-text-secondary">Perpetual</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="text-text-primary">Buy: <span className="text-blue-400">OKX</span></div>
                        <div className="text-text-primary">Sell: <span className="text-orange-400">BYBIT</span></div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-mono text-text-primary">$237994.21</div>
                        <div className="text-xs text-success-400">+0.304%</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-mono text-text-primary">$238965.73</div>
                        <div className="text-xs text-success-400">0.024%</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-mono text-success-400">+9.49%</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-mono text-text-primary">$9.2M</div>
                        <div className="text-xs text-text-secondary">USDT</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="text-success-400 text-xs">Buy: +0.806% | 0M6m | 8H</div>
                        <div className="text-danger-400 text-xs">Sell: -0.806% | 0M6m | 8H</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="text-text-primary text-xs">≈ 7.1 SOL</div>
                        <div className="text-text-primary text-xs">≈ 7.1 SOL</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-mono font-semibold text-success-400">+0.235%</div>
                      </td>
                      <td className="py-2 px-3">
                        <Button variant="primary" size="sm" className="bg-success-600 hover:bg-success-700 text-xs px-2 py-1">Open</Button>
                      </td>
                    </tr>
                    <tr className="border-b border-border-primary hover:bg-background-secondary/30">
                      <td className="py-2 px-3">
                        <div className="font-mono font-semibold text-text-primary">ETH-USDT</div>
                        <div className="text-xs text-text-secondary">Perpetual</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="text-text-primary">Buy: <span className="text-orange-400">BYBIT</span></div>
                        <div className="text-text-primary">Sell: <span className="text-orange-400">BINANCE</span></div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-mono text-text-primary">$67382.15</div>
                        <div className="text-xs text-success-400">+0.277%</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-mono text-text-primary">$67568.79</div>
                        <div className="text-xs text-success-400">0.015%</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-mono text-success-400">+6.03%</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-mono text-text-primary">$2.5M</div>
                        <div className="text-xs text-text-secondary">USDT</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="text-success-400 text-xs">Buy: +0.021% | 0M3m | 8H</div>
                        <div className="text-success-400 text-xs">Sell: +0.021% | 0M3m | 8H</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="text-text-primary text-xs">≈ 5.9 ETH</div>
                        <div className="text-text-primary text-xs">≈ 5.9 ETH</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-mono font-semibold text-success-400">+0.218%</div>
                      </td>
                      <td className="py-2 px-3">
                        <Button variant="primary" size="sm" className="bg-success-600 hover:bg-success-700 text-xs px-2 py-1">Open</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'ai' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-text-primary">AI Trading Signals</h2><Button variant="primary">Refresh</Button></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockData.aiSignals.map(signal => (
                  <Card key={signal.id} variant="default">
                    <CardHeader title={`${signal.asset} ${signal.type.toUpperCase()} Signal`} action={<span className={`px-2 py-1 text-xs rounded-full ${signal.type === 'long' ? 'bg-success-900 text-success-300' : 'bg-danger-900 text-danger-300'}`}>{signal.type.toUpperCase()}</span>} />
                    <CardContent><div className="space-y-3"><div className="flex justify-between"><span className="text-text-secondary">Confidence</span><span className="font-mono font-semibold">{signal.confidence}%</span></div><div><span className="text-text-secondary">Reason</span><p className="text-text-primary mt-1">{signal.reason}</p></div><div className="flex justify-between"><span className="text-text-secondary">Target</span><span className="font-mono text-text-primary">${signal.targetPrice}</span></div></div></CardContent>
                    <CardFooter><div className="flex gap-2 w-full"><Button variant="primary" size="sm" className="flex-1">Accept</Button><Button variant="ghost" size="sm" className="flex-1">Details</Button></div></CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'risk' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary">Risk Monitoring</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card variant="default"><CardHeader title="Risk Metrics" /><CardContent><div className="space-y-4"><div className="flex justify-between"><span className="text-text-secondary">Max Drawdown</span><span className="font-mono text-danger-400">{mockData.portfolio.maxDrawdown}%</span></div><div className="flex justify-between"><span className="text-text-secondary">Sharpe Ratio</span><span className="font-mono text-text-primary">{mockData.portfolio.sharpeRatio}</span></div><div className="flex justify-between"><span className="text-text-secondary">Win Rate</span><span className="font-mono text-success-400">{mockData.portfolio.winRate}%</span></div><div className="flex justify-between"><span className="text-text-secondary">Profit Factor</span><span className="font-mono text-text-primary">{mockData.portfolio.profitFactor}</span></div></div></CardContent></Card>
                <Card variant="default"><CardHeader title="Risk Alerts" /><CardContent><div className="space-y-3">{mockData.riskAlerts.map(alert => <div key={alert.id} className={`p-3 border-l-4 rounded ${alert.severity === 'high' ? 'border-l-danger-500 bg-danger-900/20' : 'border-l-warning-500 bg-warning-900/20'}`}><div className="font-medium text-text-primary">{alert.message}</div><div className="text-sm text-text-secondary mt-1">{alert.type}</div></div>)}</div></CardContent></Card>
              </div>
            </div>
          )}

          {activeSection === 'api' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text-primary">API Management</h2>
                <Button variant="primary" onClick={() => setShowAddApiModal(true)}>Add New API</Button>
              </div>
              
              {/* API Connections Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {apiConnections.map(api => (
                  <Card key={api.id} variant="default" hoverable>
                    <CardHeader 
                      title={`${getExchangeIcon(api.exchange)} ${api.name} - ${api.exchange}`}
                      action={
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(api.status)}`}>
                          {api.status}
                        </span>
                      }
                    />
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">API Key</span>
                          <span className="font-mono text-text-primary text-sm">{api.apiKey}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Permissions</span>
                          <div className="flex gap-1">
                            {api.permissions.map(perm => (
                              <span key={perm} className="px-2 py-1 text-xs bg-primary-900 text-primary-300 rounded">
                                {perm}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Last Used</span>
                          <span className="text-text-primary text-sm">
                            {api.lastUsed ? new Date(api.lastUsed).toLocaleString() : 'Never'}
                          </span>
                        </div>
                        {api.rateLimit && (
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Rate Limit</span>
                            <span className="text-text-primary text-sm">
                              {api.rateLimit.used}/{api.rateLimit.limit}
                            </span>
                          </div>
                        )}
                        {api.error && (
                          <div className="p-2 bg-danger-900/20 border border-danger-500/30 rounded">
                            <span className="text-danger-400 text-sm">{api.error}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleTestConnection(api.id)}
                          disabled={api.status === 'connected'}
                        >
                          {api.status === 'connected' ? 'Connected' : 'Test'}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleEditApi(api)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleDeleteApi(api.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Add/Edit API Modal */}
              {showAddApiModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-background-primary border border-border-primary rounded-lg p-6 w-full max-w-md mx-4">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      {editingApi ? 'Edit API Connection' : 'Add New API Connection'}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Exchange</label>
                        <select 
                          className="w-full p-2 bg-background-secondary border border-border-primary rounded text-text-primary"
                          value={newApiForm.exchange}
                          onChange={(e) => setNewApiForm({...newApiForm, exchange: e.target.value})}
                          disabled={!!editingApi}
                        >
                          <option value="">Select Exchange</option>
                          <option value="Binance">Binance</option>
                          <option value="OKX">OKX</option>
                          <option value="Huobi">Huobi</option>
                          <option value="Coinbase">Coinbase</option>
                          <option value="Kraken">Kraken</option>
                          <option value="Bybit">Bybit</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Connection Name</label>
                        <input 
                          type="text"
                          className="w-full p-2 bg-background-secondary border border-border-primary rounded text-text-primary"
                          placeholder="e.g., Main Trading Account"
                          value={newApiForm.name}
                          onChange={(e) => setNewApiForm({...newApiForm, name: e.target.value})}
                        />
                      </div>
                      
                      {!editingApi && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">API Key</label>
                            <input 
                              type="text"
                              className="w-full p-2 bg-background-secondary border border-border-primary rounded text-text-primary font-mono"
                              placeholder="Enter your API key"
                              value={newApiForm.apiKey}
                              onChange={(e) => setNewApiForm({...newApiForm, apiKey: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Secret Key</label>
                            <input 
                              type="password"
                              className="w-full p-2 bg-background-secondary border border-border-primary rounded text-text-primary font-mono"
                              placeholder="Enter your secret key"
                              value={newApiForm.secretKey}
                              onChange={(e) => setNewApiForm({...newApiForm, secretKey: e.target.value})}
                            />
                          </div>
                          
                          {['OKX', 'Huobi'].includes(newApiForm.exchange) && (
                            <div>
                              <label className="block text-sm font-medium text-text-secondary mb-1">Passphrase</label>
                              <input 
                                type="password"
                                className="w-full p-2 bg-background-secondary border border-border-primary rounded text-text-primary font-mono"
                                placeholder="Enter passphrase (if required)"
                                value={newApiForm.passphrase}
                                onChange={(e) => setNewApiForm({...newApiForm, passphrase: e.target.value})}
                              />
                            </div>
                          )}
                        </>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Permissions</label>
                        <div className="space-y-2">
                          {['spot', 'futures', 'margin', 'options'].map(perm => (
                            <label key={perm} className="flex items-center">
                              <input 
                                type="checkbox"
                                className="mr-2"
                                checked={newApiForm.permissions.includes(perm)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewApiForm({...newApiForm, permissions: [...newApiForm.permissions, perm]});
                                  } else {
                                    setNewApiForm({...newApiForm, permissions: newApiForm.permissions.filter(p => p !== perm)});
                                  }
                                }}
                              />
                              <span className="text-text-primary capitalize">{perm} Trading</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                      <Button 
                        variant="ghost" 
                        className="flex-1"
                        onClick={() => {
                          setShowAddApiModal(false);
                          setEditingApi(null);
                          setNewApiForm({ exchange: '', name: '', apiKey: '', secretKey: '', passphrase: '', permissions: [] });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        className="flex-1"
                        onClick={editingApi ? handleUpdateApi : handleAddApi}
                        disabled={!newApiForm.exchange || !newApiForm.name || (!editingApi && !newApiForm.apiKey)}
                      >
                        {editingApi ? 'Update' : 'Add'} API
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'market' && (
            <StrategyMarketComponent onCreateStrategy={() => setActiveSection('create-grid')} />
          )}

          {['history', 'settings'].includes(activeSection) && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary">{navItems.find(n => n.id === activeSection)?.label}</h2>
              <Card variant="default"><CardContent><div className="h-64 flex items-center justify-center"><span className="text-text-tertiary">Coming soon...</span></div></CardContent></Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
