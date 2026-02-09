import type { CTASection } from "@/lib/schemas";

interface CTASectionProps {
    section: CTASection;
}

export default function CTASection({ section }: CTASectionProps) {
    const { label, url, variant } = section;

    const baseStyles =
        "inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

    const variantStyles =
        variant === "primary"
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80";

    return (
        <section className="flex items-center justify-center px-6 py-12">
            <a
                href={url}
                className={`${baseStyles} ${variantStyles}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {label}
            </a>
        </section>
    );
}
