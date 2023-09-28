{
  /*import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1NuC2YSEclRqXRJJ2AGYpUcY" },
          { shipping_rate: "shr_1NuC59SEclRqXRJJhoJ42kSq" },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/h0674al2/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),

        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
*/
}
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "";

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-08-16" });
interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: {
    asset: {
      _ref: string;
    };
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1NuC2YSEclRqXRJJ2AGYpUcY" },
          { shipping_rate: "shr_1NuC59SEclRqXRJJhoJ42kSq" },
        ],
        line_items: (req.body as CartItem[]).map((item) => {
          //console.log("item.image[0].asset._ref:", item.image[0].asset._ref);
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace("image-", "https://cdn.sanity.io/images/h0674al2/dattaa/")
            .replace("-webp", ".webp");

          //console.log(newImage);
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json(err.message);
      } else {
        res.status(500).json("An unknown error occurred");
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
