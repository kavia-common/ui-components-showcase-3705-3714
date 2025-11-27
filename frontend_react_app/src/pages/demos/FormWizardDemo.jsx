import React, { useState } from "react";
import FormWizard from "../../components/ui/FormWizard";

/**
/ PUBLIC_INTERFACE
 * Form Wizard demo page with four steps and consent-gated submission.
 */
export default function FormWizardDemoPage() {
  const [submitted, setSubmitted] = useState(null);

  const steps = [
    {
      title: "Account",
      render: ({ data, update }) => (
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => update({ email: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={data.password || ""}
              onChange={(e) => update({ password: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="********"
            />
          </div>
        </div>
      ),
      validate: (d) => {
        const errs = [];
        if (!d.email) errs.push("Email is required.");
        if (d.email && !/.+@.+\..+/.test(d.email)) errs.push("Email must be valid.");
        if (!d.password || d.password.length < 6) errs.push("Password must be at least 6 characters.");
        return errs;
      },
    },
    {
      title: "Personal Info",
      render: ({ data, update }) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-text mb-1" htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              value={data.firstName || ""}
              onChange={(e) => update({ firstName: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Jane"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-text mb-1" htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              value={data.lastName || ""}
              onChange={(e) => update({ lastName: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Doe"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-text mb-1" htmlFor="bio">
              Short bio
            </label>
            <textarea
              id="bio"
              value={data.bio || ""}
              onChange={(e) => update({ bio: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              rows={3}
              placeholder="Tell us something about yourself..."
            />
          </div>
        </div>
      ),
      validate: (d) => {
        const errs = [];
        if (!d.firstName) errs.push("First name is required.");
        if (!d.lastName) errs.push("Last name is required.");
        return errs;
      },
    },
    {
      title: "Preferences",
      render: ({ data, update }) => (
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <input
              id="news"
              type="checkbox"
              checked={!!data.newsletter}
              onChange={(e) => update({ newsletter: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/40"
            />
            <label htmlFor="news" className="text-sm text-text">
              Subscribe to newsletter
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1" htmlFor="theme">
              Theme
            </label>
            <select
              id="theme"
              value={data.prefTheme || "system"}
              onChange={(e) => update({ prefTheme: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "Review",
      render: ({ data, setCanFinish, update }) => (
        <div className="space-y-4">
          <div className="text-text/70">Confirm your details before submitting.</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Field label="Email" value={data.email} />
            <Field label="Password" value={"•".repeat((data.password || "").length)} />
            <Field label="First name" value={data.firstName} />
            <Field label="Last name" value={data.lastName} />
            <Field label="Newsletter" value={data.newsletter ? "Subscribed" : "No"} />
            <Field label="Theme" value={data.prefTheme || "system"} />
            <div className="col-span-2">
              <div className="text-xs uppercase text-text/50 mb-1">Bio</div>
              <div className="rounded-xl border border-black/10 bg-gray-50 p-3">{data.bio || "—"}</div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-black/10 bg-white p-3">
            <input
              id="consent"
              type="checkbox"
              checked={!!data.consent}
              onChange={(e) => {
                update({ consent: e.target.checked });
                setCanFinish(!!e.target.checked);
              }}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/40"
            />
            <label htmlFor="consent" className="text-sm text-text">
              I agree to the Terms and Privacy Policy.
            </label>
          </div>
          <div className="text-xs text-text/60">You must provide consent to enable submission.</div>
        </div>
      ),
      validate: (d) => {
        const errs = [];
        if (!d.consent) errs.push("Consent is required to submit.");
        return errs;
      },
    },
  ];

  return (
    <section className="space-y-6">
      <header className="ocean-surface p-6">
        <h1 className="text-2xl font-bold">Form Wizard</h1>
        <p className="text-text/70 mt-1">
          Multi-step forms with validation and accessible progress indicators.
        </p>
      </header>

      <FormWizard
        steps={steps}
        initialData={{}}
        onFinish={(data) => setSubmitted(data)}
      />

      {submitted && (
        <div className="ocean-surface p-5">
          <h2 className="text-lg font-semibold">Submitted data</h2>
          <pre className="mt-2 text-sm bg-gray-50 rounded-xl p-3 overflow-x-auto">
{JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase text-text/50 mb-1">{label}</div>
      <div className="rounded-xl border border-black/10 bg-gray-50 p-3">{value || "—"}</div>
    </div>
  );
}
