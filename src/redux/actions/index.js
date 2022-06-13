import * as types from "./types";

export function addShop(shopData) {
  return {
    type: types.ADD_SHOP,
    shopData,
  };
}
export function addShopSuccess(shopData) {
  return {
    type: types.ADD_SHOP_SUCCESS,
    shopData,
  };
}
export function updateShop(shopData) {
  return {
    type: types.UPDATE_SHOP,
    shopData,
  };
}
export function deleteShop(shopData) {
  return {
    type: types.DELETE_SHOP,
    shopData,
  };
}
export function fetchShopsData(shopsData) {
  return {
    type: types.FETCH_SHOPS_DATA,
    shopsData,
  };
}
export function setShopsData(shopsData) {
  return {
    type: types.SET_SHOPS_DATA,
    shopsData,
  };
}
