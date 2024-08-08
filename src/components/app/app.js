import { React, Component } from 'react'
import { Spin, Alert, ConfigProvider, Pagination, Tabs } from 'antd'

import ApiClient from '../../api-client'
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
      request: null,
      currentPage: 1,
      totalCinemaItem: null,
      cinemaDataArr: [],
      genresDict: null,
      guestSessionId: null,
    }
  }

  componentDidMount() {
    this.guestSessionControl()
    this.getGenres()
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, request, activeTab, guestSessionId } = this.state

    if (
      guestSessionId !== prevState.guestSessionId ||
      activeTab !== prevState.activeTab ||
      currentPage !== prevState.currentPage ||
      request !== prevState.request
    )
      this.getData()
  }

  getData() {
    const { request, currentPage, activeTab, guestSessionId } = this.state

    if (activeTab === 'Rated') {
      this.apiClientInstance
        .getRatedCinema(guestSessionId, currentPage)
        .then((responseBody) => {
          this.setState({
            cinemaDataArr: responseBody.cinemaDataArr,
            totalCinemaItem: responseBody.totalCinemaItem,
            loading: false,
          })
        })
        .catch((errorData) => {
          this.setState({ error: errorData.toString(), loading: false })
        })
    } else {
      this.apiClientInstance
        .bufferRatedCinema(guestSessionId)
        .then(() => {
          this.apiClientInstance.getSearchCinema(request, currentPage).then((responseBody) => {
            this.setState({
              cinemaDataArr: responseBody.cinemaDataArr,
              totalCinemaItem: responseBody.totalCinemaItem,
              loading: false,
            })
          })
        })
        .catch((errorData) => {
          if (errorData.message === 'Failed to fetch') this.setState({ offline: true })
          else this.setState({ error: errorData.toString() })
          this.setState({ loading: false })
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

  guestSessionControl = () => {
    const guestSessionId = localStorage.getItem('guestSessionId')
    const guestSessionExpiresAt = localStorage.getItem('guestSessionExpiresAt')
    const guestSessionIsRelevant = new Date(guestSessionExpiresAt) - new Date() > 0

    if (!guestSessionId || !guestSessionExpiresAt || !guestSessionIsRelevant) {
      localStorage.removeItem('guestSessionId')
      localStorage.removeItem('guestSessionExpiresAt')
      this.createGuestSession()
    } else this.setState({ guestSessionId })
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
        const { guest_session_id: guestSessionId, expires_at: guestSessionExpiresAt } = responseBody
        this.setState({ guestSessionId })
        localStorage.setItem('guestSessionId', guestSessionId)
        localStorage.setItem('guestSessionExpiresAt', guestSessionExpiresAt)
      })
      .catch((errorData) => {
        this.setState({ error: errorData.toString(), loading: false })
      })
  }

  render() {
    const {
      cinemaDataArr,
      loading,
      error,
      offline,
      currentPage,
      totalCinemaItem,
      genresDict,
      request,
      guestSessionId,
    } = this.state

    const spinner = loading ? <Spin size="large" className="spin--center" key={this.randomHash()} /> : null

    /* 
    spinner, alarmMessage and etc. without key throw the error in console^

    const spinner = loading ? <Spin size="large" className="spin--center" /> : null
    console.js:288 Warning: Each child in a list should have a unique "key" prop.

    Check the render method of `TabPane`. It was passed a child from App. See https://reactjs.org/link/warning-keys for more information.
        at Spin (http://localhost:3000/static/js/bundle.js:19953:18)
        at http://localhost:3000/static/js/bundle.js:60453:25
        at DomWrapper (http://localhost:3000/static/js/bundle.js:52841:90)
        at http://localhost:3000/static/js/bundle.js:52543:32
        at div
        at div
        at TabPanelList (http://localhost:3000/static/js/bundle.js:60511:18)
        at div
        at http://localhost:3000/static/js/bundle.js:60616:18
        at Tabs (http://localhost:3000/static/js/bundle.js:21672:7)
        at div
        at App (http://localhost:3000/main.b93fc9760cd5b6789783.hot-update.js:41:5)
    */

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
            defaultPageSize="20"
            total={totalCinemaItem > 10000 ? 10000 : totalCinemaItem} // maxPageNum: 500
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
            destroyInactiveTabPane
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
