_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[18],{O2ls:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return g})),n.d(t,"SignInUpContainer",(function(){return x}));var r=n("nKUr"),c=(n("g4pe"),n("q1tI")),s=n("20a2"),a=n("d5us"),i=n("Vvt1"),o=n.n(i),l=n("vRNQ"),u=n.n(l),d=n("7KBc"),j=n.n(d),b=o()((function(){return n.e(7).then(n.bind(null,"7vrA"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["7vrA"]},modules:["react-bootstrap/Container"]}}),h=o()((function(){return n.e(8).then(n.bind(null,"3Z9Z"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["3Z9Z"]},modules:["react-bootstrap/Row"]}}),f=o()((function(){return n.e(0).then(n.bind(null,"JI6e"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["JI6e"]},modules:["react-bootstrap/Col"]}}),p=o()((function(){return n.e(10).then(n.bind(null,"cWnB"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["cWnB"]},modules:["react-bootstrap/Button"]}});function m(){var e=Object(s.useRouter)(),t=Object(c.useState)({user:{},loggedIn:!1}),n=(t[0],t[1]);return Object(r.jsxs)(f,{className:"col-12 col-md-8 p-4 bg-light border-right rounded-left",children:[Object(r.jsx)("h2",{children:"Create your Account"}),Object(r.jsxs)("h3",{children:["Love Trader Joe's? Start favoriting recipes and populate your TJ's grocery list! ",Object(r.jsx)("i",{children:"Free forever!"})]}),Object(r.jsx)("form",{onSubmit:function(t){t.preventDefault();var r=new FormData(t.target);fetch("/api/users",{method:"POST",body:r}).then((function(t){alert("You created an account! Build your favorite recipes to easily view your grocery list!"),t.json().then((function(t){console.log(JSON.stringify(t.user)),console.log(t.user),localStorage.setItem("user",JSON.stringify(t.user)),localStorage.setItem("loggedIn",!0),n({loggedIn:!0,user:t.user}),e.back()}))}))},children:Object(r.jsx)("table",{children:Object(r.jsxs)("tbody",{children:[Object(r.jsxs)("tr",{children:[Object(r.jsxs)("td",{children:[Object(r.jsx)("label",{htmlFor:"fname",children:"First Name:"})," ",Object(r.jsx)("br",{}),Object(r.jsx)("input",{type:"text",name:"fname",id:"fname",placeholder:"Joe",required:!0,minLength:"2",maxLength:"40",autoFocus:!0})]}),Object(r.jsxs)("td",{children:[Object(r.jsx)("label",{htmlFor:"lname",children:"Last Name:"})," ",Object(r.jsx)("br",{}),Object(r.jsx)("input",{type:"text",name:"lname",id:"lname",placeholder:"Coulombe",minLength:"2",maxLength:"40",required:!0})]})]}),Object(r.jsxs)("tr",{children:[Object(r.jsxs)("td",{children:[Object(r.jsx)("label",{htmlFor:"phone",children:"10-digit Phone Number:"})," ",Object(r.jsx)("br",{}),Object(r.jsx)("input",{type:"tel",name:"phone",id:"phone",placeholder:"4158631292",pattern:"[0-9]{10}",maxLength:"10",required:!0})]}),Object(r.jsxs)("td",{children:[Object(r.jsx)("label",{htmlFor:"fname",children:"Password:"}),Object(r.jsx)("br",{}),Object(r.jsx)("input",{type:"password",name:"password",id:"password",placeholder:"Password",required:!0})]})]}),Object(r.jsx)("tr",{children:Object(r.jsx)("td",{children:Object(r.jsx)(p,{type:"submit",className:u.a["submit-button"],children:"Create"})})})]})})})]})}function O(){var e=Object(s.useRouter)(),t=Object(c.useState)({user:{},loggedIn:!1}),n=(t[0],t[1]);return Object(r.jsxs)(f,{className:"col-12 col-md-4 p-4 bg-light rounded-right",children:[Object(r.jsx)("h2",{children:"Log In"}),Object(r.jsx)("h3",{children:"See your recipes and grocery list!"}),Object(r.jsxs)("form",{onSubmit:function(t){t.preventDefault();var r=new FormData(t.target);fetch("/api/userlogin",{method:"POST",body:r}).then((function(t){console.log(t),200===t.status?t.json().then((function(t){localStorage.setItem("user",JSON.stringify(t.user)),localStorage.setItem("loggedIn",!0),n({loggedIn:!0,user:t.user}),alert("Check out your favorite recipes ".concat(t.user.fname,"!")),e.back()})):alert("Login Failed. Phone number and/or password is incorrect.")}))},children:[Object(r.jsxs)("p",{children:[Object(r.jsx)("label",{htmlFor:"phonein",children:"Phone Number:"})," ",Object(r.jsx)("br",{}),Object(r.jsx)("input",{type:"tel",name:"phonein",id:"phonein",placeholder:"4158631292",maxLength:"10",autoComplete:"off"})]}),Object(r.jsxs)("p",{children:[Object(r.jsx)("label",{htmlFor:"passwordin",children:"Password:"})," ",Object(r.jsx)("br",{}),Object(r.jsx)("input",{type:"password",name:"passwordin",id:"passwordin",placeholder:"Your password"})]}),Object(r.jsx)("p",{children:Object(r.jsx)(p,{type:"submit",children:"Log In"})})]})]})}function x(){return Object(r.jsx)("section",{className:u.a["rachel-tile"],children:Object(r.jsx)(b,{className:"my-4 py-4 h-75 w-75",children:Object(r.jsxs)(h,{className:"w-100 h-75 pt-5 rounded",children:[Object(r.jsx)(m,{}),Object(r.jsx)(O,{})]})})})}function g(){return Object(r.jsxs)("div",{id:"page-container",children:[Object(r.jsx)(a.b,{}),Object(r.jsx)(a.c,{}),Object(r.jsx)(j.a,{children:Object(r.jsx)(x,{})}),Object(r.jsx)(a.a,{})]})}},VJY8:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return F}));var r=n("nKUr"),c=n("d5us"),s=n("O2ls");function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"===typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var o=n("q1tI"),l=n("20a2"),u=n("VtrM"),d=n("Vvt1"),j=n.n(d),b=n("vRNQ"),h=n.n(b),f=n("IP2g"),p=n("wHSu");function m(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"===typeof e)return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return O(e,t)}(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,c=function(){};return{s:c,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,i=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return a=e.done,e},e:function(e){i=!0,s=e},f:function(){try{a||null==n.return||n.return()}finally{if(i)throw s}}}}function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}j()((function(){return n.e(7).then(n.bind(null,"7vrA"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["7vrA"]},modules:["react-bootstrap/Container"]}});var x=j()((function(){return n.e(8).then(n.bind(null,"3Z9Z"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["3Z9Z"]},modules:["react-bootstrap/Row"]}}),g=j()((function(){return n.e(0).then(n.bind(null,"JI6e"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["JI6e"]},modules:["react-bootstrap/Col"]}}),y=j()((function(){return n.e(10).then(n.bind(null,"cWnB"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["cWnB"]},modules:["react-bootstrap/Button"]}}),v=Object(r.jsx)(f.a,{icon:p.l}),w=Object(r.jsx)(f.a,{icon:p.h}),S=Object(r.jsx)(f.a,{icon:p.g}),N=Object(r.jsx)(f.a,{icon:p.m});function I(e){var t=e.userRecipesData.map((function(e){return e.title})),n=Object(o.useState)([]),c=n[0],s=n[1],a=function(e){var t=e.target.value;s((function(e){return e.includes(t)?e.filter((function(e){return e!==t})):[t].concat(i(e))}))},u=(Object(l.useRouter)(),Object(o.useState)(null)),d=u[0],j=u[1];Object(o.useEffect)((function(){var e=localStorage.getItem("user");e&&j(JSON.parse(e))}),[]);var b=Object(o.useState)({user:{},loggedIn:!1});b[0],b[1];return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("main",{id:h.a.navbar,children:Object(r.jsxs)("center",{children:[Object(r.jsxs)("h3",{children:[v," My Grocery List"]}),Object(r.jsxs)("p",{className:h.a.text_small,children:[" ",t.length>0?"Choose from your favorite recipes to generate your personalized grocery list!":"Uh oh, you have no saved recipes! Try the search feature to find your favorite recipes before you receive a text of ingredients!"]}),t.map((function(e){return Object(r.jsxs)("button",{value:e,onClick:a,className:h.a["add-remove-grocery-button"],children:[c.includes(e)?S:w," ",e]},e)})),Object(r.jsx)(x,{className:"mt-5",children:Object(r.jsxs)(g,{className:"col-12",align:"center",children:[" ",Object(r.jsxs)("h3",{children:[N," ",0===c.length?"No Recipes Added":1===c.length?"Recipe Added":"Recipes Added"]})]})}),c.map((function(e,t){return Object(r.jsx)(x,{className:h.a.text_small,align:"center",children:Object(r.jsx)(g,{className:"ml-2",align:"left",children:e})})})),Object(r.jsx)(x,{children:Object(r.jsx)(g,{className:"col-12",children:Object(r.jsx)("form",{onSubmit:function(e){e.preventDefault();"".concat(d.phone),"".concat(d.fname),"".concat(c);confirm("".concat(d.fname,", Do you want to text this grocery list to ").concat(d.phone,"?"))&&fetch("/api/sms",{method:"POST",body:JSON.stringify({user_phone:"+1"+"".concat(d.phone),user_fname:"".concat(d.fname),user_recipes:"".concat(c)}),headers:{"Content-type":"application/json; charset=UTF-8"}}).then((function(e){return e.ok?e.json():Promise.reject(e)})).then((function(e){console.log(e)})).catch((function(e){console.warn("Something went wrong.",e)}))},children:Object(r.jsx)(y,{type:"submit",disabled:0===c.length,children:0===c.length?"Add Recipes to Text":"Text Me My Grocery List"})})})})]})}),Object(r.jsx)("div",{className:h.a["flex-container-myrecipespage"],children:Object(r.jsx)("div",{className:h.a["my-ingredient-flex"],children:Object(r.jsx)(_,{userRecipesSelected:e.userRecipesData.filter((function(e){return c.includes(e.title)}))})})})]})}function _(e){var t,n=[],c=m(e.userRecipesSelected);try{for(c.s();!(t=c.n()).done;){var s=t.value;n.push(Object(r.jsx)(A,{recipe_id:s.recipe_id,title:s.title,directions:s.directions,ingredients:s.ingredients,img:s.img,tags:s.tags},s.recipe_id))}}catch(a){c.e(a)}finally{c.f()}return Object(r.jsx)(r.Fragment,{children:n})}function A(e){var t,n;return function(){var n=Object(u.a)("/api/".concat(e.recipe_id,"/ingredients"),(function(e){return fetch(e).then((function(e){return e.json()}))})),c=n.data;n.error||c&&(t=c.map((function(e){return Object(r.jsxs)("tr",{className:"border-bottom",children:[Object(r.jsx)("td",{className:h.a["table-wide"],children:e.abridged_ingredient}),Object(r.jsx)("td",{className:h.a.text_small,children:e.detailed_ingredient})]})})))}(),function(){var t=Object(u.a)("/api/".concat(e.recipe_id,"/tags"),(function(e){return fetch(e).then((function(e){return e.json()}))})),c=t.data;t.error||c&&(n=c.map((function(e){return Object(r.jsxs)("a",{href:"/tags/".concat(e.tag_id),children:[" ",e.name.toUpperCase()," "]})})))}(),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("div",{id:h.a["column-left-ingredients"],children:[Object(r.jsx)("p",{className:h.a["recipe-title"],children:Object(r.jsx)("a",{href:"/recipes/".concat(e.recipe_id),children:e.title})}),Object(r.jsx)("p",{className:h.a.text_small,children:Object(r.jsxs)("span",{children:[n," "]})}),Object(r.jsx)("img",{src:e.img,className:h.a["my-recipe-img"],alt:e.title})]}),Object(r.jsx)("div",{id:h.a["column-ingredients"],children:Object(r.jsxs)("table",{id:h.a["ingredients-table"],children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{children:"My Grocery List"}),Object(r.jsx)("th",{children:"Details"})]})}),Object(r.jsx)("tbody",{children:t})]})})]})}var R=n("7KBc"),C=n.n(R);function J(e){return Object(r.jsx)("main",{className:h.a["my-container"],children:Object(r.jsx)("div",{children:Object(r.jsx)("center",{children:Object(r.jsx)(I,{userRecipesData:e.userRecipesData})})})})}function F(){var e=Object(o.useState)(null),t=e[0],n=e[1];Object(o.useEffect)((function(){var e=localStorage.getItem("user");e&&n(JSON.parse(e))}),[]);var a=Object(u.a)("/api/users/".concat(t?t.user_id:2,"/recipes"),(function(e){return fetch(e).then((function(e){return e.json()}))})),i=a.data,l=null;return a.error?l=Object(r.jsx)("div",{children:"failed to load"}):i||(l=Object(r.jsx)("div",{children:"loading..."})),null===t?Object(r.jsxs)("div",{id:"page-container",children:[Object(r.jsx)(c.b,{}),Object(r.jsx)(c.c,{}),Object(r.jsx)(C.a,{bottom:!0,children:Object(r.jsx)(s.SignInUpContainer,{})}),Object(r.jsx)(c.a,{})]}):Object(r.jsxs)("div",{id:"page-container",children:[Object(r.jsx)(c.b,{}),Object(r.jsx)(c.c,{}),l||Object(r.jsx)(J,{userRecipesData:i}),Object(r.jsx)(c.a,{})]})}},p1Dh:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/mygrocerylist",function(){return n("VJY8")}])}},[["p1Dh",2,1,5,3,4,6,9]]]);