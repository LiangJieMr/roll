require('./core/fontSize.js');
$(function(){
	var origin = window.location.origin;
	var urlObj = {
	 'http://10.100.136.243:8000':'http://test.iopen.com.cn',
	 'http://www.open.com.cn':'http://m.open.com.cn',
	 'http://www.iopen.com.cn':'http://m.iopen.com.cn',
	 'https://www.open.com.cn':'https://m.open.com.cn'
	};
	if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
	 var jumpUrl = urlObj[origin]
	 if(jumpUrl){
	  window.location.href = `${jumpUrl}${window.location.pathname}`;
	 }
	}
	/*同盾安全初始化-开始*/
	window._fmOpt = {
	    partner: "aopengjy",
	    appName: "aopengNESwz_web",
	    token: "aopengjy" + "-" + new Date().getTime() + "-"+ Math.random().toString(16).substr(2),
	    fmb: true,
	    getinfo: function(){
	        return "e3Y6ICIyLjUuMCIsIG9zOiAid2ViIiwgczogMTk5LCBlOiAianMgbm90IGRvd25sb2FkIn0=";
	    }                           
	};
	var cimg = new Image(1,1);
	cimg.onload = function() {
	    _fmOpt.imgLoaded = true;
	};
	cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=aopengjy&appName=aopengNESwz_web&tokenId=" + _fmOpt.token;
	var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
	fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/v2/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
	/*同盾安全初始化-结束*/
	var changeStatus = require('./core/changeStatus.js');
	var changeLogin = require('./core/changeLogin.js');
	var banner = require('./core/banner.js');
	var school = require('./core/school.js');
	var myprize = require('./core/myprize.js');
	var warmTip = require('./core/warmTip.js');
	var showErrorTip = require('./core/errorTip.js');
	
	require('./core/login.js');
	require('./core/header.js');
	require('./open.js');
	/*初始化状态开始*/
	changeStatus();
	/*初始化状态结束*/
	
	$.lazyImg('lazy');
	/*登录-开始*/
	$(".header-box .login").on('click',function(){
		changeLogin(true);
	});
	$(".header-box dt i").on('click',function(){
		var $logout = $(this).next();
		
		if($logout.css('display') == 'none'){
			$logout.slideDown(200);
		}else{
			$logout.slideUp(150);
		}
		
	});
	$(".header-box dt em").on('click',function(){
		$.removeLocalStorage('infor');
		changeStatus();
	});
	/*登录-结束*/
	
	/*抽奖按钮开始*/
	$('.activity_rollpo').on('touchstart',function(){});
	/*抽奖按钮结束*/
	
})
window.onload = function(){
	/*灯光切换开始*/
	var ledTime;
	var ledIndex = 0;
	led();
	function led(){
		ledIndex++;
		if(ledIndex > 3){
			ledIndex = 1;
		}
		if(ledIndex == 1){
			$('.activity_rolllight').attr('class','activity_rolllight activity_rolllight1')
		}else if(ledIndex == 2){
			$('.activity_rolllight').attr('class','activity_rolllight activity_rolllight2')
		}else if(ledIndex == 3){
			$('.activity_rolllight').attr('class','activity_rolllight activity_rolllight3')
		}else{
			$('.activity_rolllight').attr('class','activity_rolllight activity_rolllight1')
		}
		if(ledTime){
			clearInterval(ledTime)
		}
		ledTime = setInterval(()=>{
			led()
		},800)
	}
	/*灯光切换结束*/
}
