import { useEffect, useState } from "react";
import api from "../../api/axios";
import Header from "../../components/Header";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [form, setForm] = useState({
    name: "", description: "", price: "", stock: "", imageUrl: "", categoryId: ""
  });

  const loadAll = () => {
    api.get("/products").then((r) => setProducts(r.data));
    api.get("/admin/categories").then((r) => setCategories(r.data));
    api.get("/admin/orders").then((r) => setOrders(r.data));
  };
  useEffect(() => { loadAll(); }, []);

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/admin/products", {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      categoryId: form.categoryId ? parseInt(form.categoryId) : null,
      isActive: true,
    });
    setForm({ name: "", description: "", price: "", stock: "", imageUrl: "", categoryId: "" });
    loadAll();
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/admin/products/${id}`);
    loadAll();
  };

  const updateOrderStatus = async (id: number, status: string) => {
    await api.put(`/admin/orders/${id}/status`, { status });
    loadAll();
  };

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  return (
    <>
      <Header />
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div style={{ display: "flex", gap: 12, margin: "20px 0" }}>
          <button className={tab === "products" ? "btn-primary" : "btn-secondary"} onClick={() => setTab("products")}>
            Products ({products.length})
          </button>
          <button className={tab === "orders" ? "btn-primary" : "btn-secondary"} onClick={() => setTab("orders")}>
            Orders ({orders.length})
          </button>
        </div>

        {tab === "products" && (
          <>
            <form className="admin-form" onSubmit={createProduct}>
              <h3>Add New Product</h3>
              <input placeholder="Product name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
              <textarea placeholder="Description" value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} />
              <input placeholder="Price" type="number" value={form.price} onChange={(e) => set("price", e.target.value)} required />
              <input placeholder="Stock" type="number" value={form.stock} onChange={(e) => set("stock", e.target.value)} required />
              <input placeholder="Image URL" value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} />
              <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button type="submit" className="btn-primary">Create Product</button>
            </form>

            <h3>All Products</h3>
            <div className="grid" style={{ marginTop: 16 }}>
              {products.map((p) => (
                <div key={p.id} className="product-card">
                  <img src={p.imageUrl || "https://via.placeholder.com/300"} alt={p.name} />
                  <div className="content">
                    <h3>{p.name}</h3>
                    <div className="price">₹{p.price}</div>
                    <p className="stock">Stock: {p.stock}</p>
                    <button className="btn-danger" style={{ marginTop: 8, width: "100%" }} onClick={() => deleteProduct(p.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "orders" && (
          <>
            <h3>All Orders</h3>
            {orders.map((o) => (
              <div key={o.id} className="order-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h3>Order #{o.id} — User #{o.userId}</h3>
                    <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>{new Date(o.createdAt).toLocaleString()}</p>
                    <p style={{ marginTop: 8 }}>{o.shippingAddress}</p>
                    <p style={{ fontSize: 13, marginTop: 4 }}>Payment: {o.paymentMethod}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: 700, fontSize: 18 }}>₹{o.total}</p>
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      style={{ marginTop: 8, padding: 6 }}
                    >
                      <option>PENDING</option>
                      <option>CONFIRMED</option>
                      <option>SHIPPED</option>
                      <option>DELIVERED</option>
                      <option>CANCELLED</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}