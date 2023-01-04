import{_ as I,d as b,u as H,x as Y,I as be,r as y,o as a,j as x,w as M,n as X,a as C,a4 as te,a5 as ge,a6 as pe,a7 as he,a8 as ye,a9 as ke,aa as Ce,ab as G,E as Se,e as w,R as L,C as B,c as r,h,f as n,s as N,t as p,g as $,A as R,p as P,i as E,ac as we,ad as z,ae as Q,l as q,V as A,W as O,O as Ne,T as J,F as V,a2 as oe,k as Me,af as Ie,ag as ne,m as Ae,ah as $e}from"./index.a87692b6.js";import{N as K,s as xe,D as Oe,I as Te,E as Fe,S as Le,A as Be,P as Pe}from"./index.ec420b96.js";import{_ as se}from"./cross.90e335cf.js";import{v as ie}from"./v4.5d18198f.js";import{m as ae}from"./members.a11d1bd6.js";import{_ as Ee}from"./arrow-right.a7e531f5.js";import{I as Re}from"./InputComponent.8565bb3f.js";import{S as De}from"./SearchBlockAll.e7f2838a.js";import{_ as He}from"./search.0f589d58.js";import{S as We}from"./VueStarRating.common.8764c71a.js";import{_ as je}from"./warning-red.7e7f7092.js";import"./Checkbox.093b1817.js";const ze="/assets/notification-small.2e256e10.svg";const Ue={name:"Notifications",components:{Notification:K,DynamicScroller:xe,DynamicScrollerItem:Oe},props:{notifications:{type:Array,default:()=>[]},selectedList:{type:Array,default:()=>[]},selectable:{type:Boolean,default:!1}},emits:["update:selected-list","update:scrollbar-existing"],setup(o,{emit:t,expose:i}){let e=b(0),d=b([]),_=b();const s=H();Y(()=>o.selectedList,()=>{const c=[...o.selectedList];d.value=Array.isArray(c)?c.length?c:[]:[],_.value.forceUpdate()}),Y(()=>o.notifications,()=>{be(()=>{t("update:scrollbar-existing",_.value.$el.scrollHeight>_.value.$el.clientHeight)})},{immediate:!0});const m=async(c,g)=>{await te({button:c,notificationInstance:g,router:s,activeNotification:e})},v=c=>{if(c.selected)d.value.push(c.notification.notification_id);else{const g=d.value.findIndex(S=>S===c.notification.notification_id);d.value.splice(g,1)}t("update:selected-list",d.value)};return i({scrollToItem:c=>_.value.scrollToItem(c),scrollToFirstElement:()=>_.value.scrollToItem(0)}),{activeNotification:e,handlerAction:m,handleSelected:v,scroller:_}}};function Ve(o,t,i,e,d,_){const s=y("Notification"),m=y("DynamicScrollerItem"),v=y("DynamicScroller");return a(),x(v,{items:i.notifications,"min-item-size":84,"key-field":"notification_id",class:"scroller",ref:"scroller"},{before:M(()=>[X(o.$slots,"before",{},void 0,!0)]),default:M(({item:c,index:g,active:S,itemWithSize:l})=>[C(m,{item:c,active:S,sizeDependencies:[i.notifications.length,c.metadata.expanding],"data-index":g},{default:M(()=>[C(s,{notificationInstance:c,selectable:i.selectable,active:e.activeNotification===c.notification_id,checked:i.selectedList.includes(c.notification_id),onHandlerAction:u=>e.handlerAction(u,c),onSelected:t[0]||(t[0]=u=>e.handleSelected(u))},null,8,["notificationInstance","selectable","active","checked","onHandlerAction"])]),_:2},1032,["item","active","sizeDependencies","data-index"])]),after:M(()=>[X(o.$slots,"after",{},void 0,!0)]),_:3},8,["items"])}const Ye=I(Ue,[["render",Ve],["__scopeId","data-v-7d5aa9f4"]]),Xe="/assets/sidebar-arrow-back.6ddc97ca.svg",Ge="/assets/sidebar-arrow.fe8d3224.svg";var Z,ee,j,qe=(Z=he(Ce.NotificationInfo),ee=ye([{type:G.Action,text:"\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u043D\u043E\u0432\u0456 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F"}]),Z(j=ee(j=function(o){ge(t,o);function t(){for(var e,d=arguments.length,_=new Array(d),s=0;s<d;s++)_[s]=arguments[s];return e=o.call.apply(o,[this].concat(_))||this,e.countOfNewNotifications=0,e}var i=t.prototype;return i.createTitle=function(){return"System notification"},pe(t,[{key:"texts",get:function(){return["\u0423 \u0432\u0430\u0441 \u043D\u043E\u0432\u0456\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F - "+this.countOfNewNotifications]},set:function(d){}}]),t}(ke))||j)||j);const Je="/assets/logo-sidebar.7ff4f50d.svg",le="/assets/trash.12e3e1ee.svg",ce="/assets/double-check.5ce54e56.svg";const Ke={components:{InfiniteLoading:Te,Notification:K,EmptyList:Fe,Notifications:Ye,ScrollToTop:Le},props:{notifications:{type:Array,default:()=>[]},notReadNotificationCount:{type:Number,default:0},newNotifications:{type:Number,default:0},totalNotificationsCount:{type:Number,default:0},isMenuOpened:{type:Boolean,default:!1}},emits:["closed","reLoading","loading","loadingInfinite","update:isMenuOpened"],setup(o,{emit:t}){const i=b(),e=b(!1),d=b(!1),_=b(""),s=b([]),m=b(new qe),v=b(Se("clientVersion"));Y(()=>o.isMenuOpened,()=>{o.isMenuOpened||(t("closed"),s.value=[])});const c=w(()=>o.isMenuOpened?Xe:Ge),g=w(()=>L);function S(){t("update:isMenuOpened",!o.isMenuOpened)}const l=w(()=>(m.value.countOfNewNotifications=o.newNotifications,m.value)),u=w(()=>({title:B.no_data_notifications.noNotifications.title,description:B.no_data_notifications.noNotifications.description})),k=()=>{s.value=[]};return{clientVersion:v,arrowPosition:c,toggleMenu:S,getNewNotificationInstance:l,emptyListMessages:u,routeObject:g,selectedList:s,HandleAction:{deleteAll:()=>{!o.notifications.length&&!o.newNotifications||(R.NotificationService.deleteAllMyNotifications(),k())},readAll:()=>{!o.notifications.length&&!o.newNotifications||(R.NotificationService.readAllMyNotifications(),k())},deleteSelected:()=>{!s.value||(R.NotificationService.deleteNotifications(s.value),k())},readSelected:()=>{!s.value||(R.NotificationService.readNotifications(s.value),k())}},triggerForRestart:_,selectable:e,notificationList:i,blockScrollToTopIfExist:d,clearSelectedList:k,restartInfiniteScroll:()=>{_.value=ie()},scrollToFirstElement:()=>{i.value.scrollToFirstElement()}}}},D=o=>(P("data-v-f3a828e9"),o=o(),E(),o),Qe=["src"],Ze={class:"b_slide_menu_main"},et={class:"b_slide_menu_top-block"},tt=D(()=>n("div",{class:"b_slide_menu_logo"},[n("img",{src:Je,alt:""})],-1)),ot={key:0,class:"b_slide_menu_items d-flex justify-content-between align-items-center mb-2"},nt={class:"d-flex"},st={class:"b-selected-elements__count me-1"},it={key:0},at={key:1},lt={class:"d-flex mb-2"},ct=D(()=>n("img",{src:le,alt:"",height:"16"},null,-1)),rt=D(()=>n("img",{src:ce,height:"16",alt:""},null,-1)),dt=D(()=>n("img",{src:le,height:"16",alt:""},null,-1)),_t=D(()=>n("img",{src:ce,height:"16",alt:""},null,-1)),ut={class:"d-flex"},mt={class:"b-notifications-title me-1"},ft={key:0,class:"b-notification-unreaded d-flex align-items-center justify-content-center me-1"},vt={class:"b_slide_menu_bottom-block"},bt=D(()=>n("div",{class:"b_slide_menu_top-line d-flex justify-content-between"},[n("div",{class:"b_slide_menu_name"},"\u042E\u043B\u0456\u044F \u041A\u0456\u0441\u043B\u0456\u0446\u0438\u043D\u0430"),n("div",{class:"b_slide_menu_position"},"\u0442\u0440\u0435\u043D\u0435\u0440")],-1)),gt={class:"b_slide_menu_bottom-line"};function pt(o,t,i,e,d,_){const s=y("Notification"),m=y("empty-list"),v=y("ScrollToTop"),c=y("InfiniteLoading"),g=y("Notifications"),S=y("router-link");return a(),r("div",null,[i.isMenuOpened?(a(),r("div",{key:0,class:"b_slide_menu_back",onClick:t[0]||(t[0]=(...l)=>e.toggleMenu&&e.toggleMenu(...l))})):h("",!0),n("div",{class:"b_slide_menu_wrapper",style:N({right:i.isMenuOpened?"-464px":"0px"})},[i.isMenuOpened?(a(),r("div",{key:0,class:"b_slide_menu_sidebar-arrow",onClick:t[1]||(t[1]=(...l)=>e.toggleMenu&&e.toggleMenu(...l))},[n("img",{src:e.arrowPosition,alt:""},null,8,Qe)])):h("",!0),n("div",Ze,[n("div",et,[tt,i.notifications.length?(a(),r("div",ot,[n("div",{class:"d-flex align-items-center",style:N({opacity:e.selectedList.length?"1":"0"})},[n("img",{src:se,height:"10",alt:"",class:"me-2",onClick:t[2]||(t[2]=(...l)=>e.clearSelectedList&&e.clearSelectedList(...l))}),n("div",nt,[n("div",st,p(e.selectedList.length),1),$(" / "+p(i.totalNotificationsCount),1)])],4),n("button",{onClick:t[3]||(t[3]=l=>(e.selectable=!e.selectable,e.clearSelectedList()))},[e.selectable?(a(),r("span",at,"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440")):(a(),r("span",it,"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u0438"))])])):h("",!0),n("div",lt,[i.notifications.length?(a(),r("button",{key:0,onClick:t[4]||(t[4]=l=>e.HandleAction.deleteAll()),class:"d-flex align-items-center"},[ct,$(" \u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0435 ")])):h("",!0),i.notifications.length&&i.notReadNotificationCount?(a(),r("button",{key:1,onClick:t[5]||(t[5]=l=>e.HandleAction.readAll()),class:"d-flex align-items-center"},[rt,$(" \u041F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u0432\u0441\u0435 ")])):h("",!0),e.selectable&&i.notifications.length&&e.selectedList.length?(a(),r("button",{key:2,onClick:t[6]||(t[6]=l=>e.HandleAction.deleteSelected()),class:"d-flex align-items-center"},[dt,$(" \u0423\u0434\u0430\u043B\u0438\u0442\u044C ")])):h("",!0),e.selectable&&i.notifications.length&&e.selectedList.length?(a(),r("button",{key:3,onClick:t[7]||(t[7]=l=>e.HandleAction.readSelected()),class:"d-flex align-items-center"},[_t,$(" \u041F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C ")])):h("",!0)]),n("div",ut,[n("div",mt,p(o.$t("slide_menu.notifications")),1),i.notReadNotificationCount?(a(),r("div",ft,p(i.notReadNotificationCount),1)):h("",!0)]),i.isMenuOpened?(a(),r("ul",{key:1,class:"b_slide_menu_notification",style:N({height:`calc(100vh - ${e.selectable?95:60}px - 100px - 70px)`}),ref:"test"},[C(g,{notifications:i.notifications,selectable:e.selectable,ref:"notificationList","selected-list":e.selectedList,"onUpdate:selected-list":t[11]||(t[11]=l=>e.selectedList=l),"scrollbar-existing":e.blockScrollToTopIfExist,"onUpdate:scrollbar-existing":t[12]||(t[12]=l=>e.blockScrollToTopIfExist=l)},{before:M(()=>[i.newNotifications?(a(),x(s,{key:0,class:"b-new-notification",notificationInstance:e.getNewNotificationInstance,"not-collapsible":!0,onHandlerAction:t[8]||(t[8]=l=>(o.$emit("reLoading"),e.restartInfiniteScroll()))},null,8,["notificationInstance"])):h("",!0)]),after:M(()=>[C(c,{identifier:e.triggerForRestart,ref:"scrollbar",onInfinite:t[10]||(t[10]=l=>o.$emit("loadingInfinite",l))},{complete:M(()=>[i.notifications.length?h("",!0):(a(),x(m,{key:0,title:e.emptyListMessages.title,description:e.emptyListMessages.description,"is-notification":!0},null,8,["title","description"])),C(v,{"element-length":i.notifications,"is-scroll-top-exist":e.blockScrollToTopIfExist,onScrollButtonClicked:t[9]||(t[9]=l=>e.scrollToFirstElement())},null,8,["element-length","is-scroll-top-exist"])]),_:1},8,["identifier"])]),_:1},8,["notifications","selectable","selected-list","scrollbar-existing"])],4)):h("",!0)]),n("div",vt,[bt,n("div",gt,[$(p(o.$t("slide_menu.version"))+" ",1),C(S,{to:e.routeObject.APPLICATION.VERSION.absolute},{default:M(()=>[$(p(e.clientVersion),1)]),_:1},8,["to"])])])])],4)])}const ht=I(Ke,[["render",pt],["__scopeId","data-v-f3a828e9"]]),yt="/assets/Notification.91b0c545.svg",kt="/assets/notificationUnread.4781af12.svg",re="/assets/record.632423a8.svg",Ct="/assets/medal.b79441b9.svg",de="/assets/Settings.1a817c52.svg",St="/assets/my-profile-logo.9d6ccfcf.svg",wt="/assets/exit-icon.8ce1bafb.svg";const Nt=(o,t)=>t.filter(i=>o.length?!o.find(e=>e.notification_id===i.notification_id):!0),Mt={name:"MainSidebar",components:{SlideMenu:ht,Avatar:Be},setup(){const o=b(0),t=b([]),i=H(),e=b(!1),d=w(()=>[{img:o.value?kt:yt,action:()=>e.value=!0},{img:re,url:"/application/events",action:()=>e.value=!1},{img:Ct,url:"",action:()=>e.value=!1},{img:ae,url:"/application/users/general",action:()=>e.value=!1},{img:de,url:"",action:()=>e.value=!1}]),_=async()=>R.NotificationService.getNotificationsCount().then(f=>o.value=f.data.not_read_notifications_count||0),{paginationElements:s,paginationPage:m,paginationTotalCount:v,paginationClearData:c,paginationLoad:g}=Pe({paginationDataRequest:f=>R.NotificationService.getNotifications({page:f,skipids:t.value}),dataTransformation:f=>we(f),beforeConcat:(f,T)=>Nt(f,T)}),S=(f,T,W)=>{W&&(c(),t.value=[]),g({pageNumber:f,$state:T,forceUpdate:W})},l=f=>{f.notification&&t.value.push(f.notification_id),f.updateWebSocketMessage&&f.handleUpdate({paginationElements:s,paginationLoad:g,paginationPage:m},_),_()},u=()=>i.push(L.APPLICATION.PROFILE.MY_PROFILE.absolute);return z.registerCallback(l),Q.on("SidebarClearData",()=>{t.value=[],c()}),q(()=>{Q.off("SidebarClearData"),z.destroyCallback(l)}),_(),{paginationElements:s,paginationTotalCount:v,paginationPage:m,notReadNotificationCount:o,skipids:t,menuItems:d,isMenuOpened:e,loadDataNotifications:S,paginationClearData:c,goToProfile:u,logOut:()=>{J.clearToken(),i.push(L.AUTHENTICATIONS.LOGIN.absolute)}}}},_e=o=>(P("data-v-4cde3dfe"),o=o(),E(),o),It={class:"b_sidebar_wrapper"},At={class:"b_sidebar"},$t={class:"b_sidebar_top-block"},xt=_e(()=>n("div",{class:"b_sidebar_picture-top"},[n("img",{src:St,alt:""})],-1)),Ot={class:"b_sidebar_menu-block"},Tt=["onClick"],Ft=["src"],Lt={key:1},Bt=["src"],Pt={class:"b_sidebar_bottom-block"},Et={class:"b_sidebar_picture-bottom"},Rt=_e(()=>n("img",{src:wt,alt:""},null,-1)),Dt=[Rt];function Ht(o,t,i,e,d,_){const s=y("SlideMenu"),m=y("router-link"),v=y("avatar");return a(),r("div",It,[C(s,{"is-menu-opened":e.isMenuOpened,"onUpdate:is-menu-opened":t[0]||(t[0]=c=>e.isMenuOpened=c),notifications:e.paginationElements,notReadNotificationCount:e.notReadNotificationCount,newNotifications:e.skipids.length,"total-notifications-count":e.paginationTotalCount,onClosed:t[1]||(t[1]=c=>e.paginationClearData()),onLoadingInfinite:t[2]||(t[2]=c=>e.loadDataNotifications(e.paginationPage+1,c)),onReLoading:t[3]||(t[3]=c=>e.loadDataNotifications(1,null,!0)),onLoading:t[4]||(t[4]=c=>e.loadDataNotifications(1,null,!0))},null,8,["is-menu-opened","notifications","notReadNotificationCount","newNotifications","total-notifications-count"]),n("div",At,[n("div",$t,[xt,n("div",Ot,[n("ul",null,[(a(!0),r(A,null,O(e.menuItems,(c,g)=>(a(),r("li",{key:g,class:Ne(["b_sidebar_menu-item"]),onClick:S=>c.action&&c.action()},[c.url?(a(),x(m,{key:0,to:c.url},{default:M(()=>[n("img",{src:c.img,alt:""},null,8,Ft)]),_:2},1032,["to"])):(a(),r("a",Lt,[n("img",{src:c.img},null,8,Bt)]))],8,Tt))),128))])])]),n("div",Pt,[n("div",Et,[C(v,{"full-name":"Yaroslav Makovskyi",onClick:e.goToProfile},null,8,["onClick"]),n("div",{onClick:t[5]||(t[5]=(...c)=>e.logOut&&e.logOut(...c)),class:"b_sidebar_logout d-flex justify-content-center align-items-center"},Dt)])])])])}const Wt=I(Mt,[["render",Ht],["__scopeId","data-v-4cde3dfe"]]);const jt={class:"b_breadcrumbs"},zt={key:0,src:Ee,alt:""},Ut={__name:"Breadcrumbs",setup(o){const{breadcrumbs:t}=H().currentRoute.value.meta;return(i,e)=>{const d=y("router-link");return a(),r("div",jt,[n("ul",null,[(a(!0),r(A,null,O(V(t),(_,s)=>(a(),r("li",{key:_.name},[C(d,{to:s+1===V(t).length?"":_.path},{default:M(()=>[$(p(_.name),1)]),_:2},1032,["to"]),s+1!==V(t).length?(a(),r("img",zt)):h("",!0)]))),128))])])}}},Vt=I(Ut,[["__scopeId","data-v-5ed4740b"]]);const Yt={name:"SearchModal",props:{clientX:{type:Number,default:0},clientY:{type:Number,default:0}},emits:["closeModal"],setup(o){return{frameStyle:w(()=>({left:`${o.clientX}px`,top:`${o.clientY}px`}))}}};function Xt(o,t,i,e,d,_){return a(),r("div",{class:"b-search-modal",onClick:t[0]||(t[0]=oe(s=>o.$emit("closeModal"),["self"]))},[n("div",{class:"b-search-modal__window-frame",style:N(e.frameStyle)},[X(o.$slots,"frame-data",{},void 0,!0)],4)])}const Gt=I(Yt,[["render",Xt],["__scopeId","data-v-a181f07f"]]),qt="/assets/arrow-long-right.769ebbd9.svg",Jt="/assets/mob-menu-icon.297a58b5.svg",Kt="/assets/logo-header.d812c47e.svg";const Qt={components:{BreadCrumbs:Vt,InputComponent:Re,SearchModal:Gt,SearchBlockAll:De},setup(){const o=b(!1),t=b(0),i=b(0),e=b(369),d=b(0),_=b(window.innerWidth);_.value<576&&(e.value="100%",t.value=0);const s=w(()=>({search:He,arrow:qt})),m=w(()=>({tags:B.manage_event.tags,teams:B.manage_event.teams}));function v(l){o.value=!0,d.value=e.value-l.target.parentNode.clientWidth,t.value=l.target.parentNode.offsetLeft-d.value,i.value=l.target.parentNode.offsetHeight+20}function c({x:l,y:u}){t.value=l-d.value,i.value=u+20}function g(){o.value=!1}function S(){_.value=window.innerWidth,_.value<576?(e.value="100%",t.value=0):e.value=369}return Me(()=>{window.addEventListener("resize",S)}),q(()=>{window.removeEventListener("resize",S)}),{showSearchBlock:v,closeSearchBlock:g,setInputCoordinates:c,icons:s,isSearchBlock:o,clientX:t,clientY:i,mockData:m,modalSearchWidth:e}}},ue=o=>(P("data-v-a20e3ab1"),o=o(),E(),o),Zt={class:"b_header"},eo=ue(()=>n("img",{src:Jt,alt:""},null,-1)),to=[eo],oo=ue(()=>n("div",{class:"b_header_logo"},[n("img",{src:Kt,alt:""})],-1)),no={class:"b_header_search-block"},so={class:"b_header_search-input"};function io(o,t,i,e,d,_){const s=y("SearchBlockAll"),m=y("SearchModal"),v=y("BreadCrumbs"),c=y("InputComponent");return a(),r("div",Zt,[e.isSearchBlock?(a(),x(m,{key:0,"client-x":e.clientX,"client-y":e.clientY,onCloseModal:e.closeSearchBlock},{"frame-data":M(()=>[C(s,{width:e.modalSearchWidth,tags:e.mockData.tags,"filtered-teams":e.mockData.teams,"list-item-icon":e.icons.arrow},null,8,["width","tags","filtered-teams","list-item-icon"])]),_:1},8,["client-x","client-y","onCloseModal"])):h("",!0),n("div",{class:"b_header_mob-menu-icon",onClick:t[0]||(t[0]=g=>o.$emit("menuIconClick"))},to),C(v),oo,n("div",no,[n("div",so,[C(c,{"title-width":0,placeholder:o.$t("header.search-events"),icon:e.icons.search,onOnClickAction:e.showSearchBlock,onSendInputCoordinates:e.setInputCoordinates},null,8,["placeholder","icon","onOnClickAction","onSendInputCoordinates"])])])])}const ao=I(Qt,[["render",io],["__scopeId","data-v-a20e3ab1"]]),lo="/assets/notification-white.ddaba099.svg",co="/assets/record-white.98970178.svg",ro="/assets/members-white.1b7f0bc3.svg",_o="/assets/Settings-white.d85f4ec1.svg",uo="/assets/logout-icon.82cd7f5e.svg";const mo={name:"MobileMenu",props:{isMenuActive:{type:Boolean,default:!1}},emit:["closeMenu"],setup(o,{emit:t}){const i=b([{id:0,value:"\u0421\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F",value_show:!0,imgInactive:ze,imgActive:lo,isIconActive:!1,width:"50%",height:"76px",alignement:"flex-start",background:"#FFFFFF",textColor:"#575775"},{id:1,value:"\u041F\u043E\u0434\u0456\u0457",value_show:!0,imgInactive:re,imgActive:co,isIconActive:!1,width:"50%",height:"76px",alignement:"flex-start",background:"#FFFFFF",textColor:"#575775",url:L.APPLICATION.EVENTS.absolute}]),e=b([{id:0,value:"\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432",value_show:!0,imgInactive:ae,imgActive:ro,isIconActive:!1,width:"50%",height:"76px",alignement:"flex-start",background:"#FFFFFF",textColor:"#575775",url:L.APPLICATION.USERS.GENERAL.absolute},{id:1,value:"\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u044F",value_show:!0,imgInactive:de,imgActive:_o,isIconActive:!1,width:"50%",height:"76px",alignement:"flex-start",background:"#FFFFFF",textColor:"#575775",url:L.APPLICATION.PROFILE.MY_PROFILE.absolute}]),d=H(),_=w(()=>({letters:B.mob_menu.letters})),s=b("auto"),m=w(()=>({height:s.value})),v=w(()=>({transform:`translateX(${o.isMenuActive?0:-100}%)`}));function c(){g(i),g(e),s.value="auto",t("closeMenu")}function g(u){u.value=u.value.map(k=>({...k,value_show:!0,isIconActive:!1,width:"50%",height:"76px",alignement:"flex-start",background:"#FFFFFF",textColor:"#575775"}))}function S(u,k,f){if(k){d.push(k),c();return}s.value="100%";const T=f==="top-menu"?i:e,W=f==="top-menu"?e:i,ve=u?0:1;g(W),T.value=T.value.map(F=>F.id===u?{...F,value_show:!0,isIconActive:!0,width:"80%",height:"52px",alignement:"flex-start",background:"#575775",textColor:"#fff"}:F),T.value=T.value.map(F=>F.id===ve?{...F,value_show:!1,isIconActive:!1,width:"20%",height:"52px",alignement:"center",background:"#FFFFFF",textColor:"#575775"}:F)}return{topMenu:i,bottomMenu:e,mockData:_,menuBlockStyle:m,mobMenuStyle:v,lineMenuClick:S,closeMobMenu:c,logOut:()=>{J.clearToken(),d.push(L.AUTHENTICATIONS.LOGIN.absolute)}}}},U=o=>(P("data-v-342db72f"),o=o(),E(),o),fo={class:"b-mob-menu__logo-block"},vo={class:"b-mob-menu__logo"},bo={class:"b-mob-menu__user-data"},go=U(()=>n("div",{class:"b-mob-menu__user-img"},[n("img",{src:Ie,alt:""})],-1)),po={class:"b-mob-menu__text-block"},ho=U(()=>n("div",{class:"b-mob-menu__user-name"},"\u0421\u0442\u0435\u0444\u0430\u043D\u0456\u044F \u041A\u0430\u043B\u0438\u043D\u043E\u0432\u0441\u044C\u043A\u0430",-1)),yo={class:"b-mob-menu__account-type"},ko=U(()=>n("img",{src:uo,alt:""},null,-1)),Co=[ko],So={class:"b-mob-menu__line"},wo=["onClick"],No=["src"],Mo={key:0},Io={class:"b-mob-menu__content-block"},Ao={class:"b-mob-menu__message-list"},$o={class:"b-mob-menu__left-side"},xo=["src"],Oo=U(()=>n("div",{class:"b-mob-menu__is-user-active"},null,-1)),To={class:"b-mob-menu__right-side"},Fo={class:"b-mob-menu__top-line"},Lo={class:"b-mob-menu__bottom-line"},Bo=["src"],Po={class:"b-mob-menu__line"},Eo=["onClick"],Ro=["src"],Do={key:0};function Ho(o,t,i,e,d,_){return a(),r("div",{class:"b-mob-menu",style:N(e.mobMenuStyle)},[n("div",fo,[n("div",vo,p(o.$t("menu.blanball")),1),n("div",{class:"b-mob-menu__close",onClick:t[0]||(t[0]=(...s)=>e.closeMobMenu&&e.closeMobMenu(...s))},"\xD7")]),n("div",bo,[go,n("div",po,[ho,n("div",yo,p(o.$t("menu.guest-account")),1)]),n("div",{class:"b-mob-menu__logout-icon",onClick:t[1]||(t[1]=(...s)=>e.logOut&&e.logOut(...s))},Co)]),n("div",{class:"b-mob-menu__menu-block",style:N(e.menuBlockStyle)},[n("div",So,[(a(!0),r(A,null,O(e.topMenu,s=>(a(),r("div",{class:"b-mob-menu__menu-item",key:s.id,style:N({width:s.width,height:s.height,"justify-content":s.alignement,background:s.background,color:s.textColor}),onClick:m=>e.lineMenuClick(s.id,s.url,"top-menu")},[n("img",{src:s.isIconActive?s.imgActive:s.imgInactive,alt:""},null,8,No),s.value_show?(a(),r("span",Mo,p(s.value),1)):h("",!0)],12,wo))),128))]),n("div",Io,[n("div",Ao,[(a(!0),r(A,null,O(e.mockData.letters,s=>(a(),r("div",{class:"b-mob-menu__message",key:s.id},[n("div",$o,[n("img",{src:s.userImg,alt:""},null,8,xo),Oo]),n("div",To,[n("div",Fo,[n("span",null,p(s.sender),1),n("span",null,p(s.time),1)]),n("div",Lo,[n("span",null,p(s.topic),1),n("img",{src:s.icon,alt:""},null,8,Bo)])])]))),128))])]),n("div",Po,[(a(!0),r(A,null,O(e.bottomMenu,s=>(a(),r("div",{class:"b-mob-menu__menu-item",key:s.id,style:N({width:s.width,height:s.height,"justify-content":s.alignement,background:s.background,color:s.textColor}),onClick:m=>e.lineMenuClick(s.id,s.url)},[n("img",{src:s.isIconActive?s.imgActive:s.imgInactive,alt:""},null,8,Ro),s.value_show?(a(),r("span",Do,p(s.value),1)):h("",!0)],12,Eo))),128))])],4)],4)}const Wo=I(mo,[["render",Ho],["__scopeId","data-v-342db72f"]]),jo="/assets/cloud-hands.1bbdf146.svg";const zo={name:"ModalTopCard",props:{step:{type:Object,default:()=>({})},isOpened:{type:Boolean,default:!0}},setup(o){const t=w(()=>({transform:o.isOpened?"rotate(-180deg)":"rotate(-90deg)"})),i=w(()=>({"font-weight":700,"font-size":"24px","line-height":"28px",color:"#262541"})),e=w(()=>({height:o.isOpened?"auto":0}));return{lastTitleStyle:i,mainBlockCardStyle:e,arrowStyle:t}}},me=o=>(P("data-v-a14e2eed"),o=o(),E(),o),Uo={class:"b-modal-top-card"},Vo={class:"b-modal-top-card__arrow-cross-block"},Yo=me(()=>n("img",{src:ne,alt:""},null,-1)),Xo=[Yo],Go=me(()=>n("img",{src:se,alt:""},null,-1)),qo=[Go],Jo={class:"b-modal-top-card__title-wrapper"},Ko={key:0,src:jo,alt:"cloud-hands"},Qo={class:"b-modal-top-card__subtitle"},Zo={class:"b-modal-top-card__last-subtitle"},en={key:0,class:"b-modal-top-card__emotions"},tn=["src"],on={key:1,class:"b-modal-top-card__btns-block"};function nn(o,t,i,e,d,_){return a(),r("div",Uo,[n("div",Vo,[i.step.id!==4?(a(),r("div",{key:0,class:"b-modal-top-card__arrow",style:N(e.arrowStyle),onClick:t[0]||(t[0]=s=>o.$emit("arrowClick"))},Xo,4)):(a(),r("div",{key:1,class:"b-modal-top-card__cross",onClick:t[1]||(t[1]=s=>o.$emit("crossClick"))},qo))]),n("div",Jo,[i.step.id===4?(a(),r("img",Ko)):h("",!0),n("div",{class:"b-modal-top-card__title",style:N(i.step.id===4&&e.lastTitleStyle)},p(i.step.title),5)]),n("div",{class:"b-modal-top-card__main-block",style:N(e.mainBlockCardStyle)},[n("div",Qo,p(i.step.subtitle),1),n("div",Zo,p(i.step.last_subtitle),1),i.step.emojies?(a(),r("div",en,[(a(!0),r(A,null,O(i.step.emojies,s=>(a(),r("div",{key:s,class:"b-modal-top-card__emoji"},[n("img",{src:s,alt:""},null,8,tn)]))),128))])):h("",!0),i.step.buttons?(a(),r("div",on,[n("div",{class:"b-modal-top-card__cancel-btn",onClick:t[2]||(t[2]=s=>o.$emit("cancelClick"))},p(i.step.buttons.cancel),1),n("div",{class:"b-modal-top-card__next-btn",onClick:t[3]||(t[3]=s=>o.$emit("nextClick"))},p(i.step.buttons.next),1)])):h("",!0)],4)])}const sn=I(zo,[["render",nn],["__scopeId","data-v-a14e2eed"]]),an="/assets/message-icon.1dfc3fdb.svg";const ln={name:"RatePlayerCard",components:{StarRating:We},props:{player:{type:Object,default:()=>({})}},setup(o){return{rating:b(3)}}},cn=o=>(P("data-v-5b3e7df5"),o=o(),E(),o),rn={class:"b-player-card"},dn={class:"b-player-card__left-part"},_n={class:"b-player-card__player-name"},un={class:"b-player-card__right-part"},mn={class:"b-player-card__rating"},fn=cn(()=>n("div",{class:"b-player-card__message"},[n("img",{src:an,alt:""})],-1));function vn(o,t,i,e,d,_){const s=y("star-rating");return a(),r("div",rn,[n("div",dn,[n("div",{class:"b-player-card__team-label",style:N({background:i.player.color})},p(i.player.label),5),n("div",_n,p(i.player.name),1)]),n("div",un,[n("div",mn,[C(s,{rating:e.rating,"star-size":14,"show-rating":!1,"read-only":!0,"active-color":"#148783"},null,8,["rating"])]),fn])])}const bn=I(ln,[["render",vn],["__scopeId","data-v-5b3e7df5"]]);const gn={name:"ModalBottomCard",components:{RatePlayerCard:bn},props:{isOpened:{type:Boolean,default:!1}},setup(o){const t=w(()=>({width:o.isOpened?"888px":"400px",height:o.isOpened?"656px":"auto"})),i=w(()=>({transform:o.isOpened?"rotate(-180deg)":"rotate(-90deg)"})),e=w(()=>B.modal_feedback.players);return{bottomCardStyle:t,arrowStyle:i,players:e}}},fe=o=>(P("data-v-a4a2112c"),o=o(),E(),o),pn={class:"b-modal-bottom-card__title-line"},hn={class:"b-modal-bottom-card__title"},yn=fe(()=>n("img",{src:ne,alt:""},null,-1)),kn=[yn],Cn={key:0,class:"b-modal-bottom-card__send-complain"},Sn=fe(()=>n("img",{src:je,alt:""},null,-1)),wn={key:0,class:"b-modal-bottom-card__players-viewport"},Nn={class:"b-modal-bottom-card__players-wrapper"},Mn={class:"b-modal-bottom-card__team-1"},In={class:"b-modal-bottom-card__team-2"};function An(o,t,i,e,d,_){const s=y("RatePlayerCard");return a(),x(Ae,null,{default:M(()=>[n("div",{class:"b-modal-bottom-card",style:N(e.bottomCardStyle)},[n("div",pn,[n("div",hn,p(o.$t("modal_feedback.evaluate_game")),1),n("div",{class:"b-modal-bottom-card__arrow",style:N(e.arrowStyle),onClick:t[0]||(t[0]=m=>o.$emit("arrowClick"))},kn,4),i.isOpened?(a(),r("div",Cn,[Sn,$(" "+p(o.$t("modal_feedback.complain")),1)])):h("",!0)]),i.isOpened?(a(),r("div",wn,[n("div",Nn,[n("div",Mn,[(a(!0),r(A,null,O(e.players.team_1,m=>(a(),x(s,{key:m.id,player:m},null,8,["player"]))),128))]),n("div",In,[(a(!0),r(A,null,O(e.players.team_2,m=>(a(),x(s,{key:m.id,player:m},null,8,["player"]))),128))])])])):h("",!0)],4)]),_:1})}const $n=I(gn,[["render",An],["__scopeId","data-v-a4a2112c"]]);const xn={name:"ModalFeedback",components:{ModalTopCard:sn,ModalBottomCard:$n},setup(){const o=b(!0),t=w(()=>B.modal_feedback.steps),i=b(0);function e(){o.value=!o.value}return{steps:t,currentStep:i,isCardTopOpened:o,toggleCard:e}}},On={class:"b-modal-feedback"},Tn={key:0,class:"b-modal-feedback__window"};function Fn(o,t,i,e,d,_){const s=y("ModalTopCard"),m=y("ModalBottomCard");return a(),r("div",null,[n("div",{class:"b-modal-feedback__modal-wrapper",onClick:t[3]||(t[3]=oe(v=>o.$emit("close-modal"),["self"]))},[n("div",On,[(a(!0),r(A,null,O(e.steps,v=>(a(),r(A,{key:v.id},[e.currentStep===v.id?(a(),r("div",Tn,[C(s,{step:v,"is-opened":e.isCardTopOpened,onCancelClick:t[0]||(t[0]=c=>e.currentStep--),onNextClick:t[1]||(t[1]=c=>e.currentStep++),onCrossClick:t[2]||(t[2]=c=>o.$emit("close-modal")),onArrowClick:e.toggleCard},null,8,["step","is-opened","onArrowClick"]),C(m,{"is-opened":!e.isCardTopOpened,onArrowClick:e.toggleCard},null,8,["is-opened","onArrowClick"])])):h("",!0)],64))),128))])])])}const Ln=I(xn,[["render",Fn],["__scopeId","data-v-b5f3273e"]]),Bn="/assets/message_audio.1867ec07.mp3";const Pn={class:"main-wrapper"},En={class:"main-block"},Rn={class:"container"},Dn={class:"main-body-inner"},Qn={__name:"index",setup(o){const t=b(!1),i=b({review:{data:{},active:!1}}),e=H(),d=$e(),_=new Audio(Bn);let s;const m=async(l,u)=>{clearTimeout(s),await te({item:l,notificationInstance:u,router:e})},v=(l,u,k)=>{const f=c(l,u);f.componentOptions.props.active=k,d.update(u,{content:f.componentOptions,options:f.options})},c=(l,u)=>{const k=l.actions.find(f=>f.type===G.Close);return l.actions=l.actions.filter(f=>f.type!==G.Close),{componentOptions:{component:K,props:{notificationInstance:l,notificationType:"notification-push"},listeners:{handlerAction:async f=>{v(l,u,!0),await m(f,l),v(l,u,!1),d.dismiss(u)},handlerClose:async()=>{k&&(v(l,u,!0),await m(k,l),v(l,u,!1)),d.dismiss(u)}}},options:{id:u,timeout:!1,position:"top-right",closeOnClick:!1,draggable:!1,draggablePercent:.6,showCloseButtonOnHover:!1,hideProgressBar:!0,closeButton:"button",icon:!1,rtl:!1,toastClassName:[l.getPushNotificationTheme()]}}},g=l=>{const u=c(l,ie()),k=d(u.componentOptions,u.options);l.timeForClose&&(s=setTimeout(()=>{d.dismiss(k)},l.timeForClose))},S=l=>{l.pushNotification&&(g(l),_.play())};return z.registerCallback(S).connect({token:J.getToken()}),q(()=>{z.destroyCallback(S).disconnect()}),(l,u)=>{const k=y("router-view");return a(),r("div",Pn,[C(Wo,{isMenuActive:t.value,onCloseMenu:u[0]||(u[0]=f=>t.value=!1)},null,8,["isMenuActive"]),C(Wt),n("div",En,[n("div",Rn,[n("div",Dn,[C(ao,{onMenuIconClick:u[1]||(u[1]=f=>t.value=!0)}),C(k)])])]),i.value.review.active?(a(),x(Ln,{key:0,onCloseModal:l.toggleModal},null,8,["onCloseModal"])):h("",!0)])}}};export{Qn as default};
