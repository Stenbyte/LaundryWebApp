/* @vitest-environment jsdom */
import { render, screen } from "./test-util";
import { describe, it, expect } from "vitest";
import { App } from "../App";

describe("App", () => {
  it("renders the app component", () => {
    render(<App />);
    expect(screen.getByText("LB")).toBeDefined();
    expect(screen.findAllByTestId("logo")).toBeDefined();
    expect(screen.findAllByTestId("login-title")).toBeDefined();
    expect(screen.findAllByTestId("email")).toBeDefined();
    expect(screen.findAllByTestId("login-btn")).toBeDefined();
    expect(screen.getByText("Don't have an account ?")).toBeDefined();
    expect(screen.findAllByTestId("signup-btn")).toBeDefined();
  });
});
