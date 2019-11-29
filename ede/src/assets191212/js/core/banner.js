var list = require('./winners.js');
var showErrorTip = require('./errorTip.js');
var comEorror = require('./warmTip.js');
var winBox = require('./winPlayBox.js');
require('./open.js')
var api = {
	time : '/api/activity/acTime',
	winners: '/api/activity/winnerList',
	address1: '/api/activity/addPrizeBase',
	myprize: '/api/activity/myPrize',
	delever: '/api/activity/deliver',
	giftlist: '/api/activity/giftList',
	commonprize: '/api/activity/commonprize'
}
var curTime =  '';
var endTime = '';
var startTime = '';
var forTimeSet = '';
var acTimeSet = '';
var step = '';
var anma = '';
var flag = true;
/*获取我的奖品开始*/
function getMyPrize(){
	var myPrizeData = {
		user_sign : $.getStorage('infor')['user_sign'],
		ac_id: 22
	}
	$.sendReq(api.myprize,'POST',myPrizeData,function(res){
		let {code,data,msg} = res;
		if(code == 0){
			$('.myprize_name').html('');
			$('.myprize_con').html('');
			$('.myprize_img').attr({'class':'myprize_img','src':''});
			$('.myname').html('');
			$('.myphone').html('');
			$('.myprize_add').html('');
			if(data.length == 0){
				$('.myprize').hide();
				$('.activity_rollpo').html('GO');
			}else{
				$('.myprize').show();
				if(data[0]['prize_degree'] == 1){
					$('.myprize_name').html('特等奖：');
					$('.myprize_con').html('kindle电子书（价值999元）');
					$('.myprize_img').attr({'class':'myprize_img topgrade','src':'./assets191212/img/topgrade.png'})
				}else if(data[0]['prize_degree'] == 2){
					$('.myprize_name').html('一等奖：');
					$('.myprize_con').html('美的扫地机器人（价值699元）');
					$('.myprize_img').attr({'class':'myprize_img prize1','src':'./assets191212/img/prize1.png'})
				}else if(data[0]['prize_degree'] == 3){
					$('.myprize_name').html('二等奖：');
					$('.myprize_con').html('限量版奥鹏双肩包（价值299元）');
					$('.myprize_img').attr({'class':'myprize_img prize2','src':'./assets191212/img/prize3.png'})
				}else if(data[0]['prize_degree'] == 4){
					$('.myprize_name').html('三等奖：');
					$('.myprize_con').html('奥鹏大礼包（内含奥鹏定制笔记本一个，价值129元）');
					$('.myprize_img').attr({'class':'myprize_img prize3','src':'./assets191212/img/prize3.png'})
				}
				$('.myname').html('姓名：' + data[0]["address_name"]);
				$('.myphone').html('电话：' + data[0]["phone"]);
				$('.myprize_add').html('收货地址：' + data[0]["address"]);
				$.setStorage('scene_id',data[0]["scene_id"]);
				//收货信息按钮内容修改
				if($('.myprize_add').html() == '收货地址：'){
					$('.changeaddress').html('填写收货信息')
				}else{
					$('.changeaddress').html('修改收货信息')
					//获取收货信息
					isDelivery(data[0]["address_name"],data[0]["phone"],data[0]["address"],data[0]["scene_id"]);
				}
				//抽奖按钮内容修改
				$('.activity_rollpointer').unbind("click").attr('href','#myprize'); //移除click
				$('.activity_rollpo').html('<p>查看</p><p>奖品</p>');	
			}
		}else{
			$('.myprize').hide();
			showErrorTip(msg)
		}
	})
}
/*获取我的奖品结束*/

