import { getPageBySlug } from "@/lib/contentfulClient";
import { renderSection } from "@/lib/sectionRegistry";
import { notFound } from "next/navigation";

interface PreviewPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ preview?: string }>;
}

export default async function PreviewPage({
    params,
    searchParams,
}: PreviewPageProps) {
    const { slug } = await params;
    const { preview } = await searchParams;

    const page = await getPageBySlug(slug, {
        preview: preview === "true",
    });

    if (!page) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            <div className="mx-auto max-w-7xl">
                {page.sections.map(renderSection)}
            </div>
        </main>
    );
}
