<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<link rel="stylesheet" type="text/css" href="${ctx}/css/r_base.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/css/r_main.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/css/r_style.css" />
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
<script type="text/javascript">
	$(function() {
		if ($("#effect").val() == 0) {
			$(".addblock").show();
		} else {
			$(".addblock").hide();
			$(".num").val(0);
			$("#lightadd option").eq(0).attr("selected", "selected");
		} 
		$("#effect").bind("change", function() {
			if ($("#effect").val() == 0) {
			$(".addblock").show();
		} else {
			$(".addblock").hide();
			$(".num").val(0);
			$("#lightadd option").eq(0).attr("selected", "selected");
		} 
		});
		$(".num").bind("focus",function(){
			$(this).val("");
		});
	});
</script>
<div class="right-box rounded">
	<div class="fr">
		<div class="right-box rounded">
			<div class="form-row" style="width:300"></div>
			<div class="tb-box">
				<table class="tb" cellspacing="0" cellpadding="0">
					<tr>
						<td width="30%"><label>情景名称：</label></td>
						<td align="left"><span> <input type="hidden" id="id"
								value="${scene.id}"> <input type="hidden"
								id="createtime" value="${scene.createtime}"> <input
								type="hidden" id="recommed" value="${scene.recommed}"> <input
								type="hidden" id="uuid" value="${scene.uuid}"> <input
								class="form-control" placeholder="请填写" type="text" id="title"
								value="${empty scene.sname?'':scene.sname}"
								style="width: 270px;height: 30px;">
						</span></td>
					</tr>
					<tr>
						<td>情景描述：</td>
						<td align="left"><textarea rows="6" cols="36" id="scenebak">${empty scene.scenebak?'':scene.scenebak}</textarea>
						</td>
					</tr>
					<tr>
						<td><label>分&#12288;&#12288;类：</label></td>
						<td align="left"><select name="st" id="classfi" class="input"
							style="width: 270px;height: 30px;">
								<c:forEach items="${classifications}" var="classification">
									<option
										<c:if test="${scene.cuuid==classification.uuid}"> selected="selected"</c:if>
										value="${classification.uuid}">${classification.cname}</option>
								</c:forEach>
						</select></td>
					</tr>
					<tr>
						<td width="110"><label>情景缩略图：</label></td>
						<td align="left" width="350" height="130">
							<div class="form-group">
								<div class="col-md-7">
									<div>
										<c:if test="${empty scene.thumbnail}">
											<img id="imgth" src="${ctx}/images/noimage.gif"
												style="margin-bottom: 5px; width: 200px; height: 114px;">
										</c:if>
										<c:if test="${!empty scene.thumbnail}">
											<img id="imgth" src="${ImagePath}${scene.thumbnail}"
												style="margin-bottom: 5px; width: 200px; height: 114px;">
										</c:if>
									</div>
									<div>
										<input type="file" style="padding-bottom: 10px; height: 25px;"
											id="Upload_Thumbnailpic" />
									</div>
									<%--   队列id一定要改变 不然回显的图片就会跑到另外的队列上 --%>
									<div id="fileQueue_Thumbnail" style="width: 10px;"></div>
									<input type="hidden" id="fileName" value="${scene.thumbnail}"/>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td width="110"><label>情景图片：</label></td>
						<td align="left" width="350" height="130">
							<div class="form-group">
								<div class="col-md-7">
									<div>
										<c:if test="${empty photos}">
											<img class="img" src="${ctx}/images/noimage.gif"
												style="margin-bottom: 5px; width: 200px; height: 114px;">
										</c:if>
										<c:if test="${!empty photos}">
											<c:forEach items="${photos}" var="photo">
												<img class="img" src="${ImagePath}${photo.imgurl}"
													style="margin-bottom: 5px; width: 200px; height: 114px;">
											</c:forEach>
										</c:if>
									</div>
									<div>
										<input type="file" style="padding-bottom: 10px; height: 25px;"
											id="Upload_Scenepic" /><font style="color: red">一次上传两张图片</font>
									</div>
									<%--   队列id一定要改变 不然回显的图片就会跑到另外的队列上 --%>
									<div id="fileQueue_Scene" style="width: 10px;"></div>
									<input type="hidden" id="fileNameth" />
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td><label>灯&#12288;&#12288;效：</label></td>
						<td align="left"><select name="status" id="effect"
							class="input" style="width: 270px;height: 30px;">
								<option value="0"
									<c:if test="${scene.effect==0}"> selected="selected"</c:if>
									<c:if test="${empty scene.effect}"> selected="selected"</c:if>>无灯效</option>
								<option value="1"
									<c:if test="${scene.effect==1}"> selected="selected"</c:if>>音乐律动</option>
								<option value="2"
									<c:if test="${scene.effect==2}"> selected="selected"</c:if>>彩虹</option>
								<option value="3"
									<c:if test="${scene.effect==2}"> selected="selected"</c:if>>烛光</option>
						</select></td>
					</tr>
					<tr class="addblock" style="display: none;">
						<td><label>R&#12288;G&#12288;B：</label></td>
						<td align="left"><span> <input class="form-control num"
								placeholder="请填写" type="text" id="rnum"
								value="${empty scene.rnum?'':scene.rnum}"
								onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
								onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"
								style="width: 80px;height: 30px;"> - <input
								class="form-control num" placeholder="请填写" type="text" id="gnum"
								value="${empty scene.gnum?'':scene.gnum}"
								onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
								onafterpaste="this.value=this.value.replace(/[^\d]/g,'') "
								style="width: 80px;height: 30px;"> - <input
								class="form-control num" placeholder="请填写" type="text" id="bnum"
								value="${empty scene.bnum?'':scene.bnum}"
								onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
								onafterpaste="this.value=this.value.replace(^[0-9]+(.[0-9]{3})?$,'') "
								style="width: 80px;height: 30px;"><font style="color: red">(输入范围0-255的正整数)</font>
						</span></td>
					</tr>
					<tr class="addblock" style="display: none;">
						<td><label>叠&#12288;&#12288;加：</label></td>
						<td align="left"><select name="lightadd" id=lightadd
							class="input" style="width: 270px;height: 30px;">
								<option value="0"
									<c:if test="${scene.lightadd==0}"> selected="selected"</c:if>
									<c:if test="${empty scene.lightadd}"> selected="selected"</c:if>>无叠加</option>
								<option value="1"
									<c:if test="${scene.lightadd==1}"> selected="selected"</c:if>>闪烁</option>
								<option value="2"
									<c:if test="${scene.lightadd==2}"> selected="selected"</c:if>>呼吸</option>
						</select></td>
					</tr>
					<tr>
						<td><label>状&#12288;&#12288;态：</label></td>
						<td align="left"><select name="status" id="status"
							class="input" style="width: 270px;height: 30px;">
								<option value="0"
									<c:if test="${scene.state==0}"> selected="selected"</c:if>
									<c:if test="${empty scene.state}"> selected="selected"</c:if>>上架</option>
								<option value="1"
									<c:if test="${scene.state==1}"> selected="selected"</c:if>>下架</option>
						</select></td>
					</tr>
					<tr>
						<td><label>排&#12288;&#12288;序：</label></td>
						<td align="left"><span> <input class="form-control"
								placeholder="请填写" type="text" id="sort"
								value="${empty scene.sort?'':scene.sort}"
								style="width: 270px;height: 30px;"
								onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
								onafterpaste="this.value=this.value.replace(/[^\d]/g,'') ">
						</span></td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<div class="btn-box">
								<input class="input" onclick="addOrUppScene()" type="button"
									value="确 定"> <input class="input" type="button"
									onclick="getScene(1)" value="返 回">
							</div> <span id="error" style="color:red"></span>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>