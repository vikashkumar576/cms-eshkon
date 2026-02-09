import { configureStore } from "@reduxjs/toolkit";
import draftPageReducer from "./draftPageSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
    reducer: {
        draftPage: draftPageReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
