import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";

function App() {
  const [loading, setLoading] = useState(true);

  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState([]);

  const [best, setBest] = useState(0);

  const [cats, setCats] = useState([]);
  const [cards, setCards] = useState([]);
  const apiKey =
    "live_NSctk6s9NcCNPygdBqY4cNfTfHtGa45btD1kEgDgypSOOSGUFrX8n57Ja2vh8Sv8";
  const url = `https://api.thecatapi.com/v1/images/search?limit=30&api_key=${apiKey}`;

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
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

  function handleCardClick(card) {
    if (clicked.includes(card.id)) {
      score > best ? setBest(score) : null;
      setScore(0);
      setClicked([]);
    } else {
      setClicked([...clicked, card.id]);
      setScore(score + 5);
    }
    randomizeCats();
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="main-container">
          <h2 className="title">Memory Card Game</h2>
          <div className="instructions">
            The goal is to not click on the same cat picture twice. After
            clicking a picture, the cards will shuffle and you will have to
            remember which cards you already clicked and only click the ones you
            haven't!
          </div>
          <div className="score-board">
            <div className="score">Current Score: {score}</div>
            <div className="best">Best Score: {best}</div>
          </div>

          <div className="card-grid">
            {cards.map((card) => (
              <Card
                key={card.id}
                cardData={card}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
