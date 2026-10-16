import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import ProductImage from "../components/ProductImage";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const nav = useNavigate();
  const { refresh } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then((r) => setP(r.data));
  }, [id]);

  const addToCart = async () => {
    if (!localStorage.getItem("token")) return nav("/login");
    await api.post("/cart/items", { productId: p.id, quantity: qty });
    refresh();
    alert("Added to cart!");
    nav("/cart");
  };

  if (!p) return <div className="empty">Loading...</div>;

  return (
    <>
      <Header />
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div style={{
          background: "white",
          padding: 20,
          borderRadius: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 500,
          border: "1px solid #e0e0e0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
        }}>
          <ProductImage
            src={p.imageUrl}
            alt={p.name}
            height={500}
            style={{ maxHeight: 500, objectFit: "contain" }}
          />
        </div>

        <div style={{ padding: "20px 0" }}>
          <h1 style={{ fontSize: 24, marginBottom: 8 }}>{p.name}</h1>
          {p.categoryName && (
            <p style={{ color: "#878787", fontSize: 14, marginBottom: 16 }}>
              {p.categoryName}
            </p>
          )}

          <div style={{ fontSize: 32, fontWeight: 700, color: "#212121", margin: "16px 0" }}>
            ₹{p.price.toLocaleString("en-IN")}
          </div>

          <p style={{ color: "#878787", fontSize: 14, marginBottom: 12 }}>
            {p.description || "No description available"}
          </p>

          <p style={{
            color: p.stock > 0 ? "#388e3c" : "#d32f2f",
            fontWeight: 600,
            marginBottom: 24
          }}>
            {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
          </p>

          {p.stock > 0 && (
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "white", border: "1px solid #c0c0c0",
                    color: "#2874f0", fontSize: 18, fontWeight: 700
                  }}
                >−</button>
                <span style={{ minWidth: 40, textAlign: "center", fontSize: 18, fontWeight: 600 }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(p.stock, qty + 1))}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "white", border: "1px solid #c0c0c0",
                    color: "#2874f0", fontSize: 18, fontWeight: 700
                  }}
                >+</button>
              </div>

              <button
                className="btn-primary"
                style={{ padding: "16px 40px", fontSize: 15, fontWeight: 700 }}
                onClick={addToCart}
              >
                🛒 ADD TO CART
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}