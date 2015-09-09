<%@ page language="java" import="java.util.*,java.io.*"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path1 = request.getContextPath();
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
	//byte b[]=title.getBytes("utf-8");
	//title=new String(b);
%>
<div id="header">
	<div class="w">
		<div class="logo fl">
			<img src="<%=path1%>/images/logo.png">
		</div>
		<div class="pattern fr">
			<p class="userinfo fr">
				<img src="<%=path1%>/images/user_ico.png"> 你好，admin <a
					href="<%=path1%>/login.jsp"><img
					src="<%=path1%>/images/exit.png"> </a>
			</p>
		</div>
	</div>
</div>
<div id="nav">
	<div class="nav-wrapper">
		<ul class="tabs">
			<li class="tabs-item " id="nav-app"><a target=""
				class="tabs-btn" href="#"> <span>蜗爱生活</span>
			</a></li>
		</ul>
	</div>
</div>