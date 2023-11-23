import React, { useState } from 'react'
import Heading from '../common/Heading'
import TextField from '@mui/material/TextField';
import "./BooksRooms.css"
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from "dayjs";

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

    const [paymentInfo, setPaymentInfo] = useState({
        name: '',
        billingAddress: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        upiId: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };


    const [selectedPayment, setSelectedPayment] = useState('');

    const handlePaymentSelection = (event) => {
        setSelectedPayment(event.target.value);
    };

    const renderPaymentDetails = () => {
        if (selectedPayment === 'Cedit/Debit Card') {
            return (
                <div className="subcontainer">
                    <TextField
                        id="cardNumber"
                        name="cardNumber"
                        label="Card Number"
                        variant="outlined"
                        value={paymentInfo.cardNumber}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="expiryDate"
                        name="expiryDate"
                        label="Expiry Date"
                        variant="outlined"
                        value={paymentInfo.expiryDate}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="cvv"
                        name="cvv"
                        label="Card Number"
                        variant="outlined"
                        value={paymentInfo.cvv}
                        onChange={handleInputChange}
                    />
                </div>
            );
        } else if (selectedPayment === 'UPI') {
            return (
                <div className="subcontainer">
                    <TextField
                        id="upiId"
                        name="upiId"
                        label="UPI-ID"
                        variant="outlined"
                        value={paymentInfo.upiId}
                        onChange={handleInputChange}
                    />
                    {/* <img src="your-qrcode-image.png" alt="UPI QR Code" /> */}
                </div>
            );
        }
        return null;
    };

    const navigate = useNavigate();

    const gotoMyBooking = async () => {

        try {
            let charge;
            if (room.roomOpt === "roomOnly") charge = parseInt(room.rate);
            if (room.roomOpt === "room+Breakfast") charge = parseInt(room.rate) + 1000;
            if (room.roomOpt === "room+B+L/D") charge = parseInt(room.rate) + 2000;
            const date = dayjs(Date.now()).format('YYYY-MM-DD');

            let response = await axios.post(`/api/v1/service/makeservice`, {
                charge: charge, serviceType: "Booking", guestId: room.guestid,
                roomid: room.rnumber, startDate: room.startDate, endDate: room.endDate
            });

            const serviceId = response.data.serviceId
            let response1 = await axios.post(`/api/v1/invoice/makeinvoice`, {
                serviceId, paymentInfo, room, date
            });

            if (response && response1 && response.data.success && response1.data.success) {
                console.log("Booking made successfully, Invoice made successfuly", response.data, response1.data);
            } else {
                console.log("error");
            }

            navigate("/mybooking", {
                state: { ...room, paymentInfo }
            })

        } catch (error) {
            console.error("Error adding Request:", error);
        }



    }

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
                                <TextField id="outlined-basic" label="Check-In Date" variant="outlined" value={room.startDate} InputProps={{ readOnly: true }} />
                                <TextField id="outlined-basic" label="Check-Out Date" variant="outlined" value={room.endDate} InputProps={{ readOnly: true }} />
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" value={room.rtype} InputProps={{ readOnly: true }} />
                            </div>
                        </div>
                        <Heading title="Payment Details" />
                        <div className="sect">
                            <div className="subcontainer">
                                <TextField
                                    id="outlined-basic"
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    value={paymentInfo.name}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    id="outlined-basic"
                                    name="billingAddress"
                                    label="Billing Address"
                                    variant="outlined"
                                    value={paymentInfo.billingAddress}
                                    onChange={handleInputChange}
                                />
                                <SingleSelect
                                    options={{ label: 'Payment Options', values: paymentOpt.map(option => option.label) }}
                                    selectedValue={selectedPayment}
                                    onChange={handlePaymentSelection}
                                />
                            </div>
                            <div className="subcontainer">
                                {renderPaymentDetails()}
                            </div>
                            <Button variant="contained" color="success" onClick={gotoMyBooking}>
                                Pay Now
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
