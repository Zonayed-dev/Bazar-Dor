import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL:
        process.env.NEXT_PUBLIC_APP_URL || "https://bazar-dor-sigma-eight.vercel.app/",
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
});

