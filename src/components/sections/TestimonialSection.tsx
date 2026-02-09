import type { TestimonialSection } from "@/lib/schemas";
import { Quote } from "lucide-react";

interface TestimonialSectionProps {
    section: TestimonialSection;
}

export default function TestimonialSection({ section }: TestimonialSectionProps) {
    const { quote, author, role, company, avatar } = section;

    return (
        <section className="bg-muted/30 px-6 py-16 md:py-24">
            <div className="mx-auto max-w-4xl">
                <div className="relative rounded-2xl border bg-card p-8 shadow-sm md:p-12">
                    {/* Quote Icon */}
                    <div className="mb-6 inline-flex rounded-full bg-primary/10 p-3">
                        <Quote className="h-8 w-8 text-primary" />
                    </div>

                    {/* Quote Text */}
                    <blockquote className="mb-8 text-xl font-medium leading-relaxed md:text-2xl">
                        &ldquo;{quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                        {avatar && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={avatar}
                                alt={author}
                                className="h-12 w-12 rounded-full object-cover"
                            />
                        )}
                        <div>
                            <div className="font-semibold">{author}</div>
                            {(role || company) && (
                                <div className="text-sm text-muted-foreground">
                                    {role}
                                    {role && company && " at "}
                                    {company}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
