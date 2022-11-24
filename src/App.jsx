import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Private from "./routes/private";
import NetWorks from "./pages/netWorks";

 const router = createBrowserRouter([
  
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/admin',
    element:<Private><Admin/></Private> 
  },
  {
    path: '/admin/social',
    element:<Private><NetWorks/></Private> 
  },
  {
    path: '*',
    element: <Error/>
  },
])
export {router}