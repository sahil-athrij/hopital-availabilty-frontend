import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

import SignalConnection from "./lib";

interface ChatState extends AuthState
{
    connection: SignalConnection;
}

class ChatLoc extends AuthComponent<AuthPropsLoc, ChatState>
{

    constructor(props: AuthPropsLoc)
    {
        super(props);

        if (!this.state.user?.tokens.private_token || !this.props.match.params.chatId)
            throw Error("User not logged in");

        this.state = {
            ...this.state,
            connection: new SignalConnection(this.state.user?.tokens.private_token, this.props.match.params.chatId)
        };

    }

    render(): JSX.Element
    {
        return (
            <>
                <button onClick={() => this.state.connection.sendMessage("Hello")}>Send</button>
                {this.state.connection.messages.map((msg, i) => <h4 key={i}>{msg}</h4>)}
            </>
        );
    }
}

export default withRouter(ChatLoc);
