import React from 'react'
import { Flex } from 'antd'

import './cards-field.css'
import Card from '../card'

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
  const randomHash = () => Math.random().toString(36).slice(2)
  const { cinemaDataArr } = props
  return (
    <Flex gap="small" wrap>
      {cinemaDataArr.map((cinemaData) => {
        const { posterHref, movieTitle, releaseDate, movieGenres, movieDescriptionShort, generalRating, userRating } =
          cinemaData

        return (
          <Card
            key={randomHash()}
            posterHref={posterHref}
            movieTitle={movieTitle}
            releaseDate={releaseDate}
            movieGenres={movieGenres}
            movieDescriptionShort={movieDescriptionShort}
            generalRating={generalRating}
            userRating={userRating}
          />
        )
      })}
    </Flex>
  )
}

export default CardsField
