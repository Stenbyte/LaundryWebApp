import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
  describe,
  it,
  expect,
  vi,
  afterEach
} from "./test-util";
import userEvent from "@testing-library/user-event";
import { SignUp } from "../components/login/SignUp";
import axios from "axios";
import { useUIContext } from "../context/UseUIContext";
import { useEffect } from "react";

describe("Signup", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });
  it("signup user", async () => {
    const mockedPost = vi.spyOn(axios, "post").mockResolvedValue({
      data: { success: true },
    });

    const Wrapper = () => {
      const { isSignUpOpen, dispatch } = useUIContext();
      useEffect(() => {
        dispatch({ type: "SET_SIGNUP", payload: true });
      }, [isSignUpOpen, dispatch]);

      return <SignUp />;
    };
    render(<Wrapper />);

    const firstNameWrapper = await screen.findByTestId("first-name");
    const lastNameWrapper = await screen.findByTestId("last-name");
    const emailWrapper = await screen.findByTestId("signup-email");
    const streetNameWrapper = await screen.findByTestId("street-name");
    const buildingNumberWrapper = await screen.findByTestId("house-number");

    const firstNameInput = within(firstNameWrapper).getByRole("textbox");
    const lastNameInput = within(lastNameWrapper).getByRole("textbox");
    const emailInput = within(emailWrapper).getByRole("textbox");
    const streetNameInput = within(streetNameWrapper).getByRole("textbox");
    const buildingNumberInput = within(buildingNumberWrapper).getByRole(
      "textbox"
    );

    await userEvent.type(firstNameInput, "test");
    await userEvent.type(lastNameInput, "testersen");
    await userEvent.type(emailInput, "test@test.com");
    await userEvent.type(streetNameInput, "engahevevej");
    await userEvent.type(buildingNumberInput, "55");

    const signUpBtn = await screen.findByTestId("signup-submit");
    fireEvent.click(signUpBtn);

    await waitFor(() => {
      expect(mockedPost).toHaveBeenCalledWith(
        expect.stringContaining("/api/signup"),
        expect.objectContaining({
          firstName: "test",
          lastName: "testersen",
          email: "test@test.com",
          adress: {
            streetName: "engahevevej",
            buildingNumber: "55",
          },
        })
      );
    });
  });
});
