/* eslint-disable no-unused-vars */
import { React, Component } from 'react'
import { Spin, Alert } from 'antd'

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
      loading: true,
      error: false,
      cinemaDataArr: [
        // {
        //   posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        //   movieTitle: 'The way back',
        //   releaseDate: new Date('2020-3-5'),
        //   movieGenres: ['Action', 'Drama'],
        //   movieDescriptionFull:
        //     'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
        //   generalRating: '3',
        //   userRating: '2',
        // },
        // {
        //   posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        //   movieTitle: 'The way back',
        //   releaseDate: new Date('2020-3-5'),
        //   movieGenres: ['Action', 'Drama'],
        //   movieDescriptionFull:
        //     'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
        //   generalRating: '3',
        //   userRating: '2',
        // },
        // {
        //   posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        //   movieTitle: 'The way back',
        //   releaseDate: new Date('2020-3-5'),
        //   movieGenres: ['Action', 'Drama'],
        //   movieDescriptionFull:
        //     'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
        //   generalRating: '3',
        //   userRating: '2',
        // },
        // {
        //   posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        //   movieTitle: 'The way back',
        //   releaseDate: new Date('2020-3-5'),
        //   movieGenres: ['Action', 'Drama'],
        //   movieDescriptionFull:
        //     'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
        //   generalRating: '3',
        //   userRating: '2',
        // },
      ],
    }
    this.updateData()

    // this.state = {}
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  updateData() {
    this.cinemaData
      .getResource()
      .then((dataArr) => {
        // console.log(dataArr)
        this.setState({
          cinemaDataArr: dataArr,
          loading: false,
        })
      })
      .catch((errorData) => {
        this.setState({ error: errorData.toString(), loading: false })
      })
  }

  render() {
    const { cinemaDataArr, loading, error } = this.state

    console.log('navigator ', navigator.onLine)
    // console.log('online change', window.on)

    const spinner = loading ? <Spin size="large" /> : null
    const alarmMessage = error ? <Alert message={error} type="error" showIcon /> : null
    const content = !(loading && error) ? <CardsField cinemaDataArr={cinemaDataArr} /> : null

    return (
      <div className={`body ${loading || error ? 'body--middle' : 'body--center'}`}>
        {spinner}
        {alarmMessage}
        {content}
      </div>
    )
  }
}

// export default App
