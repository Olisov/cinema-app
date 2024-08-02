import React from 'react'
import { format } from 'date-fns'
import { Rate } from 'antd'

import RaringRing from '../rating-ring'
import './card.css'

function Card(props) {
  const { posterHref, movieTitle, releaseDate, movieGenres, movieDescriptionShort, generalRating, userRating } = props

  const randomHash = () => Math.random().toString(36).slice(2)

  return (
    <div className="card">
      <div className="card__data-mobile">
        <img className="card__img card__img-mini" alt={`${movieTitle} poster`} src={posterHref} />
        <div className="card__data">
          <div className="card__title-group">
            <h2 className="card__title">{movieTitle}</h2>
            {/* <div className="card__general-rating">{generalRating}</div> */}
            <RaringRing rating={generalRating} />
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
          <div className="card__description card__desktop">{movieDescriptionShort} </div>
          <Rate className="card__user-rating card__desktop" allowHalf count={10} />
          {/* <div className="card__user-rating">{userRating}</div> */}
        </div>
      </div>

      <div className="card__description card__mobile">{movieDescriptionShort} </div>
      <Rate className="card__user-rating card__mobile" allowHalf count={10} />
    </div>
  )
}

export default Card
