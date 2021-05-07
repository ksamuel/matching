import React, {Fragment, useState} from "react";
import {Transition} from "@headlessui/react";
import {XCircleIcon} from "@heroicons/react/outline";
import {XIcon} from "@heroicons/react/solid";

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export function* zip(arr1, arr2, fill = '') {
    while (arr1[i] || arr2[i]) {
        yield [arr1[i] || fill, arr2[i++] || fill]
    }
}

export const CONTROL_KEYS = [
    'Backspace',
    'Tab',
    'Enter',
    'Shift',
    'Control',
    'Alt',
    'CapsLock',
    'Escape',
    'PageUp',
    'PageDown',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'Delete'
]

export function toFixedTrunc(x, n) {
    const v = (typeof x === 'string' ? x : x.toString()).split('.');
    if (n <= 0) return v[0];
    let f = v[1] || '';
    if (f.length > n) return `${v[0]}.${f.substr(0, n)}`;
    while (f.length < n) f += '0';
    return parseFloat(`${v[0]}.${f}`)
}

export function Spinner({msg}) {


    return <div className="flex h-screen justify-center items-center flex-col">
        <h1 className="text-center my-20 text-4xl font-extrabold text-gray-600 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {msg}
        </h1>
        <div
            className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>

    </div>;
}

export function ErrorNotification({msg}) {
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
