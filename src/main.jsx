import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

// Built pages arrive prerendered (scripts/prerender.mjs), so React hydrates them.
// The dev server serves an empty root, so it renders from scratch.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
