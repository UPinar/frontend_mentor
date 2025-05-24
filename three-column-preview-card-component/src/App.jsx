import "./App.css";
import Card from "./Card";

function App() {
  return (
    <main className="cards-container">
      <Card
        imageSrc="../src/assets/images/icon-sedans.svg"
        type="Sedans"
        description="Choose a sedan for its affordability and excellent fuel economy. Ideal for cruising in the city 
        or on your next road trip."
        cardColor="var(--CLR-ORANGE)"
      />
      <Card
        imageSrc="../src/assets/images/icon-suvs.svg"
        type="SUVs"
        description="Take an SUV for its spacious interior, power, and versatility. Perfect for your next family vacation and off-road adventures."
        cardColor="var(--CLR-CYAN)"
      />
      <Card
        imageSrc="../src/assets/images/icon-luxury.svg"
        type="Luxury"
        description="Cruise in the best car brands without the bloated prices. Enjoy the enhanced comfort of a luxury 
        rental and arrive in style."
        cardColor="var(--CLR-DARK-CYAN)"
      />
    </main>
  );
}

export default App;
