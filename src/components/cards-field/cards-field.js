import React from 'react'
import { Flex } from 'antd'

import './cards-field.css'
import Card from '../card'

function CardsField() {
  const cinemaDataArr = [
    {
      posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      movieTitle: 'The way back',
      releaseDate: new Date('2020-3-5'),
      movieGenres: ['Action', 'Drama'],
      movieDescription:
        'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
      generalRating: '3',
      userRating: '2',
    },
    {
      posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      movieTitle: 'The way back',
      releaseDate: new Date('2020-3-5'),
      movieGenres: ['Action', 'Drama'],
      movieDescription:
        'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
      generalRating: '3',
      userRating: '2',
    },
    {
      posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      movieTitle: 'The way back',
      releaseDate: new Date('2020-3-5'),
      movieGenres: ['Action', 'Drama'],
      movieDescription:
        'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
      generalRating: '3',
      userRating: '2',
    },
    {
      posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      movieTitle: 'The way back',
      releaseDate: new Date('2020-3-5'),
      movieGenres: ['Action', 'Drama'],
      movieDescription:
        'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
      generalRating: '3',
      userRating: '2',
    },
  ]

  return (
    <Flex gap="small" wrap>
      {cinemaDataArr.map((cinemaData) => {
        const { posterHref, movieTitle, releaseDate, movieGenres, movieDescription, generalRating, userRating } =
          cinemaData

        return (
          <Card
            posterHref={posterHref}
            movieTitle={movieTitle}
            releaseDate={releaseDate}
            movieGenres={movieGenres}
            movieDescription={movieDescription}
            generalRating={generalRating}
            userRating={userRating}
          />
        )
      })}

      {/* <Card
        posterHref="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        movieTitle="The way back"
        releaseDate={new Date('2020-3-5')}
        movieGenres={['Action', 'Drama']}
        movieDescription="A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
          attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
       "
        generalRating="3"
        userRating="2"
      /> */}
    </Flex>
  )
}

export default CardsField
