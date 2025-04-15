import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartPage from "../../pages/cart";
import { CartProvider } from "@/context/CartContext";

const mockItem = {
  id: "SMG-S24U-violet-256GB",
  name: "Galaxy S24 Ultra",
  brand: "Samsung",
  color: "Violet",
  storage: "256GB",
  price: 1429,
  image: "https://via.placeholder.com/150",
};

describe("CartPage", () => {
  beforeEach(() => {
    localStorage.setItem("cart", JSON.stringify([mockItem]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("muestra un producto en el carrito", () => {
    render(
      <CartProvider>
        <CartPage />
      </CartProvider>
    );

    expect(screen.getByText(/Galaxy S24 Ultra/i)).toBeInTheDocument();
    expect(screen.getByText(/1429 €/i)).toBeInTheDocument();
    expect(screen.getByText(/Color: Violet/i)).toBeInTheDocument();
    expect(screen.getByText(/Almacenamiento: 256GB/i)).toBeInTheDocument();
  });

  it("elimina un producto del carrito", () => {
    render(
      <CartProvider>
        <CartPage />
      </CartProvider>
    );

    const button = screen.getByText(/eliminar/i);
    fireEvent.click(button);

    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });
});
