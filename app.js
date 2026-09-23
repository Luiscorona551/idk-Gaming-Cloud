const services=[
 {id:"xbox",name:"Xbox Cloud Gaming",icon:"🎮",description:"Stream supported Xbox games through Xbox Cloud Gaming.",url:"https://www.xbox.com/play"},
 {id:"gfn",name:"GeForce NOW",icon:"⚡",description:"Stream games you own from supported PC game stores.",url:"https://play.geforcenow.com/"},
 {id:"luna",name:"Amazon Luna",icon:"☁️",description:"Launch Amazon's cloud gaming service and supported games.",url:"https://luna.amazon.com/"},
 {id:"boosteroid",name:"Boosteroid",icon:"🚀",description:"A cloud gaming platform with browser-based game streaming.",url:"https://cloud.boosteroid.com/"},
 {id:"blacknut",name:"Blacknut",icon:"🕹️",description:"Cloud gaming with a catalog designed for streaming.",url:"https://www.blacknut.com/"},
 {id:"manual",name:"Add a service",icon:"＋",description:"A future-ready slot for another supported cloud gaming provider.",url:null}
];
const grid=document.getElementById("serviceGrid"),search=document.getElementById("search"),modal=document.getElementById("modal"),close=document.getElementById("close"),favCount=document.getElementById("favCount");
let favorites=JSON.parse(localStorage.getItem("idkCloudFavorites")||"[]");
function render(){
 const q=search.value.trim().toLowerCase();
 grid.innerHTML="";
 services.filter(s=>s.name.toLowerCase().includes(q)||s.description.toLowerCase().includes(q)).forEach(s=>{
  const el=document.createElement("article");el.className="service";
  const active=favorites.includes(s.id);
  el.innerHTML=`<div class="service-top"><div class="service-icon">${s.icon}</div><button class="heart ${active?"active":""}" aria-label="Favorite ${s.name}" data-fav="${s.id}">${active?"♥":"♡"}</button></div><h3>${s.name}</h3><p>${s.description}</p><button class="launch-btn" data-launch="${s.id}">${s.url?"Open service ↗":"Coming soon"}</button>`;
  grid.appendChild(el);
 });
 favCount.textContent=favorites.length;
}
function openService(id){
 const s=services.find(x=>x.id===id);if(!s)return;
 if(!s.url){alert("This service slot is ready for a future integration.");return}
 document.getElementById("modalIcon").textContent=s.icon;document.getElementById("modalTitle").textContent=s.name;document.getElementById("modalText").textContent=s.description;
 const launch=document.getElementById("launch");launch.href=s.url;modal.classList.add("open");modal.setAttribute("aria-hidden","false");
}
grid.addEventListener("click",e=>{
 const fav=e.target.closest("[data-fav]");if(fav){const id=fav.dataset.fav;favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];localStorage.setItem("idkCloudFavorites",JSON.stringify(favorites));render();return}
 const launch=e.target.closest("[data-launch]");if(launch)openService(launch.dataset.launch);
});
search.addEventListener("input",render);close.addEventListener("click",()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true")});
modal.addEventListener("click",e=>{if(e.target===modal)close.click()});
document.getElementById("learnBtn").addEventListener("click",()=>document.getElementById("how").scrollIntoView({behavior:"smooth"}));
document.getElementById("favoritesBtn").addEventListener("click",()=>{search.value="";render();document.getElementById("services").scrollIntoView({behavior:"smooth"})});
render();