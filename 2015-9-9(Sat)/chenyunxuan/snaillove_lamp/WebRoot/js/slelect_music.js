$(function(){
	hideAll();
	getMusicList();
	getXimalayaMusic();
	getXimalayaZJ();
})


//隐藏所有图标
function hideAll(){
	//隐藏领芯的搜索
	$(".lingxin").hide();
	//隐藏喜马拉雅的搜索
	$(".xima").hide();
	//隐藏喜马拉雅选择歌曲搜索或者主机选择的按钮
	$("#xima").hide();
	$("#xima option").eq(0).attr("selected","selected");
	//喜马拉雅歌曲分类列表
	$("#ximafl").hide();
}

//主要的下拉框选择事件
function getMusicList(){
	$("#type").bind("change",function(){
		$("#lingxin_name").val("");
		$("#ximamusic_name").val("");
		if($(this).val()==2){
			hideAll();
			$(".xima").show();
			$("#xima").show();
		}else if($(this).val()==1){
			hideAll();
			$(".lingxin").show();
		}else{
			hideAll();
		}
	});
}

//喜马拉雅声音
function getXimalayaMusic(){
	$("#xima").bind("change",function(){
		if($(this).val()==2){
			$("#ximafl").show();
			$(".xima").hide();
			//加载喜马拉雅歌曲分类列表
			$.ajax({
				type : "POST",
				url : path + "web/getXimaFL.action",
				dataType : "json",
				success : function(msg) {
					var option="<option  value='0'>请选择分类</option>";
					$.each(msg,function(index,fl){
						option+="<option value='"+fl.id+"'>"+fl.name+"</option>";
					});
					$("#ximafl").html(option);
				}
			});
		}else{
			$("#ximafl").hide();
			$(".xima").show();
		}
	});
}

//喜马拉雅专辑
function getXimalayaZJ(){
	$("#ximafl").live("change",function(){
		alert($(this).val());
	});
}

