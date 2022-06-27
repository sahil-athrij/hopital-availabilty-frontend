import React   from "react";
import DayInfo from "./DayInfo";
// import CustomDatePicker from "../Doctor/CustomDatePicker";
import TopBar from "./TopBar";
import "./topbar.css";



const DAYS:string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ];


function SlotArrange()
{
  return (
     <>
      <TopBar/>
        <div className="slot_body">
          <div className="day_card">
            { DAYS.map((el, index)=>(
             <DayInfo day={el} key={index* Math.random()} />
           ))}
         </div>
       </div>
     </>

    );
}

export default SlotArrange;
