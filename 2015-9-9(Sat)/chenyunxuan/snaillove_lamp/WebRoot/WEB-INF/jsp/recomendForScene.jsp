<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<script src="${ctx}/js/selectzone_Label.js" type="text/javascript"></script>
<div class="right-box rounded">
	<div class="pop-top">
		<div class="ac">
			<h2>推荐情景</h2>
		</div>
	</div>
	<div class="pop-box">
		<div class="con">
			<input type="text" height="16" style="width:100px;"
				value="${keyword}" class="input" name="name" id="scene_name"
				placeholder="情景名称"> <input type="submit" value="搜索"
				onClick="saveScenePro($('#scene_name').val())" class="to-select" id="columnserrch">
		</div>
		<div class="con" align="center">
			<form name="theForm5" method="post" action=""
				enctype="multipart/form-data">
				<table class="tb" cellspacing="0" cellpadding="0" width="750">
					<tr>
						<td width="35%"><label>未推荐情景</label></td>
						<td width="15%"><label>操作</label></td>
						<td width="35%"><label>已推荐情景</label></td>
					</tr>
					<tr>
						<td width="20%"><select multiple="true" width="90"
							id="source_select5" class="selectElement" size="10" name="">
								<c:forEach items="${scenes}" var="scene">
									<option class="select_scene" value="${scene.uuid}">${scene.sname}</option>
								</c:forEach>
						</select></td>
						<td align="center" style="line-height:35px;"><input
							type="button" class="buttonElement" value="&gt;"><br>
							<input type="button" class="buttonElement" value="&lt;"><br>
						</td>
						<td width="35%">
							<div id="right">
								<select multiple="multiple" width="90" class="selectElement"
									size="10" name="target_select5" id="target_select5">
									<c:forEach items="${rcScenes}" var="rcscene">
										<option class="delete_scene" value="${rcscene.id}">${rcscene.sname}</option>
									</c:forEach>
								</select>
							</div>
						</td>
					</tr>
					<tr>
						<td style="border: none;"><input id="" class="close"
							type="button" onClick="getRecommen(1)" value="返回"></td>
					</tr>
				</table>
			</form>
		</div>
	</div>
</div>