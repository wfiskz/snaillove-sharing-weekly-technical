$(function() {
	addOneLabel();
	deleteOneLabel();
	addOneRecommen();
	delOneRecommen();
	getAllMusic();
	addOneMusic();
	delOneMusic();
});

/**
 * 情景标签
 */
// 给情景增加一个标签
function addOneLabel() {
	$(".select_alllabel").bind("dblclick", function() {
		var suuid = $("#suuid").val();
		var luuid = $(this).val();
		var lname = $(this).html();
		$.ajax({
			type : "POST",
			url : path + "web/saveLabel.action",
			data : {
				"suuid" : suuid,
				"luuid" : luuid,
				"lname" : lname
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					saveLabelListPro('', suuid);
				}
			}
		});
	});
}

// 删除一个关联标签
function deleteOneLabel() {
	$(".delete_label").bind("dblclick", function() {
		var id = $(this).val();
		var suuid = $("#suuid").val();
		$.ajax({
			type : "POST",
			url : path + "web/deleteLabel.action",
			data : {
				"id" : id
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					saveLabelListPro('', suuid);
				}
			}
		});
	});
}

/**
 * 推荐情景
 */
// 增加一个推荐情景
function addOneRecommen() {
	$(".select_scene").bind("dblclick", function() {
		var uuid = $(this).val();
		var sname = $(this).html();
		$.ajax({
			type : "POST",
			url : path + "web/addRecommen.action",
			data : {
				"uuid" : uuid,
				"sname" : sname
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					saveScenePro('');
				}
			}
		});
	});
}

// 增加一个推荐情景
function delOneRecommen() {
	$(".delete_scene").bind("dblclick", function() {
		var id = $(this).val();
		$.ajax({
			type : "POST",
			url : path + "web/delRecommen.action",
			data : {
				"id" : id
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					saveScenePro('');
				}
			}
		});
	});
}

/**
 * 情景歌曲
 */
// 加载喜马拉雅歌曲列表
function getximamusic() {
	$.ajax({
		type : "POST",
		url : path + "web/getXimaMusic.action",
		data : {
			"name" : $("#ximamusic_name").val()
		},
		dataType : "json",
		success : function(msg) {
			var option = "";
			$.each(msg, function(index, music) {
				option += "<option class='select_music' value='"
						+ music.musiccher + "," + music.musicurl + ","
						+ music.musictype + "," + music.musicname + ","
						+ $("#uuid").val() + "'>(" + music.musiccher + ")"
						+ music.musicname + "</option>";
			});
			$("#source_select5").html(option);
		}
	});
}

// 加载改情景已经绑定的歌曲
function getAllMusic() {
	$.ajax({
		type : "POST",
		url : path + "web/getAllMusic.action",
		data : {
			"uuid" : $("#uuid").val()
		},
		dataType : "json",
		success : function(msg) {
			var option = "";
			$.each(msg, function(index, music) {
				debugger;
				option += "<option class='delete_music' value='" + music.id
						+ "'>" ;
				option+=music.musicname;
				if(music.musictype==1){
					option+="(领芯音乐库)";
				}else{
					option+="(喜马拉雅库)";
				}
				option+="</option>";
			});
			$("#source_select6").html(option);
		}
	});
}

//加载领芯库歌曲列表
function getlingxinmusic(){
	$.ajax({
		type : "POST",
		url : path + "web/getlingxinMusic.action",
		data : {
			"sid" : $("#lingxin_name").val()
		},
		dataType : "json",
		success : function(music) {
			if(music.musiccher!=null){
				$("#source_select5").html("<option class='select_music' value='"
						+ music.musiccher + "," + music.musicurl + ","
						+ music.musictype + "," + music.musicname + ","
						+ $("#uuid").val() + "'>(" + music.musiccher + ")"
						+ music.musicname + "</option>");
			}
		}
	});
}



// 增加喜马拉雅情景歌曲
function addOneMusic() {
	$(".select_music").die().live("dblclick", function() {
		$(this).hide();
		var str = $(this).val();
		$.ajax({
			type : "POST",
			url : path + "web/saveMusic.action",
			data : {
				"str" : str
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == 1) {
					getAllMusic();
				}
			}
		});
	});
}

// 删除喜马拉雅情景歌曲
function delOneMusic() {
	$(".delete_music").die().live("dblclick", function() {
		$(this).hide();
		var id = $(this).val();
		$.ajax({
			type : "POST",
			url : path + "web/delMusic.action",
			data : {
				"id" : id
			},
			dataType : "json",
			success : function(msg) {
				//重新加载一遍
				$.ajax({
					type : "POST",
					url : path + "web/getXimaMusic.action",
					data : {
						"name" : $("#ximamusic_name").val()
					},
					dataType : "json",
					success : function(msg) {
						var option = "";
						$.each(msg, function(index, music) {
							option += "<option class='select_music' value='"
									+ music.musiccher + "," + music.musicurl + ","
									+ music.musictype + "," + music.musicname + ","
									+ $("#uuid").val() + "'>(" + music.musiccher + ")"
									+ music.musicname + "</option>";
						});
						$("#source_select5").html(option);
					}
				});
			}
		});
	});
}