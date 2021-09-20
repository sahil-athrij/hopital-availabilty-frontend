import {ResponsiveComponent, ResponsiveProps, ResponsiveState} from "../ResponsiveComponent";
import {TextField} from "@mui/material";
import React from 'react';

import './yesnoinput.css'

interface YesNoProps extends ResponsiveProps {
    name: string,
    label: string,
    value: number | null,
    setValue: (name: string, value: string) => void
}

interface YesNoState extends ResponsiveState {
    value: number | null
}

export class YesNoInput extends ResponsiveComponent<YesNoProps, YesNoState> {
    constructor(props: YesNoProps) {
        super(props);

        this.state = {
            ...this.state, value: this.props.value
        }
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(event.target.value)
        if (event.target.value !== '' && event.target.value !== undefined && event.target.value !== null) {
            this.props.setValue(this.props.name, event.target.value)
            this.setState({value: parseInt(event.target.value)})
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
                       onChange={(event) => {
                           this.onChange(event)
                       }}
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