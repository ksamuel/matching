import React, {useEffect} from "react"
import {
	useHistory,
	useParams
} from "react-router-dom"
import {useDispatch} from "react-redux";

import findCurrentData from "./selectors"

import {setCurrentDataSource, setCurrentSample} from "./sampleSlice"

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


	return <div>{datasourceId} - {sampleId}</div>
}
