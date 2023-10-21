import React, { useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from '../../contexts/UserContext';


export const GuestList = () => {
    const { isAdmin } = useContext(UserContext);

    const { usersList } = useContext(UserContext);

    // const [openView, setOpenView] = useState(false)
    // const handleCloseView = () => {
    //     setOpenView(false);
    // };


    return (
        <div>
            <div className="heading" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant='h5' style={{ textAlign: "center", margin: "20px 40px", color: "var(--textColor)" }}>Rooms Lists</Typography>
                {/* {isAdmin ? (
                    <Typography style={{ textAlign: "center", margin: "20px 40px" }}>
                        <AddUserForm />
                    </Typography>
                ) : ("")} */}
            </div>
            {usersList.length != 1 ? (
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
                                        </>}
                                        <TableCell className='minitablet' style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Status</TableCell>
                                        <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        usersList.map((user, index) => (
                                            <TableRow
                                                key={user?.lid}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align='center'>{index + 1}</TableCell>
                                                <TableCell component="th" scope="row" align='center' style={{ fontSize: "12px", color: "var(--textColor)" }}>
                                                    {<div className='user'>
                                                        <img src={user?.photoURL} alt="" />
                                                        <span>{user?.displayName}</span></div>
                                                    }
                                                </TableCell>
                                                <TableCell className='mobile' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.room}</TableCell>
                                                <TableCell className='mobile' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.gid}</TableCell>
                                                <TableCell className='tablet' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.email}</TableCell>
                                                {window.innerWidth >= 1050 && <>
                                                    <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.college}</TableCell>
                                                </>}
                                                <TableCell className='minitablet' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{user.issued}</TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        variant="contained"
                                                        component={Link}
                                                        size="small"
                                                        style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                        onClick={() => {
                                                            // setOpenView(true)
                                                        }}
                                                        state={user}
                                                    >View</Button>
                                                    {isAdmin && <>
                                                        <Button
                                                            className='rmbtn'
                                                            variant="contained"
                                                            component={Link}
                                                            size="small"
                                                            style={{ background: "#754ef9", margin: "1px", fontSize: "10px" }}
                                                        >Contact</Button>
                                                        {/* <Button
                                                            className='rmbtn'
                                                            variant="contained"
                                                            component={Link}
                                                            size="small"
                                                            style={{ background: "red", margin: "1px", fontSize: "10px" }}
                                                        >Contact</Button> */}
                                                    </>}
                                                    {/* <ViewUser openView={openView} handleCloseView={handleCloseView} /> */}
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
