var demoset = '';
var demoset1 = '';
function list(){
	/*上下滚动效果--开始*/
		 if(demoset){
			clearInterval(demoset)
		 }
		 
		 if(demoset1){
		 	clearInterval(demoset1)
		 }
		 var demo=document.getElementById("demo");
		 var demo2=document.getElementById("demo2");
		 var demo1=document.getElementById("demo1");
	
		 demo2.innerHTML = '';
		 demo2.innerHTML=demo1.innerHTML
		 function Marquee(){
		  if(demo.scrollTop>=demo1.offsetHeight){
		   demo.scrollTop=0;
		  }else{
		   demo.scrollTop=demo.scrollTop+1;
		  }
		 }
		 
		 demoset = setInterval(Marquee,40)
		  var dem=document.getElementById("dem");
		  var dem2=document.getElementById("dem2");
		  var dem1=document.getElementById("dem1");

		  dem2.innerHTML=dem1.innerHTML
		  function Marquee1(){
		   if(dem.scrollTop>=dem1.offsetHeight){
		    dem.scrollTop=0;
		   }
		   else{
		    dem.scrollTop=dem.scrollTop+1;
		   }
		  }
		  demoset1 = setInterval(Marquee1,40)
		/*上下滚动效果--开始*/
}
module.exports = list;