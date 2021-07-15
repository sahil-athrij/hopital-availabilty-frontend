import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from './components/NavBar/navBar';
import {Index} from "./components/Index";
import React from "react";
import {Route, RouteComponentProps, Switch, withRouter} from "react-router";
import {Search} from "./pages/search";
import {getParam} from "./api/QueryCreator";
import {Details} from "./components/Details/Details";
import {HandleInvite, HandleToken, refresh_user} from "./api/auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Profile} from "./components/profile/Profile";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import './App.css'
import {BottomNav} from "./components/NavBar/BottomNav";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import {green, pink} from '@material-ui/core/colors';
import {Privacy} from "./components/Privacy/Privacy";
import {Add} from "./components/AddHospital/Add";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0091ea',
        },
        secondary: pink,
        success: green,
    }
});

interface AppRouterProps {
    title: string;   // This one is coming from the router

}

interface AppProps extends RouteComponentProps<AppRouterProps> {
    // Add your regular properties here
}

interface AppDispatchProps {
    // Add your dispatcher properties here
}

class AppLoc extends React.Component<AppProps & AppDispatchProps> {

    constructor(props: AppProps & AppDispatchProps) {
        super(props);
        let location = this.props.location.pathname + this.props.location.search
        this.props.history.replace(location)
        refresh_user()
    }

    componentDidMount() {
        getParam('lat', '', true)
        getParam('lng', '', true)
        getParam('loc', 'Search Location', true)
        getParam('query', 'Search Hospital', true)
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        getParam('lat', '', true)
        getParam('lng', '', true)
        getParam('loc', 'Search Location', true)
        getParam('query', 'Search Hospital', true)
    }

    render() {


        return (
            <div className="App">
                <ThemeProvider theme={theme}>
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
                        <Route path="/AddHospital/">
                            <NavBar/>
                            <Add/>
                        </Route>
                        <Route path="/privacypolicy/">
                            <Privacy/>
                        </Route>

                        <Route path="/">
                            <NavBar/>
                            <Index/>
                        </Route>

                    </Switch>
                    <BottomNav/>
                </ThemeProvider>
            </div>
        );
    }
}

let App = withRouter(AppLoc);
export default App;
