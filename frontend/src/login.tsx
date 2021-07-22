
import React, { useState } from "react"

import { useHistory } from "react-router-dom"

import { signInUser } from "./api"
import { ErrorNotification, Spinner } from "./utils"

export default function Login() {

    const history = useHistory()
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState('')
    const [email, setEmail] = useState('')

    // if the user is connected, redirect to home
    if (document.cookie.indexOf("sessionid") !== -1) {
        history.push('/')
    }


    const requestSignIn = (e) => {
        e.preventDefault()
        setLoading('Connexion en cours')

        signInUser(email, password).then((response) => {

            history.push('/')
        }).catch((error) => {

            setLoading('')
            if (error.response.status === 400) {
                setErrorMsg('Email ou mot de passe incorrect')
            } else {
                setErrorMsg('Une erreur inconnue est survenue')
            }
        })

    }

    return (loading === "" ? <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">

            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Veuillez vous connecter</h2>

        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" action="." method="POST" onSubmit={requestSignIn}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Adresse email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mot de passe
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button

                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Se connecter
                        </button>
                    </div>
                </form>

            </div>
        </div>
        {errorMsg && <ErrorNotification msg={errorMsg} />}
    </div > : <Spinner msg={loading} />)

}
