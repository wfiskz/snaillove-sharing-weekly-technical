$().ready(function() {
	appContent(1);
});


/*********************************************************************
 *                          应用排行榜管理
 * @param {Object} currentPage
 ***********************************************************************/

function appContent(currentPage) {
	var keyword = $("#app_name").val();

	if (keyword == "应用名称") {
		keyword = "";
	}

	$.ajax( {
		type : "POST",
		url : "/music/web/findAllApplication.action",
		data : {

			"currentPage" : currentPage,
			"keyword" : encodeURI($.trim(keyword)),
			"pageSize" : 10

		},
		dataType : "html",
		success : function(msg) {
			$("#appContent").html(msg)
		}
	});
}



function addapppre() {
	$("#addapppre").animate( {
		left : $(document).width() - 1000,
		top : 100,
		opacity : "show"
	}, "slow");
}


function addapplicationpre1() {

	$.ajax( {
		type : "POST",
		url : "/music/web/addAppPrecAtion.action",
		dataType : "html",
		success : function(msg) {
			$("#appContent").html(msg)
		}
	});
}

function addapplicationpre() {
$("#addapp").animate( {
		left : $(document).width() - 1300,
		top : -300,
		opacity : "show"
	}, "slow");
}




function closeaddpop() {
	$("#app").animate( {
		opacity : "hide"
	}, "slow");
}



function addVersionAndPic() {
	//  alert("添加");
	var name = $("#name_version").val();

	if (name == null || name == "") {

		alert("请输入名称！");

		$("#name_version").focus();

		$("#addApp").removeattr("disabled");

		return;
	}
	var number = $("#number").val();
	if (number == null || number == "") {

		alert("请输入版本号11！");
		$("#number").focus();
		$("#add_Version").removeattr("disabled");
		return;
	}

	var order_ = $("#order_").val();
	if (order_ == null || order_ == "") {
		alert("请输入排序编号！");
		$("#order_").focus();
		$("#add_Version").removeattr("disabled");
		return;
	}
	var url_ = $("#url").val();
	


	
	var pics = $("#fileName").val();
	var apk = $("#apkfileName").val();
	alert(number + "---" + url_ + "---" + name + "---"
			+  + "---" + pics + "----" + apk);
	$.ajax( {
		type : "POST",
		url : "/music/web/addVersion.action",
		data : {
			"name" : name,
			"number" : number,
			"order_" : order_,
			"url_" : url_,
			"pics" : pics,
			"apk" : apk
		},
		dataType : "json",
		success : function(data) {
			if (data.status == 1) {
				alert("添加成功！");

				$("#closeAddApp").click();
				appContent(1);
			}
			if (data.status == 2) {
				alert("未知原因添加失败！");
			}
		}
	});
}

function delApp(id, currentPage) {
	//	alert(id+"-------"+currentPage);
	if (confirm("确定要删除该条记录吗?")) {
		$.ajax( {
			type : "POST",
			url : "/music/web/deleteApplication.action",
			data : {
				"id" : id
			},
			dataType : "json",
			success : function(data) {
				if (data.status == 1) {
					alert("删除成功！");
					appContent(1);
				} else {
					alert("删除失败！");
				}
			}
		});
	}
}



/**
 * 修改
 * @param {Object} currentPage
 */

function modifypreApp(id) {

	$.ajax( {
		type : "POST",
		url : "/music/web/modifyApplicationPre.action",
		data : {
			"id" : id
		},
		dataType : "html",
		success : function(msg) {
			
			$("#ModifyBusiness").html(msg)
			
			$("#modifyApp_pre").animate( {
		left : $(document).width() - 1800,
		top : -300,
		opacity : "show"
	}, "slow");

		}
	});
}
function closemidofypop() {
	
	$("#modifyApp_pre").animate( {
		opacity : "hide"
			
	}, "slow");
	flushto();
}

function modifypreApp1(id) {

	$.ajax( {
		type : "POST",
		url : "/music/web/modifyApplicationPre.action",
		data : {
			"id" : id
		},
		dataType : "html",
		success : function(msg) {
			
			$("#businessContent").html(msg)

		}
	});
}

/**
 * 修改
 * @return {TypeName} 
 */
function modify_App() {

	var id = $("#mid").val();

	var name = $("#mname_version").val();

	if (name == null || name == "") {

		alert("请输入名称！");

		$("#mname_version").focus();

		$("#addApp").removeattr("disabled");

		return;
	}
	var number = $("#mnumber").val();
	if (number == null || number == "") {

		alert("请输入版本号11！");
		$("#mnumber").focus();
		$("#add_Version").removeattr("disabled");
		return;
	}

	var order_ = $("#morder_").val();
	if (order_ == null || order_ == "") {
		alert("请输入关键字！");
		$("#morder_").focus();
		$("#add_Version").removeattr("disabled");
		return;
	}
	var url_ = $("#murl").val();
	


	
	var pics = $("#fileName").val();
	var apk = $("#apkfileName").val();
//	alert(number + "---" + url_ + "---" + name + "---"
//			+  + "---" + pics + "----" + apk);

	$.ajax( {
		type : "POST",
		url : "/music/web/modifyApplication.action",
		data : {
			"id" : id,
			"name" : name,
			"number" : number,
			"order_" : order_,
			"url_" : url_,
			"pics" : pics,
			"apk" : apk

		},
		dataType : "json",
		success : function(data) {
			if (data.status == 1) {
				appContent(1);
				alert("修改成功！");
				
			} else {
				alert("修改失败！");
			}
		}
	});

}

