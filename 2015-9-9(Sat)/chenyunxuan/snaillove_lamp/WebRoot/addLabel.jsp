<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>




<%--     add  --%>

 <div class="classPop" id="addLabelshow" style="width:430px;">
  <div class="pop-top">
    <div class="ac">
      <h2>添加标签</h2>
    </div>
  </div>
  <div class="pop-box">
    <div class="con">
      <table class="tb" cellspacing="0" cellpadding="0">
       
        <tr>
          <td width="110"><label>标签名称：</label></td>
           <td width="300"><input type="text" id="pricelist_name" class="input"></td>
        </tr>
        <tr>
          <td width="110"><label>标签封面：</label></td>
           <td width="300"><input type="text" id="pricelist_name" class="input"></td>
        </tr>
        
        <tr>
          <td><label>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</label></td>
          <td>
            <select id="states">
            <option  value="0"  selected="selected">默认</option>
            <option value="1" >上柜</option>
            <option value="2">下柜</option>
            </select>
            </td>
        </tr>
        
        <tr>
          <td><label>关联选择：</label></td>
           <td>
            <select id="from_id" name="from_id" onchange="onSelectChange(this,'class_id',0);">
            <option  >关联来源</option>
            <c:if test="${contentProviderlist != null}">
            <c:forEach items="${contentProviderlist}" var="content" varStatus="s">
            
            <option value="${content.provider_id}" >${content.name}</option>
            
            </c:forEach>
            </c:if>
            <c:if test="${contentProviderlist == null}">
            <option  >暂无数据</option>
            </c:if>
            
            </select>
            </td>
            
             <td>
            <select id="class_id" name="class_id" onchange="onSelectChange(this,'label_id',1);">
            <option  >关联分类</option>
                       
           
            </select>
            </td>
            
            
             <td>
            <select id="label_id" name="label_id"  >
            <option  >关联标签</option>
           
            </select>
            </td>
              




        </tr>
       
   
      </table>
    </div>
  </div>
  <div class="btn-box">
  
    <input id="" class="btn" type="button" onClick="addPricelistsss()" value="确 定">
    <input id="" class="close" type="button" onClick="closeaddpop2_addLabel()" value="取 消">
  </div>
</div>





<script type="text/javascript">

function onSelectChange(obj,toSelId,type){
	
	if(type==0){
		setSelect(obj.value,toSelId);
	}else{
		
		setSelect2(obj.value,toSelId);
		
	}
	
}
//获取分类
function setSelect(fromSelVal,toSelId){
	var type = fromSelVal;
	//alert(document.getElementById("province").selectedIndex);
	document.getElementById(toSelId).innerHTML="";
	
	$.ajax( {
		type : "GET",
		url : "/music/web/findClass.action",
		data : {
			"type":type
		},
		dataType : "JSON",
		success : function(data) {
			if(data){
				
				createSelectObj(data,toSelId);
				
			}else{
				
				var obj = document.getElementById(toSelId);
				obj.innerHTML="";
				var nullOp = document.createElement("option");
				nullOp.setAttribute("value","");
				nullOp.appendChild(document.createTextNode("暂无数据"));
				obj.appendChild(nullOp);
			}
				
				
			
			
         
		}
	});
	
}
//获取标签
function setSelect2(fromSelVal,toSelId){
	var from_id =  $("#from_id").val();//获取属于哪个来源  去调用对应的接口获取标签
	var class_id = fromSelVal ;
	alert("class_id"+class_id);
	//alert(document.getElementById("province").selectedIndex);
	document.getElementById(toSelId).innerHTML="";
	$.ajax( {
		type : "GET",
		url : "/music/web/findLabel.action",
		data : {
			"type":from_id,
			"id":class_id
			
		},
		dataType : "JSON",
		success : function(data) {
			
			if(data){
				
				createSelectObj(data,toSelId);
				
			}else{
				
				var obj = document.getElementById(toSelId);
				obj.innerHTML="";
				var nullOp = document.createElement("option");
				nullOp.setAttribute("value","");
				nullOp.appendChild(document.createTextNode("暂无数据"));
				obj.appendChild(nullOp);
			}
			
         
		}
	});
	
}

function createSelectObj(data,toSelId){
	
	var arr = jsonParse(data);
	
	if(arr != null && arr.length>0){
		var obj = document.getElementById(toSelId);
		obj.innerHTML="";
		var nullOp = document.createElement("option");
		nullOp.setAttribute("value","");
		nullOp.appendChild(document.createTextNode("请选择"));
		obj.appendChild(nullOp);
		for(var o in arr){
			var op = document.createElement("option");
			op.setAttribute("value",arr[o].id);
			//op.text=arr[o].name;//这一句在ie下不起作用，用下面这一句或者innerHTML
			op.appendChild(document.createTextNode(arr[o].name));
			obj.appendChild(op);
		}
		
	}
		
	
}

//setSelect('1','label_id');
</script>





