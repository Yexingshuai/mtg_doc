var lengItemContainer = document.getElementById('leng_item_container');

var countryItem = document.getElementById('countryItem');
var countryMessage = document.getElementById('countryMessage');
var countryRadios = document.getElementsByName('group1');

var adTypeItem = document.getElementById('adTypeItem');
var adTypeMessage = document.getElementById('adTypeMessage');

var wayItem = document.getElementById('wayItem');
var wayMessgae = document.getElementById('wayMessgae');
var wayRadios = document.getElementsByName('group2');

var isAndroidX = document.getElementById('isSupportX');
var androidX_Message = document.getElementById('androidX_Message');
var androidX_Radios = document.getElementsByName('group3');
var googlePlay_Radios = document.getElementsByName('group1');




var adTypes = [];
var version = '';
var codesContent = {
  AAR: {
    reward: [
      'mbridge_reward.aar',
      'mbridge_videocommon.aar',
      'mbridge_videojs.aar',
      'mbridge_playercommon.aar',
      'mbridge_mbjscommon.aar',
      'mbridge_dycreator.aar'
    ],
    iv: [
      'mbridge_interstitialvideo.aar',
      'mbridge_videocommon.aar',
      'mbridge_videojs.aar',
      'mbridge_playercommon.aar',
      'mbridge_reward.aar',
      'mbridge_mbjscommon.aar'
    ],
    native: [
      'mbridge_mbnative.aar',
      'mbridge_nativeex.aar',
      'mbridge_mbjscommon.aar',
      'mbridge_playercommon.aar',
      'mbridge_videocommon.aar'
    ],
    auto_rendering_native: [
      'mbridge_mbnativeadvanced.aar',
      'mbridge_mbjscommon.aar',
      'mbridge_videocommon.aar'
    ],
    appwall: ['mintegral_appwall.aar'],
    intersitial: [
      'mbridge_mbjscommon.aar',
      'mbridge_interstitial.aar'
    ],
    banner: [
      'mbridge_mbbanner.aar',
      'mbridge_mbjscommon.aar',
      'mbridge_videocommon.aar'
    ],
    interactive: [
      'mbridge_videocommon.aar',
      'mbridge_mbjscommon.aar',
      'mbridge_interactiveads.aar'
    ],
    splash: [
      'mbridge_videocommon.aar',
      'mbridge_mbjscommon.aar',
      'mbridge_mbsplash.aar',
      'mbridge_dycreator.aar'
    ],
    newinterstitial: [
      'mbridge_newinterstitial.aar',
      'mbridge_videocommon.aar',
      'mbridge_videojs.aar',
      'mbridge_playercommon.aar',
      'mbridge_reward.aar',
      'mbridge_mbjscommon.aar',
      'mbridge_dycreator.aar'
    ],

    cn: [
      'mbridge_chinasame.aar',
      '//If you need to use auction ads, please add this aar。(mbbid.aar)',
      'mbridge_mbbid.aar',
    ],
    en: [
      'mbridge_same.aar',
      '//If you need to use auction ads, please add this aar。(mbbid.aar)',
      'mbridge_mbbid.aar',
    ]
  },
  Gradie_X: {
    reward: [
      // "implementation 'com.mbridge.msdk:videojs:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:playercommon:{version}'",
      "implementation 'com.mbridge.msdk:reward:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'"
    ],
    iv: [
      // "implementation 'com.mbridge.msdk:videojs:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:playercommon:{version}'",
      // "implementation 'com.mbridge.msdk:reward:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
      "implementation 'com.mbridge.msdk:interstitialvideo:{version}'"
    ],
    native: [
      "implementation 'com.mbridge.msdk:mbnative:{version}'",
      // "implementation 'com.mbridge.msdk:nativeex:{version}'",
      // "implementation 'com.mbridge.msdk:playercommon:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'"
    ],
    auto_rendering_native: [
      "implementation 'com.mbridge.msdk:mbnativeadvanced:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'"
    ],
    appwall: ["implementation 'com.mbridge.msdk:appwall:{version}'"],
    intersitial: [
      "implementation 'com.mbridge.msdk:interstitial:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'"
    ],
    banner: [
      "implementation 'com.mbridge.msdk:mbbanner:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'"
    ],
    interactive: [
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
      "implementation 'com.mbridge.msdk:interactiveads:{version}'"
    ],
    splash: [
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
      "implementation 'com.mbridge.msdk:mbsplash:{version}'"
    ],
    newinterstitial: [
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
       "implementation 'com.mbridge.msdk:newinterstitial:{version}'"
    ],
    cn: [
       "//If you need to use auction ads, please add this dependency statement.(mbbid)",
       "implementation 'com.mbridge.msdk:mbbid:{version}'"
    ],
    en: [
       "//If you need to use auction ads, please add this dependency statement.(mbbid)",
       "implementation 'com.mbridge.msdk:mbbid:{version}'"
    ]
  },
  //Support
  Support: {
    reward: [
      // "implementation 'com.mbridge.msdk:videojs:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:playercommon:{version}'",
      "implementation 'com.mbridge.msdk:reward:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'"
    ],
    iv: [
      // "implementation 'com.mbridge.msdk:videojs:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:playercommon:{version}'",
      // "implementation 'com.mbridge.msdk:reward:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
      "implementation 'com.mbridge.msdk:interstitialvideo:{version}'"
    ],
    native: [
      "implementation 'com.mbridge.msdk:mbnative:{version}'",
      // "implementation 'com.mbridge.msdk:nativeex:{version}'",
      // "implementation 'com.mbridge.msdk:playercommon:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'"
    ],
    auto_rendering_native: [
      "implementation 'com.mbridge.msdk:mbnativeadvanced:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'"
    ],
    appwall: ["implementation 'com.mbridge.msdk:appwall:{version}'"],
    intersitial: [
      "implementation 'com.mbridge.msdk:interstitial:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'"
    ],
    banner: [
      "implementation 'com.mbridge.msdk:mbbanner:{version}'",
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'"
    ],
    interactive: [
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
      "implementation 'com.mbridge.msdk:interactiveads:{version}'"
    ],
    splash: [
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
      "implementation 'com.mbridge.msdk:mbsplash:{version}'"
    ],
    newinterstitial: [
      // "implementation 'com.mbridge.msdk:mbjscommon:{version}'",
      // "implementation 'com.mbridge.msdk:videocommon:{version}'",
       "implementation 'com.mbridge.msdk:newinterstitial:{version}'"
    ],
    cn: [
       "//If you need to use auction ads, please add this dependency statement.(mbbid)",
       "implementation 'com.mbridge.msdk:mbbid:{version}'"
    ],
    en: [
       "//If you need to use auction ads, please add this dependency statement.(mbbid)",
       "implementation 'com.mbridge.msdk:mbbid:{version}'"
    ]
  }
}

