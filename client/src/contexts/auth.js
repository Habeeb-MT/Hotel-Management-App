import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const fetchData = async () => {
      const data = localStorage.getItem("auth");
      if (data) {
        const parseData = JSON.parse(data);
        setAuth({
          user: parseData.userData,
          token: parseData.token,
        });

        if (parseData.userData) {
          setIsManager(parseData.userData.role === 'manager');
          setIsAdmin(parseData.userData.role === 'admin');
          setIsGuest(parseData.userData.role === 'guest');
          setIsLoggedIn(true);
        }
      }
    };

    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAdmin, isManager, isLoggedIn, isGuest }}>
      {children}
    </AuthContext.Provider>
  );
};


// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
