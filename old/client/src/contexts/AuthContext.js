import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    /// Comprobar si el usuario está logueado o no
  }, []);

  const login = async (accessToken) => {
    try {
      setUser({ username: "adrian" });
      setToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    accessToken: token,
    user,
    login,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
