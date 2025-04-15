import { useRouter } from "next/router";
import React, { useState } from "react";
import PhoneCard from "@/features/phones/components/PhoneCard";
import api from "@/lib/api";

export default function Home({ phones, query }) {
  const router = useRouter();
  const [search, setSearch] = useState(query);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/?q=${encodeURIComponent(search)}`);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Catálogo de Teléfonos</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por nombre o marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            margin: "1rem 0",
            width: "100%",
            maxWidth: "500px",
          }}
        />
      </form>

      <p>{phones.length} resultados encontrados</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 344px)",
          gap: "24px",
          justifyContent: "center",
        }}
      >
        {phones.map((phone, index) => (
          <PhoneCard key={`${phone.id}-${phone.name}-${index}`} phone={phone} />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const searchQuery = context.query.q || "";
  try {
    const response = await api.get(
      `/products?limit=20&search=${encodeURIComponent(searchQuery)}`
    );

    return {
      props: {
        phones: response.data,
        query: searchQuery,
      },
    };
  } catch (error) {
    console.error("Error fetching phones:", error.message);
    return {
      props: {
        phones: [],
        query: searchQuery,
      },
    };
  }
}
