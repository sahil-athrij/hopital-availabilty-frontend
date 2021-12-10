import * as React from "react";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import PickersDay, {PickersDayProps} from "@mui/lab/PickersDay";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";

type CustomPickerDayProps = PickersDayProps<Date> & {
    dayIsBetween: boolean;
    isFirstDay: boolean;
    isLastDay: boolean;
};

interface CustomDatePickerProps{
    ranges: Array<{start: Date, end: Date}>;
    onChange: (date:Date|null) => unknown
}

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})<CustomPickerDayProps>(({theme, dayIsBetween, isFirstDay, isLastDay}) => ({
    ...(dayIsBetween && {
        borderRadius: 0 ,
        backgroundColor: "#D8E3FF",
        color: "#0047FF",
        height: "44px",
        "&:hover, &:focus": {
            backgroundColor: theme.palette.primary.dark,
        },
    }),
    ...(isFirstDay && {
        backgroundColor: "#D8E3FF",
        color: "#0047FF",
        height: "44px",
        borderRadius: "0",
        borderTopLeftRadius: "6px",
        borderBottomLeftRadius: "6px",
    }),
    ...(isLastDay && {
        backgroundColor: "#D8E3FF",
        borderTopRightRadius: "6px",
        borderBottomRightRadius: "6px",
    }),
})) as React.ComponentType<CustomPickerDayProps>;

export default function CustomDatePicker({ranges, onChange}: CustomDatePickerProps)
{
    const [value, setValue] = React.useState<Date | null>(new Date());

    const renderWeekPickerDay = (
        date: Date,
        selectedDates: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>,
    ) =>
    {
        if (!value)
            return <PickersDay {...pickersDayProps} />;

        let first = false, last = false, middle = false;

        for (const {start, end} of ranges)
        {
            first = isSameDay(date, start);
            last = isSameDay(date, end);
            middle = isWithinInterval(date, {start, end});

            if(first || last || middle)
                break;
        }

        return (

            <CustomPickersDay
                sx={{width: "100%"}}
                {...pickersDayProps}
                disableMargin
                dayIsBetween={middle}
                isFirstDay={first}
                isLastDay={last}
            />
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                className="w-100"
                displayStaticWrapperAs="desktop"
                label="Week picker"
                value={value}
                onChange={(date) =>
                {
                    setValue(date);
                    onChange(date);
                }}
                renderDay={renderWeekPickerDay}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="'Week of' MMM d"
            />
        </LocalizationProvider>
    );
}
