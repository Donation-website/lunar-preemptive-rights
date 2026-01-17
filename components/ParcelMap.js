import React, { useState, useEffect } from "react";

export default function ParcelMap({ parcels, onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (parcel) => {
    if (!parcel.available) return; // piros: nem kattintható
    setSelected(parcel.id);
    onSelect(parcel);
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "8192px" }}>
      <img
        src="/moon/moon-map.jpg"
        alt="Moon Map"
        style={{ width: "100%", display: "block" }}
      />
      {parcels.map((p) => (
        <div
          key={p.id}
          onClick={() => handleClick(p)}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: "2%",
            paddingBottom: "2%",
            backgroundColor: p.available ? "green" : "red",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            cursor: p.available ? "pointer" : "not-allowed",
            border: selected === p.id ? "2px solid yellow" : "none",
          }}
          title={`Parcel #${p.id}\n${p.size} m²\nPrice: $${p.price}`}
        />
      ))}
    </div>
  );
}
