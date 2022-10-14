import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { filesReducer } from "./files/files.reducer";
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from "./middleware/logger";
import { appReducer } from "./app/app.reducer";
import { userReducer } from "./user/user.reducer";
import { nodesReducer } from "./nodes/nodes.reducer";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  files: filesReducer,
  nodes: nodesReducer,
});

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [loggerMiddleware, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [monitorReducerEnhancer],
  });

  return store;
}
