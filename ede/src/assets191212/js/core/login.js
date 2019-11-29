var globalMsg = require('./globalMsg.js');
var warmTip =require('./warmTip.js');
var banner =require('./banner.js');
var showErrorTip = require('./errorTip.js');
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
	if(!$('#che').prop('checked')){
		showErrorTip('请先同意隐私协议')
		return false;
	}
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
				banner();
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
	var timer = setInterval(function() {
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
