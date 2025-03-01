import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [weight, setWeight] = useState("");
  const [distance, setDistance] = useState("");
  const [speed, setSpeed] = useState("standard");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      " https://f7cb-34-82-71-132.ngrok-free.app/estimate",
      {
        // Replace with your ngrok URL
        weight: parseFloat(weight),
        distance: parseFloat(distance),
        speed: speed,
      }
    );
    setResult(response.data);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>AI Shipping Cost Estimator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Distance (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
        />
        <select value={speed} onChange={(e) => setSpeed(e.target.value)}>
          <option value="standard">Standard</option>
          <option value="express">Express</option>
        </select>
        <button type="submit">Estimate</button>
      </form>

      {result && (
        <div>
          <h3>Estimated Cost: ${result.estimated_cost}</h3>
          <h3>
            Best Carrier: {result.best_carrier} (${result.carrier_cost})
          </h3>
        </div>
      )}
    </div>
  );
}
