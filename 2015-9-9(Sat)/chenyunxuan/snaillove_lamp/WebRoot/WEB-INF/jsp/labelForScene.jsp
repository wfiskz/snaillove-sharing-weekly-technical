<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<script src="${ctx}/js/selectzone_Label.js" type="text/javascript"></script>
<div class="right-box rounded">
	<div class="pop-top">
		<div class="ac">
			<h2>关联标签</h2>
		</div>
	</div>
	<div class="pop-box">
		<div class="con">
			<input type="text" height="16" style="width:100px;"
				value="${keyword}" class="input" name="name" id="label_name"
				placeholder="标签名称"> <input type="submit" value="搜索"
				onClick="saveLabelListPro($('#label_name').val(),'${uuid}');"
				class="to-select" id="columnserrch">
				<input type="hidden" value="${uuid}" id="suuid">
		</div>
		<div class="con" align="center">
			<form name="theForm5" method="post" action=""
				enctype="multipart/form-data">
				<table class="tb" cellspacing="0" cellpadding="0" width="750">
					<tr>
						<td width="35%"><label>所有标签</label></td>
						<td width="15%"><label>操作</label></td>
						<td width="35%"><label>已关联标签</label></td>
					</tr>
					<tr>
						<td width="20%"><select multiple="true" width="90" id=""
							class="selectElement" size="10" name="">
								<c:forEach items="${labelAllList}" var="alllabel">
									<option class="select_alllabel" value="${alllabel.uuid}">${alllabel.lname}</option>
								</c:forEach>
						</select></td>
						<td align="center" style="line-height:35px;"><input
							type="button" class="buttonElement" value="&gt;"><br>
							<input type="button" class="buttonElement" value="&lt;"><br>

						</td>
						<td width="35%">
							<div id="right">
								<select multiple="true" width="90" id="" class="selectElement"
									size="10" name="">
									<c:forEach items="${labelList}" var="labels">
										<option class="delete_label" value="${labels.id}">${labels.lname}</option>
									</c:forEach>
								</select>
							</div>
						</td>
					</tr>
					<tr>
						<td style="border: none;"><input id="" class="close"
							type="button" onClick="getScene(1)" value="返回"></td>
					</tr>
				</table>
			</form>
		</div>
	</div>
</div>