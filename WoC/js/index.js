//想删除的测试数据
var slide_image = document.getElementById("slideImage");
var slide_right = document.getElementById("rightChange");
var slide_left = document.getElementById("leftChange");
var slide_a = document.getElementById("slideUrl");
var Aurl = "a/report.html";
var Burl = "https://www.bilibili.com/video/BV1wi4y1973z";
var Curl = "https://www.bilibili.com/video/BV1Lr4y1Y78n";
var ATitle = "天气预报";
var BTitle = "新春会";
var CTitle = "芳~芳~芳~";

//添加执行的函数
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    } else {
        window.onload=function(){
            oldonload();
            func();
        }
    }
}

//移动函数 
//失败
function move(final_xpos,step,interval){
    var xpos = parseInt(slide_image.style.left);
    if(xpos == final_xpos)
        return true;
    if(xpos > final_xpos)
        xpos -= step;
    if(xpos < final_xpos)
        xpos += step;
    slide_image.style.left = xpos + "px";   
    var repeat = "move(" + final_xpos + "," + interval + "," + step + ")";
    movement = setTimeout(repeat,interval);
}


//转换函数
function Uno(final_xpos,url_text,title_text){
    //move(final_xpos,3,1);
    slide_image.style.left = final_xpos + "px";
    slide_a.setAttribute("href",url_text);
    slide_a.setAttribute("title",title_text);
}

//总函数
function main(){
    slide_right.onclick = function moveImageRight(){
        var xpos = parseInt(slide_image.style.left);
        if(xpos == 0){
            Uno(-900,Burl,BTitle);
        }else if(xpos == -900){
            Uno(-1800,Curl,CTitle);
        }else{
            Uno(0,Aurl,ATitle);
        }
    }
    slide_left.onclick = function moveImageLeft(){
        var xpos = parseInt(slide_image.style.left);
        if(xpos == 0){
            Uno(-1800,Curl,CTitle);
        }else if(xpos == -1800){
            Uno(-900,Burl,BTitle);
        }else{
            Uno(0,Aurl,ATitle);
        }
    } 
}
addLoadEvent(main);
