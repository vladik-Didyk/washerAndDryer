// /llms.txt: a plain-text fact sheet for AI assistants (built in ./llms.server.ts).
import type { LoaderFunctionArgs } from "react-router";
import { siteCatalog } from "../catalog";
import { catalogI18n, catalogOptions } from "./context";
import { llmsTxt } from "./llms.server";

export async function loader({ context }: LoaderFunctionArgs) {
  const options = catalogOptions(context);
  const i18n = await catalogI18n(context);
  return new Response(llmsTxt(siteCatalog(options, i18n), i18n, options.now), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
