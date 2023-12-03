import React, { useState } from 'react';
import './LogReg.css';
import axios from 'axios';
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoLinkedin } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import Back from '../common/Back';
import img from '../images/abt.jpg';
import { Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert from Material-UI
import { useAuth } from '../../contexts/auth';

export const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth, setAuth } = useAuth();
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState(''); // State for the snackbar message

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // Form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', {
                email,
                password,
            });
            if (res && res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || `/dashboard`);
            } else {
                setSnackbarMessage(res.data.message);
                setOpenSnackbar(true);
            }
        } catch (error) {
            setSnackbarMessage('Something went wrong');
            setOpenSnackbar(true);
        }
    };
    return (

        <>
            <Back name='Sign In' title='Sign In - Explore More On Us!' cover={img} />
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                sx={{ width: '100%' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ backgroundColor: '#ff6961', color: "red" }}> {/* Brighter red color */}
                    {snackbarMessage}
                </Alert>
            </Snackbar>
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
                    <form onSubmit={handleSubmit}>
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

                        <button type="submit" class="btn">Sign in</button>

                        <div class="login-register">
                            <p>New user? <a class="register-link" onClick={() => navigate("/register")}>Sign up</a></p>
                        </div>
                    </form>
                    {/* <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity="error">
                            {snackbarMessage}
                        </Alert>
                    </Snackbar> */}

                </div>
            </div>
        </>
    )
}