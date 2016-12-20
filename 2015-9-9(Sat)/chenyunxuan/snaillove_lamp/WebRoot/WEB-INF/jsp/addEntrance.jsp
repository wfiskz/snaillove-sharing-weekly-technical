<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<script src="${ctx}/js/prettyPhoto/jquery.prettyPhoto.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${ctx}/js/uploadify-v2.1.4/jquery.uploadify.v2.1.4.js"></script>
<script type="text/javascript"
	src="${ctx}/js/uploadify-v2.1.4/swfobject.js"></script>
<script type="text/javascript" src="${ctx}/js/uploadLabelpic.js"></script>
<link href="${ctx}/js/uploadify-v2.1.4/uploadify.css" rel="stylesheet"
	type="text/css">
<link rel="stylesheet" href="${ctx}/js/prettyPhoto/prettyPhoto.css"
	type="text/css">
<div class="right-box rounded">
	<div class="fr">
		<div class="right-box rounded">
			<div class="form-row" style="width:300"></div>
			<div class="tb-box">
				<table class="tb" cellspacing="0" cellpadding="0">
					<tr>
						<td width="30%"><Label>音乐入口名称：</Label></td>
						<td align="left"><span> <input type="hidden" id="id"
								value="${entrance.id}"> <input type="hidden"
								id="createtime" value="${entrance.createtime}">  <input
								class="form-control" placeholder="请填写" type="text" id="title"
								value="${empty entrance.ename?'':entrance.ename}"
								style="width: 270px;height: 30px;">
						</span></td>
					</tr>
					<tr>
						<td width="30%"><Label>内容链接：</Label></td>
						<td align="left"><span> <input type="hidden" id="id"
								value="${entrance.id}"> <input type="hidden"
								id="createtime" value="${entrance.createtime}"> <input
								class="form-control" placeholder="请填写" type="text" id="contenturl"
								value="${empty entrance.contenturl?'':entrance.contenturl}"
								style="width: 270px;height: 30px;">
						</span></td>
					</tr>
					<tr>
						<td width="110"><Label>图片：</Label></td>
						<td align="left" width="350" height="130">
							<div class="form-group">
								<div class="col-md-7">
									<div>
										<c:if test="${empty entrance.photourl}">
											<img id="img" src="${ctx}/images/noimage.gif"
												style="margin-bottom: 5px; width: 200px; height: 114px;">
										</c:if>
										<c:if test="${!empty entrance.photourl}">
											<img id="img" src="${ImagePath}${entrance.photourl}"
												style="margin-bottom: 5px; width: 200px; height: 114px;">
										</c:if>
									</div>
									<div>
										<input type="file" style="padding-bottom: 10px; height: 25px;"
											id="Upload_Labelpic" />
									</div>
									<%--   队列id一定要改变 不然回显的图片就会跑到另外的队列上 --%>
									<div id="fileQueue_Label" style="width: 10px;"></div>
									<input type="hidden" id="fileName" value="${entrance.photourl}" />
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td><Label>状&#12288;&#12288;态：</Label></td>
						<td align="left"><select name="status" id="status"
							class="input" style="width: 270px;height: 30px;">
								<option value="0"
									<c:if test="${entrance.isdel==0}"> selected="selected"</c:if>
									<c:if test="${empty entrance.isdel}"> selected="selected"</c:if>>显示</option>
								<option value="1"
									<c:if test="${entrance.isdel==1}"> selected="selected"</c:if>>隐藏</option>
						</select></td>
					</tr>
					<tr>
						<td><Label>排&#12288;&#12288;序：</Label></td>
						<td align="left"><span> <input class="form-control"
								placeholder="请填写" type="text" id="sort"
								value="${empty entrance.sort?'':entrance.sort}"
								style="width: 270px;height: 30px;"
								onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
								onafterpaste="this.value=this.value.replace(/[^\d]/g,'') ">
						</span></td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<div class="btn-box">
								<input class="input" onclick="addOrUppEntrance()" type="button"
									value="确 定"> <input class="input" type="button"
									onclick="getEntrance(1)" value="返 回">
							</div> <span id="error" style="color:red"></span>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>