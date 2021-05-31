(()=>{"use strict";var e={inputSelector:".form__text-input",submitButtonSelector:".form__submit-button",inactiveButtonClass:"form__submit-button_disabled",inputErrorClass:"form__text-input_type_error",errorClass:"form__error_visible"},t=document.querySelector(".profile__edit-button"),n=document.querySelector(".profile__add-button"),r=document.querySelector(".profile__avatar"),o=".template-photo-card";function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(){function e(t,n,r,o,a,u){var s=this,l=t.name,f=t.link,p=t.likes,h=t.owner,_=t._id;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,"_deleteCard",(function(){s._element.remove(),s._element=null})),this._link=f,this._name=l,this._likes=p,this._owner=h,this._user=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},a),this._id=_,this.templateSelector=n,this._openImagePopup=r,this._openActSubmitPopup=o,this._toggleLike=u}var t,n;return t=e,(n=[{key:"createPhotoCard",value:function(){return this._element=this._getCardTemplate(),this._elementTitle=this._element.querySelector(".photo-card__title"),this._elementImage=this._element.querySelector(".photo-card__img"),this._elementLikeButton=this._element.querySelector(".photo-card__like-button"),this._elementDeleteButton=this._element.querySelector(".photo-gallery__delete-item-button"),this._elementLikesQuantity=this._element.querySelector(".photo-card__likes-counter"),this._elementTitle.textContent=this._name,this._elementImage.src=this._link,this._elementImage.alt=this._name,this._elementLikesQuantity.textContent=this._likes.length,this._owner._id===this._user._id&&this._elementDeleteButton.classList.add("photo-gallery__delete-item-button_available"),this._hasMyLike()&&this._elementLikeButton.classList.add("photo-card__like-button_type_active"),this._setEventListeners(),this._element}},{key:"_getCardTemplate",value:function(){return document.querySelector(this.templateSelector).content.querySelector(".photo-gallery__item").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._elementImage.addEventListener("click",(function(){e._openImagePopup(e._name,e._link)})),this._elementLikeButton.addEventListener("click",(function(t){e._toggleLike(t,e._id,e._elementLikesQuantity)})),this._elementDeleteButton.addEventListener("click",(function(){e._openActSubmitPopup(e._id,e._deleteCard)}))}},{key:"_hasMyLike",value:function(){var e=this;return this._likes.some((function(t){return JSON.stringify(t)===JSON.stringify(e._user)}))}}])&&a(t.prototype,n),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._form=t,this._inputSelector=n.inputSelector,this._submitButtonSelector=n.submitButtonSelector,this._inactiveButtonClass=n.inactiveButtonClass,this._inputErrorClass=n.inputErrorClass,this._errorClass=n.errorClass,this._inputs=Array.from(this._form.querySelectorAll(this._inputSelector)),this._formSubmitButton=this._form.querySelector(this._submitButtonSelector)}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){this._form.addEventListener("submit",(function(e){return e.preventDefault()})),this._setEventListeners()}},{key:"checkFormValidity",value:function(){var e=this;this._inputs.forEach((function(t){""!==t.value?e._checkInputValidity(t):e._hideError(t),e._changeButtonState()}))}},{key:"_setEventListeners",value:function(){var e=this;this._changeButtonState(),this._inputs.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._changeButtonState()}))}))}},{key:"_changeButtonState",value:function(){this._hasInvalidInput()?(this._formSubmitButton.setAttribute("disabled",""),this._formSubmitButton.classList.add(this._inactiveButtonClass)):(this._formSubmitButton.removeAttribute("disabled"),this._formSubmitButton.classList.remove(this._inactiveButtonClass))}},{key:"_hasInvalidInput",value:function(){return this._inputs.some((function(e){return!e.validity.valid}))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideError(e):this._showError(e)}},{key:"_hideError",value:function(e){var t=this._form.querySelector(".".concat(e.name,"-error"));e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}},{key:"_showError",value:function(e){var t=this._form.querySelector(".".concat(e.name,"-error"));e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}}])&&s(t.prototype,n),e}();function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.append(e)}},{key:"addItemToStart",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}}])&&f(t.prototype,n),e}();function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=function(){function e(t){var n,r,o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){"Escape"===e.key&&o.close()},(n="_handleEscClose")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.querySelector(".popup__close-button").addEventListener("click",(function(){return e.close()})),this._popup.addEventListener("click",(function(t){t.target.classList.contains("popup_opened")&&e.close()}))}}])&&h(t.prototype,n),e}();function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?b(e):t}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t,n){return(v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(o,e);var t,n,r=(t=o,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=g(t);if(n){var o=g(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return m(this,e)});function o(e){var t,n,i,a,c;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),c=function(e,r){n._title.textContent=e,n._image.src=r,n._image.alt=e,v((t=b(n),g(o.prototype)),"open",t).call(t)},(a="open")in(i=b(n=r.call(this,e)))?Object.defineProperty(i,a,{value:c,enumerable:!0,configurable:!0,writable:!0}):i.open=c,n._title=n._popup.querySelector(".image-popup__title"),n._image=n._popup.querySelector(".image-popup__photo"),n}return o}(_);function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function E(e,t){return!t||"object"!==O(t)&&"function"!=typeof t?j(e):t}function j(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function P(e,t,n){return(P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=C(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function L(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=C(r);if(o){var n=C(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function a(e,t){var n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),L(j(r=i.call(this,e)),"_getInputValues",(function(){var e={};return r._inputs.forEach((function(t){e[t.name]=t.value})),e})),L(j(r),"close",(function(){P((n=j(r),C(a.prototype)),"close",n).call(n),r.form.reset()})),r._handleSubmit=t,r.form=r._popup.querySelector(".form"),r._inputs=Array.from(r.form.querySelectorAll(".form__text-input")),r._submitButton=r.form.querySelector(".form__submit-button"),r}return t=a,(n=[{key:"setEventListeners",value:function(){var e=this;P(C(a.prototype),"setEventListeners",this).call(this),this.form.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmit(e._getInputValues())}))}},{key:"setInputValues",value:function(e){this._inputs.forEach((function(t){e.hasOwnProperty(t.name)&&(t.value=e[t.name])}))}},{key:"renderLoading",value:function(e,t){e?this._submitButton.textContent=t:e||(this._submitButton.textContent=this._submitButton.value)}}])&&w(t.prototype,n),a}(_);function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function q(e,t){return(q=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function D(e,t){return!t||"object"!==I(t)&&"function"!=typeof t?T(e):t}function T(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function x(e,t,n){return(x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=A(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function A(e){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var U=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&q(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=A(r);if(o){var n=A(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return D(this,e)});function a(e,t){var n,r,o,c,u;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),u=function(e,t){r._form.removeEventListener("submit",r._currentHandler),r._currentHandler=r._deleteCard.bind(T(r),e,t),r._form.addEventListener("submit",r._currentHandler),x((n=T(r),A(a.prototype)),"open",n).call(n)},(c="open")in(o=T(r=i.call(this,e)))?Object.defineProperty(o,c,{value:u,enumerable:!0,configurable:!0,writable:!0}):o.open=u,r._handleSubmit=t,r._form=r._popup.querySelector(".form"),r._submitButton=r._form.querySelector(".form__submit-button"),r}return t=a,(n=[{key:"_deleteCard",value:function(e,t,n){n.preventDefault(),this._handleSubmit(e,t)}},{key:"renderLoading",value:function(e,t){e?this._submitButton.textContent=t:e||(this._submitButton.textContent=this._submitButton.value)}}])&&R(t.prototype,n),a}(_);function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var N=function(){function e(t){var n=t.profileName,r=t.profileDescription,o=t.profileAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileName=document.querySelector(n),this._profileDescription=document.querySelector(r),this._profileAvatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._profileName.textContent,about:this._profileDescription.textContent}}},{key:"setUserInfo",value:function(e){this._profileName.textContent=e.name,this._profileDescription.textContent=e.about,this._profileAvatar.src=e.avatar}},{key:"setUserAvatar",value:function(e){this._profileAvatar.src=e}}])&&V(t.prototype,n),e}();function H(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function J(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function F(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var Q=new(function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getUserInfo",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then(this._checkResponse)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then(this._checkResponse)}},{key:"saveProfileData",value:function(e){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:"".concat(e.name),about:"".concat(e.about)})}).then(this._checkResponse)}},{key:"addNewCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:"".concat(e.title),link:"".concat(e.url)})}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"likeCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"unlikeCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"changeAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:"".concat(e)})})}}])&&H(t.prototype,n),e}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-24",headers:{authorization:"e8edd25c-68cd-4899-918e-51e937828043","Content-Type":"application/json"}}),z={},$=new N({profileName:".profile__name",profileDescription:".profile__description",profileAvatar:".profile__img"});function G(e,t,n,r,o,i){var a=e.name,c=e.link,s=e.likes,l=e.owner,f=e._id;return new u({name:a,link:c,likes:s,owner:l,_id:f},t,n,r,o,i).createPhotoCard()}var K=function(e,t,n){e.target.classList.contains("photo-card__like-button_type_active")?Q.unlikeCard(t).then((function(t){n.textContent=t.likes.length,e.target.classList.toggle("photo-card__like-button_type_active")})).catch((function(e){return console.error(e)})):e.target.classList.contains("photo-card__like-button")&&Q.likeCard(t).then((function(t){n.textContent=t.likes.length,e.target.classList.toggle("photo-card__like-button_type_active")})).catch((function(e){return console.error(e)}))},W=new k(".popup_type_image");W.setEventListeners();var X=new B(".popup_type_edit",(function(e){X.renderLoading(!0,"Сохраняю..."),Q.saveProfileData(e).then((function(e){$.setUserInfo(e),X.close()})).catch((function(e){return console.log("Ошибка при обновлении данных профиля: ".concat(e))})).finally((function(){X.renderLoading(!1)}))}));X.setEventListeners();var Y=new B(".popup_type_add",(function(e){Y.renderLoading(!0,"Сохраняю..."),Q.addNewCard(e).then((function(e){te.addItemToStart(G(e,o,W.open,Z.open,z,K)),Y.close()})).catch((function(e){return console.log("Ошибка при добавлении новой карточки: ".concat(e))})).finally((function(){Y.renderLoading(!1)}))}));Y.setEventListeners();var Z=new U(".popup_type_submit",(function(e,t){Z.renderLoading(!0,"Удаляю..."),Q.deleteCard(e).then((function(){t(),Z.close()})).then((function(){e=null})).catch((function(e){return console.error("ошибка при удалении: ".concat(e))})).finally((function(){Z.renderLoading(!1)}))}));Z.setEventListeners();var ee=new B(".popup_type_avatar",(function(e){ee.renderLoading(!0,"Сохраняю..."),Q.changeAvatar(e.avatar).then((function(){$.setUserAvatar(e.avatar),ee.close()})).catch((function(e){return console.log("Ошибка при обновлении аватарки: ".concat(e))})).finally((function(){ee.renderLoading(!1)}))}));ee.setEventListeners();var te=new p({renderer:function(e){var t=G(e,o,W.open,Z.open,z,K);te.addItem(t)}},".photo-gallery__list"),ne=new l(X.form,e),re=new l(Y.form,e),oe=new l(ee.form,e);ne.enableValidation(),re.enableValidation(),oe.enableValidation(),Promise.all([Q.getUserInfo(),Q.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return M(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];$.setUserInfo(o),z=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?J(Object(n),!0).forEach((function(t){F(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):J(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},o),te.renderItems(i)})).catch((function(e){return console.error(e)})),t.addEventListener("click",(function(){X.setInputValues($.getUserInfo()),ne.checkFormValidity(),X.open()})),n.addEventListener("click",(function(){re.checkFormValidity(),Y.open()})),r.addEventListener("click",(function(){oe.checkFormValidity(),ee.open()}))})();