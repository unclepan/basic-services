(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2354dfeb"],{"21d8":function(e,a,t){e.exports={operation:"operation_operation_2Wd84"}},2756:function(e,a,t){"use strict";var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{class:e.$style["drawer-wrap"]},[e.drawer&&!e.isHandleMove?t("div",{class:e.$style["drawer-mask"]}):e._e(),t("transition",{attrs:{name:"drawer-fade"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.drawer,expression:"drawer"}],class:e.$style.drawer},[t("div",{directives:[{name:"moves",rawName:"v-moves"}],class:e.$style["drag-line"]}),t("vue-scroll",{directives:[{name:"show",rawName:"v-show",value:e.isHandleMove,expression:"isHandleMove"}],attrs:{ops:e.ops}},[t("div",{class:e.$style.header},[t("div",[e._t("header")],2),t("i",{staticClass:"el-icon-circle-close",on:{click:function(a){e.drawer=!1}}})]),e._t("default",[e._v("自定义抽屉")])],2)],1)])],1)},r=[],l={data:function(){return{isHandleMove:!0,drawer:!1,ops:{scrollPanel:{scrollingX:!1},bar:{background:"#aaaaaa",onlyShowBarOnScroll:!1}}}},methods:{open:function(){this.drawer=!0}},directives:{moves:{inserted:function(e,a,t){var n=t.context,r=e;r.onmousedown=function(a){n.isHandleMove=!1;var t=a,r=e.parentNode,l=t.clientX,s=r.offsetWidth;document.onmousemove=function(e){if(r.offsetWidth>400){var a=e,t=a.clientX;r.style.width="".concat(s+(l-t),"px")}else r.style.width="401px",document.onmousemove=null},document.onmouseup=function(){n.isHandleMove=!0,document.onmousemove=null,document.onmouseup=null}}}}}},s=l,o=t("c745"),i=(t("bb62"),t("2877"));function u(e){this["$style"]=o["default"].locals||o["default"]}var c=Object(i["a"])(s,n,r,!1,u,null,null);a["a"]=c.exports},"36c7":function(e,a,t){e.exports={"title-box":"x-title_title-box_1eFez",title:"x-title_title_2u5Xr"}},"371d":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{class:e.$style.form},[t("x-drawer",{ref:"drawer"},[t("div",{attrs:{slot:"header"},slot:"header"},[t("span",[e._v("动态表单配置的JSON格式：")])]),t("json-viewer",{attrs:{value:e.formRender,"expand-depth":5}})],1),t("div",{class:e.$style.header},[t("x-aside",[t("span",[e._v("动态表单（有布局）： 引入组件，配置展示表单，json格式，可从后端获取，也可以前端配置，然后获取远端数据。配置格式请查看 ")]),t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.handleDrawer()}}},[e._v("配置树")])],1)],1),t("operation",{attrs:{type:e.type,formRender:e.formRender}})],1)},r=[],l=t("2756"),s=t("349e"),o=t.n(s),i=t("49a0"),u=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{class:e.$style.operation},[t("x-title",[e._v(" "+e._s(e.type.name)+" "),t("span",{attrs:{slot:"button"},slot:"button"},[t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.onSubmit()}}},[e._v("确认"+e._s(e.type.but))]),t("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.cancel()}}},[e._v("取消")]),e.type.eventGroup&&e.type.eventGroup.length?e._l(e.type.eventGroup,(function(a,n){return t("el-button",{key:n,attrs:{size:"mini"},on:{click:a.fun}},[e._v(e._s(a.name))])})):e._e()],2)]),t("x-form",{ref:"xForm",attrs:{formRender:e.formRender}})],1)},c=[],d=t("a63c"),m=t("f942"),v=t("e9b4"),p={props:{type:Object(d["e"])(),formRender:Object(d["a"])()},data:function(){return{}},components:{xForm:v["a"],xTitle:m["a"]},mounted:function(){},methods:{onSubmit:function(){this.$refs.xForm.submitForm("ruleForm",this.type.operation)},cancel:function(){this.type.cancel()}}},f=p,b=t("bb37"),h=t("2877");function w(e){this["$style"]=b["default"].locals||b["default"]}var y=Object(h["a"])(f,u,c,!1,w,null,null),_=y.exports,g={data:function(){return{type:{name:"新增表单",but:"新增",operation:this.add,cancel:this.cancel},formRender:[{name:"text",value:"",label:"输入框",type:"TEXT",rules:[{required:!0,message:"请填写输入框内容",trigger:"blur"}],meta:{placeholder:"请填写内容",size:"small"}},{name:"textarea",value:"",label:"多行文本信息",type:"TEXTAREA",rules:[{required:!0,message:"请填写多行文本信息",trigger:"blur"}],meta:{placeholder:"请填写内容",type:"textarea",size:"small"}},{name:"number",value:"",label:"数字",type:"NUMBER",rules:[{required:!0,message:"请填写数字",trigger:"blur"},{type:"number",message:"账号必须为数字值",trigger:"blur"}],meta:{placeholder:"请填写内容",size:"small"}},{name:"currency",value:"",label:"货币",type:"CURRENCY",rules:[{required:!0,message:"请填写货币",trigger:"blur"},{type:"number",message:"货币必须为数字值"}],meta:{placeholder:"请填写内容",size:"small"}},{name:"dete",value:"",label:"选择日期",type:"DATE",rules:[],describe:"时间的组件，这里只给几个基础例子，其他配置请参考element",meta:{placeholder:"选择日期",size:"small"}},{name:"detetimerange",value:"",label:"时间范围",type:"DATETIMERANGE",rules:[],describe:"时间的组件，这里只给几个基础例子，其他配置请参考element",meta:{placeholder:"请选择",size:"small"}},{name:"select1",value:"",label:"选择器（基础用法）",type:"SELECT",rules:[{required:!0,message:"请选择",trigger:"change"}],meta:{placeholder:"请选择内容",size:"small"},describe:"选择器是个强大的组件，这里只给几个基础例子，其他配置请参考element",options:function(e){var a={data:[{name:"黄金糕",value:1},{name:"双皮奶",value:2},{name:"蚵仔煎",value:3},{name:"龙须面",value:4},{name:"北京烤鸭",value:5}]};e(a)}},{name:"select2",value:"",label:"选择器（有禁用选项）",type:"SELECT",rules:[{required:!0,message:"请选择",trigger:"change"}],meta:{placeholder:"请选择内容",size:"small"},options:function(e){var a={data:[{name:"黄金糕",value:1},{name:"双皮奶",value:2,disabled:!0},{name:"蚵仔煎",value:3},{name:"龙须面",value:4},{name:"北京烤鸭",value:5}]};e(a)}},{name:"select3",value:"",label:"选择器（禁用状态）",type:"SELECT",rules:[{required:!0,message:"请选择",trigger:"change"}],meta:{placeholder:"请选择内容",size:"small",disabled:!0},options:function(e){var a={data:[{name:"黄金糕",value:1},{name:"双皮奶",value:2},{name:"蚵仔煎",value:3},{name:"龙须面",value:4},{name:"北京烤鸭",value:5}]};e(a)}},{name:"select4",value:"",label:"选择器（可清空单选）",type:"SELECT",rules:[{required:!0,message:"请选择",trigger:"change"}],meta:{placeholder:"请选择内容",size:"small",clearable:!0},options:function(e){var a={data:[{name:"黄金糕",value:1},{name:"双皮奶",value:2},{name:"蚵仔煎",value:3},{name:"龙须面",value:4},{name:"北京烤鸭",value:5}]};e(a)}},{name:"select5",value:[],label:"基础多选",type:"SELECT",rules:[{required:!0,message:"请选择",trigger:"change"}],meta:{placeholder:"请选择内容",size:"small",multiple:!0},options:function(e){var a={data:[{name:"黄金糕",value:1},{name:"双皮奶",value:2},{name:"蚵仔煎",value:3},{name:"龙须面",value:4},{name:"北京烤鸭",value:5}]};e(a)}},{name:"switch",value:1,label:"开关",type:"SWITCH",rules:[],meta:{"active-value":1,"inactive-value":0}},{name:"upload",value:"",label:"文件上传",type:"UPLOAD",rules:[],meta:{action:"/"}}]}},components:{xDrawer:l["a"],JsonViewer:o.a,operation:_,"x-aside":i["a"]},methods:{add:function(){},handleDrawer:function(){this.$refs.drawer.open()},cancel:function(){}}},x=g,E=t("d2b6");function $(e){this["$style"]=E["default"].locals||E["default"]}var z=Object(h["a"])(x,n,r,!1,$,null,null);a["default"]=z.exports},7333:function(e,a,t){},8769:function(e,a,t){"use strict";var n=t("36c7"),r=t.n(n);a["default"]=r.a},b9aa:function(e,a,t){e.exports={form:"index_form_2svMK",header:"index_header_1rX8B"}},bb37:function(e,a,t){"use strict";var n=t("21d8"),r=t.n(n);a["default"]=r.a},bb62:function(e,a,t){"use strict";var n=t("7333"),r=t.n(n);r.a},c745:function(e,a,t){"use strict";var n=t("da92"),r=t.n(n);a["default"]=r.a},d2b6:function(e,a,t){"use strict";var n=t("b9aa"),r=t.n(n);a["default"]=r.a},da92:function(e,a,t){e.exports={"drawer-wrap":"x-drawer_drawer-wrap_3jGAt","drawer-mask":"x-drawer_drawer-mask_3PHSk",drawer:"x-drawer_drawer_2j3V1","drag-line":"x-drawer_drag-line_3s804",header:"x-drawer_header_2x6ON"}},f942:function(e,a,t){"use strict";var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{class:e.$style["title-box"]},[t("h3",{class:e.$style.title},[e._t("default")],2),t("div",[e._t("button")],2)])},r=[],l={props:{},data:function(){return{}},components:{},mounted:function(){},methods:{}},s=l,o=t("8769"),i=t("2877");function u(e){this["$style"]=o["default"].locals||o["default"]}var c=Object(i["a"])(s,n,r,!1,u,null,null);a["a"]=c.exports}}]);
//# sourceMappingURL=chunk-2354dfeb.dbbe63fe.js.map