//api的调用以及主要功能
function main(value){
fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + value
        +"/next7days?unitGroup=metric&key=6SWKDF9B4ZAQY6XXR2JU46AZT&contentType=json", {
    method: 'GET', 
    headers: {
    },      
  }).then(response => {
    if (!response.ok) {
      throw response; 
    }         
    return response.json(); 
  
  }).then(response => {
    processWeatherData(response);
  }).catch((errorResponse) => {
    if (errorResponse.text) {
      errorResponse.text().then( errorMessage => {
      })
    } else {
      console.log("乃不是地址输错了？")
    } 
  });
  //对获取数据的处理
  function processWeatherData(response) {
    var location=response.resolvedAddress;
    var days=response.days;
    //向页面内设置数据的函数 懒得动脑子了，就一股脑写了。
    function setData(){
      //这是关于温度的
      DelAddNode("maxTempData",days[0].tempmax);
      DelAddNode("minTempData",days[0].tempmin);
      //关于气温的这个其实想根据时间（datetime）分夏冬两部分，但咕了。
      if(days[0].tempmax <= 13) {
        DelAddNode("tempWarn","天冷，不如宅家吧");
        document.getElementById("maxTempData").setAttribute("title","天冷，不如呆在家吧");
        document.getElementById("minTempData").setAttribute("title","天冷，不如呆在家吧");
        }
      else{if(days[0].tempmax <= 18) {
          DelAddNode("tempWarn","天凉，外出记得添衣");
          document.getElementById("maxTempData").setAttribute("title","天有点凉，出门记得舔衣");
          document.getElementById("minTempData").setAttribute("title","天有点凉，出门记得舔衣");
          }
        else{if(days[0].tempmax <= 30){
            DelAddNode("tempWarn","温度不错，出去转转吧，脱衣小心着凉");
            document.getElementById("maxTempData").setAttribute("title","温度不错，出去转转吧!");
            document.getElementById("minTempData").setAttribute("title","温度不错，出去转转吧!");

            }
          else{if(days[0].tempmax <= 35) {
            DelAddNode("tempWarn","天有点热，小心不要中暑");
            document.getElementById("maxTempData").setAttribute("title","天有点热,小心哦");
            document.getElementById("minTempData").setAttribute("title","天有点热,小心哦");
            }
            else{
              DelAddNode("tempWarn","太热了，呆在家里吹空调吧");
              document.getElementById("maxTempData").setAttribute("title","太热了，赶快避暑!");
              document.getElementById("minTempData").setAttribute("title","太热了，赶快避暑!");
              }}}}

      //这是关于湿度的
      DelAddNode("humData",days[0].humidity);
      if(days[0].humidity >= 80) {
            DelAddNode("humWarn","这天气，人呆久了也会发霉吧");
            document.getElementById("humData").setAttribute("title","太潮湿了");
            }
        else{if(days[0].humidity >= 60){
          DelAddNode("humWarn","记得把衣服放到干燥的地方");
              document.getElementById("humData").setAttribute("title","有点潮湿");
              }
          else{if(days[0].humidity >= 40) {
            DelAddNode("humWarn","刚刚好的湿度");
                document.getElementById("humData").setAttribute("title","潮湿均衡");
                }
            else{if(days[0].humidity >= 20) {
              DelAddNode("humWarn","出门注意保湿");
                  document.getElementById("humData").setAttribute("title","有点干旱");
                  }
              else{if(days[0].humidity >= 1) {
                DelAddNode("humWarn","多补水，呆久了皮肤会干裂");
                    document.getElementById("humData").setAttribute("title","太干旱了");
                    }
                else{
                  DelAddNode("humWarn","这种情况真的存在吗");
                      document.getElementById("humData").setAttribute("title","这种情况真的存在吗");
                      }}}}}
            
      //这是关于风速的
      DelAddNode("winSpeedData",days[0].windspeed);
      if(days[0].windspeed <= 1){
            document.getElementById("winSpeedData").setAttribute("title","无风")
            }
        else { if(days[0].windspeed <= 30) {
              document.getElementById("winSpeedData").setAttribute("title","微风习习")
              }
          else { if(days[0].windspeed <= 45) {
                document.getElementById("winSpeedData").setAttribute("title","风有点大")
                }
            else {if(days[0].windspeed <= 70) {
                  document.getElementById("winSpeedData").setAttribute("title","风太大了，外出要小心")
                  }
                else{if(days[0].windspeed > 70) {
                    document.getElementById("winSpeedData").setAttribute("title","快去避难!")
                    }
                  else{
                      document.getElementById("winSpeedData").setAttribute("title","无数据")
                      }}}}}
      
      //这是关于能见度的
      if(days[0].visibility >= 20) {
            view = 3;
            DelAddNode("viewWarn","能见度清晰，出行注意安全");
            document.getElementById("viewData").setAttribute("title","好");
            } 
      else{if(days[0].visibility >= 10) {
              view = 2;
              DelAddNode("viewWarn","能见度良好，出行注意安全");
              document.getElementById("viewData").setAttribute("title","还不错");
              }
        else{if(days[0].visibility >= 1) {
              view = 1;
              DelAddNode("viewWarn","能见度较差，出行注意安全");
              document.getElementById("viewData").setAttribute("title","不太行");
              }
        else {
              view = 0;
              DelAddNode("viewWarn","能见度太差了，尽量不要出门为好");
              document.getElementById("viewData").setAttribute("title","太差了");
              }}}
      DelAddNode("viewData",view);
      //这是关于当前的天气图标的
      var text_icon = document.createTextNode("");
      if(days[0].icon == "clear-day"){
              DelAddNode("weaWarn","大好天气，晒晒被子吧");
              document.getElementById("NowWeather").style.backgroundImage="url(../images/sunny.png)";
              document.getElementById("NowWeather").setAttribute("title","今天晴天哦!");
              }
      else{if(days[0].icon == "partly-cloudy-day") {
                DelAddNode("weaWarn","出去锻炼应该是个不错的选择");
                document.getElementById("NowWeather").style.backgroundImage="url(../images/harf_sunny.png)";
                document.getElementById("NowWeather").setAttribute("title","过一会天就会放晴了吧?");
                }
        else{if(days[0].icon == "cloudy") {
                  DelAddNode("weaWarn","很难见到太阳的一天");
                  document.getElementById("NowWeather").style.backgroundImage="url(../images/cloudy.png)";
                  document.getElementById("NowWeather").setAttribute("title","见不到太阳，不知道会不会下雨呢？");
                  

                  }
          else {if(days[0].icon == "rain") {
                    DelAddNode("weaWarn","要下雨了，记得收衣服");
                    document.getElementById("NowWeather").style.backgroundImage="url(../images/rain.png)";
                    document.getElementById("NowWeather").setAttribute("title","要下雨了哎，外出别忘记带伞。");
                    }
            else{if(days[0].icon == "snow"){
                      DelAddNode("weaWarn","是下雪天，之后可以去堆个雪人");
                      document.getElementById("NowWeather").style.backgroundImage="url(../images/snowy.png)";
                      document.getElementById("NowWeather").setAttribute("title","要下雪了哦，之后去堆雪人吧!");

                      }
              else{
                        DelAddNode("weaWarn","是无法判断的天气啊");
                        document.getElementById("NowWeather").style.backgroundImage="url(../images/sunny.png)";
                        document.getElementById("NowWeather").setAttribute("title","今天应该会晴天的吧？");
                        document.getElementById("weaWarn").appendChild(document.createTextNode("是无法判断的天气啊"));
                        }}}}}

      //这里是关于后续的天气的
      for(var i = 1;i <= 5;i++)
      {  
        var txt = "FuCell"+i;
        var minTemp = txt + "_min";
        var maxTemp = txt + "_max";
        var dayTime = txt + "_day";
        //天气图片
        if(days[i].icon == "clear-day"){
        document.getElementById(txt).style.backgroundImage="url(../images/sunny_s.png)";
        document.getElementById(txt).setAttribute("title","晴天");
        }
        else{if(days[i].icon == "partly-cloudy-day") {
          document.getElementById(txt).style.backgroundImage="url(../images/harf_sunny_s.png)";
          document.getElementById(txt).setAttribute("title","多云转晴");
          }
          else{if(days[i].icon == "cloudy") {
            document.getElementById(txt).style.backgroundImage="url(../images/cloudy_s.png)";
            document.getElementById(txt).setAttribute("title","多云");
            }
            else {if(days[i].icon == "rain") {
              document.getElementById(txt).style.backgroundImage="url(../images/rain_s.png)";
              document.getElementById(txt).setAttribute("title","雨");
              }
              else{if(days[i].icon == "snow"){
                document.getElementById(txt).style.backgroundImage="url(../images/snowy_s.png)";
                document.getElementById(txt).setAttribute("title","雪");
                }
                else{
                  document.getElementById(txt).style.backgroundImage="url(../images/sunny_s.png)";
                  document.getElementById(txt).setAttribute("title","未知");
                  }}}}}
        //最高和最低温度
        DelAddNode(minTemp,days[i].tempmin);
        DelAddNode(maxTemp,days[i].tempmax);
        DelAddNode(dayTime,days[i].datetime.split("-")[2]);
    }
  }
  //删除和添加（文本）节点的函数
  function DelAddNode(NodeName,NodeTxt){
    var  n = document.getElementById(NodeName).childNodes.length;   
    for  (  var  i = 0; i < n; i++) {   
    document.getElementById( NodeName ).removeChild(document.getElementById(NodeName).firstChild);
    }
    document.getElementById(NodeName).appendChild(document.createTextNode(NodeTxt));
  }
  //调用
  setData();
  console.log(days[0].datetime);//日期
  console.log("Location: "+location);//当前城市
  console.log(days[0].icon)//天气

}
} //main 函数的结尾

//获取拼音的函数，但是内含空格
function getPinyin(value)
    {
        var result = pinyinUtil.getPinyin(value, ' ', false, true);
        var html = result;//html是得到的拼音
        if(result instanceof Array)
        {
            html = '<ol>';
            result.forEach(function(val)
            {
                html += '<li>'+val+'</li>';
            });
            html += '</ol>';
        }
    return html;
    } //getPinyin 函数的结尾

//将拆分后获取的拼音合并，得到部分城市名的英文
function pinjie(txt){
  var txt2 = txt.split(" ");
  var str ="";
  for(i=0;i<txt2.length;i++){
    str += txt2[i];
  }
  return str;
} //pinjie 函数的结尾


//初始化
main("nanjing");

//以下为实现查询功能的函数
function getWeather(){
  var value = document.getElementById("area").value;
  value = getPinyin(value);
  value = pinjie(value);
  console.log(value);
  main(value);
}

//创建的点击事件侦察
document.getElementById("click").addEventListener("click",getWeather);
