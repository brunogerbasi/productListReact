import React from 'react';
import './Card.css';

const PromotionCard = ({ promotion }) => (
  <li>
    <div className="app-item">
      <div className="box-info">
        <div className="box-info--content">
          <div className="description">
            <h1>{promotion.name}</h1>
            <p>{promotion.description}</p>
          </div>
          <div className="tags">
            {promotion.categories.map((categorie, index) => (
              <span key={index}>
                {categorie}
                {index + 1 === promotion.categories.length ? "" : " / "} 
              </span>
            ))}
          </div>
        </div>
        <div className="box-info--footer">
          <ul>
            {promotion.subscriptions.map((sub, index) => (
              <li key={index}><span>{sub.name}</span> <h3>{sub.price}<sup></sup></h3></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </li>
);

export default PromotionCard;
