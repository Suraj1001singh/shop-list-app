import { all } from "redux-saga/effects";

import { fetchShopsDataSaga, addShopSaga, updateShopSaga, deleteShopSaga } from "./ApiCalls";

export default function* watch() {
  yield all([fetchShopsDataSaga(), addShopSaga(), updateShopSaga(), deleteShopSaga()]);
}
