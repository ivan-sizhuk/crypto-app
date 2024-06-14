import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface BitcoinChartDataState {
  prices: number[];
  volumes: number[];
  loading: boolean;
  error: string | null;
}

const initialState: BitcoinChartDataState = {
  prices: [],
  volumes: [],
  loading: false,
  error: null,
};

export const fetchBitcoinChartData = createAsyncThunk<
  { prices: number[]; volumes: number[] },
  void,
  { rejectValue: string }
>("bitcoinChart/fetchBitcoinChartData", async (_, thunkAPI) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    const prices = data.prices.map((price: [number, number]) => price[1]);
    const volumes = data.total_volumes.map((volume: [number, number]) => volume[1]);

    return { prices, volumes };
  } catch (error) {
    return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "An error occurred");
  }
});

const bitcoinChartSlice = createSlice({
  name: "bitcoinChart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBitcoinChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBitcoinChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload.prices;
        state.volumes = action.payload.volumes;
      })
      .addCase(fetchBitcoinChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default bitcoinChartSlice.reducer;
