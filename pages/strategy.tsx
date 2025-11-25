// 策略管理页面 Strategy Management Page
// 根据设计文档第4节实现

import React, { useState } from 'react';
import { Button } from '../design-system/components/Button/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../design-system/components/Card/Card';

// 模拟策略数据
const mockStrategies = [
  {
    id: 1,
    name: 'BTC网格策略A',
    pair: 'BTC/USDT',
    exchange: 'Binance',
    status: 'running',
    gridRange: { min: 40000, max: 50000 },
    gridCount: 20,
    investment: 10000,
    pnl: 1250.30,
    pnlPercent: 12.5,
    lastExecution: '2024-11-25 11:45:23',
    totalTrades: 156,
    winRate: 68.5
  },
  {
    id: 2,
    name: 'ETH套利策略',
    pair: 'ETH/USDT',
    exchange: 'Multiple',
    status: 'running',
    gridRange: { min: 2500, max: 3000 },
    gridCount: 15,
    investment: 8000,
    pnl: 890.50,
    pnlPercent: 11.1,
    lastExecution: '2024-11-25 11:42:15',
    totalTrades: 89,
    winRate: 72.1
  },
  {
    id: 3,
    name: 'USDT稳定策略',
    pair: 'USDT/USDC',
    exchange: 'OKX',
    status: 'paused',
    gridRange: { min: 0.998, max: 1.002 },
    gridCount: 50,
    investment: 5000,
    pnl: -120.20,
    pnlPercent: -2.4,
    lastExecution: '2024-11-25 10:30:45',
    totalTrades: 234,
    winRate: 45.2
  }
];

