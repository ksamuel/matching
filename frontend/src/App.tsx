import React, {useEffect} from 'react'
import './index.css'

import Layout from "./layout"

import {useDispatch} from "react-redux";
import {setDatasources} from "./sampleSlice";
import {getDatasources} from "./api";


function App() {

    const dispatch = useDispatch()
    useEffect(() => {
        getDatasources().then((response) => dispatch(setDatasources(response.data)))
    }, [])


    return (

        <div className="App">

            <header className="App-header">
                <Layout/>
            </header>

        </div>

    )
}

export default App
