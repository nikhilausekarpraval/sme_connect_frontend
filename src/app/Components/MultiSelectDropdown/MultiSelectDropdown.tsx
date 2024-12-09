import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.8 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface IMultiSelectDropdown {
    values: string[] | null | undefined,
    title: string,
    selectedNames: string[],
    handleChange: (event: any) => void;
}


const MultipleSelectDropdown: React.FC<IMultiSelectDropdown> = ({ values, title, selectedNames, handleChange }) => {

    return (
        <div>
            <FormControl sx={{ m: 0, width: 352, height: 30, }}>
                <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedNames}
                    onChange={handleChange}
                    input={<OutlinedInput label={title} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {values?.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedNames.includes(name)} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}; export default MultipleSelectDropdown;