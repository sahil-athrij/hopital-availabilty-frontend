import React,{ useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TimePicker from "./TimePicker";
import "./days.css";

interface dateProp{
    day: string;
    select?: boolean;
}

const DayInfo = ({day}:dateProp) => 
 {
    const [dateInfo,showDateInfo] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
     {
        setChecked(event.target.checked);
        showDateInfo((el)=>!el);
      };

  return (
     <div className="box">
       <div className="check_date">
           <h5>{day}</h5>
           <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
        </div> 
        {dateInfo && 
             <div className="check_date date-pad">
                 <TimePicker lab="From"/>
                 <TimePicker lab="To"/>
             </div>
         }
     </div>
  );
};

export default DayInfo;
