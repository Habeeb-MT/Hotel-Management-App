import "./Search.css"
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Heading from "../common/Heading";


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const filterOptions = {
    occupancy: ['1 person', '2 persons', '3 persons', '4 persons'],
    suiteType: ['Single Suite', 'Double Suite', 'Luxury Suite', 'Presidential Suite'],
    ac: ['AC', 'Non-AC'],
    avai: ['Available', 'Unavailable']
    // Add more filter options as needed
};




export const MultipleSelect = ({ options, selectedValues, onChange }) => {
    const theme = useTheme();

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">{options.label}</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selectedValues}
                    onChange={onChange}
                    input={<OutlinedInput label={options.label} />}
                    MenuProps={MenuProps}
                >
                    {options.values.map((value) => (
                        <MenuItem
                            key={value}
                            value={value}
                            style={getStyles(value, selectedValues, theme)}
                        >
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};


export const Search = () => {
    const [selectedOccupancy, setSelectedOccupancy] = React.useState([]);
    const [selectedSuiteType, setSelectedSuiteType] = React.useState([]);
    const [selectedAC, setSelectedAC] = React.useState([]);
    const [selectedAvai, setSelectedAvai] = React.useState([]);

    const handleOccupancyChange = (event) => {
        setSelectedOccupancy(event.target.value);
    };

    const handleSuiteTypeChange = (event) => {
        setSelectedSuiteType(event.target.value);
    };

    const handleACChange = (event) => {
        setSelectedAC(event.target.value);
    };

    const handleAvaiChange = (event) => {
        setSelectedAvai(event.target.value);
    };

    return (
        <div className='searchcontainer'>
            <Heading title='Search For Rooms' subtitle='Filter' />

            <form className='flex'>
                <div className='box'>
                    <MultipleSelect
                        options={{ label: 'Occupancy', values: filterOptions.occupancy }}
                        selectedValues={selectedOccupancy}
                        onChange={handleOccupancyChange}
                    />
                    <MultipleSelect
                        options={{ label: 'Suite Type', values: filterOptions.suiteType }}
                        selectedValues={selectedSuiteType}
                        onChange={handleSuiteTypeChange}
                    />
                </div>
                <div className='box'>
                    <MultipleSelect
                        options={{ label: 'AC', values: filterOptions.ac }}
                        selectedValues={selectedAC}
                        onChange={handleACChange}
                    />
                    <MultipleSelect
                        options={{ label: 'Availability', values: filterOptions.avai }}
                        selectedValues={selectedAvai}
                        onChange={handleAvaiChange}
                    />
                </div>

                <button className='btn1'>
                    <h3>Search</h3>
                </button>
            </form>
        </div>
    );
};

