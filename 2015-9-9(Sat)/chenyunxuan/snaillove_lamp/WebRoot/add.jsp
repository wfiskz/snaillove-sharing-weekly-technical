<%@ page language="java" import="java.util.*,java.io.*" pageEncoding="utf-8"%>
<meta name="page-view-size" content="640*530">
<%
  String path = "";
  
 Properties pro = new Properties();  
 String realpath = request.getRealPath("/WEB-INF/classes");  
 try{  
 //读取配置文件
 FileInputStream in = new FileInputStream(realpath+"/proxy.properties");  
 pro.load(in);  
 }  
 catch(FileNotFoundException e){  
     out.println(e);  
 }  
 catch(IOException e){out.println(e);} 

//通过key获取配置文件
 path = pro.getProperty("jsp"); 
 
 //byte b[]=title.getBytes("utf-8");
 //title=new String(b);
 
%>
<html>
  <head>
 <script type="text/javascript">
 
    var path = '<%=path%>';
     alert(path);
</script>
  </head>
  <body>
  <img alt="测试" src="<%=path%>/pictures/2015/01/04/1420354851490.png">
</body>
</html>