<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<script src="${ctx}/js/jquery-pager-1.0.js" type="text/javascript"></script>
<script src="${ctx}/js/delallScene.js" type="text/javascript"></script>
<div class="right-box rounded">
	<div class="form-row">
		&nbsp;&nbsp; <input type="text" height="16" style="width:100px;"
			value="${page.keyword}" class="input" name="name" id="Scene_name"
			placeholder="情景名称"> <input type="submit" value="搜索"
			onClick="getScene(1)" class="to-select" id="columnserrch"> <input
			type="button" value="添加情景" onClick="addScenePro()"
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
					<td width="5%">排序</td>
					<td width="10%">情景名称</td>
					<td width="5%">状态</td>
					<td width="25%" colspan="6">操作</td>
				</tr>
				<c:if test="${scenelist !=null}">
					<c:forEach items="${scenelist}" var="scene" varStatus="s">
						<tr>
							<td><input type="checkbox" class="userid" name="ck"
								value="${scene.id}" /></td>
							<td>${scene.id}</td>
							<td>${scene.sort}</td>
							<td>${scene.sname}</td>
							<td><c:choose>
									<c:when test="${scene.state == 0}">上架</c:when>
									<c:when test="${scene.state == 1}">下架</c:when>
								</c:choose></td>
								<td><a onclick="getInfo('${scene.uuid}',1)" href="#"><span
									class="red">查看详情</span></a></td>
							<td><a onclick="saveLabelListPro('','${scene.uuid}')" href="#"><span
									class="red">关联标签</span></a></td>
							<td><a onclick="saveMusicPro('${scene.uuid}')" href="#"><span class="red">歌曲管理</span></a></td>
							<td><a onclick="uppScenePro(${scene.id})" href="#"><span
									class="red">修改</span></a></td>
							<td><a onclick="delScene(${scene.id})" href="#"><span
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
			getScene(PageIndex);
			InitPager(RecordCount, PageIndex);
		};
	</script>
	<%@ include file="/WEB-INF/jsp/include/page.jsp"%>
	<!-- 分页跳转 -->
</div>