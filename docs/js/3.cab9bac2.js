(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{1449:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("q-page",{staticClass:"flex flex-center",staticStyle:{"margin-bottom":"30px"}},[o("h1",[e._v("This is CAMERA page")]),o("img",{attrs:{alt:"Quasar logo",src:a("d3d6")}}),o("video",{ref:"video",attrs:{id:"video",autoplay:"",playsinline:""}}),o("q-btn",{on:{click:e.takePhoto}},[e._v("TAKE PHOTO!")]),o("img",{attrs:{src:e.imgSrc}}),o("canvas",{staticStyle:{display:"none"}}),o("q-btn",{on:{click:e.downloadPhoto}},[e._v("DOWNLOAD PHOTO!")]),o("a",{attrs:{id:"imgatag",download:"photo.png"}})],1)},i=[],n={name:"app",data:function(){return{video:{},imgSrc:""}},mounted:function(){var e=this,t={audio:!1,video:{facingMode:{exact:"user"}}};this.video=this.$refs.video,navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia(t).then((function(t){e.video.srcObject=t})).catch((function(e){console.log(e)}))},methods:{takePhoto:function(){var e=document.querySelector("video"),t=document.querySelector("canvas");t.width=e.videoWidth,t.height=e.videoHeight,t.getContext("2d").drawImage(e,0,0),this.imgSrc=t.toDataURL("image/png")},downloadPhoto:function(){document.getElementById("imgatag").href=this.imgSrc,document.getElementById("imgatag").click()}}},c=n,d=a("2877"),s=a("9989"),r=a("9c40"),g=a("eebe"),l=a.n(g),u=Object(d["a"])(c,o,i,!1,null,null,null);t["default"]=u.exports;l()(u,"components",{QPage:s["a"],QBtn:r["a"]})},d3d6:function(e,t,a){e.exports=a.p+"img/quasar-logo-full.68ae1645.svg"}}]);