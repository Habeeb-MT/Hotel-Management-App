import "./TableMini.scss"
import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';
import { TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import "./TableMini.scss"
export const TableMini = () => {
    const { usersList } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <>
                <div className='table' style={{ padding: "20px" }}>
                    <TableContainer component={Paper} style={{ background: "var(--bg1)" }} >

                        <Table aria-label="simple table">
                            <TableHead className='tablehead'>
                                <TableRow>
                                    <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">SI</TableCell>
                                    <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="left">Name</TableCell>
                                    <TableCell className='mobile' style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Room No</TableCell>
                                    <TableCell className='mobile' style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Guest ID</TableCell>
                                    <TableCell className='tablet' style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Request</TableCell>
                                    {/* {window.innerWidth >= 1050 && <>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">College</TableCell>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Year</TableCell>
                                        </>} */}
                                    <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {(serviceList
                                ).map((user, index) => ( */}
                                <TableRow

                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align='center'></TableCell>
                                    <TableCell component="th" scope="row" align='center' style={{ fontSize: "12px", color: "var(--textColor)" }}>
                                        {<div className='user'>
                                            {/* <img src={user.photoURL} alt="" /> */}
                                            <span></span></div>}
                                    </TableCell>
                                    <TableCell className='mobile' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center"></TableCell>
                                    <TableCell className='mobile' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center"></TableCell>
                                    <TableCell className='tablet' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center"></TableCell>
                                    {/* {window.innerWidth >= 1050 && <>
                                                <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.college}</TableCell>
                                                <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.year}</TableCell>
                                            </>} */}
                                    <TableCell align="center">
                                        <Button
                                            className='rmbtn'
                                            variant="contained"
                                            component={Link}
                                            size="small"
                                            style={{ background: "#754ef9", margin: "1px", fontSize: "10px" }}
                                        >Accept</Button>
                                        <Button
                                            className='rmbtn'
                                            variant="contained"
                                            component={Link}
                                            size="small"
                                            style={{ background: "red", margin: "1px", fontSize: "10px" }}
                                        >Reject</Button>
                                    </TableCell>
                                </TableRow>
                                {/* ))
                                } */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>


            </>
            <Typography variant='h5' style={{ textAlign: "center", color: "var(--textColor)" }}>No Requests Found!</Typography>

        </div>
    );
};
