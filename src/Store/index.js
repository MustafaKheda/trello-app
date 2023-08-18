import thunk from "redux-thunk";
import { reducer } from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "persist-store",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
export default store;
