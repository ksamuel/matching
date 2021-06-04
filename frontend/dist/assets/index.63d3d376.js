var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,c=(e,t)=>{for(var a in t||(t={}))n.call(t,a)&&s(e,a,t[a]);if(r)for(var a of r(t))l.call(t,a)&&s(e,a,t[a]);return e},o=(e,r)=>t(e,a(r));import{c as m,r as i,T as u,X as d,a as p,b as x,u as f,d as g,e as E,D as b,L as y,f as h,g as v,h as N,I as w,S,R as k,i as D,j as C,k as j,l as I,P as L,B as F}from"./vendor.41b32bc9.js";const $=m({name:"shortMenu",initialState:{currentDatasource:{},currentSample:{},datasources:[]},reducers:{setDatasources:(e,t)=>{e.datasources=t.payload},setCurrentDataSource:(e,t)=>{e.currentDatasource=t.payload},setCurrentDataSourceFromId:(e,t)=>{e.currentDatasource=e.datasources.filter((e=>t.payload==e.id))[0]||{}},setCurrentSample:(e,t)=>{e.currentSample=t.payload},voidDataSource:e=>{e.currentSample=null,e.currentDatasource=null},addSampleToDataSource:(e,t)=>{const a=t.payload;e.datasources.forEach((e=>{e.id===a.datasource&&e.samples.push(a)}))}}}),{setCurrentDataSource:M,setCurrentSample:P,voidDataSource:O,setDatasources:K,setCurrentDataSourceFromId:z,addSampleToDataSource:R}=$.actions;var U=$.reducer;function A(...e){return e.filter(Boolean).join(" ")}const T=document.querySelector("base").href,B=["Backspace","Tab","Enter","Shift","Control","Alt","CapsLock","Escape","PageUp","PageDown","End","Home","ArrowLeft","ArrowUp","ArrowRight","ArrowDown","Delete"];function Y(e,t){const a=("string"==typeof e?e:e.toString()).split(".");if(t<=0)return a[0];let r=a[1]||"";if(r.length>t)return`${a[0]}.${r.substr(0,t)}`;for(;r.length<t;)r+="0";return parseFloat(`${a[0]}.${r}`)}function H({msg:e}){return i.createElement("div",{className:"flex h-screen justify-center items-center flex-col"},i.createElement("h1",{className:"text-center my-20 text-4xl font-extrabold text-gray-600 sm:text-5xl sm:tracking-tight lg:text-6xl"},e),i.createElement("div",{className:"loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"}))}function _({msg:e}){const[t,a]=i.useState(!0);return i.createElement(i.Fragment,null,i.createElement("div",{"aria-live":"assertive",className:"fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"},i.createElement("div",{className:"w-full flex flex-col items-center space-y-4 sm:items-end"},i.createElement(u,{show:t,as:i.Fragment,enter:"transform ease-out duration-300 transition",enterFrom:"translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",enterTo:"translate-y-0 opacity-100 sm:translate-x-0",leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0"},i.createElement("div",{className:"max-w-lg w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"},i.createElement("div",{className:"p-4"},i.createElement("div",{className:"flex items-start"},i.createElement("div",{className:"flex-shrink-0"},i.createElement(d,{className:"h-6 w-6 text-red-400","aria-hidden":"true"})),i.createElement("div",{className:"ml-3 w-0 flex-1 pt-0.5"},i.createElement("p",{className:"text-lg font-medium text-gray-900"},"Il y a un problème"),i.createElement("p",{className:"mt-1 text-lg text-gray-500"},e)),i.createElement("div",{className:"ml-4 flex-shrink-0 flex"},i.createElement("button",{className:"bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",onClick:()=>{a(!1)}},i.createElement("span",{className:"sr-only"},"Close"),i.createElement(p,{className:"h-5 w-5","aria-hidden":"true"}))))))))))}const q=x.create({baseURL:T}),V=()=>q.get("/api/v1/datasources/"),W=e=>q.get(`/api/v1/datasources/${e}/`),X=x.create({baseURL:T});function Z(){const e=f(),t=g(),[a,r]=i.useState("");i.useEffect((()=>{e(O())}),[]);const{getRootProps:n,getInputProps:l,open:s,acceptedFiles:m,fileRejections:u}=E({noClick:!0,noKeyboard:!0,accept:["application/xml","text/xml"],onDropAccepted:a=>{r("");var n=new FormData;n.append("xml",a[0]),X.post("/upload_file/",n,{headers:{"Content-Type":"multipart/form-data"}}).then((a=>{V().then((t=>e(K(t.data)))),t.push(`/datasources/${a.data}`)})).catch((e=>{r(e.response.data)}))}});return m.map((e=>i.createElement("li",{key:e.path},e.path," - ",e.size," bytes"))),u.map((({file:e,errors:t})=>i.createElement("li",{key:e.path},e.path," - ",e.size," bytes",i.createElement("ul",null,t.map((e=>i.createElement("li",{key:e.code},e.message))))))),i.createElement("main",{className:"flex-1 relative overflow-y-auto focus:outline-none",tabIndex:0},i.createElement("h1",{className:"text-center my-20 text-4xl font-extrabold text-gray-600 sm:text-5xl sm:tracking-tight lg:text-6xl"},"Nouveau fichier"),i.createElement("div",{className:"py-6"},i.createElement("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 md:px-8"},i.createElement("div",{className:"py-4"},i.createElement("div",o(c({},n({className:"dropzone"})),{className:"p-4 flex flex items-center justify-center flex-col border-4 border-dashed border-gray-200rounded-lg h-96 bg-white"}),i.createElement("input",c({},l())),i.createElement("h2",{className:"my-4 text-2xl font-extrabold tracking-tight sm:text-1xl lg:text-1xl text-gray-600 pb-5 "},"Glissez-déposez un fichier XML ici ou ... "),i.createElement("p",{className:""},i.createElement("button",{type:"button",onClick:s,className:"inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl"},"Choisissez un fichier en cliquant ici",i.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"ml-3 -mr-1 h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},i.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"}))))),a&&i.createElement(_,{msg:a})))))}function G({datasource:e,currentDatasource:t,currentSample:a}){const r=g(),n=e.samples.length>0,l=t&&e.id===t.id;return i.createElement("div",{onClick:()=>r.push(`/datasources/${e.id}/`)},i.createElement(b,{as:"div",className:"space-y-1"},i.createElement(b.Button,{className:A(l?"bg-blue-100 text-blue-900  untruncate":"bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-900  truncate",n?"":"pl-2"," group w-full flex items-center pr-2 py-2 text-m font-medium rounded-md  hover:untruncate  focus:outline-none focus:ring-2 focus:ring-indigo-500")},n&&i.createElement("span",null,i.createElement("svg",{className:A(l?"text-blue-400 rotate-90":"text-gray-300","mr-2 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150 "),viewBox:"0 0 20 20","aria-hidden":"true"},i.createElement("path",{d:"M6 6L14 10L6 14V6Z",fill:"currentColor"}))),i.createElement("span",{className:A(l?"untruncate":"truncate","hover:untruncate hover:text-over break-all max-w-full block ")},e.name)),l&&i.createElement(b.Panel,{className:"space-y-1",static:!0},e.samples.map((t=>i.createElement(y,{key:t.id,onClick:e=>e.stopPropagation(),to:`/datasources/${e.id}/samples/${t.id}/`,className:A(a&&a.id===t.id?"border-l-4 border-blue-800  bg-blue-50":"","group w-full flex  pl-3 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md  hover:bg-gray-50")},i.createElement("ul",null,i.createElement("li",null,i.createElement("span",{className:"font-black text-gray-800"},"Score:")," ",t.minScore," - ",t.maxScore),i.createElement("li",null,i.createElement("span",{className:"font-black text-gray-800"},"Paires:")," ",t.count),i.createElement("li",null,i.createElement("span",{className:"font-black text-gray-800"},"Date:")," ",h(t.date).format("HH:mm:ss DD/MM/YYYY")),i.createElement("li",{className:"text-xs text-gray-400"},"Expire: ",h(t.expireDate).fromNow()," "))))),i.createElement("span",{className:"flex flex-row-reverse"},i.createElement(y,{className:"text-center text-xs italic underline text-gray-500 m-2",to:`/datasources/${e.id}/`},"Ajouter")))))}function J(){const e=f();i.useEffect((()=>{V().then((t=>e(K(t.data))))}),[]);const{currentDatasource:t,currentSample:a,datasources:r}=v((e=>c({},e.samples)));return i.createElement("div",{className:"flex flex-col  border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto  w-64"},i.createElement("div",{className:"flex items-center flex-shrink-0 px-4 "},i.createElement(y,{to:"/"},i.createElement("img",{className:"w-auto",src:"/assets/logo.90a0eb68.png",alt:"Workflow"}))),i.createElement("div",{className:"mt-5 flex-grow flex flex-col"},i.createElement(y,{to:"/",className:"text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 mb-4"},"Nouveau fichier"),i.createElement("nav",{className:"flex-1 px-2 space-y-1 bg-white","aria-label":"Sidebar"},r.map((e=>i.createElement(G,{datasource:e,currentDatasource:t,currentSample:a,key:e.name}))))))}function Q({datasourceId:e,sampleId:t}){return v((a=>{let r=a.samples.datasources.filter((t=>t.id===e))[0];if(r){let e=r.samples.filter((e=>e.id===t))[0];return{currentDatasource:r,currentSample:e}}return{currentDatasource:r,currentSample:null}}))}const{Range:ee}=w;function te(){const{datasourceId:e,sampleId:t}=N(),a=g(),r=f(),[n,l]=i.useState(300),[s,c]=i.useState(0),[o,m]=i.useState(10),[u,d]=i.useState(""),[p,x]=i.useState(""),[E,b]=i.useState(10),[y,h]=i.useState(10),{currentDatasource:v}=Q({datasourceId:e,sampleId:t});i.useEffect((()=>{var t;v?(r(M(v)),r(P(null)),d("")):(d("Chargement de la source de donnée"),W(e).then((e=>{r(M(e.data)),r(P(null))})).catch((e=>{404===e.response.status&&a.push("/nodatasource/"),x(e.response.data)})).finally((()=>{d("")}))),s||(t=e,q.get(`/api/v1/datasources/${t}/scoreboundaries/`)).then((e=>{c(e.data.min),m(e.data.max),h(e.data.min),b(e.data.max)}))}),[t,v,o]);const S=e=>{const t=e.key;B.includes(t)||t.match(/[\d.,]/)||e.ctrlKey||e.altKey||e.metaKey||e.preventDefault()},k=()=>{x(""),d("Echantillonnage en cours"),((e,t,a,r)=>q.post(`/api/v1/datasources/${e}/samples/`,{count:t,min:a,max:r}))(v.id,n,s,o).then((e=>{console.log(e.data),r(R(e.data)),a.push(`/datasources/${v.id}/samples/${e.data.id}`)})).catch((e=>{e.response.data.detail?x(e.response.data.detail):(x("Une erreur inconnue est survenue"),console.error(e))})).finally((()=>{d("")}))};return i.createElement(i.Fragment,null,v&&""===u?i.createElement(i.Fragment,null,i.createElement("header",{className:"bg-white shadow"},i.createElement("div",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"},i.createElement("h1",{className:"text-3xl font-bold text-gray-900"},"Nouvel échantillon"),i.createElement("p",null," ",v.name))),i.createElement("main",null,"number"!=typeof s?i.createElement("div",{className:"p-4 flex flex items-center justify-center flex-col"},i.createElement("h2",{className:"my-4 text-2xl font-extrabold tracking-tight sm:text-1xl lg:text-1xl text-gray-600 pb-5 "},"Il n'y a plus de paires à annoter ")):i.createElement("form",{action:"",onSubmit:e=>{e.preventDefault(),k()}},i.createElement("div",{className:"max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"},i.createElement("div",{className:"px-4 py-6 sm:px-0"},i.createElement("div",{className:"text-xl mb-4 flex items-center"},i.createElement("span",{className:"flex-initial w-1/2 "},i.createElement("span",{className:"text-xl "},i.createElement("label",{className:"text-xl ",htmlFor:"count"},"Cardinalité: ")),i.createElement("span",null,i.createElement("input",{type:"number",name:"count",value:n,max:1e3,min:0,onChange:e=>(e=>{const t=parseInt(e.replace(/\D/g,""));isNaN(t)?l(""):t<=300&&l(t)})(e.target.value),onKeyDown:e=>{const t=e.key;B.includes(t)||t.match(/\d/)||e.ctrlKey||e.altKey||e.metaKey||e.preventDefault()},className:A(n?"":"border-red-300 focus:border-red-300 border-4 focus:border-4","w-20 mx-8 text-right")}))),i.createElement("span",{className:"flex-initial mr-8 text-gray-300"},"0"),i.createElement("span",{className:"flex-1"},i.createElement(w,{min:0,max:300,step:1,value:n,onChange:l})),i.createElement("span",{className:"flex-initial ml-8 text-gray-300"},"300")),i.createElement("div",{className:"text-xl mb-4 flex items-center"},i.createElement("span",{className:"flex-initial w-1/4 "},i.createElement("label",{className:"text-xl  w-44",htmlFor:"minscore"},"Score min:   "),i.createElement("input",{type:"number",name:"minscore",value:s,max:o,min:y,onChange:e=>(e=>{const t=parseFloat(e.replace(",",".").replace(/[^\d.]/g,""));isNaN(t)?c(""):t<=o&&t>y&&c(Y(t,2))})(e.target.value),onKeyDown:S,className:A(""!==s?"":"border-red-300 focus:border-red-300 border-4 focus:border-4","w-20 mx-8 text-right")})),i.createElement("span",{className:"flex-initial w-1/4 "},i.createElement("label",{className:"text-xl ",htmlFor:"maxscore"},"Score max:"),i.createElement("input",{type:"number",name:"maxscore",value:o,max:E,min:s,onChange:e=>(e=>{const t=parseFloat(e.replace(",",".").replace(/[^\d.]/g,""));isNaN(t)?m(""):t<=E&&t>=s&&m(Y(t,2))})(e.target.value),onKeyDown:S,className:A(""!==o?"":"border-red-300 focus:border-red-300 border-4 focus:border-4","w-20 mx-8 text-right")})),i.createElement("span",{className:"flex-initial mr-4 text-gray-300"},y),i.createElement("span",{className:"flex-1"},i.createElement(ee,{min:100*y,max:100*E,allowCross:!1,step:1,value:[100*s,100*o],onChange:([e,t])=>[c(e/100),m(t/100)]})),i.createElement("span",{className:"flex-initial ml-8 text-gray-300"},E)),i.createElement("div",{className:"flex justify-center"},i.createElement("button",{type:"button",onClick:e=>{e.preventDefault(),k()},disabled:!n||""===o||""===s,className:"disabled:opacity-30  m-8 inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl"},"Lancer l'échantillonnage"))))))):i.createElement(H,{msg:u}),p&&i.createElement(_,{msg:p}))}const ae=x.create({baseURL:T});function re({value:e,onChange:t}){let[a,r]=i.useState(e);const n=e=>a=>{r(e),t(e,a)};return i.createElement("span",{className:"relative z-0 inline-flex shadow-sm rounded-md"},i.createElement("button",{onClick:n("ok"),type:"button",className:A("ok"===a?"bg-green-200":"hover:bg-gray-200","relative inline-flex items-center px-4 py-2","rounded-l-md border border-gray-300 bg-white border-gray-300","text-sm font-medium text-gray-700  focus:z-10","focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500")},"OK"),i.createElement("button",{onClick:n("nok"),type:"button",className:A("nok"===a?"bg-red-200":"hover:bg-gray-200","-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300","bg-white text-sm font-medium text-gray-700  focus:z-10","focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500")},"NOK"),i.createElement("button",{onClick:n("?"),type:"button",className:A("?"===a?"bg-yellow-200":"hover:bg-gray-200","-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border","border-gray-300 bg-white text-sm font-medium text-gray-700  focus:z-10","focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500")},"?"))}function ne(){const e=g(),t=f(),{datasourceId:a,sampleId:r}=N(),{currentDatasource:n,currentSample:l}=Q({datasourceId:a,sampleId:r});let s;const[m,u]=i.useState(""),[d,p]=i.useState(""),[x,E]=i.useState([]),[b,y]=i.useState("");i.useEffect((()=>{n||(u("Chargement de la source de donnée"),W(a).then((e=>{t(M(e.data))})).catch((t=>{404===t.response.status&&e.push("/nodatasource/"),y(t.response.data)})))}),[a]),i.useEffect((()=>{(async()=>{try{u("Chargement de l'échantillon"),E([]);const e=await ae.get(`/api/v1/samples/${r}/params`);t(P(e.data)),t(M(n))}catch(a){404===a.status_code&&e.push("/nosample/"),a.response.data.detail?y(a.response.data.detail):(y("Une erreur inconnue est survenue"),console.error(a))}})()}),[r]),i.useEffect((()=>{x.length&&u("")}),[r]),i.useEffect((()=>{(async()=>{try{u("Chargement de l'échantillon");const e=await ae.get(`/api/v1/samples/${r}/data`);E(e.data)}catch(t){404===t.status_code&&e.push("/nosample/"),t.response.data.detail?y(t.response.data.detail):(y("Une erreur inconnue est survenue"),console.error(t))}finally{u("")}})()}),[r]);const v={ok:3,nok:2,"?":1,null:0};return i.useEffect((()=>{if(!d)return;const e="ascending"==d?1:-1;x.sort(((t,a)=>{const r=v[t.status],n=v[a.status];return r>n?e:n>r?-e:0})),E([...x])}),[d]),n&&(s=n.schema),i.createElement(i.Fragment,null," ",n&&i.createElement("header",{className:"bg-white shadow  "},i.createElement("div",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"},i.createElement("h1",{className:"text-2xl  text-gray-900 truncate mb-2"},n.name),i.createElement("p",null,i.createElement("span",{className:"font-bold  "},"Paires:")," ",l.count,i.createElement("span",{className:"font-bold ml-8"},"Score:")," ",l.minScore," - ",l.maxScore,i.createElement("span",{className:"font-bold ml-8"},"Date:")," ",h(l.date).format("HH:mm:ss DD/MM/YYYY"),i.createElement("span",{className:"text-sm ml-8 text-gray-400"},"Expire: ",h(l.expireDate).fromNow())))),i.createElement("main",null,i.createElement("div",{className:"flex flex-col"},i.createElement("div",{className:"-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"},i.createElement("div",{className:"py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"},x.length&&""===m?i.createElement("div",{className:"table-container shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"},i.createElement("table",{className:"min-w-full divide-y divide-gray-200  "},i.createElement("thead",{className:"bg-gray-200  "},i.createElement("tr",null,Object.keys(s).map((e=>i.createElement("th",{key:e,scope:"col",colSpan:2,className:" px-2 py-3 border border-gray-300 w-8 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"},e))),i.createElement("th",{scope:"col",className:"   border border-gray-300 w-8 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"},"Score"),i.createElement("th",{scope:"col",onClick:()=>p("ascending"!==d?"ascending":"descending"),className:" cursor-pointer  border border-gray-300 w-8 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"},i.createElement("span",{className:"flex align-middle justify-center"},"Status",d&&i.createElement("svg",{className:A("descending"===d?"-rotate-90":"rotate-90  ","  h-4 w-4 transform   text-gray-800 transition-colors ease-in-out duration-150 mx-2"),viewBox:"0 0 20 20","aria-hidden":"true"},i.createElement("path",{d:"M6 6L14 10L6 14V6Z",fill:"currentColor"})))))),i.createElement("tbody",null,x.map((({pairs:e,score:t,status:a,id:r},n)=>i.createElement("tr",{key:r,className:n%2==0?"bg-white":"bg-gray-50"},Object.entries(e).map((e=>{const[t,{value1:a,value2:r,similarity:n}]=e,l=s[t].type;return i.createElement(i.Fragment,{key:t},i.createElement("td",{className:A("gender"===l||"date"===l?"text-center":"","px-2 border border-gray-300 w-8 whitespace-nowrap text-sm text-gray-500"),dangerouslySetInnerHTML:{__html:a+(r?"<br/>":"")+r}}),i.createElement("td",{className:" px-2 w-4 text-center   whitespace-nowrap border border-gray-300   text-sm text-gray-500 "},n))})),i.createElement("td",{className:"px-4 py-4 whitespace-nowrap text-center border border-gray-300 w-8 font-medium text-sm text-gray-500"},t),i.createElement("td",{className:"px-2 py-4 whitespace-nowrap text-center text-sm border border-gray-300   font-medium"},i.createElement(re,{value:a,onChange:e=>((e,t)=>{ae.put(`/api/v1/samples/${l.id}/pairs/${t}/status`,{status:e}),E(x.map((a=>a.id===t?o(c({},a),{status:e}):a)))})(e,r)})))))))):i.createElement(H,{msg:m}))),b&&i.createElement(_,{msg:b}))))}function le(){return i.createElement("div",{className:"p-4 flex flex items-center justify-center flex-col"},i.createElement("h2",{className:"my-4 text-2xl font-extrabold tracking-tight sm:text-1xl lg:text-1xl text-gray-600 pb-5 "},"Aucun jeu de données ne correspond à cette URL."))}function se(){return i.createElement("div",{className:"p-4 flex flex items-center justify-center flex-col"},i.createElement("h2",{className:"my-4 text-2xl font-extrabold tracking-tight sm:text-1xl lg:text-1xl text-gray-600 pb-5 "},"Aucun échantillon ne correspond à cette URL "))}function ce(){return i.createElement("div",{className:"h-screen flex overflow-hidden bg-gray-100"},i.createElement(J,null),i.createElement(S,null,i.createElement(k,{exact:!0,path:"/"},i.createElement("div",{className:"flex flex-col w-0 flex-1 overflow-hidden"},i.createElement(Z,null))),i.createElement(k,{exact:!0,path:"/datasources/:datasourceId/samples/:sampleId/"},i.createElement("div",{className:"flex flex-col w-0 flex-1 overflow-x-hidden overflow-y-scroll"},i.createElement(ne,null))),i.createElement(k,{exact:!0,path:"/datasources/:datasourceId/"},i.createElement("div",{className:"flex flex-col w-0 flex-1 overflow-hidden"},i.createElement(te,null))),i.createElement(k,{path:"/nodatasource/"},i.createElement("div",{className:"flex flex-col w-0 flex-1 overflow-hidden"},i.createElement(le,null))),i.createElement(k,{path:"/nosample/"},i.createElement("div",{className:"flex flex-col w-0 flex-1 overflow-hidden"},i.createElement(se,null)))))}var oe=D({reducer:{samples:U}});h.extend(C),h.extend(j),h.updateLocale("en",{relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minutes",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"}}),I.render(i.createElement(i.StrictMode,null,i.createElement(L,{store:oe},i.createElement(F,null,i.createElement(ce,null))),","),document.getElementById("root"));
