import{N as v,s as D,D as x,E as k,I as E,S as b,P as F}from"./index.ec420b96.js";import{_ as y,d,u as N,x as g,r as p,o as T,j as L,w as r,n as f,a as u,I as h,e as $,C as S,h as C}from"./index.a87692b6.js";const P={name:"Notifications",components:{Notification:v,DynamicScroller:D,DynamicScrollerItem:x},props:{list:{type:Array,default:()=>[]},selectedList:{type:Array,default:()=>[]},selectable:{type:Boolean,default:!1},keyField:{type:String,default:"id"}},emits:["update:selected-list","update:scrollbar-existing"],setup(t,{emit:o,expose:l}){let e=d(0),c=d([]),s=d();return N(),g(()=>t.selectedList,()=>{const a=[...t.selectedList];c.value=Array.isArray(a)?a.length?a:[]:[],s.value.forceUpdate()}),g(()=>t.list,()=>{h(()=>{o("update:scrollbar-existing",s.value.$el.scrollHeight>s.value.$el.clientHeight)})},{immediate:!0}),l({scrollToItem:a=>s.value.scrollToItem(a),scrollToFirstElement:()=>s.value.scrollToItem(0)}),{activeNotification:e,scroller:s}}};function A(t,o,l,e,c,s){const a=p("DynamicScrollerItem"),m=p("DynamicScroller");return T(),L(m,{items:l.list,"min-item-size":50,"key-field":l.keyField,class:"scroller",ref:"scroller"},{before:r(()=>[f(t.$slots,"before",{},void 0,!0)]),default:r(({item:i,index:n,active:I,itemWithSize:W})=>{var _;return[u(a,{item:i,active:I,sizeDependencies:[l.list.length,(_=i==null?void 0:i.metadata)==null?void 0:_.expanding],"data-index":n},{default:r(()=>[f(t.$slots,"smartListItem",{index:n,smartListItem:i},void 0,!0)]),_:2},1032,["item","active","sizeDependencies","data-index"])]}),after:r(()=>[f(t.$slots,"after",{},void 0,!0)]),_:3},8,["items","key-field"])}const U=y(P,[["render",A],["__scopeId","data-v-e62caf83"]]),z={name:"SimpleListWrapper",components:{SmartList:U,EmptyList:k,InfiniteLoading:E,ScrollToTop:b},props:{requestForGetData:{type:Function}},setup(t){const o=d(),l=d(),{paginationElements:e,paginationLoad:c,paginationPage:s}=F({paginationDataRequest:i=>t.requestForGetData(i)});s.value=0;const a=(i,n)=>{c({pageNumber:i,$state:n,forceUpdate:s.value===1})},m=$(()=>({title:S.no_data_notifications.noUsers.title,description:S.no_data_notifications.noUsers.description}));return{paginationElements:e,blockScrollToTopIfExist:l,emptyListMessages:m,refList:o,paginationPage:s,loadDataPaginationData:a,scrollToFirstElement:()=>{o.value.scrollToFirstElement()}}}};function B(t,o,l,e,c,s){const a=p("ScrollToTop"),m=p("InfiniteLoading"),i=p("SmartList");return T(),L(i,{list:e.paginationElements,ref:"refList","scrollbar-existing":e.blockScrollToTopIfExist,"onUpdate:scrollbar-existing":o[2]||(o[2]=n=>e.blockScrollToTopIfExist=n)},{smartListItem:r(n=>[f(t.$slots,"default",{smartListItem:n.smartListItem})]),after:r(()=>[u(m,{ref:"scrollbar",onInfinite:o[1]||(o[1]=n=>e.loadDataPaginationData(e.paginationPage+1,n))},{complete:r(()=>[e.paginationElements.length?C("",!0):f(t.$slots,"emptyList",{key:0}),u(a,{"element-length":e.paginationElements,"is-scroll-top-exist":e.blockScrollToTopIfExist,onScrollButtonClicked:o[0]||(o[0]=n=>e.scrollToFirstElement())},null,8,["element-length","is-scroll-top-exist"])]),_:3},512)]),_:3},8,["list","scrollbar-existing"])}const G=y(z,[["render",B]]);export{G as S,U as a};
