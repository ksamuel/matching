import React, {useEffect, useState} from "react"
import {
	useHistory,
	useParams
} from "react-router-dom"
import {useDispatch} from "react-redux";


import findCurrentData from "./selectors"

import {setCurrentDataSource, setCurrentSample} from "./sampleSlice"

import {classNames, zip} from "./utils";

function StringComparison({first, second}) {

	if (!second) {
		return <span>{first}<br/>...</span>
	}

	if (!first) {
		return <span>...<br/>{second}</span>
	}

	zip(Array.from(first), Array.from(second), fill = ' ').map((a, b) => {
		
	})
}


function TripleButton({initialValue, onChange}) {

	let [value, setValue] = useState(initialValue)

	const onClick = (value) => {
		return (e) => {
			setValue(value)
			onChange(value, e)
		}
	}

	return (
		<span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
				onClick={onClick("ok")}
				type="button"
				className={classNames(value === "ok" ? "bg-green-200" : "hover:bg-gray-200",
					"relative inline-flex items-center px-4 py-2",
					"rounded-l-md border border-gray-300 bg-white border-gray-300",
					"text-sm font-medium text-gray-700  focus:z-10",
					"focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500")}
			>
        OK
      </button>
	<button
		onClick={onClick("nok")}
		type="button"
		className={classNames(value === "nok" ? "bg-red-200" : "hover:bg-gray-200",
			"-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300",
			"bg-white text-sm font-medium text-gray-700  focus:z-10",
			"focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500")}
	>
		NOK
	</button>
	<button
		onClick={onClick("?")}
		type="button"
		className={classNames(value === "?" ? "bg-yellow-200" : "hover:bg-gray-200",
			"-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border",
			"border-gray-300 bg-white text-sm font-medium text-gray-700  focus:z-10",
			"focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500")}
	>
		?
	</button>
</span>
	)

}

export default function SampleTable() {

	let {datasourceId, sampleId} = useParams()
	let {currentDatasource, currentSample} = findCurrentData({datasourceId, sampleId})
	const history = useHistory()
	const dispatch = useDispatch()


	useEffect(() => {
			if (!currentSample) {
				history.push("/nosample/")
			} else {
				dispatch(setCurrentDataSource(currentDatasource))
				dispatch(setCurrentSample(currentSample))
			}

		}, [currentSample]
	)


	const people = [
		{name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com'},
		{name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com'},
		// More people...
	]


	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Name
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Title
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Email
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Role
								</th>
								<th scope="col" className="relative px-6 py-3">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
							</thead>
							<tbody>
							{people.map((person, personIdx) => (
								<tr key={person.email} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.name}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.title}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.email}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.role}</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<TripleButton/>
									</td>
								</tr>
							))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
