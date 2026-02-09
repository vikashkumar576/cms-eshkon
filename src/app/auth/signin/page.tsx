"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const DEMO_ACCOUNTS = [
    { email: "viewer@example.com", role: "Viewer", description: "Can only view preview pages" },
    { email: "editor@example.com", role: "Editor", description: "Can edit in studio mode" },
    { email: "publisher@example.com", role: "Publisher", description: "Full access including publish" },
];

function SignInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/preview/home";

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password: "demo",
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email. Please use one of the demo accounts.");
                setIsLoading(false);
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch {
            setError("An error occurred. Please try again.");
            setIsLoading(false);
        }
    }

    async function handleDemoLogin(demoEmail: string) {
        setEmail(demoEmail);
        setIsLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email: demoEmail,
            password: "demo",
            redirect: false,
        });

        if (!result?.error) {
            router.push(callbackUrl);
            router.refresh();
        } else {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">CMS Page Studio</h1>
                    <p className="mt-2 text-muted-foreground">
                        Sign in to access the editor
                    </p>
                </div>

                {/* Demo Accounts */}
                <div className="mb-6 rounded-lg border bg-card p-6">
                    <h2 className="mb-4 text-lg font-semibold">Demo Accounts</h2>
                    <div className="space-y-3">
                        {DEMO_ACCOUNTS.map((account) => (
                            <button
                                key={account.email}
                                onClick={() => handleDemoLogin(account.email)}
                                disabled={isLoading}
                                className="w-full rounded-md border bg-background p-3 text-left transition-colors hover:border-primary hover:bg-muted disabled:opacity-50"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">{account.role}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {account.email}
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Click to login
                                    </div>
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    {account.description}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Manual Login Form */}
                <div className="rounded-lg border bg-card p-6">
                    <h2 className="mb-4 text-sm font-medium text-muted-foreground">
                        Or enter email manually
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="mb-1 block text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="viewer@example.com"
                                required
                                disabled={isLoading}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                            />
                        </div>

                        {error && (
                            <div className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-xs text-muted-foreground">
                        Password: <code className="rounded bg-muted px-1">demo</code> (for all accounts)
                    </p>
                </div>

                {/* Info */}
                <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
                    <p className="text-sm text-amber-900 dark:text-amber-100">
                        <strong>Demo Mode:</strong> This is a demonstration authentication system.
                        All passwords are &ldquo;demo&rdquo;. In production, use a real authentication provider.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-t-transparent" />
            </div>
        }>
            <SignInForm />
        </Suspense>
    );
}
