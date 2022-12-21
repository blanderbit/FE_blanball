import{u as $,b as S,d as _,_ as R,A as E,T as P,R as g,r as d,o as f,c as y,a as c,w as k,e as o,t as n,f as A,g as L,p as V,h as B,i as M,C as O}from"./index.695a002b.js";import{G}from"./GreenBtn.fdc38c74.js";import{I as U,F as x}from"./InputComponent.8771e3c6.js";import{C as F}from"./Checkbox.acff8797.js";import{c as q,a as N,b as D}from"./object.1b1f16cd.js";import{_ as z}from"./warning-red.7e7f7092.js";import{A as H}from"./AuthenticationMain.9f708191.js";import{i as W,a as j}from"./registration-back-1.d065119e.js";import"./v4.5d18198f.js";import"./map.styles.bd588d81.js";const J={name:"Step1",components:{GreenBtn:G,InputComponent:U,Form:x,Checkbox:F},setup(){const e=$(),s=S(!1),r=_(()=>s.value),t=_(()=>({top:r.value?"20px":"-50px"})),h=S({});return{schema:q({email:N().email().required(),save_credentials:D(),password:N().required().min(8)}),initialValues:h,showInvalidCredentials:r,warningTopStyle:t,handleLogin:async a=>{var i;const{valid:l}=await a.validate();if(!l)return!1;try{const T=await E.AuthorizationService.login(a.controlledValues);P.setToken(T.data.tokens.access),a.values.save_credentials&&(localStorage.setItem("password",a.controlledValues.password),localStorage.setItem("email",a.controlledValues.email));const m=e.currentRoute.value.query.redirectUrl;if(m){const v=e.resolve(m);return!m||((i=v==null?void 0:v.matched)==null?void 0:i.find(b=>{var I;return(I=b==null?void 0:b.path)==null?void 0:I.includes("pathMatch")}))?e.push(g.APPLICATION.EVENTS.absolute):e.push(m)}await e.push(g.APPLICATION.EVENTS.absolute)}catch{s.value=!0}},openResetPasswordModal:()=>e.push(g.AUTHENTICATIONS.RESET.absolute),openRegisterPage:()=>e.push(g.AUTHENTICATIONS.REGISTER.absolute)}}},K=e=>(V("data-v-48589fea"),e=e(),B(),e),Q={class:"b-login-step"},X={class:"b-login-step__top-part"},Y={class:"b-login-step__main-title"},Z={class:"b-login-step__title"},ee={class:"b-login-step__input"},oe={class:"b-login-step__input"},te={class:"b-login-step__remember-me"},se={class:"b-login-step__check-block"},ne={key:0,class:"b-login-step__wrong-credentials-message d-flex align-baseline"},ae=K(()=>o("img",{src:z,class:"m-2",alt:""},null,-1)),ie={class:"b-login-step__buttons"},re={class:"b-login-step__has-no-account"};function le(e,s,r,t,h,w){const p=d("InputComponent"),u=d("checkbox"),C=d("GreenBtn"),a=d("Form");return f(),y("div",Q,[c(a,{"validation-schema":t.schema,"initial-values":t.initialValues},{default:k(l=>[o("div",X,[o("div",Y,n(e.$t("login.app-name")),1),o("div",Z,n(e.$t("login.authorization")),1),o("div",ee,[c(p,{"outside-title":!0,title:"\u041B\u043E\u0433\u0456\u043D",placeholder:"elektron@mail.com","title-width":0,height:40,name:"email"},null,8,["placeholder"])]),o("div",oe,[c(p,{title:"\u041F\u0430\u0440\u043E\u043B\u044C","title-width":0,"outside-title":!0,placeholder:"********","has-icon":!0,type:"password",name:"password",height:40})]),o("div",{class:"b-login-step__forgot-password",onClick:s[0]||(s[0]=i=>t.openResetPasswordModal())},[o("span",null,n(e.$t("login.forgot-password")),1)]),o("div",te,[o("div",se,[c(u,{checked:l.values.save_credentials,"onUpdate:checked":i=>l.values.save_credentials=i},{label:k(()=>[o("span",null,n(e.$t("login.remember-me")),1)]),_:2},1032,["checked","onUpdate:checked"])]),o("div",{class:"b-login-step__forgot-password-mob",onClick:s[1]||(s[1]=i=>t.openResetPasswordModal())},n(e.$t("login.forgot-password")),1)])]),t.showInvalidCredentials?(f(),y("div",ne,[ae,A(" "+n(e.$t("login.wrong-credentials")),1)])):L("",!0),o("div",ie,[c(C,{onClickFunction:i=>t.handleLogin(l),text:"\u0423\u0432\u0456\u0439\u0442\u0438 \u0432 \u0430\u043A\u0430\u0443\u043D\u0442",height:40},null,8,["onClickFunction"])])]),_:1},8,["validation-schema","initial-values"]),o("div",re,[A(n(e.$t("login.no-account"))+" ",1),o("span",{onClick:s[2]||(s[2]=l=>t.openRegisterPage())},n(e.$t("login.register")),1)])])}const ce=R(J,[["render",le],["__scopeId","data-v-48589fea"]]),de={name:"login",components:{LoginComponent:ce,AuthenticationMain:H},setup(){const e=_(()=>({LOGIN:O.register.authBlockTypes.login})),s=_(()=>W),r=_(()=>({"--back-picture":`url(${j})`}));return{mockData:e,backgroundTab:s,rightSideStyle:r}}};function pe(e,s,r,t,h,w){const p=d("LoginComponent"),u=d("AuthenticationMain");return f(),M(u,{"block-type":t.mockData.LOGIN,backgroundTab:t.backgroundTab,"right-side-style":t.rightSideStyle},{"main-content":k(()=>[c(p)]),_:1},8,["block-type","backgroundTab","right-side-style"])}const Ce=R(de,[["render",pe]]);export{Ce as default};
