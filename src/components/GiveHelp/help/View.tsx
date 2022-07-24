import { Container } from "@mui/system";
import React from "react";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router";
import { AuthComponent, AuthState } from "../../../api/auth";
import { Patient, PatientObject } from "../../../api/model";
import Medical from "../cards/Medical";
import { AuthPropsLoc } from "../GiveHelp";

interface NewProp extends AuthState {
  model: PatientObject;
  isLoading: boolean;
}

class ViewHelp extends AuthComponent<AuthPropsLoc, NewProp> {
  constructor(props: AuthPropsLoc) {
    super(props);
    this.state = {
      ...this.state,
      isLoading: true,
    };
  }

  componentDidMount() {
    Patient.action_general("all", {}, true).then((patients) => {
      const id: string = this.props.match.params.id as string;
      if (!id) this.props.history.push("/help");
      const results = patients.results;
      this.setState({ model: results });
      const user = results.find((el: PatientObject) => el.id === parseInt(id));
      if (!user) this.props.history.push("/help");
      this.setState({ model: user });
      this.setState({ isLoading: false });
      console.log(this.state.model);
    });
  }

  render() {
    if (this.state.isLoading)
      return (
        <>
          <Container className="mt-5 pt-5 text-center">
            <Loader type="Bars" color="#3a77ff" height={50} width={50} />
          </Container>
        </>
      );
    return <Medical user={this.state.model} />;
  }
}

export default withRouter(ViewHelp);
