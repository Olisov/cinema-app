import noPoster from './imgs/poster_not_found.png'

export default class ApiClient {
  constructor() {
    this.state = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTYwOTQ4ZmI5NGUwNWU5ZTA3MWYxYjkwMjY5NDUwYiIsIm5iZiI6MTcyMTE5NjczMi4xNzAxOTEsInN1YiI6IjY2OTYzNDdlN2QyODhhMTBjODQ4ZTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mIt63yKNTjqy6TtCZmyaJfWM-5yX34i2WKqtI9A5yyo',
      shortDescSize: 150,
    }
  }

  shortenDescription(desc) {
    if (desc.length < this.state.shortDescSize) return desc
    const lastSpace = desc.slice(0, this.state.shortDescSize).lastIndexOf(' ')
    return `${desc.slice(0, lastSpace)} ...`
  }

  async getResource(request, page) {
    const baseUrl = new URL('https://api.themoviedb.org/3/search/movie')
    const searchParams = new URLSearchParams({
      query: request,
      include_adult: 'false',
      language: 'en-US',
      page,
    })
    baseUrl.search = searchParams

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: this.state.authorization,
      },
    }

    const res = await fetch(baseUrl, options)

    if (!res.ok) {
      throw new Error(`Could not fetch ${baseUrl.toString()}, received ${res.status}`)
    }
    const resBody = await res.json()
    // console.log(resBody)

    // const shortResp = resBody.results.slice(0, 4)

    return {
      totalPages: resBody.total_pages,
      cinemaDataArr: resBody.results.map((cinemaData) => {
        const { poster_path, title, release_date, genre_ids, overview } = cinemaData

        return {
          // posterHref: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          posterHref: poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : noPoster,
          movieTitle: title,
          releaseDate: release_date ? new Date(release_date) : null,
          // releaseDate: new Date(),
          movieGenres: ['Action', 'Drama'],
          movieDescriptionFull: overview,
          movieDescriptionShort: this.shortenDescription(overview),
          generalRating: '3',
          userRating: '2',
        }
      }),
    }
  }
}
