import"./portfolio-data-CH7lOtUs.js";const H="modulepreload",j=function(o){return"/"+o},I={},N=function(d,h,k){let g=Promise.resolve();if(h&&h.length>0){let r=function(a){return Promise.all(a.map(p=>Promise.resolve(p).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),$=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));g=r(h.map(a=>{if(a=j(a),a in I)return;I[a]=!0;const p=a.endsWith(".css"),u=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${u}`))return;const f=document.createElement("link");if(f.rel=p?"stylesheet":H,p||(f.as="script"),f.crossOrigin="",f.href=a,$&&f.setAttribute("nonce",$),document.head.appendChild(f),p)return new Promise((m,S)=>{f.addEventListener("load",m),f.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${a}`)))})}))}function b(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return g.then(r=>{for(const l of r||[])l.status==="rejected"&&b(l.reason);return d().catch(b)})};let E;function q(o){var A,w,x;if(!o||Object.keys(o).length===0){console.error("Portfolio data not loaded or empty."),document.getElementById("content-pane").innerHTML=`
            <div class="section-content">
                <h1>Error: Portfolio Data Not Found</h1>
                <div class="desc">The portfolio data could not be loaded.</div>
            </div>
        `;return}function d(e){if(!e)return[];let t=[];return Object.keys(e).forEach(n=>{Array.isArray(e[n])&&e[n].forEach(i=>{t.push({category:n,name:typeof i=="object"?i.name:i,description:typeof i=="object"&&i.description||""})})}),t}const h=d(o.skills),k=document.getElementById("skills-list");if(k){let e='<li data-section="skills-all">All Skills</li>';h.forEach((n,i)=>{e+=`<li data-skill-index="${i}">${n.name}</li>`}),k.innerHTML=e,k.querySelectorAll("li[data-skill-index]").forEach(n=>{n.addEventListener("click",function(i){i.preventDefault();const c=parseInt(this.getAttribute("data-skill-index"));g(c)})})}function g(e){if(e<0||e>=h.length)return;const t=h[e],n=`skill-${e}`;r[n]={title:`Skill: ${t.name}`,content:`
                <div class="section-content">
                    <h1>${t.name}</h1>
                    <div class="skill-category-label">Category: ${t.category.charAt(0).toUpperCase()+t.category.slice(1)}</div>
                    ${t.description?`
                    <div class="skill-description-section">
                        <h2>Description</h2>
                        <div class="desc">${t.description}</div>
                    </div>`:'<div class="desc">No description available for this skill.</div>'}
                </div>
            `},document.querySelectorAll(".left-pane .list li").forEach(s=>s.classList.remove("active"));const c=document.querySelector(`.left-pane .list li[data-skill-index="${e}"]`);c&&c.classList.add("active"),u.innerHTML=r[n].content,document.querySelector(".terminal-bar").textContent=r[n].title}const b=o.quotes?o.quotes[Math.floor(Math.random()*o.quotes.length)]:"Code is poetry.",r={home:{title:"Home",content:`
                <div class="ascii-art">
                    ██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
                    ██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
                    ███████║█████╗  ██║     ██║     ██║   ██║    ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
                    ██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
                    ██║  ██║███████╗███████╗███████╗╚██████╔╝     ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
                    ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ 
                </div>
                <div class="desc">
                    Hi, I'm <span class="keyword">${((A=o.personal)==null?void 0:A.name)||"Dhruv"}</span> 👋<br>
                </div>
                <div class="desc">
                    I'm a <span class="keyword">${((w=o.personal)==null?void 0:w.title)||"Software Developer"}</span> based in <span class="keyword">${((x=o.personal)==null?void 0:x.location)||"United States"}</span>.
                </div>
                <div class="desc">
                    Click on a selection on the left to learn more about my work.<br>
                    You can also <span class="keyword">navigate</span> through the sections using the <span class="highlight">arrow keys</span>.
                </div>
                <div class="quote">
                    "${b}"
                </div>
            `},"proj-1":{title:"Projects",content:$(o.projects&&o.projects.length>0?o.projects[0]:null)},"skills-all":{title:"Skills & Tools",content:a(o.skills||{})},"exp-1":{title:"Experience",content:l(o.experience&&o.experience.length>0?o.experience[0]:null,"experience")},"exp-2":{title:"Experience",content:l(o.experience&&o.experience.length>1?o.experience[1]:null,"experience")},"edu-1":{title:"Education",content:l(o.education&&o.education.length>0?o.education[0]:null,"education")}};function l(e,t){return e?t==="experience"?`
                <div class="section-content">
                    <h1>${e.company||"Company"}</h1>
                    <div class="position">${e.position||"Position"}</div>
                    <div class="period">${e.period||"Period"}</div>
                    <div class="desc">${e.description||"No description available."}</div>
                    ${e.technologies&&Array.isArray(e.technologies)?`
                    <div class="tech-list">
                        <span class="label">Technologies:</span>
                        ${e.technologies.map(n=>`<span class="tech-badge">${n}</span>`).join(" ")}
                    </div>`:""}
                </div>
            `:`
                <div class="section-content">
                    <h1>${e.institution||"Institution"}</h1>
                    <div class="position">${e.degree||"Degree"}</div>
                    <div class="period">${e.period||"Period"}</div>
                    ${e.description?`<div class="desc">${e.description}</div>`:""}
                </div>
            `:`
                <div class="section-content">
                    <h1>${t.charAt(0).toUpperCase()+t.slice(1)}</h1>
                    <div class="desc">Information not available.</div>
                </div>
            `}function $(e){return e?`
            <div class="section-content">
                <h1>${e.name||"Unnamed Project"}</h1>
                <div class="desc">${e.description||"No description available."}</div>
                ${e.technologies&&Array.isArray(e.technologies)?`
                <div class="tech-list">
                    <span class="label">Technologies:</span>
                    ${e.technologies.map(t=>`<span class="tech-badge">${t}</span>`).join(" ")}
                </div>`:""}
                <div class="links">
                    ${e.github?`<a href="${e.github}" target="_blank" class="link">GitHub</a>`:""}
                    ${e.link?`<a href="${e.link}" target="_blank" class="link">Live Demo</a>`:""}
                </div>
            </div>
        `:`
                <div class="section-content">
                    <h1>Project</h1>
                    <div class="desc">Project information not available.</div>
                </div>
            `}function a(e){return!e||Object.keys(e).length===0?`
                <div class="section-content">
                    <h1>Skills & Tools</h1>
                    <div class="desc">No skills information available.</div>
                </div>
            `:`
            <div class="section-content">
                <h1>Skills & Tools</h1>
                ${Object.keys(e).map(n=>{const i=e[n];if(!Array.isArray(i)||i.length===0)return`
                    <div class="skill-category">
                        <h2>${n.charAt(0).toUpperCase()+n.slice(1)}</h2>
                        <div class="skills-list">
                            <div class="desc">No skills found in this category.</div>
                        </div>
                    </div>
                `;const c=i.map(s=>{const v=h.findIndex(y=>typeof s=="object"&&y.name===s.name||typeof s=="string"&&y.name===s);return typeof s=="object"&&s.name?`
                        <div class="skill-item" data-skill-index="${v!==-1?v:""}" role="button" tabindex="0">
                            <span class="skill-name">${s.name}</span>
                            <span class="skill-description">${s.description||""}</span>
                        </div>
                    `:typeof s=="string"?`
                        <div class="skill-item" data-skill-index="${v!==-1?v:""}" role="button" tabindex="0">
                            <span class="skill-name">${s}</span>
                        </div>
                    `:""}).join("");return`
                <div class="skill-category">
                    <h2>${n.charAt(0).toUpperCase()+n.slice(1)}</h2>
                    <div class="skills-list">
                        ${c}
                    </div>
                </div>
            `}).join("")}
            </div>
        `}const p=document.getElementById("toggle-gui"),u=document.getElementById("content-pane");function f(){window!==window.parent?window.parent.document.getElementById("toggle-view").click():window.location.replace("./")}function m(e){document.querySelectorAll(".left-pane .list li").forEach(i=>i.classList.remove("active"));const n=document.querySelector(`.left-pane .list li[data-section="${e}"]`);n&&n.classList.add("active"),r[e]?(e==="skills-all"&&(r[e].content=a(o.skills||{})),u.innerHTML=r[e].content,document.querySelector(".terminal-bar").textContent=r[e].title,S()):u.innerHTML=`
                <div class="section-content">
                    <h1>Section Not Found</h1>
                    <div class="desc">The section "${e}" was not found.</div>
                </div>
            `}function S(){document.querySelectorAll(".skill-item[data-skill-index]").forEach(t=>{const n=parseInt(t.getAttribute("data-skill-index"));isNaN(n)||(t.addEventListener("click",function(i){i.preventDefault(),g(n)}),t.addEventListener("keydown",function(i){(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),g(n))}))})}function T(e){console.log("Keyboard event:",e.key),(e.key==="ArrowUp"||e.key==="ArrowDown")&&(e.preventDefault(),P(e.key)),(e.key==="ArrowLeft"||e.key==="ArrowRight")&&(e.preventDefault(),C(e.key)),["1","2","3","4","5"].includes(e.key)&&(e.preventDefault(),D(e.key))}function P(e){const t=document.querySelector(".left-pane .list li.active");if(t){const n=t.parentElement,i=Array.from(n.querySelectorAll("li")),c=i.indexOf(t);let s;e==="ArrowUp"?s=(c-1+i.length)%i.length:s=(c+1)%i.length;const v=i[s].getAttribute("data-section");v&&m(v)}}function C(e){const t=Array.from(document.querySelectorAll(".left-pane .section")),n=document.querySelector(".left-pane .list li.active");if(n){const i=n.closest(".section"),c=t.indexOf(i);let s;e==="ArrowLeft"?s=(c-1+t.length)%t.length:s=(c+1)%t.length;const v=t[s];if(v){const y=v.querySelector(".list li");if(y){const L=y.getAttribute("data-section");L&&m(L)}}}}function D(e){const t=parseInt(e)-1,n=document.querySelectorAll(".left-pane .section");if(t<n.length){const c=n[t].querySelector(".list li");if(c){const s=c.getAttribute("data-section");s&&m(s)}}}p&&p.addEventListener("click",f),document.addEventListener("keydown",T),document.querySelectorAll(".left-pane .list li").forEach(e=>{const t=e.getAttribute("data-section");t&&e.addEventListener("click",function(n){n.preventDefault(),m(t)})}),new MutationObserver(S).observe(u,{childList:!0}),m("home")}document.addEventListener("DOMContentLoaded",function(){if(window.portfolioData)E=window.portfolioData,q(E);else try{N(()=>import("./portfolio-data-CH7lOtUs.js"),[]).then(d=>{E=d.default,q(E)}).catch(d=>{console.error("Failed to load portfolio data as module:",d),document.getElementById("content-pane").innerHTML=`
                        <div class="section-content">
                            <h1>Error: Portfolio Data Not Found</h1>
                            <div class="desc">The portfolio data could not be loaded. Error: ${d.message}</div>
                        </div>
                    `})}catch(d){console.error("Error loading portfolio data:",d),document.getElementById("content-pane").innerHTML=`
                <div class="section-content">
                    <h1>Error: Portfolio Data Not Found</h1>
                    <div class="desc">The portfolio data could not be loaded. Check the console for details.</div>
                </div>
            `}const o=document.querySelector("main.right-pane");o&&(o.setAttribute("tabindex","-1"),o.focus())});
