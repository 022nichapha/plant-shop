import "./CartPage.css";

export default function CartPage({ cart, updateCartQty, removeFromCart }) {
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <div className="cart-page">
      <h2>🛍️ ตะกร้าสินค้า</h2>
      {cart.length === 0 ? (
        <p>ตะกร้าว่าง</p>
      ) : (
        <>
          {cart.map((p) => (
            <div key={p.id} className="cart-item">
              <span>{p.name} - {p.price} บาท</span>
              <div>
                <button onClick={() => updateCartQty(p.id, p.qty - 1)}>-</button>
                <span>{p.qty}</span>
                <button onClick={() => updateCartQty(p.id, p.qty + 1)}>+</button>
                <button onClick={() => removeFromCart(p.id)}>❌</button>
              </div>
            </div>
          ))}
          <h3>รวมทั้งหมด: {total} บาท</h3>
        </>
      )}
    </div>
  );
}
