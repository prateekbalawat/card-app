import { differenceInDays } from "date-fns";
import React, { useState } from "react";
import Card from "./Card";
import "./CardList.css";

const CardList = ({ cards }) => {
  const [keyword, setKeyword] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  // Sort cards based on score
  const sortedData = cards.data.sort((a, b) => b.score - a.score);

  const applyNumericFilter = (value, type, filterValue) => {
    switch (type) {
      case "greater":
        return value > filterValue;
      case "lesser":
        return value < filterValue;
      case "equal":
        return value === filterValue;
      default:
        return true; // No filter applied
    }
  };

  // Filter cards based on keyword and score
  const filteredData = sortedData.filter((card) => {
    const textMatchesKeyword =
      keyword === "" ||
      (card.text && card.text.toLowerCase().includes(keyword.toLowerCase()));
    const scoreMatchesFilter =
      filterType === "" ||
      filterValue === "" ||
      applyNumericFilter(card.score, filterType, Number(filterValue));
    return textMatchesKeyword && scoreMatchesFilter;
  });

  // Group cards by date
  const groupedData = {};
  filteredData.forEach((card) => {
    const { createdAt } = card;

    const duration = differenceInDays(new Date(), new Date(createdAt));
    let durationString = duration + " days ago";
    if (!groupedData[durationString]) {
      groupedData[durationString] = [];
    }

    groupedData[durationString].push(card);
  });

  const isMobile = () => {
    return window.innerWidth < 768;
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="card-list-container">
      <div className="tool-bar">
        {/* Start of search bar code */}
        <div className="search-bar">
          <input
            type="text"
            placeholder={isMobile() ? "Search" : "Search by keyword"}
            value={keyword}
            onChange={handleSearch}
          />
        </div>
        {/* Start of filter by score code */}
        <div className="filter-bar-wrapper">
          <div className="filter-bar">
            <div className="filter-bar-text">
              {isMobile() ? <p>Filter:</p> : <p>Filter by score:</p>}
            </div>
            <div>
              <select value={filterType} onChange={handleFilterTypeChange}>
                <option value="">No Filter</option>
                <option value="greater">Greater Than</option>
                <option value="lesser">Less Than</option>
                <option value="equal">Equal To</option>
              </select>
              <input
                type="number"
                placeholder="Filter Value"
                value={filterValue}
                onChange={handleFilterValueChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Start of card list */}
      {Object.entries(groupedData).map(([date, cards]) => (
        <div className="card-list-row" key={date}>
          <div className="card-group">
            {cards.map((card) => (
              <div className="card-wrapper">
                <Card key={card.id} createdAt={date} card={card} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
