import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts";

const appStore = configureStore({
    reducer: {
        user: userReducer,
    }
});

export default appStore;