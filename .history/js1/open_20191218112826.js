
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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })

/******/ });
//# sourceMappingURL=open.js.map