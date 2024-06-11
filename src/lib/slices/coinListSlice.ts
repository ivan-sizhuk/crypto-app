import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CoinData } from "@/utilities/CoinDataInterface";

export const formatNumber = (num: any) => {
  const parsedNum = typeof num === "string" ? parseFloat(num) : num;

  if (!isNaN(parsedNum)) {
    if (parsedNum >= 1e9) {
      return `${(parsedNum / 1e9).toFixed(1)}B`;
    } else if (parsedNum >= 1e6) {
      return `${(parsedNum / 1e6).toFixed(1)}M`;
    } else if (parsedNum >= 1e3) {
      return `${(parsedNum / 1e3).toFixed(1)}K`;
    } else {
      return `${parsedNum}`;
    }
  } else {
    return "Invalid number";
  }
};

const formatPercentageChangeClass = (value: number) => {
  return value > 0 ? "text-green-500" : "text-red-500";
};

export const fetchCoinData = createAsyncThunk<CoinData[], number | undefined>(
  "coinData/fetchCoinData",
  async (perPage, thunkAPI) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=CG-ngyTBAk7Rz4RzH3a3JZW63Zo`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: CoinData[] = await response.json();
      const updatedData = data.map((coin) => {
        const class1h = formatPercentageChangeClass(coin.price_change_percentage_1h_in_currency);
        const class24h = formatPercentageChangeClass(coin.price_change_percentage_24h_in_currency);
        const class7d = formatPercentageChangeClass(coin.price_change_percentage_7d_in_currency);

        return {
          ...coin,
          market_cap: formatNumber(coin.market_cap),
          total_volume: formatNumber(coin.total_volume),
          circulating_supply: formatNumber(parseFloat(coin.circulating_supply)),
          total_supply: formatNumber(parseFloat(coin.total_supply)),
          symbol: coin.symbol.toUpperCase(),
          price_change_percentage_1h_in_currency_class: class1h,
          price_change_percentage_1h_in_currency: coin.price_change_percentage_1h_in_currency.toFixed(1),
          price_change_percentage_24h_in_currency_class: class24h,
          price_change_percentage_24h_in_currency: coin.price_change_percentage_24h_in_currency.toFixed(1),
          price_change_percentage_7d_in_currency_class: class7d,
          price_change_percentage_7d_in_currency: coin.price_change_percentage_7d_in_currency.toFixed(1),
        };
      });

      return updatedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "An error occurred");
    }
  }
);

interface CoinDataState {
  cryptoData: CoinData[];
  loading: boolean;
  error: string | null;
}
const initialState: CoinDataState = {
  cryptoData: [],
  loading: false,
  error: null,
};

export const coinDataSlice = createSlice({
  name: "coinData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinData.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptoData = action.payload;
      })
      .addCase(fetchCoinData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default coinDataSlice.reducer;
