import React, { useState } from 'react'
import "./LogReg.css"
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoLinkedin } from "react-icons/bi";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Back from '../common/Back';
import img from "../images/abt.jpg"


export const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password
            });
            if (res && res.data.success) {
                // toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                // toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            //   toast.error("Something went wrong");
        }
    };


    return (
        <>
            <Back name='Sign Up' title='Sign Up - Explore More On Us!' cover={img} />

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
                    <form onSubmit={handleSubmit}>
                        <h2>Sign Up</h2>
                        <div class="input-box">
                            {/* <span class="icon"><i class='bx bx-user'></i></span> */}
                            <input type="text" required onChange={e => setName(e.target.value)} />
                            <label>Username</label>
                        </div>

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

                        <button type="submit" class="btn" >Sign up</button>

                        <div class="login-register">
                            <p>Already have an account? <a class="login-link" onClick={() => navigate("/login")}>Sign in</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}