import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from './components/NavBar/navBar';
import Index from "./components/Index";
import React, {Component} from "react";
import './index.css';
import {Route, Switch, withRouter} from "react-router";
import {Search} from "./pages/search";
import {getParam} from "./api/QueryCreator";
import {Details} from "./components/Details/Details";
import {HandleInvite, HandleToken, refresh_user} from "./api/auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Profile} from "./components/profile/Profile";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AppLoc extends Component {

    constructor(props) {
        super(props);
        let location = this.props.location.pathname + this.props.location.search
        this.props.history.replace(location)
        refresh_user()
    }

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
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
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
                    <Route path="/profile/">
                        <NavBar/>
                        <Profile/>
                    </Route>
                    <Route path="/set_token/">
                        <HandleToken/>
                    </Route>

                    <Route path="/invite/">
                        <HandleInvite/>
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

let App = withRouter(AppLoc)
export default App;
