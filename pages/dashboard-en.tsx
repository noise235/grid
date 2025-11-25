// Trading System Dashboard - English Version
// Complete trading interface implementation with language support

import React, { useState } from 'react';
import { Button } from '../design-system/components/Button/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../design-system/components/Card/Card';
import { LanguageSwitcher } from '../design-system/components/LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

// Mock data
const mockData = {
  portfolio: {
    totalValue: 125840.50,
    todayPnL: 2340.80,
    todayPnLPercent: 1.89,
    activeStrategies: 8,
    totalTrades: 156
  },
  strategies: [
    { id: 1, name: 'BTC Grid Strategy A', status: 'running', pnl: 1250.30, pnlPercent: 2.1 },
    { id: 2, name: 'ETH Arbitrage Strategy', status: 'running', pnl: 890.50, pnlPercent: 1.8 },
    { id: 3, name: 'USDT Grid', status: 'paused', pnl: -120.20, pnlPercent: -0.3 },
  ],
  arbitrageOpportunities: [
    { pair: 'BTC/USDT', exchange1: 'Binance', exchange2: 'OKX', spread: 0.15, volume: 2.5 },
    { pair: 'ETH/USDT', exchange1: 'Huobi', exchange2: 'Binance', spread: 0.08, volume: 5.2 },
  ],
  aiSignals: [
    { type: 'long', asset: 'BTC', confidence: 85, reason: 'Technical indicators bullish' },
    { type: 'short', asset: 'ETH', confidence: 72, reason: 'Significant fund outflow' },
  ]
};

