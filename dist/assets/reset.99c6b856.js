import{b as C,u as B,d as v,_ as A,r as m,o as n,i as I,w as $,e as i,t as p,c as o,U as q,M as N,S as F,g as c,a as _,A as R,R as M}from"./index.ae25520c.js";import{G as T}from"./GreenBtn.d0cf3bc4.js";import{I as V,F as O,e as G,a as P}from"./InputComponent.c16e64a3.js";import{c as w,a as b,d as z}from"./object.2f7a88af.js";import{C as E}from"./CodeInput.adb4427a.js";import{A as U}from"./AuthenticationMain.041c0830.js";import{b as H,a as L,r as W}from"./registration-back-mob4.14794313.js";import"./map.styles.bd588d81.js";const j={name:"Step1",components:{GreenBtn:T,InputComponent:V,Form:O,CodeInput:E},setup(){const e=C(1),r=C(!1),u=C({}),t=B(),f=v(()=>G),k=v(()=>P);let l=v(()=>e.value===1?w({email:b().email().required()}):e.value===2?w({verify_code:b().required().min(5)}):e.value===3?w({new_password:b().required().min(8),confirm_new_password:b().required().min(8).when("new_password",(s,a)=>s?a.required().oneOf([z("new_password")]):a)}):w({}));const h=()=>{if(e.value===1)return t.back();e.value=e.value-1},y=async s=>{const{valid:a}=await s.validate();if(!a)return!1;r.value=!0,await R.AuthorizationService.ResetPasswordRequest(s.values),e.value=e.value+1,r.value=!1},S=async s=>{const{valid:a}=await s.validate();if(!a)return!1;await R.AuthorizationService.VerifyCodeResetPassword({verify_code:s.controlledValues.verify_code}),u.value=s.controlledValues,e.value=e.value+1},g=async s=>{const{valid:a}=await s.validate();if(!a)return!1;r.value=!0,await R.AuthorizationService.ResetComplete({new_password:s.values.new_password,verify_code:u.value.verify_code}),t.push(M.AUTHENTICATIONS.LOGIN),r.value=!1};async function d(s){switch(e.value){case 1:return await y(s);case 2:return await S(s);case 3:return await g(s)}}return{handleNextClick:d,handleBackClick:h,loading:r,schema:l,currentStep:e,eyeCrossed:f,eyeOpened:k}}},x={class:"b-reset-step"},J={class:"b-reset-step__top-part"},K={class:"b-reset-step__title"},Q={class:"b-reset-step__progress-line"},X={class:"b-reset-step__sections"},Y={key:0,class:"b-reset-step__subtitle"},Z={key:1,class:"b-reset-step__subtitle"},D={key:2,class:"b-reset-step__input"},ee={key:3,class:"b-reset-step__code-title mb-2"},te={key:4,class:"b-reset-step__sms-code-block"},se={key:5,class:"b-reset-step__subtitle"},re={key:6,class:"b-reset-step__input"},ne={key:7,class:"b-reset-step__input"},oe={class:"b-reset-step__buttons"};function ae(e,r,u,t,f,k){const l=m("InputComponent"),h=m("code-input"),y=m("GreenBtn"),S=m("Form");return n(),I(S,{"validation-schema":t.schema},{default:$(g=>[i("div",x,[i("div",J,[i("div",K,p(e.$t("reset.renew-access")),1),i("div",Q,[i("div",X,[(n(),o(F,null,q(3,d=>i("div",{key:d,class:N(["b-reset-step__section",{active:d<=t.currentStep}])},null,2)),64))])]),t.currentStep===1?(n(),o("div",Y,p(e.$t("reset.letter-code")),1)):c("",!0),t.currentStep===2?(n(),o("div",Z,p(e.$t("reset.new-password")),1)):c("",!0),t.currentStep===1?(n(),o("div",D,[_(l,{"outside-title":!0,title:e.$t("reset.post"),placeholder:"example@email.com","title-width":0,name:"email"},null,8,["title","placeholder"])])):c("",!0),t.currentStep===2?(n(),o("div",ee,p(e.$t("reset.message-30sec")),1)):c("",!0),t.currentStep===2?(n(),o("div",te,[_(h,{onComplete:r[0]||(r[0]=d=>e.completed=!0),fields:5,fieldWidth:70,fieldHeight:40,required:!0,name:"verify_code"})])):c("",!0),t.currentStep===3?(n(),o("div",se,p(e.$t("reset.new-password")),1)):c("",!0),t.currentStep===3?(n(),o("div",re,[_(l,{title:e.$t("reset.enter-new-password"),"title-width":0,type:"password","outside-title":!0,placeholder:"********",name:"new_password"},null,8,["title"])])):c("",!0),t.currentStep===3?(n(),o("div",ne,[_(l,{title:e.$t("reset.repeat-new-password"),"title-width":0,type:"password","outside-title":!0,placeholder:"********",name:"confirm_new_password"},null,8,["title"])])):c("",!0)]),i("div",oe,[i("div",{class:"b-reset-step__cancel-button",onClick:r[1]||(r[1]=d=>t.handleBackClick())},p(e.$t("reset.cancel")),1),_(y,{text:e.$t("reset.drop-password"),width:155,loading:t.loading,height:40,onClickFunction:d=>t.handleNextClick(g)},null,8,["text","loading","onClickFunction"])])])]),_:1},8,["validation-schema"])}const ie=A(j,[["render",ae],["__scopeId","data-v-69636520"]]),ce={name:"reset",components:{Stepper:ie,AuthenticationMain:U},setup(){const e=v(()=>H),r=v(()=>L),u=v(()=>({"--back-picture":`url(${W})`}));return{backgroundTab:e,backgroundMob:r,rightSideStyle:u}}};function le(e,r,u,t,f,k){const l=m("Stepper"),h=m("AuthenticationMain");return n(),I(h,{"background-tab":t.backgroundTab,"background-mob":t.backgroundMob,"right-side-style":t.rightSideStyle},{"main-content":$(()=>[_(l)]),_:1},8,["background-tab","background-mob","right-side-style"])}const be=A(ce,[["render",le]]);export{be as default};
