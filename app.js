// LalaMovie frontend starter. Public catalogue is read from the WordPress REST API.
const SITE_URL = "https://lalamovie.is-great.net";
const API_BASE = `${SITE_URL.replace(/\\/$/,'')}/wp-json/wp/v2`;
const movieGrid = document.querySelector("#movieGrid");
const seriesGrid = document.querySelector("#seriesGrid");
let allItems = [];

function cleanText(value=""){const el=document.createElement("div");el.innerHTML=value;return el.textContent||el.innerText||""}
function imageOf(item){return item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || item?.jetpack_featured_media_url || "https://placehold.co/400x600/171720/eeeeee?text=LalaMovie"}
function card(item){const title=cleanText(item.title?.rendered||"Untitled");const year=(item.date||"").slice(0,4);return `<article class="poster" data-id="${item.id}"><img loading="lazy" src="${imageOf(item)}" alt=""><h3>${title}</h3><p>${year}</p></article>`}
async function getPosts(type){const url=`${API_BASE}/${type}?per_page=18&orderby=date&order=desc&_embed=1`;const r=await fetch(url);if(!r.ok)throw new Error(`API ${r.status}`);return r.json()}
async function load(){
  try{
    // Dooplay installations commonly expose the movie post type as "movies".
    let movies=[];try{movies=await getPosts("movies")}catch(e){movies=await getPosts("posts")}
    let series=[];try{series=await getPosts("tvshows")}catch(e){series=[]}
    allItems=[...movies,...series];
    movieGrid.innerHTML=movies.length?movies.map(card).join():'<p class="loading">No movies were returned by the site API.</p>';
    seriesGrid.innerHTML=series.length?series.map(card).join():'<p class="loading">TV series will appear here when the site API exposes them.</p>';
  }catch(err){movieGrid.innerHTML='<p class="loading">Could not load the catalogue. Check WordPress REST API access and post-type visibility.</p>';seriesGrid.innerHTML='';console.error(err)}
}
function openDetails(id){const item=allItems.find(x=>String(x.id)===String(id));if(!item)return;const title=cleanText(item.title?.rendered||"Untitled");document.querySelector("#modalBody").innerHTML=`<div class="detail"><img src="${imageOf(item)}" alt=""><div><p class="eyebrow">LALAMOVIE</p><h2>${title}</h2><p>${cleanText(item.excerpt?.rendered||"Movie details")}</p><a class="watch-link" href="${item.link}" target="_blank" rel="noopener">Open on LalaMovie ↗</a></div></div>`;document.querySelector("#detailModal").classList.remove("hidden")}
document.addEventListener("click",e=>{const p=e.target.closest(".poster");if(p)openDetails(p.dataset.id)});
document.querySelector("#closeModal").onclick=()=>document.querySelector("#detailModal").classList.add("hidden");
document.querySelector("#searchToggle").onclick=()=>{document.querySelector("#searchWrap").classList.toggle("hidden");document.querySelector("#searchInput").focus()};
document.querySelector("#clearSearch").onclick=()=>{document.querySelector("#searchInput").value="";filter("")};
function filter(q){const f=allItems.filter(x=>cleanText(x.title?.rendered||"").toLowerCase().includes(q.toLowerCase()));movieGrid.innerHTML=f.length?f.map(card).join():'<p class="loading">No matching titles.</p>';seriesGrid.innerHTML=""}
document.querySelector("#searchInput").addEventListener("input",e=>filter(e.target.value));
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(console.warn));
load();