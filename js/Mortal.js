/*
 * Mortal v0.1
 * Copyright 2015-2016 Martal.
 * Author tangjion
 * MIT License (https://github.com/tangjion/Mortal/blob/master/js/Mortal.js)
 */

let Mortal = {
  ua:navigator.userAgent,
  /*
  * 判断是否在微信环境下
  * */
  isWechat: function() {
    return this.ua.includes('MicroMessenger');
  },
  /*
  * 设置、获取及删除Cookie
  * */
  getCookie: function () {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg)){
      return decodeURIComponent(arr[2]);
    }
    else{
      return null;
    }

  },
  setCookie: function (key, value, time) {
    let exp = new Date();
    let hostName = location.hostname;
    exp.setTime(exp.getTime() + time);
    value = encodeURIComponent(value);
    document.cookie = key + "=" + value + "; domain=" + hostName + ";path=/;expires=" + exp.toGMTString();
  },
  deleteCookie: function (name) {
    let exp = new Date();
    let hostName = location.hostname;
    let val = this.getCookie(name);
    exp.setTime(exp.getTime() - 1);
    if(val != null){
      document.cookie = name + "=" + val + "; domain=" + hostName + ";path=/;expires=" + exp.toGMTString();
    }
  },
  /*
  * 解析URL中的参数，并返回对应key:value对象
  * */
  parseQueryString: function (url) {
    const reg = /([^\?\=\&]+)|=([^\?\=\&]*)/g;
    let obj = {};
    if(!url){
      url = window.location.href;
    }
    while(reg.exec(url)){
      obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
  },
  /*
  * 获取和删除某个Url上面的参数值
  * */
  getParameterByName: function (name, queryString) {
    name = name.replace(/[\[]]/,"\\[").replace(/[\]]/,"\\]");
    if(!queryString){
      queryString = window.location.search;
    }
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(queryString);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g), " ");
  },
  removerParameterByName: function (name, queryString) {
    if(!queryString){
      queryString = window.location.search;
    }
    let value = this.getParameterByName(name);
    let regex = new RegExp("[\\?&]" + name + "[=]?" + value);
    let url = queryString.replace(regex, "");
    return url.substr(0, 1) == "&" ? url.replace("&", "?") : url;
  },
  /*
  * 更改Url上面某个参数的值
  * */
  changeUrlParameter: function(url, key, val){
    if(url == "?"){
      return key + "=" + val;
    }else {
      let pattern = key + "=([^&]*)";
      let replaceTxt = key + "=" + val;
      return url.match(pattern) ? url.replace(eval('/(' + key + "=)([^&]*)/gi"), replaceTxt) : (url.match("[\?]") ? url + "&" + replaceTxt : url + "?" + replaceTxt);
    }
  },
  /*
  * 字符串模板替换方法，仿C# String.Format()
  * 例：format('我是中{0}人，我好{1}','国','厉害') => '我是中国人，我好厉害';
  * */
  stringFormat: function () {
    let len = arguments.length;
    if(len == 0){
      return null;
    }
    let str = arguments[0];
    for(let i = 1; i < len; i++){
      let regex = new RegExp("\\{" + ( i - 1 ) + "\\}", "gm");
      str = str.replace(regex, arguments[i]);
    }
    return str;
  },
  /*
  * 路由解析，返回路由数组
  * */
  getRouteParam: function () {
    const regex = new RegExp("[/]+[^/]+","g");
    let result = window.location.pathname.match(regex);
    if(!result){
      return "";
    }
    for(let i = 0,len = result.length; i < len; i++){
      result[i] = result[i].substring(1);
    }
    return result;
  },
  /*
  * 阻止和开放页面滚动，利用给body设置postion:fixed来实现，弹框是阻止页面滚动
  * */
  fixedHelper: (function () {
    let scrollTop;
    return {
      //阻止滚动
      afterOpen: function () {
        scrollTop = document.scrollingElement.scrollTop;
        document.body.style.position = "fixed";
        document.body.style.top = -scrollTop + 'px';
      },
      //放开滚动
      beforeClose: function () {
        document.body.style.position = "unset";
        document.scrollingElement.scrollTop = scrollTop;
      }
    }
  }),
  /*
  * 节流函数
  * */
  throttle: function (fn, delay) {
    let timer = null;
    return function () {
      let ctx = this,
          args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(ctx, args);
      }, delay);
    }
  }
}

export default Mortal;