import React, { useState, useEffect } from "react";
import "../services/Services.css";
import axios from "axios";
import Heading from "../common/Heading";
import { useAuth } from "../../contexts/auth";
import TextField from '@mui/material/TextField';
import { Container, Button, Snackbar, Alert } from "@mui/material";

export const Profile = () => {

    const { isAdmin, auth, isManager } = useAuth();
    const id = auth?.user?.id;
    const [user, setUser] = useState({});

    const [userId, setUserId] = useState(auth && auth.user ? auth.user.id || "" : "");
    const [email, setEmail] = useState(auth && auth.user ? auth.user.email || "" : "");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pin, setPin] = useState("");

    // Check if any of the fields have a value entered
    const isAnyFieldEntered = name || phone || state || city || pin;

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = () => setSnackbarOpen(false);

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const response = await axios.get(`/api/v1/user/fetchUser?id=${id}`);
                if (response && response.data.success) {
                    const jsonData = response.data.user;
                    setUser(jsonData);

                    setUserId(jsonData.id || '');
                    setName(jsonData.name || '');
                    setEmail(jsonData.email || '');
                    setPhone(jsonData.phone || '');
                    setState(jsonData.state || '');
                    setCity(jsonData.city || '');
                    setPin(jsonData.pin || '');
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        if (id) {
            fetchData(id);
        }
    }, [id]);



    const handleUpdate = async () => {
        try {
            const updatedUser = {
                id: id,
                name,
                phone,
                state,
                city,
                pin,
            };

            // Check if any of the fields have been changed
            const fieldsChanged = Object.keys(updatedUser).some(key => updatedUser[key] !== user[key]);

            if (fieldsChanged) {
                const response = await axios.put(`/api/v1/user/updateUser`, { updatedUser });

                if (response && response.data.success) {
                    setSnackbarMessage("User Details updated successfully");
                    setSnackbarOpen(true);
                }
            } else {
                setSnackbarMessage("No changes made");
                setSnackbarOpen(true);
            }
        } catch (err) {
            console.error(err.message);
            setSnackbarMessage("Failed to update user");
            setSnackbarOpen(true);
        }
    };


    return (
        <div>
            <section className="services mb">
                {(auth.user && !isAdmin && !isManager) &&
                    <>
                        <div className="container reqservices">
                            <Container maxWidth="sm">
                                <Heading title="Profile" />
                                <form >
                                    <div className="flexDiv">
                                        <TextField
                                            fullWidth
                                            label="User-ID"
                                            variant="outlined"
                                            id="outlined-basic"
                                            value={id}
                                            margin="normal"
                                            color="success"
                                            InputProps={{ readOnly: true }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Name"
                                            id="outlined"
                                            variant="outlined"
                                            margin="normal"
                                            value={name}
                                            color="success"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        value={email}
                                        margin="normal"
                                        color="success"
                                        InputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        variant="outlined"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        color="success"
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="State"
                                        variant="outlined"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        color="success"
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="City"
                                        variant="outlined"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        margin="normal"
                                        color="success"

                                    />
                                    <TextField
                                        fullWidth
                                        label="PIN"
                                        variant="outlined"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        margin="normal"
                                        color="success"
                                    />
                                    <div className="btncontainer">
                                        <Button
                                            variant="contained"
                                            color="success"
                                            fullWidth
                                            onClick={handleUpdate}
                                            disabled={!isAnyFieldEntered}
                                        >
                                            Update Profile
                                        </Button>
                                    </div>
                                </form>
                            </Container>
                        </div>
                    </>
                }
            </section>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div >
    )
}
