'use client';

import { MsalProvider } from "@azure/msal-react";
import { pca } from "@/config/config";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    return <MsalProvider instance={pca}>{children}</MsalProvider>;
}
