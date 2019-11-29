/*院校状态开始*/
var scLen = $('.school_edu').find('li');
showHide();
function showHide(){
	for(var i = 0; i < scLen.length; i++){
		if(i < 9){
			scLen[i].style.display='block';
		}else{
			scLen[i].style.display='none';
		}
	}
}
$('.school_btn').on('click',function(){
	if($(this).html() == '查看更多'){
		$('.school_edu li').slideDown();;
		$(this).html('收起更多');
	}else{
		showHide();
		$(this).html('查看更多');
	}
	
})
/*院校状态结束*/