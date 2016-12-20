$().ready(function() {
	getRecommen(1);
});

var path = "/snaillove_lamp/";

// 通过情景UUID获取详情(歌曲列表，列表，图片列表)
function getInfo(uuid, flag) {
	$.ajax({
		type : "POST",
		url : path + "web/getSceneInfo.action",
		data : {
			"uuid" : uuid,
			"flag" : flag
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

/**
 * 推荐情景模块的增删查
 */
// 获取推荐情景列表
function getRecommen(currentPage) {
	var keyword = $("#recommen_name").val();
	$.ajax({
		type : "POST",
		url : path + "web/getRecommen.action",
		data : {
			"currentPage" : currentPage,
			"keyword" : keyword
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 新增推荐情景前的准备
function addRecommenPro() {
	$.ajax({
		type : "POST",
		url : path + "web/addRecommenPro.action",
		data : {

		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 删除推荐情景
function delRecommen(id) {
	$.ajax({
		type : "POST",
		url : path + "web/delRecommen.action",
		data : {
			"id" : id
		},
		dataType : "json",
		success : function(msg) {
			if (msg.status == 1) {
				getRecommen(1);
			}
		}
	});
}

//修改排序号
function recommenSort(sort,id){
	if(sort.trim().length==0){
		alert("排序号不可为空");
		$("#sortnum").focus();
	}else{
		$.ajax({
			type : "POST",
			url : path + "web/uppRecommenSort.action",
			data : {
				"id":id,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getRecommen(1);
				}
			}
		});
	}
}

/**
 * 分类模块的增删查改
 */
// 获取分类列表
function getClassification(currentPage) {
	$.ajax({
		type : "POST",
		url : path + "web/getClassification.action",
		data : {
			"currentPage" : currentPage
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 新增分类前的准备
function addClassificationPro() {
	$.ajax({
		type : "POST",
		url : path + "web/addClassificationPro.action",
		data : {

		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 修改分类前的准备
function uppClassificationPro(id) {
	$.ajax({
		type : "POST",
		url : path + "web/uppClassificationPro.action",
		data : {
			"id" : id
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 新增修改分类
function addOrUppClassification() {
	var name = $("#title").val();
	var state = $("#status").val();
	var sort = $("#sort").val();
	var id = $("#id").val();
	var url = "";
	// flag=1为新增,flag=2为修改
	if (id == null || id == "" || id == "null") {
		url = path + "web/addClassification.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"cname" : name,
				"state" : state,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getClassification(1);
				}
			}
		});
	} else {
		var createtime = $("#createtime").val();
		var uuid = $("#uuid").val();
		url = path + "web/uppClassification.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"id" : id,
				"createtime" : createtime,
				"uuid" : uuid,
				"cname" : name,
				"state" : state,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getClassification(1);
				}else if(msg.status == 2){
					alert("该分类下有情景，不可修改状态为隐藏");
				}
			}
		});
	}
}

// 删除分类
function delClassification(id, cuuid) {
	$.ajax({
		type : "POST",
		url : path + "web/delClassification.action",
		data : {
			"id" : id,
			"cuuid" : cuuid
		},
		dataType : "json",
		success : function(msg) {
			if (msg.status == 1) {
				getClassification(1);
			} else if (msg.status == 2) {
				alert("该分类下有情景，请先删除场景！");
			}

		}
	});
}

/**
 * 标签模块的增删查改
 */

// 获取标签列表
function getLabel(currentPage) {
	var keyword = $("#label_name").val();
	$.ajax({
		type : "POST",
		url : path + "web/getLabel.action",
		data : {
			"currentPage" : currentPage,
			"keyword" : keyword
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 新增标签准备
function addLabelPro() {
	$.ajax({
		type : "POST",
		url : path + "web/addLabelPro.action",
		data : {},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 修改标签准备
function uppLabelPro(id) {
	$.ajax({
		type : "POST",
		url : path + "web/uppLabelPro.action",
		data : {
			"id" : id
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 新增修改标签
function addOrUppLabel() {
	var fileName = $("#fileName").val();
	var name = $("#title").val();
	var state = $("#status").val();
	var sort = $("#sort").val();
	var id = $("#id").val();
	var url = "";
	// flag=1为新增,flag=2为修改
	if (id == null || id == "" || id == "null") {
		url = path + "web/addLabel.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"imgurl" : fileName,
				"lname" : name,
				"state" : state,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getLabel(1);
				}
			}
		});
	} else {
		var createtime = $("#createtime").val();
		var uuid = $("#uuid").val();
		url = path + "web/uppLabel.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"imgurl" : fileName,
				"id" : id,
				"createtime" : createtime,
				"uuid" : uuid,
				"lname" : name,
				"state" : state,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getLabel(1);
				}
			}
		});
	}
}

// 删除
function delLabel(id) {
	$.ajax({
		type : "POST",
		url : path + "web/delLabel.action",
		data : {
			"id" : id
		},
		dataType : "json",
		success : function(msg) {
			if (msg.status == 1) {
				getLabel(1);
			}
		}
	});
}

/**
 * 情景模块的增删查改
 */
function getScene(currentPage) {
	var keyword = $("#Scene_name").val();
	$.ajax({
		type : "POST",
		url : path + "web/getScene.action",
		data : {
			"currentPage" : currentPage,
			"keyword" : keyword
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 新增情景准备
function addScenePro() {
	$.ajax({
		type : "POST",
		url : path + "web/addScenePro.action",
		data : {},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 修改情景准备
function uppScenePro(id) {
	$.ajax({
		type : "POST",
		url : path + "web/uppScenePro.action",
		data : {
			"id" : id
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 新增修改情景
function addOrUppScene() {
	var fileName = $("#fileNameth").val();
	var fileNameth = $("#fileName").val();
	alert(fileNameth);
	var name = $("#title").val();
	var state = $("#status").val();
	var sort = $("#sort").val();
	var id = $("#id").val();
	var lightadd = $("#lightadd").val();
	var rnum = $("#rnum").val();
	var gnum = $("#gnum").val();
	var bnum = $("#bnum").val();
	var effect = $("#effect").val();
	var classfi = $("#classfi").val();
	var scenebak = $("#scenebak").val();
	var url = "";
	if (id == null || id == "" || id == "null") {
		url = path + "web/addScene.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"thumbnail":fileNameth,
				"filename" : fileName,
				"sname" : name,
				"state" : state,
				"sort" : sort,
				"cuuid" : classfi,
				"lightadd" : lightadd,
				"rnum" : rnum,
				"gnum" : gnum,
				"bnum" : bnum,
				"effect" : effect,
				"scenebak" : scenebak
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getScene(1);
				}
			}
		});
	} else {
		var createtime = $("#createtime").val();
		var uuid = $("#uuid").val();
		var recommed = $("#recommed").val();
		url = path + "web/uppScene.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"thumbnail":fileNameth,
				"filename" : fileName,
				"id" : id,
				"createtime" : createtime,
				"uuid" : uuid,
				"sname" : name,
				"cuuid" : classfi,
				"state" : state,
				"sort" : sort,
				"lightadd" : lightadd,
				"rnum" : rnum,
				"gnum" : gnum,
				"bnum" : bnum,
				"effect" : effect,
				"scenebak" : scenebak,
				"recommed" : recommed
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getScene(1);
				}
			}
		});
	}
}

// 删除
function delScene(id) {
	$.ajax({
		type : "POST",
		url : path + "web/delScene.action",
		data : {
			"id" : id
		},
		dataType : "json",
		success : function(msg) {
			if (msg.status == 1) {
				getScene(1);
			}
		}
	});
}

/**
 * 关联界面的跳转js
 */
// 准备歌曲
function saveMusicPro(uuid) {
	$.ajax({
		type : "POST",
		url : path + "web/getMusicList.action",
		data:{
			"uuid":uuid	
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg);
		}
	});
}

//准备
function saveLabelListPro(keyword,uuid) {
	$.ajax({
		type : "POST",
		url : path + "web/saveLabelpro.action",
		data:{
			"keyword":keyword,
			"uuid":uuid
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg);
		}
	});
}

//准备情景
function saveScenePro(keyword) {
	$.ajax({
		type : "POST",
		url : path + "web/addRecommenPro.action",
		dataType : "html",
		data:{
			"keyword":keyword
		},
		success : function(msg) {
			$("#businessContent").html(msg);
		}
	});
}

/**
 * 搜索渠道的增删查改
 */
// 获取搜索渠道列表
function getSearchchannel(currentPage) {
	$.ajax({
		type : "POST",
		url : path + "web/getSearchchannel.action",
		data : {
			"currentPage" : currentPage
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

// 新增搜索渠道前的准备
function addSearchchannelPro() {
	$.ajax({
		type : "POST",
		url : path + "web/addSearchchannelPro.action",
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}


// 修改搜索渠道前的准备
function uppSearchchannelPro(id) {
	$.ajax({
		type : "POST",
		url : path + "web/uppSearchchannelPro.action",
		data : {
			"id" : id
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

//删除搜索渠道信息
function delSearchchannel(id, cuuid) {
	$.ajax({
		type : "POST",
		url : path + "web/delSearchchannel.action",
		data : {
			"id" : id,
			"cuuid" : cuuid
		},
		dataType : "json",
		success : function(msg) {
			if (msg.status == 1) {
				getSearchchannel(1);
			} 
		}
	});
}

// 新增修改搜索渠道
function addOrUppSearchchannel() {
	var name = $("#title").val();
	var state = $("#status").val();
	var sort = $("#sort").val();
	var id = $("#id").val();
	var apiurl = $("#apiurl").val();
	var url = "";
	if (id == null || id == "" || id == "null") {
		url = path + "web/addSearchchannel.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"apiurl":apiurl,
				"sname" : name,
				"isdel" : state,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getSearchchannel(1);
				}
			}
		});
	} else {
		var createtime = $("#createtime").val();
		var uuid = $("#uuid").val();
		url = path + "web/uppSearchchannel.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"id" : id,
				"apiurl":apiurl,
				"createtime" : createtime,
				"sname" : name,
				"isdel" : state,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getSearchchannel(1);
				}
			}
		});
	}
}


//修改搜索渠道排序号
function recommenscSort(sort,id){
	if(sort.trim().length==0){
		alert("排序号不可为空");
		$("#sortnum").focus();
	}else{
		$.ajax({
			type : "POST",
			url : path + "web/uppRecommenscSort.action",
			data : {
				"id":id,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getSearchchannel(1);
				}
			}
		});
	}
}

/**
 * 轮播图的增删查改
 */
// 获取轮播图列表
function getSlide(currentPage) {
	var keyword = $("#slide_name").val();
	$.ajax({
		type : "POST",
		url : path + "web/getSlide.action",
		data : {
			"currentPage" : currentPage,
			"keyword":keyword
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

//新增轮播图的准备
function addSlidePro() {
	$.ajax({
		type : "POST",
		url : path + "web/addSlidePro.action",
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}


// 修改轮播图的准备
function uppSlidePro(id) {
	$.ajax({
		type : "POST",
		url : path + "web/uppSlidePro.action",
		data : {
			"id" : id
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

//删除轮播图
function delSlide(id, cuuid) {
	$.ajax({
		type : "POST",
		url : path + "web/delSlide.action",
		data : {
			"id" : id,
			"cuuid" : cuuid
		},
		dataType : "json",
		success : function(msg) {
			if (msg.status == 1) {
				getSlide(1);
			} 
		}
	});
}

// 新增修改轮播图
function addOrUppSlide() {
	var fileName = $("#fileName").val();
	var name = $("#title").val();
	var state = $("#status").val();
	var sort = $("#sort").val();
	var id = $("#id").val();
	var contenturl = $("#contenturl").val();
	var url = "";
	if (id == null || id == "" || id == "null") {
		url = path + "web/addSlide.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"photourl":fileName,
				"lname" : name,
				"isdel" : state,
				"sort" : sort,
				"contenturl":contenturl
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getSlide(1);
				}
			}
		});
	} else {
		var createtime = $("#createtime").val();
		url = path + "web/uppSlide.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"id" : id,
				"photourl":fileName,
				"contenturl":contenturl,
				"createtime" : createtime,
				"lname" : name,
				"isdel" : state,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getSlide(1);
				}
			}
		});
	}
}

//修改搜索渠道排序号
function recommenslSort(sort,id){
	if(sort.trim().length==0){
		alert("排序号不可为空");
		$("#sortnum").focus();
	}else{
		$.ajax({
			type : "POST",
			url : path + "web/uppRecommenslSort.action",
			data : {
				"id":id,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getSlide(1);
				}
			}
		});
	}
}

/**
 * 音乐入口的增删查改
 */
// 获取音乐入口列表
function getEntrance(currentPage) {
	$.ajax({
		type : "POST",
		url : path + "web/getEntrance.action",
		data : {
			"currentPage" : currentPage
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

//新增音乐入口的准备
function addEntrancePro() {
	$.ajax({
		type : "POST",
		url : path + "web/addEntrancePro.action",
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}


// 修改音乐入口的准备
function uppEntrancePro(id) {
	$.ajax({
		type : "POST",
		url : path + "web/uppEntrancePro.action",
		data : {
			"id" : id
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
}

//删除音乐入口
function delEntrance(id, cuuid) {
	$.ajax({
		type : "POST",
		url : path + "web/delEntrance.action",
		data : {
			"id" : id,
			"cuuid" : cuuid
		},
		dataType : "json",
		success : function(msg) {
			if (msg.status == 1) {
				getEntrance(1);
			} 
		}
	});
}

// 新增修改音乐入口
function addOrUppEntrance() {
	var fileName = $("#fileName").val();
	var name = $("#title").val();
	var state = $("#status").val();
	var sort = $("#sort").val();
	var id = $("#id").val();
	var contenturl = $("#contenturl").val();
	var url = "";
	if (id == null || id == "" || id == "null") {
		url = path + "web/addEntrance.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"photourl":fileName,
				"ename" : name,
				"isdel" : state,
				"sort" : sort,
				"contenturl":contenturl
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getEntrance(1);
				}
			}
		});
	} else {
		var createtime = $("#createtime").val();
		url = path + "web/uppEntrance.action";
		$.ajax({
			type : "POST",
			url : url,
			data : {
				"id" : id,
				"photourl":fileName,
				"contenturl":contenturl,
				"createtime" : createtime,
				"ename" : name,
				"isdel" : state,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getEntrance(1);
				}
			}
		});
	}
}

//修改音乐入口排序号
function recommenenSort(sort,id){
	if(sort.trim().length==0){
		alert("排序号不可为空");
		$("#sortnum").focus();
	}else{
		$.ajax({
			type : "POST",
			url : path + "web/uppRecommenenSort.action",
			data : {
				"id":id,
				"sort" : sort
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getEntrance(1);
				}
			}
		});
	}
}
