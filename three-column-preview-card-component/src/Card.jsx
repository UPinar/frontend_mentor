import "./Card.css";

function Card({ imageSrc, type, description, cardColor }) {
  return (
    <>
      <article className="card-section" style={{ backgroundColor: cardColor }}>
        <img
          src={imageSrc}
          alt={`${type} logo`}
          className="card-image"
          width={64}
          height={40}
        />
        <h2 className="card-type">{type}</h2>
        <p className="card-description">{description}</p>
        <button className="card-button" style={{ color: cardColor }}>
          Learn More
        </button>
      </article>
    </>
  );
}

export default Card;
