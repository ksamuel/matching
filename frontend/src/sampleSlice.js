import {createSlice} from '@reduxjs/toolkit'

export const sampleSlice = createSlice({
	name: 'samples',
	initialState: {
		currentDatasource: null,
		currentSample: null,
		datasources: [
			{
				id: "1",
				name: 'appariement_qualite_ij_apprenti_champ_2018_2019_ij_sia_apprenti_01122018_31122018.xml', href: '#',
				samples: []
			},
			{
				id: "2",
				name: 'Team',
				samples: [
					{id: "1", name: 'Overview', href: '#'},
					{id: "2", name: 'Members', href: '#'},
					{id: "3", name: 'Calendar', href: '#'},
					{id: "4", name: 'Settings', href: '#'},
				],
			},
			{
				id: "3",
				name: 'appariement_qualite_ij_foo_champ_2018_2019_ij_sia_bar_01122018_3114318.xml',
				samples: [
					{id: "5", name: 'Overview', href: '#'},
					{id: "6", name: 'Members', href: '#'},
					{id: "7", name: 'Calendar', href: '#'},
					{id: "8", name: 'Settings', href: '#'},
				],
			},
			{
				id: "4",
				name: 'XML',
				samples: [
					{id: "9", name: 'Overview', href: '#'},
					{id: "10", name: 'Members', href: '#'},
					{id: "11", name: 'Calendar', href: '#'},
					{id: "12", name: 'Settings', href: '#'},
				],
			},

		],
	},
	reducers: {

		setCurrentDataSource: (state, action) => {
			state.currentDatasource = action.payload
		},
		setCurrentSample: (state, action) => {
			state.currentSample = action.payload
		},
		voidDataSource: () => {
			state.currentSample = null
			state.currentDatasource = null
		},
	},

})

// Action creators are generated for each case reducer function
export const {setCurrentDataSource, setCurrentSample, voidDataSourceByAmount} = sampleSlice.actions

export default sampleSlice.reducer
