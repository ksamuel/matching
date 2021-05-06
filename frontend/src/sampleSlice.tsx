import {createSlice} from '@reduxjs/toolkit'


export const sampleSlice = createSlice({
  name: 'shortMenu',
  initialState: {
    currentDatasource: {},
    currentSample: {},
    datasources: [],
  },
  reducers: {


    setDatasources: (state, action) => {
      state.datasources = action.payload
    },

    setCurrentDataSource: (state, action) => {
      state.currentDatasource = action.payload
    },

    setCurrentDataSourceFromId: (state, action) => {
      state.currentDatasource = state.datasources.filter((ds) => {
        return action.payload == ds.id
      })[0] || {}
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
export const {
  setCurrentDataSource,
  setCurrentSample,
  voidDataSource,
  setDatasources,
  setCurrentDataSourceFromId
} = sampleSlice.actions

export default sampleSlice.reducer
