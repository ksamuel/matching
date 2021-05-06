import React from "react";

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
