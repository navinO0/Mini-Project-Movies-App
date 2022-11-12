import {Link} from 'react-router-dom'
import './index.css'

const PopularMoviesCard = props => {
  const {eachOne} = props

  const {posterPath, title, id} = eachOne

  return (
    <li className="popular-movie-card-container">
      <Link to={`/movies/${id}`} className="link-item">
        <img src={posterPath} alt={title} className="popular-card-image" />
      </Link>
    </li>
  )
}

export default PopularMoviesCard
