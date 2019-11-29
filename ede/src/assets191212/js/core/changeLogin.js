var $login = $('.login-container');
var getuserkey = require('./login.js');
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
