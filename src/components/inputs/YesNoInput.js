import './yesnoinput.css'
import ResponsiveComponent from "../ResponsiveComponent";
import {TextField} from "@material-ui/core";

export class YesNoInput extends ResponsiveComponent {
    state = {value: this.props.value}
    onChange = (event) => {
        console.log(event.target.value)
        if (event.target.value !== '' && event.target.value !== undefined && event.target.value !== null) {
            this.props.setValue(this.props.name, event.target.value)
            this.setState({value: event.target.value})
        }
    }

    render() {
        return (


            <TextField label={this.props.label}
                       SelectProps={{
                           native: true,
                       }}
                       select
                       variant="outlined"
                       value={this.state.value}
                       onChange={this.onChange}
                       name={this.props.name}
                       className={"p-1 my-2 w-100"}
                       inputProps={{'aria-label': this.props.name}}
            >
                <option aria-label="None" value="" hidden/>
                <option value={0}>Didn't Avail</option>
                <option value={2}>Available</option>
                <option value={1}>Not Available</option>
            </TextField>

        )
    }
}