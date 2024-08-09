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

  getData = () => {
    const { currentPage, activeTab, guestSessionId } = this.state

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
          if (errorData.status === 404) {
            this.setState({ cinemaDataArr: [], loading: false })
          } else {
            this.setState({ error: `Could not get rated cinema, received ${errorData.status}`, loading: false })
          }
        })
    } else {
      this.apiClientInstance
        .bufferRatedCinema(guestSessionId)
        .then(() => {
          this.searchRequest()
        })
        .catch((err) => {
          if (err.status === 404) {
            this.searchRequest()
          } else {
            this.setState({ error: `Could not get rated cinema, received ${err.status}`, loading: false })
          }
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

  searchRequest = () => {
    const { request, currentPage } = this.state
    this.apiClientInstance
      .getSearchCinema(request, currentPage)
      .then((responseBody) => {
        this.setState({
          cinemaDataArr: responseBody.cinemaDataArr,
          totalCinemaItem: responseBody.totalCinemaItem,
          loading: false,
        })
      })
      .catch((errorData) => {
        if (errorData.message === 'Failed to fetch') this.setState({ offline: true })
        else this.setState({ error: errorData.toString() })
        this.setState({ loading: false })
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

    const spinner = loading ? <Spin size="large" className="spin--center" /> : null
    const alarmMessage = error && !offline ? <Alert message={error} type="error" showIcon /> : null
    const offlineMessage = offline ? (
      <Alert message="Offline. Check you're internet connection or VPN" type="error" showIcon />
    ) : null

    const hasData = !(loading || error || offline)
    const content = hasData ? <CardsField cinemaDataArr={cinemaDataArr} /> : null
    const pagination =
      hasData && cinemaDataArr.length >= 1 ? (
        <ConfigProvider
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

    const searchPage = (
      <>
        <SearchField searchValueChange={this.searchValueChange} curValue={request} />
        {spinner} {alarmMessage} {offlineMessage} {content} {pagination}
      </>
    )

    const ratedPage = (
      <>
        {spinner} {alarmMessage} {offlineMessage} {content} {pagination}
      </>
    )

    const tabsContent = [
      {
        label: 'Search',
        key: 'Search',
        children: searchPage,
      },
      {
        label: 'Rated',
        key: 'Rated',
        children: ratedPage,
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
