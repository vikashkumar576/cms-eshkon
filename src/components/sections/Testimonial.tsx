import Image from "next/image";
import { TestimonialSection } from "@/lib/schemas";

export function Testimonial({ data }: { data: TestimonialSection }) {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <blockquote className="text-2xl font-medium leading-relaxed italic text-foreground mb-8">
                        &quot;{data.quote}&quot;
                    </blockquote>

                    <div className="flex flex-col items-center">
                        {data.avatar && (
                            <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                                <Image
                                    src={data.avatar}
                                    alt={data.author}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <cite className="not-italic font-semibold text-lg">
                            {data.author}
                        </cite>
                        {(data.role || data.company) && (
                            <span className="text-muted-foreground text-sm mt-1">
                                {data.role}
                                {data.role && data.company && " at "}
                                {data.company}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