/*获取奖品列表开始*/
function getGiftList(){
	$.sendReq(api.giftlist,'GET',{ac_id: 22},function(res){
		let {code,data,msg} = res;
		if(code == 0){
			$('.special').html('');
			$('.prize1li').html('');
			$('.prize2li').html('');
			$('.prize3li').html('');
			for(let key in data){
				if(data[key]['prize_degree'] == 1){
					var str = `<span>${data[0]['prize_quota']}名</span><b>特等奖：kindle电子书（价值999元）</b>`;
					$('.special_img').attr('src','./assets191212/img/topgrade.png');
					$('.special').append(str);
				}else if(data[key]['prize_degree'] == 2){
					var str1 = `<div class="prize1">
									<img class="prize1li_img" src alt="">
								</div>
								<div class="prizeset_top_int">
									<span>${data[1]['prize_quota']}名</span><b>一等奖：</b>
								</div>
								<p>美的扫地机器人</p>
								<p>（价值699元）</p>`;
					$('.prize1li').append(str1);
					$('.prize1li_img').attr('src','./assets191212/img/prize1.png');
				}else if(data[key]['prize_degree'] == 3){
					var str2 = `<div class="prize2">
									<img class="prize2li_img" src alt="">
								</div>
								<div class="prizeset_top_int">
									<span>${data[2]['prize_quota']}名</span><b>二等奖：</b>
								</div>
								<p>限量版奥鹏双肩包</p>
								<p>（价值299元）</p>`;
					$('.prize2li').append(str2);
					$('.prize2li_img').attr('src','./assets191212/img/prize2.png');
				}else if(data[key]['prize_degree'] == 4){
					var str3 = `<div class="prize1">
									<img class="prize3li_img" src alt="">
								</div>
								<div class="prizeset_top_int">
									<span>${data[3]['prize_quota']}名</span><b>三等奖：</b>
								</div>
								<p>奥鹏大礼包（内含奥鹏定制</p>
								<p>笔记本一个，价值129元）</p>`;
					$('.prize3li').append(str3);
					$('.prize3li_img').attr('src','./assets191212/img/prize3.png');
				}
			}
		}else{
			showErrorTip(msg)
		}
	})
}
/*获取奖品列表结束*/

/*判断奖品是否发货开始*/
function isDelivery(N,P,A,S){
	var isData = {
		user_sign : $.getStorage('infor')['user_sign'] || '',
		name : N,
		phone : P,
		address: A,
		scene_id: S
	}
	$.sendReq(api.address1,'POST',isData,function(res){
		let {code,data,msg} = res;
		if(code == 648){
			$('.changeaddress').hide()
		}else if(code == 0){
			$('.changeaddress').show()
		}else{
			$('.changeaddress').show()
			showErrorTip(msg)
		}
	})
}
/*判断奖品是否发货结束*/

/*填写收货地址开始*/
$('.register').on('click',function(){
	$('.playbox').hide();
	$('.form-first').show();
})
$('.placls').on('click',function(){
	$('.mask').hide();
	$('.playbox').hide();
	actime()
})
/*填写收货地址结束*/

/*收货地址开始*/
$('.changeaddress').on('click',function(){
	$('.form-first').show();
	$('.mask').show();
})
$('.addre').on('click',function(){
	$('.form-first').hide();
	$('.mask').hide();
	actime()
})
$('.submit').on('click',function(){
	var adddata = {
		user_sign : $.getStorage('infor')['user_sign'] || '',
		name : $('.addressname').val(),
		phone :  $('.form-first-phone').val(),
		address : $('.textarea').val(),
		scene_id : $.getStorage('scene_id')
	}
	$.sendReq(api.address1,'POST',adddata,function(res){
		let {code,data,msg} = res;
		if(code == 0){
			actime();
		}else{
			showErrorTip(msg)
		}
	})
	$('.form-first').hide();
	$('.mask').hide();
})
/*收货地址结束*/

