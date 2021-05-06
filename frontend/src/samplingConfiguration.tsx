import React, {useEffect, useState} from "react"
import {useHistory, useParams} from "react-router-dom"
import {useDispatch} from "react-redux"


import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import findCurrentData from "./selectors"

import {setCurrentDataSource, setCurrentSample} from "./sampleSlice"
import {classNames, CONTROL_KEYS, Spinner, toFixedTrunc} from "./utils";
import {createSample, getDatasource, getScoreBoundaries} from "./api";

const {Range} = Slider

export default function SamplingConfiguration() {

    let {datasourceId, sampleId} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    let [count, setCount] = useState(300)
    let [minScore, setMinScore] = useState(0)
    let [maxScore, setMaxScore] = useState(10)
    let [loading, setLoading] = useState('')


    let {currentDatasource} = findCurrentData({datasourceId, sampleId})

    useEffect(() => {


        if (!currentDatasource) {
            setLoading("Chargement de la source de donnée")
            getDatasource(datasourceId).then((response) => {

                dispatch(setCurrentDataSource(response.data))
                dispatch(setCurrentSample(null))
                setLoading('')

            }).catch((error) => {

                if (error.response.status === 404) {
                    history.push("/nodatasource/")
                }
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
            })
        }


    }, [datasourceId, maxScore])


    let allowedMaxScore = 5

    const updateMinScore = (score) => {
        const cleanScore = parseFloat(score.replace(',', '.').replace(/[^\d.]/g, ''))
        if (isNaN(cleanScore)) {
            setMinScore('')
            return
        }

        if (cleanScore <= maxScore) {
            setMinScore(toFixedTrunc(cleanScore, 2))
        }

    }


    const updateMaxScore = (score) => {
        const cleanScore = parseFloat(score.replace(',', '.').replace(/[^\d.]/g, ''))

        if (isNaN(cleanScore)) {
            setMaxScore('')
            return
        }

        if (cleanScore <= allowedMaxScore && cleanScore >= minScore) {
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
        setLoading("Echantillonnage en cours")
        createSample(currentDatasource.id, count, minScore, maxScore).then((response) => {
                history.push(`/datasources/${currentDatasource.id}/samples/${response.data.sample_id}`)
            }
        ).catch((error) => {
            console.log(error)
            alert('Une erreur est survenue');
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
                                    <span className="flex-initial mr-8 text-gray-400">0</span>
                                    <span className="flex-1">
                    <Slider min={0} max={300} step={50} value={count} onChange={setCount}/>
                    </span>
                                    <span className="flex-initial ml-8 text-gray-400">300</span>


                                </div>

                                <div className="text-xl mb-4 flex items-center">

                    <span className="flex-initial w-1/4 ">
                    <label className="text-xl  w-44" htmlFor="minscore">Score min: &nbsp;&nbsp;</label>

                    <input type="number" name="minscore" value={minScore} max={maxScore} min={0}
                           onChange={(e) => updateMinScore(e.target.value)}
                           onKeyDown={enforceFloat}
                           className={classNames(minScore !== '' ? '' : "border-red-300 focus:border-red-300 border-4 focus:border-4",
                               "w-20 mx-8 text-right")}
                    />

                    </span>

                                    <span className="flex-initial w-1/4 ">


                    <label className="text-xl " htmlFor="maxscore">Score max:</label>

                    <input type="number" name="maxscore" value={maxScore} max={allowedMaxScore} min={0}
                           onChange={(e) => updateMaxScore(e.target.value)}
                           onKeyDown={enforceFloat}
                           className={classNames(maxScore !== '' ? '' : "border-red-300 focus:border-red-300 border-4 focus:border-4",
                               "w-20 mx-8 text-right")}
                    />

                    </span>
                                    <span className="flex-initial mr-4 text-gray-400">{minScore}</span>
                                    <span className="flex-1">
                    <Range min={minScore * 100} max={maxScore * 100} allowCross={false} step={10}
                           value={[minScore * 100, maxScore * 100]}
                           onChange={([min, max]) => [setMinScore(min / 100), setMaxScore(max / 100)]}/>
                    </span>
                                    <span className="flex-initial ml-8 text-gray-400">{maxScore}</span>

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
                    </form>
                </main>
            </>
            : <Spinner msg={loading}/>
    }</>


}
