import React, {useEffect, useState} from "react"
import {useHistory, useParams} from "react-router-dom"
import {useDispatch} from "react-redux"


import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import findCurrentData from "./selectors"

import {addSampleToDataSource, setCurrentDataSource, setCurrentSample} from "./sampleSlice"
import {classNames, CONTROL_KEYS, ErrorNotification, Spinner, toFixedTrunc} from "./utils";
import {createSample, getDatasource, getScoreBoundaries} from "./api";

const {Range} = Slider

export default function SamplingConfiguration() {

    const {datasourceId, sampleId} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const [count, setCount] = useState(300)
    const [minScore, setMinScore] = useState(0)
    const [maxScore, setMaxScore] = useState(10)
    const [loading, setLoading] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const [maxScoreBoundary, setMaxScoreBoundary] = useState(10)
    const [minScoreBoundary, setMinScoreBoundary] = useState(10)

    const {currentDatasource} = findCurrentData({datasourceId, sampleId})

    useEffect(() => {


        if (!currentDatasource) {
            setLoading("Chargement de la source de donnée")
            getDatasource(datasourceId).then((response) => {
                dispatch(setCurrentDataSource(response.data))
                dispatch(setCurrentSample(null))

            }).catch((error) => {
                if (error.response.status === 404) {
                    history.push("/nodatasource/")
                }
                setErrorMsg(error.response.data)
            }).finally(() => {
                setLoading('')
            })


        } else {

            dispatch(setCurrentDataSource(currentDatasource))
            dispatch(setCurrentSample(null))
            setLoading('')
        }
        if (!minScore) {
            getScoreBoundaries(datasourceId).then((response) => {
                setMinScore(response.data.min)
                setMaxScore(response.data.max)
                setMinScoreBoundary(response.data.min)
                setMaxScoreBoundary(response.data.max)
            })
        }


    }, [sampleId, currentDatasource, maxScore])


    const updateMinScore = (score) => {
        const cleanScore = parseFloat(score.replace(',', '.').replace(/[^\d.]/g, ''))
        if (isNaN(cleanScore)) {
            setMinScore('')
            return
        }

        if (cleanScore <= maxScore && cleanScore > minScoreBoundary) {
            setMinScore(toFixedTrunc(cleanScore, 2))
        }

    }


    const updateMaxScore = (score) => {
        const cleanScore = parseFloat(score.replace(',', '.').replace(/[^\d.]/g, ''))

        if (isNaN(cleanScore)) {
            setMaxScore('')
            return
        }

        if (cleanScore <= maxScoreBoundary && cleanScore >= minScore) {
            setMaxScore(toFixedTrunc(cleanScore, 2))
        }
    }


    const updateCount = (count) => {
        const cleanCount = parseInt(count.replace(/\D/g, ''))
        if (isNaN(cleanCount)) {
            setCount('')
            return
        }
        if (cleanCount <= 300) {
            setCount(cleanCount)
        }
    }

    const enforceInteger = (e) => {
        const key = e.key
        if (CONTROL_KEYS.includes(key) || key.match(/\d/) || e.ctrlKey || e.altKey || e.metaKey) {
            return
        }
        e.preventDefault()
    }

    const enforceFloat = (e) => {
        const key = e.key
        if (CONTROL_KEYS.includes(key) || key.match(/[\d.,]/) || e.ctrlKey || e.altKey || e.metaKey) {
            return
        }
        e.preventDefault()
    }


    const requestSample = () => {
        setErrorMsg('')
        setLoading("Echantillonnage en cours")

        createSample(currentDatasource.id, count, minScore, maxScore).then((response) => {
                console.log(response.data)
                dispatch(addSampleToDataSource(response.data))
                history.push(`/datasources/${currentDatasource.id}/samples/${response.data.id}`)
            }
        ).catch((error) => {
            if (error.response.data.detail) {
                setErrorMsg(error.response.data.detail)
            } else {
                setErrorMsg('Une erreur inconnue est survenue')
                console.error(error)
            }

        }).finally(() => {
            setLoading('')
        })

    }


    return <>{
        currentDatasource && loading === '' ? <>
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">Nouvel échantillon</h1>
                        <p> {currentDatasource.name}</p>
                    </div>
                </header>
                <main>

                    {typeof minScore != typeof 1 ?
                        <div className={"p-4 flex flex items-center justify-center flex-col"}><h2
                            className="my-4 text-2xl font-extrabold tracking-tight sm:text-1xl lg:text-1xl text-gray-600 pb-5 ">
                            Il n'y a plus de paires à annoter </h2></div> :

                        <form action='' onSubmit={(e) => {

                            e.preventDefault();
                            requestSample()
                        }}>
                            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                                <div className="px-4 py-6 sm:px-0">

                                    <div className="text-xl mb-4 flex items-center">

                    <span className="flex-initial w-1/2 ">
                    <span className="text-xl "><label
                        className="text-xl "
                        htmlFor="count">Cardinalité: </label></span>

                    <span>
                    <input type="number" name="count" value={count} max={1000} min={0}
                           onChange={(e) => updateCount(e.target.value)}
                           onKeyDown={enforceInteger}
                           className={classNames(count !== '' ? '' : "border-red-300 focus:border-red-300 border-4 focus:border-4",
                               "w-20 mx-8 text-right")}
                    />
                    </span>
                    </span>
                                        <span className="flex-initial mr-8 text-gray-300">0</span>
                                        <span className="flex-1">
                    <Slider min={0} max={300} step={1} value={count} onChange={setCount}/>
                    </span>
                                        <span className="flex-initial ml-8 text-gray-300">300</span>


                                    </div>

                                    <div className="text-xl mb-4 flex items-center">

                    <span className="flex-initial w-1/4 ">
                    <label className="text-xl  w-44" htmlFor="minscore">Score min: &nbsp;&nbsp;</label>

                    <input type="number" name="minscore" value={minScore} max={maxScore} min={minScoreBoundary}
                           onChange={(e) => updateMinScore(e.target.value)}
                           onKeyDown={enforceFloat}
                           className={classNames(minScore !== '' ? '' : "border-red-300 focus:border-red-300 border-4 focus:border-4",
                               "w-20 mx-8 text-right")}
                    />

                    </span>

                                        <span className="flex-initial w-1/4 ">


                    <label className="text-xl " htmlFor="maxscore">Score max:</label>

                    <input type="number" name="maxscore" value={maxScore} max={maxScoreBoundary} min={minScore}
                           onChange={(e) => updateMaxScore(e.target.value)}
                           onKeyDown={enforceFloat}
                           className={classNames(maxScore !== '' ? '' : "border-red-300 focus:border-red-300 border-4 focus:border-4",
                               "w-20 mx-8 text-right")}
                    />

                    </span>
                                        <span className="flex-initial mr-4 text-gray-300">{minScoreBoundary}</span>
                                        <span className="flex-1">
                    <Range min={minScoreBoundary * 100} max={maxScoreBoundary * 100} allowCross={false} step={1}
                           value={[minScore * 100, maxScore * 100]}
                           onChange={([min, max]) => [setMinScore(min / 100), setMaxScore(max / 100)]}/>
                    </span>
                                        <span className="flex-initial ml-8 text-gray-300">{maxScoreBoundary}</span>

                                    </div>

                                    <div className="flex justify-center">


                                        <button type="button" onClick={(e) => {

                                            e.preventDefault();
                                            requestSample()
                                        }}
                                                disabled={count === '' || maxScore === '' || minScore === ''}
                                                className="disabled:opacity-30  m-8 inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl">
                                            Lancer l'échantillonnage
                                        </button>


                                    </div>

                                </div>

                            </div>
                        </form>}
                </main>
            </>
            : <Spinner msg={loading}/>}

        {errorMsg && <ErrorNotification msg={errorMsg}/>}
    </>


}
