import {Disclosure} from "@headlessui/react";
import React from "react";
import {classNames} from "./utils";

import {


	Link, useHistory
} from "react-router-dom";

export default function MenuEntry({datasource, currentDatasource, currentSample}) {

	const history = useHistory()
	const hasSamples = datasource.samples.length > 0
	const isCurrentDatasource = currentDatasource && datasource.id === currentDatasource.id

	return <div onClick={() => history.push(`/datasource/${datasource.id}/`)}>

		<Disclosure as="div" className="space-y-1">

			<Disclosure.Button className={classNames(
				isCurrentDatasource
					? 'bg-gray-100 text-gray-900  untruncate'
					: 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900  truncate',
				hasSamples ? '' : 'pl-2',
				' group w-full flex items-center pr-2 py-2 text-sm font-medium rounded-md  hover:untruncate  focus:outline-none focus:ring-2 focus:ring-indigo-500'
			)}>
				{hasSamples && <span>
								<svg className={classNames(
									isCurrentDatasource ? 'text-gray-400 rotate-90' : 'text-gray-300',
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
			{hasSamples && isCurrentDatasource && <Disclosure.Panel className="space-y-1" static>
				{datasource.samples.map((sample) => (
					<Link key={sample.name}
								onClick={e => e.stopPropagation()}
								to={`/datasource/${datasource.id}/sample/${sample.id}/`}
								className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
						{sample.name}
					</Link>
				))}
			</Disclosure.Panel>
			}

		</Disclosure>

	</div>

}
