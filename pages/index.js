import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState(false);

  async function buy() {
    if (!selected) {
      alert("Please select a parcel on the map first.");
      return;
    }

    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Payment initialization failed");
    }
  }

  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
      </Head>

      <main style={{ padding: "40px", color: "#fff", background: "#000" }}>
        <h1>Reserve Your Place on the Moon</h1>
        <p>
          Humanity is returning to the Moon. Laws will follow.
          Secure a documented speculative position today.
        </p>

        <h2>Select a Lunar Parcel</h2>

        <img
          src="/moon.jpg"
          alt="Lunar map"
          style={{
            width: "100%",
            maxWidth: "600px",
            border: selected ? "3px solid #4da3ff" : "3px solid #333",
            cursor: "pointer"
          }}
          onClick={() => setSelected(true)}
        />

        {selected && <p style={{ color: "#4da3ff" }}>Parcel selected</p>}

        <button
          onClick={buy}
          style={{
            marginTop: "30px",
            padding: "15px 25px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Acquire Pre-Emptive Right
        </button>

        <footer style={{ marginTop: "60px", fontSize: "13px", opacity: 0.7 }}>
          <p>
            No ownership is granted. This service is speculative under the
            Outer Space Treaty (1967).
          </p>

          <p>© 2026 Lunar Pre-Emptive Rights</p>
        </footer>
      </main>
    </>
  );
}
