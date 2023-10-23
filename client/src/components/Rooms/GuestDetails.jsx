import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Heading from '../common/Heading'
import "./BooksRooms.css"


export const GuestDetails = ({ onAddGuest }) => {
    const [guests, setGuests] = useState([
        {
            name: '',
            email: '',
        },
    ]);

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

    return (
        <div className="padding1">
            <div className="container">
                <form onSubmit={handleSubmit} >
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
                                    <TextField
                                        label={`Guest ${index + 1} Email`}
                                        variant="outlined"
                                        value={guest.email}
                                        onChange={(e) => handleGuestChange(index, 'email', e.target.value)}
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
