(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0a7d5465"],{"00a1":function(e,r,t){"use strict";t.d(r,"a",(function(){return o})),t.d(r,"f",(function(){return l})),t.d(r,"e",(function(){return i})),t.d(r,"c",(function(){return s})),t.d(r,"d",(function(){return a})),t.d(r,"b",(function(){return u}));var n=t("b775");function o(e){return Object(n["a"])({url:"/permission/permissionMenuAdd",method:"post",data:e})}function l(e){return Object(n["a"])({url:"/permission/permissionMenuOptions",method:"get",params:e})}function i(){return Object(n["a"])({url:"/permission/permissionMenuLst",method:"get"})}function s(e){return Object(n["a"])({url:"/permission/permissionMenuDetail",method:"get",params:e})}function a(e){return Object(n["a"])({url:"/permission/permissionMenuEdit",method:"post",data:e})}function u(e){return Object(n["a"])({url:"/permission/permissionMenuDelete",method:"get",params:e})}},8062:function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"app-container permission_menu_add"},[t("el-row",{attrs:{type:"flex",justify:"center"}},[t("el-col",{attrs:{xs:24,md:12}},[t("el-form",{ref:"ruleForm",attrs:{rules:e.rules,model:e.ruleForm,"label-position":"right","label-width":"150px"}},[t("el-form-item",{attrs:{label:"菜单名称",prop:"title"}},[t("el-input",{attrs:{placeholder:"菜单名称"},model:{value:e.ruleForm.title,callback:function(r){e.$set(e.ruleForm,"title",r)},expression:"ruleForm.title"}})],1),t("el-form-item",{attrs:{label:"路由地址",prop:"path"}},[t("el-input",{attrs:{placeholder:"路由地址"},model:{value:e.ruleForm.path,callback:function(r){e.$set(e.ruleForm,"path",r)},expression:"ruleForm.path"}})],1),t("el-form-item",{attrs:{label:"映射组件名称",prop:"component"}},[t("el-input",{attrs:{placeholder:"映射组件名称"},model:{value:e.ruleForm.component,callback:function(r){e.$set(e.ruleForm,"component",r)},expression:"ruleForm.component"}})],1),t("el-form-item",{attrs:{label:"路由名称",prop:"name"}},[t("el-input",{attrs:{placeholder:"路由名称"},model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),t("el-form-item",{attrs:{label:"路由重定向地址",prop:"redirect"}},[t("el-input",{attrs:{placeholder:"路由重定向地址(没有则不填)"},model:{value:e.ruleForm.redirect,callback:function(r){e.$set(e.ruleForm,"redirect",r)},expression:"ruleForm.redirect"}})],1),t("el-form-item",{attrs:{label:"图标",prop:"icon"}},[t("el-input",{attrs:{placeholder:"图标(没有则不填)"},model:{value:e.ruleForm.icon,callback:function(r){e.$set(e.ruleForm,"icon",r)},expression:"ruleForm.icon"}})],1),t("el-form-item",{attrs:{label:"上级路由",prop:"parent_id"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.parent_id,callback:function(r){e.$set(e.ruleForm,"parent_id",r)},expression:"ruleForm.parent_id"}},e._l(e.options,(function(e){return t("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})})),1)],1),t("el-form-item",{attrs:{label:"是否显示",prop:"hidden"}},[t("el-radio",{attrs:{label:parseInt(1)},model:{value:e.ruleForm.hidden,callback:function(r){e.$set(e.ruleForm,"hidden",r)},expression:"ruleForm.hidden"}},[e._v("显示")]),t("el-radio",{attrs:{label:parseInt(2)},model:{value:e.ruleForm.hidden,callback:function(r){e.$set(e.ruleForm,"hidden",r)},expression:"ruleForm.hidden"}},[e._v("隐藏")])],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("确定")]),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)],1)],1)},o=[],l=t("00a1"),i={name:"PermissionMenuAdd",data(){return{ruleForm:{title:"",path:"",component:"",name:"",redirect:"",icon:"",parent_id:"",hidden:1},options:[{title:"请选择",id:""},{title:"顶级路由",id:0}],rules:{title:[{required:!0,message:"请输入菜单名称",trigger:"blur"},{min:2,max:6,message:"长度在 2 到 6 个字符",trigger:"blur"}],path:[{required:!0,message:"请输入路由地址",trigger:"blur"}],component:[{required:!0,message:"请输入映射组件名称",trigger:"blur"}],name:[{required:!0,message:"请输入路由名称",trigger:"blur"}],parent_id:[{required:!0,message:"请选择上级路由",trigger:"change"}]}}},mounted(){this.getOptions()},methods:{getOptions(){Object(l["f"])().then(e=>{this.options=this.options.concat(e.data)}).catch(()=>{})},submitForm(e){var r=this;this.$refs[e].validate(e=>{if(!e)return!1;Object(l["a"])(this.ruleForm).then(e=>{this.$message({message:"添加成功",type:"success",onClose:function(){r.$router.push("/permission/permission_menu/permission_menu_lst")}})}).catch(()=>{})})},resetForm(e){this.$refs[e].resetFields()}}},s=i,a=t("e90a"),u=Object(a["a"])(s,n,o,!1,null,null,null);r["default"]=u.exports}}]);
//# sourceMappingURL=chunk-0a7d5465.e3eb00d9.js.map