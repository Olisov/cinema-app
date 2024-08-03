import React from 'react'
import { Flex } from 'antd'

import './cards-field.css'
import Card from '../card'

// function ratedIdSearch(id, ratedArr) {
//   const idx = ratedArr.findIndex((el) => el.id === id)
//   // console.log('idx', idx)
// }

function CardsField(props) {
  // const cinemaDataArr = [
  //   {
  //     posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  //     movieTitle: 'The way back',
  //     releaseDate: new Date('2020-3-5'),
  //     movieGenres: ['Action', 'Drama'],
  //     movieDescription:
  //       'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
  //     generalRating: '3',
  //     userRating: '2',
  //   },
  //   {
  //     posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  //     movieTitle: 'The way back',
  //     releaseDate: new Date('2020-3-5'),
  //     movieGenres: ['Action', 'Drama'],
  //     movieDescription:
  //       'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
  //     generalRating: '3',
  //     userRating: '2',
  //   },
  //   {
  //     posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  //     movieTitle: 'The way back',
  //     releaseDate: new Date('2020-3-5'),
  //     movieGenres: ['Action', 'Drama'],
  //     movieDescription:
  //       'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
  //     generalRating: '3',
  //     userRating: '2',
  //   },
  //   {
  //     posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  //     movieTitle: 'The way back',
  //     releaseDate: new Date('2020-3-5'),
  //     movieGenres: ['Action', 'Drama'],
  //     movieDescription:
  //       'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
  //     generalRating: '3',
  //     userRating: '2',
  //   },
  // ]
  // const randomHash = () => Math.random().toString(36).slice(2)

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
