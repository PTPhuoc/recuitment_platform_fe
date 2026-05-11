import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/store/slices/authSlice"
import webReducer from "@/app/store/slices/webSlice"
import adminReducer from "@/app/store/slices/adminSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            web: webReducer,
            admin: adminReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];