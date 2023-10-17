import React from "react"
import "./footer.css"
import { Link } from "react-router-dom/"
// import GoogleMapReact from 'google-map-react';

const Footer = () => {

  // const text = "Our Location"
  // const AnyReactComponent = ({ text }) => <div>{text}</div>;

  // const defaultProps = {
  //   center: {
  //     lat: 10.99835602,
  //     lng: 77.01502627
  //   },
  //   zoom: 11
  // };

  return (
    <>
      <section className='footerContact'>
        <div className='container'>
          <div className='send flex'>
            <div className='text' >
              {/* <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
                />
              </GoogleMapReact> */}
            </div>
            <button className='btn5' ><Link to="/contact">Contact Now</Link></button>
          </div>
        </div>
      </section>

      <div className='legal'>
        <span>© 2021 HillView Resort. All rights reserved.</span>
      </div>
    </>
  )
}

export default Footer
