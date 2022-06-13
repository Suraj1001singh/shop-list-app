import React, { useState } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../redux/actions/index";

const ShopForm = ({ shop, setIsEdit }) => {
  const { isLoading } = useSelector((state) => state.shopsReducer);
  const dispatch = useDispatch();
  const areas = ["Thane", "Pune", "Mumbai", "Suburban", "Nashik", "Nagpur", "Ahmednagar", "Solapur"];
  const category = ["Grocery", "Butcher", "Baker", "Chemist", "Stationery shop"];

  //form input states
  const [shopName, setShopName] = useState(shop?.shopName || "");
  const [selectedArea, setSelectedArea] = useState(shop?.area || "");
  const [selectedCategory, setSelectedCategory] = useState(shop?.category || "");
  const [openingTime, setOpeningTime] = useState((shop && moment(shop?.openingTime, "hh:mm A")) || null);
  const [closingTime, setClosingTime] = useState((shop && moment(shop?.closingTime, "hh:mm A")) || null);

  //form inputs error states
  const [formError, setFormError] = useState({
    shopNameError: false,
    areaError: false,
    categoryError: false,
    openingTimeError: false,
    closingTimeError: false,
    openAfterCloseTimeError: false,
  });

  const validationCheck = () => {
    let flag = false;
    if (shopName.trim() === "") {
      flag = true;
      setFormError({ ...formError, shopNameError: true });
    }
    if (selectedArea.trim() === "") {
      flag = true;
      setFormError({ ...formError, areaError: true });
    }
    if (selectedCategory.trim() === "") {
      flag = true;
      setFormError({ ...formError, categoryError: true });
    }
    if (openingTime === null) {
      flag = true;
      setFormError({ ...formError, openingTimeError: true });
    }
    if (closingTime === null) {
      flag = true;
      setFormError({ ...formError, closingTimeError: true });
    }
    if (openingTime && closingTime && openAndCloseTimingCheck()) {
      flag = true;
      setFormError({ ...formError, openAfterCloseTimeError: true });
    }
    return flag;
  };

  const openAndCloseTimingCheck = () => {
    const storeOpenTime = moment(openingTime);
    const storeCloseTime = moment(closingTime);
    return storeOpenTime.isAfter(storeCloseTime);
  };

  //handeling form submit
  const submitForm = (e) => {
    e.preventDefault();
    const shopData = {
      shopName,
      area: selectedArea,
      category: selectedCategory,
      openingTime: moment(openingTime).format("hh:mm A"),
      closingTime: moment(closingTime).format("hh:mm A"),
    };
    if (validationCheck()) return;
    if (shop) {
      //shop object is present, so update the shop
      shopData["id"] = shop?.id;
      dispatch(action.updateShop(shopData));
      setIsEdit(false);
    } else dispatch(action.addShop(shopData)); //shop object is not present, so add the shop
  };

  return (
    <form style={{ display: "grid", gridGap: "1rem", maxWidth: "700px", margin: "auto" }} onSubmit={(e) => submitForm(e)}>
      <FormControl fullWidth>
        <TextField
          required
          error={formError?.shopNameError}
          helperText={formError?.shopNameError ? "Shope name can't be empty" : ""}
          label="Shop Name"
          variant="outlined"
          value={shopName}
          onChange={(e) => {
            setShopName(e.target.value);
            setFormError({ ...formError, shopNameError: false });
          }}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Area</InputLabel>
        <Select
          required
          label="Area"
          value={selectedArea}
          onChange={(e) => {
            setFormError({ ...formError, areaError: false });
            setSelectedArea(e.target.value.trim());
          }}
        >
          {areas.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          required
          label="Category"
          value={selectedCategory}
          onChange={(e) => {
            setFormError({ ...formError, categoryError: false });
            setSelectedCategory(e.target.value.trim());
          }}
        >
          {category.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Opening Time"
            value={openingTime}
            onChange={(newValue) => {
              setFormError({ ...formError, openingTimeError: false, openAfterCloseTimeError: false });
              setOpeningTime(newValue);
            }}
            renderInput={(params) => <TextField {...params} required error={false} onKeyDown={(e) => e.preventDefault()} />}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl error={true}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Closing Time"
            value={closingTime}
            onChange={(newValue) => {
              setFormError({ ...formError, closingTimeError: false, openAfterCloseTimeError: false });
              setClosingTime(newValue);
            }}
            renderInput={(params) => <TextField {...params} required error={formError.openAfterCloseTimeError} helperText={formError.openAfterCloseTimeError ? "Closing time should be after Opening time " : ""} onKeyDown={(e) => e.preventDefault()} />}
          />
        </LocalizationProvider>
      </FormControl>

      <div style={{ display: "flex" }}>
        <LoadingButton loading={isLoading} variant="contained" type="submit" color="success" style={{ width: "fit-content", margin: "auto" }}>
          {shop ? "Update" : "Submit"}
        </LoadingButton>
        {shop && (
          <Button variant="contained" onClick={() => setIsEdit(false)} color="error" style={{ width: "fit-content", margin: "auto" }}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ShopForm;
