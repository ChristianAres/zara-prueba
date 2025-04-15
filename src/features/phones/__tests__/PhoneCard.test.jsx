import React from "react";
import { render, screen } from "@testing-library/react";
import PhoneCard from "../components/PhoneCard";

const phone = {
  id: "SMG-S24U",
  brand: "Samsung",
  name: "Galaxy S24 Ultra",
  basePrice: 1329,
  imageUrl: "https://via.placeholder.com/150",
};

describe("PhoneCard", () => {
  it("renderiza el nombre, marca y precio", () => {
    render(<PhoneCard phone={phone} />);

    expect(screen.getByText("Samsung Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("1329 €")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
