/* @vitest-environment jsdom */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "./test-util";
import { App } from "../App";

afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

describe("App", () => {
  it("renders the app component", () => {
    render(<App />);
    expect(screen.getByText("LB")).toBeDefined();
    expect(screen.getByTestId("logo")).toBeDefined();
    expect(screen.getByTestId("login-title")).toBeDefined();
    expect(screen.getByTestId("email")).toBeDefined();
    expect(screen.getByTestId("login-btn")).toBeDefined();
    expect(screen.getByText("Don't have an account ?")).toBeDefined();
    expect(screen.getByTestId("signup-btn")).toBeDefined();
  });
});
