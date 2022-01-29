import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import { Workbox } from "workbox-window";

if(location.hostname !== "localhost" && location.protocol !== "http:")
    new Workbox("/sw.js").register();

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById("root")
);
