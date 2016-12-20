$().ready(function() {
	uploadMPic();
	uploadMAPK();
	
});
/*****************************************************************
 * 						修改的时候调用
 *****************************************************************/
function uploadMPic() {
	$("#MUploadpic").uploadify( {
		'uploader' : '/music/js/uploadify-v2.1.4/uploadify.swf',
		'script' : "/music/web/uploadpic.action", //后台处理的请求
		'cancelImg' : '/music/js/uploadify-v2.1.4/cancel.png',
		'fileDataName' : 'uploadFile',//服务器端根据这个接收文件
		'queueID' : 'MfileQueue',//与下面的id对应
		'queueSizeLimit' : 1,//队列中允许的最大文件数目
		'fileDesc' : '仅能上传格式为jpg或png的图片',
		'fileExt' : '*.jpg;*.png;*.apk;', //控制可上传文件的扩展名，启用本项时需同时声明fileDesc
		'auto' : true,
		'multi' : true,//是否能选择多个文件
		'buttonImg' : '/music/images/loadimgbtn.png',
		'scriptData' : {
			'flag' : 1
		},
		'width' : 200,
		'height' : 30,
		'onError' : function(event, queueID, fileObj, errorObj) {
			alert("上传失败!");
		},
		'onComplete' : function(event, queueID, fileObj, response) {
			var date = jQuery.parseJSON(response);
			//文件名字
		var fileName = date.src;

		if (date.status == 1) {
			
//			alert("上传成功!");
			//回显图片  替换默认图片
		$("#imgm").attr('src', date.imgUrl);
		//获取id为fileName的值
		var fileNames = $("#fileName").val();

		if (!fileNames) {

			$("#fileName").val(fileName);
		} else {

			//将上传的所有图片名称拼接字符串赋值给filename	
		$("#fileName").val(fileNames + ',' + fileName);

	}
} else {
	// alert("上传失败!");
	}
}
	});

}

function uploadMAPK() {
	$("#MUploadAPK").uploadify( {
		'uploader' : '/music/js/uploadify-v2.1.4/uploadify.swf',
		'script' : "/music/web/uploadapk.action", //后台处理的请求
		'cancelImg' : '/music/js/uploadify-v2.1.4/cancel.png',
		'fileDataName' : 'uploadFile',//服务器端根据这个接收文件
		'queueID' : 'MfileQueueapk',//与下面的id对应
		'queueSizeLimit' : 1,//队列中允许的最大文件数目
		'fileDesc' : '仅能上传格式为apk或ipa的程序',
		'fileExt' : '*.apk;*.ipa;', //控制可上传文件的扩展名，启用本项时需同时声明fileDesc
		'auto' : true,
		'multi' : true,//是否能选择多个文件
		'buttonImg' : '/music/images/apkbutton.jpg',
		'scriptData' : {
			'flag' : 1
		},
		'width' : 200,
		'height' : 33,
		'onError' : function(event, queueID, fileObj, errorObj) {
			alert("上传失败!");
		},
		'onComplete' : function(event, queueID, fileObj, response) {
			
			var date = jQuery.parseJSON(response);
			//文件名字
		var apkfileName = date.apksrc;
      
		if (date.status == 1) {
//			alert("上传成功!");
			//回显图片  替换默认图片
		// $("#img").attr('apksrc', date.apkUrl);
		//获取id为fileName的值
		var apkfileNames = $("#apkfileName").val();

		if (!apkfileNames) {

			$("#apkfileName").val(apkfileName);
          $("#file_tmp_iconm").val(apkfileName);
		} else {

			//将上传的所有图片名称拼接字符串赋值给filename	
		$("#apkfileName").val(apkfileNames + ',' + apkfileName);

	}
} else {
	// alert("上传失败!");
	}
}
	});

}


 


////////////////////////////蓝牙图片上传////////////////////////
function uploadBluetoothImages() {
	$("#UploadBluetoothpic").uploadify( {
		'uploader' : '/music/js/uploadify-v2.1.4/uploadify.swf',
		'script' : "/music/web/uploadpic.action", //后台处理的请求
		'cancelImg' : '/music/js/uploadify-v2.1.4/cancel.png',
		'fileDataName' : 'uploadFile',//服务器端根据这个接收文件
		'queueID' : 'file_bluetoothQueue',//与下面的id对应
		'queueSizeLimit' : 1,//队列中允许的最大文件数目
		'fileDesc' : '仅能上传格式为jpg或png的图片',
		'fileExt' : '*.jpg;*.png;*.apk;', //控制可上传文件的扩展名，启用本项时需同时声明fileDesc
		'auto' : true,
		'multi' : true,//是否能选择多个文件
		'buttonImg' : '/music/images/loadimgbtn.png',
		'scriptData' : {
			'flag' : 1
		},
		'width' : 200,
		'height' : 30,
		'onError' : function(event, queueID, fileObj, errorObj) {
			alert("上传失败!");
		},
		'onComplete' : function(event, queueID, fileObj, response) {
			var date = jQuery.parseJSON(response);
			//文件名字
		var fileName = date.src;

		if (date.status == 1) {
			
//			alert("上传成功!");
			//回显图片  替换默认图片
		$("#img").attr('src', date.imgUrl);
		//获取id为fileName的值
		var fileNames = $("#fileName").val();

		if (!fileNames) {

			$("#fileName").val(fileName);
		} else {

			//将上传的所有图片名称拼接字符串赋值给filename	
		$("#fileName").val(fileNames + ',' + fileName);

	}
} else {
	 alert("上传失败!");
	}
}
	});

}

   