window.onload = function () {
  countryRadios.forEach(item => item.addEventListener('change', this.onChangeCoutry));
  wayRadios.forEach(item => item.addEventListener('change', this.onChangeWay));
  androidX_Radios.forEach(item => item.addEventListener('change', this.onChangeAndroidX));
  googlePlay_Radios.forEach(item => item.addEventListener('change', this.onChangeGooglePlay));
  resizeParentFrame({});
  listenParentMsg();
  $('ul.tabs').tabs();
}

lengItemContainer.addEventListener('click', function (event) {
  event = event || window.event;
  var target = event.target

  if (
    !target ||
    (-1 == target.className.indexOf('leng_item') &&
      -1 == target.parentNode.className.indexOf('leng_item'))
  ) return;

  if (-1 == target.className.indexOf('leng_item') && -1 <= target.parentNode.className.indexOf('leng_item'))
    target = target.parentNode

  var key = target.dataset.key
  var index = adTypes.indexOf(key);

  if (target.className.indexOf('item_focus') > -1) {
    target.classList.remove('item_focus');
    key && adTypes.splice(index, 1);
  } else {
    target.classList.add('item_focus');
    key && adTypes.push(key);
  }
  checkAdType()
})

function checkCountry() {
  var opts = ['cn', 'en']
  var isCN;

  countryRadios.forEach(function (item) {
    if (item.checked) {
      isCN = item.id == opts[0];
    }
  })

  if (isCN == undefined) {
    countryItem.classList.add('f-item-error');
    countryMessage.innerHTML = countryMessage.dataset.msg;
  }

  return isCN;
}

function onChangeCoutry() {
  countryItem.classList.remove('f-item-error');
  countryMessage.innerHTML = '';
}

function checkAdType() {
  if (!adTypes.length) {
    adTypeItem.classList.add('f-item-error');
    adTypeMessage.innerHTML = adTypeMessage.dataset.msg;
  } else {
    adTypeItem.classList.remove('f-item-error');
    adTypeMessage.innerHTML = '';
  }
  return adTypes.length;
}

function checkWay() {
  var way;

  wayRadios.forEach(function (item) {
    if (item.checked) {
      way = item.id
    }
  })

  if (way == undefined) {
    wayItem.classList.add('f-item-error');
    wayMessgae.innerHTML = wayMessgae.dataset.msg;
  }

  return way;
}

function onChangeWay() {
  wayItem.classList.remove('f-item-error');
  wayMessgae.innerHTML = '';
}

function onChangeAndroidX() {
  isAndroidX.classList.remove('f-item-error');
  androidX_Message.innerHTML = '';
}

