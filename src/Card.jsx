function Card({ cardData, onUpdate }) {
  function handleInputChange() {
    onUpdate({
      ...cardData,
      [field]: value,
    });
  }
  return (
    <>
      <div className="card-container">
        <div className="card-picture">
          <img src="" alt="" />
        </div>
        <div className="card-title">Name</div>
      </div>
    </>
  );
}

export default Card;
