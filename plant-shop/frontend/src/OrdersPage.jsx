// src/OrdersPage.jsx
export default function OrdersPage({ orders, updateOrderStatus }) {
  return (
    <div className="orders-page">
      <h2>📦 รายการสั่งซื้อทั้งหมด</h2>
      {orders.length === 0 ? (
        <p>ยังไม่มีคำสั่งซื้อ</p>
      ) : (
        <ul>
          {orders.map((o, i) => (
            <li key={i} style={{ marginBottom: "10px" }}>
              <strong>{o.date}</strong> - {o.user} ซื้อ {o.item.name} จำนวน {o.item.qty || 1} ชิ้น  
              <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                สถานะ: {o.status}
              </span>
              {o.status === "Pending" && (
                <button 
                  onClick={() => updateOrderStatus(i, "Shipped")} 
                  style={{ marginLeft: "10px" }}
                >
                  ✅ ยืนยันส่งของ
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

