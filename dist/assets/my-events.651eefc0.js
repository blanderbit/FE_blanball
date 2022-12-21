import{_ as W,b as o,bV as q,u as J,V as K,d as D,r,o as u,c as Q,i as S,g as B,e as i,t as g,a as v,w as M,R as Z,C as d,ai as P,A as $}from"./index.d5b3c164.js";import{d as A}from"./uk.f6fab5a0.js";import{G as ee}from"./GreenBtn.4fd2fef8.js";import{I as te}from"./InputComponent.f993d239.js";import{C as ne,E as ae,S as oe,a as ie,M as se,b as le,c as re}from"./EventsFilters.07ee3ee2.js";import{R as ce}from"./RightSidebar.713cde95.js";import{E as de,I as ve,S as me,P as pe}from"./index.a1ee2b1a.js";import{F as _e,a as ue}from"./transformed.filters.worker.47c98e29.js";import{v as ge}from"./v4.5d18198f.js";import"./location-point.f489f928.js";import"./Dropdown.d5dd23fa.js";import"./search.0f589d58.js";import"./set-filter.f98e9ac0.js";import"./clear-filter.35dca34b.js";import"./cross.90e335cf.js";import"./calendar.1801e959.js";import"./arrow-right.736d9638.js";import"./lodash.ac5fb6a6.js";import"./Checkbox.a4ca88fa.js";import"./map.styles.bd588d81.js";const fe={name:"EventsPage",components:{GreenBtn:ee,InputComponent:te,ContextMenu:ne,EventCard:ae,SmallLoader:oe,SearchBlockEvents:ie,MyEventCard:se,RightSidebar:ce,EmptyList:de,SmartGridList:le,InfiniteLoading:ve,ScrollToTop:me,FilterBlock:_e,EventsFilters:re},setup(){const s=o(null);o(null),o(null);const a=q(),m=J(),e=o([]),{t:p}=K(),T=o(!1),f=o(null),h=o(null),_=o(!1),l=o(),y=D(()=>({event_cards:d.event_page.event_cards,my_events:d.event_page.my_events,sport_type_dropdown:d.event_page.sport_type_dropdown,gender_dropdown:d.event_page.gender_dropdown,cities_dropdown:d.event_page.cities_dropdown,calendar:d.event_page.calendar,menu_text:d.event_page.menu_text})),x=D(()=>({title:"\u041D\u0435\u043C\u0430\u0454 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u044C \u0434\u043B\u044F \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F",description:"\u0412\u0430\u043C \u0449\u0435 \u043D\u0435 \u043D\u0430\u0434\u0445\u043E\u0434\u0438\u043B\u0438 \u0441\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F \u0432\u0456\u0434 \u0456\u043D\u0448\u0438\u0445 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432"}));function E(){m.push(Z.APPLICATION.EVENTS.absolute)}function C(t){return P(t).locale(A).format("D MMMM")}function w(t){return P(t).locale(A).format("HH:mm")}function n(t){return{...t,date:C(t.date_and_time),time:w(t.date_and_time),labels:[t.type,t.gender==="Man"?p("events.men"):p("events.women"),t.need_form?p("events.need-uniform"):p("events.do-not-need-uniform")]}}function k(t){f.value=t.clientX,h.value=t.clientY,_.value=!0}function G(){m.push("/application/events/3")}function N(){m.push("/application/events/create")}const F=o(),V=o(!1),L=o(!1),U=()=>{L.value=ge()},{paginationElements:I,paginationPage:b,paginationTotalCount:Fe,paginationLoad:R,paginationClearData:z}=pe({paginationDataRequest:t=>$.EventService.getAllMyEvents({...H(),page:t}),dataTransformation:n});b.value=1,I.value=a.meta.eventData.data.results.map(n);const{getRawFilters:H,updateFilter:Le,filters:O,clearFilters:X,setFilters:Y}=ue({router:m,filters:{duration:{type:Number,value:null},dist:{type:Number,value:null},point:{type:Number,value:null},type:{type:String},date_and_time_after:{type:String},date_and_time_before:{type:String},ordering:{type:String,value:""},status:{type:String,value:""},gender:{type:String,value:""},search:{type:String,value:""},need_ball:{type:Boolean,value:!1}},afterUpdateFiltersCallBack:()=>{U(),z()}});return{scrollComponent:s,eventCards:e,isLoaderActive:T,mockData:y,emptyListMessages:x,myCardRightClick:k,goToEventPage:G,goToCreateEvent:N,switchEvents:E,isContextMenuActive:_,refList:F,blockScrollToTopIfExist:V,triggerForRestart:L,paginationElements:I,paginationPage:b,paginationLoad:R,loadDataPaginationData:(t,c)=>{R({pageNumber:t,$state:c,forceUpdate:b.value===1})},detectSizesForCards:({itemWidth:t,itemCount:c,itemHeight:j,itemMinHeight:De})=>{j.value=100,window.matchMedia("(min-width: 1400px)").matches?(t.value=l.value.clientWidth/3,c.value=3):window.matchMedia("(min-width: 1200px) and (max-width: 1400px)").matches||window.matchMedia("(min-width: 992px) and (max-width: 1199px)").matches||window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches?(t.value=l.value.clientWidth/2,c.value=2):(window.matchMedia("(min-width: 576px) and (max-width: 768px)").matches||window.matchMedia("(max-width: 576px)").matches)&&(t.value=l.value.clientWidth,c.value=1)},mainEventsBlock:l,clearFilters:X,setFilters:Y,filters:O,scrollToFirstElement:()=>{F.value.scrollToFirstElement()}}}},he={class:"b-events-page"},ye={class:"b-events-page__main-body",ref:"mainEventsBlock"},xe={class:"b-events-page__header-block"},Ee={class:"b-events-page__left-part"},Ce={class:"b-events-page__title"},we={class:"b-events-page__subtitle"},be={class:"b-events-page__event-switcher"},Se={class:"b-events-page__my-events"},Me={class:"b-events-page__right-part"},Te={class:"b-events-page__main-search-block"};function ke(s,a,m,e,p,T){const f=r("ContextMenu"),h=r("GreenBtn"),_=r("events-filters"),l=r("MyEventCard"),y=r("EmptyList"),x=r("ScrollToTop"),E=r("InfiniteLoading"),C=r("SmartGridList"),w=r("RightSidebar");return u(),Q("div",he,[e.isContextMenuActive?(u(),S(f,{key:0,"client-x":s.contextMenuX,"client-y":s.contextMenuY,"menu-text":e.mockData.menu_text,onCloseModal:a[0]||(a[0]=n=>e.isContextMenuActive=!1)},null,8,["client-x","client-y","menu-text"])):B("",!0),i("div",ye,[i("div",xe,[i("div",Ee,[i("div",Ce,g(s.$t("events.future-events")),1),i("div",we,g(s.$t("events.renew-your-data")),1),i("div",be,[i("div",{class:"b-events-page__general-events",onClick:a[1]||(a[1]=(...n)=>e.switchEvents&&e.switchEvents(...n))},g(s.$t("events.general-events")),1),i("div",Se,g(s.$t("events.my-events")),1)])]),i("div",Me,[v(h,{text:s.$t("buttons.create-event"),width:168,icon:"../../../assets/img/plus.svg",height:40,onClickFunction:e.goToCreateEvent},null,8,["text","icon","onClickFunction"])])]),i("div",Te,[v(_,{modelValue:e.filters,"onUpdate:value":e.setFilters,onClearFilters:e.clearFilters},null,8,["modelValue","onUpdate:value","onClearFilters"]),v(C,{list:e.paginationElements,ref:"refList",detectSizesForCards:e.detectSizesForCards,"scrollbar-existing":e.blockScrollToTopIfExist,"onUpdate:scrollbar-existing":a[4]||(a[4]=n=>e.blockScrollToTopIfExist=n)},{smartGridListItem:M(n=>[(u(),S(l,{key:n.index,card:n.smartListItem,onCardRightClick:e.myCardRightClick,onGoToEventPage:k=>e.goToEventPage(n.smartListItem.id)},null,8,["card","onCardRightClick","onGoToEventPage"]))]),after:M(()=>[v(E,{identifier:e.triggerForRestart,ref:"scrollbar",onInfinite:a[3]||(a[3]=n=>e.loadDataPaginationData(e.paginationPage+1,n))},{complete:M(()=>[e.paginationElements.length?B("",!0):(u(),S(y,{key:0,title:e.emptyListMessages.title,description:e.emptyListMessages.title},null,8,["title","description"])),v(x,{"element-length":e.paginationElements,"is-scroll-top-exist":e.blockScrollToTopIfExist,onScrollButtonClicked:a[2]||(a[2]=n=>e.scrollToFirstElement())},null,8,["element-length","is-scroll-top-exist"])]),_:1},8,["identifier"])]),_:1},8,["list","detectSizesForCards","scrollbar-existing"])])],512),v(w)])}const et=W(fe,[["render",ke],["__scopeId","data-v-1a34289c"]]);export{et as default};
