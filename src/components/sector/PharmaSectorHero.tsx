import React, { useRef, useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Sparkles,
  Zap,
  ShieldAlert,
} from 'lucide-react';
import { PharmaSectorData, PharmaTicker } from '../../types/pharma';

interface PharmaSectorHeroProps {
  data: PharmaSectorData;
  activeTicker: PharmaTicker;
  onSelectTicker: (t: PharmaTicker) => void;
}

export const PharmaSectorHero: React.FC<PharmaSectorHeroProps> = ({
  data,
  activeTicker,
  onSelectTicker,
}) => {
  const { stocks, totalUniverseMarketCap, sectorAverageYield, macroIndicators } = data;
  const current = stocks[activeTicker];

  const prevPriceRef = useRef<number>(current.currentPrice);
  const [glow, setGlow] = useState<'UP' | 'DOWN' | null>(null);

  useEffect(() => {
    if (prevPriceRef.current !== current.currentPrice && prevPriceRef.current > 0) {
      setGlow(current.currentPrice > prevPriceRef.current ? 'UP' : 'DOWN');
      const timer = setTimeout(() => setGlow(null), 1200);
      prevPriceRef.current = current.currentPrice;
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = current.currentPrice;
  }, [current.currentPrice]);

  return (
    <div className="fintech-card p-4 sm:p-6 space-y-6">
      {/* 1. Header Info & Sector Macro Ticker */}
      <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
              <Activity className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
              글로벌 제약/바이오 10대 핵심 유니버스
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
            <span>유니버스 합산 시총</span>
            <span className="font-bold text-slate-800 dark:text-zinc-200">{totalUniverseMarketCap}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-mono">
              섹터 평균 배당률 {sectorAverageYield}%
            </span>
          </div>
        </div>

        {/* Macro Sector Drivers Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {macroIndicators.map((macro, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200/60 dark:border-zinc-800 text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-zinc-200 mb-0.5">
                <span>{macro.name}</span>
                <span className={`text-[10px] px-1 rounded ${
                  macro.trend === 'UP' ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40' : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                }`}>
                  {macro.value}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                {macro.impactSummary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 10-Stock Interactive Sector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {(Object.keys(stocks) as PharmaTicker[]).map((ticker) => {
          const s = stocks[ticker];
          const isSelected = activeTicker === ticker;
          const isPos = s.changePercent >= 0;

          return (
            <button
              key={ticker}
              type="button"
              onClick={() => onSelectTicker(ticker)}
              className={`p-2.5 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/20 shadow-xs ring-1 ring-rose-500/30'
                  : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                  {s.ticker}
                </span>
                <span className="text-[9px] px-1 rounded font-medium bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 truncate max-w-[65px]">
                  {s.categoryLabel}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold font-mono text-slate-900 dark:text-zinc-100">
                  ${s.currentPrice}
                </span>
                <span className={`text-[10px] font-bold ${isPos ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isPos ? '+' : ''}{s.changePercent.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500 mt-1 pt-1 border-t border-slate-100 dark:border-zinc-800">
                <span>시총 {s.marketCap}</span>
                <span>{s.dividendYield > 0 ? `${s.dividendYield}% 배당` : '무배당'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Detailed Spotlight of Active Pharma Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: current.brandColor }} />
                <h3 className="text-xl font-black text-slate-900 dark:text-zinc-100">
                  {current.name}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 font-bold">
                  NYSE/NASDAQ: {current.ticker}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                {current.koreanName} · {current.categoryLabel}
              </p>
            </div>

            <div className={`p-2 rounded-xl transition-colors duration-700 ${
              glow === 'UP' ? 'bg-emerald-500/20' : glow === 'DOWN' ? 'bg-red-500/20' : 'bg-transparent'
            }`}>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono tracking-tight text-slate-900 dark:text-zinc-100">
                  ${current.currentPrice}
                </span>
                <span className={`text-sm font-bold flex items-center ${
                  current.change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {current.change >= 0 ? <TrendingUp className="w-4 h-4 mr-0.5" /> : <TrendingDown className="w-4 h-4 mr-0.5" />}
                  {current.change >= 0 ? '+' : ''}{current.change} ({current.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Lead Drug & Pipeline Status */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                대표 블록버스터 & 핵심 파이프라인
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200">
                주력 연매출: {current.blockbusterRevenue}
              </span>
            </div>
            <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
              {current.leadDrug}
            </p>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              {current.fdaPipelineStatus}
            </p>
          </div>

          {/* Key Catalysts Bullets */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              주요 주가 촉매 & 임상 일정 (Catalysts)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {current.catalysts.map((cat, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300 font-medium flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Valuation & Patent Cliff Side Panel */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-900/40 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              밸류에이션 & 특허 방어벽
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">시가총액</span>
                <span className="font-bold text-slate-900 dark:text-zinc-100 font-mono">{current.marketCap}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">12M 선행 P/E (Fwd P/E)</span>
                <span className="font-bold text-slate-900 dark:text-zinc-100 font-mono">
                  {current.forwardPE > 0 ? `${current.forwardPE}x` : '흑자전환 대기'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">배당수익률</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {current.dividendYield > 0 ? `${current.dividendYield}%` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">주요 특허 만료 시점</span>
                <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">{current.patentCliffYear}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800 text-[11px] text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>특허 만료(Patent Cliff) 전 SC 제형 및 차세대 복합제 전환 여부가 핵심입니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
