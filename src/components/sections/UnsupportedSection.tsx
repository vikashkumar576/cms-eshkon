interface UnsupportedSectionProps {
    type: string;
}

export default function UnsupportedSection({ type }: UnsupportedSectionProps) {
    return (
        <section className="border-2 border-dashed border-muted px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
                Unsupported section type: <code className="font-mono">{type}</code>
            </p>
        </section>
    );
}
