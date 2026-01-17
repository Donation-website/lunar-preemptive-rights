import { useState } from "react";

export default function Home() {
  const [selectedParcel, setSelectedParcel] = useState(null);

  const parcels = [
    { id: "001", status: "Occupied", holder: "American Celestial Research Ltd." },
    { id: "002", status: "Available", holder: "Unassigned" },
  ];

  const handlePurchase = async () => {
    if (!selectedParcel) {
      alert("Please select a parcel on the map first.");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parcelId: selectedParcel.id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment initialization failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem" }}>
      <h1>Reserve Your Place on the Moon</h1>
      <p>
        Humanity is returning to the Moon. Legal frameworks will evolve. Secure a documented speculative position today.
      </p>

      <img src="/moon.jpg" alt="Lunar Map" style={{ width: "100%", maxWidth: "600px", cursor: "pointer" }} />

      <h2>Available Parcels</h2>
      <ul>
        {parcels.map(p => (
          <li
            key={p.id}
            style={{
              cursor: "pointer",
              fontWeight: selectedParcel?.id === p.id ? "bold" : "normal",
            }}
            onClick={() => setSelectedParcel(p)}
          >
            Parcel #{p.id} - {p.status} {p.holder !== "Unassigned" ? `(Holder: ${p.holder})` : ""}
          </li>
        ))}
      </ul>

      <button onClick={handlePurchase} style={{ padding: "1rem", fontSize: "1rem", marginTop: "1rem" }}>
        Acquire Pre-Emptive Right
      </button>

      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        No ownership is granted under current international law (Outer Space Treaty, 1967).
      </p>

      <div style={{ marginTop: "2rem" }}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>{" | "}
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>{" | "}
        <a href="https://twitter.com" target="_blank" rel="noreferrer">X</a>
      </div>

      <footer style={{ marginTop: "2rem", fontSize: "0.8rem" }}>
        © 2026 Lunar Pre-Emptive Rights. Conceptual initiative.
      </footer>
    </div>
  );
}
