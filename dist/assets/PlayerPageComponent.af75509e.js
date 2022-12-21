import{S}from"./VueStarRating.common.214da42f.js";import{_ as $,L as E,b as p,d as N,A as w,ai as u,r as P,o as r,c,a as D,e,t as a,f as k,S as h,U as m,p as I,h as L}from"./index.d5b3c164.js";import{d as f}from"./uk.f6fab5a0.js";import{_ as R}from"./arrow-right.736d9638.js";const A="/assets/public-page-back.7bd88e15.svg",B="/assets/user-page-back.a8800054.svg",M="/assets/fit-weight.66ad8a5d.svg",x="/assets/measure-tape.ffc09a1e.svg",U="/assets/photo-user-big.58fe864a.svg",V="/assets/envelop-black.ba5a1144.svg",j="/assets/phone-arrow.2e1007bd.svg",C="/assets/star.c8779f65.svg";const F="public",q={name:"PlayerPage",components:{StarRating:S,Loading:E},props:{pageMode:{type:String,default:""},userData:{type:Object,default:()=>{}}},setup(s){const _=p(s.userData.id),i=p(0),l=p([]),g=p(!0),y=p([]),v=p([{id:3,title:"\u0406\u0433\u0440\u043E\u0432\u0430 \u043F\u043E\u0437\u0438\u0446\u0456\u044F",img:M,featureName:s.userData.profile.position},{id:1,title:"\u0412\u0430\u0433\u0430",img:M,featureName:s.userData.profile.weight},{id:2,title:"\u0423\u0434\u0430\u0440\u043D\u0430 \u043D\u043E\u0433\u0430",img:x,featureName:s.userData.profile.working_leg},{id:0,title:"\u0417\u0440\u0456\u0441\u0442",img:x,featureName:s.userData.profile.height}]),b=N(()=>s.userData.raiting||0);w.ReviewService.getUserReviews(_.value).then(o=>{i.value=o.data.page_size||0,l.value=o.data.results.map(n=>({...n,date:`${u(n.time_created).locale(f).format("D MMMM")}`}))||[],t(),g.value=!1}).catch(o=>{g.value=!1});function t(){w.EventService.getPlannedUserEvents(_.value).then(o=>{y.value=o.data.map(n=>({...n,time:`${u(n.time_created).locale(f).format("hh : mm")}`,date:`${u(n.time_created).locale(f).format("D MMMM")}`}))}).catch(o=>console.log("some mistake",o))}return{userRating:b,reviewQuantity:i,userReviews:l,playFeatures:v,loading:g,myPlannedEvents:y}},data(){return{users:new Array(6).fill("t").map((s,_)=>({id:_,name:"\u0413\u043E\u043D\u0447\u0430\u0440\u0443\u043A \u041F\u0430\u0432\u043B\u043E",date:"3 \u0441\u0435\u0440\u043F\u043D\u044F",text:"\u041A\u0440\u0443\u0442\u043E \u0437\u0456\u0433\u0440\u0430\u043B\u0430, \u0432\u0456\u0434\u043C\u0456\u043D\u043D\u0456 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0456 \u0456 \u0449\u0435 \u044F\u043A\u0456\u0441\u044C \u0442\u0430\u043C \u0441\u043B\u043E\u0432\u0430 \u043F\u043E\u0445\u0432\u0430\u043B\u0438 \u0432 \u043A\u0456\u043B\u044C\u043A\u0430 \u0440\u044F\u0434\u043A\u0456\u0432"})),events:new Array(2).fill("t").map((s,_)=>({id:_,title:"\u0414\u0440\u0443\u0436\u043D\u0456\u0439 \u043C\u0430\u0442\u0447",position:"\u0413\u0440\u0430\u0432\u0435\u0446\u044C",time:"12:00 \u2013 14:00",date:"3 \u0441\u0435\u0440\u043F\u043D\u044F",labels:[{id:0,text:"\u0424\u0443\u0442\u0431\u043E\u043B"},{id:1,text:"\u0427\u043E\u043B\u043E\u0432\u0456\u043A\u0438"},{id:2,text:"\u0420\u043E\u0437\u0440\u044F\u0434"}]}))}},computed:{backPic(){return this.pageMode===F?A:B}}},d=s=>(I("data-v-1886f99e"),s=s(),L(),s),z={class:"b-player-page"},O={class:"b-player-page__back-image"},Q=["src"],T={class:"b-player-page__main-block"},G={class:"b-player-page__user-card"},W={class:"b-player-page__top-line"},H=d(()=>e("div",{class:"b-player-page__picture"},[e("img",{src:U,alt:""})],-1)),J={class:"b-player-page__line"},K={class:"b-player-page__surname"},X={class:"b-player-page__line"},Y={class:"b-player-page__name"},Z={class:"b-player-page__label"},ee={class:"b-player-page__line mt-8"},ae={class:"b-player-page__title"},se={class:"b_player-qualification"},te={class:"b-player-page__line"},le={class:"b-player-page__invite"},_e={class:"b-player-page__line"},ie={class:"b-player-page__send-email"},oe=d(()=>e("img",{src:V,alt:""},null,-1)),re={class:"b-player-page__call"},ce=d(()=>e("img",{src:j,alt:""},null,-1)),ne={class:"b-player-page__about-line"},pe={class:"b-player-page__title"},de={class:"b-player-page__text"},ge={class:"b-player-page__right-block"},ye={class:"b-player-page__features-reviews-block"},ve={class:"b-player-page__play-features"},be={class:"b-player-page__main-titles-text"},ue={class:"b-player-page__play-blocks"},he=["src"],me={class:"b-player-page__text-block"},fe={class:"b-player-page__small-text"},ke={class:"b-player-page__feature-name"},we={class:"b-player-page__play-reviews"},Pe={class:"b-player-page__title-line"},De={class:"b-player-page__left-side"},Me={class:"b-player-page__main-titles-text"},xe={class:"b-player-page__small-text"},Se=d(()=>e("div",{class:"b-player-page__right-side"},[k(" 4 "),e("img",{src:C,alt:""})],-1)),$e={class:"b-player-page__feedback-blocks"},Ee={class:"b-player-page__name-date-line"},Ne={class:"b-player-page__name"},Ie={class:"b-player-page__small-text"},Le={class:"b-player-page__main-text"},Re={class:"b-player-page__events-history-block"},Ae={class:"b-player-page__play-events"},Be={class:"b-player-page__main-titles-text"},Ue={class:"b-player-page__event-blocks"},Ve={class:"b-player-page__title-line"},je={class:"b-player-page__title"},Ce={class:"b-player-page__position"},Fe={class:"b-player-page__labels-line"},qe={class:"b-player-page__label"},ze={class:"b-player-page__label"},Oe={class:"b-player-page__time-line"},Qe={class:"b-player-page__small-text mr-16"},Te={class:"b-player-page__small-text"},Ge={class:"b-player-page__play-history"},We={class:"b-player-page__main-titles-text"},He=d(()=>e("img",{src:R,alt:""},null,-1));function Je(s,_,i,l,g,y){const v=P("Loading"),b=P("star-rating");return r(),c("div",z,[D(v,{"is-loading":l.loading},null,8,["is-loading"]),e("div",O,[e("img",{src:y.backPic,alt:""},null,8,Q)]),e("div",T,[e("div",G,[e("div",W,[H,e("div",J,[e("div",K,a(i.userData.profile.last_name),1),D(b,{rating:i.userData.raiting,"star-size":14,"show-rating":!1,"read-only":!0,"active-color":"#148783"},null,8,["rating"])]),e("div",X,[e("div",Y,a(i.userData.profile.name),1),e("div",Z,a(s.$t("player_page.player")),1)]),e("div",ee,[e("div",ae,a(s.$t("player_page.qualification")),1),e("div",se,a(s.$t("player_page.approved")),1)]),e("div",te,[e("div",le,a(s.$t("player_page.invite")),1)]),e("div",_e,[e("div",ie,[oe,k(" "+a(s.$t("player_page.write-email")),1)]),e("div",re,[ce,k(" "+a(s.$t("player_page.call")),1)])])]),e("div",ne,[e("div",pe,a(s.$t("player_page.about-yourself")),1),e("div",de,a(i.userData.profile.about_me),1)])]),e("div",ge,[e("div",ye,[e("div",ve,[e("div",be,a(s.$t("player_page.play-characteristics")),1),e("div",ue,[(r(!0),c(h,null,m(l.playFeatures,t=>(r(),c("div",{key:t.id,class:"b-player-page__play-block"},[e("img",{src:t.img,alt:""},null,8,he),e("div",me,[e("div",fe,a(t.title),1),e("div",ke,a(t.featureName),1)])]))),128))])]),e("div",we,[e("div",Pe,[e("div",De,[e("div",Me,a(s.$t("player_page.feedbacks")),1),e("div",xe,a(l.reviewQuantity)+" \u043E\u0446\u0456\u043D\u043E\u043A ",1)]),Se]),e("div",$e,[(r(!0),c(h,null,m(l.userReviews,t=>(r(),c("div",{key:t.id,class:"b-player-page__feedback-block"},[e("div",Ee,[e("div",Ne,a(t.last_name)+" "+a(t.name),1),e("div",Ie,a(t.date),1)]),e("div",Le,a(t.text),1)]))),128))])])]),e("div",Re,[e("div",Ae,[e("div",Be,a(s.$t("player_page.planned-events")),1),e("div",Ue,[(r(!0),c(h,null,m(l.myPlannedEvents,t=>(r(),c("div",{key:t.id,class:"b-player-page__event-block"},[e("div",Ve,[e("div",je,a(t.name),1),e("div",Ce,a(s.$t("player_page.player")),1)]),e("div",Fe,[e("div",qe,a(t.type),1),e("div",ze,a(t.gender),1)]),e("div",Oe,[e("div",Qe,a(t.date),1),e("div",Te,a(t.time),1)])]))),128))])]),e("div",Ge,[e("div",We,a(s.$t("player_page.history")),1),He])])])])])}const ea=$(q,[["render",Je],["__scopeId","data-v-1886f99e"]]);export{ea as P};
