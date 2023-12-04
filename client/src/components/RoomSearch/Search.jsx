import "./Search.css";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Heading from "../common/Heading";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";
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
  occupancy: ["1", "2", "3", "4"],
  suiteType: [
    "Single Suite",
    "Double Suite",
    "Luxury Suite",
    "Presidential Suite",
    "Junior Suite",
    "Duplex Suite",
    "Studio Room",
    "Deluxe Suite"
  ],

  avai: ["Available", "Unavailable"],
  rate: [
    { name: "2000-4000", array: [2000, 4000] },
    { name: "4000-6000", array: [4000, 6000] },
    { name: "6000-10000", array: [6000, 10000] },
    { name: "10k or more", array: [10000, 50000] },
  ],
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
const RateSelect = ({ options, selectedValues, onChange }) => {
  const theme = useTheme();

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">{options.label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedValues}
          onChange={onChange}
          input={<OutlinedInput label={options.label} />}
          MenuProps={MenuProps}
        >
          {options.values.map((value) => (
            <MenuItem
              key={value.array}
              value={value.array}
              style={getStyles(value.array, selectedValues, theme)}
            >
              {value.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export const SingleSelect = ({ options, selectedValue, onChange }) => {
  const theme = useTheme();
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-single-name-label">{options.label}</InputLabel>
        <Select
          labelId="demo-single-name-label"
          id="demo-single-name"
          onChange={onChange}
          input={<OutlinedInput label={options.label} />}
          MenuProps={MenuProps}
        >
          {options.values.map((value) => (
            <MenuItem
              key={value}
              value={value}
              style={getStyles(value, selectedValue, theme)}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export const Search = ({ setRes, setSearchValues }) => {
  const [selectedOccupancy, setSelectedOccupancy] = React.useState([]);
  const [selectedSuiteType, setSelectedSuiteType] = React.useState([]);
  const [selectedRate, setSelectedRate] = React.useState([]);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [products, setProducts] = React.useState([]);

  const getAllSelectedValues = () => {
    return {
      selectedOccupancy,
      selectedSuiteType,
      selectedRate,
      startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : null,
    };
  };

  const handleOccupancyChange = (event) => {
    setSelectedOccupancy(event.target.value);
  };

  const handleSuiteTypeChange = (event) => {
    setSelectedSuiteType(event.target.value);
  };

  const handleRateChange = (event) => {
    setSelectedRate(event.target.value);
  };

  const handleStartDateChange = (newDate) => {
    if (newDate) {
      const formattedDate = dayjs(newDate).format("YYYY-MM-DD");
      setStartDate(formattedDate);
    } else {
      setStartDate(null);
    }
  };

  const handleEndDateChange = (newDate) => {
    if (newDate) {
      const formattedDate = dayjs(newDate).format("YYYY-MM-DD");
      setEndDate(formattedDate);
    } else {
      setEndDate(null);
    }
  };

  React.useEffect(() => { }, []);

  const filterProduct = async (e) => {
    setSearchValues({
      startDate: startDate,
      endDate: endDate,
    })
    try {
      e.preventDefault();
      const { data } = await axios.get("/api/v1/product/product-filters", {
        params: {
          selectedOccupancy,
          selectedSuiteType,
          selectedRate,
          startDate,
          endDate,
        },
      });
      //   console.log(data);
      //   setProducts(data.rooms);
      setRes(data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="searchcontainer">
      <Heading title="Search For Rooms" subtitle="Filter" />

      <form className="flex">
        <div className="box">
          <MultipleSelect
            options={{ label: "Suite Type", values: filterOptions.suiteType }}
            selectedValues={selectedSuiteType}
            onChange={handleSuiteTypeChange}
          />
          <MultipleSelect
            options={{
              label: "Occupancy(Person)",
              values: filterOptions.occupancy,
            }}
            selectedValues={selectedOccupancy}
            onChange={handleOccupancyChange}
          />
        </div>
        <div className="box">
          <RateSelect
            label="Rate /Night"
            options={{
              label: "Rate /Night",
              values: filterOptions.rate,
            }}
            selectedValues={selectedRate}
            onChange={handleRateChange}
          />
        </div>
        <div className="box">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Check-In Date"
                value={startDate || null} // Ensure it's either null or a date value
                onChange={handleStartDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Check-Out Date"
                value={endDate || null} // Set the selected value
                onChange={handleEndDateChange} // Handle change event
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <button className="btn1" onClick={filterProduct}>
          <h3>Search</h3>
        </button>
      </form>
    </div>
  );
};
