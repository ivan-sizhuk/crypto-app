import { configureStore } from "@reduxjs/toolkit";
import coinDataReducer from "../lib/slices/coinDataSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { coinData: coinDataReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
