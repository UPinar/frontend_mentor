import "../css/WorkCardSection.css";

import WorkCard from "./WorkCard.jsx";
import workCardsData from "../data/work_cards_data.js";

export default function WorkCardSection() {
  const workCards = workCardsData.map((card) => {
    return (
      <WorkCard
        key={card.id}
        imageUrl={card.imageUrl}
        title={card.title} 
        description={card.description}
      />
    )
  })

  return (
    <section className="work-card-section">
      {workCards}
    </section>
  );
}
