import { createContext, useContext, useState, ReactNode } from "react";

interface AuthCtx {
  token: string | null;
  user: { username: string; role: string } | null;
  login: (token: string, username: string, role: string) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    localStorage.getItem("username")
      ? { username: localStorage.getItem("username")!, role: localStorage.getItem("role")! }
      : null
  );

  const login = (t: string, u: string, r: string) => {
    localStorage.setItem("token", t);
    localStorage.setItem("username", u);
    localStorage.setItem("role", r);
    setToken(t); setUser({ username: u, role: r });
  };

  const logout = () => {
    localStorage.clear();
    setToken(null); setUser(null);
  };

  return <Ctx.Provider value={{ token, user, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);