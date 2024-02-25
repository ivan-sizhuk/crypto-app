import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CoinData {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number;
  market_cap_rank: number;
}

export const fetchCoinData = createAsyncThunk<CoinData[], void, {}>("coinData/fetchCoinData", async (_, thunkAPI) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "An error occurred");
  }
});

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
