import api from "@/lib/api";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function PhoneDetail({ product }) {
  const { cart, setCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);

  const selectedColorImage =
    product.colorOptions.find((opt) => opt.name === selectedColor)?.imageUrl ||
    product.colorOptions[0]?.imageUrl;

  const selectedStoragePrice =
    product.storageOptions.find((opt) => opt.capacity === selectedStorage)
      ?.price || 0;

  const finalPrice = product.basePrice + selectedStoragePrice;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;

    const item = {
      id: `${product.id}-${selectedColor}-${selectedStorage}`,
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: finalPrice,
      color: selectedColor,
      storage: selectedStorage,
      image: selectedColorImage,
      quantity: 1,
    };

    setCart([...cart, item]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.id]);

  return (
    <main
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "32px 16px",
        fontFamily: "Arial, sans-serif",
        color: "#111",
      }}
    >
      <h1
        style={{ fontSize: "1.75rem", fontWeight: 500, marginBottom: "1.5rem" }}
      >
        <span
          style={{
            display: "block",
            fontSize: "0.85rem",
            color: "#888",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {product.brand}
        </span>
        {product.name}
      </h1>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          width: "100%",
          aspectRatio: "1 / 1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <Image
          src={selectedColorImage}
          alt={product.name}
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <div>
          <label style={{ fontSize: "0.95rem", fontWeight: 500 }}>Color</label>
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            {product.colorOptions.map((opt) => (
              <button
                key={opt.name}
                onClick={() => setSelectedColor(opt.name)}
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: opt.hexCode,
                  border:
                    selectedColor === opt.name
                      ? "2px solid #000"
                      : "1px solid #ccc",
                  borderRadius: "0px",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: "0.95rem", fontWeight: 500 }}>
            Almacenamiento
          </label>
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            {product.storageOptions.map((opt) => (
              <button
                key={opt.capacity}
                onClick={() => setSelectedStorage(opt.capacity)}
                style={{
                  padding: "8px 16px",
                  fontSize: "0.9rem",
                  borderRadius: "0px",
                  backgroundColor:
                    selectedStorage === opt.capacity ? "#000" : "#f0f0f0",
                  color: selectedStorage === opt.capacity ? "#fff" : "#111",
                  border:
                    selectedStorage === opt.capacity
                      ? "2px solid #000"
                      : "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {opt.capacity}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p
        style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "24px" }}
      >
        Precio final: {finalPrice} €
      </p>

      <button
        onClick={handleAddToCart}
        disabled={!selectedColor || !selectedStorage}
        style={{
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: 500,
          borderRadius: "0px",
          backgroundColor: !selectedColor || !selectedStorage ? "#ccc" : "#000",
          color: "#fff",
          border: "none",
          cursor:
            !selectedColor || !selectedStorage ? "not-allowed" : "pointer",
          width: "100%",
          maxWidth: "320px",
        }}
      >
        Añadir al carrito
      </button>

      {product.specs && (
        <div style={{ marginTop: "64px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 500,
              marginBottom: "1.5rem",
            }}
          >
            Especificaciones técnicas
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.95rem",
            }}
          >
            <tbody>
              {[
                ["Marca", product.brand],
                ["Nombre", product.name],
                ["Descripción", product.description],
                ["Pantalla", product.specs.screen],
                ["Resolución", product.specs.resolution],
                ["Procesador", product.specs.processor],
                ["Cámara principal", product.specs.mainCamera],
                ["Cámara selfie", product.specs.selfieCamera],
                ["Batería", product.specs.battery],
                ["Sistema operativo", product.specs.os],
                ["Frecuencia de refresco", product.specs.screenRefreshRate],
              ].map(([label, value]) => (
                <tr key={label} style={{ borderBottom: "0.5px solid #ccc" }}>
                  <td
                    style={{
                      textTransform: "uppercase",
                      padding: "12px 8px",
                      fontWeight: "bold",
                      verticalAlign: "top",
                      width: "30%",
                      color: "#111",
                    }}
                  >
                    {label}
                  </td>
                  <td
                    style={{
                      padding: "12px 8px",
                      verticalAlign: "top",
                      color: "#333",
                    }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {product.similarProducts?.length > 0 && (
        <div style={{ marginTop: "64px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 500,
              marginBottom: "1rem",
            }}
          >
            Productos similares
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 344px)",
              gap: "24px",
              justifyContent: "center",
            }}
          >
            {product.similarProducts.map((sim) => (
              <Link
                key={sim.id}
                href={`/phone/${sim.id}`}
                style={{
                  width: "344px",
                  height: "344px",
                  padding: "16px",
                  border: "0.5px solid #000",
                  backgroundColor: "#fff",
                  textDecoration: "none",
                  color: "#111",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "160px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <Image
                    src={sim.imageUrl}
                    alt={sim.name}
                    width={140}
                    height={140}
                    style={{ objectFit: "contain", maxHeight: "100%" }}
                    loading="lazy"
                  />
                </div>

                <div style={{ textAlign: "center", lineHeight: 1.4 }}>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#000",
                      textTransform: "uppercase",
                      margin: 0,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {sim.brand}
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      margin: "4px 0",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {sim.name}
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    {sim.basePrice} €
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const { data } = await api.get(`/products/${id}`);
    return { props: { product: data } };
  } catch (err) {
    console.error("Error al cargar producto:", err.message);
    return { props: { product: null } };
  }
}
