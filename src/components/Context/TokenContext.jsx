import { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    } else {
      localStorage.removeItem("userName");
    }
  }, [userName]);

  const logout = () => {
    setToken(null);
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  return (
    <TokenContext.Provider value={{ token, setToken, userName, setUserName, logout  }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
