import {Link} from 'react-router-dom'
import './index.css'

const SliderMovieCard = props => {
  const {eachOne} = props
  const {posterPath, title, id} = eachOne

  return (
    <li className="slider-popular-movie-card-container" key={id}>
      <Link to={`/movies/${id}`}>
        <img
          src={posterPath}
          alt={title}
          className="slider-popular-card-image"
        />
      </Link>
    </li>
  )
}

export default SliderMovieCard
