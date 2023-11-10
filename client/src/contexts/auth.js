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
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      // console.log(parseData);

      setAuth({
        user: parseData.userData,
        token: parseData.token,
      });
      setIsLoggedIn(true);
    }
    //eslint-disable-next-line
  }, []);


  useEffect(() => {
    if (auth.user) {
      setIsManager(auth.user.role === 'manager');
    }
  }, [auth.user]);

  useEffect(() => {
    if (auth.user) {
      setIsAdmin(auth.user.role === "manager" || auth.user.role === "admin");
    }
  }, [auth.user]);

  useEffect(() => {
    if (auth.user) {
      setIsGuest(auth.user.role === "guest");
    }
  }, [auth.user]);



  return (
    <AuthContext.Provider value={{ auth, setAuth, isAdmin, isManager, isLoggedIn, isGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
