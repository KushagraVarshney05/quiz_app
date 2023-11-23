import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Login';
import Signup from './components/SignUp';
import './index.css';
import App from './App';
import Home from './components/Home';
import EmailVerify from './components/emailVerification';
import { createBrowserRouter, RouterProvider,  } from "react-router-dom";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home/>,
      },
      {
        path: "/email/:token",
        element: <EmailVerify/>,
      },

    ],
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter}/>
);

