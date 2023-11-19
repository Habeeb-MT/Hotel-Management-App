import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const GuestList = () => {

    const [gList, setGList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/v1/user/fetchGuest");
                if (response) {
                    const jsonData = response.data.guests;
                    setGList(jsonData);
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <Typography variant='h5' style={{ textAlign: "center", margin: "20px 40px", color: "var(--textColor)" }}>Guests List</Typography>
            {gList.length != 0 ? (
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
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Phone</TableCell>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="left">Accompany</TableCell>

                                        </>}
                                        <TableCell className='minitablet' style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Status</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        gList.map((user, index) => (
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
                                                <TableCell className='mobile' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.room}</TableCell>
                                                <TableCell className='mobile' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.id}</TableCell>
                                                <TableCell className='tablet' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.email}</TableCell>
                                                {window.innerWidth >= 1050 && <>
                                                    <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.phone}</TableCell>
                                                    <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">
                                                        {/* {user.accompaniers.map((accompanier, accompanierIndex) => (
                                                        ))} */}
                                                        <TableRow >
                                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }}> john maveli </TableCell>
                                                        </TableRow>
                                                        <TableRow >
                                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }}> john maveli </TableCell>
                                                        </TableRow>
                                                        <TableRow >
                                                            <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }}> john maveli </TableCell>
                                                        </TableRow>
                                                    </TableCell>
                                                </>}
                                                <TableCell className='minitablet' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center"></TableCell>
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
