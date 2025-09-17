import "./ShopPage.css";

export default function CheckoutPage({ plant, addToCart, backToShop }) {
  return (
    <div className="checkout-page">
      <h2>เช็คเอาต์: {plant.name}</h2>
      <img src={plant.image} alt={plant.name} className="checkout-image" />
      <p>ราคา: {plant.price} บาท</p>
      <button onClick={() => addToCart(plant)}>➕ เพิ่มเข้าตะกร้า</button>
      <button onClick={backToShop}>⬅️ กลับร้านค้า</button>
    </div>
  );
}
