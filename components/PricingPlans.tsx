"use client";

import { useEffect, useState } from "react";
import { PLANS, priceIdFor, type BillingCycle } from "@/lib/paddle";

declare global {
  interface Window {
    Paddle?: {
      Environment: { set: (env: string) => void };
      Initialize: (opts: { token: string }) => void;
      Checkout: {
        open: (opts: {
          items: { priceId: string; quantity: number }[];
        }) => void;
      };
    };
  }
}

export default function PricingPlans() {
  const [cycle, setCycle] = useState<BillingCycle>("annual");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (!token) return;

    function init() {
      if (!window.Paddle) return;
      window.Paddle.Environment.set(
        process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox"
          ? "sandbox"
          : "production",
      );
      window.Paddle.Initialize({ token: token as string });
      setReady(true);
    }

    if (window.Paddle) {
      init();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, []);

  function checkout(tier: "pro" | "business") {
    const priceId = priceIdFor(tier, cycle);
    if (!priceId || !window.Paddle || !ready) {
      alert("Checkout is not available right now. Please try again shortly.");
      return;
    }
    window.Paddle.Checkout.open({ items: [{ priceId, quantity: 1 }] });
  }

  return (
    <div>
      {/* Billing cycle toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <button
          onClick={() => setCycle("monthly")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cycle === "monthly" ? "bg-red-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setCycle("annual")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cycle === "annual" ? "bg-red-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
        >
          Annual
          <span className="ml-1 text-xs text-green-600 font-semibold">
            Save ~37%
          </span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
        {PLANS.map((plan) => {
          const price =
            cycle === "annual" ? plan.priceAnnual : plan.priceMonthly;
          const suffix =
            plan.id === "free" ? "" : cycle === "annual" ? "/yr" : "/mo";
          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-6 flex flex-col ${plan.highlighted ? "border-red-500 shadow-lg ring-1 ring-red-200" : "border-gray-200"}`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.tagline}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">
                  ${price.toFixed(price % 1 === 0 ? 0 : 2)}
                </span>
                <span className="text-gray-500 text-sm">{suffix}</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-green-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              {plan.id === "free" ? (
                <button
                  disabled
                  className="w-full py-3 rounded-full border border-gray-300 text-gray-400 font-semibold cursor-default"
                >
                  {plan.cta}
                </button>
              ) : (
                <button
                  onClick={() => checkout(plan.id as "pro" | "business")}
                  className={`w-full py-3 rounded-full font-semibold transition-colors ${plan.highlighted ? "bg-red-600 hover:bg-red-700 text-white" : "border border-red-600 text-red-600 hover:bg-red-50"}`}
                >
                  {plan.cta}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
