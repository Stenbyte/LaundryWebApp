/* @vitest-environment jsdom */
import {
  render,
  screen,
  describe,
  it,
  expect,
  afterEach,
  vi,
} from "./test-util";
import { App } from "../App";
import axios from "axios";

describe("App", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("renders the app component", () => {
    vi.spyOn(axios, "request").mockResolvedValue({ data: {} });
    vi.spyOn(axios, "post").mockResolvedValue({
      data: {},
    });

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
