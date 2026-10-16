// Route module for every URL no other route matches ("*" in src/app/routes.ts): a 404 that
// the root error boundary renders as the NotFound page. A POST there (bots probing for
// /wp-json/..., /xmlrpc.php) is the same 404, not a 405 for a missing action.
import { data } from "react-router";

export function loader() {
  throw data("Not found", { status: 404 });
}

export const action = loader;

export default function NotFoundRoute() {
  return null;
}
