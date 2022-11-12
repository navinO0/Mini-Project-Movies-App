import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import SliderMovieCard from '../SliderMovieCard'

/* Add css to your project */
import './index.css'

const getApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

class MovieCarousal extends Component {
  state = {trendingVideos: [], apistatus: getApiStatus.initial}

  componentDidMount() {
    this.getOriginalsData()
  }

  onClickTryAgain = () => {
    this.getOriginalsData()
  }

  getOriginalsData = async () => {
    const {apiUrl} = this.props
    this.setState({apistatus: getApiStatus.inprogress})

    const token = Cookies.get('jwt_token')

    const url = apiUrl
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const trendingData = await response.json()
      const resultData = trendingData.results

      const modifiedTrendingData = resultData.map(e => ({
        backdropPath: e.backdrop_path,
        id: e.id,
        overview: e.overview,
        posterPath: e.poster_path,
        title: e.title,
      }))

      this.setState({
        trendingVideos: modifiedTrendingData,
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

  renderLoaderView = () => (
    <>
      <div className="carou-react-loader-super-container">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  failureView = () => (
    <>
      <div className="carou-failure-view-main-container">
        <img
          src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1668213303/moviesapp/alert-triangle_jiah9l.png"
          alt="failure view"
          className="coution-image"
        />
        <div className="failure-view-card-container">
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
        return this.renderSlider()
      case 'FAILURE':
        return this.failureView()
      case 'IN_PROGRESS':
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderSlider = () => {
    const {trendingVideos} = this.state

    return (
      <>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <Slider {...settings}>
          {trendingVideos.map(eachOne => (
            <SliderMovieCard key={eachOne.id} eachOne={eachOne} />
          ))}
        </Slider>
      </>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderMovieDetailsUl()}</div>
      </div>
    )
  }
}

export default MovieCarousal
