import { useEffect, useState } from "react";
import { parcels as initialParcels } from "../lib/parcels";

export default function Home() {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    const mapWidth = 1000; // hold-map.jpg szélesség pixelben
    const mapHeight = 500; // hold-map.jpg magasság pixelben
    const hexSize = 30; // hexagon sugar

    function isOverlapping(x, y, others) {
      return others.some(p => Math.hypot(p.x - x, p.y - y) < hexSize * 2);
    }

    const positioned = initialParcels.map((p, index, arr) => {
      let x, y;
      let attempts = 0;
      do {
        x = Math.random() * (mapWidth - hexSize * 2) + hexSize;
        y = Math.random() * (mapHeight - hexSize * 2) + hexSize;
        attempts++;
      } while (isOverlapping(x, y, positioned || []) && attempts < 100);
      return { ...p, x, y };
    });

    setParcels(positioned);
  }, []);

  function buyParcel(id) {
    const name = prompt("Enter your name for this parcel (optional):");
    setParcels(parcels.map(p =>
      p.id === id ? { ...p, holder: name || "Anonymous" } : p
    ));
    alert("Purchase successful!");
  }

  return (
    <div style={{ position: "relative", width: "1000px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Reserve Your Place on the Moon</h1>
      <p style={{ textAlign: "center" }}>
        Select a parcel and secure a speculative pre-emptive right. No property is granted today.
      </p>
      <img src="/moon/moon-map.jpg" alt="Lunar Map" width="100%" />
      {parcels.map(p => (
        <div
          key={p.id}
          onClick={() => !p.holder && buyParcel(p.id)}
          style={{
            position: "absolute",
            left: p.x - 20,
            top: p.y - 20,
            width: 40,
            height: 40,
            backgroundColor: p.holder ? "red" : "green",
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            cursor: p.holder ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "10px",
            textAlign: "center",
          }}
          title={`Parcel #${p.id}\nSize: ${p.size} sqm\nPrice: $${p.price}\n${p.holder ? "Occupied by: " + p.holder : "Available"}`}
        >
          {p.id}
        </div>
      ))}
    </div>
  );
}
