import type { Config } from "@react-router/dev/config";
import prerendered from "./src/app/prerender.json";

// Server-rendered on Cloudflare Workers. The app layer lives in src/app (Feature-Sliced
// Design: src/app -> processes -> pages -> widgets -> features -> entities -> shared).
export default {
  appDirectory: "src/app",
  ssr: true,
  // Every published page is built ahead of time into build/client (HTML + its _.data) and
  // served as a static file (workers/app.ts): rendering a page takes more than the 10 ms of
  // CPU the Workers free plan allows per request. Only the rental request (/start/, a
  // session per visitor), form submissions and unknown URLs render on the Worker. The build
  // has no Cloudflare environment, so these pages are the published ones (no drafts), with
  // the offers of the build date: rebuild when an offer starts or ends.
  // The list is checked against the site catalog by src/app/prerender.test.ts.
  prerender: prerendered,
  // The site is small: send the whole route manifest with the first page instead of
  // discovering routes lazily (no /__manifest requests).
  routeDiscovery: { mode: "initial" },
  future: {
    v8_viteEnvironmentApi: true,
    // Every URL ends with a slash; data requests follow it (/machines/_.data).
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
