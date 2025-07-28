import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(res => res.json())
      .then(data => setStocks(data));
  }, []);

  const handleBuy = (stock) => {
    if (!portfolio.find(item => item.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  const handleSell = (stock) => {
    setPortfolio(portfolio.filter(item => item.id !== stock.id));
  };

  const displayedStocks = [...stocks]
    .filter(stock => (filterBy ? stock.type === filterBy : true))
    .sort((a, b) => {
      if (sortBy === "Alphabetically") return a.ticker.localeCompare(b.ticker);
      if (sortBy === "Price") return a.price - b.price;
      return 0;
    });

  return (
    <div>
      <SearchBar setSortBy={setSortBy} setFilterBy={setFilterBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={displayedStocks} onBuy={handleBuy} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onSell={handleSell} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;