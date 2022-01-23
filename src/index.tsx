import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import { Workbox } from "workbox-window";

const wb = new Workbox("sw.js");

wb.register();

export const ServiceWorkerContext = React.createContext(wb);

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <ServiceWorkerContext.Provider value={wb}>
                <App />
            </ServiceWorkerContext.Provider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById("root")
);

addEventListener("storage", (e) =>
{
    if(e.key !== "user" || !e.newValue)
        return;

    const user = JSON.parse(e.newValue);

    if(!user?.tokens?.private_token)
        return;

    wb.messageSW({type: "CREATE", token: user.tokens.private_token});
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
