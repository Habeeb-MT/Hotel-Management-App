import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
// import { BooksContext } from '../Contexts/BooksContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import { UserContext } from '../Contexts/UserContext';
import { RiImageAddFill } from "react-icons/ri";
import { Button } from '@mui/material';
import "./Room.scss"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';


export const AddRoomForm = ({ open, handleClose }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [err, setErr] = useState(false)

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [cap, setCap] = useState("")
    const [num, setNum] = useState("")
    const [ac, setAc] = useState("")
    const [price, setPrice] = useState("")
    const [descript, setDescrit] = useState("")
    const [pic, setPic] = useState(null);

    const handleSubmit = async (e) => {
        if (name === "" || type === "" || cap === "" || num === "" || descript === 0 || pic == null || price === 0) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('type', type);
            formData.append('cap', cap);
            formData.append('num', num);
            formData.append('ac', ac);
            formData.append('price', price);
            formData.append('descript', descript);
            formData.append('pic', pic);

            // Assuming you have an API endpoint for adding a room with image upload
            const response = await axios.post('/api/v1/room/addroom', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the response as needed, e.g., check for success and close the dialog
            console.log('Room added successfully:', response.data);
            handleClose();
        } catch (error) {
            setErr(error);
            console.error('Error adding room:', error);
        }
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                // className={`${darkMode ? "dark-mode" : "light-mode"}`}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" style={{ color: "green", margin: "0px auto" }}>
                    {"Add Room"}
                </DialogTitle>
                <DialogContent style={{ minHeight: "300px" }}>
                    <form className='form roomForm' >
                        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={e => setName(e.target.value)} fullWidth />
                        <div className="columns">
                            <div className="col">
                                <TextField id="outlined-basic" label="Price" variant="outlined" onChange={e => setPrice(e.target.value)} />
                                <TextField id="outlined-basic" label="Capacity" variant="outlined" onChange={e => setCap(e.target.value)} />
                            </div>
                            <div className="col">
                                <TextField id="outlined-basic" label="Room No" variant="outlined" onChange={e => setNum(e.target.value)} />
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="ac-non-ac-label">AC/non-AC</InputLabel>
                                    <Select
                                        labelId="ac-non-ac-label"
                                        id="ac-non-ac"
                                        value={ac}
                                        onChange={(e) => setAc(e.target.value)}
                                        label="AC/non-AC"
                                    >
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="AC">AC</MenuItem>
                                        <MenuItem value="non-AC">non-AC</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                        </div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            fullWidth
                        />
                        <input type="file" id="file" style={{ display: 'none' }} onChange={e => setPic(e.target.files[0])} />
                        <label htmlFor="file">
                            <RiImageAddFill />
                            <span>Add Pic</span>
                        </label>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        component={Link}
                        size="small"
                        onClick={handleSubmit}
                        style={{ background: "#754ef9", margin: "5px", color: "#fdfdfd", fontSize: "10px" }}
                    >Add</Button>
                    <Button
                        variant="contained"
                        component={Link}
                        size="small"
                        onClick={handleClose}
                        style={{ background: "red", margin: "5px", color: "#fdfdfd", fontSize: "10px" }}
                    >Discard</Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}
