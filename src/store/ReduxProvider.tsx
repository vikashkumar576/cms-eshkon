"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Load draft from localStorage on mount
        const savedDraft = localStorage.getItem("cms-draft");
        if (savedDraft) {
            try {
                const draft = JSON.parse(savedDraft);
                store.dispatch({ type: "draftPage/setPage", payload: draft });
            } catch (error) {
                console.error("Failed to load draft from localStorage:", error);
            }
        }

        // Save draft to localStorage on state changes
        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            if (state.draftPage.page) {
                localStorage.setItem("cms-draft", JSON.stringify(state.draftPage.page));
            }
        });

        return () => unsubscribe();
    }, []);

    return <Provider store={store}>{children}</Provider>;
}
