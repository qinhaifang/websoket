/**
 * Created by Administrator on 2020/5/15 0015.
 */
var ipStr = 'http://192.168.0.34:8081';
var ipStrs = '122.112.170.1:8081';
var ipStrs1 = '192.168.0.34:8081';
var flag = false,flags = false;
var height = window.innerHeight - 165;
/*
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 ** xuanfeng 2014-08-28
 */
function randomWord(randomFlag, min, max) {
  var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
var t = null;
t = setTimeout(time, 1000);
function time() {
  clearTimeout(t);
  var nowDate = new Date();
  var year = nowDate.getFullYear();
  var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
  var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
  var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
  var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
  var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
  $("#time") .html( year + "年" + month + "月" + date + "日" +"&nbsp;&nbsp;"+ hour + ":" + minute + ":" + second);
  t = setTimeout(time, 1000);
}
//转换时间
function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + '-';
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}
function dayCha(time,twoTime){
  var CountTime = null;
  time = time.replace(new RegExp("-","gm"),"/");
  var timeMiao=new Date(time).getTime()
  var year=new Date(time).getFullYear()
  var month=new Date(time).getMonth()+1;
  var date=new Date(time).getDate();
  if(twoTime){
    twoTime =twoTime.replace(new RegExp("-","gm"),"/");
    var thatYear=new Date(twoTime).getFullYear();
    var thatTimeMiao=new Date(twoTime).getTime()
  }

  else{
    var thatYear=new Date().getFullYear();
    var thatTimeMiao=new Date().getTime();
  }
  var chaTime=thatTimeMiao-timeMiao;
  var day=parseInt(chaTime/86400000)
  var yu=chaTime % 86400000
  var hour=parseInt(yu/3600000)
  var yuH=yu % 3600000
  var min=parseInt(yuH/60000)
  var yuM=yuH%60000
  var sec=parseInt(yuM/1000)
  var yYear=0
  var yDay=0;
  for(let x=0;x<=thatYear-year;x++){
    var fYear=year+x
    var fTime=new Date(''+fYear+'/'+month+'/'+date+'').getTime();
    var fDay=parseInt((fTime-timeMiao)/86400000)
    if(fDay>0 && fDay<=day){
      yYear=yYear+1;
      yDay=day-fDay
    }
  }

  if (yYear > 0) {
    CountTime = yYear + "年" + yDay + "月" + day + "天" + hour + "小时" + min + "分" + sec + "秒";
  } else if (yDay > 0) {
    CountTime = yDay + "月" + day + "天" + hour + "小时" + min + "分" + sec + "秒";
  } else if (day > 0) {
    CountTime = day + "天" + hour + "小时" + min + "分" + sec + "秒";
  } else if (hour > 0) {
    CountTime = hour + "小时" + min + "分" + sec + "秒";
  } else if (min > 0) {
    CountTime = min + "分" + sec + "秒";
  } else {
    CountTime = sec + "秒";

  }
  return CountTime;
}
layui.use(["tree", "util","table","laydate"], function() {
  var tree = layui.tree
      , layer = layui.layer
      , util = layui.util
      ,table = layui.table
      ,laydate = layui.laydate
      ,data = [{
        title: '安全环境'
        ,id:''
        ,type: 'all'
        ,checked: true
        ,spread: true
        ,children: [{
          title: '安全'
          ,type: 1
          ,id:1
        },{
          title: '人员'
          ,type: 2
          ,id:2
        },{
          title: '设备'
          ,type: 3
          ,id:3
        }]
      },{
        title: '生产环境'
        ,id: 'tab2'
        ,field: ''
        ,disabled:true
        ,spread: false
            ,checked: false
        ,children: [{
        title: '主皮带'
        ,type: 4
        ,field: ''
      ,disabled:true
        },{
          title: '主皮带'
          ,id: 7
          ,field: ''
      ,disabled:true
        },{
          title: '主提升'
          ,id: 8
          ,field: ''
      ,disabled:true
        },{
          title: '压风机'
          ,id: 9
          ,field: ''
      ,disabled:true
        },{
          title: '中央水泵房'
          ,id: 10
          ,field: ''
      ,disabled:true
        },{
          title: '10K变电站'
          ,id: 11
          ,field: ''
      ,disabled:true
        }]
      }]
  //基本演示
  tree.render({
    elem: '#tree'
    ,data: data
    ,showCheckbox: true  //是否显示复选框
    ,accordion:true //开启手风琴模式
    ,isJump: false //是否允许点击节点时弹出新窗口跳转
    ,showLine: true
    ,oncheck: function(obj) {
      var type = [];
      if (obj.data.type == 'all') {
        if (obj.checked) {
          type.push(1, 2, 3)
        } else {
          type.push()
        }
      } else {
        var inputList =$('#tree input:checked');
        $.each(inputList,function(index,item){
          type.push(item.value)
        })
      }
      sessionStorage.setItem('type',JSON.stringify(type))
      table.reload('tableData1', {
        where: {
          type: JSON.stringify(type) + ''
        }
      })
      if(type.indexOf('1') == 1 && type.indexOf('2') == 1){
        $("#staffTable").find("tr.renyuan").show();
        $("#staffTable").find("tr.anquan").show();
      }else if(type.indexOf('1') == 1 && type.indexOf('2') == -1){
        $("#staffTable").find("tr.anquan").show();
        $("#staffTable").find("tr.renyuan").hide();
      }else if(type.indexOf('1') == -1 && type.indexOf('2') == 1){
        $("#staffTable").find("tr.anquan").hide();
        $("#staffTable").find("tr.renyuan").show();
      }
      table.reload('tableData2', {
        where: {
          type: JSON.stringify(type) + '',
          startTime:$('#date').val().split(' - ')[0],
          endTime:$('#date').val().split(' - ')[1]
        }
      })
      console.log('flag',flag,flags)
      if(flags){
        $('.table1').slideUp();
        $('.table2').css('height',height+85+'px').animate({height:height+85},500);
        $('.layui-table-view').css('height',height+24+'px');
        $('.layui-table-main').css('height',height+'px');
      }
      if(flag){
        $('.leftBar').css('width','12%');
        $('.table2').slideUp();
        $('.table1').css('height',height+85+'px').animate({height:height+85},500);
        $('.table1 .stamp-list').css('height',height+'px').animate({height:height},500);
      }

    }
  });
  //table.render({
  //  elem: '#tableData1'
  //  ,url:ipStr+'/safe_pc/getAlarmListInfo'
  //  ,cellMinWidth: 60 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
  //  ,height:'220px'
  //  ,first: true //首次渲染表格
  //  ,cols: [[
  //    {field:'', width:60,fixed:'left',type:'numbers',title: '序号'}
  //    ,{field:'system_name', title: '系统',width:80,align:'center'}
  //    ,{field:'point',  title: '地点',width:''}
  //    ,{field:'TypeName', title: '类型',width:100,align:'center'}
  //    ,{field:'_value', title: '值',width:80,align:'center'}
  //    //,{field:'ssMinValue', width:60, title: '单位',align:'center'}
  //    ,{field:'max_value', title: '最大值' ,width:80,align:'center'}
  //    ,{field:'startTime', title: '开始时间',width:170,align:'center'}
  //    ,{field:'ssAlarmDuration', width:160, title: '持续时长',align:'center'}
  //    ,{field:'max_time', width:170, title: '最大值时刻',align:'center'}
  //  ]]
  //  ,where: {
  //    type:'[1,2,3]'
  //  }
  //  ,parseData: function(res) {
  //    return {
  //      "code":0,
  //      msg:"",
  //      count:res.total,
  //      data:res.rows
  //    }
  //    if (this.first) {
  //      this.first = false;
  //    }
  //  }
  //  ,page: false
  //  ,loading: true
  //});
  table.render({
    elem: '#tableData2'
    ,height:'360'
    ,url:ipStr+'/safe_pc/getAlarmHistoryInfo'
    ,first: true //首次渲染表格
    ,cols: [[
      {field:'', width:60,type:'numbers',title: '序号'}
      ,{field:'system_name', title: '系统',width:80,align:'center'}
      ,{field:'point',  title: '地点',width:''}
      ,{field:'TypeName', title: '类型',width:100,align:'center'}
      ,{field:'_value', title: '值',width:80,align:'center'}
      //,{field:'ssMinValue', width:60, title: '单位',align:'center'}
      ,{field:'max_value', title: '最大值' ,width:80,align:'center'}
      ,{field:'min_value', title: '最小值' ,width:80,align:'center'}
      ,{field:'startTime', title: '开始时间',width:200,align:'center'}
      ,{field:'startTime', title: '结束时间',width:200,align:'center'}
      ,{field:'ssAlarmDuration', width:160, title: '持续时长',align:'center'}
      ,{field:'max_time', width:200, title: '最大值时刻',align:'center'}
      ,{field:'max_time', width:200, title: '最小值时刻',align:'center'}
    ]]
    ,where: {
      type:'[1,2,3]',
      startTime:'',
      endTime:''
    }
    ,parseData: function(res) {
      return {
        "code":0,
        msg:"",
        count:res.total,
        data:res.rows
      }
      if (this.first) {
        this.first = false;
      }
    }
    ,page: false
    ,loading: true
  });
  laydate.render({
    elem: '#date'
    ,type: 'datetime'
    ,range: true,
    done:function(value,date,enddate){
      table.reload('tableData2', {
        where: {
          type:sessionStorage.getItem('type'),
          startTime:value.split(' - ')[0],
          endTime:value.split(' - ')[1]
        }
      });
    }
  });
})
//获取实时数据
getmonitorInfo()
function getmonitorInfo() {
  jQuery.ajax({
    type: "POST",
    async: false,
    url: ipStr+"/safe_pc/getAlarmListInfo",
    data: {
      type:'[1,2,3]'
    },
    success: function (data) {
      var parseData = $.parseJSON(data);
      $("#staffTable").find("tr").remove();
      var tbody = ''
      $.each(parseData.rows, function (i, m) {
        var index = i+1;
        tbody += '<tr class="all">';
        //tbody += '<td>'+index+'</td>';
        tbody += '<td>'+m.system_name+'</td>';
        tbody += '<td class="left">'+m.point+'</td>';
        tbody += '<td>'+m.TypeName+'</td>';
        tbody += '<td>'+m._value+'</td>';
        tbody += '<td>'+m.max_value+'</td>';
        tbody += '<td>'+m.startTime+'</td>';
        tbody += '<td>'+m.ssAlarmDuration+'</td>';
        tbody += '<td>'+m.max_time+'</td>';
        tbody += '</tr>';
      })
      $("#staffTable").append(tbody)
    },
    error: function () {
      top.layer.msg("<span style='color:black'>查询失败!</span> ", {icon: 5, time: 1000});
    }
  });
}
function tableBodyHtml(i,m) {
  var tbody = '';
  tbody += '<tr>';
  tbody += '<td>'+i+1+'</td>';
  tbody += "<td>'"+m['system_name']+"'</td>";
  tbody += '</tr>';
}

