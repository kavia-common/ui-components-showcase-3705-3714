# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Environment configuration

Environment variables are read via a centralized helper at `src/config/env.js`. Only variables prefixed with `REACT_APP_` are exposed to the client by Create React App. Sensible defaults are provided for local development.

Supported variables:
- REACT_APP_API_BASE (default: "/api")
- REACT_APP_BACKEND_URL (default: "http://localhost:3001")
- REACT_APP_FRONTEND_URL (default: "http://localhost:3000")
- REACT_APP_WS_URL (default: "ws://localhost:3001")
- REACT_APP_NODE_ENV (fallbacks to NODE_ENV)
- REACT_APP_NEXT_TELEMETRY_DISABLED (default: true)
- REACT_APP_ENABLE_SOURCE_MAPS (default: true)
- REACT_APP_PORT (default: 3000)
- REACT_APP_TRUST_PROXY (default: false)
- REACT_APP_LOG_LEVEL (default: "info")
- REACT_APP_HEALTHCHECK_PATH (default: "/healthz")
- REACT_APP_FEATURE_FLAGS (JSON object or comma/semicolon-separated list; default: {})
- REACT_APP_EXPERIMENTS_ENABLED (default: false)

Usage:

```jsx
import env, { getEnv, getFlag } from "./src/config/env";

const { apiBase, backendUrl } = env;
const experiments = getFlag("experimentsEnabled");
```

The Home and Chatbot demo pages surface current configuration for quick verification.

## Tailwind CSS

This project is configured with Tailwind CSS using the "Ocean Professional" theme.

- Config files:
  - `tailwind.config.js` includes theme tokens:
    - primary `#2563EB`, secondary/success `#F59E0B`, error `#EF4444`
    - background `#f9fafb`, surface `#ffffff`, text `#111827`
    - gradient utility: `bg-gradient-to-r from-blue-500/10 to-gray-50`
  - `postcss.config.js` enables Tailwind and Autoprefixer.
- Styles:
  - `src/index.css` includes `@tailwind base; @tailwind components; @tailwind utilities;`
  - Base styles apply `bg-background` and `text-text` to the body.

Use Tailwind classes directly in components, e.g.:

```jsx
<div className="p-6 rounded-xl shadow-soft bg-surface">
  <h1 className="text-2xl font-semibold text-text">Ocean Professional</h1>
  <button className="mt-4 px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-600 transition">
    Action
  </button>
</div>
```

## Design primitives

Reusable primitives are provided for consistent styling:

- Button: `src/components/ui/primitives/Button.jsx`
- Card: `src/components/ui/primitives/Card.jsx`
- Badge: `src/components/ui/primitives/Badge.jsx`

Example:

```jsx
import Button from "./components/ui/primitives/Button";
import Card from "./components/ui/primitives/Card";
import Badge from "./components/ui/primitives/Badge";

<Card header={<div>Header <Badge tone="primary">New</Badge></div>} footer={<Button>Action</Button>}>
  Content
</Card>
```

## Customization

### Colors

You can also reference CSS variables in `src/index.css` under the `:root` selector if needed.

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
