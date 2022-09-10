import { FunctionComponent, useState } from "react";
import { AdapterDayjs, dayjs, Dayjs, LocalizationProvider, MobileDatePicker, TextField } from "../mui";

interface DatePickerProps {
    handlePickerChange: (value: any) => void | Promise<void>
}

const DatePicker: FunctionComponent<DatePickerProps> = ({ handlePickerChange }) => {
    const [value, setValue] = useState<Dayjs | null>(
        dayjs(new Date().toISOString()),
    );

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
        handlePickerChange(newValue?.toDate())
    };
    
    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
            label="Birth Date"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>);
}

export default DatePicker;