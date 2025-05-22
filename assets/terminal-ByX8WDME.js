import"./portfolio-data-C48hvdeD.js";const j="modulepreload",N=function(i){return"/"+i},q={},O=function(k,v,S){let y=Promise.resolve();if(v&&v.length>0){let m=function(a){return Promise.all(a.map(h=>Promise.resolve(h).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),f=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));y=m(v.map(a=>{if(a=N(a),a in q)return;q[a]=!0;const h=a.endsWith(".css"),p=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${p}`))return;const u=document.createElement("link");if(u.rel=h?"stylesheet":j,h||(u.as="script"),u.crossOrigin="",u.href=a,f&&u.setAttribute("nonce",f),document.head.appendChild(u),h)return new Promise((r,w)=>{u.addEventListener("load",r),u.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${a}`)))})}))}function L(m){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=m,window.dispatchEvent(c),!c.defaultPrevented)throw m}return y.then(m=>{for(const c of m||[])c.status==="rejected"&&L(c.reason);return k().catch(L)})};let $;function D(i){var T,x,I;if(!i||Object.keys(i).length===0){console.error("Portfolio data not loaded or empty."),document.getElementById("content-pane").innerHTML=`
            <div class="section-content">
                <h1>Error: Portfolio Data Not Found</h1>
                <div class="desc">The portfolio data could not be loaded.</div>
            </div>
        `;return}setTimeout(()=>{document.documentElement.classList.add("content-loaded")},50);const k=window!==window.parent,v=document.getElementById("standalone-toggle");v&&(v.style.display=k?"none":"block");function S(e){if(!e)return[];let t=[];return Object.keys(e).forEach(n=>{Array.isArray(e[n])&&e[n].forEach(s=>{t.push({category:n,name:typeof s=="object"?s.name:s,description:typeof s=="object"&&s.description||""})})}),t}const y=S(i.skills),L=document.getElementById("skills-list");if(L){let e='<li data-section="skills-all">All Skills</li>';y.forEach((n,s)=>{e+=`<li data-skill-index="${s}">${n.name}</li>`}),L.innerHTML=e,L.querySelectorAll("li[data-skill-index]").forEach(n=>{n.addEventListener("click",function(s){s.preventDefault();const l=parseInt(this.getAttribute("data-skill-index"));m(l)})})}function m(e){if(e<0||e>=y.length)return;const t=y[e],n=`skill-${e}`;f[n]={title:`Skill: ${t.name}`,content:`
                <div class="section-content">
                    <h1>${t.name}</h1>
                    <div class="skill-category-label">Category: ${t.category.charAt(0).toUpperCase()+t.category.slice(1)}</div>
                    ${t.description?`
                    <div class="skill-description-section">
                        <h2>Description</h2>
                        <div class="desc">${t.description}</div>
                    </div>`:'<div class="desc">No description available for this skill.</div>'}
                </div>
            `},document.querySelectorAll(".left-pane .list li").forEach(o=>o.classList.remove("active"));const l=document.querySelector(`.left-pane .list li[data-skill-index="${e}"]`);l&&(l.classList.add("active"),l.classList.add("item-selected-animation"),setTimeout(()=>{l.classList.remove("item-selected-animation")},300)),r.classList.add("content-fade-out"),setTimeout(()=>{r.innerHTML=f[n].content,document.querySelector(".terminal-bar").textContent=f[n].title,r.classList.remove("content-fade-out"),r.classList.add("content-fade-in"),setTimeout(()=>{r.classList.remove("content-fade-in")},300)},150)}const c=i.quotes?i.quotes[Math.floor(Math.random()*i.quotes.length)]:"Code is poetry.",f={home:{title:"Home",content:`
                <div class="ascii-art">
                    ██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
                    ██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
                    ███████║█████╗  ██║     ██║     ██║   ██║    ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
                    ██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
                    ██║  ██║███████╗███████╗███████╗╚██████╔╝     ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
                    ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ 
                </div>
                <div class="desc">
                    Hi, I'm <span class="keyword">${((T=i.personal)==null?void 0:T.name)||"Dhruv"}</span> 👋<br>
                </div>
                <div class="desc">
                    I'm a <span class="keyword">${((x=i.personal)==null?void 0:x.title)||"Software Developer"}</span> based in <span class="keyword">${((I=i.personal)==null?void 0:I.location)||"United States"}</span>.
                </div>
                <div class="desc">
                    Click on a selection on the left to learn more about my work.<br>
                    You can also <span class="keyword">navigate</span> through the sections using the <span class="highlight">arrow keys</span>.
                </div>
                <div class="quote">
                    "${c}"
                </div>
            `},"proj-1":{title:"Projects",content:h(i.projects&&i.projects.length>0?i.projects[0]:null)},"skills-all":{title:"Skills & Tools",content:p(i.skills||{})},"exp-1":{title:"Experience",content:a(i.experience&&i.experience.length>0?i.experience[0]:null,"experience")},"exp-2":{title:"Experience",content:a(i.experience&&i.experience.length>1?i.experience[1]:null,"experience")},"edu-1":{title:"Education",content:a(i.education&&i.education.length>0?i.education[0]:null,"education")}};function a(e,t){return e?t==="experience"?`
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
            `}function h(e){return e?`
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
            `}function p(e){return!e||Object.keys(e).length===0?`
                <div class="section-content">
                    <h1>Skills & Tools</h1>
                    <div class="desc">No skills information available.</div>
                </div>
            `:`
            <div class="section-content">
                <h1>Skills & Tools</h1>
                ${Object.keys(e).map(n=>{const s=e[n];if(!Array.isArray(s)||s.length===0)return`
                    <div class="skill-category">
                        <h2>${n.charAt(0).toUpperCase()+n.slice(1)}</h2>
                        <div class="skills-list">
                            <div class="desc">No skills found in this category.</div>
                        </div>
                    </div>
                `;const l=s.map(o=>{const d=y.findIndex(g=>typeof o=="object"&&g.name===o.name||typeof o=="string"&&g.name===o);return typeof o=="object"&&o.name?`
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
                    <h2>${n.charAt(0).toUpperCase()+n.slice(1)}</h2>
                    <div class="skills-list">
                        ${l}
                    </div>
                </div>
            `}).join("")}
            </div>
        `}const u=document.getElementById("toggle-gui"),r=document.getElementById("content-pane");function w(e){var t;if(e.preventDefault(),u.classList.add("button-pressed"),setTimeout(()=>u.classList.remove("button-pressed"),200),window!==window.parent)try{window.parent.toggleView(e)}catch{(t=window.parent.document.getElementById("toggle-view"))==null||t.click()}else window.location.href="./"}function b(e){document.querySelectorAll(".left-pane .list li").forEach(s=>s.classList.remove("active"));const n=document.querySelector(`.left-pane .list li[data-section="${e}"]`);n&&(n.classList.add("active"),n.classList.add("item-selected-animation"),setTimeout(()=>{n.classList.remove("item-selected-animation")},300)),f[e]?(e==="skills-all"&&(f[e].content=p(i.skills||{})),r.classList.add("content-fade-out"),setTimeout(()=>{r.innerHTML=f[e].content,document.querySelector(".terminal-bar").textContent=f[e].title,A(),r.classList.remove("content-fade-out"),r.classList.add("content-fade-in"),setTimeout(()=>{r.classList.remove("content-fade-in")},300)},150)):r.innerHTML=`
                <div class="section-content">
                    <h1>Section Not Found</h1>
                    <div class="desc">The section "${e}" was not found.</div>
                </div>
            `}function A(){document.querySelectorAll(".skill-item[data-skill-index]").forEach(t=>{const n=parseInt(t.getAttribute("data-skill-index"));isNaN(n)||(t.addEventListener("click",function(s){s.preventDefault(),this.classList.add("item-selected-animation"),setTimeout(()=>{this.classList.remove("item-selected-animation")},300),m(n)}),t.addEventListener("keydown",function(s){(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),this.classList.add("item-selected-animation"),setTimeout(()=>{this.classList.remove("item-selected-animation")},300),m(n))}))})}function P(e){(e.key==="ArrowUp"||e.key==="ArrowDown")&&(e.preventDefault(),C(e.key)),(e.key==="ArrowLeft"||e.key==="ArrowRight")&&(e.preventDefault(),B(e.key)),["1","2","3","4","5"].includes(e.key)&&(e.preventDefault(),H(e.key))}function C(e){const t=document.querySelector(".left-pane .list li.active");if(t){const n=t.parentElement,s=Array.from(n.querySelectorAll("li")),l=s.indexOf(t);let o;e==="ArrowUp"?o=(l-1+s.length)%s.length:o=(l+1)%s.length;const d=s[o];if(d){const g=d.getAttribute("data-section"),E=d.getAttribute("data-skill-index");g?b(g):E!==null&&m(parseInt(E)),d.classList.add("item-selected-animation"),setTimeout(()=>{d.classList.remove("item-selected-animation")},300)}}}function B(e){const t=Array.from(document.querySelectorAll(".left-pane .section")),n=document.querySelector(".left-pane .list li.active");if(n){const s=n.closest(".section"),l=t.indexOf(s);let o;e==="ArrowLeft"?o=(l-1+t.length)%t.length:o=(l+1)%t.length;const d=t[o];d.classList.add("section-highlight"),setTimeout(()=>{d.classList.remove("section-highlight")},300);const g=d.querySelector(".list li");if(g){const E=g.getAttribute("data-section");E&&b(E)}}}function H(e){const t=parseInt(e)-1,n=document.querySelectorAll(".left-pane .section");if(t<n.length){const s=n[t];s.classList.add("section-highlight"),setTimeout(()=>{s.classList.remove("section-highlight")},300);const l=s.querySelector(".list li");if(l){const o=l.getAttribute("data-section");o&&b(o)}}}u&&u.addEventListener("click",w),document.addEventListener("keydown",function(e){e.ctrlKey&&e.shiftKey&&e.key==="T"&&(e.preventDefault(),w(e))}),document.addEventListener("keydown",P),document.querySelectorAll(".left-pane .list li").forEach(e=>{const t=e.getAttribute("data-section");t&&e.addEventListener("click",function(n){n.preventDefault(),this.classList.add("item-selected-animation"),setTimeout(()=>{this.classList.remove("item-selected-animation")},300),b(t)})}),new MutationObserver(A).observe(r,{childList:!0}),b("home")}document.addEventListener("DOMContentLoaded",function(){if(document.documentElement.classList.remove("content-loaded"),setTimeout(()=>{document.documentElement.classList.add("content-loaded")},500),window.portfolioData)$=window.portfolioData,D($);else try{O(()=>import("./portfolio-data-C48hvdeD.js"),[]).then(i=>{$=i.default,D($)}).catch(i=>{console.error("Failed to load portfolio data as module:",i),document.getElementById("content-pane").innerHTML=`
                        <div class="section-content">
                            <h1>Error: Portfolio Data Not Found</h1>
                            <div class="desc">The portfolio data could not be loaded. Error: ${i.message}</div>
                        </div>
                    `})}catch(i){console.error("Error loading portfolio data:",i),document.getElementById("content-pane").innerHTML=`
                <div class="section-content">
                    <h1>Error: Portfolio Data Not Found</h1>
                    <div class="desc">The portfolio data could not be loaded. Check the console for details.</div>
                </div>
            `}});window.addEventListener("message",function(i){if(i.data==="iframe-mode"){console.log("Terminal running in iframe mode");const k=document.getElementById("standalone-toggle");k&&(k.style.display="none");const v=document.getElementById("terminal-toggle-view");v&&v.addEventListener("click",function(){window.parent.postMessage("switch-to-gui","*")}),document.documentElement.classList.contains("content-loaded")||document.documentElement.classList.add("content-loaded")}});
