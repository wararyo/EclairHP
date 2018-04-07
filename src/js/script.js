// 見てる見出しによってナビゲーションの見た目を変えるやつ
var onScroll = function() {
  var headings = document.getElementsByTagName('h2');
  for (var i = headings.length - 1; i >= 0; i--) {
  	var posY = headings[i].getBoundingClientRect().top;
  	var windowHeight = document.documentElement.clientHeight;
  	if(posY < windowHeight * 0.5) {
  		navigation.currentSection = i;
  		return;
  	}
  }
  navigation.currentSection = -1;
}
document.addEventListener('scroll', onScroll)

var navigation = new Vue({
  el: '#nav',
  data: {
    currentSection: 0
  }
});

// おわり

// Youtube

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
  event.target.mute();
}

var loopCount = 0;
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    if(loopCount < 20) {//放置されても通信量ヤバくならない
      event.target.seekTo(0,false);
      event.target.playVideo();
      loopCount++;
    }
  }
}

var pauseMovie = function () {
  moviePlayer.pauseVideo();
}

//End Youtube

