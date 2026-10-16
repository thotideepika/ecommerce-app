import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";

interface Product {
  id: number; name: string; price: number; imageUrl: string;
  stock: number; categoryName: string;
}
interface Category { id: number; name: string; }

export default function CategoryPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const isAll = id === "all";

  useEffect(() => {
    setLoading(true);
    if (isAll) {
      api.get("/products").then((r) => {
        setProducts(r.data);
        setCategory({ id: 0, name: "All Products" });
        setLoading(false);
      });
    } else {
      api.get("/categories").then((r) => {
        const cat = r.data.find((c: Category) => c.id === Number(id));
        setCategory(cat || null);
      });
      api.get(`/products?categoryId=${id}`).then((r) => {
        setProducts(r.data);
        setLoading(false);
      });
    }
  }, [id, isAll]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="breadcrumb">
          <span onClick={() => nav("/")} style={{ cursor: "pointer", color: "#2874f0" }}>Home</span>
          <span> / </span>
          <span>{category?.name || "Category"}</span>
        </div>

        <div className="section-header">
          <h2>
            {category?.name || "Loading..."}{" "}
            <span style={{ color: "#878787", fontSize: 14, fontWeight: 400 }}>
              ({products.length} {products.length === 1 ? "product" : "products"})
            </span>
          </h2>
          <button className="btn-secondary" onClick={() => nav("/")}>← Back to Home</button>
        </div>

        {loading ? (
          <div className="empty">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="empty">
            <p>No products in this category yet</p>
            <button className="btn-primary" onClick={() => nav("/")}>Browse Categories</button>
          </div>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <div key={p.id} className="product-card" onClick={() => nav(`/product/${p.id}`)}>
                {p.stock === 0 && <span className="out-of-stock-tag">Out of Stock</span>}
               <img
  src={p.imageUrl || "https://via.placeholder.com/400x400?text=" + encodeURIComponent(p.name)}
  alt={p.name}
  onError={(e) => {
    const el = e.target as HTMLImageElement;
    if (!el.dataset.fallbackTried) {
      el.dataset.fallbackTried = "1";
      el.src = `https://picsum.photos/seed/${p.id}/400/400`;
    } else {
      el.src = `https://via.placeholder.com/400x400?text=${encodeURIComponent(p.name)}`;
    }
  }}
/>
                <div className="content">
                  <h3 title={p.name}>{p.name}</h3>
                  {p.categoryName && <p className="category-name">{p.categoryName}</p>}
                  <span className="rating">★ 4.3</span>
                  <div className="price">₹{p.price.toLocaleString("en-IN")}</div>
                  <p className="stock">{p.stock > 0 ? `${p.stock} in stock` : "Currently unavailable"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}