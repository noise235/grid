// Risk Monitoring Page
// Risk management and portfolio monitoring

import React, { useState } from 'react';
import { Button } from '../design-system/components/Button/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../design-system/components/Card/Card';
import { LanguageSwitcher } from '../design-system/components/LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

// Mock data for risk monitoring
const mockRiskData = {
  portfolio: {
    totalValue: 125840.50,
    totalInvestment: 120000,
    unrealizedPnL: 5840.50,
    maxDrawdown: -2.3,
    sharpeRatio: 1.85,
    winRate: 68.5,
    profitFactor: 1.42
  },
  positions: [
    {
      id: 1,
      asset: 'BTC',
      type: 'Grid Strategy',
      exposure: 45000,
      pnl: 2340.50,
      riskLevel: 'medium',
      stopLoss: 41800,
      currentPrice: 43250
    },
    {
      id: 2,
      asset: 'ETH',
      type: 'Arbitrage',
      exposure: 25000,
      pnl: 890.30,
      riskLevel: 'low',
      stopLoss: 2580,
      currentPrice: 2680
    },
    {
      id: 3,
      asset: 'SOL',
      type: 'Grid Strategy',
      exposure: 15000,
      pnl: -320.80,
      riskLevel: 'high',
      stopLoss: 62.50,
      currentPrice: 65.20
    }
  ],
  alerts: [
    {
      id: 1,
      type: 'warning',
      message: 'BTC position approaching stop loss level',
      timestamp: '2024-11-25 13:45:00',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'Portfolio rebalancing recommended',
      timestamp: '2024-11-25 13:30:00',
      severity: 'low'
    },
    {
      id: 3,
      type: 'critical',
      message: 'SOL position exceeds risk threshold',
      timestamp: '2024-11-25 13:15:00',
      severity: 'high'
    }
  ]
};

export default function RiskMonitoringPage() {
  const { language, setLanguage, t } = useLanguage();
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success-400 bg-success-900';
      case 'medium': return 'text-warning-400 bg-warning-900';
      case 'high': return 'text-danger-400 bg-danger-900';
      default: return 'text-text-secondary bg-background-tertiary';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-l-primary-500 bg-primary-900/20';
      case 'medium': return 'border-l-warning-500 bg-warning-900/20';
      case 'high': return 'border-l-danger-500 bg-danger-900/20';
      default: return 'border-l-text-secondary bg-background-secondary';
    }
  };

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
              <a href="/" className="nav-item">{t('home')}</a>
              <a href="/dashboard" className="nav-item">{t('dashboard')}</a>
              <a href="/grid" className="nav-item">Grid Trading</a>
              <a href="/arbitrage" className="nav-item">Arbitrage</a>
              <a href="/risk" className="nav-item-active">Risk</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher 
              currentLanguage={language}
              onLanguageChange={setLanguage}
              size="sm"
            />
            <Button variant="ghost" size="sm">{t('account')}</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Risk Monitoring</h1>
            <p className="text-text-secondary">Portfolio risk analysis and management</p>
          </div>
          <div className="flex gap-3">
            <select 
              value={selectedTimeframe} 
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="input-base"
            >
              <option value="1h">1 Hour</option>
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
            </select>
            <Button variant="primary">Generate Report</Button>
          </div>
        </div>

        {/* Risk Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card variant="default">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-danger-400">
                  {mockRiskData.portfolio.maxDrawdown}%
                </div>
                <div className="text-sm text-text-secondary">Max Drawdown</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="default">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-text-primary">
                  {mockRiskData.portfolio.sharpeRatio}
                </div>
                <div className="text-sm text-text-secondary">Sharpe Ratio</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="default">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-success-400">
                  {mockRiskData.portfolio.winRate}%
                </div>
                <div className="text-sm text-text-secondary">Win Rate</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="default">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-text-primary">
                  {mockRiskData.portfolio.profitFactor}
                </div>
                <div className="text-sm text-text-secondary">Profit Factor</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Position Risk Analysis */}
          <Card variant="default">
            <CardHeader title="Position Risk Analysis" />
            <CardContent>
              <div className="space-y-4">
                {mockRiskData.positions.map((position) => (
                  <div key={position.id} className="border border-border-primary rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-text-primary">{position.asset}</span>
                        <span className="text-sm text-text-secondary">{position.type}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(position.riskLevel)}`}>
                        {position.riskLevel.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">Exposure</span>
                        <div className="font-mono text-text-primary">${position.exposure.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">P&L</span>
                        <div className={`font-mono ${position.pnl >= 0 ? 'text-success-400' : 'text-danger-400'}`}>
                          {position.pnl >= 0 ? '+' : ''}${position.pnl}
                        </div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Current Price</span>
                        <div className="font-mono text-text-primary">${position.currentPrice}</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Stop Loss</span>
                        <div className="font-mono text-danger-400">${position.stopLoss}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Alerts */}
          <Card variant="default">
            <CardHeader title="Risk Alerts" />
            <CardContent>
              <div className="space-y-3">
                {mockRiskData.alerts.map((alert) => (
                  <div key={alert.id} className={`border-l-4 p-4 rounded ${getAlertColor(alert.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {alert.severity === 'high' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                          </svg>
                          <span className="font-medium text-text-primary">{alert.type.toUpperCase()}</span>
                        </div>
                        <p className="text-text-primary text-sm">{alert.message}</p>
                        <p className="text-text-tertiary text-xs mt-1">{alert.timestamp}</p>
                      </div>
                      <Button variant="ghost" size="sm">Dismiss</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="default">
            <CardHeader title="Portfolio Value at Risk (VaR)" />
            <CardContent>
              <div className="h-64 bg-background-tertiary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-text-tertiary">VaR Analysis Chart</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader title="Risk Distribution" />
            <CardContent>
              <div className="h-64 bg-background-tertiary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <span className="text-text-tertiary">Risk Exposure Distribution</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Management Actions */}
        <div className="mt-8">
          <Card variant="default">
            <CardHeader title="Risk Management Actions" />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="secondary" className="h-20 flex flex-col items-center justify-center">
                  <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Set Stop Loss
                </Button>
                
                <Button variant="secondary" className="h-20 flex flex-col items-center justify-center">
                  <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
                  </svg>
                  Rebalance Portfolio
                </Button>
                
                <Button variant="secondary" className="h-20 flex flex-col items-center justify-center">
                  <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.343 12.344l7.539 7.539a2.25 2.25 0 003.182 0l7.539-7.539a2.25 2.25 0 000-3.182L15.064 1.623a2.25 2.25 0 00-3.182 0L4.343 9.162a2.25 2.25 0 000 3.182z" />
                  </svg>
                  Hedge Positions
                </Button>
                
                <Button variant="secondary" className="h-20 flex flex-col items-center justify-center">
                  <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Emergency Stop
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
