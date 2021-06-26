import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from './components/NavBar/navBar';
import Index from "./pages";
import React, {Component} from "react";
import './index.css';
import {Route, Switch} from "react-router";
import {Search} from "./pages/search";
import {getParam} from "./api/QueryCreator";
import {Details} from "./components/Details/Details";


class App extends Component {

    componentDidMount() {
        getParam('lat', '', true)
        getParam('lng', '', true)
        getParam('loc', 'Search Location', true)
        getParam('query', 'Search Hosptial', true)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        getParam('lat', '', true)
        getParam('lng', '', true)
        getParam('loc', 'Search Location', true)
        getParam('query', 'Search Hosptial', true)
    }

    render() {


        return (
            <div className="App">
                <Switch>
                    {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}

                    <Route path="/details/:hspId">
                        <NavBar/>
                        <Details/>


                    </Route>
                    <Route path="/search">
                        <NavBar/>
                        <Search/>
                    </Route>

                    <Route path="/">
                        <NavBar/>
                        <Index/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
