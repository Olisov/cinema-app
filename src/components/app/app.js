/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import { React, Component, PureComponent } from 'react'
import { Spin, Alert, ConfigProvider, Pagination, Tabs } from 'antd'

import ApiClient from '../api-client'
import './app.css'
import CardsField from '../cards-field'
import SearchField from '../search-field'
import { AppProvider } from '../app-context'

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
      activeTab: 'Search',
      // request: 'return',
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
      // ratedCinemaDataArr: [],
      genresDict: null,
      guestSessionId: null,

      // guestSessionExpiresAt: '2024-08-04 06:44:19 UTC',
    }
  }

  componentDidMount() {
    const { request, currentPage } = this.state
    this.getData(request, currentPage)
    this.getGenres()
    this.createGuestSession()
    // this.guestSessionControl()
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, request, activeTab, guestSessionId } = this.state
    if (activeTab !== prevState.activeTab) {
      if (activeTab === 'Search') this.getData(request, currentPage)
      else this.getData(null, currentPage, guestSessionId)
    } else if (currentPage !== prevState.currentPage || request !== prevState.request)
      this.getData(request, currentPage)

    console.log('componentDidUpdate')
  }

  getData(request, page, guestSessionId) {
    if (!guestSessionId) {
      this.apiClientInstance
        .getSearchCinema(request, page)
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
    } else {
      this.apiClientInstance
        .getRatedCinema(guestSessionId, page)
        .then((responseBody) => {
          this.setState({
            cinemaDataArr: responseBody.cinemaDataArr,
            totalPages: responseBody.totalPages,
            loading: false,
          })
        })
        .catch((errorData) => {
          this.setState({ error: errorData.toString(), loading: false })
        })
    }
  }

  getGenres() {
    this.apiClientInstance
      .getGenresDict()
      .then((responseBody) => {
        const { genres } = responseBody
        // console.log(responseBody)
        this.setState({ genresDict: genres })
      })
      .catch((errorData) => {
        this.setState({ error: errorData.toString(), loading: false })
      })
  }

  randomHash = () => Math.random().toString(36).slice(2)

  searchValueChange = (newValue) => {
    this.setState({ request: newValue.target.value, loading: true })
  }

  tabChange = (activeTab) => {
    this.setState({ activeTab, cinemaDataArr: [], loading: true })
  }

  changePage = (newPageNum) => {
    // console.log(newPageNum)
    this.setState({ currentPage: newPageNum, loading: true })
  }

  // updateCinemaDataArr = (id, newRating) => {
  //   this.setState((lastState) => {
  //     const { cinemaDataArr } = lastState
  //     const idx = cinemaDataArr.findIndex((el) => el.id === id)

  //     const editedCinema = { ...cinemaDataArr[idx] }
  //     editedCinema.userRating = newRating

  //     console.log('editedCinema', editedCinema)
  //     return {
  //       // cinemaDataArr: [...cinemaDataArr.slice(0, idx), editedCinema, ...cinemaDataArr.slice(idx + 1)],
  //       cinemaDataArr: [editedCinema],
  //     }
  //   })
  // }

  // addRatedCinema = (id, newRating) => {
  //   this.setState((lastState) => {
  //     const { cinemaDataArr } = lastState
  //     const idx = cinemaDataArr.findIndex((el) => el.id === id)

  //     const ratedCinema = { ...cinemaDataArr[idx] }
  //     ratedCinema.userRating = newRating

  //     return {
  //       ratedCinemaDataArr: [...lastState.ratedCinemaDataArr, ratedCinema],
  //     }
  //   })
  // }

  // checkRatedCinema = (id) => {
  //   const { ratedCinemaDataArr } = this.state
  //   const idx = ratedCinemaDataArr.findIndex((el) => el.id === id)
  //   return idx >= 0
  // }

  // updateRatedCinema = (id, newRating) => {
  //   this.setState((lastState) => {
  //     const { ratedCinemaDataArr } = lastState
  //     const idx = ratedCinemaDataArr.findIndex((el) => el.id === id)

  //     const editedCinema = { ...ratedCinemaDataArr[idx] }
  //     editedCinema.userRating = newRating

  //     return {
  //       ratedCinemaDataArr: [...ratedCinemaDataArr.slice(0, idx), editedCinema, ...ratedCinemaDataArr.slice(idx + 1)],
  //     }
  //   })
  // }

  // rateCinema = (id, newRate) => {
  //   if (this.checkRatedCinema(id)) this.updateRatedCinema(id, newRate)
  //   else this.addRatedCinema(id, newRate)
  // }

  // test = () => {
  //   this.setState({ loading: true })
  // }

  guestSessionControl() {
    // const { guestSessionId, guestSessionExpiresAt } = this.state
    // const guestSessionIsRelevant = new Date(guestSessionExpiresAt) - new Date() > 0

    // const guestSessionId = localStorage.getItem('guestSessionId')
    // const guestSessionExpiresAt = localStorage.getItem('guestSessionExpiresAt')
    // const guestSessionIsRelevant = new Date(guestSessionExpiresAt) - new Date() > 0
    // if (!guestSessionId || !guestSessionExpiresAt || !guestSessionIsRelevant) {
    //   localStorage.removeItem('guestSessionId')
    //   localStorage.removeItem('guestSessionExpiresAt')
    //   this.createGuestSession()
    // } else this.setState({ guestSessionId })

    this.createGuestSession()

    // if (!guestSessionIsRelevant) this.createGuestSession()
  }

  createGuestSession() {
    this.apiClientInstance
      .newGuestSession()
      .then((responseBody) => {
        const { guest_session_id: guestSessionId, expires_at: guestSessionExpiresAt } = responseBody
        localStorage.setItem('guestSessionId', guestSessionId)
        localStorage.setItem('guestSessionExpiresAt', guestSessionExpiresAt)
        this.setState({ guestSessionId })
      })
      .catch((errorData) => {
        this.setState({ error: errorData.toString(), loading: false })
      })
  }

  render() {
    const { cinemaDataArr, loading, error, offline, currentPage, totalPages, genresDict, request, guestSessionId } =
      this.state

    const spinner = loading ? <Spin size="large" className="spin--center" key={this.randomHash()} /> : null
    const alarmMessage =
      error && !offline ? <Alert message={error} type="error" showIcon key={this.randomHash()} /> : null
    const offlineMessage = offline ? (
      <Alert message="Offline. Check you're internet connection or VPN" type="error" showIcon key={this.randomHash()} />
    ) : null

    console.log('cinemaDataArr.length', cinemaDataArr)
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
        key: 'Search',
        children: [
          <SearchField key={this.randomHash()} searchValueChange={this.searchValueChange} curValue={request} />,
          spinner,
          alarmMessage,
          offlineMessage,
          content,
          pagination,
        ],
      },
      {
        label: 'Rated',
        key: 'Rated',
        children: [spinner, alarmMessage, offlineMessage, content, pagination],
      },
    ]

    return (
      <AppProvider
        value={{
          genresDict,
          apiClientInstance: this.apiClientInstance,
          guestSessionId,
          updateCinemaDataArr: this.updateCinemaDataArr,
        }}
      >
        <div className="body body--center">
          <Tabs
            defaultActiveKey="1"
            // defaultActiveKey={activeTab}
            destroyInactiveTabPane="false"
            centered
            items={tabsContent}
            onChange={(newTabs) => {
              console.log('tabs', newTabs)

              this.tabChange(newTabs)

              // this.searchValueChange({ target: { value: '' } })
              // if (newTabs === 'Search') this.getData(request, currentPage)
              // else if (newTabs === 'Rated') this.getData(null, currentPage, guestSessionId)
              // this.setState({ activeTab: newTabs, loading: true })

              // this.test()
              // this.setState({ loading: true })
              // this.setState((prevState) => {
              //   return { loading: !prevState.loading }
              // })
              // const { request, currentPage } = this.state
            }}
          />
        </div>
      </AppProvider>
    )
  }
}

// export default App
