import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";

import './index.css';

import {App} from './App';
import {ApplicationRouter} from "./hoc";
import {setupStore} from "./redux";

const store = setupStore();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <ApplicationRouter>
            <App/>
        </ApplicationRouter>
    </Provider>
);


