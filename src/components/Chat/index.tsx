import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";
import Swiper from "./Swiper";

import {register, sendMessage} from "./lib";

interface ChatState extends AuthState {
    ready: boolean;
    messages: Array<string>;
}

class ChatLoc extends AuthComponent<AuthPropsLoc, ChatState> {

    constructor(props: AuthPropsLoc) {
        super(props);
        this.state = {...this.state, ready: false, messages: [] };
    }

    async initSession() {
        if (!this.state.user?.tokens?.private_token)
            throw Error("User not logged in");

        await register(this.state.user.tokens.private_token,
            (message: string) => this.setState({messages: [...this.state.messages, message]}));
    }

    componentDidMount() {
        super.componentDidMount();
        this.initSession().then(() => this.setState({ready: true}));
    }

    render(): JSX.Element {
        return (
            <>
                {this.state.ready && <button onClick={() => sendMessage("hh", "Hello")}>Send</button>}
                <h1>{this.state.messages[0]}</h1>
                <Swiper/>
            </>
        );
    }
}

export default withRouter(ChatLoc);
