import React, { useState, useEffect } from "react";
import "../services/Services.css";
import axios from "axios";
import { Container, Button } from "@mui/material";
import Heading from "../common/Heading";
import { useAuth } from "../../contexts/auth";
import TextField from '@mui/material/TextField';

export const Profile = () => {

    const { isAdmin, auth, isManager } = useAuth();
    const id = auth?.user?.id;
    console.log(auth)
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

            const response = await axios.put(`/api/v1/user/updateUser`, { updatedUser });

            if (response && response.data.success) {
                // Handle success, show a success message or update state as needed
                console.log("User updated successfully");
            }
        } catch (err) {
            console.error(err.message);
            // Handle error, show an error message or perform appropriate actions
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
                                <div className="flexDiv">
                                    <TextField
                                        fullWidth
                                        label="User-ID"
                                        variant="outlined"
                                        id="outlined-basic"
                                        value={id}
                                        margin="normal"
                                        InputProps={{ readOnly: true }}
                                        focused
                                    />

                                    <TextField
                                        fullWidth
                                        label="Name"
                                        id="outlined"
                                        variant="outlined"
                                        margin="normal"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        focused
                                    />
                                </div>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    margin="normal"
                                    InputProps={{ readOnly: true }}
                                    focused
                                />
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    variant="outlined"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    margin="normal"
                                    focused
                                />
                                <TextField
                                    fullWidth
                                    label="State"
                                    variant="outlined"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    margin="normal"
                                    focused
                                />
                                <TextField
                                    fullWidth
                                    label="City"
                                    variant="outlined"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    margin="normal"
                                    focused
                                />
                                <TextField
                                    fullWidth
                                    label="PIN"
                                    variant="outlined"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    margin="normal"
                                    focused
                                />
                                <div className="btncontainer">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleUpdate}
                                        disabled={!isAnyFieldEntered}
                                    >
                                        Update Profile
                                    </Button>
                                </div>
                            </Container>
                        </div>
                    </>
                }
            </section>
        </div>
    )
}
