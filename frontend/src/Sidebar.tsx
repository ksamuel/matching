import { useDispatch, useSelector } from "react-redux"

import React, { useEffect, useState } from "react"
import logo from "./logo.png"
import MenuEntry from "./menuEntry"

import { Link, useHistory } from "react-router-dom"
import { getAllDatasources, signOutUser } from "./api"
import { setDatasources } from "./sampleSlice"

import { ErrorNotification } from "./utils"

export default function Sidebar() {

    const history = useHistory()
    const [errorMsg, setErrorMsg] = useState('')

    // if the user is not connected, redirect to login

    if (document.cookie.indexOf("sessionid") === -1) {
        history.push('/login/')
    }

    const dispatch = useDispatch()
    useEffect(() => {
        getAllDatasources().then((response) => dispatch(setDatasources(response.data)))
    }, [])

    const { currentDatasource, currentSample, datasources } = useSelector(state => ({
        ...
        state.samples
    }))

    const logout = () => {
        signOutUser().then((response) => {

            history.push('/login/')
        }).catch((error) => {
            setErrorMsg('Une erreur inconnue est survenue')
        })
    }

    return (
        <div className="flex flex-col  border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto  w-64">

            <div className="flex items-center flex-shrink-0 px-4 ">
                <Link to="/"><img className="w-auto" src={logo} alt="Workflow" /></Link>
            </div>

            <div className="mt-5 flex-grow flex flex-col">
                <Link to="/"
                    className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 mb-4">Nouveau
                    fichier</Link>
                <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
                    {datasources.map((ds) => <MenuEntry datasource={ds} currentDatasource={currentDatasource}
                        currentSample={currentSample} key={ds.name} />)}
                </nav>

            </div>

            <div className="flex-shrink-0 f  p-4">
                <button
                    onClick={logout}

                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Se déconnecter
                </button>
            </div>
            {errorMsg && <ErrorNotification msg={errorMsg} />}
        </div>
    )
}
