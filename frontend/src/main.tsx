import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import {
    BrowserRouter as Router,
} from "react-router-dom";

import { Provider } from 'react-redux'

import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

import Layout from "./layout"

import { BASE_URL } from "./utils"

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
            <Router basename={BASE_URL}>
                <Layout />
            </Router>
        </Provider>,
    </React.StrictMode>,
    document.getElementById('root')
)
