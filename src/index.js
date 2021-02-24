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
  yield takeEvery('GET_TEST', getTest)
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

//store for reducers
const storeInstance = createStore(
  combineReducers({
    testReducer,
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
