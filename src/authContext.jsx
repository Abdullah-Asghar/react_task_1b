import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem('token', state.token);
      localStorage.setItem('role', state.role);
      localStorage.setItem('user_id', state.user_id);
      return {
        ...state,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  React.useEffect(() => {
    //TODO
    let sdk = new MkdSDK();
    const role = localStorage.getItem("role");
    const userToken = sdk.login(data.email, data.password, 'admin');
    if (userToken && userToken.message === 'TOKEN_EXPIRED') {
      dispatch({
        type: "Logout",
      });
      window.location.href = "/" + role + "/login";
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
