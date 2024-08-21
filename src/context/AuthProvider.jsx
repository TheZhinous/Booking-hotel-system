import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("Unknown Action!");
  }
}

const initial_state = {
  user: null,
  isAuthenticated: false,
};
const FAKE_USER = {
  name: "sahe",
  email: "user@gmail.com",
  password: "2344",
};
export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initial_state
  );

  function login(email, password) {
    if (email == FAKE_USER.email && password == FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    return useContext(AuthContext);
}