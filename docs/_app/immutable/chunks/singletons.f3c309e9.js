import{w as u}from"./index.8aef508f.js";import{a as g}from"./paths.9cdd9b1e.js";const h="1695200598676",E="sveltekit:snapshot",w="sveltekit:scroll",A="sveltekit:index",f={tap:1,hover:2,viewport:3,eager:4,off:-1};function R(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function y(){return{x:pageXOffset,y:pageYOffset}}function i(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const d={...f,"":f.hover};function _(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function I(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=_(e)}}function S(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const s=e instanceof SVGAElement?e.target.baseVal:e.target,l=!n||!!s||v(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),r=(n==null?void 0:n.origin)===location.origin&&e.hasAttribute("download");return{url:n,external:l,target:s,download:r}}function T(e){let t=null,n=null,s=null,l=null,r=null,a=null,o=e;for(;o&&o!==document.documentElement;)s===null&&(s=i(o,"preload-code")),l===null&&(l=i(o,"preload-data")),t===null&&(t=i(o,"keepfocus")),n===null&&(n=i(o,"noscroll")),r===null&&(r=i(o,"reload")),a===null&&(a=i(o,"replacestate")),o=_(o);return{preload_code:d[s??"off"],preload_data:d[l??"off"],keep_focus:t==="off"?!1:t===""?!0:null,noscroll:n==="off"?!1:n===""?!0:null,reload:r==="off"?!1:r===""?!0:null,replace_state:a==="off"?!1:a===""?!0:null}}function p(e){const t=u(e);let n=!0;function s(){n=!0,t.update(a=>a)}function l(a){n=!1,t.set(a)}function r(a){let o;return t.subscribe(c=>{(o===void 0||n&&c!==o)&&a(o=c)})}return{notify:s,set:l,subscribe:r}}function b(){const{set:e,subscribe:t}=u(!1);let n;async function s(){clearTimeout(n);try{const l=await fetch(`${g}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!l.ok)return!1;const a=(await l.json()).version!==h;return a&&(e(!0),clearTimeout(n)),a}catch{return!1}}return{subscribe:t,check:s}}function v(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}function x(e){e.client}const O={url:p({}),page:p({}),navigating:u(null),updated:b()};export{A as I,f as P,w as S,E as a,S as b,T as c,y as d,x as e,I as f,R as g,v as i,O as s};
