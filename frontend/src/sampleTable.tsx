import React, {useEffect, useState} from "react"
import {useHistory, useParams} from "react-router-dom"
import {useDispatch} from "react-redux";


import findCurrentData from "./selectors"

import {setCurrentDataSource, setCurrentSample} from "./sampleSlice"

import {classNames, zip} from "./utils";

import axios from "axios";


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


function TripleButton({value, onChange}) {

    let [status, setStatus] = useState(value)

    const onClick = (status) => {
        return (e) => {
            setStatus(status)
            onChange(status, e)
        }
    }

    return (
        <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
          onClick={onClick("ok")}
          type="button"
          className={classNames(status === "ok" ? "bg-green-200" : "hover:bg-gray-200",
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
        className={classNames(status === "nok" ? "bg-red-200" : "hover:bg-gray-200",
            "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300",
            "bg-white text-sm font-medium text-gray-700  focus:z-10",
            "focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500")}
    >
		NOK
	</button>
	<button
        onClick={onClick("?")}
        type="button"
        className={classNames(status === "?" ? "bg-yellow-200" : "hover:bg-gray-200",
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

    let [data, setData] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(`/api/v1/sample/${sampleId}/`)
                setData(response.data)
            } catch (e) {
                alert('Erreur réseau, veuillez recommancer.')
            }
        })()
    }, [sampleId])


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


    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    {data ?
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    {(data[0].pairs).map((pair) => {
                                        return <th key={pair.name}
                                                   scope="col"
                                                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {pair.name}
                                        </th>
                                    })}

                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Score
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>

                                </tr>
                                </thead>
                                <tbody>
                                {data.map((match, matchIdx) => (
                                    <tr key={match.id} className={matchIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>

                                        {(match.pairs.map((pair) => {
                                            let [first, second] = pair.values
                                            return <td key={pair.name}
                                                       className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{first}{pair.values.length === 2 ?
                                                <br/> : ''}{second}</td>
                                        }))}

                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-500">{match.score}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <TripleButton value={match.status}/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div> : <Spinner/>}
                </div>
            </div>
        </div>
    )
}
