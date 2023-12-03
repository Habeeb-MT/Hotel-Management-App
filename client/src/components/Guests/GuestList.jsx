import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
export const GuestList = () => {

    const [gList, setGList] = useState([]);
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/v1/user/fetchGuest");
                if (response && response.data.success) {
                    const jsonData = response.data.guests;

                    // Fetch occupants for each guest and update the corresponding user object
                    const updatedGuests = await Promise.all(
                        jsonData.map(async (guest) => {
                            try {
                                const occupantResponse = await axios.get(`/api/v1/user/fetchOccupant`, { params: { guestId: guest.id } });
                                if (occupantResponse.data.success) {
                                    const occupants = occupantResponse.data.occupants;
                                    return {
                                        ...guest,
                                        occupants: occupants // Add occupants to the user object
                                    };
                                }
                            } catch (err) {
                                console.error(`Error fetching occupants for guest ${guest.id}: ${err.message}`);
                                return guest; // Return original guest object if occupants fetch fails
                            }
                        })
                    );

                    setGList(updatedGuests);
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, []);


    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredGuests = gList.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.rnumber.toLowerCase().includes(searchText.toLowerCase()) ||
        user.id.toString().includes(searchText)
    );


    return (
        <div>
            <Typography variant='h5' style={{ textAlign: "center", margin: "20px 40px", color: "var(--textColor)" }}>Checked Guests List</Typography>

            <TextField
                label="Search..."
                variant="outlined"
                value={searchText}
                onChange={handleSearch}
                style={{
                    marginBottom: '20px',
                    marginLeft: '20px',
                    width: '300px',
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            {filteredGuests.length != 0 ? (
                <>
                    <div className='table' style={{ padding: "20px" }}>
                        <TableContainer component={Paper} style={{ background: "var(--bg1)" }} >

                            <Table aria-label="simple table">
                                <TableHead className='tablehead'>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">SI</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="left">Name</TableCell>
                                        <TableCell className='mobile' style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Room No</TableCell>
                                        <TableCell className='mobile' style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Guest-ID</TableCell>
                                        <TableCell className='tablet' style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Email</TableCell>
                                        {window.innerWidth >= 1050 && <>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Accompany</TableCell>

                                        </>}
                                        <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        filteredGuests.map((user, index) => (
                                            <TableRow
                                                key={user?.lid}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align='center'>{index + 1}</TableCell>
                                                <TableCell component="th" scope="row" align='center' style={{ fontSize: "12px", color: "var(--textColor)" }}>
                                                    {<div className='user'>
                                                        <img src={user?.photoURL} alt="" />
                                                        <span>{user?.name}</span></div>
                                                    }
                                                </TableCell>
                                                <TableCell className='mobile' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.rnumber}</TableCell>
                                                <TableCell className='mobile' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.id}</TableCell>
                                                <TableCell className='tablet' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.email}</TableCell>
                                                {window.innerWidth >= 1050 && <>
                                                    <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                        {user.occupants && user.occupants.length > 0 ? (
                                                            user.occupants.map((name, index) => (
                                                                <div key={index}>{name}</div>
                                                            ))
                                                        ) : (
                                                            <div>No Accompanying Guests</div>
                                                        )}
                                                    </TableCell>
                                                </>}
                                                <TableCell align="center">
                                                    <Button
                                                        className='rmbtn'
                                                        variant="contained"
                                                        component={Link}
                                                        size="small"
                                                        style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                    >Contact</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>
            ) : (
                ""
            )
            }
        </div>
    );
};
