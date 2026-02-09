import type { FeatureGridSection } from "@/lib/schemas";
import * as Icons from "lucide-react";

interface FeatureGridSectionProps {
    section: FeatureGridSection;
}

export default function FeatureGridSection({ section }: FeatureGridSectionProps) {
    const { title, subtitle, features } = section;

    return (
        <section className="px-6 py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Features Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        // Dynamically get icon from lucide-react
                        const IconComponent = feature.icon
                            ? (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[feature.icon] || Icons.Circle
                            : Icons.Circle;

                        return (
                            <div
                                key={feature.id}
                                className="group rounded-lg border bg-card p-6 transition-colors hover:border-primary"
                            >
                                {/* Icon */}
                                {IconComponent && (
                                    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                                        <IconComponent className="h-6 w-6 text-primary" />
                                    </div>
                                )}

                                {/* Content */}
                                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
