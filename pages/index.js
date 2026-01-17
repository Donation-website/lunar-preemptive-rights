import { useState } from "react";

// Hexagon SVG helper
const Hexagon = ({ x, y, size, color, text, onClick, disabled }) => {
  const h = Math.sqrt(3) * size; // magasság
  const points = [
    [x + size * 0.5, y],
    [x + size * 1.5, y],
    [x + 2 * size, y + h / 2],
    [x + size * 1.5, y + h],
    [x + size * 0.5, y + h],
    [x, y + h / 2],
  ]
    .map((p) => p.join(","))
    .join(" ");
  return (
    <g onClick={disabled ? null : onClick} style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
      <polygon points={points} fill={color} stroke="black" strokeWidth="1" />
      <text
        x={x + size}
        y={y + h / 2 + 5}
        textAnchor="middle"
        fontSize="10"
        fill="white"
        pointerEvents="none"
      >
        {text}
      </text>
    </g>
  );
};

export default function Home() {
  // 90 parcellát definiálunk
  const parcels = Array.from({ length: 90 }, (_, i) => {
    const id = (i + 1).toString().padStart(3, "0");
    const occupied = i < 10; // első 10 foglalt
    const size = Math.floor(Math.random() * 5) + 1; // 1-5 km²
    const price = size * 5000; // USD
    const lat = (Math.random() * 180 - 90).toFixed(2);
    const lng = (Math.random() * 360 - 180).toFixed(2);
    return {
      id,
      status: occupied ? "Occupied" : "Available",
      holder: occupied ? "American Celestial Research Ltd." : "Unassigned",
      size,
      price,
      lat,
      lng,
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

  // Hex grid pozíciók
  const hexSize = 20;
  const hexGap = 5;
  const cols = 10;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "20px" }}>
      <h1>Reserve Your Place on the Moon 🌕</h1>
      <p>Secure a speculative pre-emptive position today. No ownership is granted.</p>

      <svg
        width={800}
        height={600}
        style={{ borderRadius: "10px", backgroundImage: 'url("/moon/moon-map.jpg")', backgroundSize: "cover" }}
      >
        {parcels.map((parcel, idx) => {
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          const x = col * (hexSize * 1.75) + Math.random() * 10; // kis random eltolás
          const y = row * (Math.sqrt(3) * hexSize + hexGap) + Math.random() * 10;
          const color = parcel.status === "Available" ? "rgba(0,128,0,0.6)" : "rgba(255,0,0,0.6)";
          return (
            <Hexagon
              key={parcel.id}
              x={x}
              y={y}
              size={hexSize}
              color={color}
              text={`${parcel.id}`}
              onClick={() => handleParcelClick(parcel)}
              disabled={parcel.status === "Occupied"}
            />
          );
        })}
      </svg>

      <div style={{ marginTop: "20px" }}>
        <h3>Selected Parcel:</h3>
        {selectedParcel ? (
          <p>
            {selectedParcel.id} - {selectedParcel.status} - {selectedParcel.holder} - {selectedParcel.size} km² - $
            {selectedParcel.price} - Lat: {selectedParcel.lat}, Lng: {selectedParcel.lng}
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
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
            Instagram
          </a>
        </div>
        <p>© 2026 Lunar Pre-Emptive Rights. Conceptual initiative.</p>
      </footer>
    </div>
  );
}
