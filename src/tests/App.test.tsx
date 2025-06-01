/* @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render, screen } from "./test-util";
import { App } from "../App";

describe("App", () => {
  it("renders the app component", () => {
    render(<App />);
    expect(screen.getByText("LB")).toBeDefined();
    expect(screen.findByTestId("logo")).toBeDefined();
    expect(screen.findByTestId("login-title")).toBeDefined();
    expect(screen.findByTestId("email")).toBeDefined();
    expect(screen.findByTestId("login-btn")).toBeDefined();
    expect(screen.getByText("Don't have an account ?")).toBeDefined();
    expect(screen.findByTestId("signup-btn")).toBeDefined();
  });
});
