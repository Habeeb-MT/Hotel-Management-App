import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import "./Room.scss";
import TextField from "@mui/material/TextField";
import axios from "axios";

export const AddRoomForm = ({ open, handleClose, onRoomAdded, roomToEdit }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [err, setErr] = useState(false);

    const [type, setType] = useState("");
    const [cap, setCap] = useState("");
    const [num, setNum] = useState("");
    const [price, setPrice] = useState("");
    const [descript, setDescrit] = useState("");
    const [pic, setPic] = useState("");


    useEffect(() => {

        if (roomToEdit) {
            setType(roomToEdit.rtype);
            setCap(roomToEdit.occupancy);
            setNum(roomToEdit.rnumber);
            setPrice(roomToEdit.rate);
            setDescrit(roomToEdit.description);
            setPic(roomToEdit.pic);
        }
        else {
            setType("");
            setCap("");
            setNum("");
            setPrice("");
            setDescrit("");
            setPic("");
        }
    }, [roomToEdit, open]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (type === "" || cap === "" || num === "" || descript === 0 || price === 0 || pic === "") {
            return;
        }

        try {
            let response;
            if (roomToEdit) {
                const updatedFields = {};
                if (roomToEdit.rtype !== type) updatedFields.rtype = type;
                if (roomToEdit.occupancy !== cap) updatedFields.occupancy = cap;
                if (roomToEdit.rate !== price) updatedFields.rate = price;
                if (roomToEdit.pic !== pic) updatedFields.pic = pic;
                if (roomToEdit.description !== descript) updatedFields.description = descript;

                response = await axios.put(`/api/v1/room/editroom/${roomToEdit.rnumber}`, updatedFields);

            } else {
                response = await axios.post("/api/v1/room/addroom", {
                    num,
                    type,
                    cap,
                    price,
                    pic,
                    descript,
                });
            }
            if (response && response.data.success) {
                console.log("Room added/edited successfully:", response.data);
                handleClose();
            } else {
                console.log("error");
            }
        } catch (error) {
            setErr(error);
            console.error("Error adding/editing room:", error);
        }
    };


    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                // className={`${darkMode ? "dark-mode" : "light-mode"}`}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle
                    id="responsive-dialog-title"
                    style={{ color: "green", margin: "0px auto" }}
                >
                    {"Add Room"}
                </DialogTitle>
                <DialogContent style={{ minHeight: "300px" }}>
                    <form className="form roomForm">
                        <TextField
                            id="outlined-basic"
                            label="Type"
                            variant="outlined"
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                            fullWidth
                        />
                        <div className="columns">
                            <div className="col">
                                <TextField
                                    id="outlined-basic"
                                    label="Price"
                                    variant="outlined"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Capacity"
                                    variant="outlined"
                                    onChange={(e) => setCap(e.target.value)}
                                    value={cap}
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    id="outlined-basic"
                                    label="Room No"
                                    variant="outlined"
                                    onChange={(e) => setNum(e.target.value)}
                                    value={num}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Room Pic URL"
                                    variant="outlined"
                                    onChange={(e) => setPic(e.target.value)}
                                    value={pic}
                                />
                            </div>
                        </div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            fullWidth
                            onChange={e => setDescrit(e.target.value)}
                            value={descript}
                        />
                        <DialogActions>
                            <Button
                                variant="contained"
                                component={Link}
                                size="small"
                                onClick={handleSubmit}
                                style={{
                                    background: "#754ef9",
                                    margin: "5px",
                                    color: "#fdfdfd",
                                    fontSize: "10px",
                                }}
                            >
                                {roomToEdit ? "Update" : "Add"}
                            </Button>
                            <Button
                                variant="contained"
                                component={Link}
                                size="small"
                                onClick={handleClose}
                                style={{
                                    background: "red",
                                    margin: "5px",
                                    color: "#fdfdfd",
                                    fontSize: "10px",
                                }}
                            >
                                Discard
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
