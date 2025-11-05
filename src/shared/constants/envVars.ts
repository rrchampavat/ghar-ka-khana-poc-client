// In development, use the Vite proxy to avoid CORS issues
// In production, use the full server URL
const isDevelopment = import.meta.env.DEV;

export const SERVER_URL = isDevelopment
  ? "" // Use relative URLs in dev to leverage Vite proxy
  : (import.meta.env.VITE_SERVER_URL as string);

// In development with Vite proxy, we can always use credentials
// In production, enable only if server is configured for CORS
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SHOULD_ENABLE_CREDENTIALS =
  isDevelopment || import.meta.env.VITE_ENABLE_CREDENTIALS === "true";