/*活动时间开始*/
actime()
function actime(){
	$.sendReq(api.time,'get',{ac_id: 22},function(res){
		let {code,data,msg} = res;
		if(code == 0){
			$("#emilevent").trigger('click');
			curTime = data['now_time'];
			endTime = data['end_time'];
			startTime = data['start_time'];
			step = judgeStep(curTime,startTime,endTime);
			var g= startTime * 1000; //定义一个时间戳变量
			var d=new Date(g);
			var h= endTime * 1000; //定义一个时间戳变量
			var j=new Date(h);
			$('.activity-time span').html('活动时间：' + formatDate(d)+' - '+formatDate(j))
			$('.count-down').html('');
			if(step == 1){ //进行中
				var bannTime = timePoor(curTime,endTime);
				var strTime = `<p class="count-down-t">距活动结束还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${bannTime[2]}</span>分<span class="time s">${bannTime[3]}</span>秒`;
				$('.count-down').append(strTime)
				forTime(bannTime,step)
			}else if(step == 0){//未开始
				var bannTime = timePoor(curTime,startTime);
				var strTime = `<p class="count-down-t">距活动开始还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${bannTime[2]}</span>分<span class="time s">${bannTime[3]}</span>秒`;
				$('.count-down').append(strTime)
				forTime(bannTime,step)
			}else{//已结束
				var strTime = `<p class="count-down-t">活动已结束:</p><span class="time d">00</span>天<span class="time h">00</span>时<span class="time m">00</span>分<span class="time m">00</span>秒`;
				$('.count-down').append(strTime);
			}
			
			//用户登录成功之后请求的接口
			if($.getStorage('infor') && step != 0){
				getMyPrize(); //获取我的奖品
			}else if(!$.getStorage('infor')){//更新退出登录后状态
				$('.myprize_name').html('');
				$('.myprize_con').html('');
				$('.myprize_img').attr({'class':'myprize_img','src':''});
				$('.myname').html('');
				$('.myphone').html('');
				$('.myprize_add').html('');
				$('.myprize').hide();
				$('.activity_rollpo').html('GO');
				$('.activity_rollpointer').on('click',()=>{
					if(!$.getStorage('infor')){
						showErrorTip('暂未登录');
						$('.login-container').show();
						$('#emilevent').off('click');
						$('#emilevent').one('click',function(){
							roll(step)
						})
					}else if($.getStorage('infor')){
						roll(step)
					}
				})
			};
			winner(step)
			getGiftList()
		}else{
			showErrorTip(msg)
		}
	});
	if(acTimeSet){
		clearInterval(acTimeSet)
	}
	acTimeSet =setInterval(function(){
		actime()
	},1000 * 60)
}
/*活动时间结束*/

/*活动时间以秒倒计时开始*/
function forTime(bannTime,step){
	if(forTimeSet){
		clearInterval(forTimeSet);
	}
	forTimeSet = setInterval(function(){
		bannTime[3]--;
		if(bannTime[3] == -1){
			bannTime[2]--;
			bannTime[3] = 59
		}
		if(step == 1){
			var strTime = `<p class="count-down-t">距活动结束还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${pad(bannTime[2])}</span>分<span class="time s">${pad(bannTime[3])}</span>秒`;
		}else if(step == 0){
			var strTime = `<p class="count-down-t">距活动开始还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${pad(bannTime[2])}</span>分<span class="time s">${pad(bannTime[3])}</span>秒`;
		}
		$('.count-down').html(strTime);
	},1000)
}
/*活动时间以秒倒计时结束*/

