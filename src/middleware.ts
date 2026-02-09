import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth/config";

export async function middleware(request: NextRequest) {
    const session = await auth();
    const { pathname } = request.nextUrl;

    // Protect /studio routes - require editor or publisher role
    if (pathname.startsWith("/studio")) {
        if (!session) {
            // Redirect to sign-in
            const signInUrl = new URL("/auth/signin", request.url);
            signInUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(signInUrl);
        }

        const userRole = session.user?.role;
        if (userRole === "viewer") {
            // Viewers can't access studio - redirect to preview
            const slug = pathname.split("/studio/")[1] || "home";
            return NextResponse.redirect(new URL(`/preview/${slug}`, request.url));
        }
    }

    // Protect /api/publish - require publisher role
    if (pathname === "/api/publish") {
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userRole = session.user?.role;
        if (userRole !== "publisher") {
            return new NextResponse("Forbidden - Publisher role required", {
                status: 403,
            });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/studio/:path*", "/api/publish"],
};
