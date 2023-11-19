import "./Dashboard.scss";
import React, { useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { FaBookOpen } from "react-icons/fa";
import { FaBookDead } from 'react-icons/fa'
import { TableMini } from "../TableMini/TableMini";
import { TimerComponent } from "./TmerComponent";


export const Dashboard = () => {

    const [formattedDateTime, setFormattedDateTime] = useState('');

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

    return (
        <div className='content'>
            <div className="topsection">
                <h3>Hello <span>Admin</span></h3>
                <h5><TimerComponent onUpdateDateTime={updateDateTime} /></h5>
            </div>
            <div className="middlesection">
                <div className="stats">
                    <div className="flexicon">
                        <h2>44</h2>
                        <div className="icon"><FaUsers /></div>
                    </div>
                    <p>Total Users</p>
                </div>
                <div className="stats">
                    <div className="flexicon">
                        <h2>44</h2>
                        <div className="icon"><FaUsers /></div>
                    </div>
                    <p>Total Users</p>
                </div>
                <div className="stats">
                    <div className="flexicon">
                        <h2>44</h2>
                        <div className="icon"><FaUsers /></div>
                    </div>
                    <p>Total Users</p>
                </div>
                <div className="stats">
                    <div className="flexicon">
                        <h2>225</h2>
                        <div className="icon"><FaBookOpen /></div>
                    </div>
                    <p>Borrowed Books</p>
                </div>
                <div className="stats">
                    <div className="flexicon">
                        <h2>73</h2>
                        <div className="icon"><FaBookDead /></div>
                    </div>
                    <p>Overdue Books</p>
                </div>
            </div>
            <div className="bottomsection">
                <TableMini serviceType={serviceType} />
            </div>
        </div>
    )
}
