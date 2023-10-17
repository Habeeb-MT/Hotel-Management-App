import React, { useContext } from 'react'
import "./LogReg.scss"
// import { DarkLightContext } from '../../Contexts/DarkLightContext'
// import { Navbar } from '../../Components/Navbar'
// import bgimage from "../../Images/img.jpg"
// import image from "../../Images/pic.jpg"
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoLinkedin } from "react-icons/bi";
import { useNavigate } from "react-router-dom"
export const Login = () => {
    const navigate = useNavigate();

    return (

        <div class="containerlog" >
            <div class="contentlog">
                <div class="textcontent">
                    <h2>Welcome <br /><span>Explore More on Us!</span></h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non asperiores nemo eveniet soluta
                        voluptatem.</p>
                    <div class="social">
                        <a href="#"><BiLogoFacebook /></a>
                        <a href="#"><BiLogoTwitter /></a>
                        <a href="#"><BiLogoInstagram /></a>
                        <a href="#"><BiLogoLinkedin /></a>
                    </div>
                </div>
            </div>
            <div class="form-box ">
                <form >
                    <h2>Sign In</h2>
                    <div class="input-box">
                        {/* <span class="icon"><i class='bx bxl-gmail'></i></span> */}
                        <input type="text" required />
                        <label>Email</label>
                    </div>

                    <div class="input-box">
                        {/* <span class="icon"><i class='bx bxs-lock-alt' ></i></span> */}
                        <input type="password" required />
                        <label>Password</label>
                    </div>

                    <div class="remember-forgot">
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit" class="btn">Sign in</button>

                    <div class="login-register">
                        <p>New user? <a class="register-link" onClick={() => navigate("/register")}>Sign up</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
