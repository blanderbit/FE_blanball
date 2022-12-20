import{C as H}from"./InputComponent.d4ffa8e8.js";import{_ as M,b as m,s as K,k as L,E as U,a1 as W,o as h,c as y,e as C,t as w,g as j,S as z,U as O,M as I,B as E,n as R}from"./index.1baec81e.js";const $={class:"code-input"},A={key:0,class:"title"},T=["type","autoFocus","data-id","value","required","disabled"],Y={class:"b-code-input__error-message"},G={__name:"CodeInput",props:{className:String,fields:{type:Number,default:3},fieldWidth:{type:Number,default:56},fieldHeight:{type:Number,default:56},disabled:{type:Boolean,default:!1},required:{type:Boolean,default:!0},type:{type:String,default:"text"},mode:{type:String,default:"aggressive"},name:String,title:String},emits:["change","complete"],setup(d,{emit:B}){const i=d,v={backspace:8,delete:46,left:37,up:38,right:39,down:40},{modelValue:J,modelErrorMessage:b,modelHandlers:g}=H(i),a=m([]),f=m([]),c=m([]),r=K(i,"fields"),_=m(0),D=()=>{let e;if(a.value&&a.value.length){e=[];for(let t=0;t<r.value;t++)e.push(a.value[t]||"");_.value=a.value.length>=r.value?0:a.value.length}else e=Array(r.value).fill("");f.value=[];for(let t=0;t<r.value;t++)f.value.push(t+1);a.value=e},N=e=>{e.target.select(e)},S=e=>{const t=parseInt(e.target.dataset.id),o=i.type==="number"?"[0-9]":"";if(e.target.value===""||(o?o.match(e.target.value):!1))return;let s;const n=e.target.value;if(a.value=Object.assign([],a.value),n.length>1){let u=n.length+t-1;u>=r.value&&(u=r.value-1),s=f.value[u],n.split("").forEach((V,q)=>{const k=t+q;k<r.value&&(a.value[k]=V)})}else s=f.value[t+1],a.value[t]=n;if(s){const u=c.value[s];u.focus(),u.select()}p(a.value)},F=e=>{const t=parseInt(e.target.dataset.id),o=t-1,s=t+1,n=f.value[o],u=f.value[s];switch(e.keyCode){case v.backspace:{e.preventDefault();const l=[...a.value];a.value[t]?(l[t]="",a.value=l,p(l)):n&&(l[o]="",c.value[n].focus(),a.value=l,p(l));break}case v.delete:{e.preventDefault();const l=[...a.value];a.value[t]?(l[t]="",a.value=l,p(l)):u&&(l[s]="",c.value[u].focus(),a.value=l,p(l));break}case v.left:e.preventDefault(),n&&c.value[n].focus();break;case v.right:e.preventDefault(),u&&c.value[u].focus();break;case v.up:case v.down:e.preventDefault();break}};function x(){navigator.clipboard.readText().then(e=>{e.split("").filter((t,o)=>o<5).forEach((t,o)=>a.value[o]=t)}).catch(e=>{console.log("\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u0437\u044F\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0438\u0437 \u0431\u0443\u0444\u0444\u0435\u0440\u0430",e)})}L(()=>{window.addEventListener("paste",x)}),U(()=>{window.removeEventListener("paste",x)}),g.value.input[0](""),g.value.input[1]("",!1);const p=(e=e.value)=>{const t=e.join("");g.value.input[0](t),g.value.input[1](t,!0),B("complete",t.length>=r.value)};return D(),W(()=>{c.value=[]}),(e,t)=>(h(),y("div",{class:I({"code-input-container":!0,[d.className]:!!d.className})},[C("div",$,[d.title?(h(),y("p",A,w(d.title),1)):j("",!0),(h(!0),y(z,null,O(a.value,(o,s)=>(h(),y("input",{key:s,class:I(["w-14 h-14 rounded-lg border border-gray outline-none focus:outline-none focus:border-primary focus:ring-0 text-center transition-all",{"b-form-error":E(b)}]),placeholder:"\u2014",type:d.type,style:R({width:`${i.fieldWidth}px`,height:`${i.fieldHeight}px`}),autoFocus:s===_.value,"data-id":s,value:o,ref_for:!0,ref:n=>{n&&(c.value[s+1]=n)},onInput:S,onFocus:N,onKeydown:F,required:i.required,disabled:i.disabled,maxlength:"1"},null,46,T))),128))]),C("p",Y,w(E(b)),1)],2))}},X=M(G,[["__scopeId","data-v-952e9a73"]]);export{X as C};
