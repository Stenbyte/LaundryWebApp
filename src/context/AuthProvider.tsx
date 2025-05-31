import { ReactNode, useReducer } from "react";
import { useAuth, UserData } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

export type AuthStateType = {
  user: UserData | null | undefined;
};

type Action = { type: "SET_USER"; payload: UserData | null | undefined };

function reducer(state: AuthStateType, action: Action): AuthStateType {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const initialState: AuthStateType = {
  user: null,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user } = useAuth();
  initialState.user = user;
  const [state] = useReducer(reducer, initialState);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
