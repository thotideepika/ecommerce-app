import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";

interface Product {
  id: number; name: string; price: number; imageUrl: string;
  stock: number; categoryName: string; categoryId: number;
}
interface Category { id: number; name: string; }

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") || "";
  const nav = useNavigate();

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const params: string[] = [];
    if (search.trim()) params.push(`q=${encodeURIComponent(search)}`);
    if (selectedCategory) params.push(`categoryId=${selectedCategory}`);
    const query = params.length ? `?${params.join("&")}` : "";
    api.get(`/products${query}`).then((r) => setProducts(r.data));
  }, [search, selectedCategory]);

  const selectCategory = (id: number | null) => {
    setSelectedCategory(id);
    setSearchParams({});
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* Hero banner */}
        {!search && !selectedCategory && (
          <div className="hero-banner">
            <div>
              <h2>Big Billion Days Sale 🎉</h2>
              <p>Up to 80% off on Electronics, Fashion, Books & more</p>
            </div>
            <button className="shop-btn" onClick={() => selectCategory(null)}>Shop Now</button>
          </div>
        )}

        {/* Category strip */}
        <div className="category-strip">
          <button
            className={`category-btn ${selectedCategory === null ? "active" : ""}`}
            onClick={() => selectCategory(null)}
          >
            All Products
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`category-btn ${selectedCategory === c.id ? "active" : ""}`}
              onClick={() => selectCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search result info */}
        {search && (
          <div className="search-info">
            Showing results for <strong>"{search}"</strong>
            <span className="clear" onClick={() => setSearchParams({})}>Clear</span>
          </div>
        )}

        {/* Section header */}
        <div className="section-header">
          <h2>
            {search
              ? `Search Results (${products.length})`
              : selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name
              : "Featured Products"}
          </h2>
          <a className="view-all" onClick={() => selectCategory(null)} style={{ cursor: "pointer" }}>View All</a>
        </div>

        {/* Product grid */}
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
                <div className="price">
                  ₹{p.price.toLocaleString("en-IN")}
                  <span className="original-price">₹{Math.round(p.price * 1.3).toLocaleString("en-IN")}</span>
                  <span className="discount">30% off</span>
                </div>
                <p className="stock">{p.stock > 0 ? `${p.stock} in stock` : "Currently unavailable"}</p>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="empty">
            <p>No products found</p>
            <button className="btn-primary" onClick={() => { setSearchParams({}); selectCategory(null); }}>
              Show All Products
            </button>
          </div>
        )}
      </div>
    </>
  );
}