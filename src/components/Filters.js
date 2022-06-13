import React from "react";
import { FormControl, FormControlLabel, Checkbox, FormLabel, FormGroup, RadioGroup, Radio } from "@mui/material";

const Filters = ({ areaState, setAreaState, categoryState, setCategoryState, setOpenState }) => {
  const areas = ["Thane", "Pune", "Mumbai", "Suburban", "Nashik", "Nagpur", "Ahmednagar", "Solapur"];
  const categories = ["Grocery", "Butcher", "Baker", "Chemist", "Stationery shop"];

  const handleAreaChange = (event) => {
    setAreaState({
      ...areaState,
      [event.target.name]: event.target.checked,
    });
  };
  const handleCategoryChange = (event) => {
    setCategoryState({
      ...categoryState,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div style={{ display: "grid", background: "white" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Areas</FormLabel>
        <FormGroup>
          {areas?.map((area, index) => (
            <FormControlLabel key={index} checked={areaState[area.trim()]} control={<Checkbox name={area} onChange={handleAreaChange} />} label={area} />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Category</FormLabel>
        <FormGroup>
          {categories?.map((category, index) => (
            <FormControlLabel key={index} checked={categoryState[category.trim()]} control={<Checkbox onChange={handleCategoryChange} name={category} />} label={category} />
          ))}
        </FormGroup>
      </FormControl>

      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup name="use-radio-group" defaultValue="opened">
          <FormControlLabel value="opened" onChange={() => setOpenState(true)} control={<Radio />} label="Opened" />
          <FormControlLabel value="closed" onChange={() => setOpenState(false)} control={<Radio />} label="Closed" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Filters;
