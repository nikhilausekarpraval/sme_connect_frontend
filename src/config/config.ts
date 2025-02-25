import { Configuration, PublicClientApplication } from '@azure/msal-browser';
 
export const config = {
    auth: {
 
        authority: 'https://login.microsoftonline.com/{648ca8d9-38e9-44ca-bc27-20e5a79ee859}',
        clientId: '5bfa2aed-bd36-44f2-a920-f0803d1f7b62',
        redirectUri: process.env.NEXT_PUBLIC_AZURE_AD_REDIRECT_URI,
        postLogoutRedirectUri: process.env.NEXT_PUBLIC_AZURE_AD_REDIRECT_URI
 
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
   
} as Configuration;
 
export const pca = new PublicClientApplication(config);

export const authScopes = {
    scopes: ["user.read"] 
};
