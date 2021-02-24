import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import {takeEvery, put} from 'redux-saga/effects'


const sagaMiddleware = createSagaMiddleware();

//root saga holding all sagas
function* rootSaga() {
  // YOUR CODE HERE
  yield takeEvery('FETCH_OWNER_DATA', fetchOwnerData);
  yield takeEvery('ADD_NEW_OWNER', addNewOwner);
  yield takeEvery('DELETE_OWNER', deleteOwner);
}

//test saga
function* getTest(){
  try{
    console.log('in getTest saga')
    const response = yield axios.get('/test');
    console.log('test data from getTest saga:', response.data)
  }catch(error){
    console.log('error in getTest saga:', error)
  }
}

function* fetchOwnerData() {
  try{
    console.log('in fetchOwnerData saga')
    const response = yield axios.get('/owners');
    console.log('test data from fetchOwnerData saga:', response.data)
    yield put({ type: 'SET_OWNERS', payload: response.data})
  }catch(error){
    console.log('error in fetchOwnerData saga:', error)
  }
}

function* addNewOwner(action){
  try{
    console.log('in addNewOwner saga')
    yield axios.post('/owners', action.payload);
  }catch(error){
    console.log('error in addNewOwner saga:', error)
  }
}

function* deleteOwner(action){
  try{
    console.log('in deleteOwner saga')
    yield axios.delete(`/owners/${action.payload}`);
    yield put({ type: 'FETCH_OWNER_DATA'});
  }catch(error){
    console.log('error in deleteOwner saga:', error)
  }
}



//test reducer
const testReducer = (state = '', action) => {
  if(action.type === 'RUN_TEST'){
      console.log('in testReducer with:', action.payload)
      return action.payload;
  }
  else{
      return state;
  }
}

const ownerReducer = (state = [], action) => {
  if(action.type === 'SET_OWNERS'){
      console.log('in ownerReducer with:', action.payload)
      return action.payload;
  }
  else{
      return state;
  }
}

//store for reducers
const storeInstance = createStore(
  combineReducers({
    testReducer,
    ownerReducer
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);



ReactDOM.render(
  <Provider store={storeInstance}><App /></Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
