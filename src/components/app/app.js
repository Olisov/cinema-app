import { React, Component, PureComponent } from 'react'
import { Spin, Alert, ConfigProvider, Pagination, Tabs } from 'antd'

import ApiClient from '../api-client'
import './app.css'
import CardsField from '../cards-field'
import SearchField from '../search-field'
import { AppProvider } from '../app-context'

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
      genresDict: null,
      guestSessionId: null,
    }
  }

  componentDidMount() {
    const { request, currentPage } = this.state
    this.getGenres()
    this.getData(request, currentPage)
    this.createGuestSession()
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, request, activeTab, guestSessionId } = this.state
    if (activeTab !== prevState.activeTab) {
      if (activeTab === 'Search') this.getData(request, currentPage)
      else this.getData(null, currentPage, guestSessionId)
    } else if (currentPage !== prevState.currentPage || request !== prevState.request)
      this.getData(request, currentPage)
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
    this.setState({ activeTab, cinemaDataArr: [], currentPage: 1, loading: true })
  }

  changePage = (newPageNum) => {
    this.setState({ currentPage: newPageNum, loading: true })
  }

  createGuestSession() {
    this.apiClientInstance
      .newGuestSession()
      .then((responseBody) => {
        const { guest_session_id: guestSessionId } = responseBody
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
            destroyInactiveTabPane="false"
            centered
            items={tabsContent}
            onChange={(newTabs) => {
              this.tabChange(newTabs)
            }}
          />
        </div>
      </AppProvider>
    )
  }
}
