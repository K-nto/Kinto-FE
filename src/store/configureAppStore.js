import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { filesReducer } from "./files/files.reducer";
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from "./middleware/logger";

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: filesReducer,
    middleware: [loggerMiddleware, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [monitorReducerEnhancer],
  });

  return store;
}
