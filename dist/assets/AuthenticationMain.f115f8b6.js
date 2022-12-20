import{_ as C,b as v,P as f,j as P,k as w,o as r,c as l,A as L,d as O,r as B,e as n,g as _,l as N,m as I,v as T,n as A,t as D,a as x,C as G,p as j,h as E}from"./index.1baec81e.js";import{P as U,a as V}from"./map.styles.bd588d81.js";const S={Ukraine:{east:40.2275801,north:52.3791473,south:44.184598,west:22.137059}},z=e=>({lat:(e.north-e.south)/2+e.south,lng:(e.east-e.west)/2+e.west}),R={name:"PositionMap",props:{coords:{type:Object}},setup(e,{emit:g}){const o=v({centerOfCountry:z(S.Ukraine),userCenter:{}}),s=v({});let c;function p(t,a){return new google.maps.Marker({position:a,map:t})}const i=async t=>{var d,u;const a={lat:t==null?void 0:t.lat,lng:t==null?void 0:t.lng,place:(u=(d=await L.LocationService.GetPlaceByCoords(t||o.value.centerOfCountry))==null?void 0:d.data)==null?void 0:u.data};g("update:coords",a),f.emit("update:coords",a)};f.on("update:map:by:coords",t=>{var d,u,b,h,y,k;i({lat:+((d=t.data.coordinates)==null?void 0:d.lat),lng:+((u=t.data.coordinates)==null?void 0:u.lon)}),s.value.setPosition({lat:+((b=t.data.coordinates)==null?void 0:b.lat),lng:+((h=t.data.coordinates)==null?void 0:h.lon)});const a=new google.maps.LatLng(+((y=t.data.coordinates)==null?void 0:y.lat),+((k=t.data.coordinates)==null?void 0:k.lon));c.setCenter(a)});const m=t=>{o.userCenter=t?{lat:t.latitude,lng:t.longitude}:o.value.centerOfCountry,c=new google.maps.Map(document.getElementById("map"),{center:o.userCenter,zoom:12,overviewMapControlOptions:{opened:!1},restriction:{latLngBounds:S.Ukraine,strictBounds:!0},styles:U}),c.data.setStyle(V),s.value=p(c,o.userCenter),i(o.userCenter),google.maps.event.addListener(c,"click",function(a){s.value.setPosition(a.latLng),i(a.latLng.toJSON())})};P(()=>e.coords,()=>s.value.setPosition(event.latLng)),w(()=>{navigator.geolocation.getCurrentPosition(t=>m(t.coords),()=>m())})}},$={id:"map",style:{height:"100%",width:"100%"}};function F(e,g,o,s,c,p){return r(),l("div",$)}const J=C(R,[["render",F]]),M="/assets/ball-colored.9ab84830.svg",q="/assets/google-play.62f2c80a.svg";const H={name:"Auth",components:{PositionMap:J},props:{backgroundTab:{type:String,default:""},backgroundMob:{type:String,default:""},rightSideStyle:{type:Object,default:()=>{}},currentStep:{type:Number,default:null},blockType:{type:String,default:""}},setup(){return{mockData:O(()=>({LOGIN:G.register.authBlockTypes.login}))}}},K=e=>(j("data-v-a2319d51"),e=e(),E(),e),Q={class:"b-auth"},W={key:0,class:"b-auth__background-tab"},X=["src"],Y={key:1,class:"b-auth__background-mob"},Z=["src"],tt={class:"b-auth__central-block"},et={key:0,src:M,alt:"ball-big",class:"b-auth__ball-big"},ot={key:1,src:M,alt:"ball-small",class:"b-auth__ball-small"},at={class:"b-auth__left-part"},st={class:"b-auth__google-play-block"},nt=K(()=>n("img",{src:q,alt:""},null,-1)),ct={key:2,class:"b-auth__right-part",style:{height:"600px"}};function rt(e,g,o,s,c,p){const i=B("position-map");return r(),l("div",Q,[o.backgroundTab?(r(),l("div",W,[n("img",{src:o.backgroundTab,alt:"background image tablet"},null,8,X)])):_("",!0),o.backgroundMob?(r(),l("div",Y,[n("img",{src:o.backgroundMob,alt:"background image mobile"},null,8,Z)])):_("",!0),n("div",tt,[o.blockType===s.mockData.LOGIN?(r(),l("img",et)):_("",!0),o.blockType===s.mockData.LOGIN?(r(),l("img",ot)):_("",!0),n("div",at,[N(e.$slots,"main-content",{},void 0,!0)]),I(n("div",{class:"b-auth__right-part",style:A(o.rightSideStyle)},[n("div",st,[nt,n("span",null,D(e.$t("register.load-app")),1)])],4),[[T,o.currentStep!==10]]),o.currentStep===10?(r(),l("div",ct,[x(i)])):_("",!0)])])}const dt=C(H,[["render",rt],["__scopeId","data-v-a2319d51"]]);export{dt as A,M as _};
