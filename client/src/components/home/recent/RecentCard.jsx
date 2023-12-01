import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ViewRoom from "../../Rooms/ViewRoom";

const RecentCard = ({ searchValues, res }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (res?.length > 0) {
      setRooms(res);
    } else {
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
    }
  }, [res]); // Added the missing closing parenthesis here

  const navigate = useNavigate();

  const gotoNext = (roomData) => {
    navigate(`/select-room`, {
      state: {
        rnumber: roomData.rnumber,
        guestid: roomData.guestid,
        rate: roomData.rate,
        rtype: roomData.rtype,
        occupancy: roomData.occupancy,
        pic: roomData.pic,
        startDate: searchValues.startDate,
        endDate: searchValues.endDate,
      },
    });
  };

  const [openViews, setOpenViews] = useState({});

  const handleCloseView = (rnumber) => {
    setOpenViews((prevOpenViews) => ({ ...prevOpenViews, [rnumber]: false }));
  };

  return (
    <>
      <div className="content grid3 mtop">
        {rooms.map((room, index) => {
          return (
            <div className="box shadow" key={index}>
              <div className="img">
                <img
                  src={`/images/rooms/${room?.pic}.jpg`}
                  alt=""
                  onClick={() => {
                    setOpenViews((prevOpenViews) => ({
                      ...prevOpenViews,
                      [room.rnumber]: true,
                    }));
                  }}
                />
                <ViewRoom
                  openView={openViews[room.rnumber] || false}
                  handleCloseView={() => handleCloseView(room.rnumber)}
                  room={room}
                />
              </div>
              <div className="text">
                <h4>{room.rtype}</h4>
                <div className="category flex">
                  <span
                    style={{
                      background:
                        room.status === "Available" ? "#25b5791a" : "#ff98001a",
                      color:
                        room.status === "Available" ? "#25b579" : "#ff9800",
                    }}
                  >
                    {room.status === "Available" ? "Available" : "Unvailable"}
                  </span>

                  <Button
                    to={{
                      pathname: "/select-room",
                    }}
                    state={room}
                  ></Button>
                  <span
                    onClick={() => gotoNext(room)}
                    className="booking"
                    style={{
                      background:
                        room.status === "Available" ? "#25b5791a" : "#ff98001a",
                      color:
                        room.status === "Available" ? "#25b579" : "#ff9800",
                    }}
                  >
                    {room.status === "Available" ? "Book Now" : "Book Now"}
                  </span>
                </div>
              </div>
              <div className="button flex">
                <div>
                  <button className="btn6">&#8377;{room.rate}</button>{" "}
                  <label htmlFor="">/Night</label>
                </div>
                <span>{room.occupancy} Adults</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
