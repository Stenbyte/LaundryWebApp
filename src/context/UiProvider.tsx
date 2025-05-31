import { ReactNode, useReducer } from "react";
import { UiContext } from "./UiContext";
import { useAuth, UserData } from "../hooks/useAuth";

export type UiStateType = {
  isLogedIn: boolean;
  isSidebarOpen: boolean;
  isSignUpOpen: boolean;
  user: UserData | null | undefined;
  dispatch: React.Dispatch<Action>;
  isLoading: boolean;
  disabledBtn: boolean;
};

type Action =
  | { type: "SET_LOGIN"; payload: boolean }
  | { type: "SET_SIDEBAR"; payload: boolean }
  | { type: "SET_SIGNUP"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_DISABLED_BTN"; payload: boolean }
  | { type: "SET_USER"; payload: UserData | null | undefined };

function reducer(state: UiStateType, action: Action): UiStateType {
  switch (action.type) {
    case "SET_LOGIN":
      return { ...state, isLogedIn: action.payload };
    case "SET_SIDEBAR":
      return { ...state, isSidebarOpen: action.payload };
    case "SET_SIGNUP":
      return { ...state, isSignUpOpen: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_DISABLED_BTN":
      return { ...state, disabledBtn: action.payload };
    default:
      return state;
  }
}

const initialState: UiStateType = {
  isLogedIn: false,
  isSidebarOpen: false,
  isSignUpOpen: false,
  user: null,
  isLoading: false,
  disabledBtn: true,
  dispatch: () => {},
};

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: user } = useAuth();
  return (
    <UiContext.Provider value={{ ...state, user, dispatch }}>
      {children}
    </UiContext.Provider>
  );
};
