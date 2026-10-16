import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("COD");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { refresh } = useCart();

  const placeOrder = async () => {
    if (!address.trim()) return alert("Please enter shipping address");
    setLoading(true);
    try {
      const { data } = await api.post("/orders", { shippingAddress: address, paymentMethod: payment });
      refresh();
      alert("Order placed successfully!");
      nav(`/orders`);
    } catch { alert("Failed to place order"); setLoading(false); }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Checkout</h2>
        <div style={{ background: "white", padding: 24, borderRadius: 12, marginTop: 20, maxWidth: 500 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Shipping Address</label>
          <textarea rows={3} placeholder="Enter your full address" value={address} onChange={(e) => setAddress(e.target.value)} />

          <label style={{ display: "block", margin: "16px 0 8px", fontWeight: 600 }}>Payment Method</label>
          <select value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value="COD">Cash on Delivery</option>
            <option value="CARD">Credit/Debit Card (mock)</option>
            <option value="UPI">UPI (mock)</option>
          </select>

          <button className="btn-primary" style={{ marginTop: 20, width: "100%" }} onClick={placeOrder} disabled={loading}>
            {loading ? "Placing..." : "Place Order"}
          </button>
          <p style={{ color: "#888", fontSize: 12, marginTop: 12, textAlign: "center" }}>
            💡 Real Stripe/Razorpay integration comes in Phase 3
          </p>
        </div>
      </div>
    </>
  );
}