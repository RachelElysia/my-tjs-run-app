_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[19],{G2Cj:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var i=n("nKUr"),c=n("vRNQ"),r=n.n(c),a=(n("q1tI"),n("YFqc")),s=n.n(a),d=n("VtrM");function l(e){var t,n=e.directions,c=n;if(n.length>135){c=n.split(" ");for(var a=0,l=0,o=0;o<c.length;o++)if((a+=c[o].length)>135){l=o,c=c.slice(0,l).join(" ");break}}return function(){var n=Object(d.a)("/api/".concat(e.recipe_id,"/tags"),(function(e){return fetch(e).then((function(e){return e.json()}))})),c=n.data;n.error||c&&(t=c.map((function(e){return Object(i.jsx)(s.a,{id:"".concat(e.tag_id),href:"/tags/".concat(e.tag_id),children:Object(i.jsx)("a",{children:e.name.toUpperCase()})})})))}(),Object(i.jsxs)("div",{id:r.a["tile-recipe-flex"],children:[Object(i.jsx)(s.a,{href:"/recipes/".concat(e.recipe_id),children:Object(i.jsx)("a",{children:Object(i.jsx)("img",{src:e.img,id:r.a["tile-recipe-img"],alt:e.title})})}),Object(i.jsxs)("div",{id:r.a["tile-recipe-info"],children:[Object(i.jsx)("p",{id:r.a["tile-recipe-title"],children:Object(i.jsx)(s.a,{href:"/recipes/".concat(e.recipe_id),children:Object(i.jsx)("a",{children:e.title})})}),Object(i.jsxs)("p",{id:r.a["tile-recipe-directions"],children:[" ",c,"... "]}),Object(i.jsxs)("p",{id:r.a["tile-recipe-tags"],children:[" ",t," "]})]})]})}},iinW:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/recipes",function(){return n("jwLr")}])},jwLr:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return x}));var i=n("nKUr"),c=(n("g4pe"),n("d5us")),r=n("G2Cj"),a=n("VtrM"),s=n("Vvt1"),d=n.n(s),l=n("vRNQ"),o=n.n(l),j=n("7KBc"),u=n.n(j),b=d()((function(){return n.e(8).then(n.bind(null,"7vrA"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["7vrA"]},modules:["react-bootstrap/Container"]}}),p=d()((function(){return n.e(9).then(n.bind(null,"3Z9Z"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["3Z9Z"]},modules:["react-bootstrap/Row"]}}),h=d()((function(){return n.e(0).then(n.bind(null,"JI6e"))}),{ssr:!1,loadableGenerated:{webpack:function(){return["JI6e"]},modules:["react-bootstrap/Col"]}});function f(e){var t=e.recipeData24.map((function(e){return Object(i.jsx)(r.a,{title:e.title,directions:e.directions,img:e.img,recipe_id:e.recipe_id})}));return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("main",{children:Object(i.jsx)(u.a,{children:Object(i.jsx)(b,{className:"pt-5 mt-5 pb-2 translate-middle d-flex justify-content-center",children:Object(i.jsxs)(p,{className:"translate-middle",children:[Object(i.jsx)(h,{className:"col-12 translate-middle",align:"center",children:Object(i.jsx)("h1",{children:"Trader Joe's Recipes"})}),Object(i.jsx)(h,{className:"col-12 translate-middle",align:"center",children:Object(i.jsx)("p",{children:"Viewing recipes for Trader Joe's. "})})]})})})}),Object(i.jsx)("section",{className:o.a["rachel-tile"],children:Object(i.jsx)(u.a,{bottom:!0,children:Object(i.jsx)("div",{className:o.a["flex-container-myrecipes"],children:t})})})]})}function x(){var e=Object(a.a)("/api/recipes/random",(function(e){return fetch(e).then((function(e){return e.json()}))})),t=null;return e.error?t=Object(i.jsx)("div",{children:"failed to load"}):e.data||(t=Object(i.jsx)("div",{children:"loading..."})),Object(i.jsxs)("div",{id:"page-container",children:[Object(i.jsx)(c.b,{}),Object(i.jsx)(c.c,{}),t||Object(i.jsx)(f,{recipeData24:e.data}),Object(i.jsx)(c.a,{})]})}}},[["iinW",2,1,4,3,5,6,7]]]);