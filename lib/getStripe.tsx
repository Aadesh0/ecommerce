import { loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<any> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      throw new Error("Stripe publishable key is not defined.");
    }

    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};

export default getStripe;
