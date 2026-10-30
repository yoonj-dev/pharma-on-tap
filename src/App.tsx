import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { PharmaSectorHero } from './components/sector/PharmaSectorHero';
import { PharmaSectorWorkspace } from './components/sector/PharmaSectorWorkspace';
import { TradingViewPharmaComparison } from './components/sector/TradingViewPharmaComparison';
import { Footer } from './components/layout/Footer';
import { Theme, getInitialTheme, applyThemeToDom, resolveTheme } from './lib/theme';
import { PharmaTicker } from './types/pharma';
import { INITIAL_PHARMA_DATA } from './data/pharmaData';

export const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<Theme>(getInitialTheme());
  const [pharmaData, setPharmaData] = useState(INITIAL_PHARMA_DATA);
  const [activeTicker, setActiveTicker] = useState<PharmaTicker>('LLY');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    applyThemeToDom(themeMode);
    setEffectiveTheme(resolveTheme(themeMode));

    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        applyThemeToDom('auto');
        setEffectiveTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [themeMode]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPharmaData((prev) => {
        const next = { ...prev };
        const randVariation = (Math.random() - 0.49) * 0.8;
        const current = next.stocks[activeTicker];
        const newPrice = Number((current.currentPrice + randVariation).toFixed(2));
        next.stocks[activeTicker] = {
          ...current,
          currentPrice: newPrice,
          change: Number((newPrice - (current.currentPrice - current.change)).toFixed(2)),
        };
        return next;
      });
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans transition-colors selection:bg-rose-500 selection:text-white">
      <Header 
        currentTheme={themeMode} 
        onThemeChanged={setThemeMode}
        stocks={pharmaData.stocks}
        activeTicker={activeTicker}
        onSelectTicker={setActiveTicker}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Sector Overview Hero & Spotlight */}
        <PharmaSectorHero 
          data={pharmaData}
          activeTicker={activeTicker}
          onSelectTicker={setActiveTicker}
        />

        {/* Deep Analysis Sector Workspace */}
        <PharmaSectorWorkspace 
          data={pharmaData}
          activeTicker={activeTicker}
          onSelectTicker={setActiveTicker}
        />

        {/* Normalized TradingView Comparison */}
        <TradingViewPharmaComparison theme={effectiveTheme} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
