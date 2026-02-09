import { createClient } from "contentful";

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

export default async function TestPage() {
    let status = "Testing Contentful connection...";
    let entries: Array<{ id: string; contentType: string; fields: string[] }> = [];
    let error: string | null = null;

    try {
        // Test connection by fetching all entries
        const response = await client.getEntries({ limit: 10 });

        status = `✅ Connected! Found ${response.total} entries`;
        entries = response.items.map((item) => ({
            id: item.sys.id,
            contentType: item.sys.contentType?.sys.id,
            fields: Object.keys(item.fields),
        }));
    } catch (err) {
        error = err instanceof Error ? err.message : "Unknown error";
        status = "❌ Connection failed";
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Contentful Connection Test</h1>

                <div className="rounded-lg border bg-card p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">{status}</h2>

                    <div className="space-y-2 text-sm">
                        <p>Space ID: <code className="bg-muted px-2 py-1 rounded">{process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "NOT SET"}</code></p>
                        <p>Access Token: <code className="bg-muted px-2 py-1 rounded">{process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ? "✅ Set" : "❌ Not set"}</code></p>
                    </div>
                </div>

                {error && (
                    <div className="rounded-lg border border-destructive bg-destructive/10 p-6 mb-6">
                        <h3 className="font-semibold text-destructive mb-2">Error</h3>
                        <pre className="text-sm whitespace-pre-wrap">{error}</pre>
                    </div>
                )}

                {entries.length > 0 && (
                    <div className="rounded-lg border bg-card p-6">
                        <h3 className="font-semibold mb-4">Available Entries ({entries.length})</h3>
                        <ul className="space-y-3">
                            {entries.map((entry) => (
                                <li key={entry.id} className="border-l-2 border-primary pl-4">
                                    <p className="font-mono text-sm text-muted-foreground">ID: {entry.id}</p>
                                    <p className="text-sm">Type: <span className="font-semibold">{entry.contentType || "unknown"}</span></p>
                                    <p className="text-sm text-muted-foreground">Fields: {entry.fields.join(", ")}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {entries.length === 0 && !error && (
                    <div className="rounded-lg border border-amber-500 bg-amber-50 p-6">
                        <h3 className="font-semibold text-amber-900 mb-2">No Content Found</h3>
                        <p className="text-sm text-amber-800">
                            Your Contentful space is empty. You need to create content types and entries in Contentful.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
