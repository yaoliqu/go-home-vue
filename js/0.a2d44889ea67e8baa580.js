webpackJsonp([0],{AzaB:function(e,o,r){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=r("Xxa5"),a=r.n(t),i=r("mvHQ"),l=r.n(i),m=r("exGp"),f=r.n(m),n={data:function(){return{form:{ref:"form",size:"mini",labelWidth:"100px",model:{onWorkTime:"",offWorkTime:"",workType:null,payOffDay:null},rules:{onWorkTime:[{required:!0,message:"请输入",trigger:"none"}],offWorkTime:[{required:!0,message:"请输入",trigger:"none"}],workType:[{required:!0,message:"请输入",trigger:"none"}],payOffDay:[{required:!0,message:"请输入",trigger:"none"}]}}}},created:function(){var e=JSON.parse(localStorage.getItem("goHomeConfig")||"{}");this.form.model.onWorkTime=e.onWorkTime||"09:00",this.form.model.offWorkTime=e.offWorkTime||"18:00",this.form.model.workType=e.workType||0,this.form.model.payOffDay=e.payOffDay||10},methods:{save:function(){var e=this;return f()(a.a.mark(function o(){return a.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.$refs.form.validate();case 2:localStorage.setItem("goHomeConfig",l()(e.form.model)),e.$emit("updateConfig");case 4:case"end":return o.stop()}},o,e)}))()}}},s={render:function(){var e=this,o=e.$createElement,r=e._self._c||o;return r("el-card",[r("el-form",e._b({},"el-form",e.form,!1),[r("div",{staticClass:"flex-start"},[r("el-form-item",{attrs:{label:"考勤时间：",prop:"onWorkTime"}},[r("el-time-select",{attrs:{"picker-options":{start:"00:00",step:"00:30",end:"23:59",maxTime:e.form.model.offWorkTime},placeholder:"上班时间"},model:{value:e.form.model.onWorkTime,callback:function(o){e.$set(e.form.model,"onWorkTime",o)},expression:"form.model.onWorkTime"}})],1),e._v(" "),r("el-form-item",{attrs:{"label-width":"10px",prop:"offWorkTime"}},[r("el-time-select",{attrs:{"picker-options":{start:"00:00",step:"00:30",end:"23:59",minTime:e.form.model.onWorkTime},placeholder:"下班时间"},model:{value:e.form.model.offWorkTime,callback:function(o){e.$set(e.form.model,"offWorkTime",o)},expression:"form.model.offWorkTime"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"发薪日：",prop:"payOffDay"}},[r("div",{staticClass:"flex-start"},[e._v("\n        每月\n        "),r("el-input-number",{attrs:{min:1,max:31},model:{value:e.form.model.payOffDay,callback:function(o){e.$set(e.form.model,"payOffDay",o)},expression:"form.model.payOffDay"}}),e._v("\n        号\n      ")],1)]),e._v(" "),r("div",{staticClass:"tips"},[e._v("如果设置31号，遇到没有31号的月份，会取当月最后一天作为发薪日")]),e._v(" "),r("el-form-item",{attrs:{label:"工作制：",prop:"workType"}},[r("el-radio-group",{model:{value:e.form.model.workType,callback:function(o){e.$set(e.form.model,"workType",o)},expression:"form.model.workType"}},[r("el-radio",{attrs:{label:0}},[e._v("双休")]),e._v(" "),r("el-radio",{attrs:{label:1,disabled:""}},[e._v("大小周")]),e._v(" "),r("el-radio",{attrs:{label:2,disabled:""}},[e._v("单休")])],1)],1),e._v(" "),r("div",{staticClass:"tips"},[e._v("你都单休大小周了，还摸什么鱼？？？")])],1)],1)},staticRenderFns:[]};var d=r("VU/8")(n,s,!1,function(e){r("whmS")},"data-v-159d6531",null);o.default=d.exports},mvHQ:function(e,o,r){e.exports={default:r("qkKv"),__esModule:!0}},qkKv:function(e,o,r){var t=r("FeBl"),a=t.JSON||(t.JSON={stringify:JSON.stringify});e.exports=function(e){return a.stringify.apply(a,arguments)}},whmS:function(e,o){}});
//# sourceMappingURL=0.a2d44889ea67e8baa580.js.map