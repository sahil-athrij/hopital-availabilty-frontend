import React, { Component } from "react";
import "./topbar.css";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { StickyHead } from "../Utils";
import { withRouter, RouteComponentProps } from "react-router";
import CheckDay from "./CheckDay";
import CustomDatePicker from "../Doctor/CustomDatePicker";




const DAYS: string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];



interface State {
  show: boolean;
  clickIndex: number;
  checked: boolean;
  openCalender: boolean;
}
type AppProps = RouteComponentProps;
class SlotArrange extends Component<AppProps, State>
{

  state: State = {
    show: false,
    clickIndex: 0,
    checked: false,
    openCalender: false,
  };

  setClickIndex(el: number)
   {
    this.setState({ clickIndex: el });
  }


  handleChecked = (event: React.ChangeEvent<HTMLInputElement>): void =>
   {
    this.setState({ checked: event.target.checked });
  };

  render() 
  { 
    return (
      <>
        <StickyHead title="set Weekly Schedule" onClick={() => console.log("submit")} goBack={() => this.props.history.goBack()} />
        <Container className="slot_body">
          {DAYS.map((el, index) =>
           {
            return (
              <CheckDay key={index} index={index} el={el} setClickIndex={() => this.setClickIndex(index)} clickIndex={this.state.clickIndex} />
            );
          })};
          <div className="btn-add">
            <Button variant="outlined" size="medium" onClick={() => this.setState({ openCalender: !this.state.openCalender })}>
              <div className="btn-cont">
                <span className="btn-span">
                  <AddIcon />
                </span>
                Add/Remove Slots
              </div>
            </Button>
          </div>
          {this.state.openCalender && <>
            <div className="cal">
            <CustomDatePicker ranges={[{start: new Date(), end: new Date()}]} onChange={()=>console.log("changed")}/>
            </div>
          </>}
        </Container>
      </>

    );

  }
}

export default withRouter(SlotArrange);

