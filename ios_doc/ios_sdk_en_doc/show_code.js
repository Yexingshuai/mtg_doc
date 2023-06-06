var lengItemContainer = document.getElementById('leng_item_container');

var countryItem = document.getElementById('countryItem');
var countryMessage = document.getElementById('countryMessage');
var countryRadios = document.getElementsByName('group1');

var adTypeItem = document.getElementById('adTypeItem');
var adTypeMessage = document.getElementById('adTypeMessage');

var wayItem = document.getElementById('wayItem');
var wayMessgae = document.getElementById('wayMessgae');
var wayRadios = document.getElementsByName('group2');

var googlePlay_Radios = document.getElementsByName('group1');




var adTypes = [];
var version = '';
var codesContent = {
  Framework: {
    reward: [
      'MTGSDK.xcframework',
      'MTGSDKReward.xcframework',
      'MTGSDKBidding.xcframework'
    ],
    native: [
      'MTGSDK.xcframework',
      'MTGSDKBidding.xcframework'
    ],
    auto_rendering_native: [
       'MTGSDK.xcframework',
       'MTGSDKNativeAdvanced.xcframework',
       'MTGSDKBidding.xcframework'
    ],
  
    banner: [
      'MTGSDK.xcframework',
      'MTGSDKBanner.xcframework',
      'MTGSDKBidding.xcframework'
    ],
    splash: [
      'MTGSDK.xcframework',
      'MTGSDKSplash.xcframework',
      'MTGSDKBidding.xcframework'
    ],
    newinterstitial: [
      'MTGSDK.xcframework',
      'MTGSDKNewInterstitial.xcframework',
      'MTGSDKBidding.xcframework'
    ],

    cn: [
      'MTGSDKCNAddition.xcframework',
    ],
    en: [
      
    ],
  },
  Cocoapods: {
    reward: [
     "pod 'MintegralAdSDK/BidNativeAd'",
     "pod 'MintegralAdSDK/BidRewardVideoAd'"
    ],
 
    native: [
      "pod 'MintegralAdSDK/BidNativeAd'"
    ],

    auto_rendering_native: [
      "pod 'MintegralAdSDK/BidNativeAd'",
      "pod 'MintegralAdSDK/BidNativeAdvancedAd'"
    ],
   
    banner: [
      "pod 'MintegralAdSDK/BidNativeAd'",
      "pod 'MintegralAdSDK/BidBannerAd'"
    ],

    splash: [
      "pod 'MintegralAdSDK/BidNativeAd'",
      "pod 'MintegralAdSDK/BidSplashAd'"

    ],
    newinterstitial: [
      "pod 'MintegralAdSDK/BidNativeAd'",
      "pod 'MintegralAdSDK/BidNewInterstitialAd'"
    ],
    cn: [
      "pod 'MintegralAdSDK/CNAddition'"
    ],
    en: [

    ]
  },
}

window.onload = function () {
  countryRadios.forEach(item => item.addEventListener('change', this.onChangeCoutry));
  wayRadios.forEach(item => item.addEventListener('change', this.onChangeWay));
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
  androidX_Message.innerHTML = '';
}

function onChangeGooglePlay() {
  if(this.id === 'en') {
    $('#androidX').trigger('click')
  } else {
  }
}


// 获取代码
function getCode() {


  //获取国家
  var isCN = checkCountry();
  //获取集成方式
  var way = checkWay();
  //获取广告类型
  var adtype = checkAdType();
  var codeAreaContainer = document.getElementById('coder_area_container');
  codeAreaContainer.classList.add('f-dn');
  document.getElementById('framework').classList.add('f-dn');
  resizeParentFrame({});
  if (undefined == isCN || !way || !adtype ) return;

  codeAreaContainer.classList.remove('f-dn');
  var codes = [];
  var codeArea = document.getElementById('code_area');
  codeArea.innerHTML = '';

  if (way == 'Framework') {
       adTypes.forEach(item => {
        codes = codes.concat(codesContent[way][item]);
        console.log('111->' + codesContent[way][item]);
        codes = [...new Set([...codes.concat(codesContent[way][(isCN ? 'cn' : 'en')])])];

      })
  }
  
  if(way == 'Cocoapods'){
      adTypes.forEach(item => {
        codes = codes.concat(codesContent['Cocoapods'][item]);
        codes = [...new Set([...codes.concat(codesContent['Cocoapods'][(isCN ? 'cn' : 'en')])])];
      })
  }  

  var codePrefix = way == 'Cocoapods' ? document.getElementById('code_prefix_gradle') : document.getElementById('code_prefix_arr');
  var arrLink = document.getElementById('framework');
  if (way != 'Cocoapods' && isCN) {
    arrLink.classList.remove('f-dn');
  }
  let extraCode = '';
  var extraText = '';
  // if (isAndroidX == true) {
    //extraCode = (way == 'Gradie' ? "implementation 'com.mintegral.msdk.china:mtgdownloads:{version}'" : 'mintegral_mtgdownloads.aar').replace('{version}', version);
    // extraText = (way == 'Gradie' ? codeArea.dataset.gradie : codeArea.dataset.aar) + '\n' + extraCode;
  // } else {
    // if(is_support_splash){
    //    extraText = (way =='Gradie' ? codeArea.dataset.gradie : codeArea.dataset.aar) + '\n' + (way == 'Gradie' ? "implementation 'com.mintegral.msdk:mtgdownloads:{version}'" : 'mintegral_mtgdownloads.aar'); 
    // }
    // if(is_support_native){
    //    extraText = (way =='Gradie' ? codeArea.dataset.gradie : codeArea.dataset.aar) + '\n' + (way == 'Gradie' ? "implementation 'com.mintegral.msdk:mtgdownloads:{version}'" : 'mintegral_mtgdownloads.aar'); 
    // }

    //extraCode = (way == 'Gradie' ? "implementation 'com.mintegral.msdk.china.support:mtgdownloads:{version}'" : 'mintegral_mtgdownloads.aar').replace('{version}', version);
    // extraText = (way == 'Gradie' ? codeArea.dataset.gradie : codeArea.dataset.aar) + '\n' + extraCode;

  // }
 
  codeArea.innerHTML = codePrefix.innerHTML + codes.join('\n') + '\n\n' + (isCN ? extraText : '');

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