function onChangeGooglePlay() {
  if(this.id === 'en') {
    $('#androidX').trigger('click')
    isAndroidX.style.display = 'none'
  } else {
    isAndroidX.style.display = 'block'
  }
}

function checkAndroidX() {
  var opts = ['androidX', 'support']
  var isSupportX;

  androidX_Radios.forEach(function (item) {
    if (item.checked) {
      isSupportX = item.id == opts[0];
    }
  })

  if (isSupportX == undefined) {
    isAndroidX.classList.add('f-item-error');
    androidX_Message.innerHTML = androidX_Message.dataset.msg;
  }
  return isSupportX;
}

// 获取代码
function getCode() {


  //获取国家
  var isCN = false;  //var isCN = checkCountry();
  //获取集成方式
  var way = checkWay();
  //获取广告类型
  var adtype = checkAdType();
  //获取是否支持AndroidX
  var isAndroidX = true;  //var isAndroidX = checkAndroidX();
  // var is_support_splash = true;
  // var is_support_native = true;  
  var codeAreaContainer = document.getElementById('coder_area_container');
  codeAreaContainer.classList.add('f-dn');
  document.getElementById('aar_link_cn_android_x').classList.add('f-dn');
  document.getElementById('aar_link_en_android_x').classList.add('f-dn');
  document.getElementById('aar_link_cn_support').classList.add('f-dn');
  document.getElementById('aar_link_en_support').classList.add('f-dn');
  resizeParentFrame({});
  if (undefined == isCN || !way || !adtype || undefined == isAndroidX) return;

  codeAreaContainer.classList.remove('f-dn');
  var codes = [];
  var codeArea = document.getElementById('code_area');
  codeArea.innerHTML = '';
  if (isAndroidX == true) {
    if (way == 'AAR') {
      adTypes.forEach(item => {
        codes = codes.concat(codesContent[way][item]);
        codes = [...new Set([...codes.concat(codesContent[way][(isCN ? 'cn' : 'en')])])];
      })
    } else if (way == 'Gradie') {
      adTypes.forEach(item => {
        codes = codes.concat(codesContent['Gradie_X'][item]);
        codes = [...new Set([...codes.concat(codesContent['Gradie_X'][(isCN ? 'cn' : 'en')])])];
      })

      // 根据是否gp确定版本号
      version = isCN ? '16.4.42' : '16.4.41'
    }
  } else {
    // is_support_native=false;
    // is_support_splash = false;
    if (way == 'AAR') {
      adTypes.forEach(item => {
        // if(item == 'splash'){
        //   is_support_splash=false;
        //   return;
        //   }
        // if(item == 'auto_rendering_native'){
        //  is_support_native=false;
        //  return;
        //  }
        codes = codes.concat(codesContent[way][item]);
        codes = [...new Set([...codes.concat(codesContent[way][(isCN ? 'cn' : 'en')])])];
      })
    } else if (way == 'Gradie') {
      adTypes.forEach(item => {
        // if(item == 'splash'){
        //   is_support_splash=false;
        //   return;
        // }else if(item == 'auto_rendering_native'){
        // is_support_native=false;
        // return;
        // }else{
        codes = codes.concat(codesContent['Support'][item]);
        codes = [...new Set([...codes.concat(codesContent['Support'][(isCN ? 'cn' : 'en')])])];
        // }
      })

      // 根据是否gp确定版本号
      version = isCN ? '16.4.47' : '10.8.01'
    }
  }

  if (way == 'Gradie') {
    // var index = codes.indexOf("implementation 'com.mintegral.msdk:mtgdownloads:{version}'");
    // if (index > -1) {
    //   codes.splice(index, 1);
    // }
    // var index2 = codes.indexOf("implementation 'com.mintegral.msdk:mtgdownloads:{version}'");
    // if (index2 > -1) {
    //   codes.splice(index2, 1);
    // }
    // gp上架 + gradie 添加 oversea标识
    if (!isCN && isAndroidX) {
      codes = codes.map(item => item.replace('com.mbridge.msdk', 'com.mbridge.msdk.oversea'));
    }

    if(isCN && isAndroidX){
      codes = codes.map(item => item.replace('com.mbridge.msdk', 'com.mbridge.msdk.china'));
    }

    if(isCN && !isAndroidX){
      codes = codes.map(item => item.replace('com.mbridge.msdk', 'com.mbridge.msdk.support'));
    }
    // 替换version占位符
    codes = codes.map(item => item.replace('{version}', version))
    // if(is_support_splash){
    //    var index2= codes.indexOf("implementation 'com.mintegral.msdk:mtgdownloads:{version}'");
    //    if(index2 > -1){
    //        codes.splice(index2, 1);
    //    }
    // }
    // if(is_support_native){
    //    var index3= codes.indexOf("implementation 'com.mintegral.msdk:mtgdownloads:{version}'");
    //    if(index3 > -1){
    //        codes.splice(index3, 1);
    //    }
    // }

  } else {
    // var index = codes.indexOf('mintegral_mtgdownloads.aar');
    // if (index > -1) {
    //   codes.splice(index, 1);
    // }
  }

  var codePrefix = way == 'Gradie' ? document.getElementById('code_prefix_gradle') : document.getElementById('code_prefix_arr');
  var arrLink = document.getElementById(`aar_link_${isCN ? 'cn' : 'en'}_${isAndroidX ? 'android_x' : 'support'}`);
  if (way != 'Gradie' && (isCN || isAndroidX)) {
    arrLink.classList.remove('f-dn');
  }
  let extraCode = '';
  var extraText = '';
  if (isAndroidX == true) {
    // extraCode = (way == 'Gradie' ? "implementation 'com.mintegral.msdk.china:mtgdownloads:{version}'" : 'mintegral_mtgdownloads.aar').replace('{version}', version);
    extraText = (way == 'Gradie' ? codeArea.dataset.gradie : codeArea.dataset.aar) + '\n' + extraCode;
  } else {
    // if(is_support_splash){
    //    extraText = (way =='Gradie' ? codeArea.dataset.gradie : codeArea.dataset.aar) + '\n' + (way == 'Gradie' ? "implementation 'com.mintegral.msdk:mtgdownloads:{version}'" : 'mintegral_mtgdownloads.aar'); 
    // }
    // if(is_support_native){
    //    extraText = (way =='Gradie' ? codeArea.dataset.gradie : codeArea.dataset.aar) + '\n' + (way == 'Gradie' ? "implementation 'com.mintegral.msdk:mtgdownloads:{version}'" : 'mintegral_mtgdownloads.aar'); 
    // }

    // extraCode = (way == 'Gradie' ? "implementation 'com.mintegral.msdk.china.support:mtgdownloads:{version}'" : 'mintegral_mtgdownloads.aar').replace('{version}', version);
    extraText = (way == 'Gradie' ? codeArea.dataset.gradie : codeArea.dataset.aar) + '\n' + extraCode;

  }
  if (!isCN && !isAndroidX) {
    var tips = document.getElementById('codes_tips').innerHTML;
    codeArea.innerHTML = tips;
    codes = [];
  } else {
    codeArea.innerHTML = codePrefix.innerHTML + codes.join('\n') + '\n\n' + (isCN ? extraText : '');
  }

  Prism.highlightAll();
  resizeParentFrame({});
  isCN && codes.push(extraCode);
  listenCopyBtn(codes);
}

