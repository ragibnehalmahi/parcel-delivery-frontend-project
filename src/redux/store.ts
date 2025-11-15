import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
// import { baseApi } from "./baseApi";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"], // persist only auth slice
// };

// const persistedReducer = persistReducer(persistConfig, baseApi.reducer);

// export const store = configureStore({
//   reducer: {
//     [baseApi.reducerPath]: persistedReducer,
//   },
//   middleware: (getDefault) => getDefault().concat(baseApi.middleware),
// });

// export const persistor = persistStore(store);
