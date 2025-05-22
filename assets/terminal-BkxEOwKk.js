import"./portfolio-data-CH7lOtUs.js";const H="modulepreload",j=function(s){return"/"+s},I={},N=function(E,v,y){let p=Promise.resolve();if(v&&v.length>0){let r=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(l=>({status:"fulfilled",value:l}),l=>({status:"rejected",reason:l}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),L=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));p=r(v.map(u=>{if(u=j(u),u in I)return;I[u]=!0;const f=u.endsWith(".css"),l=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${l}`))return;const m=document.createElement("link");if(m.rel=f?"stylesheet":H,f||(m.as="script"),m.crossOrigin="",m.href=u,L&&m.setAttribute("nonce",L),document.head.appendChild(m),f)return new Promise((g,$)=>{m.addEventListener("load",g),m.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${u}`)))})}))}function b(r){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=r,window.dispatchEvent(c),!c.defaultPrevented)throw r}return p.then(r=>{for(const c of r||[])c.status==="rejected"&&b(c.reason);return E().catch(b)})};let S;function T(s){var A,w,x;if(!s||Object.keys(s).length===0){console.error("Portfolio data not loaded or empty."),document.getElementById("content-pane").innerHTML=`
            <div class="section-content">
                <h1>Error: Portfolio Data Not Found</h1>
                <div class="desc">The portfolio data could not be loaded.</div>
            </div>
        `;return}function E(e){if(!e)return[];let t=[];return Object.keys(e).forEach(i=>{Array.isArray(e[i])&&e[i].forEach(n=>{t.push({category:i,name:typeof n=="object"?n.name:n,description:typeof n=="object"&&n.description||""})})}),t}const v=E(s.skills),y=document.getElementById("skills-list");if(y){let e='<li data-section="skills-all">All Skills</li>';v.forEach((i,n)=>{e+=`<li data-skill-index="${n}">${i.name}</li>`}),y.innerHTML=e,y.querySelectorAll("li[data-skill-index]").forEach(i=>{i.addEventListener("click",function(n){n.preventDefault();const a=parseInt(this.getAttribute("data-skill-index"));p(a)})})}function p(e){if(e<0||e>=v.length)return;const t=v[e],i=`skill-${e}`;r[i]={title:`Skill: ${t.name}`,content:`
                <div class="section-content">
                    <h1>${t.name}</h1>
                    <div class="skill-category-label">Category: ${t.category.charAt(0).toUpperCase()+t.category.slice(1)}</div>
                    ${t.description?`
                    <div class="skill-description-section">
                        <h2>Description</h2>
                        <div class="desc">${t.description}</div>
                    </div>`:'<div class="desc">No description available for this skill.</div>'}
                </div>
            `},document.querySelectorAll(".left-pane .list li").forEach(o=>o.classList.remove("active"));const a=document.querySelector(`.left-pane .list li[data-skill-index="${e}"]`);a&&(a.classList.add("active"),a.classList.add("item-selected-animation"),setTimeout(()=>{a.classList.remove("item-selected-animation")},300)),l.classList.add("content-fade-out"),setTimeout(()=>{l.innerHTML=r[i].content,document.querySelector(".terminal-bar").textContent=r[i].title,l.classList.remove("content-fade-out"),l.classList.add("content-fade-in"),setTimeout(()=>{l.classList.remove("content-fade-in")},300)},150)}const b=s.quotes?s.quotes[Math.floor(Math.random()*s.quotes.length)]:"Code is poetry.",r={home:{title:"Home",content:`
                <div class="ascii-art">
                    ██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
                    ██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
                    ███████║█████╗  ██║     ██║     ██║   ██║    ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
                    ██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
                    ██║  ██║███████╗███████╗███████╗╚██████╔╝     ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
                    ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ 
                </div>
                <div class="desc">
                    Hi, I'm <span class="keyword">${((A=s.personal)==null?void 0:A.name)||"Dhruv"}</span> 👋<br>
                </div>
                <div class="desc">
                    I'm a <span class="keyword">${((w=s.personal)==null?void 0:w.title)||"Software Developer"}</span> based in <span class="keyword">${((x=s.personal)==null?void 0:x.location)||"United States"}</span>.
                </div>
                <div class="desc">
                    Click on a selection on the left to learn more about my work.<br>
                    You can also <span class="keyword">navigate</span> through the sections using the <span class="highlight">arrow keys</span>.
                </div>
                <div class="quote">
                    "${b}"
                </div>
            `},"proj-1":{title:"Projects",content:L(s.projects&&s.projects.length>0?s.projects[0]:null)},"skills-all":{title:"Skills & Tools",content:u(s.skills||{})},"exp-1":{title:"Experience",content:c(s.experience&&s.experience.length>0?s.experience[0]:null,"experience")},"exp-2":{title:"Experience",content:c(s.experience&&s.experience.length>1?s.experience[1]:null,"experience")},"edu-1":{title:"Education",content:c(s.education&&s.education.length>0?s.education[0]:null,"education")}};function c(e,t){return e?t==="experience"?`
                <div class="section-content">
                    <h1>${e.company||"Company"}</h1>
                    <div class="position">${e.position||"Position"}</div>
                    <div class="period">${e.period||"Period"}</div>
                    <div class="desc">${e.description||"No description available."}</div>
                    ${e.technologies&&Array.isArray(e.technologies)?`
                    <div class="tech-list">
                        <span class="label">Technologies:</span>
                        ${e.technologies.map(i=>`<span class="tech-badge">${i}</span>`).join(" ")}
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
            `}function L(e){return e?`
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
            `}function u(e){return!e||Object.keys(e).length===0?`
                <div class="section-content">
                    <h1>Skills & Tools</h1>
                    <div class="desc">No skills information available.</div>
                </div>
            `:`
            <div class="section-content">
                <h1>Skills & Tools</h1>
                ${Object.keys(e).map(i=>{const n=e[i];if(!Array.isArray(n)||n.length===0)return`
                    <div class="skill-category">
                        <h2>${i.charAt(0).toUpperCase()+i.slice(1)}</h2>
                        <div class="skills-list">
                            <div class="desc">No skills found in this category.</div>
                        </div>
                    </div>
                `;const a=n.map(o=>{const d=v.findIndex(h=>typeof o=="object"&&h.name===o.name||typeof o=="string"&&h.name===o);return typeof o=="object"&&o.name?`
                        <div class="skill-item" data-skill-index="${d!==-1?d:""}" role="button" tabindex="0">
                            <span class="skill-name">${o.name}</span>
                            <span class="skill-description">${o.description||""}</span>
                        </div>
                    `:typeof o=="string"?`
                        <div class="skill-item" data-skill-index="${d!==-1?d:""}" role="button" tabindex="0">
                            <span class="skill-name">${o}</span>
                        </div>
                    `:""}).join("");return`
                <div class="skill-category">
                    <h2>${i.charAt(0).toUpperCase()+i.slice(1)}</h2>
                    <div class="skills-list">
                        ${a}
                    </div>
                </div>
            `}).join("")}
            </div>
        `}const f=document.getElementById("toggle-gui"),l=document.getElementById("content-pane");function m(){window!==window.parent?window.parent.document.getElementById("toggle-view").click():window.location.replace("./")}function g(e){document.querySelectorAll(".left-pane .list li").forEach(n=>n.classList.remove("active"));const i=document.querySelector(`.left-pane .list li[data-section="${e}"]`);i&&(i.classList.add("active"),i.classList.add("item-selected-animation"),setTimeout(()=>{i.classList.remove("item-selected-animation")},300)),r[e]?(e==="skills-all"&&(r[e].content=u(s.skills||{})),l.classList.add("content-fade-out"),setTimeout(()=>{l.innerHTML=r[e].content,document.querySelector(".terminal-bar").textContent=r[e].title,$(),l.classList.remove("content-fade-out"),l.classList.add("content-fade-in"),setTimeout(()=>{l.classList.remove("content-fade-in")},300)},150)):l.innerHTML=`
                <div class="section-content">
                    <h1>Section Not Found</h1>
                    <div class="desc">The section "${e}" was not found.</div>
                </div>
            `}function $(){document.querySelectorAll(".skill-item[data-skill-index]").forEach(t=>{const i=parseInt(t.getAttribute("data-skill-index"));isNaN(i)||(t.addEventListener("click",function(n){n.preventDefault(),this.classList.add("item-selected-animation"),setTimeout(()=>{this.classList.remove("item-selected-animation")},300),p(i)}),t.addEventListener("keydown",function(n){(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),this.classList.add("item-selected-animation"),setTimeout(()=>{this.classList.remove("item-selected-animation")},300),p(i))}))})}function q(e){(e.key==="ArrowUp"||e.key==="ArrowDown")&&(e.preventDefault(),P(e.key)),(e.key==="ArrowLeft"||e.key==="ArrowRight")&&(e.preventDefault(),C(e.key)),["1","2","3","4","5"].includes(e.key)&&(e.preventDefault(),D(e.key))}function P(e){const t=document.querySelector(".left-pane .list li.active");if(t){const i=t.parentElement,n=Array.from(i.querySelectorAll("li")),a=n.indexOf(t);let o;e==="ArrowUp"?o=(a-1+n.length)%n.length:o=(a+1)%n.length;const d=n[o];if(d){const h=d.getAttribute("data-section"),k=d.getAttribute("data-skill-index");h?g(h):k!==null&&p(parseInt(k)),d.classList.add("item-selected-animation"),setTimeout(()=>{d.classList.remove("item-selected-animation")},300)}}}function C(e){const t=Array.from(document.querySelectorAll(".left-pane .section")),i=document.querySelector(".left-pane .list li.active");if(i){const n=i.closest(".section"),a=t.indexOf(n);let o;e==="ArrowLeft"?o=(a-1+t.length)%t.length:o=(a+1)%t.length;const d=t[o];d.classList.add("section-highlight"),setTimeout(()=>{d.classList.remove("section-highlight")},300);const h=d.querySelector(".list li");if(h){const k=h.getAttribute("data-section");k&&g(k)}}}function D(e){const t=parseInt(e)-1,i=document.querySelectorAll(".left-pane .section");if(t<i.length){const n=i[t];n.classList.add("section-highlight"),setTimeout(()=>{n.classList.remove("section-highlight")},300);const a=n.querySelector(".list li");if(a){const o=a.getAttribute("data-section");o&&g(o)}}}f&&f.addEventListener("click",m),document.addEventListener("keydown",q),document.querySelectorAll(".left-pane .list li").forEach(e=>{const t=e.getAttribute("data-section");t&&e.addEventListener("click",function(i){i.preventDefault(),this.classList.add("item-selected-animation"),setTimeout(()=>{this.classList.remove("item-selected-animation")},300),g(t)})}),new MutationObserver($).observe(l,{childList:!0}),g("home")}document.addEventListener("DOMContentLoaded",function(){if(window.portfolioData)S=window.portfolioData,T(S);else try{N(()=>import("./portfolio-data-CH7lOtUs.js"),[]).then(s=>{S=s.default,T(S)}).catch(s=>{console.error("Failed to load portfolio data as module:",s),document.getElementById("content-pane").innerHTML=`
                        <div class="section-content">
                            <h1>Error: Portfolio Data Not Found</h1>
                            <div class="desc">The portfolio data could not be loaded. Error: ${s.message}</div>
                        </div>
                    `})}catch(s){console.error("Error loading portfolio data:",s),document.getElementById("content-pane").innerHTML=`
                <div class="section-content">
                    <h1>Error: Portfolio Data Not Found</h1>
                    <div class="desc">The portfolio data could not be loaded. Check the console for details.</div>
                </div>
            `}});
