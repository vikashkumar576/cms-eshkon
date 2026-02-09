import { FeatureGridSection } from "@/lib/schemas";
import { LucideIcon, icons } from "lucide-react";

export function FeatureGrid({ data }: { data: FeatureGridSection }) {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h2>
                    {data.subtitle && (
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {data.subtitle}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.features.map((feature) => {
                        const IconComponent = feature.icon && (icons as any)[feature.icon]
                            ? (icons as any)[feature.icon] as LucideIcon
                            : null;

                        return (
                            <div key={feature.id} className="flex flex-col items-start p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                                {IconComponent && (
                                    <div className="mb-4 p-2 rounded-full bg-primary/10 text-primary">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                )}
                                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
