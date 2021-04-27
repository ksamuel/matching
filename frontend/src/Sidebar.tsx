import {useSelector} from "react-redux"

import React from "react";
import logo from "./logo.png"
import MenuEntry from "./menuEntry"


export default function Sidebar() {

	const {currentDatasource, currentSample, datasources} = useSelector(state => state.samples)


	return (
		<div className="flex flex-col  border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto  w-64">

			<div className="flex items-center flex-shrink-0 px-4 ">
				<img className="w-auto" src={logo} alt="Workflow"/>
			</div>

			<div className="mt-5 flex-grow flex flex-col">
				<nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
					{datasources.map((ds) => <MenuEntry datasource={ds} currentDatasource={currentDatasource}
																							currentSample={currentSample} key={ds.name}/>)}
				</nav>
			</div>
		</div>
	)
}

