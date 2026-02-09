import { z } from "zod";

// Base section schema with common fields
const BaseSectionSchema = z.object({
    id: z.string(),
    type: z.string(),
});

// Hero section schema
export const HeroSectionSchema = BaseSectionSchema.extend({
    type: z.literal("hero"),
    heading: z.string(),
    subheading: z.string().optional(),
    backgroundImage: z.string().url().optional(),
});

// CTA section schema
export const CTASectionSchema = BaseSectionSchema.extend({
    type: z.literal("cta"),
    label: z.string(),
    url: z.string().url(),
    variant: z.enum(["primary", "secondary"]).default("primary"),
});

// Feature Item schema (nested in Feature Grid)
export const FeatureItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
});

// Feature Grid section schema
export const FeatureGridSectionSchema = BaseSectionSchema.extend({
    type: z.literal("featureGrid"),
    title: z.string(),
    subtitle: z.string().optional(),
    features: z.array(FeatureItemSchema).min(1).max(6),
});

// Testimonial section schema
export const TestimonialSectionSchema = BaseSectionSchema.extend({
    type: z.literal("testimonial"),
    quote: z.string(),
    author: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    avatar: z.string().url().optional(),
});

// Discriminated union for all section types
export const SectionSchema = z.discriminatedUnion("type", [
    HeroSectionSchema,
    CTASectionSchema,
    FeatureGridSectionSchema,
    TestimonialSectionSchema,
]);

// Page schema
export const PageSchema = z.object({
    slug: z.string(),
    title: z.string(),
    sections: z.array(SectionSchema),
    publishedAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

// Inferred types for use in components
export type HeroSection = z.infer<typeof HeroSectionSchema>;
export type CTASection = z.infer<typeof CTASectionSchema>;
export type FeatureItem = z.infer<typeof FeatureItemSchema>;
export type FeatureGridSection = z.infer<typeof FeatureGridSectionSchema>;
export type TestimonialSection = z.infer<typeof TestimonialSectionSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Page = z.infer<typeof PageSchema>;
