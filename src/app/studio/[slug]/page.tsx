"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
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
} from "@/store/draftPageSlice";
import { getPageBySlug } from "@/lib/contentfulClient";
import { renderSection } from "@/lib/sectionRegistry";
import { useParams } from "next/navigation";
import { Save, Eye, AlertCircle } from "lucide-react";
import { UserInfo } from "@/components/UserInfo";

/**
 * @file StudioPage.tsx
 * @description
 * This component represents the "Studio" or "Editor" interface.
 * It allows authorized users to edit page content in a draft state before publishing.
 *
 * NOTE: This is a prototype and currently functional for demonstration purposes.
 * It uses a local Redux store to manage draft state, which means changes are
 * currently lost on refresh unless persisted to a backend (not implemented).
 */

export default function StudioPage() {
    const params = useParams();
    const slug = params.slug as string;

    // Redux hooks for state management
    const dispatch = useAppDispatch();
    const page = useAppSelector((state) => state.draftPage.page);
    const isDirty = useAppSelector((state) => state.draftPage.isDirty);
    const isLoading = useAppSelector((state) => state.draftPage.isLoading);
    const error = useAppSelector((state) => state.draftPage.error);

    /**
     * Effect: Load Page Data
     * Fetches the page content from Contentful (Preview API) when the component mounts
     * or when the slug changes.
     */
    useEffect(() => {
        // Load page from CMS on mount if not already in state
        if (!page || page.slug !== slug) {
            dispatch(setLoading(true));
            // Use preview: true to fetch draft content
            getPageBySlug(slug, { preview: true })
                .then((fetchedPage) => {
                    if (fetchedPage) {
                        dispatch(setPage(fetchedPage));
                    } else {
                        dispatch(setError("Page not found"));
                    }
                })
                .catch((err) => {
                    dispatch(setError(err.message || "Failed to load page"));
                });
        }
    }, [slug, page, dispatch]);

    // Loading State
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="text-muted-foreground">Loading page...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
                    <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
                    <h2 className="mb-2 text-lg font-semibold">Error Loading Page</h2>
                    <p className="text-sm text-muted-foreground">{error}</p>
                </div>
            </div>
        );
    }

    // Empty State
    if (!page) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-muted-foreground">No page data</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30">
            {/* 
              Header
              Contains the page title, status indicators, and actions (Preview, User Profile).
            */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div>
                        <h1 className="text-lg font-semibold">Studio Editor</h1>
                        <p className="text-sm text-muted-foreground">{page.title}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {isDirty && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                                <Save className="h-3 w-3" />
                                Unsaved changes
                            </span>
                        )}
                        <button
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label="Preview changes"
                        >
                            <Eye className="h-4 w-4" />
                            Preview
                        </button>
                        <UserInfo />
                    </div>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-2">
                {/* 
                  Editor Panel (Left Column)
                  Displays a form for each section to edit its properties.
                  The form fields dispatch Redux actions to update the local draft state.
                */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Edit Sections</h2>
                    {page.sections.map((section) => (
                        <div key={section.id} className="rounded-lg border bg-card p-4 shadow-sm">
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-sm font-medium text-muted-foreground">
                                    {section.type.toUpperCase()}
                                </p>
                            </div>

                            {/* Hero Section Editing */}
                            {section.type === "hero" && (
                                <div className="space-y-3">
                                    <div>
                                        <label htmlFor={`hero-heading-${section.id}`} className="mb-1 block text-sm font-medium">
                                            Heading
                                        </label>
                                        <input
                                            id={`hero-heading-${section.id}`}
                                            type="text"
                                            value={section.heading}
                                            onChange={(e) => dispatch(updateHeroHeading({ id: section.id, heading: e.target.value }))}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`hero-subheading-${section.id}`} className="mb-1 block text-sm font-medium">
                                            Subheading
                                        </label>
                                        <input
                                            id={`hero-subheading-${section.id}`}
                                            type="text"
                                            value={section.subheading || ""}
                                            onChange={(e) => dispatch(updateHeroSubheading({ id: section.id, subheading: e.target.value }))}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* CTA Section Editing */}
                            {section.type === "cta" && (
                                <div className="space-y-3">
                                    <div>
                                        <label htmlFor={`cta-label-${section.id}`} className="mb-1 block text-sm font-medium">
                                            Button Label
                                        </label>
                                        <input
                                            id={`cta-label-${section.id}`}
                                            type="text"
                                            value={section.label}
                                            onChange={(e) => dispatch(updateCTALabel({ id: section.id, label: e.target.value }))}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`cta-url-${section.id}`} className="mb-1 block text-sm font-medium">
                                            URL
                                        </label>
                                        <input
                                            id={`cta-url-${section.id}`}
                                            type="url"
                                            value={section.url}
                                            onChange={(e) => dispatch(updateCTAUrl({ id: section.id, url: e.target.value }))}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Feature Grid Section Editing */}
                            {section.type === "featureGrid" && (
                                <div className="space-y-3">
                                    <div>
                                        <label htmlFor={`grid-title-${section.id}`} className="mb-1 block text-sm font-medium">
                                            Title
                                        </label>
                                        <input
                                            id={`grid-title-${section.id}`}
                                            type="text"
                                            value={section.title}
                                            onChange={(e) => dispatch(updateFeatureGridTitle({ id: section.id, title: e.target.value }))}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`grid-subtitle-${section.id}`} className="mb-1 block text-sm font-medium">
                                            Subtitle
                                        </label>
                                        <textarea
                                            id={`grid-subtitle-${section.id}`}
                                            value={section.subtitle || ""}
                                            onChange={(e) => dispatch(updateFeatureGridSubtitle({ id: section.id, subtitle: e.target.value }))}
                                            rows={2}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Feature items are managed in Contentful
                                    </p>
                                </div>
                            )}

                            {/* Testimonial Section Editing */}
                            {section.type === "testimonial" && (
                                <div className="space-y-3">
                                    <div>
                                        <label htmlFor={`testimonial-quote-${section.id}`} className="mb-1 block text-sm font-medium">
                                            Quote
                                        </label>
                                        <textarea
                                            id={`testimonial-quote-${section.id}`}
                                            value={section.quote}
                                            onChange={(e) => dispatch(updateTestimonialQuote({ id: section.id, quote: e.target.value }))}
                                            rows={3}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`testimonial-author-${section.id}`} className="mb-1 block text-sm font-medium">
                                            Author
                                        </label>
                                        <input
                                            id={`testimonial-author-${section.id}`}
                                            type="text"
                                            value={section.author}
                                            onChange={(e) => dispatch(updateTestimonialAuthor({ id: section.id, author: e.target.value }))}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Role, company, and avatar managed in Contentful
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 
                  Live Preview Panel (Right Column)
                  Renders the sections using the same render logic as the main site,
                  allowing users to see their changes instantly.
                */}
                <div className="lg:sticky lg:top-24 lg:h-fit">
                    <div className="mb-4 flex items-center gap-2">
                        <Eye className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-xl font-semibold">Live Preview</h2>
                    </div>
                    <div className="overflow-hidden rounded-lg border bg-background shadow-lg">
                        {page.sections.map(renderSection)}
                    </div>
                </div>
            </div>
        </div>
    );
}
