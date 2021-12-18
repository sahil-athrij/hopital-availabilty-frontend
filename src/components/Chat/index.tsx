import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

import {register, sendMessage} from "./lib";

interface ChatState extends AuthState
{
    ready: boolean;
    message: string;
}

class ChatLoc extends AuthComponent<AuthPropsLoc, ChatState>
{

    constructor(props: AuthPropsLoc)
    {
        super(props);
        this.state = {...this.state, ready: false};
    }

    async initSession()
    {
        if(!this.props.match.params.chatId)
            throw Error("User not logged in");

        await register(this.props.match.params.chatId, (message: string) => this.setState({message}));
    }

    componentDidMount()
    {
        super.componentDidMount();
        this.initSession().then(() => this.setState({ready: true}));
    }

    render(): JSX.Element
    {
        return (
            <>
                {this.state.ready && <button onClick={() => sendMessage(456, "Hello")}>Send</button>}
                <h1>{this.state.message}</h1>
            </>
        );
    }
}

export default withRouter(ChatLoc);
