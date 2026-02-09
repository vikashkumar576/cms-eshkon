import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/store/ReduxProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

/**
 * Global Metadata
 * Defines the default title and description for the application.
 */
export const metadata: Metadata = {
  title: "CMS Editor Prototype",
  description: "Contentful-powered CMS editor with live preview",
};

/**
 * Root Layout Component
 * 
 * This is the top-level items component that wraps all pages in the application.
 * It handles:
 * 1. Global CSS imports (`globals.css`)
 * 2. Font configuration (via `inter` class in body)
 * 3. Global providers (AuthProvider, ReduxProvider, ThemeProvider)
 * 4. HTML/Body structure
 * 
 * @param children - The page content to render
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
