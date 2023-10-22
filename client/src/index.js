import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { UserContextProvider } from "./contexts/UserContext"
import { AuthProvider } from "./contexts/auth"
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
   </AuthProvider>

)