//人员websocket接受消息
var wsPerson = new WebSocket("ws://" + ipStrs1 + "/net/websocket/personAlarmResult/" + randomWord(false, 43));
wsPerson.onopen = function (evt) {
  console.log("人员websocket连接成功");
};
wsPerson.onmessage = function (event) {
  if (typeof event.data === String) {
//            console.log("Received data string");
  }
  if (event.data instanceof ArrayBuffer) {
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
  if (event.data != null && event.data != '') {
    var parseData = $.parseJSON(event.data);
    console.log('人员',parseData)
    $("#staffTable").find("tr.all").remove();
    $("#staffTable").find("tr.renyuan").remove();
    var tbody = '';
    if(parseData.length >0){
      tbody += '<tr class="renyuan">';
      tbody += '<td>人员</td>';
      tbody += '<td class="left">-</td>';
      if(parseData[0].psAlarmType == 4){
        tbody += '<td>矿井超员</td>';
      }else if(parseData[0].psAlarmType == 5){
        tbody += '<td>重点区域超员</td>';
      }else{
        tbody += '<td>限制区域有人</td>';
      }
      tbody += '<td>'+parseData.length+'</td>';
      tbody += '<td>-</td>';
      var startTime = timestampToTime(parseData[0].psAlarmStime);
      console.log('startTime',startTime)
      tbody += '<td>'+startTime+'</td>';
      var nowDate = new Date().getTime();
      var timeLength = dayCha(startTime,timestampToTime(nowDate))
      tbody += '<td>'+timeLength+'</td>';
      tbody += '<td>-</td>';
      tbody += '</tr>';
    }
    $("#staffTable").append(tbody)
  }
};

//安全websocket接受消息
var ws = new WebSocket("ws://" + ipStrs + "/net/websocket/mongoAlarmList/" + randomWord(false, 43));
ws.onopen = function (evt) {
  console.log("安全websocket连接成功");
};
ws.onmessage = function (event) {
  if (typeof event.data === String) {
//            console.log("Received data string");
  }
  if (event.data instanceof ArrayBuffer) {
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
  if (event.data != null && event.data != '') {
    var type = sessionStorage.getItem('type');
    var parseData = $.parseJSON(event.data);
    console.log('安全',parseData)
    $("#staffTable").find("tr.all").remove();
    $("#staffTable").find("tr.anquan").remove();
    var tbody = ''
    $.each(parseData, function (i, m) {
      var index = i+1;
      tbody += '<tr class="anquan">';
      //tbody += '<td>'+index+'</td>';
      tbody += '<td>安全</td>';
      tbody += '<td class="left">'+m.ssTransducerPoint+'</td>';
      tbody += '<td>'+m.ssTransducerTypeName+'</td>';
      if(m.inOutType == '1'){
        tbody += '<td>'+m.ssTransducerValue+''+m.company+'</td>';
      }else{
        tbody += '<td>'+m.ssTransducerValue+'</td>';
      }
      tbody += '<td>'+m.ssMaxValue+'</td>';
      tbody += '<td>'+m.ssAlarmStime+'</td>';
      tbody += '<td>'+m.ssAlarmDuration+'</td>';
      tbody += '<td>'+m.ssMaxTime+'</td>';
      tbody += '</tr>';
    })
    if(type.indexOf('1') !== -1 && type.indexOf('2') !== -1){
      $("#staffTable").find("tr.renyuan").show();
      $("#staffTable").find("tr.anquan").show();
      $("#staffTable").append(tbody)
    }else if(type.indexOf('1') !== -1 && type.indexOf('2') == -1){
      $("#staffTable").find("tr.anquan").show();
      $("#staffTable").find("tr.renyuan").hide();
      $("#staffTable").append(tbody)
    }else if(type.indexOf('1') == -1 && type.indexOf('2') !== -1){
      $("#staffTable").find("tr.anquan").hide();
      $("#staffTable").find("tr.renyuan").show();
    }
  }
};


var screen = function screen(type){
  if(type == 1){
    if(flag){
      $('.table2').slideDown();
      //$('.table1').css('height','39%').slideDown();
      $('.leftBar').css('width','17%');
      $('.table1').css('height','39%').animate({height:'39%'},500);
      $('.table1 .stamp-list').css('height','71%').animate({height:'71%'},500);
      flag = false;
    }else{
      $('.leftBar').css('width','12%');
      $('.table2').slideUp();
      $('.table1').css('height',height+85+'px').animate({height:height+85},500);
      $('.table1 .stamp-list').css('height',height+'px').animate({height:height},500);
      flag = true;
    }
  }else{
    if(flags){
      console.log(1)
      $('.table1').slideDown();
      $('.table2').css('height','59%').animate({height:'59%'},500);
      $('.layui-table-main').css('height','319px');
      flags = false;
    }else{
      console.log(2)
      $('.table1').slideUp();
      $('.table2').css('height',height+85+'px').animate({height:height+85},500);
      $('.layui-table-view').css('height',height+24+'px');
      $('.layui-table-main').css('height',height+'px');
      flags = true;
    }
  }
}