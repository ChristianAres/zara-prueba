import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import PhoneCard from "./PhoneCard";

export default function PhoneList() {
  const [phones, setPhones] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const { data } = await api.get(`/phones?limit=20`);
        setPhones(data);
        setFiltered(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching phones:", err);
      }
    };

    fetchPhones();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(phones);
    } else {
      const term = search.toLowerCase();
      setFiltered(
        phones.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term)
        )
      );
    }
  }, [search, phones]);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "1.1rem", color: "#888" }}>Cargando teléfonos...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "calc(3 * 344px + 2 * 24px)",
        margin: "0 auto",
        padding: "24px 0",
      }}
    >
      <div style={{ marginBottom: "2rem", padding: "0 16px" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 500,
            margin: 0,
          }}
        >
          Catálogo de Teléfonos
        </h2>

        <input
          type="text"
          placeholder="Buscar por nombre o marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "0.95rem",
            width: "100%",
            boxSizing: "border-box",
          }}
        />

        <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "0.75rem" }}>
          {filtered.length} resultado{filtered.length !== 1 && "s"} encontrado
          {filtered.length !== 1 && "s"}.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 344px)",
          gap: "24px",
          justifyContent: "center",
        }}
      >
        {filtered.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </div>
  );
}
