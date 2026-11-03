import React, { useState } from 'react';
import {
  Calendar,
  Layers,
  Sparkles,
  PieChart,
  Table,
} from 'lucide-react';
import { PharmaSectorData, PharmaTicker, PharmaStock } from '../../types/pharma';

interface PharmaSectorWorkspaceProps {
  data: PharmaSectorData;
  activeTicker: PharmaTicker;
  onSelectTicker: (t: PharmaTicker) => void;
}

export const PharmaSectorWorkspace: React.FC<PharmaSectorWorkspaceProps> = ({
  data,
  activeTicker,
  onSelectTicker,
}) => {
  const [activeTab, setActiveTab] = useState<'categories' | 'table' | 'fda' | 'matrix'>('categories');
  const stocksList = Object.values(data.stocks);

  const categories = [
    { id: 'GLP1_OBESITY', name: '비만 & 대사질환 (GLP-1 TAM)', tickers: ['LLY', 'NVO'] },
    { id: 'IMMUNO_ONCOLOGY', name: '면역항암 & 종양학', tickers: ['MRK', 'AZN', 'GILD'] },
    { id: 'VACCINE_PLATFORM', name: '백신 & mRNA 플랫폼', tickers: ['MRNA', 'PFE'] },
    { id: 'DIVERSIFIED_BIG', name: '전통 빅파마 & 특수제약', tickers: ['JNJ', 'ABBV', 'AMGN'] },
  ];

  const scrollToSection = (tabId: 'categories' | 'table' | 'fda' | 'matrix', domId: string) => {
    setActiveTab(tabId);
    const el = document.getElementById(domId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm mb-8 space-y-8">
      {/* Workspace Header & Quick Jump Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              Sector Workspace
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              풀스크롤 인텔리전스 팩트시트
            </span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            제약/바이오 섹터 심층 전술 분석실
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
            4대 세부 테마별 밸류에이션, 전 파이프라인 특허 주기, FDA PDUFA 타임라인 일괄 점검 (스크롤하여 전체 열람)
          </p>
        </div>

        {/* Quick Jump Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl self-start md:self-auto overflow-x-auto max-w-full shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('categories', 'sec-pharma-categories')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'categories'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-rose-500" />
            4대 테마별 분류
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('table', 'sec-pharma-table')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'table'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Table className="w-3.5 h-3.5 text-sky-500" />
            10개사 전수 매트릭스
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('fda', 'sec-pharma-fda')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'fda'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            FDA 캘린더 & 임상
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('matrix', 'sec-pharma-matrix')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <PieChart className="w-3.5 h-3.5 text-purple-500" />
            특허 절벽 & 방어 전략
          </button>
        </div>
      </div>

      {/* Section 1: 4 Sub-themes Grid */}
      <section id="sec-pharma-categories" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
              <Layers className="w-4 h-4" />
            </span>
            1. 글로벌 제약/바이오 4대 세부 테마 & 핵심 파이프라인
          </h3>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            비만 · 면역항암 · mRNA · 전통 빅파마
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-700">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  {cat.name}
                </h4>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {cat.tickers.length}개 대표주
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cat.tickers.map((ticker) => {
                  const st = data.stocks[ticker as PharmaTicker];
                  const isSelected = activeTicker === ticker;
                  return (
                    <div
                      key={ticker}
                      onClick={() => onSelectTicker(ticker as PharmaTicker)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-white dark:bg-zinc-900 shadow-xs'
                          : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white/60 dark:bg-zinc-900/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">{st.name}</span>
                        <span className="text-[10px] font-mono font-bold text-zinc-500">{st.ticker}</span>
                      </div>
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium truncate">
                        {st.leadDrug}
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                        <span>Fwd P/E {st.forwardPE > 0 ? `${st.forwardPE}x` : '흑자전환'}</span>
                        <span>배당 {st.dividendYield}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: 10-Stock Full Comparison Table */}
      <section id="sec-pharma-table" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
              <Table className="w-4 h-4" />
            </span>
            2. 제약 10대 빅파마 유니버스 종합 비교 매트릭스
          </h3>
          <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold">
            Blockbuster Drugs & Patent Cliff
          </span>
        </div>

        <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-3 font-semibold">종목 (티커)</th>
                <th className="p-3 font-semibold">세부 테마</th>
                <th className="p-3 font-semibold">시가총액</th>
                <th className="p-3 font-semibold">Fwd P/E</th>
                <th className="p-3 font-semibold">배당수익률</th>
                <th className="p-3 font-semibold">대표 약물 (연매출)</th>
                <th className="p-3 font-semibold">주요 특허 만료</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {stocksList.map((st: PharmaStock) => (
                <tr 
                  key={st.ticker}
                  onClick={() => onSelectTicker(st.ticker)}
                  className={`cursor-pointer transition-colors ${
                    activeTicker === st.ticker
                      ? 'bg-rose-50/50 dark:bg-rose-950/20'
                      : 'hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.brandColor }} />
                    {st.name} ({st.ticker})
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px]">
                      {st.categoryLabel}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-medium text-zinc-800 dark:text-zinc-200">{st.marketCap}</td>
                  <td className="p-3 font-mono text-zinc-700 dark:text-zinc-300">
                    {st.forwardPE > 0 ? `${st.forwardPE}x` : 'N/A'}
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {st.dividendYield > 0 ? `${st.dividendYield}%` : '-'}
                  </td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">
                    {st.leadDrug} ({st.blockbusterRevenue})
                  </td>
                  <td className="p-3 font-mono text-rose-600 dark:text-rose-400 font-medium">
                    {st.patentCliffYear}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: FDA Calendar & Clinical Trials */}
      <section id="sec-pharma-fda" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Calendar className="w-4 h-4" />
            </span>
            3. FDA PDUFA 타임라인 & 핵심 임상(Phase 3) 캘린더
          </h3>
          <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
            PDUFA Target Action Dates
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.fdaEvents.map((evt, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                    {evt.date}
                  </span>
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                    {evt.ticker}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  {evt.phase}
                </span>
              </div>
              <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
                {evt.drug}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {evt.indication}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <strong>PDUFA(처방약 사용자 수수료법) 목표일</strong>은 FDA가 신약 허가 심사를 완료해야 하는 법정 시한으로, 해당 날짜 전후로 주가 변동성이 극대화됩니다.
        </div>
      </section>

      {/* Section 4: Patent Cliff & Defenses */}
      <section id="sec-pharma-matrix" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <PieChart className="w-4 h-4" />
            </span>
            4. 특허 절벽(Patent Cliff) 방어 전술 & GLP-1 비만치료제 TAM 팽창
          </h3>
          <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
            LOE Defense & GLP-1 Explosion
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              특허 절벽(Patent Cliff) 방어 3대 전술
            </h4>
            <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
              <li><strong>1. 피하주사(SC) 제형 전환</strong>: 머크(키트루다 SC), 존슨앤드존슨(다잘렉스 파스프로) 등 병원 방문 없이 자가 투여 가능한 SC 특허로 독점 기간 10년 이상 연장.</li>
              <li><strong>2. 복합제(Fixed-Dose Combination)</strong>: 단일제 만료 전 차세대 기전과 결합하여 환자 전환 유도(길리어드 빅타비/레나카파비르).</li>
              <li><strong>3. 차세대 ADC 및 세포치료제 M&A</strong>: 화이자(시젠 인수), 애브비(이뮤노젠 인수)처럼 막대한 현금흐름으로 즉시 상용화 가능한 차세대 항암 자산 흡수.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-500" />
              비만치료제(GLP-1) 1,300억 달러 TAM 팽창
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              일라이 릴리(Zepbound)와 노보 노디스크(Wegovy)의 GLP-1 약물은 단순 체중 감량을 넘어 심혈관 질환 위험 20% 감소, 수면무호흡증 완화, 알츠하이머 인지 개선 가능성까지 입증하며 보험 급여권(Medicare) 진입이 가속화되고 있습니다. 암젠의 차세대 월 1회 주사제(MariTide)와 릴리의 경구용 알약(오르포글리프론)이 차세대 격전지가 될 전망입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};