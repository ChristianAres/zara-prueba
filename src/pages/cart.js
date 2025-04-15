import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, setCart } = useCart();

  const removeFromCart = (productId, color, storage) => {
    const updatedCart = cart
      .map((item) => {
        if (
          item.productId === productId &&
          item.color === color &&
          item.storage === storage
        ) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter(Boolean);

    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

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
      <h1 style={{ fontSize: "1.5rem", fontWeight: 500, marginBottom: "2rem" }}>
        Carrito de compra
      </h1>

      {cart.length === 0 ? (
        <p style={{ fontSize: "1rem", color: "#666" }}>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "24px" }}>
            {cart.map((item, index) => (
              <li
                key={`${item.productId}-${item.color}-${item.storage}-${index}`}
                style={{
                  border: "0.5px solid #000",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "16px",
                  gap: "16px",
                }}
              >
                <div style={{ width: "100px", height: "100px", backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 500, margin: 0 }}>
                    {item.brand} {item.name}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#555", margin: "4px 0" }}>
                    {item.color} — {item.storage}
                  </p>
                  <p style={{ fontSize: "0.9rem", fontWeight: "bold", margin: "8px 0" }}>
                    {item.price.toFixed(2)} € x {item.quantity || 1} ={" "}
                    {(item.price * (item.quantity || 1)).toFixed(2)} €
                  </p>
                  <button
                    onClick={() =>
                      removeFromCart(item.productId, item.color, item.storage)
                    }
                    style={{
                      padding: "6px 12px",
                      fontSize: "0.85rem",
                      border: "1px solid #000",
                      backgroundColor: "#fff",
                      color: "#000",
                      borderRadius: "0px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "48px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Total: {totalPrice.toFixed(2)} €
            </h2>
            <div style={{ display: "flex", gap: "12px" }}>
              <Link href="/">
                <button
                  style={{
                    padding: "12px 24px",
                    fontSize: "1rem",
                    border: "1px solid #000",
                    backgroundColor: "#fff",
                    color: "#000",
                    borderRadius: "0px",
                    cursor: "pointer",
                  }}
                >
                  ← Seguir comprando
                </button>
              </Link>
              <button
                onClick={() => alert("Aquí iría el proceso de pago.")}
                style={{
                  padding: "12px 24px",
                  fontSize: "1rem",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0px",
                  cursor: "pointer",
                }}
              >
                Finalizar compra →
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
