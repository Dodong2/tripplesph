import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { admin } from "better-auth/plugins";
import prisma from "../db/prisma.js";


export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3001",
    basePath: "/api/auth",
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    advanced: {
    crossSubdomainCookies: {
      enabled: false,
    },
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    }
  },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    
    plugins: [admin()],
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    const count = await prisma.user.count()
                    if(count === 1) {
                        await prisma.user.update({
                            where: { id: user.id },
                            data: { role: "super_admin" }
                        })
                        console.log(`✓ Super admin created: ${user.email}`);
                    }
                }
            }
        }
    },


    trustedOrigins: [process.env.CLIENT_URL!, 'http://localhost:5173'],
})