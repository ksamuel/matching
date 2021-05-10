import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {
    BrowserRouter as Router,
} from "react-router-dom";

import {Provider} from 'react-redux'

import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

import dayjs from 'dayjs'

import store from './store'

dayjs.extend(relativeTime)

dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
    relativeTime: {
        future: "dans %s",
        past: "il y a %s",
        s: 'quelques secondes',
        m: "une minutes",
        mm: "%d minutes",
        h: "une heure",
        hh: "%d heures",
        d: "un jour",
        dd: "%d jours",
        M: "un mois",
        MM: "%d mois",
        y: "un an",
        yy: "%d ans"
    }
})

ReactDOM.render(
    <React.StrictMode>

        <Provider store={store}>
            <Router><App/></Router>
        </Provider>,
    </React.StrictMode>,
    document.getElementById('root')
)