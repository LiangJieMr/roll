/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Created by HSP on 2018/7/27.
 */
$.extend({
	//获取地址栏参数
	getParam: function(name) {
		var search = document.location.search;
		var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
		var matcher = pattern.exec(search);
		var items = null;
		if(null != matcher) {
			try {
				items = decodeURIComponent(decodeURIComponent(matcher[1]));
			} catch(e) {
				try {
					items = decodeURIComponent(matcher[1]);
				} catch(e) {
					items = matcher[1];
				}
			}
		}
		return items;
	},
	//ajax方法封装
	sendReq: function(url, type, data, success,error) {
		$.ajax({
			url: url,
			type: type,
			asasync:false,
			dataType: 'json',
			data: data,
			success: function(data) {
				success(data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				error ? error() : '';
				var $errTip = $('.error-close');
				var $Infor = $errTip.find('.infor');
				$Infor.html('网络请求超时！');
				$errTip.css('margin-left', 0+'px')
				var wid = parseInt($errTip.outerWidth(true)/2);
				$errTip.css('margin-left', -wid+'px');
				$errTip.slideDown();
				var timer = setTimeout(function(){
					$errTip.fadeOut();
					clearTimeout(timer);
				},1000);
			}
		})
	},
	//存储数据(采用cookie存储)
	addCookie: function(objName, objValue, objHours) { //添加cookie
		var str = objName + "=" + escape(objValue);
		if(objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
			var date = new Date();
			var ms = objHours * 3600 * 1000;
			date.setTime(date.getTime() + ms);
			str += "; expires=" + date.toGMTString();
		}
		document.cookie = str;
	},
	getCookie: function(objName) { //获取指定名称的cookie的值
		var arrStr = document.cookie.split("; ");
		for(var i = 0; i < arrStr.length; i++) {
			var temp = arrStr[i].split("=");
			if(temp[0] == objName)
				return unescape(temp[1]);
		}
	},
	delCookie: function(name) { //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
		var date = new Date();
		date.setTime(date.getTime() - 10000);
		document.cookie = name + "=a; expires=" + date.toGMTString();
	},
    setStorage: function(key, value) {
        var data = {
            value: value
        };
        localStorage[key] = encodeURIComponent(JSON.stringify(data));
    },
    getStorage: function(key) {
        var data = localStorage[key];
       	var items = null;
        if (!data || data === "null") {
            return null;
        }
        try {
				items = decodeURIComponent(decodeURIComponent(data));
			} catch(e) {
				try {
					items = decodeURIComponent(data);
				} catch(e) {
					items = data;
				}
			}
        return JSON.parse(items).value;
    },
    removeLocalStorage: function(key){
        localStorage.removeItem(key);
    },
    setSession: function(key, value) {
        var data = {
            value: value
        };
        sessionStorage[key] = encodeURIComponent(JSON.stringify(data));
    },
    getSession: function(key) {
        var data = sessionStorage[key];
        var items = null;
        if (!data || data === "null") {
            return null;
        }
	     try {
				items = decodeURIComponent(decodeURIComponent(data));
			} catch(e) {
				try {
					items = decodeURIComponent(data);
				} catch(e) {
					items = data;
				}
			}
        return JSON.parse(items).value;
    },
    removeSessionStorage: function(key){
        sessionStorage.removeItem(key);
    },
	//图片懒加载初始化
	lazyImg:function(flag) {
		$("img." + flag).lazyload({
			placeholder: "../assets/images/logoBd2.svg",
			effect: "fadeIn",
			threshold: 200,
		});
	}
})

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function globalMsg(msg){
	var str = `
		<div class="global-msg-tip" style="display:none;position: fixed;z-index:10001;bottom: 1.5rem;left: 50%;transform: translateX(-50%);padding: 0.1rem 0.2rem;max-width:4rem;background-color: #000;border-radius: 0.1rem;font-size:0.3rem;color: #fff;text-align: center;">
			${msg}
		</div>
	`
	$('body').append(str);
	var $globalMsgTip = $('.global-msg-tip');
	$globalMsgTip.fadeIn(300);
	var time = setTimeout(function(){
		$globalMsgTip.fadeOut();
		$globalMsgTip.remove();
		if(time) clearTimeout(time);
	},2000);
};
module.exports = globalMsg;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var globalMsg = __webpack_require__(1);
var warmTip =__webpack_require__(10);
var indexFn = '';
/*登陆注册开始*/
var api = {
	verify: '/api/user/verify',
	checkverify: '/api/user/checkverify',
	verifysend: '/api/user/verifysend',
	verifylogin: '/api/user/verifylogin',
	userkey: '/api/user/userkey',
	lotteryCondition:'/api/activity/lotteryCondition'
}
var userkey; 
getuserkey()

function getuserkey() {
	$.ajax({
		type: 'post',
		url: api.userkey,
		async:true,
		dataType: 'json',
		success: function(res) {
			if (res.code == 0) {
				userkey = res.data
				getverify(res.data)
				$('.login-msg').text('')
			} else {
				getuserkey()
			}
		},
		error: function(err) {
//			getuserkey()
			$('.login-msg').text('请求超时，请检查您的网络')
		}
	});
}
module.exports = getuserkey;
function getverify(u) {
	$.ajax({
		type: 'post',
		url: api.verify,
		dataType: 'json',
		async:true,
		data: {
			userkey: u
		},
		success: function(res) {
			if (res.code == 0) {
				$('.valid').attr('src', res.data)
				$('.login-msg').text('')
			} else {
				getuserkey()
			}
		},
		error: function(res) {
//			getuserkey()
			$('.login-msg').text('请求超时，请检查您的网络')
		}
	});
}
/*切换图形验证码*/
$('.valid').click(function() {
	getuserkey()
})
/*获取验证码*/
$('.getcode').click(function(){
	$.ajax({
		type:"post",
		url: api.checkverify,
		async:true,
		dataType: 'json',
		data: {
			verify_code: $('.img-code').val(),
			userkey: userkey
		},
		success: function(res){
			if (res.code == 0) {
				$('.login-msg').text('');
					getverifysend();
			} else {
				$('.login-msg').text(res.msg)
			}
		},
		error: function(err) {
			$('.login-msg').text('请求超时，请检查您的网络')
		}
	});
})
/*发送验证码*/
function getverifysend() {
	$.ajax({
		type: 'post',
		url: api.verifysend,
		dataType: 'json',
		data: {
			phone: $('.phone').val(),
			sms_method: 1,
			type: 1,
			verify_code: $('.img-code').val(),
			userkey: userkey,
			deviceInfo:_fmOpt.getinfo()
		},
		success: function(res){
			if (res.code == 0) {
				setTime();
				$('.login-msg').text('')
			} else {
				$('.login-msg').text(res.msg)
			}
		},
		error: function (err) {
			$('.login-msg').text('请求超时，请检查您的网络')
		}
	})
}

function judgeUser(userSign){
	$.sendReq(
		api.lotteryCondition,
		'GET',
		{
			user_sign:userSign
		},
		function(res){
			const {code,data,msg} = res;
			if(code == 0){
				$("#emitEvent").trigger('click',true);
			}else if(code == 400001653){
				$("#emitEvent").trigger('click',false);
//				warmTip();
			}else{
				globalMsg(msg);
			}
		}
	)
};

/*登陆注册*/
$('.login-btn').click(function(){
	$.ajax({
		type: 'post',
		url: api.verifylogin,
		dataType: 'json',
		data: {
			phone: $('.phone').val(),
			sms_code: $('.code ').val(),
			type: 14,
			verify_code: $('.img-code').val(),
			userkey: userkey
		},
		success: function(res) {
			if (res.code == 0) {
				var userSign = res.data.user_sign;
				var j = {
					user_sign:userSign,
					phone_num:$('.phone').val()
				}
				$.setStorage('infor', j);
				$('.login-container .close').trigger('click');
				var $headerLogin = $('.header-box .login');
				var $headerLogout = $('.header-box .logout');
				var reg = /^(\d{3})\d{4}(\d{4})$/;
				var phoneNum = j['phone_num'];
				$headerLogin.hide();
				$headerLogout.find('i').text(phoneNum.replace(reg, "$1****$2") + ',你好！');
				$headerLogout.show();
				judgeUser(userSign);
			} else {
				$('.login-msg').text(res.msg)
			}
		},
		error: function(err) {
			$('.login-msg').text('请求超时，请检查您的网络');
		}
	})
})
/*获取短信验证码*/
function setTime() {
	var time = 60;
	var el = $('.getcode').eq(0);
	el.attr('disabled', 'disabled')
	el.text(time + '(s)')
	timer = setInterval(function() {
		time--;
		el.text(time + '(s)')
		if(time <= 0) {
			el.text("获取验证码")
			el.attr('disabled', false)
			clearInterval(timer);
		}
	}, 1000)
}
/*倒计时*/
/*登陆注册结束*/


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
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
	var changeStatus = __webpack_require__(8);
	var changeLogin = __webpack_require__(9);
	
	__webpack_require__(2);
	__webpack_require__(11);
	__webpack_require__(0);
	/*初始化状态开始*/
	changeStatus();
	/*初始化状态结束*/
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
})


