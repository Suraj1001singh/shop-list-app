import createReducer from "./createReducer";
import * as actionTypes from "../actions/types";

const initialState = {
  shops: "loading",
  isLoading: false,
};

export const shopsReducer = createReducer(initialState, {
  [actionTypes.ADD_SHOP](state, action) {
    return {
      ...state,
      isLoading: true,
    };
  },

  [actionTypes.UPDATE_SHOP]: (state, action) => {
    return {
      ...state,
      shops: state.shops.map((shop) => {
        if (shop.id === action?.shopData.id) {
          return action?.shopData;
        }
        return shop;
      }),
      isLoading: false,
    };
  },
  [actionTypes.DELETE_SHOP]: (state, action) => {
    return {
      ...state,
      shops: state.shops.filter((shop) => shop.id !== action?.shopData.id),
      isLoading: false,
    };
  },
  [actionTypes.SET_SHOPS_DATA]: (state, action) => {
    return {
      ...state,
      shops: action?.shopsData,
      isLoading: false,
    };
  },
  [actionTypes.ADD_SHOP_SUCCESS]: (state, action) => {
    return {
      ...state,
      shops: [...state.shops, action?.shopData],
      isLoading: false,
    };
  },
});
