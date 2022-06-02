import React, { Component } from "react";
import { Chip, } from "@mui/material";
import { withStyles } from "@mui/styles";

interface PillSelectProps<T extends { [k: string]: string }> {
    values: T,
    onChange: (v: (keyof T)[]) => void
}
interface PillSelectState {
    selected: string[]
}

const StyledChip = withStyles({
    root: {},

    label: {
        padding: "0",
    },

})(Chip);
const bluechip = {
    background: "#3E64FF", "&:hover": {
        background: "#3E64FF",
        color: "white",
    }, borderRadius: "5px", color: "white", fontSize: "15px", width: "126px", height: "41px"
};

const greychip = {
    background: "#F0F0F0",
    borderRadius: "5px",
    color: "black",
    fontSize: "15px",
    width: "126px",
    height: "41px"
};

export class PillSelect<T extends { [k: string]: string }> extends Component<PillSelectProps<T>, PillSelectState>
{
    constructor(props: PillSelectProps<T>) {
        super(props);
        this.state = { selected: [] };
    }

    handleChipChange(value: string) {
        const index = this.state.selected.indexOf(value);
        const { selected } = this.state;

        if (index > -1)
            selected.splice(index, 1);
        else
            selected.push(value);

        this.setState({ selected });
        this.props.onChange(selected);
    }

    render() {
        return Object.entries(this.props.values).map(([value, label], key) => (
            <div key={key} className="child mb-2">
                <StyledChip onClick={() => this.handleChipChange(value)}
                    sx={this.state.selected.includes(value) ? bluechip : greychip}
                    label={label} />
            </div>
        ))
    }
}

