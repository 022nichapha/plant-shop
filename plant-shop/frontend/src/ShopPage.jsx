
export default function ShopPage({ plants, addToCart, checkoutNow }) {
  return (
    <div className="shop-page">
      <h2>🛒 สินค้าทั้งหมด</h2>
      <div className="shop-grid">
        {plants.map((p) => (
          <div key={p.id} className="shop-card">
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>{p.price} บาท</p>
            <button onClick={() => addToCart(p)}>➕ เพิ่มเข้าตะกร้า</button>
            <button className="buy-now" onClick={() => checkoutNow(p)}>🛒 ซื้อเดี๋ยวนี้</button>
          </div>
        ))}
      </div>
    </div>
  );
}
