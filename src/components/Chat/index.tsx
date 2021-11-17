import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";
import SignalProtocolManager from "./lib/SignalProtocolManager";

interface ChatState extends AuthState{
    signalUser: SignalProtocolManager;
    ready: boolean
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
        const user1 = "user1@domain.cc";
        const signalProtocolManagerUser = new SignalProtocolManager(user1);
        await signalProtocolManagerUser.initializeAsync();

        this.setState({signalUser: signalProtocolManagerUser, ready: true});
        const cipher2 = await this.state.signalUser.encryptMessageAsync(user1, "hello from 2");

        const decrypt2 = await this.state.signalUser.decryptMessageAsync(user1, cipher2);

        console.log(cipher2, decrypt2);
    }

    componentDidMount()
    {
        super.componentDidMount();
        this.initSession().then();
    }

    render(): JSX.Element
    {
        return (
            <>
                {}
            </>
        );
    }
}

export default withRouter(ChatLoc);
