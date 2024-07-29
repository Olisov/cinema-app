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
      offline: false,
      // offlineListener,
      // onlineListener,
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
  }

  updateData() {
    this.cinemaData
      .getResource()
      .then((dataArr) => {
        this.setState({
          cinemaDataArr: dataArr,
          loading: false,
        })
      })
      .catch((errorData) => {
        if (errorData.message === 'Failed to fetch') this.setState({ offline: true })
        else this.setState({ error: errorData.toString() })
        this.setState({ loading: false })
      })
  }

  render() {
    const { cinemaDataArr, loading, error, offline } = this.state

    const spinner = loading && !offline ? <Spin size="large" /> : null
    const alarmMessage = error && !offline ? <Alert message={error} type="error" showIcon /> : null
    const offlineMessage = offline ? (
      <Alert message="Offline. Check you're internet connection or VPN" type="error" showIcon />
    ) : null
    const content = !(loading && error && offline) ? <CardsField cinemaDataArr={cinemaDataArr} /> : null

    return (
      <div className={`body ${loading || error || offline ? 'body--middle' : 'body--center'}`}>
        {spinner}
        {alarmMessage}
        {offlineMessage}
        {content}
      </div>
    )
  }
}

// export default App
