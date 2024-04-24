import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: '2b952fb8-4a3d-47d8-b2ed-30afb3616b92', // Your Client ID
    authority: 'https://login.microsoftonline.com/22df4783-35a0-479e-84bb-178af5648ba5', // Your Authority (Tenant ID)
    redirectUri: 'http://localhost:3000/accueil', // Your Callback Path
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  protectedResourceMap: null, // Set protectedResourceMap to null
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
