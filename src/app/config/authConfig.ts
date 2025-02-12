import { Configuration, PublicClientApplication } from '@azure/msal-browser';
 
export const msalConfig = {
    auth: {
 
        authority: 'https://login.microsoftonline.com/{45d53a40-131c-4896-94ef-8cd3538b3834}',
        clientId: 'b505befb-d768-4272-b031-6ce87eee89ff',
        redirectUri: "window.location.origin",
        postLogoutRedirectUri:"window.location.origin"
 
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
   
} as Configuration;

export const loginRequest = {
    scopes: ["User.Read"],
  };
 
export const smeConfig = new PublicClientApplication(msalConfig);