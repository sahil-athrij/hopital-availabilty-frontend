import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/navBar';
import Index from "./pages";
import React from "react";
import './index.css';


function App() {
    return (
        <div className="App">
            <NavBar/>
            <Index/>
        </div>
    );
}

export default App;
