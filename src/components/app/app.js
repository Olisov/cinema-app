/* eslint-disable no-unused-vars */
import { React, Component } from 'react'

import ApiClient from '../api-client'
import './app.css'
import CardsField from '../cards-field'

// const { Meta } = Card

// const style = { background: '#0092ff', padding: '8px 0' }

export default class App extends Component {
  cinemaData = new ApiClient()

  constructor() {
    super()

    this.state = {
      cinemaDataArr: [
        {
          posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          movieTitle: 'The way back',
          releaseDate: new Date('2020-3-5'),
          movieGenres: ['Action', 'Drama'],
          movieDescriptionFull:
            'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
          generalRating: '3',
          userRating: '2',
        },
        {
          posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          movieTitle: 'The way back',
          releaseDate: new Date('2020-3-5'),
          movieGenres: ['Action', 'Drama'],
          movieDescriptionFull:
            'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
          generalRating: '3',
          userRating: '2',
        },
        {
          posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          movieTitle: 'The way back',
          releaseDate: new Date('2020-3-5'),
          movieGenres: ['Action', 'Drama'],
          movieDescriptionFull:
            'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
          generalRating: '3',
          userRating: '2',
        },
        {
          posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          movieTitle: 'The way back',
          releaseDate: new Date('2020-3-5'),
          movieGenres: ['Action', 'Drama'],
          movieDescriptionFull:
            'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
          generalRating: '3',
          userRating: '2',
        },
      ],
    }
    this.updateData()

    // this.state = {}
  }

  updateData() {
    this.cinemaData.getResource().then((dataArr) => {
      // console.log(dataArr)
      this.setState({
        cinemaDataArr: dataArr,
      })
    })
  }

  // eslint-disable-next-line class-methods-use-this, react/no-unused-class-component-methods
  // getData = () => {
  //   const baseUrl = new URL('https://api.themoviedb.org/3/search/movie')
  //   const searchParams = new URLSearchParams({ query: 'return', include_adult: 'false', language: 'en-US', page: '1' })
  //   baseUrl.search = searchParams

  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTYwOTQ4ZmI5NGUwNWU5ZTA3MWYxYjkwMjY5NDUwYiIsIm5iZiI6MTcyMTE5NjczMi4xNzAxOTEsInN1YiI6IjY2OTYzNDdlN2QyODhhMTBjODQ4ZTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mIt63yKNTjqy6TtCZmyaJfWM-5yX34i2WKqtI9A5yyo',
  //     },
  //   }

  //   fetch(baseUrl, options)
  //     .then((res) => res.json())
  //     .then(({ results }) => {
  //       const shortReasp = results.slice(0, 4)
  //       this.setState({
  //         cinemaDataArr: shortReasp.map((cinemaData) => {
  //           const { poster_path, title, release_date, genre_ids, overview } = cinemaData

  //           return {
  //             // posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  //             posterHref: poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : null,
  //             movieTitle: title,
  //             releaseDate: new Date(release_date),
  //             movieGenres: ['Action', 'Drama'],
  //             movieDescription: overview,
  //             generalRating: '3',
  //             userRating: '2',
  //           }
  //         }),
  //       })
  //       // console.log(shortReasp)
  //     })
  //     .catch((err) => console.error(`error: ${err}`))

  //   // console.log(baseUrl)
  // }

  render() {
    const { cinemaDataArr } = this.state
    return (
      <div className="body body--center">
        <CardsField cinemaDataArr={cinemaDataArr} />
      </div>
    )
  }
}

// export default App
