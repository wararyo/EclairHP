var ua = navigator.userAgent;
//携帯かどうか
var isPhone = function () {
  // iPhone
  if(ua.indexOf('iPhone') > -1) return true;
  // Android
  if(ua.indexOf('Android') > -1) return true;
  // Other
  if(ua.indexOf('Mobile') > -1) return true;

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
  		navigation.currentSection = i;
  		return;
  	}
  }
  navigation.currentSection = -1;
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

var navigation = new Vue({
  el: '#nav',
  data: {
    currentSection: 0,
    shownInMobile: false
  }
});

var movie = new Vue({
  el: '#movie',
  computed: {
    isPhone: function () {
      return isPhone();
    }
  }
});

var about = new Vue({
  el: '#about',
  computed: {
    isPhone: function () {
      return isPhone();
    }
  }
});

var characters = new Vue({
  el: '#characters'
});

var gallery = new Vue({
  el: '#gallery'
});

// おわり

//モバイル時ハンバーガーアイコン
var toggleNav = function() {
  navigation.shownInMobile = !navigation.shownInMobile;
};

// Youtube
if(!isMobile()) {//携帯だったらスクリプト読まないぜ
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
    if(loopCount < 20) {//放置されても通信量ヤバくならない
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

