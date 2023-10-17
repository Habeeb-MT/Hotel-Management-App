import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Search For Our Rooms' subtitle='' />

          <form className='flex'>

            <div className='box'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Check-In Date" />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className='box'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Check-In Date" />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <button className='btn1'>
              {/* <i className='fa fa-search'></i> */}
              <h3>Check Availability</h3>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
