import type { HeroSection } from "@/lib/schemas";

interface HeroSectionProps {
    section: HeroSection;
}

export default function HeroSection({ section }: HeroSectionProps) {
    const { heading, subheading, backgroundImage } = section;

    return (
        <section
            className="relative flex min-h-[400px] items-center justify-center px-6 py-20"
            style={
                backgroundImage
                    ? {
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }
                    : undefined
            }
        >
            {backgroundImage && (
                <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
            )}
            <div className="relative z-10 max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                    {heading}
                </h1>
                {subheading && (
                    <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                        {subheading}
                    </p>
                )}
            </div>
        </section>
    );
}
