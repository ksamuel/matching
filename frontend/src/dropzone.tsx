import React, {useState} from "react"
import {useDropzone} from "react-dropzone"
import axios from "axios"

export default function Dropzone() {
    const [uri, setUri] = useState('');
    const {getRootProps, getInputProps, open, acceptedFiles, fileRejections} = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: ['application/xml', 'text/xml'],
        onDropAccepted: (files) => {

            var formData = new FormData();
            formData.append("xml", files[0]);

            axios.post('/upload_file/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                setUri(response.data)
            })

        }
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));


    const fileRejectionItems = fileRejections.map(({file, errors}) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));


    return <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex={0}>
			<h1 className="text-center my-20 text-4xl font-extrabold text-gray-600 sm:text-5xl sm:tracking-tight lg:text-6xl">
				Nouveau fichier
			</h1>
			<div className="py-6">

				<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
					{/* Replace with your content */}
					<div className="py-4">
						<div {...getRootProps({className: 'dropzone'})}
								 className="p-4 flex flex items-center justify-center flex-col border-4 border-dashed border-gray-200rounded-lg h-96 bg-white">


							<input {...getInputProps()} />

							<h2 className="my-4 text-2xl font-extrabold tracking-tight sm:text-1xl lg:text-1xl text-gray-600 pb-5 ">
								Glissez-déposez un fichier XML ici ou ... </h2>

							<p className="">


								<button type="button"
												className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl">
									Choisissez un fichier en cliquant ici
									{/* Heroicon name: solid/upload */}
									<svg xmlns="http://www.w3.org/2000/svg" className="ml-3 -mr-1 h-5 w-5" fill="none"
											 viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round"
													stroke-width="2"
													d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
									</svg>

								</button>


							</p>

                    </div>

                    <aside>
                        <h4>Files</h4>
                        <ul>{files}</ul>
                        <p>{uri}</p>
                        <h4>Rejected files</h4>
                        <ul>{fileRejectionItems}</ul>
                    </aside>
                </div>
                {/* /End replace */}
            </div>
        </div>
    </main>
}
