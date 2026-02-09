import type { Section } from "@/lib/schemas";
import HeroSection from "@/components/sections/HeroSection";
import CTASection from "@/components/sections/CTASection";
import FeatureGridSection from "@/components/sections/FeatureGridSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import UnsupportedSection from "@/components/sections/UnsupportedSection";

type SectionComponent = React.ComponentType<{ section: Section }>;

// Registry maps section type to React component
export const sectionRegistry: Record<string, SectionComponent> = {
    hero: HeroSection as SectionComponent,
    cta: CTASection as SectionComponent,
    featureGrid: FeatureGridSection as SectionComponent,
    testimonial: TestimonialSection as SectionComponent,
};

// Dynamically render section based on type
export function renderSection(section: Section) {
    const Component = sectionRegistry[section.type];

    if (!Component) {
        return <UnsupportedSection key={section.id} type={section.type} />;
    }

    return <Component key={section.id} section={section} />;
}
