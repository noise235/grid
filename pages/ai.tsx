// AI Trading Signals Page
// AI-powered trading recommendations and analysis

import React, { useState } from 'react';
import { Button } from '../design-system/components/Button/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../design-system/components/Card/Card';
import { LanguageSwitcher } from '../design-system/components/LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

// Mock data for AI signals
const mockAIData = {
  signals: [
    {
      id: 1,
      type: 'long',
      asset: 'BTC',
      confidence: 85,
      reason: 'Technical indicators show strong bullish momentum with RSI oversold recovery',
      targetPrice: 45200,
      currentPrice: 43250,
      stopLoss: 41800,
      timeframe: '4h',
      timestamp: '2024-11-25 13:30:00',
      status: 'active'
    },
    {
      id: 2,
      type: 'short',
      asset: 'ETH',
      confidence: 72,
      reason: 'Significant fund outflow detected, bearish divergence on MACD',
      targetPrice: 2580,
      currentPrice: 2680,
      stopLoss: 2720,
      timeframe: '1h',
      timestamp: '2024-11-25 13:15:00',
      status: 'pending'
    },
    {
      id: 3,
      type: 'long',
      asset: 'SOL',
      confidence: 78,
      reason: 'Breaking above key resistance level with high volume confirmation',
      targetPrice: 68.50,
      currentPrice: 65.20,
      stopLoss: 62.80,
      timeframe: '2h',
      timestamp: '2024-11-25 12:45:00',
      status: 'executed'
    },
    {
      id: 4,
      type: 'short',
      asset: 'ADA',
      confidence: 68,
      reason: 'Weak market structure, failing to hold support levels',
      targetPrice: 0.465,
      currentPrice: 0.485,
      stopLoss: 0.495,
      timeframe: '6h',
      timestamp: '2024-11-25 11:20:00',
      status: 'expired'
    }
  ],
  performance: {
    totalSignals: 24,
    successfulSignals: 18,
    winRate: 75.0,
    avgConfidence: 76.5
  },
  marketSentiment: {
    overall: 'bullish',
    btc: 'bullish',
    eth: 'bearish',
    altcoins: 'neutral'
  }
};

export default function AISignalsPage() {
  const { language, setLanguage, t } = useLanguage();
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSignals = mockAIData.signals.filter(signal => 
    (filterType === 'all' || signal.type === filterType) &&
    (filterStatus === 'all' || signal.status === filterStatus)
  );

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-success-400';
      case 'bearish': return 'text-danger-400';
      case 'neutral': return 'text-warning-400';
      default: return 'text-text-secondary';
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
            <h1 className="text-3xl font-bold text-text-primary mb-2">AI Trading Signals</h1>
            <p className="text-text-secondary">AI-powered market analysis and trading recommendations</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">Refresh Signals</Button>
            <Button variant="primary">Configure AI Settings</Button>
          </div>
        </div>

        {/* Performance & Market Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* AI Performance */}
          <Card variant="default">
            <CardHeader title="AI Performance Metrics" />
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-text-primary">
                    {mockAIData.performance.totalSignals}
                  </div>
                  <div className="text-sm text-text-secondary">Total Signals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-success-400">
                    {mockAIData.performance.successfulSignals}
                  </div>
                  <div className="text-sm text-text-secondary">Successful</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-primary-400">
                    {mockAIData.performance.winRate}%
                  </div>
                  <div className="text-sm text-text-secondary">Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-text-primary">
                    {mockAIData.performance.avgConfidence}%
                  </div>
                  <div className="text-sm text-text-secondary">Avg Confidence</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Sentiment */}
          <Card variant="default">
            <CardHeader title="Market Sentiment Analysis" />
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Overall Market</span>
                  <span className={`font-semibold capitalize ${getSentimentColor(mockAIData.marketSentiment.overall)}`}>
                    {mockAIData.marketSentiment.overall}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Bitcoin (BTC)</span>
                  <span className={`font-semibold capitalize ${getSentimentColor(mockAIData.marketSentiment.btc)}`}>
                    {mockAIData.marketSentiment.btc}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Ethereum (ETH)</span>
                  <span className={`font-semibold capitalize ${getSentimentColor(mockAIData.marketSentiment.eth)}`}>
                    {mockAIData.marketSentiment.eth}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Altcoins</span>
                  <span className={`font-semibold capitalize ${getSentimentColor(mockAIData.marketSentiment.altcoins)}`}>
                    {mockAIData.marketSentiment.altcoins}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-text-secondary text-sm">Signal Type:</span>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="input-base text-sm"
            >
              <option value="all">All</option>
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-text-secondary text-sm">Status:</span>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-base text-sm"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="executed">Executed</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* AI Signals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSignals.map((signal) => (
            <Card key={signal.id} variant="default" hoverable>
              <CardHeader 
                title={`${signal.type.toUpperCase()} ${signal.asset} (${signal.timeframe})`}
                action={
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    signal.status === 'active' ? 'bg-primary-900 text-primary-300' :
                    signal.status === 'executed' ? 'bg-success-900 text-success-300' :
                    signal.status === 'pending' ? 'bg-warning-900 text-warning-300' :
                    'bg-secondary-700 text-text-secondary'
                  }`}>
                    {signal.status.charAt(0).toUpperCase() + signal.status.slice(1)}
                  </span>
                }
              />
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">{t('confidence')}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-background-tertiary rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full" 
                          style={{ width: `${signal.confidence}%` }}
                        ></div>
                      </div>
                      <span className="font-mono font-semibold text-text-primary">{signal.confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Current Price</span>
                    <span className="font-mono text-text-primary">${signal.currentPrice}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Target Price</span>
                    <span className="font-mono text-primary-400">${signal.targetPrice}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Stop Loss</span>
                    <span className="font-mono text-danger-400">${signal.stopLoss}</span>
                  </div>
                  
                  <div className="mt-4">
                    <span className="text-text-secondary text-sm">{t('reason')}</span>
                    <p className="text-text-primary text-sm mt-1">{signal.reason}</p>
                  </div>
                  
                  <div className="text-xs text-text-tertiary">
                    Generated: {signal.timestamp}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 w-full">
                  {signal.status === 'active' && (
                    <>
                      <Button variant="primary" size="sm" className="flex-1">{t('acceptSuggestion')}</Button>
                      <Button variant="ghost" size="sm" className="flex-1">{t('viewDetails')}</Button>
                    </>
                  )}
                  {signal.status === 'pending' && (
                    <>
                      <Button variant="secondary" size="sm" className="flex-1">Set Alert</Button>
                      <Button variant="ghost" size="sm" className="flex-1">{t('viewDetails')}</Button>
                    </>
                  )}
                  {(signal.status === 'executed' || signal.status === 'expired') && (
                    <Button variant="ghost" size="sm" className="w-full">{t('viewDetails')}</Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* AI Analysis Charts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="default">
            <CardHeader title="Signal Accuracy Over Time" />
            <CardContent>
              <div className="h-64 bg-background-tertiary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-text-tertiary">Accuracy Trend Chart</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader title="Signal Distribution" />
            <CardContent>
              <div className="h-64 bg-background-tertiary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <span className="text-text-tertiary">Signal Type Distribution</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
