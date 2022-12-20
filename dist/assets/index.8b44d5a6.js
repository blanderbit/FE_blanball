import{_ as H,b as d,bV as j,u as W,V as q,d as M,r,o as y,c as Y,e as a,t as _,a as c,w as x,R as C,i as P,g as J,C as g,ai as D,A as K}from"./index.ae25520c.js";import{d as N}from"./uk.ff942745.js";import{G as Q}from"./GreenBtn.d0cf3bc4.js";import{I as X}from"./InputComponent.c16e64a3.js";import{C as Z,E as $,S as ee,a as te,M as ne,b as ae,c as oe}from"./EventsFilters.41b5f244.js";import{R as se}from"./RightSidebar.75a49b3b.js";import{E as ie,I as re,S as le,P as de}from"./index.6d15e3e2.js";import{D as ce}from"./Dropdown.baaa08e7.js";import{a as pe}from"./transformed.filters.worker.6340b213.js";import{v as ve}from"./v4.5d18198f.js";import"./location-point.f489f928.js";import"./search.0f589d58.js";import"./set-filter.f98e9ac0.js";import"./clear-filter.35dca34b.js";import"./cross.90e335cf.js";import"./calendar.1801e959.js";import"./arrow-right.736d9638.js";import"./lodash.77ef0208.js";import"./Checkbox.a68bf655.js";import"./map.styles.bd588d81.js";const me={name:"EventsPage",components:{GreenBtn:Q,Dropdown:ce,EmptyList:ie,InputComponent:X,ContextMenu:Z,EventCard:$,SmallLoader:ee,SearchBlockEvents:te,MyEventCard:ne,RightSidebar:se,SmartGridList:ae,InfiniteLoading:re,ScrollToTop:le,EventsFilters:oe},setup(){const l=d(null),o=j(),p=W(),t=d([]),{t:v}=q(),I=d(!1),s=d(),u=M(()=>({event_cards:g.event_page.event_cards,sport_type_dropdown:g.event_page.sport_type_dropdown,gender_dropdown:g.event_page.gender_dropdown,cities_dropdown:g.event_page.cities_dropdown})),f=M(()=>({title:"\u041D\u0435\u043C\u0430\u0454 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u044C \u0434\u043B\u044F \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F",description:"\u0412\u0430\u043C \u0449\u0435 \u043D\u0435 \u043D\u0430\u0434\u0445\u043E\u0434\u0438\u043B\u0438 \u0441\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F \u0432\u0456\u0434 \u0456\u043D\u0448\u0438\u0445 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432"}));function h(e){return D(e).locale(N).format("D MMMM")}function E(e){return D(e).locale(N).format("HH:mm")}function m(e){return{...e,date:h(e.date_and_time),time:E(e.date_and_time),labels:[e.type,e.gender==="Man"?v("events.men"):v("events.women"),e.need_form?v("events.need-uniform"):v("events.do-not-need-uniform")]}}function b(e){p.push(C.APPLICATION.EVENTS.GET_ONE.absolute(e))}function T(){p.push(C.APPLICATION.EVENTS.CREATE.absolute)}function n(){p.push(C.APPLICATION.MY_EVENTS.absolute)}const w=d(),B=d(!1),L=d(!1),R=()=>{L.value=ve()},{paginationElements:k,paginationPage:S,paginationTotalCount:Ce,paginationLoad:F,paginationClearData:A}=de({paginationDataRequest:e=>K.EventService.getAllEvents({...G(),page:e}),dataTransformation:m});S.value=1,k.value=o.meta.eventData.data.results.map(m);const{getRawFilters:G,updateFilter:Ie,filters:V,clearFilters:U,setFilters:O}=pe({router:p,filters:{duration:{type:Number,value:null},dist:{type:Number,value:null},point:{type:Number,value:null},type:{type:String},date_and_time_after:{type:String},date_and_time_before:{type:String},ordering:{type:String,value:""},status:{type:String,value:""},gender:{type:String,value:""},search:{type:String,value:""},need_ball:{type:Boolean,value:!1}},afterUpdateFiltersCallBack:()=>{R(),A()}});return{emptyListMessages:f,scrollComponent:l,eventCards:t,isLoaderActive:I,switchToMyEvents:n,mainEventsBlock:s,mockData:u,filters:V,goToEventPage:b,goToCreateEvent:T,refList:w,blockScrollToTopIfExist:B,triggerForRestart:L,paginationElements:k,paginationPage:S,paginationLoad:F,loadDataPaginationData:(e,i)=>{F({pageNumber:e,$state:i,forceUpdate:S.value===1})},detectSizesForCards:({itemWidth:e,itemCount:i,itemHeight:z,itemMinHeight:Fe})=>{z.value=300,window.matchMedia("(min-width: 1400px)").matches?(e.value=s.value.clientWidth/3,i.value=3):window.matchMedia("(min-width: 1200px) and (max-width: 1400px)").matches||window.matchMedia("(min-width: 992px) and (max-width: 1199px)").matches||window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches?(e.value=s.value.clientWidth/2,i.value=2):(window.matchMedia("(min-width: 576px) and (max-width: 768px)").matches||window.matchMedia("(max-width: 576px)").matches)&&(e.value=s.value.clientWidth,i.value=1)},setFilters:O,clearFilters:U,scrollToFirstElement:()=>{w.value.scrollToFirstElement()}}}},_e={class:"b-events-page"},ge={class:"b-events-page__main-body",ref:"mainEventsBlock"},ue={class:"b-events-page__header-block"},fe={class:"b-events-page__left-part"},he={class:"b-events-page__title"},Ee={class:"b-events-page__subtitle"},be={class:"b-events-page__event-switcher"},Te={class:"b-events-page__general-events"},we={class:"b-events-page__right-part"},Se={class:"b-events-page__main-search-block"},ye={class:"b-events-page__all-events-block"};function xe(l,o,p,t,v,I){const s=r("GreenBtn"),u=r("events-filters"),f=r("EventCard"),h=r("EmptyList"),E=r("ScrollToTop"),m=r("InfiniteLoading"),b=r("SmartGridList"),T=r("RightSidebar");return y(),Y("div",_e,[a("div",ge,[a("div",ue,[a("div",fe,[a("div",he,_(l.$t("events.future-events")),1),a("div",Ee,_(l.$t("events.renew-your-data")),1),a("div",be,[a("div",Te,_(l.$t("events.general-events")),1),a("div",{class:"b-events-page__my-events",onClick:o[0]||(o[0]=(...n)=>t.switchToMyEvents&&t.switchToMyEvents(...n))},_(l.$t("events.my-events")),1)])]),a("div",we,[c(s,{text:l.$t("buttons.create-event"),width:168,icon:"../../../assets/img/plus.svg",height:40,onClickFunction:t.goToCreateEvent},null,8,["text","icon","onClickFunction"])])]),a("div",Se,[c(u,{modelValue:t.filters,"onUpdate:value":t.setFilters,onClearFilters:t.clearFilters},null,8,["modelValue","onUpdate:value","onClearFilters"]),a("div",ye,[c(b,{list:t.paginationElements,ref:"refList",detectSizesForCards:t.detectSizesForCards,"scrollbar-existing":t.blockScrollToTopIfExist,"onUpdate:scrollbar-existing":o[3]||(o[3]=n=>t.blockScrollToTopIfExist=n)},{smartGridListItem:x(n=>[(y(),P(f,{key:n.index,card:n.smartListItem,onGoToEventPage:w=>t.goToEventPage(n.smartListItem.id)},null,8,["card","onGoToEventPage"]))]),after:x(()=>[c(m,{identifier:t.triggerForRestart,ref:"scrollbar",onInfinite:o[2]||(o[2]=n=>t.loadDataPaginationData(t.paginationPage+1,n))},{complete:x(()=>[t.paginationElements.length?J("",!0):(y(),P(h,{key:0,title:t.emptyListMessages.title,description:t.emptyListMessages.title},null,8,["title","description"])),c(E,{"element-length":t.paginationElements,"is-scroll-top-exist":t.blockScrollToTopIfExist,onScrollButtonClicked:o[1]||(o[1]=n=>t.scrollToFirstElement())},null,8,["element-length","is-scroll-top-exist"])]),_:1},8,["identifier"])]),_:1},8,["list","detectSizesForCards","scrollbar-existing"])])])],512),c(T)])}const Xe=H(me,[["render",xe],["__scopeId","data-v-4d327127"]]);export{Xe as default};
