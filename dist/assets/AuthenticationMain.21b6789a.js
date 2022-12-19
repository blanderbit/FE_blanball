import{_ as S,b as T,P as k,j as w,k as x,o as n,c,A as M,d as P,r as L,e as l,g as d,l as O,m as B,v as N,n as I,t as A,a as D,p as G,h as j}from"./index.30b1903a.js";import{C as E}from"./index.b54805f3.js";var U=[{elementType:"geometry",stylers:[{color:"#1d2c4d"}]},{elementType:"labels.text.fill",stylers:[{color:"#8ec3b9"}]},{elementType:"labels.text.stroke",stylers:[{color:"#1a3646"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{color:"#ff0b0f"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#64779e"}]},{featureType:"administrative.province",elementType:"geometry.stroke",stylers:[{color:"#4b6878"}]},{featureType:"landscape.man_made",elementType:"geometry.stroke",stylers:[{color:"#334e87"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#023e58"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#283d6a"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#6f9ba5"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#023e58"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#3C7680"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#304a7d"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#98a5be"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#2c6675"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#255763"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#b0d5ce"}]},{featureType:"road.highway",elementType:"labels.text.stroke",stylers:[{color:"#023e58"}]},{featureType:"transit",elementType:"labels.text.fill",stylers:[{color:"#98a5be"}]},{featureType:"transit",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"transit.line",elementType:"geometry.fill",stylers:[{color:"#283d6a"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#3a4762"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#0e1626"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#4e6d70"}]}],V={fillColor:"white",strokeWeight:2,strokeColor:"#448CCB",fillOpacity:1};const v={Ukraine:{east:40.2275801,north:52.3791473,south:44.184598,west:22.137059}},z=t=>({lat:(t.north-t.south)/2+t.south,lng:(t.east-t.west)/2+t.west}),R={name:"PositionMap",props:{coords:{type:Object}},setup(t,{emit:u}){const o=T({centerOfCountry:z(v.Ukraine),userCenter:{}}),s=T({});let r;function m(e,a){return new google.maps.Marker({position:a,map:e})}const i=async e=>{var y,p;const a={lat:e==null?void 0:e.lat,lng:e==null?void 0:e.lng,place:(p=(y=await M.LocationService.GetPlaceByCoords(e||o.value.centerOfCountry))==null?void 0:y.data)==null?void 0:p.data};u("update:coords",a),k.emit("update:coords",a)};k.on("update:map:by:coords",e=>{var y,p,_,b,f,h;i({lat:+((y=e.data.coordinates)==null?void 0:y.lat),lng:+((p=e.data.coordinates)==null?void 0:p.lon)}),s.value.setPosition({lat:+((_=e.data.coordinates)==null?void 0:_.lat),lng:+((b=e.data.coordinates)==null?void 0:b.lon)});const a=new google.maps.LatLng(+((f=e.data.coordinates)==null?void 0:f.lat),+((h=e.data.coordinates)==null?void 0:h.lon));r.setCenter(a)});const g=e=>{o.userCenter=e?{lat:e.latitude,lng:e.longitude}:o.value.centerOfCountry,r=new google.maps.Map(document.getElementById("map"),{center:o.userCenter,zoom:12,overviewMapControlOptions:{opened:!1},restriction:{latLngBounds:v.Ukraine,strictBounds:!0},styles:U}),r.data.setStyle(V),s.value=m(r,o.userCenter),i(o.userCenter),google.maps.event.addListener(r,"click",function(a){s.value.setPosition(a.latLng),i(a.latLng.toJSON())})};w(()=>t.coords,()=>s.value.setPosition(event.latLng)),x(()=>{navigator.geolocation.getCurrentPosition(e=>g(e.coords),()=>g())})}},$={id:"map",style:{height:"100%",width:"100%"}};function F(t,u,o,s,r,m){return n(),c("div",$)}const J=S(R,[["render",F]]),C="/assets/ball-colored.9ab84830.svg",W="/assets/google-play.62f2c80a.svg";const q={name:"Auth",components:{PositionMap:J},props:{backgroundTab:{type:String,default:""},backgroundMob:{type:String,default:""},rightSideStyle:{type:Object,default:()=>{}},currentStep:{type:Number,default:null},blockType:{type:String,default:""}},setup(){return{mockData:P(()=>({LOGIN:E.register.authBlockTypes.login}))}}},H=t=>(G("data-v-e448014a"),t=t(),j(),t),K={class:"b-auth"},Q={key:0,class:"b-auth__background-tab"},X=["src"],Y={key:1,class:"b-auth__background-mob"},Z=["src"],ee={class:"b-auth__central-block"},te={key:0,src:C,alt:"ball-big",class:"b-auth__ball-big"},oe={key:1,src:C,alt:"ball-small",class:"b-auth__ball-small"},ae={class:"b-auth__left-part"},se={class:"b-auth__google-play-block"},le=H(()=>l("img",{src:W,alt:""},null,-1)),re={key:2,class:"b-auth__right-part",style:{height:"600px"}};function ne(t,u,o,s,r,m){const i=L("position-map");return n(),c("div",K,[o.backgroundTab?(n(),c("div",Q,[l("img",{src:o.backgroundTab,alt:"background image tablet"},null,8,X)])):d("",!0),o.backgroundMob?(n(),c("div",Y,[l("img",{src:o.backgroundMob,alt:"background image mobile"},null,8,Z)])):d("",!0),l("div",ee,[o.blockType===s.mockData.LOGIN?(n(),c("img",te)):d("",!0),o.blockType===s.mockData.LOGIN?(n(),c("img",oe)):d("",!0),l("div",ae,[O(t.$slots,"main-content",{},void 0,!0)]),B(l("div",{class:"b-auth__right-part",style:I(o.rightSideStyle)},[l("div",se,[le,l("span",null,A(t.$t("register.load-app")),1)])],4),[[N,o.currentStep!==6]]),o.currentStep===6?(n(),c("div",re,[D(i)])):d("",!0)])])}const ye=S(q,[["render",ne],["__scopeId","data-v-e448014a"]]);export{ye as A,C as _};