export default function StrategyPage() {
  const [selectedStrategy, setSelectedStrategy] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-background-primary">
      {/* 顶部导航 */}
      <nav className="nav-base px-6 py-4 border-b border-border-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold text-text-primary">
              🔊 Noise Grid
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <a href="/" className="nav-item">首页</a>
              <a href="/dashboard" className="nav-item">交易系统</a>
              <a href="/strategy" className="nav-item-active">策略管理</a>
              <a href="#" className="nav-item">AI助手</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              创建新策略
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* 页面标题和统计 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-4">策略管理</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card variant="default">
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">
                    {mockStrategies.length}
                  </div>
                  <div className="text-sm text-text-secondary">总策略数</div>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="default">
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-400">
                    {mockStrategies.filter(s => s.status === 'running').length}
                  </div>
                  <div className="text-sm text-text-secondary">运行中</div>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="default">
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">
                    ${mockStrategies.reduce((sum, s) => sum + s.investment, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary">总投入</div>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="default">
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-400">
                    +${mockStrategies.reduce((sum, s) => sum + s.pnl, 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-text-secondary">总盈亏</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 策略列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockStrategies.map((strategy) => (
            <Card 
              key={strategy.id} 
              variant="default" 
              hoverable 
              clickable
              onClick={() => setSelectedStrategy(strategy)}
            >
              <CardHeader 
                title={strategy.name}
                subtitle={`${strategy.pair} • ${strategy.exchange}`}
                action={
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    strategy.status === 'running' 
                      ? 'bg-success-900 text-success-300 border border-success-700' 
                      : 'bg-warning-900 text-warning-300 border border-warning-700'
                  }`}>
                    {strategy.status === 'running' ? '运行中' : '已暂停'}
                  </span>
                }
              />
              
              <CardContent>
                <div className="space-y-3">
                  {/* 盈亏信息 */}
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">盈亏</span>
                    <div className="text-right">
                      <div className={`font-mono font-semibold ${
                        strategy.pnl >= 0 ? 'text-success-400' : 'text-danger-400'
                      }`}>
                        {strategy.pnl >= 0 ? '+' : ''}${strategy.pnl}
                      </div>
                      <div className={`text-sm ${
                        strategy.pnlPercent >= 0 ? 'text-success-400' : 'text-danger-400'
                      }`}>
                        {strategy.pnlPercent >= 0 ? '+' : ''}{strategy.pnlPercent}%
                      </div>
                    </div>
                  </div>
                  
                  {/* 网格信息 */}
                  <div className="flex justify-between">
                    <span className="text-text-secondary">网格区间</span>
                    <span className="font-mono text-text-primary text-sm">
                      ${strategy.gridRange.min} - ${strategy.gridRange.max}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-text-secondary">网格数量</span>
                    <span className="font-mono text-text-primary">
                      {strategy.gridCount}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-text-secondary">胜率</span>
                    <span className="font-mono text-success-400">
                      {strategy.winRate}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-text-secondary">总交易</span>
                    <span className="font-mono text-text-primary">
                      {strategy.totalTrades}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <div className="flex gap-2 w-full">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // 编辑策略逻辑
                    }}
                  >
                    编辑
                  </Button>
                  <Button 
                    variant={strategy.status === 'running' ? 'danger' : 'primary'} 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // 启动/停止策略逻辑
                    }}
                  >
                    {strategy.status === 'running' ? '停止' : '启动'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStrategy(strategy);
                    }}
                  >
                    详情
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* 策略详情弹窗 */}
        {selectedStrategy && (
          <div className="fixed inset-0 bg-background-overlay backdrop-blur-sm z-modal flex items-center justify-center p-4">
            <div className="bg-background-modal border border-border-primary rounded-lg shadow-dark-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">
                    {selectedStrategy.name}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedStrategy(null)}
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 基本信息 */}
                  <Card variant="outlined">
                    <CardHeader title="基本信息" />
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">交易对</span>
                          <span className="font-mono text-text-primary">{selectedStrategy.pair}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">交易所</span>
                          <span className="text-text-primary">{selectedStrategy.exchange}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">投入资金</span>
                          <span className="font-mono text-text-primary">${selectedStrategy.investment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">最后执行</span>
                          <span className="font-mono text-text-secondary text-sm">{selectedStrategy.lastExecution}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* 网格参数 */}
                  <Card variant="outlined">
                    <CardHeader title="网格参数" />
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">价格区间</span>
                          <span className="font-mono text-text-primary">
                            ${selectedStrategy.gridRange.min} - ${selectedStrategy.gridRange.max}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">网格数量</span>
                          <span className="font-mono text-text-primary">{selectedStrategy.gridCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">网格间距</span>
                          <span className="font-mono text-text-primary">
                            ${((selectedStrategy.gridRange.max - selectedStrategy.gridRange.min) / selectedStrategy.gridCount).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">每格投入</span>
                          <span className="font-mono text-text-primary">
                            ${(selectedStrategy.investment / selectedStrategy.gridCount).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* 收益统计 */}
                  <Card variant="outlined">
                    <CardHeader title="收益统计" />
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">总盈亏</span>
                          <span className={`font-mono font-semibold ${
                            selectedStrategy.pnl >= 0 ? 'text-success-400' : 'text-danger-400'
                          }`}>
                            {selectedStrategy.pnl >= 0 ? '+' : ''}${selectedStrategy.pnl}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">收益率</span>
                          <span className={`font-mono font-semibold ${
                            selectedStrategy.pnlPercent >= 0 ? 'text-success-400' : 'text-danger-400'
                          }`}>
                            {selectedStrategy.pnlPercent >= 0 ? '+' : ''}{selectedStrategy.pnlPercent}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">总交易次数</span>
                          <span className="font-mono text-text-primary">{selectedStrategy.totalTrades}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">胜率</span>
                          <span className="font-mono text-success-400">{selectedStrategy.winRate}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* 历史收益图表 */}
                  <Card variant="outlined">
                    <CardHeader title="历史收益曲线" />
                    <CardContent>
                      <div className="h-48 bg-background-tertiary rounded-lg flex items-center justify-center">
                        <span className="text-text-tertiary">收益曲线图表</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex gap-4 mt-6 pt-6 border-t border-border-primary">
                  <Button variant="primary">编辑策略</Button>
                  <Button variant={selectedStrategy.status === 'running' ? 'danger' : 'primary'}>
                    {selectedStrategy.status === 'running' ? '停止策略' : '启动策略'}
                  </Button>
                  <Button variant="ghost">复制策略</Button>
                  <Button variant="danger">删除策略</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 创建策略弹窗 */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-background-overlay backdrop-blur-sm z-modal flex items-center justify-center p-4">
            <div className="bg-background-modal border border-border-primary rounded-lg shadow-dark-xl max-w-2xl w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">创建新策略</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowCreateModal(false)}
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* 基本设置 */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      策略名称
                    </label>
                    <input 
                      type="text" 
                      className="input-base"
                      placeholder="输入策略名称"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        交易对
                      </label>
                      <select className="input-base">
                        <option>BTC/USDT</option>
                        <option>ETH/USDT</option>
                        <option>BNB/USDT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        交易所
                      </label>
                      <select className="input-base">
                        <option>Binance</option>
                        <option>OKX</option>
                        <option>Huobi</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* 网格参数 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        最低价格
                      </label>
                      <input 
                        type="number" 
                        className="input-base"
                        placeholder="40000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        最高价格
                      </label>
                      <input 
                        type="number" 
                        className="input-base"
                        placeholder="50000"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        网格数量
                      </label>
                      <input 
                        type="number" 
                        className="input-base"
                        placeholder="20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        投入资金 (USDT)
                      </label>
                      <input 
                        type="number" 
                        className="input-base"
                        placeholder="10000"
                      />
                    </div>
                  </div>
                  
                  {/* AI推荐 */}
                  <Card variant="outlined">
                    <CardHeader title="AI推荐参数" />
                    <CardContent>
                      <div className="text-sm text-text-secondary mb-3">
                        基于当前市场情况，AI推荐以下参数：
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>推荐价格区间:</span>
                          <span className="font-mono text-primary-400">$42,000 - $48,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>推荐网格数量:</span>
                          <span className="font-mono text-primary-400">25</span>
                        </div>
                        <div className="flex justify-between">
                          <span>预期年化收益:</span>
                          <span className="font-mono text-success-400">15-25%</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-3">
                        采用AI推荐
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex gap-4 mt-6 pt-6 border-t border-border-primary">
                  <Button variant="primary" fullWidth>创建策略</Button>
                  <Button variant="ghost" fullWidth onClick={() => setShowCreateModal(false)}>
                    取消
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
