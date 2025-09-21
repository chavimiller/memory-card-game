import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";

function App() {
  const [cats, setCats] = useState([]);
  const [cards, setCards] = useState([]);
  const apiKey =
    "live_NSctk6s9NcCNPygdBqY4cNfTfHtGa45btD1kEgDgypSOOSGUFrX8n57Ja2vh8Sv8";
  const url = `https://api.thecatapi.com/v1/images/search?limit=50&api_key=${apiKey}`;

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch cat data");
        const catData = await response.json();
        const simplifyCats = catData.map((cat) => ({
          id: cat.id,
          imgUrl: cat.url,
        }));
        setCats(simplifyCats);
      } catch (err) {
        console.log("Fetch Error:", err);
      }
    };

    fetchCats();
  }, [url]);
  // Test one card at index 0
  function randomizeCats() {
    const randomCats = [...cats].sort(() => Math.random() - 0.5).slice(0, 8);
    setCards(randomCats);
  }

  useEffect(() => {
    randomizeCats();
  }, [cats]);

  return (
    <>
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} cardData={card} onClick={randomizeCats} />
        ))}
      </div>
    </>
  );
}

export default App;
