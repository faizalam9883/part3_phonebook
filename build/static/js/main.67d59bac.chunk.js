(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var c=t(0),u=t(1),r=t(14),a=t.n(r),o=t(3),i=function(e){var n=e.person,t=e.onClick;return Object(c.jsxs)("li",{children:[n.name," ",n.number,"  ",Object(c.jsx)("button",{onClick:t,children:"delete"})]},n.name)},l=function(e){var n=e.value,t=e.onChange;return Object(c.jsxs)("div",{children:["filter shown with ",Object(c.jsx)("input",{value:n,onChange:t})]})},s=function(e){return Object(c.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(c.jsxs)("div",{children:["name:"," ",Object(c.jsx)("input",{value:e.newName,onChange:e.handleName})]}),Object(c.jsxs)("div",{children:["number:"," ",Object(c.jsx)("input",{value:e.newNumber,onChange:e.handleNumber})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.msg;return null===n?null:Object(c.jsx)("div",{className:"message",children:n})},b=function(e){var n=e.msg;return null===n?null:Object(c.jsx)("div",{className:"error",children:n})},j=t(4),f=t.n(j),m="/api/persons",h={getAll:function(){return f.a.get(m).then((function(e){return e.data}))},create:function(e){return f.a.post(m,e).then((function(e){return e.data}))},deleteID:function(e){return f.a.delete("".concat(m,"/").concat(e))},update:function(e,n){return f.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))}},O=(t(37),function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],a=Object(u.useState)(""),j=Object(o.a)(a,2),f=j[0],m=j[1],O=Object(u.useState)(""),v=Object(o.a)(O,2),p=v[0],x=v[1],g=Object(u.useState)(""),w=Object(o.a)(g,2),N=w[0],C=w[1],S=Object(u.useState)(null),k=Object(o.a)(S,2),y=k[0],A=k[1],D=Object(u.useState)(null),T=Object(o.a)(D,2),I=T[0],E=T[1];Object(u.useEffect)((function(){h.getAll().then((function(e){return r(e)}))}),[]);var J;return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(d,{msg:y}),Object(c.jsx)(b,{msg:I}),Object(c.jsx)(l,{value:N,onChange:function(e){C(e.target.value)}}),Object(c.jsx)("h2",{children:"Add a new"}),Object(c.jsx)(s,{onSubmit:function(e){e.preventDefault();var n=0,c=0;if(t.forEach((function(e){e.name!==f&&f||(n++,c=e.id)})),n>0){if(window.confirm("".concat(f," is already added to phonebook, replace the old number with the new one?"))){var u={name:f,number:p};h.update(c,u).then((function(e){r(t.map((function(n){return n.id!==c?n:e}))),A("Updated ".concat(e.name)),setTimeout((function(){A(null)}),3500),m(""),x("")})).catch((function(e){E("Information of ".concat(u.name," has already been removed from server")),setTimeout((function(){E(null)}),3500),m(""),x(""),r(t.filter((function(e){return e.id!==c})))}))}}else{var a={name:f,number:p};h.create(a).then((function(e){r(t.concat(e)),A("Added ".concat(e.name)),setTimeout((function(){A(null)}),3500),m(""),x("")})).catch((function(e){E("Name and Number must be atleast 3 and 8 characters long respectively"),setTimeout((function(){E(null)}),3500),m(""),x("")}))}},newName:f,handleName:function(e){m(e.target.value)},newNumber:p,handleNumber:function(e){x(e.target.value)}}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)("ul",{children:(J=t,J.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase())}))).map((function(e){return Object(c.jsx)(i,{person:e,onClick:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name," ?"))&&h.deleteID(e).then((function(){r(t.filter((function(n){return n.id!==e})))}))}(e.id)}},e.id)}))})]})});a.a.render(Object(c.jsx)(O,{}),document.querySelector("#root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.67d59bac.chunk.js.map