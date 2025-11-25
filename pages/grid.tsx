// Grid Trading Page
// Grid strategy management and monitoring

import React, { useState } from 'react';
import { Button } from '../design-system/components/Button/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../design-system/components/Card/Card';
import { LanguageSwitcher } from '../design-system/components/LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

// Mock data for grid strategies
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

export default function GridTradingPage() {
  const { language, setLanguage, t } = useLanguage();
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);

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
              <a href="/grid" className="nav-item-active">Grid Trading</a>
              <a href="/arbitrage" className="nav-item">Arbitrage</a>
              <a href="/risk" className="nav-item">Risk</a>
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
            <h1 className="text-3xl font-bold text-text-primary mb-2">Grid Trading</h1>
            <p className="text-text-secondary">Manage and monitor your grid trading strategies</p>
          </div>
          <Button 
            variant="primary"
            onClick={() => window.location.href = '/dashboard?section=create-grid'}
          >
            Create New Strategy
          </Button>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  <Button variant="ghost" size="sm" className="flex-1">{t('edit')}</Button>
                  <Button variant="ghost" size="sm" className="flex-1">{t('details')}</Button>
                  <Button 
                    variant={strategy.status === 'running' ? 'danger' : 'primary'} 
                    size="sm"
                    className="flex-1"
                  >
                    {strategy.status === 'running' ? t('stop') : t('start')}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Grid Visualization Section */}
        <div className="mt-8">
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
      </div>
    </div>
  );
}
