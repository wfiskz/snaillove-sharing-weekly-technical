<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%> 
<% 
String path = request.getContextPath(); 
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/"; 
%> 

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"> 
<html> 
  <head> 
    <base href="<%=basePath%>"> 
    
    <title>My JSP 'index.jsp' starting page</title> 
<meta http-equiv="pragma" content="no-cache"> 
<meta http-equiv="cache-control" content="no-cache"> 
<meta http-equiv="expires" content="0">    
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3"> 
<meta http-equiv="description" content="This is my page"> 
    <script src="js/jquery-1.4.2.min.js"></script> 

<script type="text/javascript"> 
$(document).ready(function() { 
// 全选/取消全部 
$("#checkAllChange").click(function() { 
if (this.checked == true) { 
$(".userid").each(function() { 
this.checked = true; 
}); 
} else { 
$(".userid").each(function() { 
this.checked = false; 
}); 
} 
}); 
// 全选 
$("#checkAll").click(function() { 
$(".userid").each(function() { 
this.checked = true; 
}); 
}); 
// 取消全部 
$("#removeAll").click(function() { 
$(".userid").each(function() { 
this.checked = false; 
}); 
}); 
// 反选 
$("#reverse").click(function() { 
$(".userid").each(function() { 
if (this.checked == true) { 
this.checked = false; 
} else { 
this.checked = true; 
} 
}) 
}); 
//批量删除 
$("#delAll").click(function() { 
var arrUserid = new Array(); 
$(".userid").each(function(i) { 
if (this.checked == true) { 
arrUserid[i] = $(this).val(); 
} 
}); 
alert("批量删除的:" + arrUserid); 
}); 
}); 
</script> 
</head> 

<body> 
<table border="1"> 
<tr> 
<td><input type="checkbox" id="checkAllChange" /></td> 
<td>用户id</td> 
<td>用户名</td> 
<td>电话</td> 
<td>地址</td> 
</tr> 
<tr> 
<td><input type="checkbox" class="userid" value="1" /></td> 
<td>1</td> 
<td>wangzs1</td> 
<td>18888000</td> 
<td>浦东</td> 
</tr> 
<tr> 
<td><input type="checkbox" class="userid" value="2" /></td> 
<td>2</td> 
<td>wangzs2</td> 
<td>18888001</td> 
<td>上海</td> 
</tr> 
<tr> 
<td><input type="checkbox" class="userid" value="3" /></td> 
<td>3</td> 
<td>wangzs3</td> 
<td>18888002</td> 
<td>河南</td> 
</tr> 
<tr> 
<td><input type="checkbox" class="userid" value="4" /></td> 
<td>4</td> 
<td>wangzs4</td> 
<td>18888003</td> 
<td>许昌</td> 
</tr> 
<tr> 
<td></td> 
<td><input type="button" id="checkAll" value="全选" /></td> 
<td><input type="button" id="removeAll" value="取消全部" /></td> 
<td><input type="button" id="reverse" value="反选" /></td> 
</tr> 
<tr> 
<td colspan="4" align="center"><input type="button" value="批量删除" id="delAll"></td> 
</tr> 
</table> 
</body> 

</html> 