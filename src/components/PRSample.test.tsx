import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PRSample from "./PRSample";

describe("PRSample Component", () => {
  it("renders initial count and increments on click", () => {
    render(<PRSample initial={2} />);

    expect(screen.getByText(/Current count:/i)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: /increment/i });
    fireEvent.click(btn);

    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
