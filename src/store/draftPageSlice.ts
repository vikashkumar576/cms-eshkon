import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Page } from "@/lib/schemas";

/**
 * @file draftPageSlice.ts
 * @description
 * Redux slice for managing the state of the page currently being edited in the Studio.
 *
 * This slice acts as a client-side buffer for changes. It allows for instant UI updates
 * (optimistic UI) while editing, before changes are saved back to the CMS (not implemented in prototype).
 */

interface DraftPageState {
    page: Page | null;
    isDirty: boolean;   // Tracks if there are unsaved changes
    isLoading: boolean; // Tracks fetching state
    error: string | null;
}

const initialState: DraftPageState = {
    page: null,
    isDirty: false,
    isLoading: false,
    error: null,
};

const draftPageSlice = createSlice({
    name: "draftPage",
    initialState,
    reducers: {
        // ==========================================
        // General Page Actions
        // ==========================================
        setPage(state, action: PayloadAction<Page>) {
            state.page = action.payload;
            // distinct from 'loading' state, this just sets data
            state.isDirty = false;
            state.isLoading = false;
            state.error = null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isLoading = false;
        },

        // ==========================================
        // Section Field Updates
        // ==========================================
        // These reducers identify a section by ID and update specific fields.
        // They also set the `isDirty` flag to true to indicate unsaved changes.

        // Hero Section
        updateHeroHeading(state, action: PayloadAction<{ id: string; heading: string }>) {
            if (!state.page) return;
            const section = state.page.sections.find((s) => s.id === action.payload.id);
            if (section && section.type === "hero") {
                section.heading = action.payload.heading;
                state.isDirty = true;
            }
        },
        updateHeroSubheading(state, action: PayloadAction<{ id: string; subheading: string }>) {
            if (!state.page) return;
            const section = state.page.sections.find((s) => s.id === action.payload.id);
            if (section && section.type === "hero") {
                section.subheading = action.payload.subheading;
                state.isDirty = true;
            }
        },

        // CTA Section
        updateCTALabel(state, action: PayloadAction<{ id: string; label: string }>) {
            if (!state.page) return;
            const section = state.page.sections.find((s) => s.id === action.payload.id);
            if (section && section.type === "cta") {
                section.label = action.payload.label;
                state.isDirty = true;
            }
        },
        updateCTAUrl(state, action: PayloadAction<{ id: string; url: string }>) {
            if (!state.page) return;
            const section = state.page.sections.find((s) => s.id === action.payload.id);
            if (section && section.type === "cta") {
                section.url = action.payload.url;
                state.isDirty = true;
            }
        },

        // Feature Grid Section
        updateFeatureGridTitle(state, action: PayloadAction<{ id: string; title: string }>) {
            if (!state.page) return;
            const section = state.page.sections.find((s) => s.id === action.payload.id);
            if (section && section.type === "featureGrid") {
                section.title = action.payload.title;
                state.isDirty = true;
            }
        },
        updateFeatureGridSubtitle(state, action: PayloadAction<{ id: string; subtitle: string }>) {
            if (!state.page) return;
            const section = state.page.sections.find((s) => s.id === action.payload.id);
            if (section && section.type === "featureGrid") {
                section.subtitle = action.payload.subtitle;
                state.isDirty = true;
            }
        },

        // Testimonial Section
        updateTestimonialQuote(state, action: PayloadAction<{ id: string; quote: string }>) {
            if (!state.page) return;
            const section = state.page.sections.find((s) => s.id === action.payload.id);
            if (section && section.type === "testimonial") {
                section.quote = action.payload.quote;
                state.isDirty = true;
            }
        },
        updateTestimonialAuthor(state, action: PayloadAction<{ id: string; author: string }>) {
            if (!state.page) return;
            const section = state.page.sections.find((s) => s.id === action.payload.id);
            if (section && section.type === "testimonial") {
                section.author = action.payload.author;
                state.isDirty = true;
            }
        },

        resetDraft(state) {
            state.isDirty = false;
        },
    },
});

export const {
    setPage,
    setLoading,
    setError,
    updateHeroHeading,
    updateHeroSubheading,
    updateCTALabel,
    updateCTAUrl,
    updateFeatureGridTitle,
    updateFeatureGridSubtitle,
    updateTestimonialQuote,
    updateTestimonialAuthor,
    resetDraft,
} = draftPageSlice.actions;

export default draftPageSlice.reducer;
