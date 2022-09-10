import { FunctionComponent, useState } from "react";
import { TextField, Autocomplete as AutocompleteMUI, CircularProgress } from '../mui'
interface AutoCompleteProps {
    loading: boolean;
    fetchMore: (value: any) => any[] | Promise<any[]>;
    onSelectHandler: (data: any) => void | Promise<void>
}

const AutoComplete: FunctionComponent<AutoCompleteProps> = ({ loading, fetchMore, onSelectHandler }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<any[]>([]);
    const handleInputChange = async (value: any) => {
        const items = await fetchMore(value);
        setOptions(items)
    }
    return (<>
        <AutocompleteMUI
            multiple
            id="size-small-outlined-multi"
            size="small"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
                setOptions([]);
            }}
            onChange={(event: any, values: any) => {
                console.log({ event, values });
                onSelectHandler(values)
            }}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option: any) => option.title}
            options={options}
            loading={loading}
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