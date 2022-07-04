import React, { Component } from "react";
import "./slotarrange.css";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import { StickyHead } from "../Utils";
import { withRouter, RouteComponentProps } from "react-router";
import CheckDay from "./CheckDay";
import CustomDatePicker from "../Doctor/CustomDatePicker";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TimePicker from "./TimePicker";
import Modal from "./Modal";

export const DAYS: string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

interface State {
  show: boolean;
  clickIndex: number;
  checked: boolean;
  openCalender: boolean;
  btnVal: string;
  slote: boolean;
  openModal:boolean;
  date:Date;
}

type AppProps = RouteComponentProps;
class SlotArrange extends Component<AppProps, State>
{

  state: State = {
    show: false,
    clickIndex: 0,
    checked: false,
    openCalender: false,
    btnVal:"Open",
    slote:false,
    openModal:true,
    date:new Date(),
  };

  setClickIndex(el: number)
   {
    this.setState({ clickIndex: el });
  }

  handleCalenderChange = (val:any):void =>
  {
    this.setState({date:val});
    this.handleModal();
  };

  handleChecked = (event: React.ChangeEvent<HTMLInputElement>): void =>
   {
    this.setState({ checked: event.target.checked });
  };

  handleBtnState = ():void =>
  {
    this.setState({ openCalender: !this.state.openCalender });
    if(this.state.openCalender)
      this.setState({btnVal:"View"});
    else
      this.setState({btnVal:"Hide"});
  };

  handleModal = ():void=>
  {
     this.setState({openModal: !this.state.openModal}); 
  };

  // modal opening unwanted on first render this is the f
  componentDidMount()
  {
    this.setState({openModal: false});
  }

  render() 
  { 
    return (
      // 90% code in this are Conditionally renderd
      <>
      {/* Info about calender is passed to this modal */}
    <Modal open={this.state.openModal} handleClose={this.handleModal} >
      <div className="md-box">
        <div className="md-main">
          <div>
            <h4>{this.state.date.getDate()}</h4>
            <h5>{DAYS[this.state.date.getDay()]}</h5>
          </div>
         <div className="symbol center" onClick={this.handleModal} >
           <CloseIcon/>
         </div>
      
        </div>


      </div>
    </Modal>

        <StickyHead title="set Weekly Schedule" onClick={() => console.log("submit")} goBack={() => this.props.history.goBack()} />
        <Container className="slot_body">
          {/* <Modal onClose={() =>console.log("close")}> */}
          {DAYS.map((el, index) =>
           {
            return (
              <CheckDay key={index} index={index} el={el} setClickIndex={() => this.setClickIndex(index)} clickIndex={this.state.clickIndex} />
            );
          })}
          <div className="btn-add">
            <Button variant="outlined" size="small" onClick={()=> this.setState({slote:!this.state.slote})} >
              <div className="btn-cont">
                <span className="btn-span">
                  <AddIcon />
                </span>
                Add/Remove Slots
              </div>
            </Button>
          </div>
 
         {this.state.slote && 
         <>
          <div className="center">
               <TimePicker lab="Day" data={DAYS}/>
               {/* these to should accpet a array of time in string as the data prop */}
               <TimePicker lab="From"  data={DAYS}/>
               <TimePicker lab="To"  data={DAYS}/>
          </div>
         </>
          
         }

          {
            this.state.openCalender &&
             <>
              <div className="cal">
               <CustomDatePicker ranges={[{start: new Date(), end: new Date()}]} onChange={this.handleCalenderChange}/>
              </div>
             </>
          }
           
          <div className="btn-add">
          <Button variant={!this.state.openCalender?"contained":"outlined"} onClick={this.handleBtnState} size="small">
              <div className="btn-cont">
                <span className="btn-span">
                 {this.state.openCalender && <VisibilityOffIcon/>}
                 {!this.state.openCalender &&  <EventIcon/>}
                </span>
                {this.state.btnVal} Schedule
              </div>
             </Button>
          </div>
        </Container>
      </>

    );

  }
}

export default withRouter(SlotArrange);

