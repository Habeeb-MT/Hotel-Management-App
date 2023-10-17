import React from "react"
import { list } from "../../data/Data"

const RecentCard = () => {
  return (
    <>
      <div className='content grid3 mtop'>
        {list.map((val, index) => {
          const { cover, category, name, price } = val
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={cover} alt='' />
              </div>
              <div className='text'>
                <h4>{name}</h4>
                <div className='category flex'>
                  <span style={{ background: category === "Available" ? "#25b5791a" : "#ff98001a", color: category === "Available" ? "#25b579" : "#ff9800" }}>{category}</span>
                  {/* <i className='fa fa-heart'></i> */}
                  <span className="booking" style={{ background: category === "Available" ? "#25b5791a" : "#ff98001a", color: category === "Available" ? "#25b579" : "#ff9800" }}>
                    {category === "Available" ? "Book Now" : "Book Now"}
                  </span>

                </div>
                {/* <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p> */}
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn6'>&#8377;{price}</button> <label htmlFor=''>/Night</label>
                </div>
                {/* <span>{type}</span> */}
                <span>2 Adults</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
