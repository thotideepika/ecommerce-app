import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import { useCart as useCartCtx } from "../context/CartContext";

interface CartItem { id: number; productName: string; imageUrl: string; quantity: number; price: number; lineTotal: number; }
interface Cart { items: CartItem[]; subtotal: number; shipping: number; total: number; }

export default function Cart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const nav = useNavigate();
  const { refresh } = useCartCtx();

  const load = () => api.get("/cart").then((r) => { setCart(r.data); refresh(); });
  useEffect(() => { load(); }, []);

  const updateQty = async (id: number, q: number) => {
    await api.put(`/cart/items/${id}`, { quantity: q });
    load();
  };
  const removeItem = async (id: number) => {
    await api.delete(`/cart/items/${id}`);
    load();
  };

  if (!cart) return <div className="empty">Loading...</div>;

  return (
    <>
      <Header />
      <div className="container">
        <h2>Your Cart</h2>
        {cart.items.length === 0 ? (
          <div className="empty">
            <p>Your cart is empty</p>
            <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => nav("/")}>Browse Products</button>
          </div>
        ) : (
          <>
            <div style={{ marginTop: 20 }}>
              {cart.items.map((i) => (
                <div key={i.id} className="cart-item">
                  <img src={i.imageUrl} alt={i.productName} />
                  <div className="info">
                    <strong>{i.productName}</strong>
                    <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>₹{i.price} each</p>
                    <p style={{ marginTop: 4, fontWeight: 700 }}>₹{i.lineTotal}</p>
                  </div>
                  <div className="qty-controls">
                    <button onClick={() => updateQty(i.id, i.quantity - 1)}>−</button>
                    <span>{i.quantity}</span>
                    <button onClick={() => updateQty(i.id, i.quantity + 1)}>+</button>
                    <button className="btn-danger" style={{ marginLeft: 8 }} onClick={() => removeItem(i.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bill">
              <div className="bill-row"><span>Subtotal</span><span>₹{cart.subtotal}</span></div>
              <div className="bill-row"><span>Shipping</span><span>₹{cart.shipping}</span></div>
              <div className="bill-row total"><span>Total</span><span>₹{cart.total}</span></div>
              <button className="btn-primary" style={{ marginTop: 16, width: "100%" }} onClick={() => nav("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}