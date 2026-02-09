// @ts-nocheck
/* eslint-disable */
// NextAuth v5 beta - TypeScript type definitions are still evolving
// This file uses ts-nocheck to suppress type errors until stable release
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/lib/auth/roles";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Demo Login",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "viewer@example.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "demo",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || credentials.password !== "demo") {
                    return null;
                }

                const user = getUserByEmail(credentials.email as string);
                if (!user) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
});
