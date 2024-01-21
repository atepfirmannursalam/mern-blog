import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

// combine reducer
const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  Storage,
  version: 1,
};

// root reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
