import noPoster from '../assets/poster_not_found.png'

export default class ApiClient {
  constructor() {
    this.auth =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTYwOTQ4ZmI5NGUwNWU5ZTA3MWYxYjkwMjY5NDUwYiIsIm5iZiI6MTcyMTE5NjczMi4xNzAxOTEsInN1YiI6IjY2OTYzNDdlN2QyODhhMTBjODQ4ZTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mIt63yKNTjqy6TtCZmyaJfWM-5yX34i2WKqtI9A5yyo'

    this.storage = {
      baseUrl: new URL('https://api.themoviedb.org'),
      optionsGet: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: this.auth,
        },
      },
      optionsPost: {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: this.auth,
        },
        body: null,
      },
      ratedCinemaDataArr: [],
      shortDescSize: 200,
    }
  }

  updateRatedArr = (id, newCinemaData) => {
    const { ratedCinemaDataArr } = this.storage
    const idx = ratedCinemaDataArr.findIndex((el) => el.id === id)

    if (idx >= 0) ratedCinemaDataArr[idx] = newCinemaData
    else ratedCinemaDataArr.push(newCinemaData)
  }

  shortenDescription(desc) {
    const { shortDescSize } = this.storage
    if (desc.length < shortDescSize) return desc
    const lastSpace = desc.slice(0, this.storage.shortDescSize).lastIndexOf(' ')
    return `${desc.slice(0, lastSpace)} ...`
  }

  async getSearchCinema(request, page) {
    const { baseUrl, optionsGet } = this.storage
    const searchUrl = request ? new URL('/3/search/movie', baseUrl) : new URL('/3/discover/movie', baseUrl)
    const requestSearchParams = new URLSearchParams({
      query: request,
      include_adult: 'false',
      language: 'en-US',
      page,
    })
    const discoverSearchParams = new URLSearchParams({
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page,
      sort_by: 'popularity.desc',
    })
    const searchParams = request ? requestSearchParams : discoverSearchParams
    searchUrl.search = searchParams

    const res = await fetch(searchUrl, optionsGet)

    if (!res.ok) {
      throw new Error(`Could not fetch ${searchUrl.toString()}, received ${res.status}`)
    }
    const resBody = await res.json()

    return {
      totalCinemaItem: resBody.total_results,
      cinemaDataArr: resBody.results.map((cinemaData) => {
        const { poster_path, title, release_date, genre_ids, overview, vote_average, id } = cinemaData
        const { ratedCinemaDataArr } = this.storage
        const idx = ratedCinemaDataArr.findIndex((el) => el.id === id)

        const userRating = idx >= 0 ? ratedCinemaDataArr[idx].userRating : null

        const { rating = userRating } = cinemaData

        return {
          posterHref: poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : noPoster,
          movieTitle: title,
          releaseDate: release_date,
          movieGenresIds: JSON.stringify(genre_ids),
          movieDescriptionFull: overview,
          movieDescriptionShort: this.shortenDescription(overview),
          generalRating: vote_average,
          userRating: rating,
          id,
        }
      }),
    }
  }

  async getRatedCinema(guestSessionId, page) {
    const { baseUrl, optionsGet } = this.storage
    const searchUrl = new URL(`/3/guest_session/${guestSessionId}/rated/movies`, baseUrl)
    const searchParams = new URLSearchParams({
      language: 'en-US',
      page,
      sort_by: 'created_at.asc',
    })
    searchUrl.search = searchParams

    const res = await fetch(searchUrl, optionsGet)

    if (!res.ok) {
      throw new Error(`Could not fetch ${searchUrl.toString()}, received ${res.status}`)
    }
    const resBody = await res.json()

    return {
      totalCinemaItem: resBody.total_results,
      cinemaDataArr: resBody.results.map((cinemaData) => {
        const { poster_path, title, release_date, genre_ids, overview, vote_average, id, rating } = cinemaData
        return {
          posterHref: poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : noPoster,
          movieTitle: title,
          releaseDate: release_date,
          movieGenresIds: JSON.stringify(genre_ids),
          movieDescriptionFull: overview,
          movieDescriptionShort: this.shortenDescription(overview),
          generalRating: vote_average,
          userRating: rating,
          id,
        }
      }),
    }
  }

  async bufferRatedCinema(guestSessionId) {
    let page = 1
    const ratedFirstPage = await this.getRatedCinema(guestSessionId, page)

    ratedFirstPage.cinemaDataArr.forEach((Data) => {
      this.updateRatedArr(Data.id, Data)
    })

    while (ratedFirstPage.totalCinemaItem > 20 * page) {
      page += 1
      const ratedPage = await this.getRatedCinema(guestSessionId, page)

      ratedPage.cinemaDataArr.forEach((Data) => {
        this.updateRatedArr(Data.id, Data)
      })
    }
  }

  async setRate(id, newRate, newCinemaData, guestSessionId) {
    const { baseUrl, optionsPost } = this.storage
    const searchUrl = new URL(`/3/movie/${id}/rating`, baseUrl)
    const searchParams = new URLSearchParams({ guest_session_id: guestSessionId })
    optionsPost.body = JSON.stringify({ value: newRate })
    searchUrl.search = searchParams

    this.updateRatedArr(id, newCinemaData)

    const res = await fetch(searchUrl, optionsPost)

    if (!res.ok) {
      throw new Error(`Could not fetch ${searchUrl.toString()}, received ${res.status}`)
    }
  }

  async getGenresDict() {
    const { baseUrl, optionsGet } = this.storage
    const genresReqUrl = new URL('/3/genre/movie/list', baseUrl)

    const searchParams = new URLSearchParams({
      language: 'en',
    })
    genresReqUrl.search = searchParams

    const res = await fetch(genresReqUrl, optionsGet)
    if (!res.ok) {
      throw new Error(`Could not fetch ${genresReqUrl.toString()}, received ${res.status}`)
    }
    const resBody = await res.json()

    return resBody
  }

  async newGuestSession() {
    const { baseUrl, optionsGet } = this.storage
    const newGuestSessionUrl = new URL('/3/authentication/guest_session/new', baseUrl)

    const res = await fetch(newGuestSessionUrl, optionsGet)
    if (!res.ok) {
      throw new Error(`Could not fetch ${newGuestSessionUrl.toString()}, received ${res.status}`)
    }
    const resBody = await res.json()

    return resBody
  }
}
