import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import PopularMoviesCard from '../PopularMoviesCard'

import './index.css'
import FooterSection from '../FooterSection'

const getApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class MovieItemDetailsRoute extends Component {
  state = {
    moviedetails: {},
    similarmovies: [],
    updatedgenres: [],
    updatedspokenlanguages: [],
    apistatus: getApiStatus.initial,
  }

  componentDidMount() {
    this.getMovieItemDetails()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    if (match.params.id !== prevProps.match.params.id) {
      this.getMovieItemDetails()
    }
  }

  onClickTryAgain = () => {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    this.setState({apistatus: getApiStatus.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()
      const movieDetail = jsonData.movie_details
      const updatedMovieDetails = {
        adult: movieDetail.adult,
        genres: movieDetail.genres,
        backdropPath: movieDetail.backdrop_path,
        budget: movieDetail.budget,
        id: movieDetail.id,
        overview: movieDetail.overview,
        posterPath: movieDetail.poster_path,
        releaseDate: movieDetail.release_date,
        runtime: movieDetail.runtime,
        similarMovies: movieDetail.similar_movies,
        spokenLanguages: movieDetail.spoken_languages,
        title: movieDetail.title,
        voteAverage: movieDetail.vote_average,
        voteCount: movieDetail.vote_count,
      }

      const updatedSimilarMovies = updatedMovieDetails.similarMovies.map(e => ({
        backdropPath: e.backdrop_path,
        id: e.id,
        posterPath: e.poster_path,

        title: e.title,
      }))

      const updatedSpokenLanguages = updatedMovieDetails.spokenLanguages.map(
        e => ({
          englishName: e.english_name,
          id: e.id,
        }),
      )
      const updatedGenres = updatedMovieDetails.genres.map(eachOne => ({
        id: eachOne.id,
        name: eachOne.name,
      }))

      this.setState({
        moviedetails: updatedMovieDetails,
        similarmovies: updatedSimilarMovies,
        updatedspokenlanguages: updatedSpokenLanguages,
        updatedgenres: updatedGenres,
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

  renderMovieDetails = () => {
    const {
      moviedetails,
      similarmovies,
      updatedspokenlanguages,
      updatedgenres,
    } = this.state

    const {
      adult,
      backdropPath,
      budget,
      overview,

      releaseDate,
      runtime,
      title,
      voteAverage,
      voteCount,
    } = moviedetails
    const yr = new Date(releaseDate)
    const releYr = yr.getFullYear()
    const ageRist = adult ? 'A' : 'U/A'
    const timeDuration = () => {
      const hours = Math.floor(runtime / 60)
      const mins = runtime % 60
      return `${hours}h ${mins}m`
    }
    const reDate = new Date(releaseDate)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const dispDate = reDate.toLocaleDateString('en-US', options)
    return (
      <>
        <div
          className="movie-banner-home"
          style={{
            backgroundImage: `
            linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(24, 24, 24, 0.546875) 38.26%,
    #181818 92.82%,
    #181818 98.68%,
    #181818 108.61%
  ),url(${backdropPath})`,
          }}
        >
          <Header />
          <div className="banner-content-super-container">
            <div className="banner-content-container">
              <h1 className="movie-item-details-banner-movie-name">{title}</h1>
              <div className="movie-duration-adult-year">
                <p className="movie-duration-text">{timeDuration()}</p>
                <p className="movie-adult-content-text">{ageRist}</p>
                <p className="movie-release-on-text">{releYr}</p>
              </div>
              <p className="movie-description">{overview}</p>
              <button type="button" className="play-banner-container">
                play
              </button>
            </div>
          </div>
        </div>

        <div className="movie-details-similar-container">
          <div className="movie-item-details-container">
            <div className="movie-details-card">
              <h1 className="details-category-titles">genres</h1>
              <ul className="details-ul-list-container">
                {updatedgenres.map(eachOne => {
                  const {name} = eachOne
                  return (
                    <li key={eachOne.id} className="list-item">
                      <p className="details-li-item">{name}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="movie-details-card">
              <h1 className="details-category-titles">Audio Available</h1>
              <ul className="details-ul-list-container">
                {updatedspokenlanguages.map(eachOne => {
                  const {englishName} = eachOne
                  return (
                    <li key={eachOne.id} className="list-item">
                      <p className="details-li-item">{englishName}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="movie-details-card">
              <h1 className="details-category-titles">Rating Count</h1>
              <p className="details-li-item">{voteCount}</p>
              <h1 className="details-category-titles">Rating Average</h1>
              <p className="details-li-item">{voteAverage}</p>
            </div>
            <div className="movie-details-card">
              <h1 className="details-category-titles">Budget</h1>
              <p className="details-li-item">{budget}</p>
              <h1 className="details-category-titles">Release Date</h1>
              <p className="details-li-item">{dispDate}</p>
            </div>
          </div>
          <div className="similar-movies-list">
            <h1 className="movies-like-heading">More like this</h1>
            <ul className="popular-movies-ul-list-container">
              {similarmovies.map(eachOne => (
                <li key={eachOne.id} className="list-item">
                  <PopularMoviesCard eachOne={eachOne} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <>
      <Header />
      <div className="react-loader-super-container">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  failureView = () => (
    <>
      <Header />
      <div className="failure-view-main-container">
        <div className="failure-view-card-container">
          <img
            src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1668012331/moviesapp/Background-Complete_hxribz.png"
            alt="failure view"
            className="failure-view-image"
          />
          <p className="try-again-text">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="try-again-button"
            onClick={this.onClickTryAgain}
          >
            try again
          </button>
        </div>
      </div>
    </>
  )

  renderMovieDetailsUl = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case 'SUCCESS':
        return this.renderMovieDetails()
      case 'FAILURE':
        return this.failureView()
      case 'IN_PROGRESS':
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-item-details-main-container">
        {this.renderMovieDetailsUl()}
        <FooterSection />
      </div>
    )
  }
}

export default MovieItemDetailsRoute
