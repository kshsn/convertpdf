// Paddle Billing (paddle.js v2) helpers.
// Price IDs and the client token come from public env vars so they can be set
// per-environment without changing code. Server secrets (API key, webhook
// secret) are never referenced here.

export type BillingCycle = "monthly" | "annual";

export interface PlanTier {
  id: "free" | "pro" | "business";
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  highlighted: boolean;
  features: string[];
  cta: string;
}

export const PLANS: PlanTier[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For occasional use",
    priceMonthly: 0,
    priceAnnual: 0,
    highlighted: false,
    cta: "Current plan",
    features: [
      "All PDF tools",
      "Up to 10 MB per file",
      "2 files per batch",
      "Ads supported",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For professionals",
    priceMonthly: 7.99,
    priceAnnual: 59.99,
    highlighted: true,
    cta: "Go Pro",
    features: [
      "Everything in Free",
      "Up to 100 MB per file",
      "Unlimited batch processing",
      "No ads",
      "Priority processing",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "For teams & developers",
    priceMonthly: 19.99,
    priceAnnual: 149.99,
    highlighted: false,
    cta: "Get Business",
    features: [
      "Everything in Pro",
      "Up to 500 MB per file",
      "API access",
      "Priority support queue",
    ],
  },
];

// Resolve the Paddle price ID for a given tier + billing cycle.
export function priceIdFor(
  tier: PlanTier["id"],
  cycle: BillingCycle,
): string | undefined {
  if (tier === "pro") {
    return cycle === "annual"
      ? process.env.NEXT_PUBLIC_PADDLE_PRO_ANNUAL_PRICE_ID
      : process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID;
  }
  if (tier === "business") {
    return cycle === "annual"
      ? process.env.NEXT_PUBLIC_PADDLE_BIZ_ANNUAL_PRICE_ID
      : process.env.NEXT_PUBLIC_PADDLE_BIZ_PRICE_ID;
  }
  return undefined;
}
