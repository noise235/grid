// Arbitrage Monitoring Page
// Real-time arbitrage opportunities and monitoring

import React, { useState } from 'react';
import { Button } from '../design-system/components/Button/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../design-system/components/Card/Card';
import { LanguageSwitcher } from '../design-system/components/LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

// Mock data for arbitrage opportunities
const mockArbitrageData = {
  opportunities: [
    { 
      id: 1,
      pair: 'BTC/USDT', 
      exchange1: { name: 'Binance', price: 43250.50 },
      exchange2: { name: 'OKX', price: 43315.20 },
      spread: 0.15, 
      spreadAmount: 64.70,
      volume: 2.5,
      profit: 161.75,
      status: 'active'
    },
    { 
      id: 2,
      pair: 'ETH/USDT', 
      exchange1: { name: 'Huobi', price: 2680.30 },
      exchange2: { name: 'Binance', price: 2682.45 },
      spread: 0.08, 
      spreadAmount: 2.15,
      volume: 5.2,
      profit: 11.18,
      status: 'active'
    },
    { 
      id: 3,
      pair: 'BNB/USDT', 
      exchange1: { name: 'Binance', price: 598.20 },
      exchange2: { name: 'Coinbase', price: 600.85 },
      spread: 0.44, 
      spreadAmount: 2.65,
      volume: 8.1,
      profit: 21.47,
      status: 'executed'
    },
    { 
      id: 4,
      pair: 'ADA/USDT', 
      exchange1: { name: 'KuCoin', price: 0.4825 },
      exchange2: { name: 'Binance', price: 0.4845 },
      spread: 0.41, 
      spreadAmount: 0.002,
      volume: 15000,
      profit: 30.00,
      status: 'monitoring'
    }
  ],
  stats: {
    totalOpportunities: 12,
    activeOpportunities: 4,
    executedToday: 8,
    totalProfit: 324.50
  }
};

export default function ArbitragePage() {
  const { language, setLanguage, t } = useLanguage();
  const [sortBy, setSortBy] = useState('spread');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOpportunities = mockArbitrageData.opportunities.filter(opp => 
    filterStatus === 'all' || opp.status === filterStatus
  );

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
              <a href="/arbitrage" className="nav-item-active">Arbitrage</a>
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
            <h1 className="text-3xl font-bold text-text-primary mb-2">Arbitrage Monitoring</h1>
            <p className="text-text-secondary">Real-time cross-exchange arbitrage opportunities</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">{t('refresh')} Data</Button>
            <Button variant="primary">Configure Alerts</Button>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card variant="default">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-text-primary">
                  {mockArbitrageData.stats.totalOpportunities}
                </div>
                <div className="text-sm text-text-secondary">Total Opportunities</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="default">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-primary-400">
                  {mockArbitrageData.stats.activeOpportunities}
                </div>
                <div className="text-sm text-text-secondary">Active Now</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="default">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-success-400">
                  {mockArbitrageData.stats.executedToday}
                </div>
                <div className="text-sm text-text-secondary">Executed Today</div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="default">
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-success-400">
                  +${mockArbitrageData.stats.totalProfit}
                </div>
                <div className="text-sm text-text-secondary">Today's Profit</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-text-secondary text-sm">Filter by status:</span>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-base text-sm"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="monitoring">Monitoring</option>
              <option value="executed">Executed</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-text-secondary text-sm">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="input-base text-sm"
            >
              <option value="spread">Spread %</option>
              <option value="profit">Profit</option>
              <option value="volume">Volume</option>
            </select>
          </div>
        </div>

        {/* Arbitrage Opportunities Table */}
        <Card variant="default">
          <CardHeader title="Real-time Arbitrage Opportunities" />
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-primary">
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Pair</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Exchange 1</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Exchange 2</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Spread</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Volume</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Est. Profit</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOpportunities.map((opp) => (
                    <tr key={opp.id} className="border-b border-border-primary hover:bg-background-secondary">
                      <td className="py-3 px-4 font-mono font-semibold text-text-primary">{opp.pair}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-text-primary font-medium">{opp.exchange1.name}</div>
                          <div className="text-sm font-mono text-text-secondary">${opp.exchange1.price}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-text-primary font-medium">{opp.exchange2.name}</div>
                          <div className="text-sm font-mono text-text-secondary">${opp.exchange2.price}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-mono font-semibold text-success-400">+{opp.spread}%</div>
                          <div className="text-sm font-mono text-text-secondary">${opp.spreadAmount}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-text-primary">{opp.volume}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-success-400">+${opp.profit}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          opp.status === 'active' ? 'bg-success-900 text-success-300' :
                          opp.status === 'executed' ? 'bg-primary-900 text-primary-300' :
                          'bg-warning-900 text-warning-300'
                        }`}>
                          {opp.status.charAt(0).toUpperCase() + opp.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {opp.status === 'active' && (
                          <Button variant="primary" size="sm">Execute</Button>
                        )}
                        {opp.status === 'monitoring' && (
                          <Button variant="secondary" size="sm">Monitor</Button>
                        )}
                        {opp.status === 'executed' && (
                          <Button variant="ghost" size="sm">View</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Market Analysis Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="default">
            <CardHeader title="Price Spread Analysis" />
            <CardContent>
              <div className="h-64 bg-background-tertiary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-text-tertiary">Spread Analysis Chart</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader title="Exchange Volume Comparison" />
            <CardContent>
              <div className="h-64 bg-background-tertiary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <span className="text-text-tertiary">Volume Distribution Chart</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
