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