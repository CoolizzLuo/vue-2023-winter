import{V as c,X as v,a2 as _,m as l,p as i,q as d,x as u,y as p,z as f,A as m}from"./index-EzXUd7hd.js";const a=new WeakMap,g=(e,t)=>{var n;const s=(n=c())==null?void 0:n.proxy;if(s==null)throw new Error("provideLocal must be called in setup");a.has(s)||a.set(s,Object.create(null));const o=a.get(s);o[e]=t,v(e,t)},y=(...e)=>{var t;const n=e[0],s=(t=c())==null?void 0:t.proxy;if(s==null)throw new Error("injectLocal must be called in setup");return a.has(s)&&n in a.get(s)?a.get(s)[n]:_(...e)};function j(e,t){const n=(t==null?void 0:t.injectionKey)||Symbol("InjectionState");return[(...S)=>{const r=e(...S);return g(n,r),r},()=>y(n)]}typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const h=e=>typeof e<"u",k=l({__name:"Card",props:{class:{type:String,default:""}},setup(e){const t=e;return(n,s)=>(i(),d("div",{class:p(f(m)("rounded-lg border bg-card text-card-foreground shadow-sm",t.class))},[u(n.$slots,"default")],2))}}),w=l({__name:"CardContent",props:{class:{type:String,default:""}},setup(e){const t=e;return(n,s)=>(i(),d("div",{class:p(f(m)("p-6 pt-0",t.class))},[u(n.$slots,"default")],2))}});export{k as _,w as a,j as c,h as i};
