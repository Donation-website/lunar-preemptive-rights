import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { parcelId, price } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Lunar Pre-Emptive Parcel #${parcelId}`,
              description:
                "Speculative pre-emptive right. No ownership granted.",
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url:
        "https://YOURDOMAIN.vercel.app/?success=1",
      cancel_url:
        "https://YOURDOMAIN.vercel.app/?canceled=1",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
