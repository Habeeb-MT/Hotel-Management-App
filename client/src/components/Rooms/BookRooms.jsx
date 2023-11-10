import React from 'react'
import Heading from '../common/Heading'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./BooksRooms.css"

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ColorButtons() {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success">
                Pay Now
            </Button>
        </Stack>
    );
}

export function ComboBox() {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 220 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
        />
    );
}

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },

];

export const BookRooms = () => {
    return (
        <section className='padding1'>
            <div className='container'>
                <form >
                    <div className="form">
                        <Heading title="Room Details" />
                        <div className="sect">
                            <div className="subcontainer">
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            </div>
                            <div className="subcontainer">
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            </div>
                        </div>
                        <Heading title="Payment Details" />
                        <div className="sect">
                            <div className="subcontainer">
                                <TextField id="outlined-basic" label="Name" variant="outlined" />
                                <TextField id="outlined-basic" label="Billing Address" variant="outlined" />
                                <ComboBox />
                            </div>
                            <div className="subcontainer">
                                <TextField id="outlined-basic" label="Total Amount" variant="outlined" />
                                <TextField id="outlined-basic" label="Booking Date" variant="outlined" />
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />

                            </div>
                            <ColorButtons />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
