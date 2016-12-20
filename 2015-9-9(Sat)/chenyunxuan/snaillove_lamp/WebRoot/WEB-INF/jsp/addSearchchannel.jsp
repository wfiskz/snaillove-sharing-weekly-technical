<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<link rel="stylesheet" type="text/css" href="${ctx}/css/r_base.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/css/r_main.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/css/r_style.css" />
<script type="text/javascript" src="${ctx}/js/jquery-1.4.2.min.js"></script>
<script src="${ctx}/js/jquery.cookie.js" type="text/javascript"></script>
<script src="${ctx}/js/rabbit.js" type="text/javascript"></script>
<script src="${ctx}/js/jquery.treeview.js" type="text/javascript"></script>
<script src="${ctx}/js/anime.js" type="text/javascript"></script>
<script src="${ctx}/js/rabbit.js" type="text/javascript"></script>
<script type="text/javascript" src="${ctx}/js/alert.js"></script>
<div class="right-box rounded">
	<div class="fr">
		<div class="right-box rounded">
			<div class="form-row" style="width:300"></div>
			<div class="tb-box">
				<table class="tb" cellspacing="0" cellpadding="0">
					<tr>
						<td width="30%"><label>搜索渠道名称：</label></td>
						<td align="left"><span> <input type="hidden" id="id"
								value="${channel.id}"> <input type="hidden"
								id="createtime" value="${channel.createtime}"> 
								<input class="form-control" placeholder="请填写" type="text"
								id="title"
								value="${empty channel.sname?'':channel.sname}"
								style="width: 270px;height: 30px;">
						</span></td>
					</tr>
					<tr>
						<td><label>排&#12288;&#12288;序：</label></td>
						<td align="left"><span> <input class="form-control"
								placeholder="请填写" type="text" id="sort"
								value="${empty channel.sort?'':channel.sort}"
								style="width: 270px;height: 30px;"
								onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
								onafterpaste="this.value=this.value.replace(/[^\d]/g,'') ">
						</span></td>
					</tr>
					<tr>
						<td><label>状&#12288;&#12288;态：</label></td>
						<td align="left"><select name="status" id="status"
							class="input" style="width: 270px;height: 30px;">
								<option value="0"
									<c:if test="${channel.isdel==0}"> selected="selected"</c:if>
									<c:if test="${empty channel.isdel}"> selected="selected"</c:if>>显示</option>
								<option value="1"
									<c:if test="${channel.isdel==1}"> selected="selected"</c:if>>隐藏</option>
						</select></td>
					</tr>
					<tr>
						<td><label>是否为开放接口：</label></td>
						<td align="left"><select name="status" id="status"
							class="input" style="width: 270px;height: 30px;">
								<option value="0"
									<c:if test="${channel.isopen==1}"> selected="selected"</c:if>
									<c:if test="${empty channel.isopen}"> selected="selected"</c:if>>是</option>
								<option value="1"
									<c:if test="${channel.isopen==2}"> selected="selected"</c:if>>否</option>
						</select></td>
					</tr>
					<tr>
						<td><label>API：</label></td>
						<td align="left"><span> <input class="form-control"
								placeholder="请填写" type="text" id="apiurl"
								value="${empty channel.apiurl?'':channel.apiurl}"
								style="width: 270px;height: 30px;">
						</span></td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<div class="btn-box">
								<input class="input" onclick="addOrUppSearchchannel()"
									type="button" value="确 定"> <input class="input"
									type="button" onclick="getSearchchannel(1)" value="返 回">
							</div> <span id="error" style="color:red"></span>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>