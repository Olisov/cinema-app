/* eslint-disable no-unused-vars */
import { React, Component } from 'react'
import { Spin, Alert, ConfigProvider, Pagination, Tabs } from 'antd'

import ApiClient from '../api-client'
import './app.css'
import CardsField from '../cards-field'
import SearchField from '../search-field'
import { appProvider } from '../app-context'

// const { Meta } = Card

// const style = { background: '#0092ff', padding: '8px 0' }

export default class App extends Component {
  apiClientInstance = new ApiClient()

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
    this.apiClientInstance
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

  randomHash = () => Math.random().toString(36).slice(2)

  render() {
    const { cinemaDataArr, loading, error, offline, currentPage, totalPages } = this.state

    const spinner = loading ? <Spin size="large" className="spin--center" key={this.randomHash()} /> : null
    const alarmMessage =
      error && !offline ? <Alert message={error} type="error" showIcon key={this.randomHash()} /> : null
    const offlineMessage = offline ? (
      <Alert message="Offline. Check you're internet connection or VPN" type="error" showIcon key={this.randomHash()} />
    ) : null

    const hasData = !(loading || error || offline)
    const content = hasData ? <CardsField cinemaDataArr={cinemaDataArr} key={this.randomHash()} /> : null
    const pagination =
      hasData && cinemaDataArr.length >= 1 ? (
        <ConfigProvider
          key={this.randomHash()}
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

    // const defActiveTabKey = this.randomHash()
    const tabsContent = [
      {
        label: 'Search',
        key: this.randomHash(),
        children: [
          <SearchField key={this.randomHash()} searchValueChange={this.searchValueChange} />,
          spinner,
          alarmMessage,
          offlineMessage,
          content,
          pagination,
        ],
      },
      {
        label: 'Rated',
        key: this.randomHash(),
        children: [spinner, alarmMessage, offlineMessage, content, pagination],
      },
    ]

    return (
      <appProvider value={this.apiClientInstance}>
        <div className="body body--center">
          <Tabs defaultActiveKey="1" centered items={tabsContent} />
        </div>
      </appProvider>
    )
  }
}

// export default App
