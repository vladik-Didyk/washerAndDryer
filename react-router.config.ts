import type { Config } from "@react-router/dev/config";

// Server-rendered on Cloudflare Workers. The app layer lives in src/app (Feature-Sliced
// Design: src/app -> processes -> pages -> widgets -> features -> entities -> shared).
export default {
  appDirectory: "src/app",
  ssr: true,
  // The site is small: send the whole route manifest with the first page instead of
  // discovering routes lazily (no /__manifest requests).
  routeDiscovery: { mode: "initial" },
  future: {
    v8_viteEnvironmentApi: true,
    // Every URL ends with a slash; data requests follow it (/machines/_.data).
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
