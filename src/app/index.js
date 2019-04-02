import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import store from './store.js';
import App from './App';

document.body.style.backgroundColor = "#ecedee";
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
