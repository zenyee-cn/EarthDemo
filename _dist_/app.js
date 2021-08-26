import L from"../_snowpack/pkg/globe.gl.js";import{request as C,getCoordinates as S,numberWithCommas as i,formatDate as w}from"./utils/index.js";import{GLOBE_IMAGE_URL as P,BACKGROUND_IMAGE_URL as T,GEOJSON_URL as D,CASES_API as I}from"./constants.js";import*as f from"../_snowpack/pkg/d3.js";const A=document.getElementById("globeViz"),g=f.scaleSequentialPow(f.interpolateYlOrRd).exponent(1/4),v=e=>e.covidData.confirmed/e.properties.POP_EST;let c,p;const H="https://corona.lmao.ninja/assets/img/flags";O();function O(){c=L()(A).globeImageUrl(P).backgroundImageUrl(T).showGraticules(!1).polygonAltitude(.06).polygonCapColor(e=>g(v(e))).polygonSideColor(()=>"rgba(0, 100, 0, 0.05)").polygonStrokeColor(()=>"#111").polygonLabel(({properties:e,covidData:t})=>(e.ADMIN==="France"?p="fr":e.ADMIN==="Norway"?p="no":p=e.ISO_A2.toLowerCase(),`
        <div class="card">
          <img class="card-img" src="${H}/${p}.png" alt="flag" />
          <div class="container">
             <span class="card-title"><b>${e.NAME}</b></span> <br />
             <div class="card-spacer"></div>
             <hr />
             <div class="card-spacer"></div>
             <span>Cases: ${i(t.confirmed)}</span>  <br />
             <span>Deaths: ${i(t.deaths)}</span> <br />
             <span>Recovered: ${i(t.recoveries)}</span> <br />
             <span>Population: ${f.format(".3s")(e.POP_EST)}</span>
          </div>
        </div>
      `)).onPolygonHover(e=>c.polygonAltitude(t=>t===e?.12:.06).polygonCapColor(t=>t===e?"steelblue":g(v(t)))).polygonsTransitionDuration(200),_()}let n=[],l=[],s=[],U=[];const d=document.querySelector(".play-button"),o=document.querySelector(".slider"),m=document.querySelector(".slider-date");function V(e,t=.5,a=10){let u=[];for(let r=0;r<a;r++){const M=t*Math.cos(2*Math.PI*r/a),E=t*Math.sin(2*Math.PI*r/a);u.push([e[0]+M,e[1]+E])}return[u]}async function _(){l=await C(I),s=(await C(D)).features,document.querySelector(".title-desc").innerHTML="Hover on a country or territory to see cases, deaths, and recoveries.",n=Object.keys(l.China),o.max=n.length-1,o.value=n.length-1,o.disabled=!1,d.disabled=!1,y(),h(),$()}const q=document.querySelector("#infected"),x=document.querySelector("#deaths"),k=document.querySelector("#recovered"),N=document.querySelector(".updated");function y(){m.innerHTML=n[o.value];let e=0,t=0,a=0;Object.keys(l).forEach(u=>{if(l[u][n[o.value]]){const r=l[u][n[o.value]];e+=+r.confirmed,t+=+r.deaths,a+=r.recoveries?+r.recoveries:0}}),q.innerHTML=i(e),x.innerHTML=i(t),k.innerHTML=i(a),N.innerHTML=`(as of ${w(n[o.value])})`}function h(){for(let t=0;t<s.length;t++){const a=s[t].properties.NAME;l[a]?s[t].covidData={confirmed:l[a][n[o.value]].confirmed,deaths:l[a][n[o.value]].deaths,recoveries:l[a][n[o.value]].recoveries}:s[t].covidData={confirmed:0,deaths:0,recoveries:0}}const e=Math.max(...s.map(v));g.domain([0,e]),c.polygonsData(s)}async function $(){try{const{latitude:e,longitude:t}=await S();c.pointOfView({lat:e,lng:t},1e3)}catch(e){console.log("Unable to set point of view.")}}let b;d.addEventListener("click",()=>{if(d.innerText==="Play")d.innerText="Pause";else{d.innerText="Play",clearInterval(b);return}+o.value==n.length-1&&(o.value=0),m.innerHTML=n[o.value],b=setInterval(()=>{o.value++,m.innerHTML=n[o.value],y(),h(),+o.value==n.length-1&&(d.innerHTML="Play",clearInterval(b))},200)}),"oninput"in o&&o.addEventListener("input",function(){y(),h()},!1),window.addEventListener("resize",e=>{c.width([e.target.innerWidth]),c.height([e.target.innerHeight])});
