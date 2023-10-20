import React from "react"
import Back from "../common/Back"
import RecentCard from "../home/recent/RecentCard"
import "../home/recent/recent.css"
import img from "../images/about.jpg"
import { Search } from "../RoomSearch/Search"
import { Rooms } from "../Rooms/Rooms"

const Blog = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Rooms' title='Our Featured Rooms' cover={img} />
        <div className='container recent'>
          <Rooms />
        </div>
      </section>
    </>
  )
}

export default Blog
