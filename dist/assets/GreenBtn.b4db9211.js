import{_ as d,L as u,b as g,d as f,j as _,r as y,o as a,c as l,g as s,f as h,t as m,a as b,n as S}from"./index.30b1903a.js";const k={components:{Loading:u},props:{text:{type:String,required:!0},width:{type:Number,default:null},height:{type:Number,default:32},icon:{type:String,default:null},iconRight:{type:String,default:null},backgroundColor:{type:String,default:"#148783"},fontStyles:{type:Object,default:()=>{}},isIconAndTextApart:{type:Boolean,default:!1},loading:{type:Boolean,default:!1}},setup(t){const n=g(!1),e=f(()=>({...t.fontStyles,width:t.width?t.width+"px":"100%",height:t.height+"px",background:t.backgroundColor,"justify-content":"center"}));_(()=>t.loading,c=>{c?o():i()});function o(){n.value=!0}function i(){n.value=!1}return{btnStyle:e}}},x=["src"],p=["src"];function v(t,n,e,o,i,c){const r=y("loading");return a(),l("div",{class:"b-green-btn",style:S(o.btnStyle),onClick:n[0]||(n[0]=B=>t.$emit("click-function"))},[e.icon?(a(),l("img",{key:0,class:"b-green-btn__left-icon",src:e.icon,alt:""},null,8,x)):s("",!0),h(" "+m(e.text)+" ",1),e.iconRight?(a(),l("img",{key:1,class:"b-green-btn__right-icon",src:e.iconRight,alt:""},null,8,p)):s("",!0),b(r,{"is-loading":e.loading},null,8,["is-loading"])],4)}const C=d(k,[["render",v],["__scopeId","data-v-e4317f90"]]);export{C as G};
