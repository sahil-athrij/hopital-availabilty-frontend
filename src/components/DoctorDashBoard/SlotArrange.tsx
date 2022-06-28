import React, {useState}   from "react";
import DayInfo from "./DayInfo";
import CustomDatePicker from "../Doctor/CustomDatePicker";
import "./topbar.css";
import Button from "@mui/material/Button";
import {  Container} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { StickyHead } from "../Utils";
import {useHistory} from "react-router-dom"
 

const DAYS:string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ];


function SlotArrange()
{
   const history = useHistory();

  const [calender,showCalender] = useState<boolean>(false);

  const changeCalenderState = ()=>{
    showCalender(el=>!el);
  };

 // A small component inside the main component 
 const DayInformation = ()=>
 {
    return (
         <div className="day_card">
    { DAYS.map((el, index)=>
        {     
          return (         
             <DayInfo day={el}  key={index}/>
           );
        }
         )}
          </div>
     );
 };

  return (
     <>
      <StickyHead title="set Weekly Schedule" onClick={()=>{}} goBack={()=>history.goBack()}/>
        <Container className="slot_body">
        <DayInformation/>
         <div className="btn-add">
           <Button variant="outlined" size="medium">  
             <div className="btn-cont">
               <span className="btn-span">
                <AddIcon/>
               </span>
              Add/Remove Slots
             </div>
            </Button>
         </div>
       </Container>
     </>

    );
}

export default SlotArrange;
