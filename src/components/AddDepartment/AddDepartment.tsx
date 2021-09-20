import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

class AddDepartmentLoc extends AuthComponent<AuthPropsLoc, AuthState>
{
    render(): JSX.Element {
        // @ts-ignore
        const {hspId} = this.props.match.params;

        return (
            <>
                <h1>{hspId}</h1>
            </>
        );
    }
}

export const AddDepartmentComponent = withRouter(AddDepartmentLoc);