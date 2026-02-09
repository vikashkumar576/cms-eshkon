"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, Shield } from "lucide-react";

export function UserInfo() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex items-center gap-2 rounded-md border bg-muted px-3 py-1.5 text-sm">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Loading...</span>
            </div>
        );
    }

    if (!session?.user) {
        return (
            <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <User className="h-4 w-4" />
                Sign In
            </Link>
        );
    }

    const user = session.user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userRole = (user as any).role || "viewer";

    const roleColors: Record<string, string> = {
        viewer: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-100",
        editor: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-100",
        publisher: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-100",
    };

    const roleColor = roleColors[userRole] || "bg-gray-100 text-gray-800";

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-1.5">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                    <div className="font-medium">{user.name || "User"}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
                <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${roleColor}`}>
                    {userRole}
                </span>
            </div>
            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Sign out"
            >
                <LogOut className="h-4 w-4" />
                Sign Out
            </button>
        </div>
    );
}
