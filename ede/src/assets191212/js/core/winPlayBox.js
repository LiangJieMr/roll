function winBox(prizeAngle){
	if(prizeAngle == ''){
		$('.success').show();
		$('.err5').show();
		$('.mask').show();
	}else{
		$('.playbox_h4').html(prizeAngle['name']);
		$('.playbox_p').html(prizeAngle['intro']);
		if(prizeAngle['name'] == '特等奖'){
			$('.playbox_img').attr({'src':'./assets191212/img/topgrade.png','class':'topgrade'})
		}else if(prizeAngle['name'] == '一等奖'){
			$('.playbox_img').attr({'src':'./assets191212/img/prize1.png','class':'prize1'});
		}else if(prizeAngle['name'] == '二等奖'){
			$('.playbox_img').attr({'src':'./assets191212/img/prize2.png','class':'prize2'});
		}else if(prizeAngle['name'] == '三等奖'){
			$('.playbox_img').attr({'src':'./assets191212/img/prize3.png','class':'prize3'});
		}
		$('.txt').html(`恭喜您获得${prizeAngle['name']}，速速填写联系方式，工作人员给您派奖！`);
		$('.activity_rollpointer').unbind("click").attr('href','#myprize'); //移除click
		$('.activity_rollpo').html('<p>查看</p><p>奖品</p>');
		$('.playbox').show();;
		$('.mask').show();
	}
}
module.exports = winBox;