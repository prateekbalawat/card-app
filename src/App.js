import React from "react";
import CardList from "./components/CardList";
import data from "./data.json";

const App = () => {
  return (
    <div className="app">
      <CardList cards={data} />
    </div>
  );
};

export default App;
