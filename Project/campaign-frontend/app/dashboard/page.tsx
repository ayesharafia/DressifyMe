"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`${API}/campaigns/`);
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch campaigns for dashboard.");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Count campaigns by status
  const statusCounts = campaigns.reduce(
    (acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "# of campaigns",
        data: Object.values(statusCounts),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <div style={{ padding: 30, maxWidth: 600, margin: "0 auto" }}>
      <h1>Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {campaigns.length === 0 ? (
        <p>No campaigns available for dashboard.</p>
      ) : (
        <Pie data={data} />
      )}
    </div>
  );
}
