(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-311673c8"],{"489a":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"app-container scan_code_detail"},[Object.keys(t.detail).length>0?s("table",{staticClass:"table"},[s("tbody",[s("tr",[s("td",{staticClass:"label"},[t._v("客户姓名")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.client_name))]),s("td",{staticClass:"label"},[t._v("客户电话")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.client_phone))]),s("td",{staticClass:"label"},[t._v("激活用户昵称")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.nickname))]),s("td",{staticClass:"label"},[t._v("质保日期")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.sell_bill_date))])]),s("tr",[s("td",{staticClass:"label"},[t._v("型号名称")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.product_model_name))]),s("td",{staticClass:"label"},[t._v("产品类别")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.product_brand_category_name))]),s("td",{staticClass:"label"},[t._v("产品品牌")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.product_brand_name))]),s("td",{staticClass:"label"},[t._v("产品规格")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.product_specification_name))])]),s("tr",[s("td",{staticClass:"label"},[t._v("有无电梯")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.client_elevator_string))]),s("td",{staticClass:"label"},[t._v("楼层")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.client_floor))]),s("td",{staticClass:"label"},[t._v("省-市-区-街道")]),s("td",{staticClass:"text"},[t._v(" "+t._s(t.detail.client_province)+t._s(t.detail.client_city)+t._s(t.detail.client_district)+t._s(t.detail.client_street)+" ")]),s("td",{staticClass:"label"},[t._v("详细地址")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.client_address))])]),s("tr",[s("td",{staticClass:"label"},[t._v("质保码")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.code))]),s("td",{staticClass:"label"},[t._v("激活时间")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.create_time))]),s("td",{staticClass:"label"},[t._v("剩余时间")]),s("td",{staticClass:"text",attrs:{colspan:"3"}},[t._v(t._s(t.detail.zhibao))])]),s("tr",[s("td",{staticClass:"label"},[t._v("师傅姓名")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.master_name))]),s("td",{staticClass:"label"},[t._v("师傅电话")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.master_phone))]),s("td",{staticClass:"label"},[t._v("门店名称")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.store_name))]),s("td",{staticClass:"label"},[t._v("门店电话")]),s("td",{staticClass:"text"},[t._v(t._s(t.detail.store_phone))])]),s("tr",[s("td",{staticClass:"label"},[t._v("产品图片")]),s("td",{attrs:{colspan:"3"}},[s("div",{staticClass:"img"},t._l(t.detail.scan_code_activation_picture,(function(a,e){return s("el-image",{key:e,attrs:{src:a.picture,"preview-src-list":t.preview_list,lazy:!0}})})),1)]),s("td",{staticClass:"label"},[t._v("收据单")]),s("td",{attrs:{colspan:"3"}},[s("div",{staticClass:"img"},[s("el-image",{attrs:{src:t.detail.sell_bill_picture,"preview-src-list":[t.detail.sell_bill_picture],lazy:!0}})],1)])])])]):t._e()])},l=[],i=s("fdde"),c={name:"ScanCodeDetail",data(){return{ruleForm:{id:this.$route.query.id},detail:{},preview_list:[]}},mounted(){this.getScanCodeDetail()},methods:{getScanCodeDetail(){Object(i["a"])({id:this.ruleForm.id}).then(t=>{this.detail=t.data,t.data.scan_code_activation_picture.forEach(t=>{this.preview_list.push(t.picture)})}).catch(()=>{})}}},d=c,_=s("e90a"),n=Object(_["a"])(d,e,l,!1,null,null,null);a["default"]=n.exports},fdde:function(t,a,s){"use strict";s.d(a,"b",(function(){return l})),s.d(a,"c",(function(){return i})),s.d(a,"a",(function(){return c}));var e=s("b775");function l(t){return Object(e["a"])({url:"/company/scanCodeLst",method:"get",params:t})}function i(){return Object(e["a"])({url:"/company/scanCodeLstAll",method:"get"})}function c(t){return Object(e["a"])({url:"/company/scanCodeDetail",method:"get",params:t})}}}]);
//# sourceMappingURL=chunk-311673c8.12be02e4.js.map