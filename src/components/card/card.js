import React from 'react'
import { format } from 'date-fns'
import { Rate } from 'antd'

import { AppConsumer } from '../app-context'
import RaringRing from '../rating-ring'
import './card.css'

function getNameById(id, dict) {
  const finedName = dict.filter((item) => item.id === id)
  if (finedName.length > 0) return finedName[0].name
  return null
}

function Card(props) {
  const { posterHref, movieTitle, releaseDate, movieGenresIds, movieDescriptionShort, generalRating, userRating } =
    props

  const randomHash = () => Math.random().toString(36).slice(2)
  // console.log(movieGenresIds)

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
          <AppConsumer>
            {(genresDict) => {
              return (
                <ul className="card__data-item genres">
                  {movieGenresIds.map((genreId) => (
                    <li key={randomHash()} className="genres__item">
                      {getNameById(genreId, genresDict)}
                    </li>
                  ))}
                </ul>
              )
            }}
          </AppConsumer>

          {/* <ul className="card__data-item genres">
            {movieGenresIds.map((genreId) => (
              <li key={randomHash()} className="genres__item">
                {genreId}
              </li>
            ))}
          </ul> */}

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
