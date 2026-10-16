import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

interface CartCtx {
  itemCount: number;
  refresh: () => void;
}

const Ctx = createContext<CartCtx>({ itemCount: 0, refresh: () => {} });

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(0);
  const { token } = useAuth();

  const refresh = () => {
    if (!token) { setItemCount(0); return; }
    api.get("/cart").then((r) => setItemCount(r.data.itemCount || 0)).catch(() => {});
  };

  useEffect(() => { refresh(); }, [token]);

  return <Ctx.Provider value={{ itemCount, refresh }}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);