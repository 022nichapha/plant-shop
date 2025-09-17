import { useState } from "react";
import "./OwnerDashboard.css";

export default function OwnerDashboard({ plants, setPlants }) {
  const [newPlantName, setNewPlantName] = useState("");
  const [newPlantPrice, setNewPlantPrice] = useState("");
  const [newPlantImageFile, setNewPlantImageFile] = useState(null);

  const addNewPlant = (e) => {
    e.preventDefault();
    if (!newPlantName || !newPlantPrice || !newPlantImageFile) return alert("กรอกข้อมูลให้ครบ");
    const imageUrl = URL.createObjectURL(newPlantImageFile);
    const newPlant = {
      id: plants.length > 0 ? plants[plants.length - 1].id + 1 : 1,
      name: newPlantName,
      price: Number(newPlantPrice),
      image: imageUrl,
    };
    setPlants([...plants, newPlant]);
    setNewPlantName(""); setNewPlantPrice(""); setNewPlantImageFile(null);
    e.target.reset();
  };

  return (
    <div className="owner-page">
      <h2>👨‍🌾 จัดการสินค้า</h2>
      <form onSubmit={addNewPlant} className="owner-form">
        <input type="text" placeholder="ชื่อสินค้า" value={newPlantName} onChange={(e) => setNewPlantName(e.target.value)} />
        <input type="number" placeholder="ราคา" value={newPlantPrice} onChange={(e) => setNewPlantPrice(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setNewPlantImageFile(e.target.files[0])} />
        <button type="submit">✅ เพิ่มสินค้า</button>
      </form>

      <div className="owner-grid">
        {plants.map((p) => (
          <div key={p.id} className="owner-card">
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>{p.price} บาท</p>
          </div>
        ))}
      </div>
    </div>
  );
}
