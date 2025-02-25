import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  console.log("Received request:", req.body);

  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ error: "idToken is required" });
  }

  try {
    console.log("Fetching access token from Microsoft...");

    const tokenEndpoint = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const params = new URLSearchParams({
      client_id: process.env.AZURE_AD_CLIENT_ID!,
      client_secret: process.env.AZURE_AD_CLIENT_SECRET!,
      grant_type: "client_credentials",
      scope: "https://graph.microsoft.com/.default",
    });

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();
    console.log("Azure Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.error_description || "Failed to get accessToken");
    }

    return res.status(200).json({ accessToken: data.access_token });
  } catch (error: any) {
    console.error("Token exchange failed:", error.message);
    return res.status(500).json({ error: error.message || "Failed to get accessToken" });
  }
}
