import { createClient, type Entry, type EntrySkeletonType } from "contentful";
import { PageSchema, type Page, type FeatureItem } from "@/lib/schemas";

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

const previewClient = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN || "",
    host: "preview.contentful.com",
});

interface GetPageOptions {
    preview?: boolean;
}

/**
 * Transforms a Contentful section entry into our internal schema format
 */
/**
 * Transforms a Contentful section entry into our internal schema format
 */
function transformSection(section: Entry<EntrySkeletonType>) {
    const fields = section.fields as Record<string, unknown>;
    const contentTypeId = section.sys.contentType?.sys.id || "";

    // Map Contentful content type IDs to our internal schema types
    let sectionType = "unknown";

    switch (contentTypeId) {
        case "heroSection":
            sectionType = "hero";
            break;
        case "ctaSection":
            sectionType = "cta";
            break;
        case "featureGrid":
            sectionType = "featureGrid";
            break;
        case "testimonial":
            sectionType = "testimonial";
            break;
        default:
            console.warn(`Unknown content type: ${contentTypeId}`);
            // Try to use the content type ID as fallback if it matches schema
            sectionType = contentTypeId;
    }

    // Base section data
    const baseSection = {
        id: section.sys.id,
        type: sectionType,
        ...fields,
    };

    // Special handling for featureGrid - transform nested feature entries
    if (sectionType === "featureGrid" && fields.features) {
        const featuresArray = fields.features as Array<Entry<EntrySkeletonType>>;
        const transformedFeatures: FeatureItem[] = featuresArray.map((feature) => ({
            id: feature.sys.id,
            title: (feature.fields.title as string) || "",
            description: (feature.fields.description as string) || "",
            icon: feature.fields.icon as string | undefined,
        }));

        return {
            ...baseSection,
            features: transformedFeatures,
        };
    }

    return baseSection;
}

export async function getPageBySlug(
    slug: string,
    options: GetPageOptions = {}
): Promise<Page | null> {
    const activeClient = options.preview ? previewClient : client;

    try {
        const response = await activeClient.getEntries({
            content_type: "page",
            "fields.slug": slug,
            limit: 1,
            include: 3, // Include linked entries (sections and their nested items)
        });

        if (response.items.length === 0) {
            return null;
        }

        const entry = response.items[0];
        const fields = entry.fields as Record<string, unknown>;

        // Transform sections
        const rawSections = fields.sections;
        let sectionsArray: Array<Entry<EntrySkeletonType>> = [];

        if (Array.isArray(rawSections)) {
            sectionsArray = rawSections as Array<Entry<EntrySkeletonType>>;
        } else if (rawSections && typeof rawSections === "object") {
            // Handle case where it might be a single reference
            sectionsArray = [rawSections as Entry<EntrySkeletonType>];
        }

        const transformedSections = sectionsArray
            .map((section) => {
                try {
                    return transformSection(section);
                } catch (e) {
                    console.error("Error transforming section:", e);
                    return null;
                }
            })
            .filter((section): section is any => section !== null);

        // Map Contentful response to internal schema
        const pageData = {
            slug: fields.slug as string,
            title: (fields.heading || fields.title || "Untitled Page") as string,
            sections: transformedSections,
            publishedAt: entry.sys.createdAt,
            updatedAt: entry.sys.updatedAt,
        };

        // Validate with Zod schema
        const result = PageSchema.safeParse(pageData);

        if (!result.success) {
            console.error("❌ Schema validation failed:", result.error);
            return null;
        }

        return result.data;
    } catch (error) {
        console.error("Error fetching page:", error);
        return null;
    }
}
