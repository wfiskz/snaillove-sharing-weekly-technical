<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<script src="${ctx}/js/jquery-pager-1.0.js" type="text/javascript"></script>
<script src="${ctx}/js/delallLabel.js" type="text/javascript"></script>
<div class="right-box rounded">
	<div class="form-row">
		&nbsp;&nbsp; <input type="text" height="16" style="width:100px;"
			value="${page.keyword}" class="input" name="name" id="label_name"
			placeholder="标签名称"> <input type="submit" value="搜索"
			onClick="getLabel(1)" class="to-select" id="columnserrch"> <input
			type="button" value="添加标签" onClick="addLabelPro()"
			style="float: right" class="to-del" id="del">

	</div>
	<div class="tb-box" id="tb-box">
		<table class="tb" cellspacing="0" cellpadding="0">
			<tbody>
				<tr class="tit-bg">
					<td width="8%"><P>
							<input type="checkbox" id="ckall" value="all" />全选
						</P></td>
					<td width="5%">ID</td>
					<td width="10%">排序</td>
					<td width="10%">标签名称</td>
					<td width="10%">图片</td>
					<td width="8%">状态</td>
					<td width="15%" colspan="6">操作</td>
				</tr>
				<c:if test="${labellist !=null}">
					<c:forEach items="${labellist}" var="label" varStatus="s">
						<tr>
							<td><input type="checkbox" class="userid" name="ck"
								value="${label.id}" /></td>
							<td>${label.id}</td>
							<td>${label.sort}</td>
							<td>${label.lname}</td>
							<td><img src="${ImagePath}${label.imgurl}"
								style="height:40px"></td>
							<td><c:choose>
									<c:when test="${label.state == 0}">显示</c:when>
									<c:when test="${label.state == 1}">隐藏</c:when>
								</c:choose></td>
							<td><a onclick="uppLabelPro(${label.id})" href="#"><span
									class="red">修改</span></a></td>
							<td><a onclick="delLabel(${label.id})" href="#"><span
									class="red">删除</span></a></td>
						</tr>
					</c:forEach>
				</c:if>
			</tbody>
		</table>
	</div>
	<div class="form-row">
		<button id="selectall">全选</button>
		<button id="largeDel">删除</button>
	</div>
	<!-- 分页 -->
	<script type="text/javascript">
		function PageClick(RecordCount, PageIndex) {
			//  alert("点击第"+PageIndex+"页");
			getLabel(PageIndex);
			InitPager(RecordCount, PageIndex);
		};
	</script>
	<%@ include file="/WEB-INF/jsp/include/page.jsp"%>
	<!-- 分页跳转 -->
</div>