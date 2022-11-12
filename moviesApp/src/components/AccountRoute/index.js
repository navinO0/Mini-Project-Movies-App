import Cookies from 'js-cookie'
import FooterSection from '../FooterSection'
import Header from '../Header'
import './index.css'

const AccountRoute = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="profile-main-container">
        <Header />
        <div className="profile-card-container">
          <div className="profile-sub-card-container">
            <h1 className="Account-main-heading">Account</h1>

            <div className="membership-container">
              <div className="user-name-pass-container">
                <p className="category-titles">Member ship</p>
                <div className="username-pass-content-container">
                  <p className="details-text">rahul@gmail.com</p>
                  <p className="details-text-pass">password : **********</p>
                </div>
              </div>

              <div className="user-name-pass-container">
                <div className="membership-container">
                  <p className="category-titles">plan details</p>
                </div>
                <div className="username-pass-content-container">
                  <div className="plan-dets">
                    <p className="details-text">Premium</p>
                    <p className="plan-span">Ultra HD</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button
                type="button"
                onClick={onClickLogout}
                className="logout-button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    </>
  )
}
export default AccountRoute
