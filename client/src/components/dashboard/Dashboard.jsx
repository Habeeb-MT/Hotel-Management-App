import "./Dashboard.scss";
import React, { useEffect, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { FaHotel } from 'react-icons/fa'
import { TableMini } from "../TableMini/TableMini";
import { TimerComponent } from "./TmerComponent";
import { TableMini1 } from "../TableMini/TableMini1";
import { useAuth } from "../../contexts/auth";
import About from "../about/About";


export const Dashboard = () => {

    const { isManager, isAdmin } = useAuth();
    const [formattedDateTime, setFormattedDateTime] = useState('');
    const [ucount, setuCount] = useState(0);
    const [rcount, setrCount] = useState(0);
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
        const fetchUserCount = async () => {
            try {
                const response = await fetch('/api/v1/dash/usercount');
                const data = await response.json();
                setuCount(data.users);
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        const fetchRoomCount = async () => {
            try {
                const response = await fetch('/api/v1/dash/roomcount');
                const data = await response.json();
                setrCount(data.count);
            } catch (error) {
                console.error('Error fetching room count:', error);
            }
        };

        fetchRoomCount();
        fetchUserCount();
    }, [setrCount, setuCount]);  // Corrected the dependency array


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
                                    <h2>35</h2>
                                    <div className="icon"><FaUsers /></div>
                                </div>
                                <p>Total Users</p>
                            </div>
                            <div className="stats">
                                <div className="flexicon">
                                    <h2>17</h2>
                                    <div className="icon"><FaHotel /></div>
                                </div>
                                <p>Total Rooms</p>
                            </div>
                            <div className="stats">
                                <div className="flexicon">
                                    <h2>12</h2>
                                    <div className="icon"><FaHotel /></div>
                                </div>
                                <p>Total Occupied Room</p>
                            </div>
                            <div className="stats">
                                <div className="flexicon">
                                    <h2>4</h2>
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
