<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<script src="${ctx}/js/rabbit.js" type="text/javascript"></script>
<script src="${ctx}/js/anime.js" type="text/javascript"></script>
<script src="${ctx}/js/delallnews.js" type="text/javascript"></script>
<div class="right-box rounded">
	<div class="form-row">
		&nbsp;&nbsp; <input type="button" value="添加分类"
			onClick="addClassificationPro()" style="float: right" class="to-del"
			id="del">
	</div>
	<div class="tb-box" id="tb-box">
		<table class="tb" cellspacing="0" cellpadding="0">
			<tbody>
				<tr class="tit-bg">
					<td width="8%"><P>
							<input type="checkbox" id="ckall" value="all" />全选
						</P></td>
					<td width="8%">ID</td>
					<td width="8%">排序</td>
					<td width="10%">分类名称</td>
					<td width="10%">状态</td>
					<td width="14%" colspan="6">操作</td>
				</tr>
				<c:if test="${classification!=null}">
					<c:forEach items="${classification}" var="news" varStatus="s">
						<tr>
							<td><input type="checkbox" class="userid" name="ck"
								value="${news.id}" /></td>
							<td width="50">${news.id}</td>
							<td width="50">${news.sort}</td>
							<td width="50">${news.cname}</td>
							<td><c:choose>
									<c:when test="${news.state==0}">显示</c:when>
									<c:when test="${news.state==1}">隐藏</c:when>
								</c:choose></td>
							<td><a href="#" onclick="uppClassificationPro(${news.id})"><span
									class="red">修改</span></a></td>
							<td><a href="#" onclick="delClassification(${news.id},'${news.uuid}')"><span
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
	<!-- 分页跳转 -->
	<script type="text/javascript">
		function PageClick(RecordCount, PageIndex) {
			//  alert("点击第"+PageIndex+"页");
			getClassification(PageIndex);
			InitPager(RecordCount, PageIndex);
		};
	</script>
	<!-- 分页 -->
	<%@ include file="/WEB-INF/jsp/include/page.jsp"%>
</div>