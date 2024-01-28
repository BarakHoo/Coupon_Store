import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./AuthSlice";

export const authStore = configureStore({
    reducer: authSlice.reducer
});


export type RootState = ReturnType<typeof authStore.getState>
export type AppDispatch = typeof authStore.dispatch;
