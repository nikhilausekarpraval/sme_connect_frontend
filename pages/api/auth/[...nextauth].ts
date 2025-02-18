import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        url: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        params: { scope: `openid profile email offline_access api://${process.env.AZURE_AD_CLIENT_ID}/.default` },
      },
      token: {
        url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      },
      checks: ["pkce"], // Enabling PKCE
    }),
  ],
  callbacks: {
    async jwt({ token, account,profile,user}) {
      if (account ) {
          token.accessToken = account.access_token; 
          token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token}) {
      return {
        ...session,
        accessToken: token.accessToken,
        idToken: token.idToken 
      };
    },
  },  
};

export default NextAuth(authOptions);
