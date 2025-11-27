import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/primitives/Button";
import Card from "../components/ui/primitives/Card";
import Badge from "../components/ui/primitives/Badge";
import env, { getFlag } from "../config/env";

/**
/ PUBLIC_INTERFACE
 * Home page listing quick links to all demo routes, plus a primitives showcase.
 */
export default function Home() {
  const demos = [
    { to: "/accordion", title: "Accordion", desc: "Expandable panels for content" },
    { to: "/bentomenu", title: "Bento Menu", desc: "Modern grid-based navigation" },
    { to: "/breadcrumbs", title: "Breadcrumbs", desc: "Hierarchical navigation" },
    { to: "/carousel", title: "Carousel", desc: "Slide through images/content" },
    { to: "/chatbot", title: "Chatbot", desc: "Conversational UI with mock responses" },
    { to: "/form-wizard", title: "Form Wizard", desc: "Multi-step forms" },
    { to: "/testimonial", title: "Testimonial", desc: "Customer quotes" },
    { to: "/toast", title: "Toast", desc: "Transient notifications" },
  ];

  const flags = env.featureFlags || {};
  const experiments = getFlag("experimentsEnabled");

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="ocean-surface p-8">
        <h1 className="text-3xl font-bold">Welcome to UI Components Showcase</h1>
        <p className="mt-2 text-text/70">
          Explore component demos styled with the Ocean Professional theme.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demos.map((demo) => (
          <Link key={demo.to} to={demo.to} className="ocean-surface p-5 group">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold">{demo.title}</h2>
              <span className="text-primary transition group-hover:translate-x-0.5">→</span>
            </div>
            <p className="mt-1 text-sm text-text/70">{demo.desc}</p>
          </Link>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-4">
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="font-semibold">Design Primitives</div>
              <Badge tone="primary" variant="soft">New</Badge>
            </div>
          }
          footer={
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="primary">Primary</Button>
              <Button size="sm" variant="secondary">Secondary</Button>
              <Button size="sm" variant="outline">Outline</Button>
              <Button size="sm" variant="ghost">Ghost</Button>
              <Button size="sm" variant="danger">Danger</Button>
            </div>
          }
        >
          <p className="text-sm text-text/70">
            Use Button, Card, and Badge primitives for consistent look and feel across demos.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="primary">Primary</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="info">Info</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="error">Error</Badge>
          </div>
        </Card>

        <Card variant="outline" header={<div className="font-semibold">States & Loading</div>}>
          <div className="flex flex-wrap items-center gap-3">
            <Button loading>Loading</Button>
            <Button variant="outline" disabled>Disabled</Button>
            <Button variant="ghost" size="lg" rightIcon={<span>→</span>}>Large Ghost</Button>
            <Button size="sm" leftIcon={<span>★</span>}>Small w/ Icon</Button>
          </div>
          <div className="mt-4 text-sm text-text/60">
            Subtle shadows, rounded corners, and smooth transitions align with the Ocean Professional theme.
          </div>
        </Card>
      </section>

      <section className="grid lg:grid-cols-2 gap-4">
        <Card
          variant="outline"
          header={<div className="font-semibold">Runtime Environment</div>}
        >
          <div className="text-sm space-y-2">
            <div><span className="text-text/60">Node Env:</span> <span className="font-mono">{env.nodeEnv}</span></div>
            <div><span className="text-text/60">API Base:</span> <span className="font-mono">{env.apiBase}</span></div>
            <div><span className="text-text/60">Backend URL:</span> <span className="font-mono">{env.backendUrl}</span></div>
            <div><span className="text-text/60">Frontend URL:</span> <span className="font-mono">{env.frontendUrl}</span></div>
            <div><span className="text-text/60">WS URL:</span> <span className="font-mono">{env.wsUrl}</span></div>
            <div><span className="text-text/60">Healthcheck:</span> <span className="font-mono">{env.healthcheckPath}</span></div>
            <div><span className="text-text/60">Log level:</span> <span className="font-mono uppercase">{env.logLevel}</span></div>
            <div className="flex items-center gap-2 mt-2">
              <Badge tone={env.enableSourceMaps ? "success" : "warning"} variant="soft">
                Source maps: {env.enableSourceMaps ? "enabled" : "disabled"}
              </Badge>
              <Badge tone={env.nextTelemetryDisabled ? "success" : "warning"} variant="soft">
                Telemetry: {env.nextTelemetryDisabled ? "off" : "on"}
              </Badge>
              <Badge tone={env.trustProxy ? "info" : "neutral"} variant="soft">
                Trust proxy: {String(env.trustProxy)}
              </Badge>
            </div>
          </div>
        </Card>

        <Card
          variant="outline"
          header={<div className="flex items-center justify-between">
            <div className="font-semibold">Feature Flags</div>
            {experiments && <Badge tone="info" variant="soft">Experiments On</Badge>}
          </div>}
        >
          <div className="text-sm">
            {Object.keys(flags).length === 0 ? (
              <div className="text-text/60">No flags configured. Set REACT_APP_FEATURE_FLAGS to enable.</div>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(flags).map(([k, v]) => (
                  <li key={k} className="flex items-center gap-2">
                    <span className="font-mono">{k}</span>
                    <Badge tone={v ? "success" : "warning"} variant="soft">{String(v)}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
