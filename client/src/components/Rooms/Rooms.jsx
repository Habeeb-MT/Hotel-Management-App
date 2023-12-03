import React, { useState } from "react";
import { Search } from "../RoomSearch/Search";
import RecentCard from "../home/recent/RecentCard";

import "../home/recent/recent.css";

export const Rooms = () => {
  const [searchValues, setSearchValues] = useState({});
  const [res, setRes] = useState([]);

  const handleSearchValues = (values) => {
    setSearchValues(values);
  };

  console.log(searchValues)

  return (
    <div>
      <section className="recent padding">
        <div className="container">
          <Search onSearch={handleSearchValues} setRes={setRes} />

          <RecentCard searchValues={searchValues} res={res} />
        </div>
      </section>
    </div>
  );
};
