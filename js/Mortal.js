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
  }
}

export default Mortal;