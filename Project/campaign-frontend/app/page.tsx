"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

type Campaign = {
  id: number;
  name: string;
  platform: string;
  budget: number;
  status: string;
};

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [form, setForm] = useState({
    name: "",
    platform: "Meta",
    budget: "",
    status: "Active",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  // Fetch campaigns from backend
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get<Campaign[]>(`${API}/campaigns/`);
      setCampaigns(res.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch campaigns.");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Handle form submit (Create / Update)
  const handleSubmit = async () => {
    try {
      if (!form.name || !form.budget) {
        setError("Name and Budget are required!");
        return;
      }

      const payload = {
        ...form,
        budget: parseFloat(form.budget), // convert string to number
      };

      if (editId) {
        await axios.put(`${API}/campaigns/${editId}/`, payload);
        setEditId(null);
      } else {
        await axios.post(`${API}/campaigns/`, payload);
      }

      setForm({ name: "", platform: "Meta", budget: "", status: "Active" });
      setError("");
      fetchCampaigns();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.budget ? `Budget: ${err.response.data.budget}` : "Submission failed!");
    }
  };

  // Edit a campaign
  const handleEdit = (c: Campaign) => {
    setForm({
      name: c.name,
      platform: c.platform,
      budget: c.budget.toString(), // convert number to string for input
      status: c.status,
    });
    setEditId(c.id);
  };

  // Delete a campaign
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;

    try {
      await axios.delete(`${API}/campaigns/${id}/`);
      fetchCampaigns();
    } catch (err) {
      console.error(err);
      setError("Failed to delete campaign.");
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 600, margin: "0 auto" }}>
      <h1>Campaign Tracker</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 20 }}>
        <h2>{editId ? "Edit Campaign" : "Add Campaign"}</h2>
        <input
          type="text"
          placeholder="Campaign Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="number"
          placeholder="Budget"
          value={form.budget}
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <select
          value={form.platform}
          onChange={(e) => setForm({ ...form, platform: e.target.value })}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        >
          <option>Meta</option>
          <option>Google</option>
          <option>Instagram</option>
        </select>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        >
          <option>Active</option>
          <option>Paused</option>
          <option>Completed</option>
        </select>
        <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
          {editId ? "Update Campaign" : "Create Campaign"}
        </button>
      </div>

      <h2>Campaign List</h2>
      {campaigns.length === 0 && <p>No campaigns yet.</p>}
      {campaigns.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        >
          <strong>{c.name}</strong> | {c.platform} | ${c.budget} | {c.status}
          <br />
          <button onClick={() => handleEdit(c)} style={{ marginRight: 10 }}>
            Edit
          </button>
          <button onClick={() => handleDelete(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
