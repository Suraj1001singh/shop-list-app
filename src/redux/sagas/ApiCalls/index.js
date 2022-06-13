import { takeEvery } from "redux-saga/effects";
import * as types from "../../actions/types";
import * as action from "../../actions";
import { store } from "../../store/configureStore";
import { app } from "../../../config/firebaseConfig";
import { getDatabase, ref, onValue, update, push, set, remove } from "firebase/database";

//fetching shops data from firebase
function* fetchShopsData() {
  try {
    const db = getDatabase(app);
    const shopsRef = ref(db, "public/shops");
    console.log("fetching .....");
    let shopsData = [];
    yield onValue(shopsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        shopsData = Object.values(data);
      }
      store.dispatch(action.setShopsData(shopsData));
    });
  } catch (err) {
    console.log(err);
  }
}

//adding shop data to firebase
function* addShop({ shopData }) {
  try {
    const db = getDatabase(app);
    let shopsRef = ref(db, "public/shops");
    const id = push(shopsRef).key;

    shopsRef = ref(db, "public/shops/" + id);
    shopData["id"] = id;
    yield set(shopsRef, shopData);
    store.dispatch(action.addShopSuccess(shopData));
  } catch (err) {
    console.log(err);
  }
}

//updating shop data to firebase
function* updateShop({ shopData }) {
  try {
    const db = getDatabase(app);
    const shopsRef = ref(db, "public/shops/" + shopData.id);

    yield update(shopsRef, shopData);
  } catch (err) {
    console.log(err);
  }
}

//deleting shop data to firebase
function* deleteShop({ shopData }) {
  try {
    const db = getDatabase(app);
    const shopsRef = ref(db, "public/shops/" + shopData.id);
    yield remove(shopsRef);
  } catch (err) {
    console.log(err);
  }
}
export function* fetchShopsDataSaga() {
  yield takeEvery(types.FETCH_SHOPS_DATA, fetchShopsData);
}
export function* addShopSaga() {
  yield takeEvery(types.ADD_SHOP, addShop);
}
export function* updateShopSaga() {
  yield takeEvery(types.UPDATE_SHOP, updateShop);
}
export function* deleteShopSaga() {
  yield takeEvery(types.DELETE_SHOP, deleteShop);
}
