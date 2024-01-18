import{d as i,e as u,f as d,g as p,j as g,u as s,k as x,as as j,at as B,s as e,q as a,l as m,v as _,a8 as $,m as b,_ as E,A as N,B as T,t as z}from"./index-2zA7zw5J.js";import{z as f,t as A,a as D,F as y,_ as v,b as L,c as P,d as C}from"./vee-validate-zod.esm-X451jkPL.js";import{a as M,_ as q}from"./CardContent.vue_vue_type_script_setup_true_lang-o-eKXw7x.js";const H=i({__name:"CardHeader",props:{class:{type:String,default:""}},setup(o){const l=o;return(t,r)=>(u(),d("div",{class:g(s(x)("flex flex-col space-y-1.5 p-6",l.class))},[p(t.$slots,"default")],2))}}),U=i({__name:"CardTitle",props:{class:{type:String,default:""}},setup(o){const l=o;return(t,r)=>(u(),d("h3",{class:g(s(x)("text-2xl font-semibold leading-none tracking-tighter",l.class))},[p(t.$slots,"default")],2))}}),G=i({__name:"CardFooter",props:{class:{type:String,default:""}},setup(o){const l=o;return(t,r)=>(u(),d("div",{class:g(s(x)("p-6 pt-0",l.class))},[p(t.$slots,"default")],2))}}),I=f.object({email:f.string().email(),password:f.string().min(8,{message:"Password must be at least 8 characters long."})}),J=A(I),K={class:"h-screen flex justify-center items-center"},O=m("span",null," Login ",-1),X=i({__name:"LoginView",setup(o){const l=j(),{isPending:t,isError:r,error:k,mutateAsync:F}=l.useLoginMutation(),{handleSubmit:V}=D({validationSchema:J}),h=V(async w=>{const{email:c,password:n}=w,S=await F({username:c,password:n});S.status===200&&S.data.token&&B.push("/")});return(w,c)=>(u(),d("div",K,[e(s(q),{class:"w-[350px]"},{default:a(()=>[m("form",{onSubmit:c[0]||(c[0]=(...n)=>s(h)&&s(h)(...n))},[e(s(H),{class:"text-center"},{default:a(()=>[e(s(U),null,{default:a(()=>[_("Login Form")]),_:1})]),_:1}),e(s(M),{class:"flex flex-col gap-4"},{default:a(()=>[e(s(y),{name:"email"},{default:a(({componentField:n})=>[e(s(v),null,{default:a(()=>[e(s(L),null,{default:a(()=>[_("Email")]),_:1}),e(s(P),null,{default:a(()=>[e(s($),b({type:"text",placeholder:"Please input email"},n),null,16)]),_:2},1024),e(s(C))]),_:2},1024)]),_:1}),e(s(y),{name:"password"},{default:a(({componentField:n})=>[e(s(v),null,{default:a(()=>[e(s(L),null,{default:a(()=>[_("Password")]),_:1}),e(s(P),null,{default:a(()=>[e(s($),b({type:"password",placeholder:"Please input Password"},n),null,16)]),_:2},1024),e(s(C))]),_:2},1024)]),_:1})]),_:1}),e(s(G),{class:"flex flex-col gap-4 justify-between px-6 pb-4"},{default:a(()=>[e(s(E),{class:"w-full",disabled:s(t),isLoading:s(t)},{default:a(()=>[O]),_:1},8,["disabled","isLoading"]),N(m("p",{class:"text-center text-red-400 font-bold"},z(s(k)),513),[[T,s(r)]])]),_:1})],32)]),_:1})]))}});export{X as default};
