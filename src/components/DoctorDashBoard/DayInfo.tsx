import React,{ useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import "./days.css";

interface dateProp{
    day: string;
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
             <div className="check_date">
                 <h5>Date 1</h5>
                 <h5>Date 2</h5>
             </div>
         }
     </div>
  );
};

export default DayInfo;
