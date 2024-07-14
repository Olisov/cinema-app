import React from 'react'
import './card.css'

function Card() {
  return (
    <div className="card">
      <img className="card__img" alt="Cinema poster" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
      <div className="card__data">
        <div className="card__data-item">
          <h2 className="card__title">Cinema Title</h2>
          <div className="card__rating-general">3/10</div>
        </div>
        <div className="card__data-item card__release-date">Date</div>
        <ul className="card__data-item genres">
          <li className="genres__item" />
          <li className="genres__item" />
        </ul>
        <div className="card__data-item card__description">description</div>
        <div className="card__rating-user">1/10</div>
      </div>
    </div>
  )
}

export default Card
