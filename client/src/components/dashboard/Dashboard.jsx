import "./Dashboard.scss";
import React, { useEffect, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { FaBookOpen } from "react-icons/fa";
import { FaBookDead } from 'react-icons/fa'
import { TableMini } from "../TableMini/TableMini";
import { TimerComponent } from "./TmerComponent";
import { TableMini1 } from "../TableMini/TableMini1";
import { useAuth } from "../../contexts/auth";
import About from "../about/About";


export const Dashboard = () => {

    const { isManager, isAdmin } = useAuth();
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
