import noPoster from './imgs/poster_not_found.png'

export default class ApiClient {
  constructor() {
    this.storage = {
      // authorization:
      //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTYwOTQ4ZmI5NGUwNWU5ZTA3MWYxYjkwMjY5NDUwYiIsIm5iZiI6MTcyMTE5NjczMi4xNzAxOTEsInN1YiI6IjY2OTYzNDdlN2QyODhhMTBjODQ4ZTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mIt63yKNTjqy6TtCZmyaJfWM-5yX34i2WKqtI9A5yyo',
      baseUrl: new URL('https://api.themoviedb.org'),
      optionsGet: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTYwOTQ4ZmI5NGUwNWU5ZTA3MWYxYjkwMjY5NDUwYiIsIm5iZiI6MTcyMTE5NjczMi4xNzAxOTEsInN1YiI6IjY2OTYzNDdlN2QyODhhMTBjODQ4ZTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mIt63yKNTjqy6TtCZmyaJfWM-5yX34i2WKqtI9A5yyo',
        },
      },
      ratedCinemaDataArr: [],
      shortDescSize: 200,
    }
  }

  updateRatedArr = (id, newRate) => {
    const { ratedCinemaDataArr } = this.storage
    const idx = ratedCinemaDataArr.findIndex((el) => el.id === id)

    if (idx >= 0) ratedCinemaDataArr[idx] = { id, rating: newRate }
    else ratedCinemaDataArr.push({ id, rating: newRate })
    // console.log('ratedCinemaDataArr', ratedCinemaDataArr)
  }

  // savedRate = () => {
  //   return this.storage.ratedCinemaDataArr
  // }

  shortenDescription(desc) {
    const { shortDescSize } = this.storage
    if (desc.length < shortDescSize) return desc
    const lastSpace = desc.slice(0, this.storage.shortDescSize).lastIndexOf(' ')
    return `${desc.slice(0, lastSpace)} ...`
  }

  async getSearchCinema(request, page) {
    const { baseUrl, optionsGet } = this.storage
    const searchUrl = new URL('/3/search/movie', baseUrl)
    const searchParams = new URLSearchParams({
      query: request,
      include_adult: 'false',
      language: 'en-US',
      page,
    })
    searchUrl.search = searchParams
    // console.log(searchUrl)

    const res = await fetch(searchUrl, optionsGet)

    if (!res.ok) {
      throw new Error(`Could not fetch ${searchUrl.toString()}, received ${res.status}`)
    }
    const resBody = await res.json()

    return {
      totalPages: resBody.total_pages,
      cinemaDataArr: resBody.results.map((cinemaData) => {
        const { poster_path, title, release_date, genre_ids, overview, vote_average, id } = cinemaData
        const { ratedCinemaDataArr } = this.storage
        const idx = ratedCinemaDataArr.findIndex((el) => el.id === id)

        const userRating = idx >= 0 ? ratedCinemaDataArr[idx].rating : null

        const { rating = userRating } = cinemaData

        // console.log('cinemaData', cinemaData)
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
