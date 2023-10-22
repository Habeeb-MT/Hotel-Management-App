import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthProvider } from "./contexts/auth"
import { UserContextProvider } from "./contexts/UserContext"
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <UserContextProvider>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </UserContextProvider>
)