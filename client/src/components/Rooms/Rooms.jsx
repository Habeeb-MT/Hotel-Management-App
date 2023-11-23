import React, { useState } from 'react'
import { Search } from '../RoomSearch/Search'
import RecentCard from '../home/recent/RecentCard'
import "../home/recent/recent.css"
export const Rooms = () => {

    const [searchValues, setSearchValues] = useState({});

    const handleSearchValues = (values) => {
        setSearchValues(values);
    };

    return (
        <div>
            <section className='recent padding'>
                <div className='container'>
                    <Search onSearch={handleSearchValues} />
                    <RecentCard searchValues={searchValues} />
                </div>
            </section>
        </div>
    );
}