//获奖名单
function winner(step){
	$.sendReq(api.winners,'get',{ac_id: 22},function(res){
		let {code,data,msg} = res;
		if(code == 0){
			$('#demo1').html('');
			$('#dem1').html('');
			for(let key in data['list']){
				var phone = data['list'][key]['phone'];
				var price = data['list'][key]['prize_grade'];
				if(step == 0){
					var str = `<p>暂未揭晓</p>`
					$('.winners_demo').html(str)
				}else if(step == 1){
					var str = `<li><span class="list_phone">${phone}</span><span class="list_text">获得${price}</span></li>`
					$('#demo1').append(str)
					$('#dem1').prepend(str)
					list();
				}
			}
		}else{
			showErrorTip(msg)
		}
	})
}
/*抽奖*/
$('.activity_rollpointer').on('click',()=>{
	if(!$.getStorage('infor')){
		showErrorTip('暂未登录');
		$('.login-container').show();
		$('#emilevent').off('click');
		$('#emilevent').one('click',function(){
			roll(step)
		})
	}else if($.getStorage('infor')){
		roll(step)
	}
})
//随机数
var mathRandomTwo= Math.floor(Math.random()*2);
var mathRandomThree = Math.floor(Math.random()*3)
function mathRan(num1,num2){
	return Math.floor(Math.random()*(num2-num1)+num1);
}
//抽奖
function roll(step){
	if(!flag){
		return false;
	}
	flag = false;
	let comData = {
		user_sign : $.getStorage('infor')['user_sign'],
		ac_id : 22,
		platform : 2
	}
	$.sendReq(api.commonprize,'POST',comData,function(res){
		let {code,data,msg} = res;
		var prize;
		if(code == 0){
			//几等奖
			switch(data['prize_degree']) {
				case 1: prize = 1;break;
				case 2: prize = [4,9][mathRandomTwo];break;
				case 3: prize = [3,6][mathRandomTwo];break;
				case 4: prize = [2,5,8][mathRandomThree];break;
				default: prize = 7;break;
			}
			$.setStorage('scene_id',data["scene_id"]);
			acRoll(prize,flag)
		}else if(code != 0){
			comEorror(msg,6);
			flag = true;
		}
	})
}
//抽奖礼包
function acRoll(angle){
	console.log(angle)
	var prizeAngle = {};
	if(angle == 1){
		prizeAngle['name']= '特等奖';
		prizeAngle['intro']= 'kindle电子书 一份';
		anma = [mathRan(342,359),mathRan(2,19)];
		angle = anma[mathRandomTwo];
	}else if(angle == 4 || angle == 9){	
		prizeAngle['name']= '一等奖';
		prizeAngle['intro']= '美的扫地机器人 一份';
		anma = [mathRan(222,259),mathRan(22,59)];
		angle = anma[mathRandomTwo];
	}else if(angle == 3 || angle == 6){
		prizeAngle['name']= '二等奖';
		prizeAngle['intro']= '限量版奥鹏双肩包 一份';
		anma = [mathRan(262,299),mathRan(142,179)];
		angle = anma[mathRandomTwo];
	}else if(angle == 2 || angle == 5 || angle == 8){
		prizeAngle['name']= '三等奖';
		prizeAngle['intro']= '奥鹏大礼包 一份';
		anma = [mathRan(302,339),mathRan(182,219),mathRan(62,99)];
		angle = anma[mathRandomThree];
	}else if(angle == 7){
		prizeAngle = '';
		angle = mathRan(102,139)
	}
	$(".activity_rollprizeimg").rotate({//旋转
	    angle: 90, //角度
	    duration: 7000, //持续时间
	    animateTo: angle + 3600, //angle是图片上各奖项对应的角度，2160是我要让指针旋转6圈。所以最后的结束的角度就是这样子^^
	    callback: function () {
			winBox(prizeAngle)
			flag = true;
	    }
	});
}
//判断活动时间
function judgeStep(timeStamp,start_time,end_time){
	const timeArr = [start_time,end_time];
	return timeArr.filter((item)=>item <= timeStamp).length;
};
//转换活动日期
function formatDate(now) { 
	var year=now.getFullYear();  //取得4位数的年份
	var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
	var date=now.getDate();      //返回日期月份中的天数（1到31）
	var hour=now.getHours();     //返回日期中的小时数（0到23）
	var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
	var second=now.getSeconds(); //返回日期中的秒数（0到59）
	return year+'.'+month+"."+date; 
} 
// 时间差函数
function timePoor(curTime,endTime){
	var begin = curTime + '000';
	var end = endTime + '000'
	//时间相差毫秒数
	var span = parseInt(end) - parseInt(begin);
	//计算相差天数
	var result = [];
	var days = Math.floor(span / (24 * 3600 * 1000));
	result[0] = days;
	//相差小时数
	var leave1 = span % (24 * 3600 * 1000);
	var hours = Math.floor(leave1 / (3600 * 1000))
	result[1] = pad(hours);
	//相差分钟
	var leave2 = leave1 % (3600 * 1000)
	var minutes = Math.floor(leave2 / (60 * 1000));
	result[2] = pad(minutes);
	//相差秒
	var level3 = leave2 % (60 * 1000)
	var seconds = Math.round(level3 / 1000);
	result[3] = pad(seconds);
	return result;
}
//补零函数
function pad(num) {
	var long = num.toString().length;
	if(long == 1){
		num = '0'+num
	}else{
		num = num
	}
	return num;
}
/*关闭异常弹框开始*/
$('.suc').on('click',function(){
	$('.success').hide();
	$('.err1').hide();
	$('.err2').hide();
	$('.err3').hide();
	$('.err4').hide();
	$('.err5').hide();
	$('.err6').hide();
	$('.mask').hide();
	// actime();
})
/*关闭异常弹框结束*/
module.exports = actime;