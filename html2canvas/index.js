/**
 * @file: index.js
 * @author: 梁杰
 * @data: 2019/12/19 10:22
 * @Description html2canvas
 */
//获取截屏
var Screenshots = document.querySelector('.Screenshots');
Screenshots.onclick = function () {
    takeScreenshot()
};
// 点击下载
var a = document.querySelector('.a');

// 创建一个canvas
var canvas2 = document.querySelector(".canvas");
let canvasObj = document.querySelector('.test');
var w = parseInt(window.getComputedStyle(canvasObj).width);   //获取目标元素的宽高
var h = parseInt(window.getComputedStyle(canvasObj).height);
//将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
var context = canvas2.getContext("2d");
context.scale(2, 2);
canvas2.width = w;
canvas2.height = h;
canvas2.style.width = w + 'px';
canvas2.style.height = h + 'px';
canvas2.style.transition = "transform 0.3s cubic-bezier(0.42, 0, 0.58, 1) 0s, opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1) 0s, -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1) 0s";


// 完整下载
// html2canvas(document.querySelector('.test'), { canvas: canvas2 }).then(function(canvas) {
//     const a = document.createElement("a");
//     // 文件名
//     a.download = name | 'html2canvas';
//     // 设置 a href 属性
//     a.setAttribute("href", canvas.toDataURL());
//     // 触发 a 点击事件
//     a.click();
//     document.body.appendChild(canvas)
// });
/**
 * 截屏方法
 */
function takeScreenshot(){
    html2canvas(document.querySelector('.test'),{
        canvas: canvas2,
        background: 'red'
    }).then(function (canvas) {
        canvas2.style.display="inline-block";
        var i = 0;
        var timer = setInterval( ()=> {
            i++;
            canvas2.style.transform = `scale(0.${i})`;
            if(i == 8){
                clearInterval(timer)
            }
        },10)
        a.download = name | 'html2canvas';
        a.setAttribute("href", canvas.toDataURL("image/png"));
        document.body.appendChild(canvas)
    })
}
// html2canvas(document.querySelector('.test'),{ canvas: canvas2 }).then(function (canvas) {
 //  var imgData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    // window.location.href= imgData;
    // let image = new Image();
    // image.className = "newImg";
    // image.src = canvas.toDataURL("image/png");

//     // 设置 a href 属性
//     a.download = name | 'html2canvas';
//     a.setAttribute("href", canvas.toDataURL("image/png"));
//     document.body.appendChild(canvas)
    // document.querySelector('.app').appendChild(canvas)
// });

/*html2canvas(canvasObj, {
    onrendered: function (canvas) {
        var url = canvas.toDataURL("image/png");
        window.location.href = url;
    }
});*/
// 文件名称有误
/*
html2canvas(document.querySelector('.test'), {
    onrendered: function(canvas) {
        var url = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");//图片地址
        document.body.appendChild(canvas);
        window.location.href= url;
    },
    width: 300,
    height:
});
*/
