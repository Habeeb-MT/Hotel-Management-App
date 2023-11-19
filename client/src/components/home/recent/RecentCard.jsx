import React from "react"
import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

const RecentCard = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/room/fetchrooms");
        if (response) {
          const jsonData = response.data.rooms;
          setRooms(jsonData);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='content grid3 mtop'>
        {rooms.map((room, index) => {
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={`/images/rooms/${room?.pic}.jpg`} alt="" />
              </div>
              <div className='text'>
                <h4>{room.rtype}</h4>
                <div className='category flex'>
                  <span style={{ background: room.status === "Available" ? "#25b5791a" : "#ff98001a", color: room.status === "Available" ? "#25b579" : "#ff9800" }}>{room.status === "Available" ? "Available" : "Unvailable"}</span>

                  <Link
                    to={{
                      pathname: '/select-room',
                      // Pass roomData as part of the location state
                    }}
                    state={room}
                  >
                    <span className="booking" style={{ background: room.status === "Available" ? "#25b5791a" : "#ff98001a", color: room.status === "Available" ? "#25b579" : "#ff9800" }}>
                      {room.status === "Available" ? "Book Now" : "Book Now"}
                    </span>
                  </Link>

                </div>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn6'>&#8377;{room.rate}</button> <label htmlFor=''>/Night</label>
                </div>
                <span>{room.occupancy} Adults</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard


/*
<div className='text'>
                <h4>{room.rtype}</h4>
                <div className='category flex'>
                  <span style={{ background: category === "Available" ? "#25b5791a" : "#ff98001a", color: category === "Available" ? "#25b579" : "#ff9800" }}>{ }</span>
                  { <i className='fa fa-heart'></i> }
                  <span className="booking" style={{ background: category === "Available" ? "#25b5791a" : "#ff98001a", color: category === "Available" ? "#25b579" : "#ff9800" }}>
                    {category === "Available" ? "Book Now" : "Book Now"}
                  </span>

                </div>
              </div>
*/