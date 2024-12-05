import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css';
import Current from './Pages/Current';
import Compare from "./Pages/Compare";
import reportWebVitals from './Tests/reportWebVitals';
import Budget from "./Pages/Budget";
import './Style/App.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Current/>
    },
    {
        path: "/compare",
        element: <Compare/>
    },
    // {
    //     path: "/budget",
    //     element: <Budget/>
    // },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
