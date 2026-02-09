import { getPageBySlug } from "@/lib/contentfulClient";
import { SectionRenderer } from "@/components/SectionRenderer";
import { notFound } from "next/navigation";

export default async function Home() {
  const page = await getPageBySlug("home");

  if (!page) {
    // If the 'home' page entry doesn't exist in Contentful, show 404
    // or you could render a default state here
    return notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <SectionRenderer sections={page.sections} />
    </main>
  );
}
