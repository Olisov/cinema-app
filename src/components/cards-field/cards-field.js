import React from 'react'
import { Flex } from 'antd'

import './cards-field.css'
import Card from '../card'

function CardsField(props) {
  const { cinemaDataArr } = props

  const nothingToShow = cinemaDataArr.length < 1 ? <div>No result</div> : null

  return (
    <Flex gap="36px" className="cards-field" wrap>
      {nothingToShow}
      {cinemaDataArr.map((rawCinemaData) => {
        const {
          posterHref,
          movieTitle,
          releaseDate,
          movieGenresIds,
          movieDescriptionShort,
          generalRating,
          userRating,
          id,
        } = rawCinemaData

        return (
          <Card
            key={id}
            posterHref={posterHref}
            movieTitle={movieTitle}
            releaseDate={releaseDate}
            movieGenresIds={movieGenresIds}
            movieDescriptionShort={movieDescriptionShort}
            generalRating={generalRating}
            userRating={userRating}
            id={id}
          />
        )
      })}
    </Flex>
  )
}

export default CardsField
