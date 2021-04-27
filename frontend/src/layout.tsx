import React from 'react';

import {useState} from 'react'

import {

	Route, Switch

} from "react-router-dom";

import {

	MenuIcon,

} from '@heroicons/react/outline'

import Dropzone from "./dropzone"
import Sidebar from "./Sidebar"
import SamplingConfiguration from "./samplingConfiguration";
import SampleTable from "./sampleTable";
import NoDatasource from "./noDatasource";
import NoSample from "./nosample";

export default function Layout() {

	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div className="h-screen flex overflow-hidden bg-gray-100">

			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Sidebar>


			<div className="flex flex-col w-0 flex-1 overflow-hidden">


				<Switch>


					<Route exact path="/">
						<Dropzone/>
					</Route>

					<Route exact path="/datasource/:datasourceId/sample/:sampleId/" children={<SampleTable/>}>

					</Route>

					<Route exact path="/datasource/:datasourceId/" children={<SamplingConfiguration/>}>

					</Route>

					<Route path="/nodatasource/">
						<NoDatasource/>
					</Route>

					<Route path="/nosample/">
						<NoSample/>
					</Route>


				</Switch>

			</div>
		</div>
	)
}
