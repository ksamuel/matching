import React, { useEffect, useState, Fragment } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch } from "react-redux";

import findCurrentData from "./selectors"

import { setCurrentDataSource, setCurrentSample } from "./sampleSlice"

import { classNames, ErrorNotification, Spinner, backend } from "./utils";

import { getDatasource, getSampleData, getSampleParams, updatePairStatus } from "./api";

import dayjs from "dayjs";

function TripleButton({ value, onChange }) {

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

    const history = useHistory()
    const dispatch = useDispatch()

    const { datasourceId, sampleId } = useParams()
    const { currentDatasource, currentSample } = findCurrentData({ datasourceId, sampleId })
    let schema;

    const [loading, setLoading] = useState('')
    const [order, setOrder] = useState('')
    const [data, setData] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    // TODO: datasource and datasource DATA are not the same: data[0] is currenttly the data, but it should be the aprams

    useEffect(() => {
        if (!currentDatasource) {
            setLoading("Chargement de la source de donnée")
            getDatasource(datasourceId).then((response) => {
                dispatch(setCurrentDataSource(response.data))

            }).catch((error) => {
                if (error.response.status === 404) {
                    history.push(`/nodatasource/`)
                }
                setErrorMsg(error.response.data)
            })
        }
    }, [datasourceId])

    useEffect(() => {
        (async () => {
            try {
                setLoading("Chargement de l'échantillon")
                setData([])
                const paramResponse = await getSampleParams(sampleId)
                dispatch(setCurrentSample(paramResponse.data))
                dispatch(setCurrentDataSource(currentDatasource))

            } catch (e) {

                if (e.status_code === 404) {
                    history.push(`/nosample/`)
                }

                if (e.response.data.detail) {
                    setErrorMsg(e.response.data.detail)
                } else {
                    setErrorMsg("Une erreur inconnue est survenue")
                    console.error(e)
                }

            }
        })()

    }, [sampleId])

    useEffect(() => {
        if (data.length) {
            setLoading('')
        }
    },
        [sampleId]
    )

    useEffect(() => {
        (async () => {
            try {
                setLoading("Chargement de l'échantillon")
                const dataResponse = await getSampleData(sampleId)
                setData(dataResponse.data)
            } catch (e) {
                if (e.status_code === 404) {
                    history.push(`/nosample/`)
                }
                if (e.response.data.detail) {
                    setErrorMsg(e.response.data.detail)
                } else {
                    setErrorMsg("Une erreur inconnue est survenue")
                    console.error(e)
                }

            } finally {
                setLoading('')
            }
        })()

    }, [sampleId])

    const changePairStatus = (value, pair_id) => {
        updatePairStatus(currentSample.id, pair_id, value)
        setData(data.map((pair) => {
            if (pair.id === pair_id) {
                return { ...pair, status: value }
            }
            return pair
        }))
    }

    const statusOrder = {
        'ok': 3,
        'nok': 2,
        '?': 1,
        null: 0,
    }

    useEffect(() => {
        if (!order) {
            return
        }

        const rank = order == "ascending" ? 1 : -1
        data.sort((pair1, pair2) => {
            const status1 = statusOrder[pair1.status]
            const status2 = statusOrder[pair2.status]
            if (status1 > status2) {
                return rank;
            }
            if (status2 > status1) {
                return -rank;
            }
            return 0;
        });

        setData([...data])

    }, [order])

    if (currentDatasource) {
        schema = currentDatasource['schema']
    }

    return (<> {currentDatasource &&
        <header className="bg-white shadow  ">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl  text-gray-900 truncate mb-2">{currentDatasource.name}
                </h1>
                <p><span
                    className={"font-bold  "}>Paires:</span> {currentSample.count}
                    <span
                        className={"font-bold ml-8"}>Score:</span> {currentSample.minScore} - {currentSample.maxScore}
                    <span
                        className={"font-bold ml-8"}>Date:</span> {dayjs(currentSample.date).format('HH:mm:ss DD/MM/YYYY')}
                    <span
                        className={"text-sm ml-8 text-gray-400"}>Expire: {dayjs(currentSample.expireDate).fromNow()}</span>
                </p>
            </div>

        </header>}
        <main>
            <div className="flex flex-col">

                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        {data.length && loading === "" ?
                            <div
                                className="table-container shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200  ">
                                    <thead className="bg-gray-200  ">
                                        <tr>
                                            {Object.keys(schema).map((field) => {
                                                return <th key={field}
                                                    scope="col"
                                                    colSpan={2}
                                                    className=" px-2 py-3 border border-gray-300 w-8 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    {field}
                                                </th>
                                            })}

                                            <th
                                                scope="col"

                                                className="   border border-gray-300 w-8 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Score
                                            </th>
                                            <th
                                                scope="col"

                                                onClick={() => setOrder(order !== "ascending" ? 'ascending' : 'descending')}
                                                className=" cursor-pointer  border border-gray-300 w-8 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                <span className={"flex align-middle justify-center"}>Status
                                                    {order && <svg className={classNames(
                                                    order === "descending" ? '-rotate-90' : 'rotate-90  ',
                                                    '  h-4 w-4 transform   text-gray-800 transition-colors ease-in-out duration-150 mx-2')}
                                                        viewBox="0 0 20 20"
                                                        aria-hidden="true"

                                                    >
                                                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                                    </svg>}
                                                </span>
                                            </th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        {data.map(({ pairs, score, status, id }, matchIdx) => {

                                            return <tr key={id}
                                                className={matchIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>

                                                {(Object.entries(pairs).map((pair) => {

                                                    const [name, { value1, value2, similarity }] = pair
                                                    const type = schema[name].type
                                                    return <Fragment key={name}>
                                                        <td
                                                            className={classNames(type === "gender" || type === "date" ? "text-center" : "",
                                                                "px-2 border border-gray-300 w-8 whitespace-nowrap text-sm text-gray-500")}
                                                            dangerouslySetInnerHTML={{ __html: value1 + (value2 ? "<br/>" : '') + value2 }}
                                                        ></td>
                                                        <td className=" px-2 w-4 text-center   whitespace-nowrap border border-gray-300   text-sm text-gray-500 ">{similarity}</td>
                                                    </Fragment>
                                                }))}

                                                <td className="px-4 py-4 whitespace-nowrap text-center border border-gray-300 w-8 font-medium text-sm text-gray-500">{score}</td>
                                                <td className="px-2 py-4 whitespace-nowrap text-center text-sm border border-gray-300   font-medium">
                                                    <TripleButton value={status}
                                                        onChange={(value) => changePairStatus(value, id)} />
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div> : <Spinner msg={loading} />}
                    </div>
                </div>
                {
                    errorMsg && <ErrorNotification msg={errorMsg} />
                }
            </div>
        </main>
    </>
    )
}
