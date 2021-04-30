import {createSlice} from '@reduxjs/toolkit'
import {shortMenu} from "./testData";


export const sampleSlice = createSlice({
  name: 'shortMenu',
  initialState: {
    currentDatasource: null,
    currentSample: null,
    datasources: shortMenu,
  },
  reducers: {

    setCurrentDataSource: (state, action) => {
      state.currentDatasource = action.payload
    },
    setCurrentSample: (state, action) => {
      state.currentSample = action.payload
    },
    voidDataSource: (state) => {
      state.currentSample = null
			state.currentDatasource = null
		},
	},

})

// Action creators are generated for each case reducer function
export const {setCurrentDataSource, setCurrentSample, voidDataSource} = sampleSlice.actions

export default sampleSlice.reducer
