import './yesnoinput.css'
import ResponsiveComponent from "../ResponsiveComponent";
import {FormControl, InputLabel, NativeSelect} from "@material-ui/core";

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
            <FormControl required className="w-100">
                <InputLabel id={this.props.name+"label"} htmlFor={this.props.name}>{this.props.label}</InputLabel>
                <NativeSelect labelId={this.props.name+"label"}
                    value={this.state.value}
                    onChange={this.onChange}
                    name={this.props.name}
                    className={"p-1"}
                    inputProps={{'aria-label': this.props.name}}
                >
                    <option aria-label="None" selected hidden disabled/>
                    <option value={0}>Didn't Avail</option>
                    <option value={2}>Available</option>
                    <option value={1}>Not Available</option>
                </NativeSelect>
            </FormControl>
        )
    }
}