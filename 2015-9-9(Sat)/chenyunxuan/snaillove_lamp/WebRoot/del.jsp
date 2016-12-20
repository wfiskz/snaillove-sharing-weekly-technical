<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
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
<SCRIPT type="text/javascript">
	$(function() {
		//全选与全不选  checkbox
		$("#ckall").click(function() {
			$("[name=ck]:checkbox").attr("checked", this.checked);
		});
		var objs = $("[name=ck]:checkbox");

		//当一个个的全部选中的时候 全选的按钮也是需要选中的 
		objs.click(function() {
			$("#ckall").attr("checked",
					objs.length == objs.filter(":checked").length);
		});

		//批量删除 
		$("#largeDel").click(function() {
			var str = "";
			$.each($("input[type='checkbox'][id!=ckall]"), function(k, v) {
				if (v.checked == false) {
					return;
				} else {
					str += v.value + ",";
				}
			});
			if (str == "") {
				alert("请选中一项");
				return;
			} else if (confirm("确认删除吗?")) {
				str = str.substring(0, str.length - 1);
				alert(str);
				// window.location.href = "ideLogin.action?ids=" + str; 
			}
		});

	});
</SCRIPT>
</head>
<body>
	<button id="selectall">全选</button>
	<button id="largeDel">删除</button>
	<P>
		<input type="checkbox" id="ckall" value="all" />全选
	</P>
	<P>
		<input type="checkbox" id="ck" class="userid" name="ck" value="0" />男
	</P>
	<P>
		<input type="checkbox" id="ck" class="userid" name="ck" value="1" />女
	</P>
	<%--<P>          
    <input type="checkbox" name="ck" value="00"/>百合</P><P>             
    <input type="checkbox" name="ck" value="11"/>基友</P> 
    <input type="checkbox" name="ck" value="00"/>百合</P><P>             
    <input type="checkbox" name="ck" value="11"/>基友</P> 
    <input type="checkbox" name="ck" value="00"/>百合</P><P>             
    <input type="checkbox" name="ck" value="11"/>基友</P> 
    <input type="checkbox" name="ck" value="00"/>百合</P><P>             
    <input type="checkbox" name="ck" value="11"/>基友</P> 
    <input type="checkbox" name="ck" value="00"/>百合</P><P>             
    <input type="checkbox" name="ck" value="11"/>基友</P> 
    <input type="checkbox" name="ck" value="00"/>百合</P><P>             
    <input type="checkbox" name="ck" value="11"/>基友</P> 
    <input type="checkbox" name="ck" value="00"/>百合</P><P>             
    <input type="checkbox" name="ck" value="11"/>基友</P> 
  --%>
</body>
</html>