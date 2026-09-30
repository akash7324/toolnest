"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { CalculatorDefinition } from "@/lib/calculators/data";
import { CompletedTracker } from "@/components/dashboard/usage-tracker";

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const number = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(value);

const today = () => new Date().toISOString().slice(0, 10);

function Input({
  label,
  value,
  onChange,
  type = "number",
  min,
  step = "any",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      <input
        type={type}
        value={value}
        min={min}
        step={step}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
      />
    </label>
  );
}

function Result({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 dark:border-indigo-900 dark:bg-indigo-950/40">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-2xl font-black text-indigo-700 dark:text-indigo-300">
        {value}
      </p>
      {note && <p className="mt-1 text-xs text-[var(--muted)]">{note}</p>}
    </div>
  );
}

export function CalculatorShell({
  calculator,
}: {
  calculator: CalculatorDefinition;
}) {
  const [values, setValues] = useState<Record<string, string>>({
    endDate: today(),
    startDate: today(),
  });

  const set = (key: string) => (value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const reset = () =>
    setValues({
      endDate: today(),
      startDate: today(),
    });

  const result = useMemo(() => {
    const v = (key: string) => Number(values[key] || 0);

    switch (calculator.slug) {
      case "age-calculator": {
        if (!values.birthDate || !values.endDate) return null;

        const birth = new Date(`${values.birthDate}T00:00:00`);
        const end = new Date(`${values.endDate}T00:00:00`);

        if (birth > end) {
          return {
            error: "End date must be on or after the birth date.",
          };
        }

        let years = end.getFullYear() - birth.getFullYear();
        let months = end.getMonth() - birth.getMonth();
        let days = end.getDate() - birth.getDate();

        if (days < 0) {
          months -= 1;
          days += new Date(
            end.getFullYear(),
            end.getMonth(),
            0
          ).getDate();
        }

        if (months < 0) {
          years -= 1;
          months += 12;
        }

        return {
          items: [
            [
              "Exact age",
              `${years} years, ${months} months, ${days} days`,
            ],
          ],
        };
      }

      case "emi-calculator": {
        const principal = v("principal");
        const monthlyRate = v("rate") / 1200;
        const months = v("years") * 12;

        if (!principal || !monthlyRate || !months) return null;

        const emi =
          (principal *
            monthlyRate *
            Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);

        return {
          items: [
            ["Monthly EMI", money(emi)],
            ["Total interest", money(emi * months - principal)],
            ["Total payment", money(emi * months)],
          ],
        };
      }

      case "gst-calculator": {
        const amount = v("amount");
        const rate = v("rate");

        if (!amount || !rate) return null;

        const gst =
          values.mode === "remove"
            ? amount - amount / (1 + rate / 100)
            : (amount * rate) / 100;

        const base =
          values.mode === "remove" ? amount - gst : amount;

        return {
          items: [
            ["Base amount", money(base)],
            ["GST", money(gst)],
            [
              "Final amount",
              money(
                values.mode === "remove"
                  ? amount
                  : amount + gst
              ),
            ],
          ],
        };
      }

      case "percentage-calculator": {
        const mode = values.mode || "of";
        const a = v("a");
        const b = v("b");

        if (!a && !b) return null;

        if (mode === "of") {
          return {
            items: [
              [
                `${number(b)}% of ${number(a)}`,
                number((a * b) / 100),
              ],
            ],
          };
        }

        if (mode === "what") {
          return {
            items: [
              [
                `${number(a)} is what % of ${number(b)}`,
                b ? `${number((a / b) * 100)}%` : "—",
              ],
            ],
          };
        }

        return {
          items: [
            [
              "Percentage change",
              b ? `${number(((a - b) / b) * 100)}%` : "—",
            ],
          ],
        };
      }

      case "profit-loss-calculator": {
        const cost = v("cost");
        const sell = v("sell");

        if (!cost || !sell) return null;

        const diff = sell - cost;

        return {
          items: [
            [
              diff >= 0 ? "Profit" : "Loss",
              money(Math.abs(diff)),
            ],
            [
              diff >= 0 ? "Profit %" : "Loss %",
              `${number((Math.abs(diff) / cost) * 100)}%`,
            ],
          ],
        };
      }

      case "bmi-calculator": {
        const height = v("height") / 100;
        const weight = v("weight");

        if (!height || !weight) return null;

        const bmi = weight / (height * height);

        const category =
          bmi < 18.5
            ? "Underweight"
            : bmi < 25
              ? "Normal range"
              : bmi < 30
                ? "Overweight"
                : "Obesity";

        return {
          items: [
            ["BMI", number(bmi)],
            ["Category", category],
          ],
        };
      }

      case "date-difference-calculator": {
        if (!values.startDate || !values.endDate) return null;

        const start = new Date(
          `${values.startDate}T00:00:00`
        );
        const end = new Date(
          `${values.endDate}T00:00:00`
        );

        const days = Math.round(
          (end.getTime() - start.getTime()) / 86400000
        );

        return days < 0
          ? {
              error:
                "End date must be on or after the start date.",
            }
          : {
              items: [
                ["Days", number(days)],
                ["Weeks", number(days / 7)],
                ["Approx. months", number(days / 30.4375)],
              ],
            };
      }

      case "salary-calculator": {
        const gross = v("gross");
        const deductions = v("deductions");

        if (!gross) return null;

        return {
          items: [
            [
              "Estimated take-home",
              money(Math.max(0, gross - deductions)),
            ],
            ["Total deductions", money(deductions)],
            ["Gross salary", money(gross)],
          ],
        };
      }

      case "discount-calculator": {
        const price = v("price");
        const rate = v("rate");

        if (!price || !rate) return null;

        const discount = (price * rate) / 100;

        return {
          items: [
            ["You save", money(discount)],
            ["Final price", money(price - discount)],
            ["Discount", `${number(rate)}%`],
          ],
        };
      }

      case "sip-calculator": {
        const p = v("monthly");
        const annual = v("return");
        const years = v("years");

        if (!p || !annual || !years) return null;

        const r = annual / 1200;
        const n = years * 12;

        const fv = r
          ? p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
          : p * n;

        const invested = p * n;

        return {
          items: [
            ["Estimated value", money(fv)],
            ["Amount invested", money(invested)],
            ["Estimated gains", money(fv - invested)],
          ],
        };
      }

      default:
        return null;
    }
  }, [calculator.slug, values]);

const completed = result !== null && !("error" in result);
  const field = (
    key: string,
    label: string,
    options?: {
      type?: string;
      min?: string;
      step?: string;
    }
  ) => (
    <Input
      label={label}
      value={values[key] || ""}
      onChange={set(key)}
      {...options}
    />
  );

  let form: React.ReactNode;

  switch (calculator.slug) {
    case "age-calculator":
      form = (
        <div className="grid gap-5 sm:grid-cols-2">
          {field("birthDate", "Date of birth", {
            type: "date",
          })}
          {field("endDate", "Calculate age on", {
            type: "date",
          })}
        </div>
      );
      break;

    case "emi-calculator":
      form = (
        <div className="grid gap-5 sm:grid-cols-3">
          {field("principal", "Loan amount (₹)", {
            min: "0",
          })}
          {field("rate", "Annual interest (%)", {
            min: "0",
            step: "0.01",
          })}
          {field("years", "Loan tenure (years)", {
            min: "1",
            step: "1",
          })}
        </div>
      );
      break;

    case "gst-calculator":
      form = (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {field("amount", "Amount (₹)", {
              min: "0",
            })}
            {field("rate", "GST rate (%)", {
              min: "0",
              step: "0.01",
            })}
          </div>

          <div>
            <span className="mb-2 block text-sm font-semibold">
              Calculation
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setValues((v) => ({
                    ...v,
                    mode: "add",
                  }))
                }
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  values.mode !== "remove"
                    ? "bg-indigo-600 text-white"
                    : "border border-[var(--border)]"
                }`}
              >
                Add GST
              </button>

              <button
                type="button"
                onClick={() =>
                  setValues((v) => ({
                    ...v,
                    mode: "remove",
                  }))
                }
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  values.mode === "remove"
                    ? "bg-indigo-600 text-white"
                    : "border border-[var(--border)]"
                }`}
              >
                Remove GST
              </button>
            </div>
          </div>
        </div>
      );
      break;

    case "percentage-calculator":
      form = (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setValues((v) => ({
                  ...v,
                  mode: "of",
                }))
              }
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm"
            >
              X% of Y
            </button>

            <button
              type="button"
              onClick={() =>
                setValues((v) => ({
                  ...v,
                  mode: "what",
                }))
              }
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm"
            >
              X is what % of Y
            </button>

            <button
              type="button"
              onClick={() =>
                setValues((v) => ({
                  ...v,
                  mode: "change",
                }))
              }
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm"
            >
              % change
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {field("a", "First value")}
            {field("b", "Second value")}
          </div>
        </div>
      );
      break;

    case "profit-loss-calculator":
      form = (
        <div className="grid gap-5 sm:grid-cols-2">
          {field("cost", "Cost price (₹)", {
            min: "0",
          })}
          {field("sell", "Selling price (₹)", {
            min: "0",
          })}
        </div>
      );
      break;

    case "bmi-calculator":
      form = (
        <div className="grid gap-5 sm:grid-cols-2">
          {field("height", "Height (cm)", {
            min: "1",
            step: "0.1",
          })}
          {field("weight", "Weight (kg)", {
            min: "1",
            step: "0.1",
          })}
        </div>
      );
      break;

    case "date-difference-calculator":
      form = (
        <div className="grid gap-5 sm:grid-cols-2">
          {field("startDate", "Start date", {
            type: "date",
          })}
          {field("endDate", "End date", {
            type: "date",
          })}
        </div>
      );
      break;

    case "salary-calculator":
      form = (
        <div className="grid gap-5 sm:grid-cols-2">
          {field("gross", "Monthly gross salary (₹)", {
            min: "0",
          })}
          {field("deductions", "Monthly deductions (₹)", {
            min: "0",
          })}
        </div>
      );
      break;

    case "discount-calculator":
      form = (
        <div className="grid gap-5 sm:grid-cols-2">
          {field("price", "Original price (₹)", {
            min: "0",
          })}
          {field("rate", "Discount (%)", {
            min: "0",
            step: "0.01",
          })}
        </div>
      );
      break;

    case "sip-calculator":
      form = (
        <div className="grid gap-5 sm:grid-cols-3">
          {field("monthly", "Monthly investment (₹)", {
            min: "0",
          })}
          {field("return", "Expected annual return (%)", {
            min: "0",
            step: "0.01",
          })}
          {field("years", "Investment period (years)", {
            min: "1",
            step: "1",
          })}
        </div>
      );
      break;

    default:
      form = null;
  }

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-8">
      <CompletedTracker
        toolSlug={calculator.slug}
        enabled={completed}
      />

      <div className="space-y-5">{form}</div>

      <div className="mt-7 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      {result && (
        <div className="mt-8">
          {"error" in result ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              {result.error}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.items.map(([label, value]) => (
                <Result
                  key={label}
                  label={label}
                  value={value}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
