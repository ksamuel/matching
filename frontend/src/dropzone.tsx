import React, {Fragment, useState} from "react"
import {useDropzone} from "react-dropzone"
import axios from "axios"

import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import {voidDataSource} from "./sampleSlice"
import {Transition} from '@headlessui/react'
import {XCircleIcon} from '@heroicons/react/outline'
import {XIcon} from '@heroicons/react/solid'

function Error({msg}) {
    const [show, setShow] = useState(true)

    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">

                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true"/>
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-lg font-medium text-gray-900">Il y a un problème</p>
                                        <p className="mt-1 text-lg text-gray-500">{msg}</p>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex">
                                        <button
                                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => {
                                                setShow(false)
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="h-5 w-5" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}


export default function Dropzone() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [errorMsg, setErrorMsg] = useState('')
    dispatch(voidDataSource())

    const {getRootProps, getInputProps, open, acceptedFiles, fileRejections} = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: ['application/xml', 'text/xml'],
        onDropAccepted: (files) => {
            setErrorMsg('')
            var formData = new FormData();
            formData.append("xml", files[0]);

            axios.post('/upload_file/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                history.push(`/datasource/${response.data}`)
            }).catch((error) => {
                setErrorMsg(error.response.data)
            })

        }
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));


    const fileRejectionItems = fileRejections.map(({file, errors}) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));


    return <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex={0}>
        <h1 className="text-center my-20 text-4xl font-extrabold text-gray-600 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Nouveau fichier
        </h1>
        <div className="py-6">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                    <div {...getRootProps({className: 'dropzone'})}
                         className="p-4 flex flex items-center justify-center flex-col border-4 border-dashed border-gray-200rounded-lg h-96 bg-white">


                        <input {...getInputProps()} />

                        <h2 className="my-4 text-2xl font-extrabold tracking-tight sm:text-1xl lg:text-1xl text-gray-600 pb-5 ">
                            Glissez-déposez un fichier XML ici ou ... </h2>

                        <p className="">


                            <button type="button" onClick={open}
                                    className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl">
                                Choisissez un fichier en cliquant ici
                                {/* Heroicon name: solid/upload */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 -mr-1 h-5 w-5" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                </svg>

                            </button>


                        </p>

                    </div>

                    {errorMsg && <Error msg={errorMsg}/>}

                    {/*<aside>*/}
                    {/*    <h4>Files</h4>*/}
                    {/*    <ul>{files}</ul>*/}
                    {/*    <p>{uri}</p>*/}
                    {/*    <h4>Rejected files</h4>*/}
                    {/*    <ul>{fileRejectionItems}</ul>*/}
                    {/*</aside>*/}
                </div>
                {/* /End replace */}
            </div>
        </div>
    </main>
}
