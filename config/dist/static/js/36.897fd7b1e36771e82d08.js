webpackJsonp([36],{"23vO":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=a("V/8j"),n={data:function(){return{checkboxGroup:[],checkboxGroupType:{}}},mounted:function(){var e=this;Object(c.e)().then(function(t){var a=t.data;"success"==a.state?e.checkboxGroup=a.data:e.$alert(a.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(e){}})}),Object(c.f)().then(function(t){var a=t.data;"success"==a.state?e.checkboxGroupType=a.data:e.$alert(a.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(e){}})})},methods:{changeMessageSort:function(e){var t=this;e.value?e.value=!1:e.value=!0,Object(c.j)({id:e.id,value:e.value}).then(function(a){var c=a.data;"success"==c.state?t.$message({message:e.value?"已成功开启 "+e.text:"已成功关闭 "+e.text,type:"success"}):t.$alert(c.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(e){}})})},changeMessageType:function(e){var t=this;e.value?e.value=!1:e.value=!0,Object(c.k)({id:e.id,value:e.value}).then(function(a){var c=a.data;"success"==c.state?t.$message({message:e.value?"已成功开启 "+e.text:"已成功关闭 "+e.text,type:"success"}):t.$alert(c.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(e){}})})}},components:{}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"personal-setting-xxsz"},[a("div",[a("h4",[e._v("接收消息渠道 ")]),e._v(" "),e._l(e.checkboxGroup,function(t,c){return a("el-checkbox",{key:c,attrs:{title:t.text,checked:t.value,label:t.text,size:"small",border:""},on:{change:function(a){e.changeMessageSort(t)}}})})],2),e._v(" "),a("br"),e._v(" "),a("div",{staticClass:"personal-setting-type"},[a("h4",[e._v("接收消息类别 ")]),e._v(" "),e._l(e.checkboxGroupType,function(t,c,n){return a("div",[a("h5",[e._v(e._s(c))]),e._v(" "),e._l(t,function(t,c){return a("el-checkbox",{key:c,attrs:{title:t.text,checked:t.value,label:t.text,size:"small",border:""},on:{change:function(a){e.changeMessageType(t)}}})})],2)})],2)])])},staticRenderFns:[]};var r=a("Z0/y")(n,s,!1,function(e){a("tjsI")},"data-v-76718cb1",null);t.default=r.exports},tjsI:function(e,t){}});
//# sourceMappingURL=36.897fd7b1e36771e82d08.js.map