import { configureStore } from "@reduxjs/toolkit";
import coinDataReducer from "./slices/coinListSlice";
import { selectedCoinReducer, selectedCoinDataReducer } from "./slices/coinSlice";
import bitcoinChartReducer from "./slices/bitcoinChartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coinData: coinDataReducer,
      selectedCoinId: selectedCoinReducer,
      selectedCoinData: selectedCoinDataReducer,
      bitcoinChart: bitcoinChartReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
