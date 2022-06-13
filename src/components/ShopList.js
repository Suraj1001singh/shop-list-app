import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { ThreeDots } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../redux/actions";
import ShopCard from "./ShopCard";
import Filters from "./Filters";
import FilterModal from "./FilterModal";

const ShopList = () => {
  const { shops } = useSelector((state) => state.shopsReducer);
  const dispatch = useDispatch();
  const areas = ["Thane", "Pune", "Mumbai", "Suburban", "Nashik", "Nagpur", "Ahmednagar", "Solapur"];
  const categories = ["Grocery", "Butcher", "Baker", "Chemist", "Stationery shop"];

  //modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  //shops after filteration state
  const [filteredShops, setFilteredShops] = useState(shops);

  //selected filters state
  const [areaState, setAreaState] = useState({});
  const [categoryState, setCategoryState] = useState({});
  const [openState, setOpenState] = useState(true);

  //Fetching shops from server
  useEffect(() => {
    dispatch(action.fetchShopsData());
  }, []);

  //Initialising filters state
  useEffect(() => {
    // if (areaState !== {}) return;
    let areaObj = {};
    for (let i = 0; i < areas.length; i++) {
      areaObj[areas[i]] = false;
    }
    setAreaState(areaObj);

    let categoryObj = {};
    for (let i = 0; i < categories.length; i++) {
      categoryObj[categories[i]] = false;
    }
    setCategoryState(categoryObj);
  }, [areas, categories]);

  //function to filter shops
  const filterration = () => {
    const isAreaFilterSelected = Object.values(areaState).some((value) => value === true);
    const isCategoryFilterSelected = Object.values(categoryState).some((value) => value === true);

    let temp = [];

    shops !== "loading" &&
      shops?.forEach((shop) => {
        const isShopOpen = isOpen(shop?.openingTime, shop?.closingTime);

        if (isAreaFilterSelected && isCategoryFilterSelected && areaState[shop?.area?.trim()] && categoryState[shop?.category?.trim()] && isShopOpen === openState) {
          temp.push(shop);
        } else if (isAreaFilterSelected && areaState[shop?.area?.trim()] && isShopOpen === openState) {
          temp.push(shop);
        } else if (isCategoryFilterSelected && categoryState[shop?.category?.trim()] && isShopOpen === openState) {
          temp.push(shop);
        } else if (!isAreaFilterSelected && !isCategoryFilterSelected && isShopOpen === openState) {
          temp.push(shop);
        }
      });
    setFilteredShops(temp);
  };

  useEffect(() => {
    filterration();
  }, [areaState, categoryState, openState, shops]);

  //function to check if shop is open or not
  function isOpen(openTime, closeTime) {
    // handle special case
    const timezone = "Asia/Kolkata";
    if (openTime === "24HR") {
      return "open";
    }

    // get the current date and time in the given time zone
    const now = moment.tz(timezone);

    const date = now.format("YYYY-MM-DD");
    const storeOpenTime = moment.tz(date + " " + openTime, "YYYY-MM-DD h:mmA", timezone);
    const storeCloseTime = moment.tz(date + " " + closeTime, "YYYY-MM-DD h:mmA", timezone);

    let check;
    if (storeCloseTime.isBefore(storeOpenTime)) {
      // Handle ranges that span over midnight
      check = now.isAfter(storeOpenTime) || now.isBefore(storeCloseTime);
    } else {
      // Normal range check using an inclusive start time and exclusive end time
      check = now.isBetween(storeOpenTime, storeCloseTime, null, "[)");
    }

    return check ? true : false;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "87vh", position: "relative" }}>
      <button className="filterButton" onClick={() => setIsModalOpen(true)}>
        Filter
      </button>

      <FilterModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} areaState={areaState} setAreaState={setAreaState} categoryState={categoryState} setCategoryState={setCategoryState} openState={openState} setOpenState={setOpenState} />

      <div className="filterContainer">
        <Filters areaState={areaState} setAreaState={setAreaState} categoryState={categoryState} setCategoryState={setCategoryState} openState={openState} setOpenState={setOpenState} />
      </div>

      {/* shop list render section */}
      <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", margin: "auto", flexWrap: "wrap", justifyContent: "space-evenly", marginTop: "2rem" }}>{shops === "loading" ? <ThreeDots height="200px" color="black" /> : shops?.length === 0 ? <h1>No Listed shops!</h1> : filteredShops?.map((shop) => <ShopCard shop={shop} />)}</div>
    </div>
  );
};

export default ShopList;
