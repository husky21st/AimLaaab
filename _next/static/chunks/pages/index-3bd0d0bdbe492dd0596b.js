(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8771:function(e,t,r){"use strict";var n=r(9713);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}t.default=function(e,t){var r=i.default,n={loading:function(e){e.error,e.isLoading;return e.pastDelay,null}};e instanceof Promise?n.loader=function(){return e}:"function"===typeof e?n.loader=e:"object"===typeof e&&(n=u(u({},n),e));(n=u(u({},n),t)).loadableGenerated&&delete(n=u(u({},n),n.loadableGenerated)).loadableGenerated;if("boolean"===typeof n.ssr){if(!n.ssr)return delete n.ssr,l(r,n);delete n.ssr}return r(n)};a(r(7294));var i=a(r(4860));function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){return delete t.webpack,delete t.modules,e(t)}},1083:function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.LoadableContext=void 0;var o=((n=r(7294))&&n.__esModule?n:{default:n}).default.createContext(null);t.LoadableContext=o},4860:function(e,t,r){"use strict";var n=r(9713),o=r(4575),u=r(3913);function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){var r;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"===typeof e)return s(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(e,t)}(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,i=!0,a=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return i=e.done,e},e:function(e){a=!0,u=e},f:function(){try{i||null==r.return||r.return()}finally{if(a)throw u}}}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c,f=(c=r(7294))&&c.__esModule?c:{default:c},d=r(7161),p=r(1083);var y=[],b=[],h=!1;function m(e){var t=e(),r={loading:!0,loaded:null,error:null};return r.promise=t.then((function(e){return r.loading=!1,r.loaded=e,e})).catch((function(e){throw r.loading=!1,r.error=e,e})),r}var _=function(){function e(t,r){o(this,e),this._loadFn=t,this._opts=r,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}return u(e,[{key:"promise",value:function(){return this._res.promise}},{key:"retry",value:function(){var e=this;this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};var t=this._res,r=this._opts;t.loading&&("number"===typeof r.delay&&(0===r.delay?this._state.pastDelay=!0:this._delay=setTimeout((function(){e._update({pastDelay:!0})}),r.delay)),"number"===typeof r.timeout&&(this._timeout=setTimeout((function(){e._update({timedOut:!0})}),r.timeout))),this._res.promise.then((function(){e._update({}),e._clearTimeouts()})).catch((function(t){e._update({}),e._clearTimeouts()})),this._update({})}},{key:"_update",value:function(e){this._state=a(a({},this._state),{},{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach((function(e){return e()}))}},{key:"_clearTimeouts",value:function(){clearTimeout(this._delay),clearTimeout(this._timeout)}},{key:"getCurrentValue",value:function(){return this._state}},{key:"subscribe",value:function(e){var t=this;return this._callbacks.add(e),function(){t._callbacks.delete(e)}}}]),e}();function v(e){return function(e,t){var r=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),n=null;function o(){if(!n){var t=new _(e,r);n={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return n.promise()}if(!h&&"function"===typeof r.webpack){var u=r.webpack();b.push((function(e){var t,r=l(u);try{for(r.s();!(t=r.n()).done;){var n=t.value;if(-1!==e.indexOf(n))return o()}}catch(i){r.e(i)}finally{r.f()}}))}var i=function(e,t){o();var u=f.default.useContext(p.LoadableContext),i=d.useSubscription(n);return f.default.useImperativeHandle(t,(function(){return{retry:n.retry}}),[]),u&&Array.isArray(r.modules)&&r.modules.forEach((function(e){u(e)})),f.default.useMemo((function(){return i.loading||i.error?f.default.createElement(r.loading,{isLoading:i.loading,pastDelay:i.pastDelay,timedOut:i.timedOut,error:i.error,retry:n.retry}):i.loaded?f.default.createElement(function(e){return e&&e.__esModule?e.default:e}(i.loaded),e):null}),[e,i])};return i.preload=function(){return o()},i.displayName="LoadableComponent",f.default.forwardRef(i)}(m,e)}function O(e,t){for(var r=[];e.length;){var n=e.pop();r.push(n(t))}return Promise.all(r).then((function(){if(e.length)return O(e,t)}))}v.preloadAll=function(){return new Promise((function(e,t){O(y).then(e,t)}))},v.preloadReady=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise((function(t){var r=function(){return h=!0,t()};O(b,e).then(r,r)}))},window.__NEXT_PRELOADREADY=v.preloadReady;var g=v;t.default=g},2517:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return s}});var n=r(5893),o=r(5152),u=r(7294),i=JSON.parse('{"f":["\u753b\u9762\u304c\u304a\u304b\u3057\u304f\u306a\u3063\u305f\u3068\u304d\u306f\u30ea\u30ed\u30fc\u30c9\u3057\u3066\u306d\uff01","\u203b\u97f3\u304c\u51fa\u307e\u3059"]}'),a=function(){var e=(0,u.useRef)(null);return(0,u.useEffect)((function(){var t=e.current;t&&(t.style.fontFamily="RocknRoll One",t.style.fontSize="0px",t.style.visibility="hidden")}),[]),(0,n.jsx)("p",{ref:e,style:{color:"transparent"},"aria-hidden":"true",children:"\n        ".concat(i.f.join(""),"\n        0123456789\n        ABCDEFGHIJKLMNOPQRSTUVWXYZ\n        abcdefghijklmnopqrstuvwxyz\n        .,/`~:;'-_=+!@#$%^&*()~{}[]").replace(/\s/g,"")})},l=(0,o.default)((function(){return Promise.all([r.e(645),r.e(114),r.e(0)]).then(r.bind(r,4e3))}),{ssr:!1,loadableGenerated:{webpack:function(){return[4e3]},modules:["index.tsx -> ../components/MyCanvas"]}}),s=function(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{}),(0,n.jsx)(l,{})]})}},5301:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(2517)}])},5152:function(e,t,r){e.exports=r(8771)}},function(e){e.O(0,[774,888,179],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);