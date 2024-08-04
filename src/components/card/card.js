import React from 'react'
import { format } from 'date-fns'
import { Rate } from 'antd'

import { AppConsumer } from '../app-context'
import RaringRing from '../rating-ring'
import './card.css'

function getNameById(id, dict) {
  const idx = dict.findIndex((el) => el.id === id)
  if (idx >= 0) return dict[idx].name
  return null
}

function Card(props) {
  const { posterHref, movieTitle, releaseDate, movieGenresIds, movieDescriptionShort, generalRating, userRating, id } =
    props

  const movieGenresIdsArr = JSON.parse(movieGenresIds)

  const randomHash = () => Math.random().toString(36).slice(2)

  return (
    <AppConsumer>
      {({ genresDict, apiClientInstance, guestSessionId }) => {
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
                  {releaseDate ? format(releaseDate ? new Date(releaseDate) : null, 'MMMM d, y') : 'No data'}
                </div>

                <ul className="card__data-item genres">
                  {movieGenresIdsArr.map((genreId) => (
                    <li key={randomHash()} className="genres__item">
                      {getNameById(genreId, genresDict)}
                    </li>
                  ))}
                </ul>

                <div className="card__description card__desktop">{movieDescriptionShort} </div>
                <Rate
                  className="card__user-rating card__desktop"
                  defaultValue={userRating}
                  onChange={(newRate) => {
                    apiClientInstance
                      .setRate(id, newRate, { ...props, userRating: newRate }, guestSessionId)
                      .catch((err) => console.log(`Неуспешный POST запрос, ${err}`))
                  }}
                  allowHalf
                  count={10}
                />
              </div>
            </div>

            <div className="card__description card__mobile">{movieDescriptionShort} </div>
            <Rate
              className="card__user-rating card__mobile"
              defaultValue={userRating}
              onChange={(newRate) => {
                apiClientInstance
                  .setRate(id, newRate, { ...props, userRating: newRate }, guestSessionId)
                  .catch((err) => console.log(`Неуспешный POST запрос, ${err}`))
              }}
              allowHalf
              count={10}
            />
          </div>
        )
      }}
    </AppConsumer>
  )
}

export default Card
