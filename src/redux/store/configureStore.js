import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { shopsReducer } from "../reducers";
import sagas from "../sagas";

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

// const reducers = combineReducers(shopsReducer);
// const rootReducer = (state, action) => {
//   if (action.type === "LOG_OUT" || action.type === "DELETE_BUSINESS") {
//     return reducers({ authReducer: state.authReducer }, action);
//   }

//   return reducers(state, action);
// };
const rootReducer = combineReducers({
  shopsReducer,
});
const enhancers = [applyMiddleware(...middleware)];

const store = createStore(rootReducer, undefined, compose(...enhancers));
sagaMiddleware.run(sagas);

export { store };
