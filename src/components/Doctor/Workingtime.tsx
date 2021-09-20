import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import LocalizationProvider from '@mui/lab/LocalizationProvider';

import MobileTimePicker from '@mui/lab/MobileTimePicker';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Component} from "react";


export class ResponsiveTimePickers extends Component<{}, { value: number | null,items:number[] }> {

    days = ["sunday", "monday", "Tuesday", "wednesday", "thursday", "friday", "saturday"]

    render() {
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TableContainer>
                    <Table sx={{minWidth: 200}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>day</TableCell>
                                <TableCell>Starting time</TableCell>
                                <TableCell>Ending time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.items.map((item, key) => (

                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <FormControl>

                                            <Select
                                                style={{width: "120px"}}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                {this.days.map((day, key) => (
                                                    <MenuItem value={key}>{day}</MenuItem>)
                                                )
                                                }

                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="right"> <MobileTimePicker

                                        value={this.state.value}
                                        onChange={(value) => {
                                            this.setState({value});
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    /></TableCell>
                                    <TableCell align="right"> <MobileTimePicker

                                        value={this.state.value}
                                        onChange={(value) => {
                                            this.setState({value});
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    /></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LocalizationProvider>
        );
    }
}