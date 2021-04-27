import { configureStore } from '@reduxjs/toolkit'
import sampleReducer from "./sampleSlice"

export default configureStore({
  reducer: {
    samples: sampleReducer
  },
})