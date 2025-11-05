/// <reference types="vitest" />
/// <reference types="vite/client" />

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  test: {
    environment: "jsdom",
    // setupFiles: "./src/tests/setup.ts",
    globals: true
    // coverage: {
    //   reporter: ["text", "json", "html"]
    // }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  define: {
    global: {}
  },
  server: {
    proxy: {
      // Proxy all API requests to the backend server
      // This avoids CORS issues in local development
      // Requests to /api/* will be forwarded to your backend server
      "/api": {
        target: process.env.VITE_SERVER_URL || "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        // Forward cookies and credentials
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            // Forward cookies from the browser to the backend
            if (req.headers.cookie) {
              proxyReq.setHeader("Cookie", req.headers.cookie);
            }
          });
          proxy.on("proxyRes", (proxyRes, _req, _res) => {
            // Forward Set-Cookie headers from backend to browser
            if (proxyRes.headers["set-cookie"]) {
              // Ensure cookies can be set by the browser (remove secure flag for local dev)
              const cookies = proxyRes.headers["set-cookie"];
              if (Array.isArray(cookies)) {
                proxyRes.headers["set-cookie"] = cookies.map((cookie) =>
                  cookie.replace(/;\s*secure/gi, "")
                );
              }
            }
          });
        }
      }
    }
  }
});
