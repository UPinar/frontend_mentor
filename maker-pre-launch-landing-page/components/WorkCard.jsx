import "../css/WorkCardSection.css";

function WorkCard(props) {
  return (
    <div className="work-card">
      <div className="work-card-image-container">
        <img  className="work-card-image" 
              src={props.imageUrl} 
              alt={props.title} 
        />
      </div>
      <div className="work-card-text-section">
        <h2 className="work-card-title">{props.title}</h2>
        <p className="work-card-description">{props.description}</p>
      </div>
    </div>
  );
}

export default WorkCard;