import React from 'react'
import "./LogReg.scss"
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoLinkedin } from "react-icons/bi";

import { useNavigate } from "react-router-dom"

export const Register = () => {

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
            <div class="form-box  ">
                <form >
                    <h2>Sign Up</h2>
                    <div class="input-box">
                        {/* <span class="icon"><i class='bx bx-user'></i></span> */}
                        <input type="text" required />
                        <label>Username</label>
                    </div>

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

                    <button type="submit" class="btn">Sign up</button>

                    <div class="login-register">
                        <p>Already have an account? <a class="login-link" onClick={() => navigate("/login")}>Sign in</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

