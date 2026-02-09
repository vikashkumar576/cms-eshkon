import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
    isSidebarOpen: boolean;
    activeModal: "none" | "save" | "error";
    toast: {
        message: string;
        type: "success" | "error" | "info";
    } | null;
}

const initialState: UIState = {
    isSidebarOpen: true,
    activeModal: "none",
    toast: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        openModal(state, action: PayloadAction<UIState["activeModal"]>) {
            state.activeModal = action.payload;
        },
        closeModal(state) {
            state.activeModal = "none";
        },
        showToast(state, action: PayloadAction<NonNullable<UIState["toast"]>>) {
            state.toast = action.payload;
        },
        hideToast(state) {
            state.toast = null;
        },
    },
});

export const { toggleSidebar, openModal, closeModal, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
