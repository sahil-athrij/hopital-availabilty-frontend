import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
// import { Workbox } from "workbox-window";
import {getAuth} from "./api/auth";

// new Workbox("/sw.js").register();
navigator.serviceWorker.register("/chat.js").then();

const user = localStorage.getItem("user");

if(user)
    new BroadcastChannel("chat").postMessage({type: "CREATE", token: getAuth(),
        username: JSON.parse(user).tokens.private_token});

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById("root")
);
