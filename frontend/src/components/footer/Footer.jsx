import'./Footer.css'
import {assets}from "../../assets/assets"

const Footer = () => {
  return (
    <>
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="logo" />
                <p>lorem dlkjoi dlkjoi d kjdoi dlkjoid doiholndlkd</p>
                <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="facebook" />
                    <img src={assets.twitter_icon} alt="twitter" />
                    <img src={assets.linkedin_icon} alt="linkedin" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>Compagny</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+1 65 465 42 23</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
           
        </div>
        <hr />
        <p className="footer-copyright">
            copyright 2024 All right reserved
        </p>
    </div>


      
    </>
  )
}

export default Footer
