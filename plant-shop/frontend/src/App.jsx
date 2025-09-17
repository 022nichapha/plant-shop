import { useState } from "react";
import ShopPage from "./ShopPage";
import OwnerDashboard from "./OwnerDashboard";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import "./App.css";
import { plants as initialPlants } from "./data";

export default function App() {
  // Users & Auth
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  // Shop & Cart
  const [plants, setPlants] = useState(initialPlants); // ใช้ initialPlants จาก data.js
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("shop"); // shop | owner | cart | checkout
  const [checkoutItem, setCheckoutItem] = useState(null);

  // ===== Register =====
  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password) return alert("กรอกข้อมูลให้ครบ");
    if (users.find((u) => u.username === username)) return alert("ชื่อผู้ใช้นี้มีอยู่แล้ว");
    const newUser = { username, password, isOwner };
    setUsers([...users, newUser]);
    alert("สมัครสมาชิกสำเร็จ!");
    setUsername(""); setPassword(""); setIsOwner(false); setIsRegistering(false);
  };

  // ===== Login =====
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) return alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    setCurrentUser(user);
    setPage("shop");
  };

  const logout = () => {
    setCurrentUser(null);
    setPage("shop");
  };

  // ===== Cart =====
  const addToCart = (plant) => {
    const exists = cart.find((p) => p.id === plant.id);
    if (exists) {
      setCart(cart.map((p) => p.id === plant.id ? { ...p, qty: p.qty + 1 } : p));
    } else {
      setCart([...cart, { ...plant, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  const updateCartQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(cart.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  // ===== Checkout =====
  const checkoutNow = (plant) => {
    setCheckoutItem(plant);
    setPage("checkout");
  };

  // ===== Auth Page =====
  if (!currentUser) {
    return (
      <div className="auth-container">
        {isRegistering ? (
          <form onSubmit={handleRegister} className="auth-form">
            <h2>สมัครสมาชิก</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>
              <input type="checkbox" checked={isOwner} onChange={(e) => setIsOwner(e.target.checked)} />
              สมัครเป็นเจ้าของร้าน
            </label>
            <button type="submit">สมัคร</button>
            <p>มีบัญชีแล้ว? <span className="link" onClick={() => setIsRegistering(false)}>เข้าสู่ระบบ</span></p>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="auth-form">
            <h2>เข้าสู่ระบบ</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">ล็อกอิน</button>
            <p>ยังไม่มีบัญชี? <span className="link" onClick={() => setIsRegistering(true)}>สมัครสมาชิก</span></p>
          </form>
        )}
      </div>
    );
  }

  // ===== Main Pages =====
  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1>🌱 Plant Shop</h1>
        <div className="nav-buttons">
          <button onClick={() => setPage("shop")}>🛒 ร้านค้า</button>
          {currentUser.isOwner && <button onClick={() => setPage("owner")}>👨‍🌾 เจ้าของร้าน</button>}
          <button onClick={() => setPage("cart")}>🛍️ ตะกร้า ({cart.reduce((a, b) => a + b.qty, 0)})</button>
          <button onClick={logout}>🚪 Logout</button>
        </div>
      </div>

      {page === "shop" && (
        <ShopPage plants={plants} addToCart={addToCart} checkoutNow={checkoutNow} />
      )}
      {page === "owner" && currentUser.isOwner && (
        <OwnerDashboard plants={plants} setPlants={setPlants} />
      )}
      {page === "cart" && (
        <CartPage cart={cart} updateCartQty={updateCartQty} removeFromCart={removeFromCart} />
      )}
      {page === "checkout" && checkoutItem && (
        <CheckoutPage plant={checkoutItem} addToCart={addToCart} backToShop={() => setPage("shop")} />
      )}
    </div>
  );
}
