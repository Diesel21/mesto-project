(()=>{"use strict";var e={formSelector:"",inputSelector:"",submitButtonSelector:"",inputErrorClass:""},t=function(t,r,n){var o=t.querySelector(".".concat(r.id,"-error"));r.classList.add(e.inputErrorClass),o.textContent=n},r=function(t,r){var n=t.querySelector(".".concat(r.id,"-error"));r.classList.remove(e.inputErrorClass),n.textContent=""},n=function(e,t){!function(e){return!Array.from(e).some((function(e){return!e.validity.valid}))}(e)?t.disabled=!0:t.disabled=!1},o=function(t){var o=t.querySelector(e.formSelector),c=o.querySelectorAll(e.inputSelector),a=o.querySelector(e.submitButtonSelector);c.forEach((function(e){return r(o,e)})),n(c,a)},c=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");a(t)}},a=function(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",c)},u=function(e){e.classList.add("popup_opened"),document.addEventListener("keydown",c)},i=function(e){var t=e.textContent;return e.textContent="Сохранение...",e.disabled=!0,function(){e.textContent=t,e.disabled=!1}},l={baseUrl:"https://nomoreparties.co/v1/plus-cohort-15",headers:{authorization:"99c8957e-2f0c-4280-8057-91a4e8729164","Content-Type":"application/json"}},s=function(e){return e.ok?Promise.resolve(e):Promise.reject("Ошибка: ".concat(e.status))},d=function(e){return e.json()},p=function(e){return console.log(e)},f=document.querySelector(".cards__grid"),y=document.querySelector("#card").content,h=document.querySelector(".popup_type_image"),_=h.querySelector(".popup__image"),v=h.querySelector(".popup__caption"),m=function(e,t){var r=e.name,n=e.link,o=e.likes,c=e.owner,a=e._id,i=y.querySelector(".card").cloneNode(!0),f=i.querySelector(".card__box");f.querySelector(".card__title").textContent=r;var m=i.querySelector(".card__photo");if(m.src=n,m.alt=r,m.addEventListener("click",(function(e){_.src=n,_.alt=r,v.textContent=r,u(h)})),function(e,t,r,n){var o=e.querySelector(".card__button_type_like"),c=e.querySelector(".card__like-counter");c.textContent=t.length,t.some((function(e){return e._id===n}))&&o.classList.add("card__button_like-active"),o.addEventListener("click",(function(e){var t;o.classList.contains("card__button_like-active")?(t=r,fetch("".concat(l.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:l.headers}).then(s).then(d)).then((function(e){c.textContent=e.likes.length,o.classList.remove("card__button_like-active")})).catch(p):function(e){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:l.headers}).then(s).then(d)}(r).then((function(e){c.textContent=e.likes.length,o.classList.add("card__button_like-active")})).catch(p)}))}(f,o,a,t),c._id===t){var b=i.querySelector(".card__button_type_delete");b.style.display="block",b.addEventListener("click",(function(){var e;(e=a,fetch("".concat(l.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:l.headers}).then(s)).then((function(){return i.remove()})).catch(p)}))}return i},b=function(e,t){f.prepend(m(e,t))},S={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_incorrect"};function q(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var k={},g=document.querySelector(".profile"),L=g.querySelector(".profile__name"),C=g.querySelector(".profile__profession"),O=g.querySelector(".profile__avatar"),j=g.querySelector(".profile__button_type_edit"),x=g.querySelector(".profile__button_type_add"),P=document.querySelectorAll(".popup"),w=document.querySelector(".popup_type_profile"),U=w.querySelector(".popup__form"),A=U.querySelector("#job-input"),D=U.querySelector("#username-input"),B=U.querySelector(S.submitButtonSelector),T=document.querySelector(".popup_type_add-card"),N=T.querySelector(".popup__form"),J=N.querySelector("#place-input"),M=N.querySelector("#href-input"),H=T.querySelector(S.submitButtonSelector),I=document.querySelector(".popup_type_avatar"),z=I.querySelector(".popup__form"),F=z.querySelector("#avatar-input"),G=I.querySelector(S.submitButtonSelector);!function(o){!function(t){for(var r=0,n=Object.keys(e);r<n.length;r++){var o=n[r];e[o]=t[o]}}(o),document.querySelectorAll(e.formSelector).forEach((function(o){!function(o){var c=o.querySelectorAll(e.inputSelector),a=o.querySelector(e.submitButtonSelector);c.forEach((function(u){u.addEventListener("input",(function(){!function(e,n){n.validity.valid?r(e,n):n.validity.patternMismatch?t(e,n,n.dataset.errorMessage):t(e,n,n.validationMessage)}(o,u,e.inputErrorClass),n(c,a)}))}))}(o)}))}(S),Promise.all([fetch("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).then(s).then(d).then((function(e){k=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?q(Object(r),!0).forEach((function(t){E(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):q(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e),L.textContent=k.name,C.textContent=k.about,O.style.backgroundImage="url(".concat(k.avatar,")")})).catch(p),fetch("".concat(l.baseUrl,"/cards"),{headers:l.headers}).then(s).then(d).then((function(e){return e})).catch(p)]).then((function(e){e[1].sort((function(e,t){return e.createdAt>t.createdAt?1:-1})).forEach((function(e){return b(e,k._id)}))})).catch(p),U.addEventListener("submit",(function(e){e.preventDefault();var t,r,n=i(B);(t=D.value,r=A.value,fetch("".concat(l.baseUrl,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:t,about:r})}).then(s).then(d)).then((function(e){L.textContent=e.name,C.textContent=e.about,a(w)})).catch(p).finally(n)})),N.addEventListener("submit",(function(e){e.preventDefault();var t,r,n=i(H);(t=J.value,r=M.value,fetch("".concat(l.baseUrl,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify({name:t,link:r})}).then(s).then(d)).then((function(e){b(e,k._id),N.reset(),a(T)})).catch(p).finally(n)})),I.addEventListener("submit",(function(e){e.preventDefault();var t,r=i(G);(t=F.value,fetch("".concat(l.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:t})}).then(s).then(d)).then((function(e){O.style.backgroundImage="url(".concat(e.avatar,")"),z.reset(),a(I)})).catch(p).finally(r)})),j.addEventListener("click",(function(){D.value=L.textContent,A.value=C.textContent,o(w),u(w)})),x.addEventListener("click",(function(){N.reset(),o(T),u(T)})),O.addEventListener("click",(function(){z.reset(),o(I),u(I)})),P.forEach((function(e){e.addEventListener("click",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close-button"))&&a(e)}))}))})();