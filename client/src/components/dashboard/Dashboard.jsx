import { UserContext } from "../../contexts/UserContext";
import "./Dashboard.scss";
import React, { useContext, useState, useEffect } from 'react'
import { FaUsers } from 'react-icons/fa'
import { FaBookOpen } from "react-icons/fa";
import { FaBookDead } from 'react-icons/fa'
import { TableMini } from "../TableMini/table";

export const Dashboard = () => {

    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDateTime = currentDateTime.toLocaleString('en-US', options);
    const { isAdmin } = useContext(UserContext)

    return (
        <div className='content'>
            <div className="topsection">
                <h3>Hello <span>Admin</span></h3>
                <h5>{formattedDateTime}</h5>
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
                {/* {isAdmin && <div className="table userTable"><UsersListMini /></div>}
                <div className="table bookTable"><BooksListMini /></div>
                {!isAdmin && <div className="table mybookTable"><MyBooksListMini /></div>} */}
                <TableMini />
                <TableMini />

            </div>
        </div>
    )
}
