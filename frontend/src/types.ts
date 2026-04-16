export interface Market {
  id: string;
  question: string;
  category: string;
  yes_price: number;
  no_price: number;
  volume: number;
  liquidity: number;
  image?: string;
  active?: boolean;
}

export interface Position {
  id: number;
  market_id: string;
  market_question: string;
  side: string;
  entry_price: number;
  size: number;
  pnl: number;
  is_open: boolean;
}

export interface User {
  address: string;
  balance: number;
  positions: Position[];
  total_pnl: number;
}
