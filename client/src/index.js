import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers'; 
import Routes from './routes';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

ReactDOM.render(

        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </Provider>

    ,document.getElementById('root'));
