import React from "react";
import "./Card.css";

const Card = ({ card, createdAt }) => {
  return (
    <div className="card">
      <div className="profile-picture">
        <img src={card.icon} alt="icon" />
      </div>
      <div className="content">
        <div className="header">
          <h2 className="card-title">{card.title}</h2>
          <span className="created-at">{createdAt}</span>
        </div>
        {card.text && <p className="card-text">{card.text}</p>}
        {card.url && (
          <div className="video-wrapper">
            <video
              id="#vid"
              width="100%"
              height="140"
              src={card.url}
              controls
              className="card-video"
            />
          </div>
        )}
      </div>
      <div className="footer">
        <p className="card-score">Score: {card.score}</p>
      </div>
    </div>
  );
};

export default Card;
