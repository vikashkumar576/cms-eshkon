import Link from "next/link";
import { cn } from "@/lib/utils";
import { CTASection } from "@/lib/schemas";

export function CTA({ data }: { data: CTASection }) {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4">
                    <Link
                        href={data.url}
                        className={cn(
                            "inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                            data.variant === "secondary"
                                ? "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"
                                : "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                        )}
                    >
                        {data.label}
                    </Link>
                </div>
            </div>
        </section>
    );
}
