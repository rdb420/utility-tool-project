import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Keep in lockstep with tsconfig.json "paths".
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@data": path.resolve(__dirname, "..", "data"),
      "@schemas": path.resolve(__dirname, "..", "schemas"),
    },
  },
  test: {
    // Node by default; component tests opt into jsdom via
    // `// @vitest-environment jsdom` at the top of the file.
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}", "src/**/__tests__/**/*.{ts,tsx}"],
  },
});
