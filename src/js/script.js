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

// おわり

var navigation = new Vue({
  el: '#nav',
  data: {
    currentSection: 0
  }
});
