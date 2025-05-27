import { ReactNode, useReducer } from "react";
import { GlobalContext } from "./GlobalContext";
import { useAuth, UserData } from "../hooks/useAuth";

export type GlobalStateType = {
  isLogedIn: boolean;
  isSidebarOpen: boolean;
  isSignUpOpen: boolean;
  user: UserData | null | undefined;
  dispatch: React.Dispatch<Action>;
  isLoading: boolean;
};

type Action =
  | { type: "SET_LOGIN"; payload: boolean }
  | { type: "SET_SIDEBAR"; payload: boolean }
  | { type: "SET_SIGNUP"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: UserData | null | undefined };

function reducer(state: GlobalStateType, action: Action): GlobalStateType {
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
    default:
      return state;
  }
}

const initialState: GlobalStateType = {
  isLogedIn: false,
  isSidebarOpen: false,
  isSignUpOpen: false,
  user: null,
  isLoading: false,
  dispatch: () => {},
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: user } = useAuth();
  return (
    <GlobalContext.Provider value={{ ...state, user, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
