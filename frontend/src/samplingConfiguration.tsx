import React, {useEffect, useState} from "react"
import {
    useHistory,
    useParams
} from "react-router-dom"
import {useDispatch} from "react-redux"


import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import findCurrentData from "./selectors"

import {setCurrentDataSource, setCurrentSample} from "./sampleSlice"
import {classNames, CONTROL_KEYS, toFixedTrunc} from "./utils";

const {Range} = Slider

export default function SamplingConfiguration() {

    let {datasourceId, sampleId} = useParams()
    let {currentDatasource} = findCurrentData({datasourceId, sampleId})
    let [count, setCount] = useState(500)
    let [minScore, setMinScore] = useState(2)
    let [maxScore, setMaxScore] = useState(3.2)

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
            console.log(score, toFixedTrunc(cleanScore, 2))
            setMaxScore(toFixedTrunc(cleanScore, 2))
        }
    }


    const updateCount = (count) => {
        const cleanCount = parseInt(count.replace(/\D/g, ''))
        if (isNaN(cleanCount)) {
            setCount('')
            return
        }
        if (cleanCount <= 1000) {
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

    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(() => {
            if (!currentDatasource) {
                history.push("/nodatasource/")
            } else {
                dispatch(setCurrentDataSource(currentDatasource))
                dispatch(setCurrentSample(null))
            }

        }, [currentDatasource]
    )


    return <>
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">Nouvel échantillon</h1>
                <p> {currentDatasource.name}</p>
            </div>
        </header>
        <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Replace with your content */}
                <div className="px-4 py-6 sm:px-0">

                    <div className="text-xl mb-4 flex items-center">

						<span className="flex-initial w-2/5 ">
							<span className="text-xl w-64"><label
                                className="text-xl "
                                htmlFor="count">Cardinalité: </label></span>

							<span>
							<input type="number" name="count" value={count} max={1000} min={0}
                                   onChange={(e) => updateCount(e.target.value)}
                                   onKeyDown={enforceInteger}
                                   className={classNames(count !== '' ? '' : "border-red-300 focus:border-red-300 border-4 focus:border-4",
                                       "w-16 mx-8 text-right")}
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

						<span className="flex-initial w-1/5 ">
							<label className="text-xl  w-44" htmlFor="minscore">Score min: &nbsp;&nbsp;</label>

                            <input type="number" name="minscore" value={minScore} max={maxScore} min={0}
                                   onChange={(e) => updateMinScore(e.target.value)}
                                   onKeyDown={enforceFloat}
                                   className={classNames(minScore !== '' ? '' : "border-red-300 focus:border-red-300 border-4 focus:border-4",
                                       "w-16 mx-8 text-right")}
                            />

                            </span>

                        <span className="flex-initial w-1/5 ">


							<label className="text-xl " htmlFor="maxscore">Score max:</label>

                            <input type="number" name="maxscore" value={maxScore} max={allowedMaxScore} min={0}
                                   onChange={(e) => updateMaxScore(e.target.value)}
                                   onKeyDown={enforceFloat}
                                   className={classNames(maxScore !== '' ? '' : "border-red-300 focus:border-red-300 border-4 focus:border-4",
                                       "w-16 mx-8 text-right")}
                            />

						</span>
                        <span className="flex-initial mr-8 text-gray-400">0</span>
                        <span className="flex-1">
							<Range min={0} max={500} allowCross={false} step={10}
                                   value={[minScore * 100, maxScore * 100]}
                                   onChange={([min, max]) => [setMinScore(min / 100), setMaxScore(max / 100)]}/>
						</span>
                        <span className="flex-initial ml-8 text-gray-400">5</span>

                    </div>

                    <div className="flex justify-center">


                        <button type="button"
                                disabled={count === '' || maxScore === '' || minScore === ''}
                                className="disabled:opacity-30  m-8 inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl">
                            Lancer l'échantillonnage
                        </button>


                    </div>

                </div>

            </div>
        </main>
    </>


}
