import React, { useState } from 'react'
import Heading from '../common/Heading'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./BooksRooms.css"
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';

export default function ColorButtons() {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success">
                Pay Now
            </Button>
        </Stack>
    );
}

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 220,
        },
    },
};



export const SingleSelect = ({ options, selectedValue, onChange }) => {
    const theme = useTheme();
    return (
        <div>
            <FormControl sx={{ m: 1, width: 210 }}>
                <InputLabel id="demo-single-name-label">{options.label}</InputLabel>
                <Select
                    labelId="demo-single-name-label"
                    id="demo-single-name"
                    onChange={onChange}
                    input={<OutlinedInput label={options.label} />}
                    MenuProps={MenuProps}
                >
                    {options.values.map((value) => (
                        <MenuItem
                            key={value}
                            value={value}
                            style={getStyles(value, selectedValue, theme)}
                        >
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};




const paymentOpt = [
    { label: 'Cedit/Debit Card' },
    { label: 'UPI' },
];

export const BookRooms = () => {

    const location = useLocation();
    const room = location.state || null;


    const [selectedPayment, setSelectedPayment] = useState('');

    const handlePaymentSelection = (event) => {
        setSelectedPayment(event.target.value);
    };

    const renderPaymentDetails = () => {
        if (selectedPayment === 'Cedit/Debit Card') {
            return (
                <div className="subcontainer">
                    <TextField id="outlined-basic" label="Card Number" variant="outlined" />
                    <TextField id="outlined-basic" label="Expiry Date" variant="outlined" />
                    <TextField id="outlined-basic" label="CVV" variant="outlined" />
                </div>
            );
        } else if (selectedPayment === 'UPI') {
            return (
                <div className="subcontainer">
                    Display UPI QR code or relevant UPI payment details
                    {/* <img src="your-qrcode-image.png" alt="UPI QR Code" /> */}
                </div>
            );
        }
        return null;
    };

    return (
        <section className='padding1'>
            <div className='container'>
                <form >
                    <div className="form">
                        <Heading title="Room Details" />
                        <div className="sect">
                            <div className="subcontainer">
                                <TextField id="outlined-basic" label="Room Type" variant="outlined" value={room.rtype} InputProps={{ readOnly: true }} />
                                <TextField id="outlined-basic" label="Room Number" variant="outlined" value={room.rnumber} InputProps={{ readOnly: true }} />
                                <TextField id="outlined-basic" label="Rate" variant="outlined" value={room.rate} InputProps={{ readOnly: true }} />
                            </div>
                            <div className="subcontainer">
                                <TextField id="outlined-basic" label="Check-In Date" variant="outlined" value={room.startdate} InputProps={{ readOnly: true }} />
                                <TextField id="outlined-basic" label="Check-Out Date" variant="outlined" value={room.enddate} InputProps={{ readOnly: true }} />
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" value={room.rtype} InputProps={{ readOnly: true }} />
                            </div>
                        </div>
                        <Heading title="Payment Details" />
                        <div className="sect">
                            <div className="subcontainer">
                                <TextField id="outlined-basic" label="Name" variant="outlined" />
                                <TextField id="outlined-basic" label="Billing Address" variant="outlined" />
                                <SingleSelect
                                    options={{ label: 'Payment Options', values: paymentOpt.map(option => option.label) }}
                                    selectedValue={selectedPayment}
                                    onChange={handlePaymentSelection}
                                />
                            </div>
                            <div className="subcontainer">
                                {renderPaymentDetails()}
                            </div>
                            <ColorButtons />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
