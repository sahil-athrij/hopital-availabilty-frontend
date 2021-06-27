import ResponsiveComponent from "../components/ResponsiveComponent";
import {withRouter} from "react-router";
import {getQueryVariable} from "./QueryCreator";

const client_id = '6tWdAZrlxUA26FJSMjE7oKBpTNGaqJRl2bsmNMRb'
const redirect_uri = 'http://localhost:3000/set_token/'

function getAuth() {
    return localStorage.getItem('accessToken')
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export class AuthComponent extends ResponsiveComponent {
    constructor(props) {
        super(props);
        let auth = getAuth()
        this.state = {
            ...this.state,
            auth
        }

    }

    performAuth = () => {
        let state = 'st' + makeid(5)
        let kwargs = {
            client_id,
            redirect_uri,
            state,
            response_type: "code"
        };
        localStorage.setItem(state,window.location.pathname+window.location.search)
        window.location.href = 'http://127.0.0.1:8000/auth/o/authorize/?' + new URLSearchParams(kwargs)

    }
}

export class HandleTokenLoc extends AuthComponent {
    componentDidMount() {
        super.componentDidMount();
        console.log(this.props.location)
        let code = getQueryVariable('code')
        let state = getQueryVariable('state')
        localStorage.setItem('code', code)

        let location = localStorage.getItem(state)
        if (location){
            this.props.history.push(location)
        }else {
            this.props.history.push('/')
        }

    }
}

export const HandleToken = withRouter(HandleTokenLoc)