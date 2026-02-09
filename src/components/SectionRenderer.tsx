import { Section } from "@/lib/schemas";
import { Hero } from "./sections/Hero";
import { CTA } from "./sections/CTA";
import { FeatureGrid } from "./sections/FeatureGrid";
import { Testimonial } from "./sections/Testimonial";

export function SectionRenderer({ sections }: { sections: Section[] }) {
    return (
        <div className="flex flex-col w-full">
            {sections.map((section) => {
                switch (section.type) {
                    case "hero":
                        return <Hero key={section.id} data={section} />;
                    case "cta":
                        return <CTA key={section.id} data={section} />;
                    case "featureGrid":
                        return <FeatureGrid key={section.id} data={section} />;
                    case "testimonial":
                        return <Testimonial key={section.id} data={section} />;
                    default:
                        console.warn(`Unknown section type: ${(section as any).type}`);
                        return null;
                }
            })}
        </div>
    );
}
