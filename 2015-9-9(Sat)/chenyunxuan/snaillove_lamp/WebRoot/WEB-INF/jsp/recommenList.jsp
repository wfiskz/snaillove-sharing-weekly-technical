<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<script src="${ctx}/js/jquery-pager-1.0.js" type="text/javascript"></script>
<script src="${ctx}/js/delallScene.js" type="text/javascript"></script>
<div class="right-box rounded">
	<div class="form-row">
		&nbsp;&nbsp; <input type="text" height="16" style="width:100px;"
			value="${page.keyword}" class="input" name="name" id="recommen_name"
			placeholder="推荐情景名称"> <input type="submit" value="搜索"
			onClick="getRecommen(1)" class="to-select" id="columnserrch">
		<input type="button" value="推荐情景" onClick="saveScenePro('')"
			style="float: right" class="to-del" id="del">

	</div>
	<div class="tb-box" id="tb-box">
		<table class="tb" cellspacing="0" cellpadding="0">
			<tbody>
				<tr class="tit-bg">
					<td width="8%"><P>
							<input type="checkbox" id="ckall" value="all" />全选
						</P></td>
					<td width="8%">ID</td>
					<td width="20%">排序</td>
					<td width="25%">情景名称</td>
					<td colspan="2">操作</td>
				</tr>
				<c:if test="${recommenList !=null}">
					<c:forEach items="${recommenList}" var="recommen" varStatus="s">
						<tr>
							<td><input type="checkbox" class="userid" name="ck"
								value="${recommen.id}" /></td>
							<td>${recommen.id}</td>
							<td><input type="text" id="sortnum"
								onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
								onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"
								onblur="recommenSort($(this).val(),${recommen.id})"
								style="width: 50px;" value="${recommen.sort}" /></td>
							<td>${recommen.sname}</td>
							<td><a onclick="getInfo('${recommen.suuid}',2)" href="#"><span
									class="red">查看详情</span></a></td>
							<td><a onclick="delRecommen(${recommen.id})" href="#"><span
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
			getRecommen(PageIndex);
			InitPager(RecordCount, PageIndex);
		};
	</script>
	<%@ include file="/WEB-INF/jsp/include/page.jsp"%>
	<!-- 分页跳转 -->
</div>