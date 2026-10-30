export type PharmaCategory = 
  | 'GLP1_OBESITY'       // 비만/당뇨 (LLY, NVO)
  | 'IMMUNO_ONCOLOGY'    // 면역항암/종양학 (MRK, AZN, GILD)
  | 'VACCINE_PLATFORM'   // 차세대 백신/mRNA (MRNA, PFE)
  | 'DIVERSIFIED_BIG'    // 전통 빅파마/의료기기/특수의약품 (JNJ, ABBV, AMGN);

export type PharmaTicker = 
  | 'LLY' 
  | 'NVO' 
  | 'JNJ' 
  | 'GILD' 
  | 'MRNA' 
  | 'PFE' 
  | 'MRK' 
  | 'ABBV' 
  | 'AZN' 
  | 'AMGN';

export interface PharmaStock {
  ticker: PharmaTicker;
  name: string;
  koreanName: string;
  category: PharmaCategory;
  categoryLabel: string;
  brandColor: string;
  badgeBg: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  marketCap: string;
  marketCapVal: number; // in Billion USD
  trailingPE: number;
  forwardPE: number;
  dividendYield: number; // percentage e.g. 3.2%
  
  // Pipeline & Sector specific
  leadDrug: string; // e.g. "Mounjaro / Zepbound (Tirzepatide)"
  blockbusterRevenue: string; // e.g. "$16.5B"
  patentCliffYear: number | string; // e.g. 2036 or "2028 (Keytruda)"
  fdaPipelineStatus: string;
  catalysts: string[];
}

export interface SectorMacroIndicator {
  name: string;
  value: string;
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
  impactSummary: string;
}

export interface FdaCalendarEvent {
  date: string;
  ticker: PharmaTicker;
  drug: string;
  indication: string;
  phase: 'Phase 3 Data' | 'PDUFA Target' | 'AdCom Meeting' | 'EMA Approval';
  impact: 'High' | 'Medium';
}

export interface PharmaSectorData {
  asOfDate: string;
  totalUniverseMarketCap: string; // e.g. "$3.2T"
  sectorAverageYield: number; // e.g. 2.45%
  macroIndicators: SectorMacroIndicator[];
  fdaEvents: FdaCalendarEvent[];
  stocks: Record<PharmaTicker, PharmaStock>;
}
