import "../css/PriceCardSection.css"

import priceCardsData from "../data/price_cards_data";
import PriceCard from "./PriceCard.jsx";

export default function PriceSection(){
  const priceCards = priceCardsData.map((card) => { 
    return (
      <PriceCard
        key={card.id} 
        cardLogoUrl={card.cardLogoUrl}
        title={card.title}
        description={card.description}
        price={card.price}
        features={card.features}
      />
    );
  });

  return (
    <section className="price-section">
      <header className="price-text-section">
        <h2 className="price-section-header">Our pricing plans</h2>
        <p className="price-section-description">We only make money when our creators make money. Our plans are always affordable, and it’s completely free to get started.</p>
      </header>
      <section className="price-cards-section">
        {priceCards}
      </section>
    </section>
  );
}