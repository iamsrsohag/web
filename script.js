let all=[], active="All";
const $=s=>document.querySelector(s);
async function init(){
 try{
   const response=await fetch("publications.json");
   if(!response.ok) throw new Error(`Could not load publications.json (${response.status})`);
   all=await response.json();
 }catch(e){
   console.error(e);
   $("pubs").innerHTML=`<p class="authors">Could not load publications.json. Run this site through a local web server or deploy it to GitHub Pages.</p>`;
   return;
 }
 buildFilters(); render();
}
function buildFilters(){
 const years=["All",...new Set(all.map(p=>String(p.year)))];
 $("#filters").innerHTML=years.map((y,i)=>`<button class="filter ${i===0?"active":""}" data-y="${y}">${y}</button>`).join("");
 document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");active=b.dataset.y;render()});
}
function render(){
 const q=($("#search")?.value||"").toLowerCase();
 const data=all.filter(p=>(active==="All"||String(p.year)===active)&&(`${p.title} ${p.authors} ${p.venue}`.toLowerCase().includes(q))).sort((a,b)=>Number(b.year)-Number(a.year));
 $("#pubs").innerHTML=data.map(p=>{
   let links=[];
  if(p.pdf){
    links.push(`<a class="pdf-link" href="${p.pdf}" target="_blank" title="Open PDF"><span class="pdf-icon">PDF</span></a>`);
  }
  if(p.doi||p.url){
    links.push(`<a class="external-link" href="${escapeHtml(p.doi||p.url)}" target="_blank" rel="noopener" title="Open journal or conference website"><img src="assets/icons/link-solid-full.svg" alt="Open journal or conference website"></a>`);
  }
   return `<article class="publication"><div class="pub-year">${p.year}</div><div><h3>${escapeHtml(p.title)}${p.status?`<span class="badge">${escapeHtml(p.status)}</span>`:""}</h3><div class="authors">${escapeHtml(p.authors)}</div><div class="venue">${escapeHtml(p.venue)}</div>${p.note?`<div class="authors">${escapeHtml(p.note)}</div>`:""}</div><div class="pub-links">${links.join("")}</div></article>`;
 }).join("") || `<p class="authors">No publications match your search.</p>`;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
$("#search").addEventListener("input",render);
$(".hamburger").onclick=()=>document.querySelector("nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>document.querySelector("nav").classList.remove("open"));
document.addEventListener("scroll",()=>{let h=document.documentElement.scrollHeight-innerHeight;$(".progress").style.width=(scrollY/h*100)+"%"});
$("#year").textContent=new Date().getFullYear(); init();
