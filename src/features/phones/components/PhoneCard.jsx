import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function PhoneCard({ phone }) {
  return (
    <Link
      href={`/phone/${phone.id}`}
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
        justifyContent: "flex-start",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
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
          src={phone.imageUrl}
          alt={`${phone.brand} ${phone.name}`}
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
          {phone.brand}
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
          {phone.name}
        </p>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {phone.basePrice} €
        </p>
      </div>
    </Link>
  );
}
