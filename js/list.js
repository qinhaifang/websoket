/**
 * Created by Administrator on 2020/5/16 0016.
 */
/**
 * Created by Administrator on 2020/5/15 0015.
 */
var ipStr = 'http://192.168.0.34:8081'
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
$(document).click(function(e) { // 在页面任意位置点击而触发此事件
  if($(e.target).attr('class') === "layui-tree-txt"){ // 防止因为点击展开按钮把已选中的样式取消
    $(".layui-tree-txt").removeClass("tree-txt-active"); // 移除点击样式
    $(e.target).addClass("tree-txt-active"); // e.target表示被点击的目标
  }
});
var sendData = {
  //meikuang:$('select[lay-filter=meikuang]').val(),
  yujing: $('select[lay-filter=sensor]').val(),
  //baojing:$('select[lay-filter=baojing]').val(),
  //date:$('#date').val(),

}
layui.use(["tree", "util","table","laydate","form"], function() {
  var tree = layui.tree
      , layer = layui.layer
      , util = layui.util,
      table = layui.table,
      laydate = layui.laydate
      form = layui.form
  //模拟数据
      ,data = [{
        title: '查询'
        ,id: 1
        ,field: 'name1'
        ,spread: true
        ,children: [{
          title: '模拟量'
          ,type:1
          ,id: 3
        },{
          title: '开关量'
          ,id: 4
          ,type:2
        }]
      }]
  //基本演示
  tree.render({
    elem: '#tree'
    ,data: data

    ,click: function(obj){
      var type = obj.data.type;  //获取当前点击的节点数据
      table.reload('tableData2', {
        where: {
          type: JSON.stringify(type) + ''
        }
      })
      sessionStorage.setItem('type',type)
    }
  });
  //http://192.168.0.34:8081/safe_pc/getSwitchingHistory?type=2&transType=2&startTime=&endTime=&curPage=1pageSize=10
  $('.layui-tree-txt').eq(1).addClass('tree-txt-active');
  table.render({
    elem: '#tableData2'
    ,height:window.innerHeight-136
    ,url:ipStr+'/safe_pc/getSwitchingHistory'
    ,first: true //首次渲染表格
    ,cols: [[
      {field:'', width:60,type:'numbers',title: '序号'}
      ,{field:'point',  title: '地点',width:''}
      ,{field:'TypeName', title: '类型',width:200,align:'center'}
      ,{field:'_value', title: '值',width:100,align:'center'}
      //,{field:'ssMinValue', width:60, title: '单位',align:'center'}
      ,{field:'_states', title: '状态' ,width:100,align:'center'}
      ,{field:'_time', title: '时间',width:200,align:'center'}
    ]]
    ,where: {
      curr:1,
      type:'1',
      transType:'',
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
    ,page: {
      limit:20,
      limits:[20,40,60,80,100]
    }
    ,loading: true
  });
  laydate.render({
    elem: '#date'
    ,type: 'datetime'
    ,range: true,
    done:function(value,date,enddate){
      console.log(value)
      //table.reload('tableData2', {
      //  page: {
      //    curr: 1
      //  },
      //  where: {
      //    date: value
      //  }
      //});
    }
  });
  form.on('select(sensor)', function(data){
    //if(data.value == 1){
    //  $("#searchSessionNum").attr("disabled","true");
    //  form.render('select');
    //}else{
    //  $("#searchSessionNum").removeAttr("disabled");
    //  form.render('select');//select是固定写法 不是选择器
    //}
  })
})
getYujing()
function getYujing(){
  $.ajax({
    url: ipStr +  '/safe_pc/typeData',
    type: 'GET',
    contentType: 'application/json;charset=utf-8',
    dataType: 'json',
    data: '',
    success: function (response) {
      var data = response.data.list;
      var option = '';
      if(response.code == 200){
        $.each(data,function(n,value){
          option += '<option value="'+value.id+'">'+value.name+'</option>'
        })

        $('select[lay-filter=sensor]').append(option);
        layui.form.render("select");
      }else{
        layer.msg(data.msg)
      }

    },
    error: function (response) {

    }
  })
}
//getBaojing()
//function getBaojing(){
//  $.ajax({
//    url: ipStr +  '/safe_pc/typeData',
//    type: 'GET',
//    contentType: 'application/json;charset=utf-8',
//    dataType: 'json',
//    data: '',
//    success: function (response) {
//      var data = response.data.list;
//      var option = '';
//      if(response.code == 200){
//        $.each(data,function(n,value){
//          option += '<option value="'+value.id+'">'+value.name+'</option>'
//        })
//
//        $('select[lay-filter=baojing]').append(option);
//        layui.form.render("select");
//      }else{
//        layer.msg(data.msg)
//      }
//
//    },
//    error: function (response) {
//
//    }
//  })
//}
//getMeikuang()
//function getMeikuang(){
//  $.ajax({
//    url: ipStr +  '/safe_pc/typeData',
//    type: 'GET',
//    contentType: 'application/json;charset=utf-8',
//    dataType: 'json',
//    data: '',
//    success: function (response) {
//      var data = response.data.list;
//      var option = '';
//      if(response.code == 200){
//        $.each(data,function(n,value){
//          option += '<option value="'+value.id+'">'+value.name+'</option>'
//        })
//
//        $('select[lay-filter=meikuang]').append(option);
//        layui.form.render("select");
//      }else{
//        layer.msg(data.msg)
//      }
//
//    },
//    error: function (response) {
//
//    }
//  })
//}
var searchBtn = function searchBtn(){
  layui.use(["table"], function() {
    var table = layui.table;
    table.reload('tableData2', {
      page: {
        curr: 1
      },
      where: {
        type:sessionStorage.getItem('type'),
        transType: $('select[lay-filter=sensor]').val(),
        startTime:$('#date').val().split(' - ')[0],
        endTime:$('#date').val().split(' - ')[1]
      }
    });
  })

}