var timer = null;
// 通知父窗口更改frame的宽高
function resizeParentFrame(param) {
  /*
    param.width 鎺у埗瀹藉害
    param.height 鎺у埗楂樺害
  */
  var url = document.referrer;
  if (-1 < url.indexOf('cdn-adn.rayjump.com')) {
    var iframes = window.parent.document.getElementsByTagName('iframe');
    var frameElement = null;
    for (var i = 0, iMax = iframes.length; i < iMax; i++) {
      if (iframes[i].contentWindow == window) {
        frameElement = iframes[i];

        var frameHeight = document.body.parentElement.offsetHeight;
        frameHeight = param ? (param['height'] || frameHeight) : frameHeight;
        var frameWidth = document.body.parentElement.offsetWidth;
        frameWidth = param ? (param['width'] || frameWidth) : frameWidth;
        frameElement.style.height = frameHeight + 'px';
        frameElement.style.width = frameWidth + 'px';
      }
    }

    frameElement && window.parent.window.$(frameElement).trigger('frameresize');
  } else {
    postParentMsg();
    clearInterval(timer);
    timer = setInterval(() => {
      postParentMsg()
    }, 1000)
  }
}

// 监听复制按钮事件
function listenCopyBtn(codes) {
  $('#coder_area_container .toolbar-item button').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    var input = document.getElementById('h__code');
    input.value = codes.join('\n');
    input.select();
    document.execCommand('copy');
  })
}

// 监听父窗口传过来的信息
function listenParentMsg() {
  window.addEventListener('message', (e) => {
    console.log(e.data);
    if (e.data == 'receive') {
      clearInterval(timer);
    }
  })
}

// 给父窗口传信息
function postParentMsg() {
  console.log('postMessage');
  var height = document.documentElement.offsetHeight;
  var width = document.documentElement.offsetWidth;
  var id = 'iframe_show_code_android'
  window.parent.postMessage({
    height,
    width,
    id
  }, '*');
}