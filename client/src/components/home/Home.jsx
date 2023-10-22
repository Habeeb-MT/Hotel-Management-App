import React from "react"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Recent from "./recent/Recent"
import { useAuth } from "../../contexts/auth";
const Home = () => {
    const [auth,setAuth]=useAuth();
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
     <pre>{JSON.stringify(auth,null,4)}</pre>
    </>
  )
}

export default Home
