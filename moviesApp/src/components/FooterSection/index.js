import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const FooterSection = () => (
  <div className="footer-main-container">
    <div className="footer-card-container">
      <div className="footer-icons-container">
        <FaGoogle className="footer-icons" />
        <FaTwitter className="footer-icons" />
        <FaInstagram className="footer-icons" />
        <FaYoutube className="footer-icons" />
      </div>
      <p className="contact-us-text">Contact Us</p>
    </div>
  </div>
)
export default FooterSection
