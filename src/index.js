import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import appRouter from "./App.js";
import { RouterProvider } from "react-router-dom";
import { makeServer } from "./server";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
