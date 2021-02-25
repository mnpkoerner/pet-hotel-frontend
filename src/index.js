import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";
const querystring = require('querystring');


const sagaMiddleware = createSagaMiddleware();

//root saga holding all sagas
function* rootSaga() {
  yield takeEvery("FETCH_OWNER_DATA", fetchOwnerData);
  yield takeEvery("ADD_NEW_OWNER", addNewOwner);
  yield takeEvery("DELETE_OWNER", deleteOwner);
  yield takeEvery("FETCH_PETS", fetchPets);
  yield takeEvery("POST_PET", postPet);
  yield takeEvery("DELETE_PET", deletePet);
  yield takeEvery("UPDATE_CHECK_IN", updateCheckIn);
  yield takeEvery("TEST", getTest)
}

//test saga
function* getTest() {
  try {
    console.log("in getTest saga");
    const response = yield axios.get("/test");
    console.log("test data from getTest saga:", response.data);
  } catch (error) {
    console.log("error in getTest saga:", error);
  }
}

// MANAGE OWNERS SAGAS

function* fetchOwnerData() {
  try {
    console.log("in fetchOwnerData saga");
    const response = yield axios.get("/owners");
    console.log("test data from fetchOwnerData saga:", response.data);
    yield put({ type: "SET_OWNERS", payload: response.data });
  } catch (error) {
    console.log("error in fetchOwnerData saga:", error);
  }
}

//made changes here, added this query stringify thingy to the payload and it worked
//added an import at the top of the page too
function* addNewOwner(action) {
  try {
    console.log("in addNewOwner saga");
    console.log('newOwner saga', action.payload)
    yield axios.post("/owners", querystring.stringify(action.payload));
    yield put({ type: "FETCH_OWNER_DATA" });
  } catch (error) {
    console.log("error in addNewOwner saga:", error);
  }
}

function* deleteOwner(action) {
  try {
    console.log("in deleteOwner saga");
    yield axios.delete(`/owners/${action.payload}`);
    yield put({ type: "FETCH_OWNER_DATA" });
  } catch (error) {
    console.log("error in deleteOwner saga:", error);
  }
}

// DASHBOARD SAGAS

// GET PETS FROM DATABASE
function* fetchPets() {
  try {
    console.log("in fetchPets saga");
    const response = yield axios.get("/dashboard");
    console.log("test data from fetchPets saga:", response.data);
    yield put({ type: "SET_PETS", payload: response.data });
  } catch (error) {
    console.log("error in fetchPets saga:", error);
  }
}

// POST PET TO DATABASE
function* postPet(action) {
  try {
    console.log("postPet started with action:", action);
    const newPet = action.payload;
    yield axios.post("/dashboard", querystring.stringify(newPet));
    yield put({ type: "FETCH_PETS" });
  } catch (error) {
    console.log("error in postPet function", error);
  }
}

// DELETE PET FROM DATABASE
function* deletePet(action) {
  try {
    const petID = action.payload.id;
    console.log('removing pet with id:', petID);
    yield axios.delete(`/dashboard/${petID}`);
    yield put({type: 'FETCH_PETS'});
} catch (err) {
    console.log(`error in removing pet: ${err}`);
}
}

// UPDATE CHECKED IN
function* updateCheckIn(action) {
  try {
      yield axios.put(`/dashboard/${action.payload}`);
      yield put({ type: "FETCH_PETS"});
    } catch (err) {
      console.log(`error in update checked-in: ${err}`);
    }
}

//test reducer

const testReducer = (state = "", action) => {
  if (action.type === "RUN_TEST") {
    console.log("in testReducer with:", action.payload);
    return action.payload;
  } else {
    return state;
  }
};

//owner reducer

const ownerReducer = (state = [], action) => {
  if (action.type === "SET_OWNERS") {
    console.log("in ownerReducer with:", action.payload);
    return action.payload;
  } else {
    return state;
  }
};

//pet reducer

const petReducer = (state = [], action) => {
  if (action.type === "SET_PETS") {
    console.log("in petReducer with:", action.payload);
    return action.payload;
  } else {
    return state;
  }
};

//store for reducers
const storeInstance = createStore(
  combineReducers({
    testReducer,
    ownerReducer,
    petReducer
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
