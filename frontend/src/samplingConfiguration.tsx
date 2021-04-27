import React, {useEffect} from "react"
import {
	useHistory,
	useParams
} from "react-router-dom"
import {useDispatch} from "react-redux";


import findCurrentData from "./selectors"

import {setCurrentDataSource, setCurrentSample} from "./sampleSlice"

export default function SamplingConfiguration() {

	let {datasourceId, sampleId} = useParams()
	let {currentDatasource} = findCurrentData({datasourceId, sampleId})
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


	return <div>{datasourceId}  </div>
}
