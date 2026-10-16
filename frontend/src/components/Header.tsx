
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const nav = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  // Reset search when leaving home
  useEffect(() => {
    if (location.pathname !== "/") setSearch("");
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) nav(`/?q=${encodeURIComponent(search)}`);
    else nav("/");
  };

  return (
    <div className="header">
      <div className="brand" onClick={() => nav("/")}>
        <h1>🛍️ ShopHub</h1>
        <span className="tagline">Explore Plus</span>
      </div>

      <form className="search-wrapper" onSubmit={handleSearch}>
        <input
          placeholder="Search for products, brands and more"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="nav-links">
        <Link to="/">Home</Link>
        {user && <Link to="/orders">Orders</Link>}
        {user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}
        <Link to="/cart" className="cart-btn">
          🛒 Cart {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>
        {user ? (
          <>
            <span style={{ opacity: 0.9 }}>Hi, {user.username}</span>
            <button
              onClick={() => { logout(); nav("/login"); }}
              style={{ background: "white", color: "#2874f0", padding: "6px 16px", fontWeight: 600 }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ background: "white", color: "#2874f0", padding: "6px 24px", fontWeight: 600, borderRadius: 4 }}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}