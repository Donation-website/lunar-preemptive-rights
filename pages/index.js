import { useState } from "react";

export default function Home() {
  // 90 parcellát definiálunk: id, status, holder, size (km²), price (USD)
  const parcels = Array.from({ length: 90 }, (_, i) => {
    const id = (i + 1).toString().padStart(3, "0");
    // példa: 10 már foglalt, többi szabad
    const occupied = i < 10;
    const size = Math.floor(Math.random() * 5) + 1; // 1-5 km²
    const price = size * 5000; // 1 km² = 5000 USD, növekvő ár
    return {
      id,
      status: occupied ? "Occupied" : "Available",
      holder: occupied ? "American Celestial Research Ltd." : "Unassigned",
      size,
      price,
    };
  });

  const [selectedParcel, setSelectedParcel] = useState(null);

  const handleParcelClick = (parcel) => {
    if (parcel.status === "Occupied") return;
    setSelectedParcel(parcel);
  };

  const handlePayment = async () => {
    if (!selectedParcel) {
      alert("Please select a parcel first.");
      return;
    }
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parcelId: selectedParcel.id, price: selectedParcel.price }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Payment initialization failed.");
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed. Check your API key!");
    }
  };

  // Parcellák pozíciói a térképen (példa)
  const positions = parcels.map((_, i) => ({
    top: 50 + (i % 10) * 40,
    left: 50 + Math.floor(i / 10) * 60,
  }));

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "20px" }}>
      <h1>Reserve Your Place on the Moon 🌕</h1>
      <p>Secure a speculative pre-emptive position today. No ownership is granted.</p>

      <h2>Lunar Surface Map</h2>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img src="/moon/moon-map.jpg" alt="Lunar Map" style={{ width: "800px", borderRadius: "10px" }} />
        {parcels.map((parcel, idx) => (
          <div
            key={parcel.id}
            onClick={() => handleParcelClick(parcel)}
            style={{
              position: "absolute",
              top: positions[idx].top,
              left: positions[idx].left,
              width: `${20 + parcel.size * 5}px`, // méret szerint változó kör
              height: `${20 + parcel.size * 5}px`,
              borderRadius: "50%",
              backgroundColor: parcel.status === "Available" ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.5)",
              border: selectedParcel?.id === parcel.id ? "3px solid gold" : "none",
              cursor: parcel.status === "Available" ? "pointer" : "not-allowed",
            }}
            title={`Parcel ${parcel.id} - ${parcel.status} - ${parcel.size} km² - $${parcel.price}`}
          ></div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Selected Parcel:</h3>
        {selectedParcel ? (
          <p>
            {selectedParcel.id} - {selectedParcel.status} - {selectedParcel.holder} -{" "}
            {selectedParcel.size} km² - ${selectedParcel.price}
          </p>
        ) : (
          <p>None</p>
        )}
      </div>

      <button
        onClick={handlePayment}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#1a73e8",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Acquire Pre-Emptive Right
      </button>

      <footer style={{ marginTop: "50px", fontSize: "14px" }}>
        <div>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>Instagram</a>
        </div>
        <p>© 2026 Lunar Pre-Emptive Rights. Conceptual initiative.</p>
      </footer>
    </div>
  );
}
