import React from 'react'
import { Search } from '../RoomSearch/Search'
import RecentCard from '../home/recent/RecentCard'
import "../home/recent/recent.css"
export const Rooms = () => {
    return (
        <div>
            <section className='recent padding'>
                <div className='container'>
                    <Search />
                    <RecentCard />
                </div>
            </section>
        </div>
    )
}
