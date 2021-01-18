import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import burgerBuilderReducer from './store/reducers/burger-builder';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { orderSaga, watchAuthSaga, watchBurgerBuilderSaga } from './store/sagas/index'

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));
sagaMiddleware.run(watchAuthSaga);
sagaMiddleware.run(watchBurgerBuilderSaga);
sagaMiddleware.run(orderSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
