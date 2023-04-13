import React, { FC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface AddressSelectProps {
    options: string[];
    address: string;
    handleChange(event: SelectChangeEvent): void;
}

const AddressSelect: FC<AddressSelectProps> = ({
    options,
    address,
    handleChange,
}) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="address">Address</InputLabel>
            <Select value={address} label="Address" onChange={handleChange}>
                {options.map((address: string) => {
                    return <MenuItem value={address}>{address}</MenuItem>;
                })}
            </Select>
        </FormControl>
    );
};

export default AddressSelect;
