import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#fff",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Link
        href="/"
        style={{
          fontWeight: 700,
          fontSize: "1.75rem",
          textDecoration: "none",
          color: "#111",
          letterSpacing: "-0.5px",
        }}
      >
        ZarApp
      </Link>

      <Link href="/cart" style={{ position: "relative", fontSize: "1.75rem", color: "#111" }}>
        🛒
        {cart.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-10px",
              backgroundColor: "#e11d48",
              color: "#fff",
              borderRadius: "999px",
              padding: "0.15rem 0.5rem",
              fontSize: "0.75rem",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  );
}
