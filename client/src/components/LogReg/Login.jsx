import React, { useContext, useState } from 'react'
import "./LogReg.css"
import axios from 'axios';
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoLinkedin } from "react-icons/bi";
import { useNavigate } from "react-router-dom"
import Back from '../common/Back';
import img from "../images/abt.jpg"

export const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', { email, password });

            // Handle successful login (e.g., store JWT token and redirect)
            // Assuming the server sends a JWT token upon successful login
            const token = response.data.token;

            // Store the token in localStorage or a more secure client-side storage
            localStorage.setItem('token', token);

            // Redirect to a protected route or perform other actions on successful login
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            // Handle login error
            console.log(error.message)
        }
    }

    return (

        <>
            <Back name='Sign In' title='Sign In - Explore More On Us!' cover={img} />
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
                            <input type="text" required onChange={e => setEmail(e.target.value)} />
                            <label>Email</label>
                        </div>

                        <div class="input-box">
                            {/* <span class="icon"><i class='bx bxs-lock-alt' ></i></span> */}
                            <input type="password" required onChange={e => setPassword(e.target.value)} />
                            <label>Password</label>
                        </div>

                        <div class="remember-forgot">
                            <a href="#">Forgot password?</a>
                        </div>

                        <button type="submit" class="btn" onClick={handleLogin}>Sign in</button>

                        <div class="login-register">
                            <p>New user? <a class="register-link" onClick={() => navigate("/register")}>Sign up</a></p>
                        </div>
                    </form>
                </div>
            </div></>
    )
}
