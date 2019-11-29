var $errTip = $('.error-close');
var $Infor = $errTip.find('.infor');
function showErrorTip(msg,type){
	$Infor.html(msg);
	$errTip.slideDown();
	var timer = setTimeout(function(){
		type == 1 ? window.location.href = '/': $errTip.fadeOut();
		clearTimeout(timer);
	},4000)
};
module.exports = showErrorTip;
