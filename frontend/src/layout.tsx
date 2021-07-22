import React from 'react';

import { Route, Switch } from "react-router-dom";

import Dropzone from "./dropzone"
import Sidebar from "./Sidebar"
import SamplingConfiguration from "./samplingConfiguration"
import SampleTable from "./sampleTable"
import NoDatasource from "./noDatasource"
import NoSample from "./nosample"
import Login from "./login"

export default function Layout() {

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">

            <Switch>

                <Route exact path="/">
                    <Sidebar></Sidebar>
                    <div className="flex flex-col w-0 flex-1 overflow-hidden">
                        <Dropzone />
                    </div>
                </Route>

                <Route exact path="/datasources/:datasourceId/samples/:sampleId/">
                    <Sidebar></Sidebar>
                    <div className="flex flex-col w-0 flex-1 overflow-x-hidden overflow-y-scroll"><SampleTable /></div>
                </Route>

                <Route exact path="/datasources/:datasourceId/">
                    <Sidebar></Sidebar>
                    <div className="flex flex-col w-0 flex-1 overflow-hidden"><SamplingConfiguration /></div>
                </Route>

                <Route path="/nodatasource/">
                    <Sidebar></Sidebar>
                    <div className="flex flex-col w-0 flex-1 overflow-hidden"><NoDatasource /></div>
                </Route>

                <Route path="/nosample/">
                    <Sidebar></Sidebar>
                    <div className="flex flex-col w-0 flex-1 overflow-hidden"><NoSample /></div>
                </Route>

                <Route path="/login/">
                    <div className="flex flex-col w-0 flex-1 overflow-hidden"><Login /></div>
                </Route>

            </Switch>

        </div>
    )
}
