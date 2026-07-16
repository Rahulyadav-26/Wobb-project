import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PRSampleToggle from "./PRSampleToggle";

describe("PRSampleToggle Component", () => {
  it("renders initial state and toggles on click", () => {
    render(<PRSampleToggle initial={false} />);

    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText("Off")).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: /toggle/i });
    fireEvent.click(btn);

    expect(screen.getByText("On")).toBeInTheDocument();
  });
});
