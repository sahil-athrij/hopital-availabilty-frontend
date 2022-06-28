import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


interface prop {
    lab: string;
}

export default function TimePicker({lab}:prop) 
{
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => 
{
    setAge(event.target.value as string);
  };

  return (
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
        <InputLabel id="demo-simple-select-label">{lab}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={lab}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
  );
}
