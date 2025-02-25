import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

const options = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID  as string,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
};

export async function authHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

  const response: HttpResponseInit = {
    status: 200,
    headers: [],
    body: "",
  };

  const req = request as unknown as NextApiRequest;
  const res = {
    setHeader: (name: string, value: string) => {
      (response.headers as any).set(name, value);
    },
    end: (body: string) => {
      response.body = body;
    },
  } as unknown as NextApiResponse;

  await NextAuth(req, res, options);

  return response;
}

app.http("authHandler", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: authHandler,
});

export default authHandler;
