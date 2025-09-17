export default function PlantCard({ plant }) {
  return (
    <div className="card">
      <img src={plant.image} alt={plant.name} className="card-img" />
      <h3>{plant.name}</h3>
      <p>ราคา: {plant.price} บาท</p>
      <button>🛒 ซื้อเลย</button>
    </div>
  );
}
