import React from "react";
import { Dialog, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import "./Room.scss"; // Add your custom styles here
import { useAuth } from "../../contexts/auth";

const ViewRoom = ({ openView, handleCloseView, room, handleEdit }) => {

    const { isManager } = useAuth();

    return (
        <Dialog open={openView} onClose={handleCloseView} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6" style={{ color: "green" }} align="center">
                    Room Details
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div className="view-room-content">
                    <img src={`/images/rooms/${room?.pic}.jpg`} alt="" />
                    <div className="view-room-text">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Room Type:</th>
                                    <td>{room?.rtype}</td>
                                </tr>
                                <tr>
                                    <th>Room Number:</th>
                                    <td>{room?.rnumber}</td>
                                </tr>
                                <tr>
                                    <th>Occupancy:</th>
                                    <td>{room?.occupancy}</td>
                                </tr>
                                <tr>
                                    <th>Rate:</th>
                                    <td>&#8377;{room?.rate}/Night</td>
                                </tr>
                                <tr>
                                    <th>Description:</th>
                                    <td>{room?.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="view-room-actions">
                    {isManager && <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                            handleEdit(room);
                            handleCloseView();
                        }}
                        style={{ background: "#2a9942", margin: "5px", color: "white", fontSize: "10px" }}

                    >
                        Edit
                    </Button>}
                    <Button
                        size="small"
                        variant="contained"
                        onClick={handleCloseView}
                        style={{ background: "red", margin: "5px", color: "white", fontSize: "10px" }}
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewRoom;



