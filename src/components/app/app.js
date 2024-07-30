/* eslint-disable no-unused-vars */
import { React, Component } from 'react'
import { Spin, Alert, ConfigProvider, Pagination } from 'antd'

import ApiClient from '../api-client'
import './app.css'
import CardsField from '../cards-field'
import SearchField from '../search-field'

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
      request: 'return',
      currentPage: 1,
      totalPages: null,
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
  }

  componentDidMount() {
    const { request, currentPage } = this.state
    this.getData(request, currentPage)
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, request } = this.state
    if (currentPage !== prevState.currentPage) this.getData(request, currentPage)
    else if (request !== prevState.request) this.getData(request, currentPage)
  }

  getData(request, page) {
    this.cinemaData
      .getResource(request, page)
      .then((responseBody) => {
        this.setState({
          cinemaDataArr: responseBody.cinemaDataArr,
          totalPages: responseBody.totalPages,
          loading: false,
        })
      })
      .catch((errorData) => {
        if (errorData.message === 'Failed to fetch') this.setState({ offline: true })
        else this.setState({ error: errorData.toString() })
        this.setState({ loading: false })
      })
  }

  changePage = (newPageNum) => {
    // console.log(newPageNum)
    this.setState({ currentPage: newPageNum, loading: true })
  }

  searchValueChange = (newValue) => {
    this.setState({ request: newValue.target.value, loading: true })
  }

  render() {
    const { cinemaDataArr, loading, error, offline, currentPage, totalPages } = this.state

    const spinner = loading && !offline ? <Spin size="large" className="spin--center" /> : null
    const alarmMessage = error && !offline ? <Alert message={error} type="error" showIcon /> : null
    const offlineMessage = offline ? (
      <Alert message="Offline. Check you're internet connection or VPN" type="error" showIcon />
    ) : null
    const content = !(loading || error || offline) ? <CardsField cinemaDataArr={cinemaDataArr} /> : null
    const pagination = !(loading || error || offline || cinemaDataArr.length < 1) ? (
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: '#1890FF',
              colorText: 'rgba(0, 0, 0, 0.88)',
              colorPrimary: '#ffffff',
              /* here is your component tokens */
            },
          },
        }}
      >
        <Pagination
          align="center"
          onChange={this.changePage}
          showSizeChanger={false}
          defaultCurrent={currentPage}
          total={totalPages}
        />
      </ConfigProvider>
    ) : null

    return (
      // <div className={`body ${loading || error || offline ? 'body--middle' : 'body--center'}`}>
      <div className="body body--center">
        <SearchField searchValueChange={this.searchValueChange} />
        {spinner}
        {alarmMessage}
        {offlineMessage}
        {content}
        {pagination}
      </div>
    )
  }
}

// export default App
