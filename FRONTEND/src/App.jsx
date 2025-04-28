import { Button } from "@/components/ui/button"
import Navbar from "./components/share/Navbar"
import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router"
import Home from "./components/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
])

function App() {
  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
