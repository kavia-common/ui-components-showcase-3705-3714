# UI Components Showcase (React + Tailwind)

A lightweight React application styled with Tailwind CSS that showcases reusable UI components using the Ocean Professional theme.

## Quick start

- Install and run:
  - npm install
  - npm start
- Open http://localhost:3000

## Final routes

The app includes the following navigable demo pages:

- / — Home
- /accordion — Accordion demo
- /bentomenu — Bento menu demo
- /breadcrumbs — Breadcrumbs demo
- /carousel — Carousel demo
- /chatbot — Chatbot demo
- /form-wizard — Form Wizard demo
- /testimonial — Testimonial demo
- /toast — Toast demo

Navigation links are available in the gradient navbar with clear active-state styling.

## Project scripts

- npm start — Development server
- npm test — Test runner
- npm run build — Production build

## Tailwind setup

Tailwind is preconfigured with PostCSS and a custom theme.

- Config files:
  - tailwind.config.js:
    - Colors: primary #2563EB, secondary #F59E0B, success #22C55E, warning #F59E0B, error #EF4444, info #0EA5E9
    - Surfaces: background #f9fafb, surface #ffffff
    - Content: text #111827
    - Utilities: shadows, rounded radii, keyframe animations, ocean-gradient
  - postcss.config.js: Tailwind and Autoprefixer enabled
- Styles:
  - src/index.css includes @tailwind base, components, utilities
  - Global base applies bg-background and text-text
  - Utility shortcuts like .ocean-surface and .ocean-gradient are defined

Example:

```jsx
<div className="ocean-surface p-6">
  <h1 className="text-2xl font-semibold text-text">Ocean Professional</h1>
  <button className="mt-4 px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-600 transition">
    Action
  </button>
</div>
```

## Routing and layout

- BrowserRouter is initialized in src/index.js
- Routes are declared in src/App.js and rendered inside MainLayout (Navbar + Footer)
- Navbar shows all component routes, with the active page highlighted

## Theme tokens

Tokens are defined in tailwind.config.js and surfaced as Tailwind classes:

- Colors: primary, secondary, success, warning, error, info
- Surfaces: background, surface
- Content: text
- Shadows: hairline, soft, card, floating
- Radii: sm, md, lg, xl, 2xl, pill
- Animations: fadeIn, slideUp, slideDown, pop, shimmer, spin-slow
- Gradients:
  - bg-ocean-gradient (legacy soft gradient)
  - bg-brand-gradient (new primary gradient: linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%))

## Environment variables

Environment variables are read through src/config/env.js and normalized for safe client usage (CRA requires REACT_APP_ prefix).

Supported variables:
- REACT_APP_API_BASE (default: "/api")
- REACT_APP_BACKEND_URL (default: "http://localhost:3001")
- REACT_APP_FRONTEND_URL (default: "http://localhost:3000")
- REACT_APP_WS_URL (default: "ws://localhost:3001")
- REACT_APP_NODE_ENV (fallback to NODE_ENV)
- REACT_APP_NEXT_TELEMETRY_DISABLED (default: true)
- REACT_APP_ENABLE_SOURCE_MAPS (default: true)
- REACT_APP_PORT (default: 3000)
- REACT_APP_TRUST_PROXY (default: false)
- REACT_APP_LOG_LEVEL (default: "info")
- REACT_APP_HEALTHCHECK_PATH (default: "/healthz")
- REACT_APP_FEATURE_FLAGS (JSON object or comma/semicolon-list)
- REACT_APP_EXPERIMENTS_ENABLED (default: false)

Usage:

```jsx
import env, { getEnv, getFlag } from "./src/config/env";

const { apiBase, backendUrl, wsUrl } = env;
const experiments = getFlag("experimentsEnabled");
```

You can inspect current values on the Home and Chatbot pages.

## Design primitives

Reusable UI primitives live in src/components/ui/primitives:

- Button.jsx — Variants (primary, secondary, ghost, outline, danger), sizes, loading, icons
- Card.jsx — Variants (surface, outline, ghost), with optional header and footer
- Badge.jsx — Tones (neutral, primary, success, info, warning, error), variants, sizes

## Adding a new component

1) Create the component under src/components/ui, following the existing style and accessibility patterns.
2) Create a demo page under src/pages/demos, e.g. NewThingDemo.jsx, and export a default React component that showcases multiple states.
3) Register the route in src/App.js:
   - import NewThingDemoPage from "./pages/demos/NewThingDemo";
   - add <Route path="/new-thing" element={<NewThingDemoPage />} />
4) Add a link in Navbar (src/components/Navbar.jsx) in both desktop and mobile link lists.
5) Optionally add an entry card to Home (src/pages/Home.jsx) for quick access.

## Notes

- Active route highlighting is handled via NavLink in Navbar, with a white/underline accent to clearly indicate the current page.
- Accessibility: interactive elements include focus-visible ring styles; components expose ARIA labels and roles where appropriate.
- Tests: a basic test verifies Home renders.

Learn more about React at https://reactjs.org/
