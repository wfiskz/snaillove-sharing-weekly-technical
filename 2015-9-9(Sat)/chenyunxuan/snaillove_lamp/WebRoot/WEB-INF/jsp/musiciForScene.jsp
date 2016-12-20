<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/tool.jsp"%>
<script src="${ctx}/js/selectzone_Label.js" type="text/javascript"></script>
<script src="${ctx}/js/slelect_music.js" type="text/javascript"></script>
<div class="right-box rounded">
	<div class="pop-top">
		<div class="ac">
			<h2>关联歌曲</h2>
		</div>
	</div>
	<div class="pop-box">
		<div class="con">
			<select id="type" name="type">
				<option value="0">选择歌源</option>
				<option value="1">领芯</option>
				<option value="2">喜马拉雅</option>
			</select>
			<input type="hidden" value="${uuid}" id="uuid" />
			<!-- 领芯歌曲名字搜索 -->
			<input type="text" height="16" style="width:100px;"
				value="" class="lingxin" name="name" id="lingxin_name"
				onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
				onafterpaste="this.value=this.value.replace(/[^\d]/g,'') "
				placeholder="歌曲SID"> <input type="submit" value="搜索"
				onClick="getlingxinmusic()"
				class="lingxin" id="lingyin"> 
			<!-- 喜马拉雅歌曲名字搜索 -->
			<!-- <select id="xima" name="type">
				<option value="1">歌名搜索</option>
				<option value="2">逐级搜索</option>
			</select> -->
			<!-- 喜马拉雅歌曲名字搜索 -->
			<input type="text" height="16" style="width:100px;" value=""
				class="xima" name="name" id="ximamusic_name" placeholder="歌曲名称">
			<input type="submit" value="搜索" class="xima" id="ximalaya" onclick="getximamusic()">
			<!-- 喜马拉雅分类列表 -->
			<!-- <select id="ximafl" name="type"> -->
			</select>
		</div>
		<div class="con" align="center">
			<form name="theForm5" method="post" action=""
				enctype="multipart/form-data">
				<table class="tb" cellspacing="0" cellpadding="0" width="750">
					<tr>
						<td width="35%"><label>所有歌曲</label></td>
						<td width="15%"><label>操作</label></td>
						<td width="35%"><label>已关联歌曲</label></td>
					</tr>
					<tr>
						<td width="20%"><select multiple="true" width="90"
							id="source_select5" class="selectElement" size="10" name="">

						</select></td>
						<td align="center" style="line-height:35px;"><input
							type="button" class="buttonElement" value="&gt;"><br>
							<input type="button" class="buttonElement" value="&lt;"><br>
						</td>
						<td width="35%">
							<div id="right">
								<select multiple="true" width="90" id="source_select6"
									class="selectElement" size="10" name="">
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