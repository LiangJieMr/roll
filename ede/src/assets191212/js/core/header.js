var $logoutSpan = $('.logout span');
$('body').on('click',function(event){
	if(!$(event.target).data('click')){
		$logoutSpan.slideUp();
	}
});