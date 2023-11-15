import React, { useEffect, useState } from "react"
import "./header.css"
import { nav, navManager, navRecep, navUser } from "../../data/Data"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/auth.js"

const Header = () => {

  const [navList, setNavList] = useState(false)
  const navigate = useNavigate();
  const { auth, setAuth, isAdmin, isManager } = useAuth();

  const handleLogout = async () => {
    await setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/");
  };


  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
            <h2>HillView Resort</h2>
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {auth.token && (
                <>
                  {isAdmin && navRecep.map((list, index) => (
                    <li key={index}>
                      <Link to={list.path}>{list.text}</Link>
                    </li>
                  ))}
                  {isManager && navManager.map((list, index) => (
                    <li key={index}>
                      <Link to={list.path}>{list.text}</Link>
                    </li>
                  ))}
                  {!isAdmin && !isManager && navUser.map((list, index) => (
                    <li key={index}>
                      <Link to={list.path}>{list.text}</Link>
                    </li>
                  ))}
                </>
              )}
              {!auth.token && (
                nav.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className='button flex'>
            {!auth.token ? (
              <button className='btn1' onClick={() => navigate("/login")}>
                <i className='fa fa-sign-out'></i> Sign In
              </button>
            ) : (
              <button className='btn1' onClick={handleLogout}>
                <i className='fa fa-sign-out'></i> Logout
              </button>
            )}
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>
              {navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  );

}

export default Header
