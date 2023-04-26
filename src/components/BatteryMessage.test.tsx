import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import BatteryMessage from "./BatteryMessage";

describe("BatteryMessage", () => {
  it("should render the message when the hide-battery-message session storage value is false", () => {
    render(<BatteryMessage />);

    expect(screen.queryByText(/Battery level critical!/i)).toBeInTheDocument();
  });

  it("should hide the message when the hide-battery-message session storage value is true", () => {
    sessionStorage.setItem("hide-battery-message", JSON.stringify(true));
    render(<BatteryMessage />);

    expect(
      screen.queryByText(/Battery level critical!/i)
    ).not.toBeInTheDocument();
  });
});
