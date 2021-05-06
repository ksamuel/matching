import {useDispatch, useSelector} from "react-redux"

import React, {useEffect} from "react"
import logo from "./logo.png"
import MenuEntry from "./menuEntry"

import {Link} from "react-router-dom"
import {getAllDatasources} from "./api"
import {setDatasources} from "./sampleSlice"

export default function Sidebar() {

    const dispatch = useDispatch()
    useEffect(() => {
        getAllDatasources().then((response) => dispatch(setDatasources(response.data)))
    }, [])

    const {currentDatasource, currentSample, datasources} = useSelector(state => ({
        ...
            state.samples
    }))


    return (
        <div className="flex flex-col  border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto  w-64">

            <div className="flex items-center flex-shrink-0 px-4 ">
                <Link to="/"><img className="w-auto" src={logo} alt="Workflow"/></Link>
            </div>

            <div className="mt-5 flex-grow flex flex-col">
                <Link to="/"
                      className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 mb-4">Nouveau
                    fichier</Link>
                <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
                    {datasources.map((ds) => <MenuEntry datasource={ds} currentDatasource={currentDatasource}
                                                        currentSample={currentSample} key={ds.name}/>)}
                </nav>

            </div>
        </div>
    )
}

