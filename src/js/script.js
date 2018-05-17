var ua = navigator.userAgent;
console.log(ua);
//携帯かどうか
var isPhone = function () {
  // iPhone
  if(ua.indexOf('iPhone') > -1) return true;
  // Android
  if(ua.indexOf('Android') > -1) return true;
  // Other
  if(ua.indexOf('Mobile') > -1 && ua.indexOf('iPad') === -1) return true;

  return false;
}
//モバイル端末かどうか タブレット端末含む
var isMobile = function () {
  // iPad
  if(ua.indexOf('iPad') > -1) return true;

  return isPhone();
};

// 見出しを見てる判定を行う画面上のY位置
var viewThreshold = isPhone() ? 0.1 : 0.5;
// 見てる見出しによってナビゲーションの見た目を変えるやつ
var onScroll = function() {
  var headings = document.getElementsByTagName('h2');
  for (var i = headings.length - 1; i >= 0; i--) {
  	var posY = headings[i].getBoundingClientRect().top;
  	var windowHeight = document.documentElement.clientHeight;
  	if(posY < windowHeight * viewThreshold) {
  		vue.currentSection = i;
  		return;
  	}
  }
  vue.currentSection = -1;
}
document.addEventListener('scroll', onScroll)

Vue.use(VueLazyload, {
  loading: 'images/common/loading.svg',
  preLoad: 1.6
});

var sectionNames = [
  'INDEX',
  '電撃少女エクレアとは',
  'キャラクター',
  'ギャラリー',
  'ロードマップ',
];

var header = new Vue({
  el: 'header',
  computed: {
    isMobile: function () {
      return isMobile();
    }
  }
});

var vue = new Vue({
  el: '#wrapper',
  data: {
    currentSection: 0,
    shownInMobile: false
  },
  computed: {
    isPhone: function () {
      return isPhone();
    },
    isMobile: function () {
      return isMobile();
    },
    currentSectionName: function() {
      return sectionNames[this.currentSection+1];
    }
  }
});

// おわり

//モバイル時ハンバーガーアイコン
var toggleNav = function() {
  vue.shownInMobile = !vue.shownInMobile;
};

// Youtube
if(!isPhone()) {//携帯だったらスクリプト読まないぜ
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

//ナビゲーション下の動画
var moviePlayer;
//電撃移動の動画 
var etoPlayer;
function onYouTubeIframeAPIReady() {
  moviePlayer = new YT.Player('movie-player', {
    height: '320',
    width: '1280',
    videoId: 'qmaJQN9-RVM',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      showinfo: 0,
      disablekb: 1,
      rel: 0
    }
  });
  etoPlayer = new YT.Player('about-player', {
    height: '360',
    width: '480',
    videoId: 'xNKilogWNNs',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      showinfo: 0,
      disablekb: 1,
      rel: 0
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  event.target.mute();
}

var loopCount = 0;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    if(loopCount < 10) {//放置されても通信量ヤバくならない
      event.target.seekTo(0,true);
      event.target.playVideo();
      loopCount++;
    }
  }
}

var pauseMovie = function () {
  moviePlayer.pauseVideo();
}

//End Youtube

console.log("hoge");


// Stageオブジェクトを作成します。表示リストのルートになります。
stage = new createjs.Stage("headerCanvas");
 
// パーティクルシステム作成します。
particleSystem = new particlejs.ParticleSystem();
 
// パーティクルシステムの描画コンテナーを表示リストに登録します。
stage.addChild(particleSystem.container);

// Particle Developから保存したパラメーターを反映します。
particleSystem.importFromJson(
// JSONテキストのコピー＆ペースト ここから--
{
    "bgColor": "#00000",
    "width": 1280,
    "height": 640,
    "emitFrequency": 20,
    "startX": 900,
    "startXVariance": 55,
    "startY": 500,
    "startYVariance": 155,
    "initialDirection": "0",
    "initialDirectionVariance": 270,
    "initialSpeed": 1,
    "initialSpeedVariance": 3,
    "friction": "0.0035",
    "accelerationSpeed": 0.005,
    "accelerationDirection": 192,
    "startScale": 0.2,
    "startScaleVariance": 0.2,
    "finishScale": "0",
    "finishScaleVariance": "0",
    "lifeSpan": "700",
    "lifeSpanVariance": "500",
    "startAlpha": "0.51",
    "startAlphaVariance": "1",
    "finishAlpha": "0",
    "finishAlphaVariance": "0",
    "shapeIdList": [
        "blur_circle",
        "circle"
    ],
    "startColor": {
        "hue": "0",
        "hueVariance": "0",
        "saturation": "0",
        "saturationVariance": 0,
        "luminance": "100",
        "luminanceVariance": "47"
    },
    "blendMode": true,
    "alphaCurveType": "0",
    "VERSION": "1.0.0"
}
// JSONテキストのコピー＆ペースト ここまで--
);

function handleTick() {
  // パーティクルの発生・更新
  particleSystem.update();
 
  // 描画を更新する
  stage.update();
  console.log("hoge");
}

// フレームレートの設定
createjs.Ticker.framerate = 60;
// 定期的に呼ばれる関数を登録
createjs.Ticker.on("tick", handleTick);

