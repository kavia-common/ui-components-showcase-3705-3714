import React, { useState } from "react";

/**
/ PUBLIC_INTERFACE
 * FormWizard: multi-step form container with basic validation.
 * Props:
 * - steps: Array<{ title: string, render: (ctx) => ReactNode, validate?: (data) => string[] }>
 * - onFinish: (data) => void
 * - initialData: object
 */
export default function FormWizard({ steps = [], onFinish, initialData = {} }) {
  const [data, setData] = useState(initialData);
  const [stepIdx, setStepIdx] = useState(0);
  const [errors, setErrors] = useState([]);
  const [canFinish, setCanFinish] = useState(true); // step-level control

  const isFirst = stepIdx === 0;
  const isLast = stepIdx === steps.length - 1;

  const go = (delta) => {
    const next = stepIdx + delta;
    if (next < 0 || next >= steps.length) return;
    setStepIdx(next);
    setErrors([]);
    setCanFinish(true);
  };

  const onNext = () => {
    const validate = steps[stepIdx].validate;
    const errs = validate ? validate(data) : [];
    if (errs && errs.length) {
      setErrors(errs);
      return;
    }
    if (isLast) {
      onFinish?.(data);
    } else {
      go(+1);
    }
  };

  const onPrev = () => go(-1);

  const update = (patch) => setData((prev) => ({ ...prev, ...patch }));

  // Allow a step render to provide a setter to control finishing ability (e.g., consent checkbox).
  const renderCtx = { data, update, setCanFinish };

  return (
    <div className="ocean-surface p-6">
      <ol className="flex items-center gap-3 mb-6" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s.title} className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full grid place-items-center text-sm font-semibold ${
                i === stepIdx ? "bg-primary text-white" : i < stepIdx ? "bg-secondary text-white" : "bg-gray-200 text-text/70"
              }`}
              aria-current={i === stepIdx ? "step" : undefined}
            >
              {i + 1}
            </div>
            <span className={`text-sm ${i === stepIdx ? "text-text font-medium" : "text-text/70"}`}>{s.title}</span>
            {i !== steps.length - 1 && <span className="mx-1 text-text/30">—</span>}
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-black/5 bg-white p-5">
        {steps[stepIdx]?.render?.(renderCtx)}
      </div>

      {errors?.length > 0 && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 text-red-800 px-4 py-3"
        >
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {errors.map((e, idx) => (
              <li key={idx}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className="px-4 py-2 rounded-xl bg-gray-200 text-text/80 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={isLast && !canFinish}
          className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLast ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
