const handleCheckout = async (parcelId) => {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ parcelId }),
  });

  const data = await res.json();
  if (data.id) {
    const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    stripe.redirectToCheckout({ sessionId: data.id });
  } else {
    alert(data.error || "Checkout failed");
  }
};
