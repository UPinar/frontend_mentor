import "../css/PriceCardSection.css";

export default function PriceCard(props) {
  return (
    <div className="price-card">
      <img src={props.cardLogoUrl} alt="Card Logo" className="price-card-logo" />
      <h2 className="price-card-title">{props.title}</h2>
      <p className="price-card-description">{props.description}</p>
      {props.price === "Free"  
        ? <p className="price-card-price">{props.price}</p>
        : <p className="price-card-price">${props.price} <small>/month</small> </p>
      }

      <ul className="price-card-features">
        {props.features.map((feature, index) => (
          <li key={index} className="price-card-feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path fill="#093F68" d="M10.319.768l1.363 1.464-7.128 6.634L.319 4.924 1.682 3.46l2.871 2.674z"/></svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}