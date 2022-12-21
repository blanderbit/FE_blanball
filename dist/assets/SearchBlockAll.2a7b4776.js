import{_ as b,d as k,o as c,c as o,e,t as i,S as n,U as r,M as _,n as u}from"./index.d5b3c164.js";const m={name:"SearchBlockAll",props:{tags:{type:Array,default:()=>[]},filteredTeams:{type:Array,default:()=>[]},listItemIcon:{type:String,default:""},width:{type:[String,Number],default:"auto"}},emits:["choseTabCategory","itemListClick"],setup(s){return{windowStyle:k(()=>String(s.width).split("").includes("%")?{width:s.width}:{width:`${s.width}px`})}}},v={class:"b-search-block__title"},y={class:"b-search-block__tegs-block"},g=["onClick"],w={class:"b-search-block__users-window"},f={class:"b-search-block__category-name"},S={class:"b-search-block__users-list"},C={class:"b-search-block__user-data"},p={class:"b-search-block__user-img"},$=["src"],A={class:"b-search-block__user-name"},B=["onClick"],I=["src"],T={key:1,class:"b-search-block__invited"},L={class:"b-search-block__show-more-results"};function z(s,d,l,h,N,q){return c(),o("div",{class:"b-search-block",style:u(h.windowStyle)},[e("div",v,i(s.$t("events.search-among")),1),e("div",y,[(c(!0),o(n,null,r(l.tags,t=>(c(),o("div",{key:t.id,class:_(["b-search-block__teg",{active:t.isActive}]),onClick:a=>s.$emit("choseTabCategory",t.id)},i(t.text),11,g))),128))]),e("div",w,[(c(!0),o(n,null,r(l.filteredTeams,t=>(c(),o("div",{key:t.id,class:"b-search-block__category-block"},[e("div",f,i(t.category_name),1),e("div",S,[(c(!0),o(n,null,r(t.users,a=>(c(),o("div",{key:a.id,class:_(["b-search-block__user",{"b-search-block__taken":a.isChosen}])},[e("div",C,[e("div",p,[e("img",{src:a.img,alt:""},null,8,$)]),e("div",A,i(a.name),1)]),a.isChosen?(c(),o("div",T,i(s.$t("events.requested")),1)):(c(),o("div",{key:0,class:"b-search-block__add-user",onClick:x=>s.$emit("itemListClick",t.id,a.id)},[e("img",{class:_({taken:a.isChosen}),src:l.listItemIcon,alt:""},null,10,I)],8,B))],2))),128))])]))),128))]),e("div",L,i(s.$t("events.show-more")),1)],4)}const E=b(m,[["render",z],["__scopeId","data-v-adfa37d7"]]);export{E as S};
