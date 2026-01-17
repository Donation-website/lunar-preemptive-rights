import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

// Demo parcels (90 parcel, random)
const initialParcels = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  status: Math.random() < 0.3 ? "occupied" : "available",
  holder: Math.random() < 0.3 ? "American Celestial Research Ltd." : null,
  price: Math.floor(Math.random() * 5000) + 1000, // $1000-$6000
}));

export default function Home() {
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);

  useEffect(() => {
    const mapWidth = 1000;
    const mapHeight = 500;
    const hexSize = 30;

    function isOverlapping(x, y, others) {
      return others.some(
        (p) => Math.hypot(p.x - x, p.y - y) < hexSize * 2
      );
    }

    const positioned = [];
    initialParcels.forEach((p) => {
      let x, y;
      let attempts = 0;
      do {
        x = Math.random() * (mapWidth - hexSize * 2) + hexSize;
        y = Math.random() * (mapHeight - hexSize * 2) + hexSize;
        attempts++;
      } while (isOverlapping(x, y, positioned) && attempts < 100);
      positioned.push({ ...p, x, y });
    });

    setParcels(positioned);
  }, []);

  function handleParcelClick(parcel) {
    if (parcel.status === "occupied") return;
    setSelectedParcel(parcel);
  }

  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
      </Head>
      <main style={{ textAlign: "center" }}>
        <h1>Reserve Your Place on the Moon</h1>
        <p>
          Humanity is returning to the Moon. Secure a documented speculative
          position today. No ownership granted under current law.
        </p>

        <div style={{ position: "relative", width: 1000, height: 500, margin: "auto" }}>
          <Image
            src="/moon/moon-map.jpg"
            alt="Moon map"
            layout="fill"
            objectFit="cover"
          />
          {parcels.map((p) => (
            <div
              key={p.id}
              onClick={() => handleParcelClick(p)}
              title={`Parcel #${p.id} - $${p.price}${p.status === "occupied" ? " (Occupied)" : ""}`}
              style={{
                position: "absolute",
                width: 30,
                height: 30,
                left: p.x - 15,
                top: p.y - 15,
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", // hexagon
                backgroundColor:
                  p.status === "occupied"
                    ? "red"
                    : selectedParcel?.id === p.id
                    ? "blue"
                    : "green",
                cursor: p.status === "occupied" ? "not-allowed" : "pointer",
                border: "2px solid #fff",
              }}
            />
          ))}
        </div>

        {selectedParcel && (
          <div style={{ marginTop: 20 }}>
            <h3>Selected Parcel #{selectedParcel.id}</h3>
            <p>Price: ${selectedParcel.price}</p>
            <button
              onClick={() => alert(`Proceed to checkout for parcel #${selectedParcel.id}`)}
            >
              Acquire Pre-Emptive Right
            </button>
          </div>
        )}
      </main>
    </>
  );
}
