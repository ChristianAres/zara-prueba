import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          paddingTop: "32px",
          paddingBottom: "32px",
          paddingLeft: "16px",
          paddingRight: "16px",
          fontFamily: "Arial, sans-serif",
          color: "#111",
        }}
      >
        {children}
      </main>
    </>
  );
}
