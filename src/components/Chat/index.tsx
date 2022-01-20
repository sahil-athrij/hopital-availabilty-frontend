import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

import SignalConnection, {ChatMessage} from "./lib";

interface ChatState extends AuthState
{
    connection: SignalConnection;
    messages: Array<ChatMessage>;
}

class ChatLoc extends AuthComponent<AuthPropsLoc, ChatState>
{

    constructor(props: AuthPropsLoc)
    {
        super(props);

        if (!this.props.match.params.chatId)
            throw Error("User not logged in");

        localStorage.clear();

        const connection = new SignalConnection(
            this.props.match.params.chatId === "6OR241" ? "AMDLQH" : "6OR241", this.props.match.params.chatId,
            this.onMessage);

        this.state = {
            ...this.state,
            messages: [],
            connection
        };

    }

    onMessage = (message: ChatMessage) => this.setState({messages: [...this.state.messages, message]});

    render(): JSX.Element
    {
        return (
            <>
                <button onClick={() => this.state.connection.sendMessage("Hello "+Math.random())}>Send</button>
                {this.state.messages.map(({content}, i) => <h4 key={i}>{content}</h4>)}
            </>
        );
    }
}

export default withRouter(ChatLoc);
