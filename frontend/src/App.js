import "./App.css";
import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Forgotpassword from "./components/Forgotpassword";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";



function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forgotpassword",
      element: <Forgotpassword />,
    },
  ]);
  
  return (

      <RouterProvider router={router} />
 
    // <div>wsefs</div>
  );
}

export default App;
