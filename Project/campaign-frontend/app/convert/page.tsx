"use client";

import { useState } from "react";
import axios from "axios";

export default function Convert() {
  const [usd, setUsd] = useState("");
  const [eur, setEur] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    if (!usd) return setError("Enter a USD value!");
    setError("");
    try {
      const res = await axios.get(
        `https://api.exchangerate.host/convert?from=USD&to=EUR&amount=${usd}`
      );
      setEur(res.data.result);
    } catch (err) {
      console.error(err);
      setError("Conversion failed.");
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: "0 auto" }}>
      <h1>USD → EUR Converter</h1>
      <input
        type="number"
        placeholder="USD"
        value={usd}
        onChange={(e) => setUsd(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <button onClick={handleConvert} style={{ padding: "10px 20px" }}>
        Convert
      </button>
      {eur !== null && (
        <p>
          {usd} USD = {eur.toFixed(2)} EUR
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
