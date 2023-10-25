!function(){let t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=()=>document.querySelector("body").style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,o=null;t.addEventListener("click",()=>{o=setInterval(n,1e3),t.style.pointerEvents="none"}),e.addEventListener("click",()=>{clearInterval(o),t.style.pointerEvents="auto"})}();//# sourceMappingURL=01-color-switcher.a6892812.js.map

//# sourceMappingURL=01-color-switcher.a6892812.js.map
