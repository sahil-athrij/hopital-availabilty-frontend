import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import { Workbox } from "workbox-window";
import {getAuth} from "./api/auth";
import {baseUrl, post} from "./api/api";

if(location.hostname !== "localhost" && location.protocol !== "http:" && "serviceWorker" in navigator)
    new Workbox("/sw.js").register();

if("serviceWorker" in navigator && getAuth())
    sendSubscription(getAuth() || "").then().catch(console.error);

async function sendSubscription(auth: string)
{
    const options = {
        userVisibleOnly: true,
        applicationServerKey: process.env.PUSH_KEY
    };

    const registration = await navigator.serviceWorker.register("/chat.js");
    const subscription =  await registration.pushManager.subscribe(options);

    // TODO: This should be really real
    return post(`${baseUrl}/real/working/url`, subscription, {"Authorization": `Bearer ${auth}`});
}

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById("root")
);
