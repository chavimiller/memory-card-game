function Card({ cardData, onClick }) {
  return (
    <>
      <div className="card-container">
        <div className="card-picture">
          <img src={cardData.imgUrl} alt="cat picture" />
        </div>
      </div>
    </>
  );
}

export default Card;
