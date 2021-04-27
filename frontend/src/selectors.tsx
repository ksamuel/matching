import {useSelector} from "react-redux";

export default function useCurrentData({datasourceId, sampleId}) {
	return useSelector((state) => {

		let currentDatasource = state.samples.datasources.filter((datasource) => {
			return datasource.id === datasourceId
		})[0]

		if (currentDatasource) {
			let currentSample = currentDatasource.samples.filter((sample) => {
				return sample.id === sampleId
			})[0]
			return {currentDatasource, currentSample}
		}

		return {currentDatasource, currentSample: null}

	})
}

