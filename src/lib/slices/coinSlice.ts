import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CoinData } from "@/utilities/CoinDataInterface";
import { formatNumber } from "./coinListSlice";

export const fetchSelectedCoinData = createAsyncThunk<CoinData, string>(
  "selectedCoin/fetchSelectedCoinData",
  async (coinId: string, thunkAPI) => {
    try {
      console.log("successfully fetched coin:", coinId);
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: CoinData = await response.json();

      return {
        ...data,
        market_cap: formatNumber(data.market_cap),
        total_volume: formatNumber(data.total_volume),
        circulating_supply: formatNumber(parseFloat(data.circulating_supply)),
        total_supply: formatNumber(parseFloat(data.total_supply)),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "An error occurred");
    }
  }
);

interface SelectedCoinState {
  selectedCoinId: string | null;
  selectedCoinData: CoinData | null;
  loading: boolean;
  error: string | null;
  loadingInitialized: boolean; // Flag to indicate if initial loading is done
}

const initialState: SelectedCoinState = {
  selectedCoinId: null,
  selectedCoinData: null,
  loading: false,
  error: null,
  loadingInitialized: false, // Initialize as false
};

// Create slice for selected coin
export const selectedCoinSlice = createSlice({
  name: "selectedCoin",
  initialState,
  reducers: {
    setSelectedCoinId: (state, action) => {
      state.selectedCoinId = action.payload;
      localStorage.setItem("selectedCoinId", action.payload); // Update local storage
    },
    setLoadingInitialized: (state, action) => {
      state.loadingInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectedCoinData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedCoinData.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCoinData = action.payload;
      })
      .addCase(fetchSelectedCoinData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { setSelectedCoinId, setLoadingInitialized } = selectedCoinSlice.actions; // Export action creators
export const selectedCoinReducer = selectedCoinSlice.reducer; // Export reducer for selected coin ID
export const selectedCoinDataReducer = selectedCoinSlice.reducer; // Export reducer for selected coin data
export const loadingInitializedReducer = selectedCoinSlice.reducer;
