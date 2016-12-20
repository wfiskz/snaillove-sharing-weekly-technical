<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>京东运营支撑系统</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<link rel="stylesheet" type="text/css" href="css/base.css"/>
<link rel="stylesheet" type="text/css" href="css/main.css"/>
<script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
<script src="js/jquery.cookie.js" type="text/javascript"></script>
<script src="js/jquery.treeview.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript" src="js/DatePicker/WdatePicker.js"></script>
<script language="javascript">
var img = new Array() ;
for(i=1;i<6;i++){
img[i]=false;
}
function img_chk(sb){
if(eval("img["+sb+"]")==false){
document.getElementById(sb).src="images/checkbox_hover.png";
eval("img["+sb+"]=true");
}else{
document.getElementById(sb).src="images/checkbox.png";
eval("img["+sb+"]=false");
}
}
</script>
</head>
<body>
<!--header_start--> 
<script type="text/javascript" src="js/header.js"></script> 
<!--header_end-->
<div class="w">
  <div id="warp">
    <div class="content"> 
      <!--left_start-->
      <div class="menu-box rounded fl" id="red">
        <div id="menu-box"> 
          <script type="text/javascript" src="js/menu.js"></script>
          <div class="box">
            <div class="title_1">应用管理<span class="menu1"></span></div>
            <div class="list">
              <ul class="treeview-red">
              	
                <li onclick="" class="opens"><span id="menu_1">二级 1</span>
                  <ul>
                    <li onclick="" class="opens"><span id="menu_1.0">三级 1.0</span>
                      <ul>
                        <li><span id="menu_1.0.0" class="selected">四级 1.0.0</span></li>
                      </ul>
                    </li>
                    <li><span id="menu_1.1">三级 1.1</span></li>
                    <li><span id="menu_1.2">三级 1.2</span>
                      <ul>
                        <li><span id="menu_1.2.0">四级 1.2.0</span>
                        </li>
                        <li><span id="menu_1.2.1">四级 1.2.1</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                
                <li><span id="menu_2">Item 2</span>
                  <ul>
                    <li><span id="menu_2.0">Item 2.0</span>
                      <ul>
                        <li><span id="menu_2.0.0">Item 2.0.0</span></li>
                      </ul>
                    </li>
                    <li><span id="menu_2.1">Item 2.1</span></li>
                    <li><span id="menu_2.2">Item 2.2</span>
                      <ul>
                        <li><span id="menu_2.2.0">Item 2.2.0</span>
                        </li>
                        <li><span id="menu_2.2.1">Item 2.2.1</span>
                          <ul>
                            <li><span id="menu_2.2.1.0">Item 2.2.1.0</span></li>
                          </ul>
                        </li>
                        <li><span id="menu_2.2.2">Item 2.2.2</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                
                <li onclick="" class="opens">
                	<span id="menu_1">数据统计</span>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
      <!--left_end--> 
      <!--right_start-->
      <div class="fr">
        <div class="right-box rounded">
          <div class="form-row">
          	 <label class="label1">搜索类型：</label>
          	<select class="input">
          		 <option selected value="">请选择</option>
               <option value="0">全站总下载</option>
               <option value="1">应用统计</option>
               <option value="2">top统计</option>
            </select>
           
               <label class="label1">商品编号：</label>
               <input id="username" class="input" type="text" name="username" />
               <label class="label1">商品名称：</label>
               <input id="username" class="input" type="text" name="username" />
         </div>
          <div class="form-row">
            <label class="label">时间：</label>
            <input id="d5221" class="Wdate input" type="text" readonly="readonly"
                           onFocus="var d5222=$dp.$('d5222');WdatePicker({onpicked:function(){d5222.focus();},maxDate:'#F{$dp.$D(\'d5222\')}'})"/>
            <span>-</span>
            <input id="d5222" class="Wdate input" type="text" readonly="readonly"
                           onFocus="WdatePicker({minDate:'#F{$dp.$D(\'d5221\')}'})"/>
            <input id="del" class="to-select" type="button" value="查 询">
          </div>
          <div class="form-row">
            
            <!--paging_start-->
            <div class="paging fr">
              <div class="paging-box_1">
                <div class="home fl invisible"></div>
                <div class="prev fl"></div>
                <ul class="fl">
                  <li id="active" class="pg_num fl">1</li>
                  <li class="pg_num fl">2</li>
                  <li class="pg_num fl">3</li>
                  <li class="pg_num fl">4</li>
                  <li class="pg_num fl">5</li>
                  <li class="pg_num fl">6</li>
                  <li class="pg_num fl">7</li>
                  <li class="pg_num fl">8</li>
                  <li class="pg_num fl">9</li>
                  <li class="pg_num fl">10</li>
                </ul>
                <div class="next fl"></div>
                <div class="last fl"></div>
              </div>
            </div>
            <!--paging_end--> 
          </div>
          <div class="tb-box">
            <table class="tb" cellspacing="0" cellpadding="0">
              <tr class="tit-bg">
                <td>选择</td>
                <td>软件图标</td>
                <td>软件名称</td>
                <td>版本</td>
                <td>软件包名</td>
                <td>价格</td>
                <td>性质</td>
                <td>审核状态</td>
                <td>提交时间</td>
                <td>操作</td>
              </tr>
              <tr>
                <td><img id="1" name="chkUpdatePrompt" src="images/checkbox.png" onclick="img_chk(this.id);" /></td>
                <td><img src="images/appimg.png" /></td>
                <td>鳄鱼爱洗澡</td>
                <td>1.22</td>
                <td>com.jd.appstor</td>
                <td>免费</td>
                <td>新发</td>
                <td>通过</td>
                <td>2012-05-23<br />
                  13:00</td>
                <td><a href="#" class="pa red">审核</a><a class="pa" href="#">下载</a></td>
              </tr>
              <tr>
                <td><img id="2" name="chkUpdatePrompt" src="images/checkbox.png" onclick="img_chk(this.id);" /></td>
                <td><img src="images/appimg.png" /></td>
                <td>重力人</td>
                <td>2.0</td>
                <td>com.jd.appstor</td>
                <td><span class="red">2.99</span></td>
                <td>升级</td>
                <td><span class="green">未通过</span></td>
                <td>2012-05-23<br />
                  13:00</td>
                <td><a href="#" class="pa red">审核</a><a class="pa" href="#">下载</a></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </div>
          
          <!--paging_start-->
          <div class="paging fr">
            <div class="paging-box_2">
              <div class="home fl invisible"></div>
              <div class="prev fl"></div>
              <ul class="fl">
                <li id="active" class="pg_num fl">1</li>
                <li class="pg_num fl">2</li>
                <li class="pg_num fl">3</li>
                <li class="pg_num fl">4</li>
                <li class="pg_num fl">5</li>
                <li class="pg_num fl">6</li>
                <li class="pg_num fl">7</li>
                <li class="pg_num fl">8</li>
                <li class="pg_num fl">9</li>
                <li class="pg_num fl">10</li>
              </ul>
              <div class="next fl"></div>
              <div class="last fl"></div>
            </div>
          </div>
          <!--paging_end--> 
        </div>
      </div>
      <!--right_end--> 
    </div>
  </div>
</div>
<!--footer_start--> 
<script type="text/javascript" src="js/footer.js"></script> 
<!--footer_end--> 
<!--footer_end--> 
<script type="text/javascript">
	(function(){
		var object=document.getElementById("nav-app");
		if(object)object.className+=" curr";//当前导航
	})();
</script>
</body>
</html>