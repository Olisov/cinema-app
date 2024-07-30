import React from 'react'
import { format } from 'date-fns'

import './card.css'

function Card(props) {
  const { posterHref, movieTitle, releaseDate, movieGenres, movieDescriptionShort, generalRating, userRating } = props

  const randomHash = () => Math.random().toString(36).slice(2)

  return (
    <div className="card">
      <img className="card__img" alt={`${movieTitle} poster`} src={posterHref} />
      <div className="card__data">
        <div className="card__data-item">
          <h2 className="card__title">{movieTitle}</h2>
          <div className="card__general-rating">{generalRating}</div>
        </div>
        <div className="card__data-item card__release-date">
          {releaseDate ? format(releaseDate, 'MMMM d, y') : 'No data'}
        </div>
        <ul className="card__data-item genres">
          {movieGenres.map((genre) => (
            <li key={randomHash()} className="genres__item">
              {genre}
            </li>
          ))}
          {/* <li className="genres__item">Action</li> */}
        </ul>
        <div className="card__data-item card__description">{movieDescriptionShort} </div>
        <div className="card__user-rating">{userRating}</div>
      </div>
    </div>
  )
}

export default Card
