import noPoster from './imgs/poster_not_found.png'

export default class ApiClient {
  constructor() {
    this.state = {
      // authorization:
      //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTYwOTQ4ZmI5NGUwNWU5ZTA3MWYxYjkwMjY5NDUwYiIsIm5iZiI6MTcyMTE5NjczMi4xNzAxOTEsInN1YiI6IjY2OTYzNDdlN2QyODhhMTBjODQ4ZTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mIt63yKNTjqy6TtCZmyaJfWM-5yX34i2WKqtI9A5yyo',
      shortDescSize: 200,
      baseUrl: new URL('https://api.themoviedb.org'),
      optionsGet: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTYwOTQ4ZmI5NGUwNWU5ZTA3MWYxYjkwMjY5NDUwYiIsIm5iZiI6MTcyMTE5NjczMi4xNzAxOTEsInN1YiI6IjY2OTYzNDdlN2QyODhhMTBjODQ4ZTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mIt63yKNTjqy6TtCZmyaJfWM-5yX34i2WKqtI9A5yyo',
        },
      },
    }
  }

  shortenDescription(desc) {
    if (desc.length < this.state.shortDescSize) return desc
    const lastSpace = desc.slice(0, this.state.shortDescSize).lastIndexOf(' ')
    return `${desc.slice(0, lastSpace)} ...`
  }

  async getResource(request, page) {
    const { baseUrl, optionsGet } = this.state
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

    // console.log('getResource')

    return {
      totalPages: resBody.total_pages,
      cinemaDataArr: resBody.results.map((cinemaData) => {
        const { poster_path, title, release_date, genre_ids, overview } = cinemaData

        // console.log('genre_ids', genre_ids)
        return {
          posterHref: poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : noPoster,
          movieTitle: title,
          releaseDate: release_date ? new Date(release_date) : null,
          // movieGenres: ['Action', 'Drama'],
          movieGenresIds: genre_ids,
          movieDescriptionFull: overview,
          movieDescriptionShort: this.shortenDescription(overview),
          generalRating: '3',
          userRating: '2',
        }
      }),
    }
  }

  async getGenresDict() {
    const { baseUrl, optionsGet } = this.state
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

    return resBody.genres
  }
}
