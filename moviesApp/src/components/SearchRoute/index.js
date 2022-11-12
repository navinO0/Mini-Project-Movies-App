import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import PopularMoviesCard from '../PopularMoviesCard'

import FooterSection from '../FooterSection'

import './index.css'

const getApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class SearchRoute extends Component {
  state = {
    searchekey: '',
    fetchedList: [],
    vidsLength: 1,
    apistatus: getApiStatus.initial,
  }

  getSearchedData = async () => {
    this.setState({apistatus: getApiStatus.inprogress})
    const {searchekey} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchekey}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mehod: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()

      const {results} = jsonData
      const modifiedmoviesList = results.map(e => ({
        backdropPath: e.backdrop_path,
        id: e.id,
        overview: e.overview,
        posterPath: e.poster_path,
        title: e.title,
      }))
      const len = modifiedmoviesList.length
      this.setState({
        fetchedList: modifiedmoviesList,
        vidsLength: len,
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

  onChangeSearchKey = value => {
    this.setState({searchekey: value})
  }

  onClickSearchButton = () => {
    this.getSearchedData()
  }

  renderNoVids = () => {
    const {searchekey} = this.state
    return (
      <div className="no-vid-main-container">
        <div className="no-vids-sub-container">
          <div>
            <img
              src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1668012276/moviesapp/Group_7394_nlmks8.png"
              alt="no movies"
              className="no-vids-image"
            />
          </div>
          <p className="try-again-text">{`Your search for ${searchekey} did not find any matches`}</p>
        </div>
      </div>
    )
  }

  renderSearchedVideos = () => {
    const {fetchedList} = this.state
    return (
      <div className="popular-sub-container">
        <ul className="popular-movies-list-container">
          {fetchedList.map(eachOne => (
            <PopularMoviesCard key={eachOne.id} eachOne={eachOne} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoaderView = () => (
    <>
      <div className="react-loader-super-container">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  failureView = () => (
    <>
      <div className="failure-view-main-container">
        <div className="failure-view-card-container">
          <img
            src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1668012331/moviesapp/Background-Complete_hxribz.png"
            alt="no movies"
            className="failure-view-image"
          />
          <p className="try-again-text">
            Some thing went wrong. Please try again
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
        return this.renderSearchedVideos()
      case 'FAILURE':
        return this.failureView()
      case 'IN_PROGRESS':
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchekey, vidsLength} = this.state
    const novideos = vidsLength === 0
    const {location} = this.props
    const {pathname} = location
    const searchEn = pathname === '/search'

    return (
      <div className="popular-main-contaier">
        <Header
          searchEn={searchEn}
          onChangeSearchKey={this.onChangeSearchKey}
          searchekey={searchekey}
          onClickSearchButton={this.onClickSearchButton}
        />
        {novideos ? this.renderNoVids() : this.renderMovieDetailsUl()}
        <FooterSection />
      </div>
    )
  }
}

export default SearchRoute
