import { ReactNode, useMemo, useReducer } from "react";
import { UiContext } from "./UiContext";

export type UiStateType = {
  isLogedIn: boolean;
  isSidebarOpen: boolean;
  isSignUpOpen: boolean;
  dispatch: React.Dispatch<Action>;
  disabledBtn: boolean;
};

type Action =
  | { type: "SET_LOGIN"; payload: boolean }
  | { type: "SET_SIDEBAR"; payload: boolean }
  | { type: "SET_SIGNUP"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_DISABLED_BTN"; payload: boolean };

function reducer(state: UiStateType, action: Action): UiStateType {
  switch (action.type) {
    case "SET_LOGIN":
      return { ...state, isLogedIn: action.payload };
    case "SET_SIDEBAR":
      return { ...state, isSidebarOpen: action.payload };
    case "SET_SIGNUP":
      return { ...state, isSignUpOpen: action.payload };
    case "SET_DISABLED_BTN":
      return { ...state, disabledBtn: action.payload };
    default:
      return state;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const initialState: UiStateType = {
  isLogedIn: false,
  isSidebarOpen: false,
  isSignUpOpen: false,
  disabledBtn: true,
  dispatch: () => {},
};

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { ...state, dispatch };
  }, [state]);
  return (
    <UiContext.Provider value={contextValue}>{children}</UiContext.Provider>
  );
};
