import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Heading from '../common/Heading'
import "./BooksRooms.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

export const GuestDetails = ({ onAddGuest }) => {

    const { auth } = useAuth();

    const location = useLocation();
    const room = location.state || {};
    console.log(room)

    const [guests, setGuests] = useState([]);

    const handleAddGuest = () => {
        setGuests([...guests, { name: '', email: '' }]);
    };

    const handleRemoveGuest = (index) => {
        const updatedGuests = guests.filter((_, i) => i !== index);
        setGuests(updatedGuests);
    };

    const handleGuestChange = (index, property, value) => {
        const updatedGuests = [...guests];
        updatedGuests[index][property] = value;
        setGuests(updatedGuests);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setGuests([
            {
                name: '',
                email: '',
            },
        ]);
    };

    const navigate = useNavigate();
    const gotoPayment = () => {

        navigate('/book/rooms', {
            state: { ...room, guests }
        })
    }

    return (
        <div className="padding1">
            <div className="container">
                <form  >
                    <div className="form">
                        <Heading title="Guest Details" />
                        <div className="sect">
                            {guests.map((guest, index) => (
                                <div className="subcontainer" key={index}>
                                    <TextField
                                        label={`Guest ${index + 1} Name`}
                                        variant="outlined"
                                        value={guest.name}
                                        onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
                                    />

                                    <DeleteIcon onClick={() => handleRemoveGuest(index)} />
                                </div>

                            ))}
                            <div className="btn-div">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddGuest}
                                    size='md'
                                >
                                    Add Guest
                                </Button>

                            </div>

                            <Button
                                variant="contained"
                                color="error"
                                type="submit"
                                size='md'
                                onClick={gotoPayment}
                            >
                                Pay Now
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
