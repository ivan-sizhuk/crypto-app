export interface CoinData {
  id: string;
  symbol: string;
  image: string;
  thumb: string;
  name: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: any;
  circulating_supply: any;
  total_supply: any;
  market_cap_rank: any;
  market_cap: any;
  description: {
    en: string; // Add description.en field
  };
  market_data: {
    current_price: { usd: string };
  };
}
