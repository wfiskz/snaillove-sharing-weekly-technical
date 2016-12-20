<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<link rel="stylesheet" type="text/css" href="${ctx}/css/r_base.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/css/r_main.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/css/r_style.css" />
<div class="right-box rounded">
	<div class="fr">
		<div class="right-box rounded">
			<div class="form-row" style="width:300"></div>
			<div class="tb-box">
				<table class="tb" cellspacing="0" cellpadding="0">
					<tr>
						<td width="30%"><label>情景名称：</label></td>
						<td align="left"><span> ${empty scene.sname?'':scene.sname}
						</span></td>
					</tr>
					<tr>
						<td>情景描述：</td>
						<td align="left">${empty scene.scenebak?'':scene.scenebak}</td>
					</tr>
					<tr>
						<td><label>所属分类：</label></td>
						<td align="left">${classification.cname}</td>
					</tr>
					<tr>
						<td><label>摇一摇功能：</label></td>
						<td align="left"><c:if test="${scene.recommed==0}">未加入</c:if>
							<c:if test="${scene.recommed==1}">已加入</c:if></td>
					</tr>
					<tr>
						<td><label>关联标签：</label></td>
						<td align="left"><c:if test="${empty labelList}">
								未关联标签
							</c:if> <c:if test="${!empty labelList}">
								<c:forEach items="${labelList}" var="label">${label.lname}|</c:forEach>
							</c:if></td>
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
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td width="110"><label>情景灯效：</label></td>
						<td align="left" width="350" height="130">
							<c:choose>
								<c:when test="${scene.effect==0}">
									无灯效
								</c:when>
								<c:when test="${scene.effect==1}">
									音乐律动
								</c:when>
								<c:when test="${scene.effect==2}">
									彩虹
								</c:when>
								<c:otherwise>
									烛光
								</c:otherwise>
							</c:choose>
						</td>
					</tr>
					<c:if test="${scene.effect==0}">
					<tr>
						<td width="110"><label>R  G  B：</label></td>
						<td align="left" width="350" height="130">
							(${scene.rnum},${scene.gnum},${scene.bnum})
						</td>
					</tr>
					<tr>
						<td width="110"><label>叠加灯效：</label></td>
						<td align="left" width="350" height="130">
							<c:choose>
								<c:when test="${scene.lightadd==0}">
									无叠加
								</c:when>
								<c:when test="${scene.lightadd==1}">
									闪烁
								</c:when>
								<c:otherwise>
									呼吸
								</c:otherwise>
							</c:choose>
						</td>
					</tr>		
					</c:if>
					<tr>
						<td width="110"><label>歌曲列表：</label></td>
						<td align="left" width="350" height="130">
							<div class="form-group">
								<div class="col-md-7">
									<div>
										<c:if test="${empty musicList}">
											未关联歌曲
										</c:if>
										<c:if test="${!empty musicList}">
											<c:forEach items="${musicList}" var="music" varStatus="s">
												${s.index+1}:${music.musicname}</br>
											</c:forEach>
										</c:if>
									</div>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<div class="btn-box">
								<input class="input" type="button"
									onclick="${flag==1?'getScene(1)':'getRecommen(1)'}" value="返回">
							</div> <span id="error" style="color:red"></span>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>