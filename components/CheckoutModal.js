import { useState } from 'react';

export default function CheckoutModal({ parcel, onClose }) {
  const [email, setEmail] = useState('');

  const handleCheckout = async () => {
    if (!email) return alert('Please enter your email!');
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parcelId: parcel.id, email })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="modal">
      <h2>Parcel #{parcel.id}</h2>
      <p>Price: ${parcel.price}</p>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleCheckout}>Proceed to Checkout</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
