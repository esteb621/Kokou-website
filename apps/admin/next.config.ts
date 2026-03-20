import type { NextConfig } from "next";

if (process.env.NODE_ENV === "development") {
  // We need to dynamically import so it doesn't crash the build when CommonJS transpilation happens
  import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev();
  });
}

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
};

export default nextConfig;
