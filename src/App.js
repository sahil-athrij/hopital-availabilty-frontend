import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/navBar';
import Index from "./pages";
import React from "react";
import './index.css';
import {Route, Switch} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Switch>

                {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}
                <Route path="/search">
                </Route>

                <Route path="/">
                    <Index/>
                </Route>
            </Switch>

        </div>
    );
}

export default App;
