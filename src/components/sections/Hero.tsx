import { HeroSection } from "@/lib/schemas";

export function Hero({ data }: { data: HeroSection }) {
    return (
        <section className="relative py-32 md:py-48 overflow-hidden">
            {data.backgroundImage && (
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${data.backgroundImage})` }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            )}

            <div className="container relative z-10 px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground dark:text-white">
                        {data.heading}
                    </h1>
                    {data.subheading && (
                        <p className="text-xl text-muted-foreground dark:text-zinc-200">
                            {data.subheading}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