/***/ }),
/* 7 */
/***/ (function(module, exports) {

function FS(doc, win) {
	  var docEl = doc.documentElement,
	    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	    recalc = function () {
	      var clientWidth = docEl.clientWidth;
	      if (!clientWidth) return;
	      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
	      if (clientWidth > 750) {
	        docEl.style.fontSize = 50 + 'px';
	      }
	    };
	  if (!doc.addEventListener) return;
	  win.addEventListener(resizeEvt, recalc, false);
	  doc.addEventListener('DOMContentLoaded', recalc, false);
};
FS(document, window)

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var globalMsg =__webpack_require__(1);
var $headerLogin = $('.header-box .login');
var $headerLogout = $('.header-box .logout');

function changeStatus(){
	var api = {
		overdue:'/api/user/overdue'
	};
	var infor = $.getStorage('infor');
	var userSign = infor ? infor['user_sign'] : '';
	var phoneNum = infor ? infor['phone_num'] : '';
	var reg = /^(\d{3})\d{4}(\d{4})$/;
	if (userSign) {
		$.sendReq(api.overdue,'post',{user_sign:userSign},function(data){
			if(data.code == 0){
				$headerLogin.hide();
				$headerLogout.find('i').text(phoneNum.replace(reg, "$1****$2")+ ',你好！');
				$headerLogout.show();
			}
			else{
				$.removeLocalStorage('infor');
				globalMsg(data.msg);
				$headerLogin.show();
				$headerLogout.find('span').hide();
				$headerLogout.find('i').text('');
				$headerLogout.hide();
			}
		});
		return false;
	}
	$headerLogin.show();
	$headerLogout.find('span').hide();
	$headerLogout.find('i').text('');
	$headerLogout.hide();
};

module.exports = changeStatus;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var $login = $('.login-container');
var getuserkey = __webpack_require__(2);
function changeLogin(flage){
	if(flage){
		getuserkey();
		$login.show().find('input').val('').end().find('.login-msg').text('');
	}
	else{
		$login.hide();
	}
};
$('.login-container .close').click(function(){
	$login.hide();
	var el = $('.getcode').eq(0);
	el.text("获取验证码")
	el.attr('disabled', false);
})
module.exports = changeLogin;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var $warmTip = $('.warm-tip');
function warmTip(){
	$warmTip.show();
};
$warmTip.find('.sure').on('click',function(){
	$warmTip.hide();
});
module.exports =  warmTip;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var $logoutSpan = $('.logout span');
$('body').on('click',function(event){
	if(!$(event.target).data('click')){
		$logoutSpan.slideUp();
	}
});

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map