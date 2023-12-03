import "./Dashboard.scss";
import React, { useEffect, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { FaHotel } from 'react-icons/fa'
import { TableMini } from "../TableMini/TableMini";
import { TimerComponent } from "./TmerComponent";
import { TableMini1 } from "../TableMini/TableMini1";
import { useAuth } from "../../contexts/auth";
import About from "../about/About";
import axios from "axios";


export const Dashboard = () => {

    const { isManager, isAdmin } = useAuth();
    const [formattedDateTime, setFormattedDateTime] = useState('');
    const [ucount, setuCount] = useState(0);
    const [rcount, setrCount] = useState(0);
    const [ocount, setoCount] = useState(0);
    const [recount, setreCount] = useState(0);
    const updateDateTime = (dateTime) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const formattedDateTime = dateTime.toLocaleString('en-US', options);
        setFormattedDateTime(formattedDateTime);
    };

    const serviceType = "Booking";


    useEffect(() => {
        const fetchRoomCount = async () => {
            try {
                const response = await axios.get('/api/v1/dash/roomcount');
                setrCount(response.data.count);
            } catch (error) {
                console.error('Error fetching room count:', error);
            }
        };

        fetchRoomCount();

    }, [rcount]);  // Corrected the dependency array

    useEffect(() => {
        const fetchOccupiedCount = async () => {
            try {
                const response = await axios.get('/api/v1/dash/occupiedcount');
                setoCount(response.data.count);
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        fetchOccupiedCount();
    }, [ocount]);
    useEffect(() => {
        const fetchuserCount = async () => {
            try {
                const response = await axios.get('/api/v1/dash/usercount');
                setuCount(response.data.count);
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        fetchuserCount();
    }, [ucount]);

    useEffect(() => {
        const fetchrequestCount = async () => {
            try {
                const response = await axios.get('/api/v1/dash/requestcount');
                setreCount(response.data.count);
            } catch (error) {
                console.error('Error fetching total counts:', error);
            }
        };

        fetchrequestCount();
    }, [recount]);
    return (
        <>
            {console.log(isAdmin, isManager)}
            {(isManager === null || isAdmin === null) ? (
                <div>Loading...</div>
            ) : (
                (isManager || isAdmin) ? (
                    <div className='content'>
                        <div className="topsection">
                            <h3>Hello <span>Admin</span></h3>
                            <h5><TimerComponent onUpdateDateTime={updateDateTime} /></h5>
                        </div>
                        <div className="middlesection">
                            <div className="stats">
                                <div className="flexicon">
                                    <h2>{ucount}</h2>
                                    <div className="icon"><FaUsers /></div>
                                </div>
                                <p>Total Users</p>
                            </div>
                            <div className="stats">
                                <div className="flexicon">
                                    <h2>{rcount}</h2>
                                    <div className="icon"><FaHotel /></div>
                                </div>
                                <p>Total Rooms</p>
                            </div>
                            <div className="stats">
                                <div className="flexicon">
                                    <h2>{ocount}</h2>
                                    <div className="icon"><FaHotel /></div>
                                </div>
                                <p>Total Occupied Room</p>
                            </div>
                            <div className="stats">
                                <div className="flexicon">
                                    <h2>{recount}</h2>
                                    <div className="icon"><FaHotel /></div>
                                </div>
                                <p>Total Requests</p>
                            </div>

                        </div>
                        <div className="bottomsection">
                            <TableMini />
                            <TableMini1 />
                        </div>
                    </div>
                ) : (
                    <About />
                )
            )}
        </>
    )
}