export default function DashboardEN() {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('grid');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Top Navigation */}
      <nav className="nav-base px-6 py-4 border-b border-border-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold text-text-primary">
              🔊 Noise Grid
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <a href="/" className="nav-item">{t('home')}</a>
              <a href="/dashboard" className="nav-item-active">{t('dashboard')}</a>
              <a href="#" className="nav-item">Strategy Market</a>
              <a href="#" className="nav-item">{t('aiAssistant')}</a>
              <a href="#" className="nav-item">{t('docs')}</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher 
              currentLanguage={language}
              onLanguageChange={setLanguage}
              size="sm"
            />
            <div className="text-sm text-text-secondary">
              {t('totalAssets')}: <span className="text-text-primary font-mono font-semibold">
                ${mockData.portfolio.totalValue.toLocaleString()}
              </span>
            </div>
            <Button variant="ghost" size="sm">{t('account')}</Button>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className={`sidebar-base transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } border-r border-border-primary`}>
          <div className="p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="mb-4 w-full justify-start"
            >
              {sidebarCollapsed ? '→' : '←'} {!sidebarCollapsed && 'Collapse'}
            </Button>
            
            {!sidebarCollapsed && (
              <nav className="space-y-2">
                <a href="#" className="sidebar-item-active">
                  📊 Grid Strategy Management
                </a>
                <a href="#" className="sidebar-item">
                  🔄 Arbitrage Opportunities
                </a>
                <a href="#" className="sidebar-item">
                  📈 Trading History
                </a>
                <a href="#" className="sidebar-item">
                  ⚠️ Risk Monitoring
                </a>
                <a href="#" className="sidebar-item">
                  🔑 API Management
                </a>
                <a href="#" className="sidebar-item">
                  ⚙️ Settings
                </a>
              </nav>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Overview Cards */}
          <div className="p-6 border-b border-border-primary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="default">
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-text-primary">
                      ${mockData.portfolio.totalValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-secondary">{t('totalAssets')}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="default">
                <CardContent>
                  <div className="text-center">
                    <div className={`text-2xl font-mono font-bold ${
                      mockData.portfolio.todayPnL >= 0 ? 'text-success-400' : 'text-danger-400'
                    }`}>
                      {mockData.portfolio.todayPnL >= 0 ? '+' : ''}${mockData.portfolio.todayPnL.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-secondary">{t('todayPnL')}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="default">
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-primary-400">
                      {mockData.portfolio.activeStrategies}
                    </div>
                    <div className="text-sm text-text-secondary">{t('activeStrategies')}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="default">
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-text-primary">
                      {mockData.portfolio.totalTrades}
                    </div>
                    <div className="text-sm text-text-secondary">{t('todayTrades')}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border-primary">
            <div className="flex px-6">
              {[
                { id: 'grid', label: t('gridTrading'), icon: '⚡' },
                { id: 'arbitrage', label: t('arbitrageMonitoring'), icon: '🔄' },
                { id: 'ai', label: t('aiSignals'), icon: '🤖' },
                { id: 'monitoring', label: t('riskMonitoring'), icon: '📊' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-400'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Panel */}
          <div className="flex-1 flex overflow-hidden">
            {/* Central Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'grid' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-text-primary">Grid Strategy Management</h2>
                    <Button variant="primary">Create New Strategy</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mockData.strategies.map((strategy) => (
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
                          <div className="space-y-3">
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
                          </div>
                        </CardContent>
                        <CardFooter>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">{t('edit')}</Button>
                            <Button variant="ghost" size="sm">{t('details')}</Button>
                            <Button 
                              variant={strategy.status === 'running' ? 'danger' : 'primary'} 
                              size="sm"
                            >
                              {strategy.status === 'running' ? t('stop') : t('start')}
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'arbitrage' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-text-primary">Arbitrage Monitoring</h2>
                    <Button variant="primary">{t('refresh')} Data</Button>
                  </div>
                  
                  <Card variant="default">
                    <CardHeader title="Real-time Arbitrage Opportunities" />
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border-primary">
                              <th className="text-left py-3 text-text-secondary">Pair</th>
                              <th className="text-left py-3 text-text-secondary">Exchange 1</th>
                              <th className="text-left py-3 text-text-secondary">Exchange 2</th>
                              <th className="text-left py-3 text-text-secondary">Spread</th>
                              <th className="text-left py-3 text-text-secondary">Volume</th>
                              <th className="text-left py-3 text-text-secondary">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockData.arbitrageOpportunities.map((opp, index) => (
                              <tr key={index} className="border-b border-border-primary">
                                <td className="py-3 font-mono font-semibold text-text-primary">{opp.pair}</td>
                                <td className="py-3 text-text-secondary">{opp.exchange1}</td>
                                <td className="py-3 text-text-secondary">{opp.exchange2}</td>
                                <td className="py-3 font-mono font-semibold text-success-400">
                                  +{opp.spread}%
                                </td>
                                <td className="py-3 font-mono text-text-primary">{opp.volume}</td>
                                <td className="py-3">
                                  <Button variant="primary" size="sm">Execute</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-text-primary">AI Trading Signals</h2>
                    <Button variant="primary">Refresh Signals</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mockData.aiSignals.map((signal, index) => (
                      <Card key={index} variant="default">
                        <CardHeader 
                          title={`${signal.asset} ${signal.type === 'long' ? 'Long' : 'Short'} Signal`}
                          action={
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              signal.type === 'long' 
                                ? 'bg-success-900 text-success-300' 
                                : 'bg-danger-900 text-danger-300'
                            }`}>
                              {signal.type === 'long' ? 'LONG' : 'SHORT'}
                            </span>
                          }
                        />
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-text-secondary">{t('confidence')}</span>
                              <span className="font-mono font-semibold text-text-primary">
                                {signal.confidence}%
                              </span>
                            </div>
                            <div>
                              <span className="text-text-secondary">{t('reason')}</span>
                              <p className="text-text-primary mt-1">{signal.reason}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <div className="flex gap-2">
                            <Button variant="primary" size="sm">{t('acceptSuggestion')}</Button>
                            <Button variant="ghost" size="sm">{t('viewDetails')}</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'monitoring' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-text-primary">Risk Monitoring</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card variant="default">
                      <CardHeader title="Position Distribution" />
                      <CardContent>
                        <div className="h-64 bg-background-tertiary rounded-lg flex items-center justify-center">
                          <span className="text-text-tertiary">Position Distribution Chart</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card variant="default">
                      <CardHeader title="Risk Metrics" />
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Max Drawdown</span>
                            <span className="font-mono text-danger-400">-2.3%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Sharpe Ratio</span>
                            <span className="font-mono text-text-primary">1.85</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Win Rate</span>
                            <span className="font-mono text-success-400">68.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Profit Factor</span>
                            <span className="font-mono text-text-primary">1.42</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel */}
            <aside className="w-80 border-l border-border-primary p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* System Messages */}
                <Card variant="default">
                  <CardHeader title={t('systemMessages')} />
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-success-900/20 border border-success-700 rounded">
                        <div className="text-success-300 font-medium">Trade Executed</div>
                        <div className="text-text-secondary">BTC grid strategy buy order executed</div>
                        <div className="text-xs text-text-tertiary mt-1">2 minutes ago</div>
                      </div>
                      <div className="p-3 bg-primary-900/20 border border-primary-700 rounded">
                        <div className="text-primary-300 font-medium">AI Recommendation</div>
                        <div className="text-text-secondary">ETH arbitrage opportunity detected</div>
                        <div className="text-xs text-text-tertiary mt-1">5 minutes ago</div>
                      </div>
                      <div className="p-3 bg-warning-900/20 border border-warning-700 rounded">
                        <div className="text-warning-300 font-medium">Risk Alert</div>
                        <div className="text-text-secondary">BTC volatility exceeds threshold</div>
                        <div className="text-xs text-text-tertiary mt-1">10 minutes ago</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card variant="default">
                  <CardHeader title={t('quickActions')} />
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="primary" size="sm" fullWidth>
                        Create Grid Strategy
                      </Button>
                      <Button variant="secondary" size="sm" fullWidth>
                        View Arbitrage Opportunities
                      </Button>
                      <Button variant="ghost" size="sm" fullWidth>
                        Risk Assessment
                      </Button>
                      <Button variant="ghost" size="sm" fullWidth>
                        Export Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Overview */}
                <Card variant="default">
                  <CardHeader title={t('marketOverview')} />
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">BTC/USDT</span>
                        <span className="font-mono text-success-400">$43,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">ETH/USDT</span>
                        <span className="font-mono text-danger-400">$2,680</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Fear & Greed</span>
                        <span className="font-mono text-warning-400">65</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>

          {/* Bottom Status Bar */}
          <footer className="border-t border-border-primary px-6 py-3 bg-background-secondary">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <span className="text-text-secondary">
                  {t('connectionStatus')}: <span className="text-success-400">{t('connected')}</span>
                </span>
                <span className="text-text-secondary">
                  {t('lastUpdate')}: <span className="text-text-primary">12:09:45</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">Trading Log</Button>
                <Button variant="ghost" size="sm">Help</Button>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
