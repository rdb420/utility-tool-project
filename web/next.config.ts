import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical URLs in the page specs use trailing slashes.
  trailingSlash: true,
  // The app lives in web/ inside the repo; corpus records under ../data and
  // ../schemas are imported at build time, so trace files from the repo root.
  outputFileTracingRoot: path.join(__dirname, ".."),
};

export default nextConfig;
