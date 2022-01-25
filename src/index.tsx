import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import {ServiceWorkerContext, wb} from "./SwContext";


addEventListener("storage", (e) =>
{
    if(typeof window === "undefined")
        return;
    console.log("1st");

    if(e.key !== "user" || !e.newValue)
        return;
    console.log("2nd");

    const user = JSON.parse(e.newValue);

    if(!user?.tokens?.private_token)
        return;
    console.log("3rd");
    console.log("work aavunilla");
    wb.messageSW({type: "CREATE", token: user.tokens.private_token});
});

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



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
