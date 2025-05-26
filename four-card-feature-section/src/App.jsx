import "./App.css";
import Header from "../components/Header";
import CardData from "./data";
import Card from "../components/Card";

function App() {
  const cards = CardData.map((item) => (
    <Card
      key={item.key}
      title={item.title}
      description={item.description}
      image={item.image}
    />
  ));

  return (
    <>
      <Header />
      <main className="card-container">{cards}</main>
    </>
  );
}

export default App;
