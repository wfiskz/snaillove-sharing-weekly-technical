<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<script src="/music/js/jquery-1.4.2.min.js" type="text/javascript">
</script>
<script src="/music/js/prettyPhoto/jquery.prettyPhoto.js"
	type="text/javascript">
</script>
<script type="text/javascript"
	src="/music/js/uploadify-v2.1.4/jquery.uploadify.v2.1.4.js">
</script>
<script type="text/javascript"
	src="/music/js/uploadify-v2.1.4/swfobject.js">
</script>
<script type="text/javascript" src="/music/js/upload.js">
</script>
<link href="/music/js/uploadify-v2.1.4/uploadify1.css" rel="stylesheet"
	type="text/css">
<link rel="stylesheet" href="/music/js/prettyPhoto/prettyPhoto.css"
	type="text/css">
	
<link rel="stylesheet" href="/music/css/base2upload.css" type="text/css">
<link rel="stylesheet" href="/music/css/custom.css" type="text/css">

<div class="right-box rounded">
	<div class="_main">

		<div>
			<h4>
				<a href=""></a> &gt; 新增应用版本
			</h4>
		</div>


		<form enctype="multipart/form-data" id="myfrom" accept-charset="UTF-8"
			action=""
			method="POST">
			<input type="hidden" value="b2j9zLckTTRy4TsDNNMeZ1DuZhtWlAh1mZztzL7i"
				name="_token">
				<div class="form-group">
				<label for="name_version">
					版本名称
				</label>
				<input type="text" id="name_version" name="name_version">
			</div>
			<div class="form-group">
				<label for="number">
					版本
				</label>
				<input type="text" id="number" name="number">
			</div>

			<div class="form-group">
				<label for="keywords">
					关键字
				</label>
				<input type="text" id="keywords" name="keywords">
			</div>

			<div class="form-group">
				<label for="summary">
					描述
				</label>
				<textarea id="summary" rows="10" cols="50" name="summary"></textarea>
			</div>

			<div class="form-group">
				<label for="deployment_target">
					目标平台
				</label>
				<input type="text" id="deployment_target" name="deployment_target">
			</div>

			<div class="form-group">
				<label class="control-label col-md-2">
					图标:
				</label>
				<div class="col-md-7">
					<div>
						<img id="img" src="/music/images/noimage.gif"
							style="margin-bottom: 5px; width: 180px; height: 130px;">
					</div>
					<div>
						<input type="file" style="padding-bottom: 10px; height: 25px;"
							id="Uploadpic" />
					</div>
					<div id="fileQueue" style="width: 10px;"></div>
					<input type="hidden" id="fileName" />
				</div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-md-2">
					APK安装包:
				</label>
				<div class="col-md-7">
					<div class="same_line_left">
						<input type="text" class="definition_txt" id="file_tmp_icon"
							name="file_tmp_icon">
					</div>
					<div>
						<input type="file" style="padding-bottom: 10px; height: 25px;"
							id="UploadAPK" />
					</div>
					<div id="fileQueueapk" style="width: 10px;"></div>
					<input type="hidden" id="apkfileName" />
				</div>
			</div>
                 <br>
			  <div class="">
          <button id="addApp" class="btn btn-primary" onclick="addVersionAndPic();disabled='disabled'" type="button">保存</button>
          <button id="closeAddApp" onclick="appContent(1)" class="btn btn-default-outline" data-dismiss="modal" type="button">关闭</button>
        </div>
		</form>
	</div>

</div>
