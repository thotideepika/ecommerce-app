import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => { api.get("/orders").then((r) => setOrders(r.data)); }, []);

  return (
    <>
      <Header />
      <div className="container">
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <div className="empty">No orders yet</div>
        ) : orders.map((o) => (
          <div key={o.id} className="order-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3>Order #{o.id}</h3>
                <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>
                  {new Date(o.createdAt).toLocaleString()}
                </p>
                <p style={{ marginTop: 8 }}><strong>{o.shippingAddress}</strong></p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className={`status ${o.status}`}>{o.status}</span>
                <p style={{ marginTop: 8, fontWeight: 700, fontSize: 18 }}>₹{o.total}</p>
              </div>
            </div>
            <div style={{ marginTop: 16, borderTop: "1px solid #eee", paddingTop: 12 }}>
              {o.items.map((i: any) => (
                <div key={i.id} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 14 }}>
                  <span>{i.productName} × {i.quantity}</span>
                  <span>₹{i.price * i.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}