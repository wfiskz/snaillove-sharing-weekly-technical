$().ready(function() {
	
	modifyCategoryImages();
});



/**
 * 修改
 */
function modifyCategoryImages() {
	$("#ModifyCategorypic").uploadify( {
		'uploader' : '/mother/js/uploadify-v2.1.4/uploadify.swf',
		'script' : "/mother/web/uploadPic.action", //后台处理的请求
		'cancelImg' : '/mother/js/uploadify-v2.1.4/cancel.png',
		'fileDataName' : 'uploadFile',//服务器端根据这个接收文件
		'queueID' : 'modify_CategoryQueue',//与下面的id对应
		'queueSizeLimit' : 1,//队列中允许的最大文件数目
		'fileDesc' : '仅能上传格式为jpg或png的图片',
		'fileExt' : '*.jpg;*.png;*.gif;*.jpeg;', //控制可上传文件的扩展名，启用本项时需同时声明fileDesc
		'auto' : true,
		'multi' : true,//是否能选择多个文件
		'buttonImg' : '/mother/images/loadimgbtn.png',
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
//			alert(fileName);
			alert("上传成功!");
			//回显图片  替换默认图片
		$("#imgs").attr('src', date.imgUrl);
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



