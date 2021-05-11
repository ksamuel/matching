import {Disclosure} from "@headlessui/react";
import React from "react";
import {classNames} from "./utils";

import {Link, useHistory} from "react-router-dom";
import dayjs from "dayjs";


export default function MenuEntry({datasource, currentDatasource, currentSample}) {

    const history = useHistory()
    const hasSamples = datasource.samples.length > 0
    const isCurrentDatasource = currentDatasource && datasource.id === currentDatasource.id

    return <div onClick={() => history.push(`/datasources/${datasource.id}/`)}>

        <Disclosure as="div" className="space-y-1">

            <Disclosure.Button className={classNames(
                isCurrentDatasource
                    ? 'bg-blue-100 text-blue-900  untruncate'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-900  truncate',
                hasSamples ? '' : 'pl-2',
                ' group w-full flex items-center pr-2 py-2 text-m font-medium rounded-md  hover:untruncate  focus:outline-none focus:ring-2 focus:ring-indigo-500'
            )}>
                {hasSamples && <span>
								<svg className={classNames(
                                    isCurrentDatasource ? 'text-blue-400 rotate-90' : 'text-gray-300',
                                    'mr-2 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150 ')}
                                     viewBox="0 0 20 20"
                                     aria-hidden="true">
								<path d="M6 6L14 10L6 14V6Z" fill="currentColor"/>
								</svg>
							</span>
                }
                <span
                    className={classNames(isCurrentDatasource ? "untruncate" : "truncate", "hover:untruncate hover:text-over break-all max-w-full block ")}>
					{datasource.name}
				</span>
            </Disclosure.Button>

            {/* ACCORDIONS CHILDREN CONTAINING THE SAMPLE PARAMS */}
            {isCurrentDatasource && <Disclosure.Panel className="space-y-1" static>
                {datasource.samples.map((sample) => (
                    <Link key={sample.id}
                          onClick={e => e.stopPropagation()}
                          to={`/datasources/${datasource.id}/samples/${sample.id}/`}
                          className={classNames(currentSample && currentSample.id === sample.id ? "border-l-4 border-blue-800  bg-blue-50" : "", "group w-full flex  pl-3 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md  hover:bg-gray-50")}>
                        <ul>
                            <li><span
                                className={"font-black text-gray-800"}>Score:</span> {sample.minScore} - {sample.maxScore}
                            </li>
                            <li><span className={"font-black text-gray-800"}>Paires:</span> {sample.count}</li>
                            <li><span
                                className={"font-black text-gray-800"}>Date:</span> {dayjs(sample.date).format('HH:mm:ss DD/MM/YYYY')}
                            </li>
                            <li className="text-xs text-gray-400">Expire: {dayjs(sample.expireDate).fromNow()} </li>
                        </ul>
                    </Link>
                ))}
                <span className="flex flex-row-reverse">
                                <Link className="text-center text-xs italic underline text-gray-500 m-2"
                                      to={`/datasources/${datasource.id}/`}>Ajouter</Link>
                                </span>
            </Disclosure.Panel>

            }


        </Disclosure>

    </div>

}
