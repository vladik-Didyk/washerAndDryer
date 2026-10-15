// Route module for every URL no other route matches ("*" in src/app/routes.ts): a 404 that
// the root error boundary renders as the NotFound page.
import { data } from "react-router";

export function loader() {
  throw data("Not found", { status: 404 });
}

export default function NotFoundRoute() {
  return null;
}
