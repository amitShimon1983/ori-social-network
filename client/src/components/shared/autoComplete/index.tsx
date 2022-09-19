import { FunctionComponent, useEffect, useState } from "react";
import { TextField, Autocomplete as AutocompleteMUI, CircularProgress } from '../mui'
interface AutoCompleteProps {
    loading: boolean;
    fetchData: (value: any, setOptions: React.Dispatch<React.SetStateAction<any[]>>) => any[] | Promise<any[]>;
    onSelectHandler: (data: any) => void | Promise<void>;
    renderOption: ((props: React.HTMLAttributes<HTMLLIElement>, option: any, state: any) => React.ReactNode) | undefined;
    defaultValue: any[];
}

const AutoComplete: FunctionComponent<AutoCompleteProps> = ({ loading, fetchData, onSelectHandler, renderOption, defaultValue }) => {
    const [options, setOptions] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const handleInputChange = async (value: any) => {
        await fetchData(value, setOptions);
        return value;
    }
    return (<>
        <AutocompleteMUI
            multiple
            id="size-small-outlined-multi"
            size="small"
            open={open}
            value={defaultValue.length ? defaultValue : undefined}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
                setOptions([]);
            }}
            // value={defaultValue || null}
            onChange={(event: any, values: any) => {
                onSelectHandler(values)
                return values;
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option: any) => option.name}
            options={options}
            loading={loading}
            renderOption={renderOption}
            renderInput={(params) => (
                <TextField {...params}
                    label="Contacts"
                    placeholder="Contacts"
                    onChange={ev => {
                        if (ev.target.value !== "" || ev.target.value !== null) {
                            handleInputChange(ev.target.value);
                        }
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }} />
            )}
        /></>);
}

export default AutoComplete;