<%@ page language="java" import="java.util.*,java.io.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>${title}</title>
<link rel="stylesheet" type="text/css" href="${ctx}/css/base.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/css/main.css" />
<script src="${ctx}/js/jquery-1.4.2.min.js" type="text/javascript"></script>
<script src="${ctx}/js/jquery.cookie.js" type="text/javascript"></script>
<script src="${ctx}/js/jquery.treeview.js" type="text/javascript"></script>
<script type="text/javascript" src="${ctx}/js/alert.js"></script>
<%--  页面跳转的js  --%>
<script language="javascript" type="text/javascript" src="${ctx}/js/basic.js"></script>
<script language="javascript" type="text/javascript" src="${ctx}/js/json-minified.js"></script>
<%
	String path = "";
	Properties pro = new Properties();
	String realpath = request.getRealPath("/WEB-INF/classes");
	try {
		//读取配置文件
		FileInputStream in = new FileInputStream(realpath
				+ "/proxy.properties");
		pro.load(in);
	} catch (FileNotFoundException e) {
		out.println(e);
	} catch (IOException e) {
		out.println(e);
	}

	//通过key获取配置文件
	path = pro.getProperty("api.alilo.com.cn");
%>
</head>
<body>
	<jsp:include page="include/header.jsp"></jsp:include>
	<!--header_end-->
	<div class="w">
		<div id="warp">
			<div class="content">
				<!--left_start-->
				<div class="menu-box rounded fl" id="red">
					<div id="menu-box">
						<script type="text/javascript" src="${ctx}/js/menu.js">
						</script>
						<div class="box">
							<div class="title_1">
								情景版 
							</div>
							<div class="list">
								<ul class="treeview-red">
									<li onclick="getRecommen(1)" class="opens"><span
										class="selected" id="menu_1">情景推荐</span></li>
									<li onclick="getClassification(1)" class="opens"><span
										class="" id="menu_5">分类管理</span></li>
									<li onclick="getLabel(1)" class="opens"><span class=""
										id="menu_6">标签管理</span></li>
									<li onclick="getScene(1)" class="opens"><span
										id="menu_3">情景管理</span></li>
								</ul>
							</div>
						</div>
						<div class="box">
							<div class="title_2">
								基础版 
							</div>
							<div class="list_1">
								<ul class="treeview-red">
									<li onclick="getSearchchannel(1)" class="opens"><span
										class="selected" id="menu_1">搜索渠道管理</span></li>
									<li onclick="getSlide(1)" class="opens"><span
										class="" id="menu_5">轮播图管理</span></li>
									<li onclick="getEntrance(1)" class="opens"><span class=""
										id="menu_6">音乐入口管理</span></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<!--left_end-->
				<!--right_start-->
				<!--业务分类_start-->
				<div class="fr" id="businessContent"></div>
				<!--right_end-->
			</div>
		</div>
	</div>
	<!--footer_start-->
	<script type="text/javascript" src="${ctx}/js/footer.js">
	</script>
	<!--footer_end-->
	<!--footer_end-->
	<script type="text/javascript">
		(function() {
			var object = document.getElementById("nav-app");
			if (object)
				object.className += " curr";//当前导航
		})();
	</script>
</body>
</html>