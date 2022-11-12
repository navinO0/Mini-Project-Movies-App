import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-main-container">
    <div className="not-fount-content-card">
      <h1 className="not-found-heading">Lost Your Way ?</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found <br /> Please go
        back to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="go-to-home-btn">
          Go to home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
