//
// Centralized environment configuration for React app
//
// PUBLIC_INTERFACE
/**
 * getEnv exposes normalized configuration from REACT_APP_* variables.
 * - Safely parses booleans, numbers, JSON objects/arrays
 * - Provides sensible defaults for local development
 * - Only reads variables prefixed with REACT_APP_ to comply with CRA
 *
 * Usage:
 *   import env, { getEnv, getFlag } from "../config/env";
 *   const { apiBase, wsUrl } = env;
 *   if (getFlag("experimentsEnabled")) { ... }
 */

const raw = {
  NODE_ENV: process.env.NODE_ENV,
  // Only safe-to-expose, CRA will inline REACT_APP_* at build time
  REACT_APP_API_BASE: process.env.REACT_APP_API_BASE,
  REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
  REACT_APP_FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL,
  REACT_APP_WS_URL: process.env.REACT_APP_WS_URL,
  REACT_APP_NODE_ENV: process.env.REACT_APP_NODE_ENV,
  REACT_APP_NEXT_TELEMETRY_DISABLED: process.env.REACT_APP_NEXT_TELEMETRY_DISABLED,
  REACT_APP_ENABLE_SOURCE_MAPS: process.env.REACT_APP_ENABLE_SOURCE_MAPS,
  REACT_APP_PORT: process.env.REACT_APP_PORT,
  REACT_APP_TRUST_PROXY: process.env.REACT_APP_TRUST_PROXY,
  REACT_APP_LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL,
  REACT_APP_HEALTHCHECK_PATH: process.env.REACT_APP_HEALTHCHECK_PATH,
  REACT_APP_FEATURE_FLAGS: process.env.REACT_APP_FEATURE_FLAGS,
  REACT_APP_EXPERIMENTS_ENABLED: process.env.REACT_APP_EXPERIMENTS_ENABLED,
};

// Helpers
function parseBool(value, fallback = false) {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return fallback;
  const v = value.trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(v)) return true;
  if (["0", "false", "no", "n", "off"].includes(v)) return false;
  return fallback;
}

function parseNumber(value, fallback) {
  if (value === undefined || value === null || value === "") return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parseJson(value, fallback) {
  if (!value || typeof value !== "string") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function normalizeUrl(url, fallback) {
  const v = (url || "").trim();
  if (!v) return fallback;
  try {
    // Ensure it's a valid URL; allow relative like "/api"
    if (v.startsWith("http://") || v.startsWith("https://")) {
      return new URL(v).toString().replace(/\/+$/, "");
    }
    // Relative path, ensure it starts with a single slash
    return ("/" + v).replace(/\/+$/, "").replace(/\/{2,}/g, "/");
  } catch {
    return fallback;
  }
}

// Sensible defaults for local development
const defaults = {
  nodeEnv: raw.NODE_ENV || "development",
  apiBase: "/api",
  backendUrl: "http://localhost:3001",
  frontendUrl: "http://localhost:3000",
  wsUrl: "ws://localhost:3001",
  nextTelemetryDisabled: true,
  enableSourceMaps: true,
  port: 3000,
  trustProxy: false,
  logLevel: "info",
  healthcheckPath: "/healthz",
  featureFlags: {}, // object map of flags
  experimentsEnabled: false,
};

// Derive normalized config
const env = {
  nodeEnv: (raw.REACT_APP_NODE_ENV || raw.NODE_ENV || defaults.nodeEnv).toLowerCase(),
  apiBase: normalizeUrl(raw.REACT_APP_API_BASE, defaults.apiBase),
  backendUrl: normalizeUrl(raw.REACT_APP_BACKEND_URL, defaults.backendUrl),
  frontendUrl: normalizeUrl(raw.REACT_APP_FRONTEND_URL, defaults.frontendUrl),
  wsUrl: normalizeUrl(raw.REACT_APP_WS_URL, defaults.wsUrl),
  nextTelemetryDisabled: parseBool(raw.REACT_APP_NEXT_TELEMETRY_DISABLED, defaults.nextTelemetryDisabled),
  enableSourceMaps: parseBool(raw.REACT_APP_ENABLE_SOURCE_MAPS, defaults.enableSourceMaps),
  port: parseNumber(raw.REACT_APP_PORT, defaults.port),
  trustProxy: parseBool(raw.REACT_APP_TRUST_PROXY, defaults.trustProxy),
  logLevel: (raw.REACT_APP_LOG_LEVEL || defaults.logLevel).toLowerCase(),
  healthcheckPath: normalizeUrl(raw.REACT_APP_HEALTHCHECK_PATH, defaults.healthcheckPath),
  // Feature flags:
  // - Prefer REACT_APP_FEATURE_FLAGS as JSON object e.g. {"betaBanner":true}
  // - Also allow comma-separated list "flagA,flagB" which maps to { flagA: true, flagB: true }
  featureFlags: (() => {
    const v = raw.REACT_APP_FEATURE_FLAGS;
    if (!v) return defaults.featureFlags;
    const asJson = parseJson(v, null);
    if (asJson && typeof asJson === "object") return asJson;
    // comma separated or semicolon separated list
    const list = String(v)
      .split(/[;,]/)
      .map((s) => s.trim())
      .filter(Boolean);
    return list.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
  })(),
  experimentsEnabled: parseBool(raw.REACT_APP_EXPERIMENTS_ENABLED, defaults.experimentsEnabled),
};

// PUBLIC_INTERFACE
export function getEnv() {
  /**
   * Returns a frozen copy of the normalized configuration.
   */
  return Object.freeze({ ...env });
}

// PUBLIC_INTERFACE
export function getFlag(flagName, fallback = false) {
  /**
   * Returns boolean value for the given feature flag name.
   * Looks in env.featureFlags map and REACT_APP_EXPERIMENTS_ENABLED for "experimentsEnabled".
   */
  if (!flagName) return fallback;
  if (flagName === "experimentsEnabled") return !!env.experimentsEnabled;
  const v = env.featureFlags?.[flagName];
  return typeof v === "boolean" ? v : fallback;
}

// Default export for convenience
export default getEnv();
