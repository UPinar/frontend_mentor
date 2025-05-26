import "../css/Card.css";

function Card(props) {
  return (
    <article className="card">
      <h2 className="card-title">{props.title}</h2>
      <p className="card-description">{props.description}</p>
      <img
        src={props.image}
        alt={`${props.title} logo`}
        className="card-image"
      />
    </article>
  );
}
export default Card;
