import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          unit_amount: 9900,
          product_data: {
            name: "Lunar Pre-Emptive Right",
            description: "Speculative future-use registration. No ownership."
          }
        },
        quantity: 1
      }],
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?cancel=true`
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: "Stripe error" });
  }
}
