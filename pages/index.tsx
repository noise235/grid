// Noise Grid Homepage
// Showcase of the design system with animated background

import React from 'react';
import { Button } from '../design-system/components/Button/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../design-system/components/Card/Card';
import { TradingBackground } from '../components/TradingBackground';

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Trading Background */}
      <TradingBackground />
      
      {/* All Content Wrapper */}
      <div className="relative z-10 min-h-screen bg-transparent">
        {/* Navigation */}
        <nav className="nav-base px-6 py-4 backdrop-blur-md bg-background-primary/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-text-primary flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            </svg>
            Noise Grid
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="primary" size="sm">Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-text-primary mb-4 animate-fade-in">
              Noise Grid
            </h1>
            <h2 className="text-4xl font-semibold text-text-accent mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Turn Noise into Alpha
            </h2>
          </div>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.4s'}}>
            AI-powered quantitative arbitrage platform that extracts stable returns from market noise
          </p>
          <div className="flex items-center justify-center gap-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <a href="/dashboard">
              <Button variant="primary" size="lg" className="shadow-glow-blue hover:scale-105 transition-all duration-300">
                Start Trading
              </Button>
            </a>
            <a href="/grid">
              <Button variant="secondary" size="lg" className="hover:scale-105 transition-all duration-300">
                View Strategies
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-background-primary/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
            Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Smart Grid Arbitrage */}
            <Card variant="default" hoverable>
              <CardHeader title="Smart Grid Trading" />
              <CardContent>
                <p className="text-text-secondary">
                  Dynamically adjust grid parameters to automatically capture arbitrage opportunities in price fluctuations
                </p>
              </CardContent>
            </Card>

            {/* Cross-Exchange Arbitrage */}
            <Card variant="default" hoverable>
              <CardHeader title="Cross-Exchange Arbitrage" />
              <CardContent>
                <p className="text-text-secondary">
                  Real-time monitoring of price differences across multiple exchanges with automated arbitrage execution
                </p>
              </CardContent>
            </Card>

            {/* Noise AI */}
            <Card variant="default" hoverable>
              <CardHeader title="Noise AI" />
              <CardContent>
                <p className="text-text-secondary">
                  AI-assisted decision making with intelligent recommendations for optimal trading strategies and parameters
                </p>
              </CardContent>
            </Card>

            {/* Unified API */}
            <Card variant="default" hoverable>
              <CardHeader title="Unified API Interface" />
              <CardContent>
                <p className="text-text-secondary">
                  Support for major exchanges with one-click integration to multiple trading platforms
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="px-6 py-16 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
            Why Choose Noise Grid
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Non-Neutral Grid Strategy
              </h3>
              <p className="text-text-secondary">
                Focus on non-neutral grids for better performance in trending markets
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Stable Alpha Returns
              </h3>
              <p className="text-text-secondary">
                Extract stable returns from market noise while reducing overall investment risk
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warning-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Full AI Assistance
              </h3>
              <p className="text-text-secondary">
                AI assistant provides full guidance with intelligent optimization of trading decisions and risk control
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Display Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Real-time Trading Data
              </h2>
              <div className="space-y-4">
                <Card variant="outlined">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Total Return</span>
                      <span className="text-2xl font-mono font-semibold text-success-400">
                        +8.5%
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card variant="outlined">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Active Strategies</span>
                      <span className="text-2xl font-mono font-semibold text-text-primary">
                        12
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card variant="outlined">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Today's Volume</span>
                      <span className="text-2xl font-mono font-semibold text-primary-400">
                        $1.2M
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <Card variant="elevated">
                <CardHeader title="Performance Chart" />
                <CardContent>
                  <div className="h-64 bg-background-tertiary rounded-lg flex items-center justify-center">
                    <span className="text-text-tertiary">Chart Placeholder</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-background-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Start Your Quantitative Trading Journey
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Register now and experience AI-driven intelligent trading strategies
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="/dashboard">
              <Button variant="primary" size="xl">
                Get Started Free
              </Button>
            </a>
            <a href="/grid">
              <Button variant="ghost" size="xl">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
                Noise Grid
              </div>
              <p className="text-text-secondary">
                AI-powered quantitative arbitrage platform
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Products</h3>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#" className="hover:text-primary-400">Smart Grid</a></li>
                <li><a href="#" className="hover:text-primary-400">Cross-Exchange Arbitrage</a></li>
                <li><a href="#" className="hover:text-primary-400">AI Assistant</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Resources</h3>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#" className="hover:text-primary-400">Documentation</a></li>
                <li><a href="#" className="hover:text-primary-400">API</a></li>
                <li><a href="#" className="hover:text-primary-400">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Contact Us</h3>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#" className="hover:text-primary-400">Twitter</a></li>
                <li><a href="#" className="hover:text-primary-400">Discord</a></li>
                <li><a href="#" className="hover:text-primary-400">Telegram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border-primary mt-8 pt-8 text-center text-text-tertiary">
            <p>&copy; 2025 Noise Grid. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
