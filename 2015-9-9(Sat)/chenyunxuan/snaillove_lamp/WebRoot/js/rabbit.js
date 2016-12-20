/*************************
 *
 * @Desc: 相关js信息
 *
 *************************/
var Basic =
        {
            jsPath: null,
            cssPath: null,
            imgPath: null,
            path: null,
            uploadPath: null,
            confirmDel: function()
            {
                if (confirm("确定要删除!")) {
                    return true;
                } else {
                    return false;
                }
            },
            selectAll: function()
            {
                $("input[name='cid']").each(function(index, element) {
                    this.checked = !this.checked;
                });
            },
            batch: function(url)
            {
                var ids = "";
                $("input[name='cid']").each(function(index, element) {
                    if (this.checked == true) {
                        var val = $(this).val();
                        ids += val + ",";
                    }
                });
                if (ids != "") {
                    ids = ids.substr(0, ids.length - 1);
                    $.post(url, {"sign": $("#sign").val(), "ids": ids},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1) {
                                window.location.reload();
                            } else {
                                alert(data.msg);
                            }
                        } catch (e) {
                            // alert("JSON解析错误");
                        }
                    });
                } else {
                    alert("请选择信息!");
                }
            }
        }
/*
 *  @验证邮箱电话等函数
 */
var Check =
        {
            /*
             * @去空格回车换行
             */
            trim: function(str)
            {
                str = str.replace(/[ ]/g, "");
                str = str.replace(/[\r\n]/g, "<BR>");
                return str;
            },
            /*
             * @去左空格
             */
            ltrim: function(s) {
                return s.replace(/(^\s*)/, "");
            },
            /*
             * @去右空格
             */
            rtrim: function(s) {
                return s.replace(/(\s*$)/, "");
            }
        }



var Login =
        {
            execution: function()
            {
                var UserName = $("#UserName").val();
                var Password = $("#Password").val();
                if (UserName != "" && Password != "") {
                    var url = Basic.path + "/Login/AjaxExecution.html";
                    $.post(url, {"name": UserName, "password": Password},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + '/Index/index.html';
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            //  // $("#error").html("JSON解析错误");
                        }
                    });
                } else {
                    $("#error").html("用户名或密码不能为空");
                }
            }
        }
/*******************************************************************
 * 
 * @param {Object} value  专题推荐
 **********************************************************************/
var Recommend =
        {
	      /**
	       * 
	       * @param {Object} value  表示在自定义的推荐表中的id
	       */
 	experts: function(id,currentPage) {
	
	var searchclass = $("#searchclass").val();
	var searchage = $("#searchage").val();
	var keyword = $("#title").val();

	$.ajax( {
		type : "POST",
		url : "/mother/web/getWebRecommendList.action",
		data : {
			"keyword" :keyword ,
			"searchclass" : searchclass ,
			"searchage" : searchage,
			"currentPage" : currentPage,
			"pageSize" : 10,
			"id" : id
			
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
   },
   updateRecommend:function(tbrecommend_id,recommendid){
	
	$.ajax( {
		type : "POST",
		url : "/mother/web/modifyRecommend.action",
		data : {
		    "tbrecommend_id":tbrecommend_id,
			"recommendid" : recommendid
		},
		dataType : "json",
		success : function(data) {
			
				if (data.status == 1) {
				alert("修改成功！");
			
				getZjtj();
			} else {
				alert("修改失败！");
			}
			
		}
	 });
	   
   },
   getRecommendList2Local: function(currentPage) {
	
	var searchclass = $("#searchclass").val();
	var searchage = $("#searchage").val();
	var keyword = $("#title").val();

	$.ajax( {
		type : "POST",
		url : "/mother/web/getRecommendList2Local.action",
		data : {
			"keyword" :keyword ,
			"searchclass" : searchclass ,
			"searchage" : searchage,
			"currentPage" : currentPage,
			"pageSize" : 10
			
			
		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
	});
   },
   //添加到本地
   addLocalRecommend:function(tbrecommend_id){
	   
	   	$.ajax( {
		type : "POST",
		url : "/mother/web/addLocalRecommend.action",
		data : {
		    "tbrecommend_id":tbrecommend_id
			
		},
		dataType : "json",
		success : function(data) {
			
				if (data.status == 1) {
				alert("添加成功！");
				Recommend.getLocalRecommend();
				
			} else {
				alert("添加失败！");
			}
			
		}
	 });
	   
	   
   },
   //删除本地
   delLocal:function(recommendid){
	    if (confirm("确定要删除!")) {
	   
	   	$.ajax( {
		type : "POST",
		url : "/mother/web/delLocalRecommend.action",
		data : {
		    "recommendid":recommendid
			
		},
		dataType : "json",
		success : function(data) {
			
				if (data.status == 1) {
//				alert("删除成功！");
				Recommend.getLocalRecommend();
				
			} else {
				alert("删除失败！");
			}
			
		}
	 });
	   }else{
		   
		   return false;
	   }
	   
   },
   getLocalRecommend:function(){
	
		
		$.ajax( {
			 
		
					type : "POST",
					url : "/mother/web/getAllLocalRecommend.action",
					data : {
			
					},
					dataType : "html",
					success : function(msg) {
						$("#businessContent").html(msg)
					}
				});
	   
   },
   
   
   
   
   addexperts: function(mid) {
        var value = $('#val').val();
        window.location.href = Basic.path + '/SysRecommend/getfile.html?id=' + mid + '&val=' + value;
    },
    
	   etexperts: function(value) {
	
                window.location.href = Basic.path + '/SysRecommend/recommend.html?val=' + value;
            },
  
    save: function()
            {
                var Title = $("#title").val();
                var Id = $("#id").val();
                var Type = $('#type').val();
                var Column_id = $("#column_id").val();
                var coverpathbig = $("#pathbig").val();
                var path_oldbig = $('#path_oldbig').val();
                var Description = $("#description").val();
                var Class_id = $("#class_id").val();
                var Agesection = $("#agesection_id").val();
                var Status = $("#status").val();
                var path_old = $('#path_old').val();
                var coverpath = $('#path').val();
                var music_ids = '0';
                var special_ids = '0';
                var isok = true;
                var msg;
                if (Check.trim(Title) == "") {
                    $("#error").html("标题不能为空!");
                    isok = false;
                    return false;
                }
                if (parseInt(Class_id) <= 0)
                {
                    $("#error").html("请选择栏目分类!");
                    isok = false;
                    return false;
                }
                $("#target_select1 option").each(function(index, element) {
                    if (Type == 1) {
                        var msuic_id = $(this).val();
                        music_ids += music_ids == "" ? msuic_id : "," + msuic_id;
                    } else {
                        var special_id = $(this).val();
                        special_ids += special_ids == "" ? special_id : "," + special_id;
                    }

                });
                if (music_ids == "0" && special_ids == "0")
                {
                    $("#error").html("请选择推荐的单曲或专辑!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/PcColumnRecommend/ajaxSave.html";
                    $.post(url, {"id": Id, "title": Title, "type": Type, "column_id": Column_id, "coverpath_big": coverpathbig, "path_oldbig": path_oldbig, "description": Description, "class_id": Class_id, "agesection_id": Agesection, "status": Status, "special_ids": special_ids, "music_ids": music_ids, "path_old": path_old, "coverpath": coverpath},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/PcColumnRecommend/index.html?columnId=" + Column_id;
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            change: function() {
                var type = $('#type').val();
                var html = '';
                if (type == 1) {
                    html += '单曲名称: &#12288;<input type="text" name="s_name" id="s_name" style="width:160px; height:25px; font-size:13px;"/> &#12288;<input type="button" value="搜索" onclick="Recommend.searchMusic()"/>';
                } else {
                    html += '专辑名称: &#12288;<input type="text" name="s_name" id="s_name" style="width:160px; height:25px; font-size:13px;"/> &#12288;<input type="button" value="搜索" onclick="Recommend.searchSpecial()"/>';
                }
                $('#ms').html(html);
            },
            searchMusic: function()
            {
                var s_name = $("#s_name").val();
                var column_id = $("#column_id").val();
                var url = Basic.path + "/PcColumnRecommend/ajaxSearchMusic.html";
                $.post(url, {"name": s_name, "column_id": column_id},
                function(data) {
                    try {
                        var data = jQuery.parseJSON(data);
                        var list = data.list;
                        if (data.ret == 1 && list != null && list != undefined) {
                            var html = "";
                            for (var i = 0; i < list.length; i++) {
                                html += '<option value="' + list[i].id + '">' + list[i].name + '</option>';
                            }
                            $("#source_select1").html(html);
                        } else {
                            alert("没有相关单曲!");
                        }
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                });
            },
            searchSpecial: function() {
                var s_name = $("#s_name").val();
                var column_id = $("#column_id").val();
                var url = Basic.path + "/PcColumnRecommend/ajaxSearchSpecial.html";
                $.post(url, {"name": s_name, "column_id": column_id},
                function(data) {
                    try {
                        var data = jQuery.parseJSON(data);
                        var list = data.list;
                        if (data.ret == 1 && list != null && list != undefined) {
                            var html = "";
                            for (var i = 0; i < list.length; i++) {
                                html += '<option value="' + list[i].id + '">' + list[i].name + '</option>';
                            }
                            $("#source_select1").html(html);
                        } else {
                            alert("没有相关专辑!");
                        }
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                });
            },
           
            
          
            addetexperts: function(mid) {
                var value = $('#val').val();
                window.location.href = Basic.path + '/SysRecommend/getfile.html?id=' + mid + '&val=' + value;
            },
            Return: function(column_id) {
                window.location.href = Basic.path + '/PcColumnRecommend/index.html?columnId=' + column_id;
            },
            musicReturn: function() {
                window.location.href = Basic.path + '/SysRecommend/ExpertsIndex.html';
            },
        }
/***************************************************************************
 * 
 * @param {Object} column_id        单曲
 * @param {Object} banner_id
 *****************************************************************************/
var pcColumn =
        {
 bannerjump: function(column_id, banner_id) {
           
	$.ajax( {
		type : "GET",
		url : "/mother/web/updateBannerPro.action",
		data : {

			"columnId" : column_id,
			"banner_id" : banner_id

		},
		dataType : "html",
		success : function(msg) {
			$("#businessContent").html(msg)
		}
			});
    },
 bannerSetInterval: function(page) {
                var url = "/mother/web/getBannerList.action";
                var column_id = $('#column_id').val();
                var total = '';
                $.post(url, {"column_id": column_id, 'page': page},
                function(data) {
                    try {
                        var data = jQuery.parseJSON(data);
                        var pageprev = parseInt(data.page) - 1;
                        if (pageprev < 1) {
                            pageprev = data.pagetotal;
                        }
                        var pagenext = parseInt(data.page) + 1;
                        if (pagenext > data.pagetotal) {
                            pagenext = 1;
                        }
                        var html = '';
                        $(data.banners).each(function(i, item) {
                            html += '<input type="hidden" id="banner_id" name="banner_id"  value="' + item.id + '"/><img src="' + item.path + '" id="bannerPath" style="height:170px; width:400px; border:3px solid #CCC;" onclick="pcColumn.bannerjump(' + data.column_id + ',' + item.id + ')">';
                        })
                        var pagenext = '<div  style="width:100px;height:100px;" onclick="pcColumn.bannerSetInterval(' + pagenext + ')"><img src="/mother/images/icon_xiangyou.png" style="margin-top:50px;" /></div>';
                        var pageprev = '<div  style="width:100px;height:100px;" onclick="pcColumn.bannerSetInterval(' + pageprev + ')"><img src="/mother/images/icon_xiangzuo.png" style="margin-top:50px;" /></div>'
                        for (var i = 1; i <= data.pagetotal; i++) {
                            if (data.page == i) {
                                total += '<span><img src="' + Basic.imgPath + '/point_hover.png"/></span>' + '&#12288';
                            } else {
                                total += '<span ><img src="' + Basic.imgPath + '/point.png" /></span>' + '&#12288';
                            }
                        }
                        $('#bannerindex').html(html);
                        $('#pagenext').html(pagenext);
                        $('#pageprev').html(pageprev);
                        $('#total').html(total);

                    } catch (e) {
                        //// $("#error").html("JSON解析错误");
                    }
                });
            },
                
     updateBanner: function(linktype)
            {
            	
                var Link = $("#link").val();
                var Sort = $("#sort").val();
                var Column_id = $("#column_id").val();
                var linktype = $('#linktype').val();
                var Id = $("#id").val();
                var Path = $("#fileName").val();
                var Path_old = $("#path_old").val();
                var Status = $("#status").val();
                var isok = true;
                var myDate = new Date();
                var msg;
                
        
                if (Check.trim(Path) == "") {
                    $("#error").html("请上传图片!");
                    isok = false;
                    return false;
                }
                if (parseInt(Link) <= 0) {
                    $("#error").html("请填写链接地址!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = "/mother/web/updateBanner.action";
                    $.post(url, {"id": Id, "path": Path, "path_old": Path_old, "link": Link, "sort": Sort, "status": Status, "column_id": Column_id, linktype: linktype},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                            	pcColumn.getBannerListContent();
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }
            }, 
            addpre:function(){
            	
            	$.ajax( {
            			 
            		
								type : "POST",
								url : "/mother/web/addPro.action",
								data : {
									"status":status
								},
								dataType : "html",
								success : function(msg) {
									$("#businessContent").html(msg)
								}
							});
            	
            	
            },
            
   saveBanner: function()
    {
            	
        var ColumnId = $('#column_id').val();
        var Sort = $("#sort").val();
        var Link = $("#link").val();
        var linktype = $('#linktype').val();
        var Path = $("#fileName").val();
        var Status = $("#status").val();
        var isok = true;
        var msg;
        if (Check.trim(Path) == "") {
            $("#error").html("请上传图片!");
            isok = false;
            return false;
        }
        if (parseInt(Link) <= 0) {
            $("#error").html("请填写链接地址!");
            isok = false;
            return false;
        }
//        alert("path---->" +Path+ "link---->"+Link+ "sort--->"+Sort+ "status--->"+ Status+"column_id---》"+ColumnId+ "linktype---》"+ linktype);
       if (isok == true) {
            var url = "/mother/web/addBanner.action";
            $.post(url, { "path": Path, "link": Link, "sort": Sort, "status": Status, "column_id": ColumnId, "linktype": linktype},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                    	pcColumn.getBannerListContent();
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    // $("#error").html("JSON解析错误");
                }
            }, 'josn');
        }
    },
    getBannerListContent :function(){
            		var status= $("#search").val();
            			
            		$.ajax( {
            			 
            		
								type : "POST",
								url : "/mother/web/getBannerWebList.action",
								data : {
									"status":status
								},
								dataType : "html",
								success : function(msg) {
									$("#businessContent").html(msg)
								}
							});
            	
            },
 classBymusic: function(class_id) {
                var url = Basic.path + "/PcColumnClass/classByMusic.html";
                $.post(url, {"class_id": class_id},
                function(data) {
                    try {
                        var data = jQuery.parseJSON(data);
                        var html = ' <table  border="1" cellspacing="0" cellpadding="0">';
                        html += '<tr><td align="center">名称</td><td align="center">英文名称</td><td align="center" >评论次数</td><td  align="center" >下载次数</td></tr>';
                        if (data.ret == 1) {
                            $(data.list).each(function(i, item) {
                                html += '<tr><td width="100px;" align="center">' + item.name + '</td><td width="100" align="center" >' + item.name_en + '</td><td align="center" width="118" height="32">' + item.comment + '</td><td width="100" align="center">' + item.download + '</td></tr>';
                            })
                            html += " </table>";
                            $('#music').html(html);
                            $("#PcColumn").animate({left: $(document).width() - 800, top: -$(document).height() + 100, opacity: "show"}, "slow");
                        } else {
                            alert(data.msg);
                        }

                    } catch (e) {
                        //// $("#error").html("JSON解析错误");
                    }
                });
            },
 Recommendzt: function(column_id, val) {
                var url = Basic.path + "/PcColumnRecommend/recommendBycolumn.html";
                $.post(url, {"column_id": column_id},
                function(data) {
                    try {
                        var status = '';
                        var data = jQuery.parseJSON(data);
                        var html = ' <table  border="1" cellspacing="0" cellpadding="0">';
                        html += '<tr><td></td><td align="center">图片</td><td align="center" >名称</td><td  align="center" >年龄段</td><td align="center">状态</td></tr>';
                        if (data.ret == 1) {
                            $(data.list).each(function(i, item) {
                                if (item.name == null) {
                                    item.name = '无';
                                }
                                if (item.status == 1) {
                                    status = "显示";
                                } else {
                                    status = "隐藏";
                                }
                                html += '<tr><td width="100px;" align="center"><input class="input" style="font-size:10px;"  type="button" onclick="pcColumn.adderecommend(' + item.id + ',' + column_id + ',' + val + ',' + "'zt'" + ',' + "'s'" + ')" value="设置到当前位"/></td><td width="100" align="center" ><img src="' + item.coverpath + '" style="height:50px; width:50px; border:3px solid #CCC;"></td><td align="center" width="118" height="32">' + item.title + '</td><td width="100" align="center">' + item.name + '</td><td width="50" align="center">' + status + '</td></tr>';
                            })
                            html += " </table>";
                            $('#music').html(html);
                            $("#PcColumn").animate({left: $(document).width() - 800, top: -$(document).height() + 300, opacity: "show"}, "slow");
                        } else {
                            $("#error").html(data.msg);
                        }

                    } catch (e) {
                        //// $("#error").html("JSON解析错误");
                    }
                });
            },
 Recommendzj: function(column_id, val, agename, type, page) {
                var url = Basic.path + "/SysSpecial/columnSpecail.html";
                var specialname = $('#sname').val();
                $.post(url, {"column_id": column_id, "agename": agename, "page": page, "specialname": specialname},
                function(data) {
                    try {
                        var status = '';
                        var data = jQuery.parseJSON(data);
                        var pageprev = parseInt(data.page) - 1;
                        if (pageprev < 1) {
                            pageprev = data.pagetotal;
                        }
                        var pagenext = parseInt(data.page) + 1;
                        if (pagenext > data.pagetotal) {
                            pagenext = 1;
                        }
                        var html = ' <table  border="1" cellspacing="0" cellpadding="0">';
                        html += '<tr><td></td><td align="center">图片</td><td align="center" >名称</td><td  align="center" >年龄段</td><td align="center">状态</td></tr>';
                        if (data.ret == 1) {
                            $(data.special).each(function(i, item) {
                                if (item.name == '') {
                                    item.name = item.name_en;
                                }
                                if (item.title == null) {
                                    item.title = '无';
                                }
                                if (item.status == 1) {
                                    status = "显示";
                                } else {
                                    status = "隐藏";
                                }
                                html += '<tr><td width="100px;" align="center"><input class="input" style="font-size:10px;"  type="button" onclick="pcColumn.adderecommend(' + item.id + ',' + column_id + ',' + val + ',' + "'" + type + "'" + ',' + "'s'" + ')" value="设置到当前位"/></td><td width="100" align="center"  onclick="Music.jumpSpecialFrom(' + item.id + ')"><img src="' + Basic.image + '/' + item.coverpath + '" style="height:50px;width:50px; border:3px solid #CCC;"/></td><td align="center" width="118" height="32">' + item.name + '</td><td width="100" align="center">' + item.title + '</td><td  width="50" align="center">' + status + '</td></tr>';
                            })
                            html += " </table>";
                            $('#specials').html(html);
                            $('#spageing').html(data.page + '/' + data.pagetotal);
                            if (agename == '') {
                                agename = "''";
                            } else {
                                agename = "'" + agename + "'";
                            }
                            type = "'" + type + "'";
                            $('#spage').html('<a id="pageprev" onclick="pcColumn.Recommendzj(' + column_id + ',' + val + ',' + agename + ',' + type + ',' + pageprev + ')">上一页 </a>&#12288;<a  id="pagenext" onclick="pcColumn.Recommendzj(' + column_id + ',' + val + ',' + agename + ',' + type + ',' + pagenext + ')">下一页</a>');
                            $('#specialByname').html('<input type="text" id="sname" class="input" value="' + data.specialname + '" /><input type="button" onclick=" pcColumn.Recommendzj(' + column_id + ',' + val + ',' + agename + ',' + type + ',' + 1 + ')" value="专辑名称查询" /><div id="error" style="color:red"></div>');
                            $("#tjSpecial").animate({left: $(document).width() - 800, top: -$(document).height() + 400, opacity: "show"}, "slow");
                        } else {
                            $("#error").html(data.msg);
                        }

                    } catch (e) {
                        //// $("#error").html("JSON解析错误");
                    }
                });
            },
 Recommendmusic: function(column_id, val, page) {
                var url = Basic.path + "/SysMusic/columnMuisc.html";
                var musicname = $('#name').val();
                $.post(url, {"column_id": column_id, 'page': page, 'name': musicname},
                function(data) {
                    try {
                        var status = '';
                        var data = jQuery.parseJSON(data);
                        var pageprev = parseInt(data.page) - 1;
                        if (pageprev < 1) {
                            pageprev = data.pagetotal;
                        }
                        var pagenext = parseInt(data.page) + 1;
                        if (pagenext > data.pagetotal) {
                            pagenext = 1;
                        }
                        var html = '<table  border="1" cellspacing="0" cellpadding="0">';
                        html += '<tr><td></td><td align="center">图片</td><td align="center" >名称</td><td  align="center" >年龄段</td><td align="center" >状态</td></tr>';
                        if (data.ret == 1) {
                            $(data.musiclist).each(function(i, item) {
                                if (item.name == '') {
                                    item.name = item.name_en;
                                }
                                if (item.title == null) {
                                    item.title = '无';
                                }
                                if (item.status == 1) {
                                    status = "显示";
                                } else {
                                    status = "隐藏";
                                }
                                html += '<tr><td width="100px;" align="center"><input class="input" style="font-size:10px;" type="button" onclick="pcColumn.adderecommend(' + item.id + ',' + column_id + ',' + val + ',' + "'m'" + ',' + "'s'" + ')" value="设置到当前位"/></td><td width="100" align="center"  onclick="Music.jumpMusicFrom(' + item.id + ')"><img src="' + Basic.image + '/' + item.coverpath + '" style="height:50px;width:50px; border:3px solid #CCC;"/></td><td align="center" width="118" height="32">' + item.name + '</td><td width="100" align="center">' + item.title + '</td><td width="50" align="center">' + status + '</td></tr>';
                            })
                            html += " </table>";
                            $('#musics').html(html);
                            $('#pageing').html(data.page + '/' + data.pagetotal);
                            $('#page').html('<a id="pageprev" onclick=" pcColumn.Recommendmusic(' + column_id + ',' + val + ',' + pageprev + ')">上一页 </a>&#12288;<a  id="pagenext" onclick=" pcColumn.Recommendmusic(' + column_id + ',' + val + ',' + pagenext + ')">下一页</a>');
                            $('#musicByname').html('<input type="text" id="name" class="input" value="' + data.musicname + '" /><input type="button" onclick=" pcColumn.Recommendmusic(' + column_id + ',' + val + ',' + 1 + ')" value="音频名称查询" /><div id="error" style="color:red"></div>');
                            $("#tjmusic").animate({left: $(document).width() - 800, top: -$(document).height() + 700, opacity: "show"}, "slow");
                        } else {
                            $("#error").html(data.msg);
                        }

                    } catch (e) {
                        //// $("#error").html("JSON解析错误");
                    }
                });
            },
  adderecommend: function(recommend_id, column_id, val, style, type) {
                var url = Basic.path + "/PcColumnRecommend/remommend.html";
                $.post(url, {"recommend_id": recommend_id, "column_id": column_id, "val": val, "type": type, "style": style},
                function(data) {
                    try {
                        window.parent.location.reload();
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                });
            },
            jumpRecommend: function(column_id) {
                window.location.href = Basic.path + "/PcColumnRecommend/index.html?columnId=" + column_id;
            },
            orderBanner: function(columnId, order) {
                window.location.href = Basic.path + "/PcColumnBanner/index.html?columnId=" + columnId + "&order=" + order;
            },
            bannerSortUpd: function(banner_id, Column_id, sort) {
            	
                var html = '<span onmouseout="pcColumn.changeSrot(' + banner_id + ',' + Column_id + ',' + sort + ')"><input type="text" id="sort" name="sort" style="width:30px;" /></span>';
                $("#" + banner_id).html(html);
                $('#sort').focus();
            },
      changeSrot: function(Id, Column_id, sortid) {
//alert(Id+"----"+ Column_id+"-----"+ sortid)
                var Sort = $('#sort').val();
                if (Sort == '' || Sort == sortid) {
                    pcColumn.getBannerListContent();
                } else {
                    var url = "/mother/web/modifyBanner.action";
                    $.post(url, {"id": Id, "sort": Sort, "column_id": Column_id},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                pcColumn.getBannerListContent();

                            } else {
                                $("#" + Id).html(data.msg);
                                window.parent.location.reload();
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }

            },
   delClass: function(column_id, class_id) {
                if (confirm("确定要删除!")) {
                    var url = Basic.path + "/PcColumnClass/del.html";
                    $.get(url, {id: class_id}, function(msg) {
                        try {
                            if (msg.ret == 1)
                            {
                                window.location.href = Basic.path + "/PcColumnClass/index.html?columnId=" + column_id;
                            } else {
                                alert(msg.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    }, 'json')

                } else {
                    return false;
                }
            },
 zjSpecial: function(obj) {
                $('#obj').attr('class', 'mixbuttonHover');
                $('#zjmusic').css('display', 'none');
                $('#zjspecial').css('display', 'block');
            },
  zjMusic: function() {
                $('#zjmusic').css('display', 'block');
                $('#zjspecial').css('display', 'none');
            },
 gsSpecial: function() {
                $('#gsMusic').css('display', 'none');
                $('#gsSpecial').css('display', 'block');
            },
 gsMusic: function() {
                $('#gsMusic').css('display', 'block');
                $('#gsSpecial').css('display', 'none');
            },
 tjMusic: function(column_id) {
                $('#speciallist').css('display', 'none');
                $('#musiclist').css('display', 'block');
            },
 tjSpecial: function(column_id) {
                $('#musiclist').css('display', 'none');
                $('#speciallist').css('display', 'block');
            },
  save: function()
            {
                $("#PcColumn").animate({left: 500, top: -500, opacity: "show"}, "slow");
                var Name = $("#nameid").val();
                var Code = $("#code").val();
                var Id = $("#id").val();
                var Status = $("#status").val();
                var isok = true;
                var msg;
                if (Check.trim(Name) == "") {
                    $("#error").html("栏目名不能为空!");
                    isok = false;
                    return false;
                }
                if (Check.trim(Code) == "") {
                    $("#error").html("编码不能为空!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/PcColumn/save.html";
                    $.post(url, {"id": Id, "name": Name, "code": Code, "status": Status},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/PcColumn/index.html";
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }

            },
   classReturn: function(columnId) {
                window.location.href = Basic.path + "/PcColumnClass/index.html?columnId=" + columnId;
            },
   returnBanner: function(columnId) {
                window.location.href = Basic.path + "/PcColumnBanner/index.html?columnId=" + columnId;
            },
   saveClass: function()
            {
                var Rid = $("#rid").val();
                var Name = $("#name").val();
                var Column_id = $("#column_id").val();
                var Id = $("#id").val();
                var sclass_id = $('#threeClassId').val();
                var isok = true;
                var msg;
                ;
                if (Check.trim(Name) == "") {
                    $("#error").html("分类名不能为空!");
                    isok = false;
                    return false;
                }
                if (parseInt(Column_id) <= 0) {
                    $("#error").html("类目ID不能为空!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/PcColumnClass/save.html";
                    $.post(url, {"id": Id, "name": Name, "rid": Rid, "column_id": Column_id, "sclass_id": sclass_id},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/PcColumnClass/index.html?columnId=" + Column_id;
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
     bannerInit: function(name, w, h)
            {
            
                $('#file_upload').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': '/mother/js/uploadify/uploadify.swf',
                    'uploader':  '/mother/uploadPicture.action',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': w, 'h': h, 'type': name}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg':  '/mother/images/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.gif;*.jpg;*.png;*.jpeg', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                        	
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                $('#imgsize').html('');
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathurl").attr("src", url);
                                    $("#pathurl").show();
                                    $("#path").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {
                                $('#imgsize').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
     recommendInit: function(name, w, h)
            {
                $('#file_upload').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadPicture.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': w, 'h': h, 'type': name}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.gif;*.jpg;*.png;*.jpeg', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                $('#imgsize').html(r.msg);
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathurl").attr("src", url);
                                    $("#pathurl").show();
                                    $("#path").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {
                                $('#imgsize').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
     recommendInitbig: function(name, w, h)
            {
                $('#file_uploadbig').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadPicture.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': w, 'h': h}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.gif;*.jpg;*.png;*.jpeg', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                $('#imgsize').html('');
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathbigurl").attr("src", url);
                                    $("#pathbigurl").show();
                                    $("#pathbig").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {

                                $('#imgsizebig').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
        
            bannerBatch: function()
            {
                var url = Basic.path + "/PcColumnBanner/batch.html";
                Basic.batch(url);
            },
            musicBatch: function()
            {
                var url = Basic.path + "/PcColumnMusic/batch.html";
                Basic.batch(url);
            },
            recommendBatch: function()
            {
                var url = Basic.path + "/PcColumnRecommend/batch.html";
                Basic.batch(url);
            },
            search: function()
            {
                $('#source_select1').html('');
                var s_name = $("#s_name").val();
                var url = Basic.path + "/PcColumnClass/ajaxAnimeForm.html";
                $.post(url, {sname: s_name}, function(msg) {
                    try {
                        if (msg) {
                            $(msg).each(function(i, item) {
                                var name = msg[i].title;
                                var id = msg[i].id;
                                var rtitle = msg[i].rtitle;
                                var op = new Option('(' + rtitle + ')' + name, id);
                                $("#source_select1").append(op);
                            })
                        } else {
                            alert('名称不存在');
                        }
                    } catch (e) {
                    }
                }, 'json')

            },
            updColumn: function(id) {
                var url = Basic.path + "/PcColumn/form.html";
                $.post(url, {id: id}, function(msg) {
                    try {
                        $("#nameid").val(msg.name);
                        $("#code").val(msg.code);
                        $("#status").val(msg.status);
                        if (msg.id != '') {
                            $("#id").val(msg.id);
                        } else {
                            $("#id").val(0);
                        }
                        $("#PcColumn").animate({left: 500, top: -500, opacity: "show"}, "slow");
                    } catch (e) {

                    }

                }, 'json')
            },
            JumpBanner: function(banner_id, columnId) {
                window.location.href = Basic.path + "/PcColumnBanner/form.html?banner_id=" + banner_id + "&columnId=" + columnId;
            },
            addProperty: function() {
                $('#id').val('');
                $('#name').val('');
                $('#sort').val('');
                $('#type').html("<h1>添加</h1>");
                $("#PcColumn").animate({left: $(document).width() - 800, top: -$(document).height() + 300, opacity: "show"}, "slow");
            },
            updRecommend: function(id, columnId) {
                var url = Basic.path + "/PcColumnRecommend/form.html";
                $.post(url, {id: id, columnId: columnId}, function(msg) {
                    $("#PcColumn").animate({left: 500, top: -500, opacity: "show"}, "slow");
                }, 'json')
            },
            updProperty: function(pid) {
                var url = Basic.path + "/SysSproperty/form.html";
                $.post(url, {id: pid}, function(msg) {
                    try {
                        $('#type').html("<h1>修改</h1>");
                        $("#PcColumn").animate({left: $(document).width() - 800, top: -$(document).height() + 300, opacity: "show"}, "slow");
                        $('#id').val(msg.id);
                        $('#name').val(msg.name);
                        $('#type').val(msg.type);
                        $('#sort').val(msg.sort);
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }

                }, 'json')
            },
            saveProperty: function()
            {
                $("#PcColumn").animate({left: 500, top: -500, opacity: "show"}, "slow");
                var id = $('#id').val();
                var name = $('#name').val();
                var type = $('#typename').val();
                var sort = $('#sort').val();
                var isok = true;
                var msg;
                if (Check.trim(name) == "") {
                    $("#error").html("属性名不能为空!");
                    isok = false;
                    return false;
                }
                if (Check.trim(type) == "") {
                    $("#error").html("类型不能为空!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/SysSproperty/save.html";
                    $.post(url, {"id": id, "name": name, "type": type, "sort": sort},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/SysSproperty/index.html";
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            confirmDel: function(id)
            {
                if (confirm("确定要删除!")) {
                    var url = Basic.path + "/PcColumn/del.html";
                    $.get(url, {id: id}, function(msg) {
                        if (msg == 1) {
                            window.location.href = Basic.path + "/PcColumn/index.html";
                        } else {
                            alert('删除失败');
                        }
                    })
                } else {
                    return false;
                }
            },
            hidediv: function() {
                $('#sname').val('');
                $('#error').html('');
                $("#PcColumn").animate({opacity: "hide"}, "slow");
                $("#tjmusic").animate({opacity: "hide"}, "slow");
                $("#tjSpecial").animate({opacity: "hide"}, "slow");
            },
            bannerHidediv: function() {
                $("#bannertjmusic").animate({opacity: "hide"}, "slow");
            },
            addRecommend: function(columnId) {
                window.location.href = Basic.path + "/PcColumnRecommend/form.html?columnId=" + columnId;
            },
            columnRecommend: function(columnId) {
                window.location.href = Basic.path + "/PcColumnRecommend/index.html?columnId=" + columnId;
            },
            addConnect: function(columnId) {
                window.location.href = Basic.path + "/PcColumnConnect/form.html?columnId=" + columnId;
            },
            addClass: function(columnId) {
                window.location.href = Basic.path + "/PcColumnClass/form.html?columnId=" + columnId;
            },
            addClassgl: function(classid, columnId) {
                window.location.href = Basic.path + "/PcColumnClass/animeForm.html?classid=" + classid + "&columnId=" + columnId;
            },
            addBanner: function(columnId) {
                window.location.href = Basic.path + "/PcColumnBanner/form.html?columnId=" + columnId;
            },
            pcBanner: function(columnId) {
                window.location.href = Basic.path + "/PcColumnBanner/index.html?columnId=" + columnId;
            },
           
            /**********************************************************************************
             * 								 链接类型
             **********************************************************************************/
            link: function() {
                var link = $('#linktype').val();
                $('#name').val("");
                switch (link)
                {
                    case "1":
                        pcColumn.linktype1();
                        break;
                    case "2":
                        pcColumn.linktype2();
                        break;
                    case "3":
                        pcColumn.linktype3();
                        break;
                    case "4":
                        pcColumn.linktype4();
                        break;
                    case "5"://视频
                        pcColumn.linktype5();
                        break;
                    case "6"://图文混排
                        pcColumn.linktype6();
                        break;
                    
                }
            },
        linktype1: function(page) {
            	
                var column_id = $('#column_id').val();
                var musicname = $('#name').val();
                pcColumn.bannerlinktype();
                var url = "/mother/web/getMusicList.action";
                $.get(url, {'column_id': column_id, 'page': page, 'name': musicname}, function(data) {
                    try {
                        var pageprev = parseInt(data.page) - 1;
                        if (pageprev < 1) {
                            pageprev = data.pagetotal;
                        }
                        var pagenext = parseInt(data.page) + 1;
                        if (pagenext > data.pagetotal) {
                            pagenext = 1;
                        }
                        if (data.ret == 1)
                        {
                            var html = '<table  border="1" cellspacing="0" cellpadding="0">';
                            html += '<tr><td></td><td align="center">ID</td><td align="center" >名称</td><td  align="center" >年龄段</td></tr>';
                            $(data.musiclist).each(function(i, item) {
                                if (item.name == '') {
                                    item.name = item.name_en;
                                    var name = "'" + item.name_en + "'";
                                } else {
                                    var name = "'" + item.name + "'";
                                }
                                if (item.title == null) {
                                    item.title = '无';
                                }
                                html += '<tr><td width="100px;" align="center">' +
                                '<input class="input" style="font-size:10px;"  ' +
                                'type="button" onclick="pcColumn.addeMusicBanner(' + item.id + ',' + name + ')" value="确 定"/>' +
                                '</td><td width="100" align="center" >' + item.id + '</td><td align="center" width="118" height="32">' + item.name + '</td><td width="100" align="center">' + item.title + '</td></tr>';
                            })
                            html += " </table>";
                            $('#bannermusic').html(html);
                            $('#specialname').html('选择您要添加的音频');
                            $('#bannerpageing').html(data.page + '/' + data.pagetotal);
                            $('#bannerpage').html('<a id="pageprev" onclick=" pcColumn.linktype1(' + pageprev + ')">上一页 </a>&#12288;<a  id="pagenext" onclick=" pcColumn.linktype1(' + pagenext + ')">下一页</a>');
                            $('#bannerMusicByname').html('<input type="text" id="name" class="input"  value="' + data.musicname + '"/><input type="button" onclick=" pcColumn.linktype1(' + 1 + ')" value="查询" /><div id="error1" style="color:red"></div> ');
                            $("#bannertjmusic").animate({left: $(document).width() - 1400, top: -$(document).height() + 200, opacity: "show"}, "slow");
                        } else {
                            $('#error1').html(data.msg);
                        }
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                }, 'json')
            },
        linktype5: function(page) {
                var column_id = $('#column_id').val();
                var musicname = $('#name').val();
                pcColumn.bannerlinktype();
                var url = "/mother/web/getVideosList.action";
                $.get(url, {'column_id': column_id, 'page': page, 'name': musicname}, function(data) {
                    try {
                        var pageprev = parseInt(data.page) - 1;
                        if (pageprev < 1) {
                            pageprev = data.pagetotal;
                        }
                        var pagenext = parseInt(data.page) + 1;
                        if (pagenext > data.pagetotal) {
                            pagenext = 1;
                        }
                        if (data.ret == 1)
                        {
                            var html = '<table  border="1" cellspacing="0" cellpadding="0">';
                            html += '<tr><td></td><td align="center">ID</td><td align="center" >名称</td><td  align="center" >年龄段</td></tr>';
                            $(data.videolist).each(function(i, item) {
                                if (item.name == '') {
                                    item.name = item.name;
                                    var name = "'" + item.name + "'";
                                } else {
                                    var name = "'" + item.name + "'";
                                }
                                if (item.title == null) {
                                    item.title = '无';
                                }
                                html += '<tr><td width="100px;" align="center"><input class="input" style="font-size:10px;"  type="button" onclick="pcColumn.addeMusicBanner(' + item.id + ',' + name + ')" value="确 定"/></td><td width="100" align="center" >' + item.id + '</td><td align="center" width="118" height="32">' + item.name + '</td><td width="100" align="center">' + item.title + '</td></tr>';
                            })
                            html += " </table>";
                            $('#bannermusic').html(html);
                            $('#specialname').html('选择您要添加的视频');
                            $('#bannerpageing').html(data.page + '/' + data.pagetotal);
                            $('#bannerpage').html('<a id="pageprev" onclick=" pcColumn.linktype5(' + pageprev + ')">上一页 </a>&#12288;<a  id="pagenext" onclick=" pcColumn.linktype5(' + pagenext + ')">下一页</a>');
                            $('#bannerMusicByname').html('<input type="text" id="name" class="input"  value="' + data.musicname + '"/><input type="button" onclick=" pcColumn.linktype5(' + 1 + ')" value="查询" /><div id="error1" style="color:red"></div> ');
                            $("#bannertjmusic").animate({left: $(document).width() - 1400, top: -$(document).height() + 200, opacity: "show"}, "slow");
                        } else {
                            $('#error1').html(data.msg);
                        }
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                }, 'json')
            },
        linktype6: function(page) {
                var column_id = $('#column_id').val();
                var musicname = $('#name').val();
                pcColumn.bannerlinktype();
                var url = "/mother/web/getNewsList.action";
                $.get(url, {'column_id': column_id, 'page': page, 'name': musicname}, function(data) {
                    try {
                        var pageprev = parseInt(data.page) - 1;
                        if (pageprev < 1) {
                            pageprev = data.pagetotal;
                        }
                        var pagenext = parseInt(data.page) + 1;
                        if (pagenext > data.pagetotal) {
                            pagenext = 1;
                        }
                        if (data.ret == 1)
                        {
                            var html = '<table  border="1" cellspacing="0" cellpadding="0">';
                            html += '<tr><td></td><td align="center">ID</td><td align="center" >名称</td><td  align="center" >年龄段</td></tr>';
                            $(data.newslist).each(function(i, item) {
                                if (item.title == '') {
                                    item.title = item.title;
                                    var title = "'" + item.title + "'";
                                } else {
                                    var title = "'" + item.title + "'";
                                }
                                if (item.title == null) {
                                    item.title = '无';
                                }
                                html += '<tr><td width="100px;" align="center"><input class="input" style="font-size:10px;"  type="button" onclick="pcColumn.addeMusicBanner(' + item.id + ',' + title + ')" value="确 定"/></td><td width="100" align="center" >' + item.id + '</td><td align="center" width="118" height="32">' + item.title + '</td><td width="100" align="center"> 无 </td></tr>';
                            })
                            html += " </table>";
                            $('#bannermusic').html(html);
                            $('#specialname').html('选择您要添加的视频');
                            $('#bannerpageing').html(data.page + '/' + data.pagetotal);
                            $('#bannerpage').html('<a id="pageprev" onclick=" pcColumn.linktype6(' + pageprev + ')">上一页 </a>&#12288;<a  id="pagenext" onclick=" pcColumn.linktype6(' + pagenext + ')">下一页</a>');
                            $('#bannerMusicByname').html('<input type="text" id="name" class="input"  value="' + data.musicname + '"/><input type="button" onclick=" pcColumn.linktype6(' + 1 + ')" value="查询" /><div id="error1" style="color:red"></div> ');
                            $("#bannertjmusic").animate({left: $(document).width() - 1400, top: -$(document).height() + 200, opacity: "show"}, "slow");
                        } else {
                            $('#error1').html(data.msg);
                        }
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                }, 'json')
            },
            linktype2: function(page) {
                var column_id = $('#column_id').val();
                var specialname = $('#name').val();
                pcColumn.bannerlinktype();
                var url = "/mother/web/getSpecialList.action";
                $.get(url, {'column_id': column_id, 'page': page, 'name': specialname}, function(data) {
                    try {
                        var pageprev = parseInt(data.page) - 1;
                        if (pageprev < 1) {
                            pageprev = data.pagetotal;
                        }
                        var pagenext = parseInt(data.page) + 1;
                        if (pagenext > data.pagetotal) {
                            pagenext = 1;
                        }
                        if (data.ret == 1)
                        {
                            var html = '<table  border="1" cellspacing="0" cellpadding="0">';
                            html += '<tr><td></td><td align="center">ID</td><td align="center" >名称</td><td  align="center" >年龄段</td></tr>';
                            $(data.speciallist).each(function(i, item) {
                                if (item.name == '') {
                                    item.name = item.name_en;
                                    var name = "'" + item.name_en + "'";
                                } else {
                                    var name = "'" + item.name + "'";
                                }
                                  if (item.title == null) {
                                    item.title = '无';
                                }
                                html += '<tr><td width="100px;" align="center"><input class="input" style="font-size:10px;"  type="button" onclick="pcColumn.addeMusicBanner(' + item.id + ',' + name + ')" value="确 定"/></td><td width="100" align="center" >' + item.id + '</td><td align="center" width="118" height="32">' + item.name + '</td><td width="100" align="center">' + item.title + '</td></tr>';
                            })
                            html += " </table>";
                            $('#specialname').html('选择您要添加的专辑');
                            $('#bannermusic').html(html);
                            $('#bannerpageing').html(data.page + '/' + data.pagetotal);
                            $('#bannerpage').html('<a id="pageprev" onclick=" pcColumn.linktype2(' + pageprev + ')">上一页 </a>&#12288;<a  id="pagenext" onclick=" pcColumn.linktype2(' + pagenext + ')">下一页</a>');
                            $('#bannerMusicByname').html('<input type="text" id="name" class="input" value="' + data.musicname + '" /><input type="button" onclick=" pcColumn.linktype2(1)" value="查询" /> <div id="error2" style="color:red"></div> ');
                            $("#bannertjmusic").animate({left: $(document).width() - 1300, top: -$(document).height() + 200, opacity: "show"}, "slow");
                        } else {
                            $('#error2').html(data.msg);
                        }
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                }, 'json')
            },
            linktype3: function() {
                var html = '';
                var column_id = $('#column_id').val();
                var url = "/mother/web/getRecommendList.action";
                $.get(url, {column_id: column_id}, function(msg) {
                    if (msg) {
                        var html = '&#12288;<select name="link"  id="link" class="input" style="width:200px;height:25px;">';
                        $(msg).each(function(i, item) {
                            html += '<option value="' + item.id + '">' + item.title + '</option>';
                        })
                        html += " </select> ";
                    }
                    $('#bannerlinktype').html(html);
                }, 'json')
            },
            bannerlinktype: function() {
                var html = '&#12288;<select name="link"  id="link" class="input" style="width:200px;height:25px;">';
                html += " </select> ";
                $('#bannerlinktype').html(html);
            },
            linktype4: function() {
                var html = " &#12288;<input type='text' class='input' id='link' name='link' style='width:150px;' />";
                $('#bannerlinktype').html(html);
            },
            
            
            hidediv : function(){
            
            	$("#bannertjmusic").animate( {
		  		 opacity : "hide"
	   			}, "slow");
            },
            addeMusicBanner: function(id, name) {
                $('#link').html('<option value="' + id + '" id="wblink">' + name + '</option> ');
                $("#bannertjmusic").animate({opacity: "hide"}, "slow");
            },
        }


var pcSubscribe =
        {
            orderContent: function(column_id, issue_id, order) {
                window.location.href = Basic.path + "/PcSubscribeIContent/index.html?column_id=" + column_id + "&issue_id=" + issue_id + "&order=" + order;
            },
            contentSortUpd: function(id, column_id, issue_id, sort) {
                var html = '<span onmouseout="pcSubscribe.changeSrot(' + issue_id + ',' + id + ',' + sort + ')"><input type="text" id="sort" name="sort" style="width:30px;" /></span>';
                $("#" + id).html(html);
                $('#sort').focus();
            },
            changeSrot: function(issue_id, Id, sortid) {
                var Sort = $('#sort').val();
                if (Sort == '' || Sort == sortid) {
                    window.parent.location.reload();
                } else {
                    var url = Basic.path + "/PcSubscribeIContent/upd.html";
                    $.post(url, {"id": Id, "sort": Sort, "issue_id": issue_id},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.parent.location.reload();
                            } else {
                                $("#" + Id).html(data.msg);
                                window.parent.location.reload();
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }

            },
            save: function()
            {
                var Name = $("#name").val();
                var Id = $("#id").val();
                var Status = $("#status").val();
                var Path = $("#path").val();
                var Path_old = $("#path_old").val();
                var description = $('#description').val();
                var isok = true;
                var msg;
                if (Check.trim(Name) == "") {
                    $("#error").html("订阅栏目名不能为空!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/PcSubscribe/save.html";
                    $.post(url, {"id": Id, "name": Name, "status": Status, coverpath: Path, description: description, Path_old: Path_old},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/PcSubscribe/index.html";
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            subscribeissueInit: function(name)
            {
                $('#file_upload').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadPicture.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': 228, 'h': 228, 'type': name}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.gif;*.jpg;*.png;*.jpeg', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                $('#imgsize').html('');
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathurl").attr("src", url);
                                    $("#pathurl").show();
                                    $("#path").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {
                                $('#imgsize').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
            subscribeInit: function(name)
            {
                $('#file_upload').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadPicture.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': 240, 'h': 186, 'type': name}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.gif;*.jpg;*.png;*.jpeg', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                $('#imgsize').html('');
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathurl").attr("src", url);
                                    $("#pathurl").show();
                                    $("#path").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {
                                $('#imgsize').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
            issueSave: function()
            {
                var Column_id = $("#column_id").val();
                var Issue = $("#issue").val();
                var Description = $("#description").val();
                var Id = $("#id").val();
                var Status = $("#status").val();
                var path_old = $('#path_old').val();
                var Coverpath = $('#path').val();
                var isok = true;
                var msg;
                if (parseInt(Column_id) <= 0) {
                    $("#error").html("请选择订阅栏目!");
                    isok = false;
                    return false;
                }
                if (Check.trim(Issue) == "") {
                    $("#error").html("期刊名称不能为空!");
                    isok = false;
                    return false;
                }
                if (Check.trim(Coverpath) == "") {
                    $("#error").html("请上传封面图片!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/PcSubscribeIssue/save.html";
                    $.post(url, {"id": Id, "column_id": Column_id, "issue": Issue, "description": Description, "coverpath": Coverpath, "status": Status, "path_old": path_old},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/PcSubscribeIssue/index.html?column_id=" + Column_id;
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            batch: function()
            {
                var url = Basic.path + "/PcSubscribe/batch.html";
                Basic.batch(url);
            },
            issueBatch: function()
            {
                var url = Basic.path + "/PcSubscribeIssue/batch.html";
                Basic.batch(url);
            },
            issueadd: function(column_id) {
                window.location.href = Basic.path + "/PcSubscribeIssue/form.html?column_id=" + column_id;
            },
            contentBatch: function()
            {
                var url = Basic.path + "/PcSubscribeIContent/batch.html";
                Basic.batch(url);
            },
            Return: function(Column_id) {
                window.location.href = Basic.path + "/PcSubscribeIssue/index.html?column_id=" + Column_id;
            },
            ReturnSubscribe: function(Column_id) {
                window.location.href = Basic.path + "/PcSubscribe/index.html";
            },
            addsubscribe: function() {
                window.location.href = Basic.path + "/PcSubscribe/form.html";
            },
            updSubscribe: function(sid) {
                var url = Basic.path + "/PcSubscribe/form.html";
                $.post(url, {id: sid}, function(msg) {
                    try {
                        $("#PcColumn").animate({left: 500, top: -500, opacity: "show"}, "slow");
                        if (msg.ret == 1) {
                            $('#psname').val(msg.info.name);
                            $('#id').val(msg.info.id);
                            if (msg.info.name == 1) {
                                $('#status1').attr('selected', 'selected');
                            } else {
                                $('#status0').attr('selected', 'selected');
                            }
                        } else {
                            alert(msg.msg);
                        }
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }

                }, 'json')
            },
            ContentFrom: function(column_id, issue_id) {
                window.location.href = Basic.path + "/PcSubscribeIContent/form.html?column_id=" + column_id + "&issue_id=" + issue_id;
            },
            confirmDel: function(id, column_id)
            {
                try {
                    if (confirm("确定要删除!")) {
                        var url = Basic.path + "/PcSubscribeIssue/del.html";
                        $.get(url, {id: id}, function(msg) {
                            var data = jQuery.parseJSON(msg);
                            if (data.ret == 1) {
                                window.location.href = Basic.path + "/PcSubscribeIssue/index.html?column_id=" + column_id;
                            } else {
                                alert(data.msg);
                            }
                        })
                    } else {
                        return false;
                    }
                } catch (e) {
                    // $("#error").html("JSON解析错误");
                }
            },
            subconfirmDel: function(id)
            {
                if (confirm("确定要删除!")) {
                    var url = Basic.path + "/PcSubscribe/del.html";
                    $.get(url, {id: id}, function(msg) {
                        try {
                            var data = jQuery.parseJSON(msg);
                            if (data.ret == 1) {
                                window.location.href = Basic.path + "/PcSubscribe/index.html";
                            } else {
                                if (confirm(data.msg)) {
                                    var urll = Basic.path + "/PcSubscribe/delAll.html";
                                    $.get(urll, {id: id}, function(data) {
                                        try {
                                            var da = jQuery.parseJSON(data);
                                            if (da.ret == 1) {
                                                window.location.href = Basic.path + "/PcSubscribe/index.html";
                                            } else {
                                                alert(data.msg);
                                            }
                                        } catch (e) {
                                            // $("#error").html("JSON解析错误");
                                        }
                                    })
                                } else {
                                    return false;
                                }

                                // alert(data.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }

                    })

                } else {
                    return false;
                }
            }
        }


var Class =
        {
            Mfolderlabel: function() {
                var ids = "";
                $("input[name='cid']").each(function(index, element) {
                    if (this.checked == true) {
                        var val = $(this).val();
                        ids += val + ",";
                    }
                });
                ids = ids.substr(0, ids.length - 1);
                if (ids == '') {
                    alert('请选择分类');
                } else {
                    $('#ids').val(ids);
                    $("#MusicFolderlabel").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                }
            },
            delFolderlabe: function() {
                var ids = "";
                $("input[name='cid']").each(function(index, element) {
                    if (this.checked == true) {
                        var val = $(this).val();
                        ids += val + ",";
                    }
                });
                ids = ids.substr(0, ids.length - 1);
                if (ids == '') {
                    alert('请选择分类');
                } else {
                    if (confirm("确定要删除分类下所有音频的文件夹属性吗?")) {
                        var url = Basic.path + "/SysClass/delMusicFloderlabel.html";
                        $.post(url, {"ids": ids},
                        function(data) {
                            try {
                                var data = jQuery.parseJSON(data);
                                if (data.ret == 1) {
                                    alert(data.msg);
                                }
                            } catch (e) {
                                // $("#error").html("JSON解析错误");
                            }
                        });
                    } else {
                        return false;
                    }
                }
            },
            addFolderlabel: function() {
                var Ids = $('#ids').val();
                var Folderlabel_id = $('#folderlabel_id').val();
                var Weight = $('#weight').val();
                var isok = true;
                if (Check.trim(Weight) == "") {
                    $("#errorr").html("权重不能为空!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/SysClass/addMusicFloderlabel.html";
                    $("#errorr").html("正在添加请等待...");
                    $.post(url, {"ids": Ids, "folderlabel_id": Folderlabel_id, "weight": Weight},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1) {
                                $("#errorr").html("");
                                window.parent.location.reload();
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            hidedivFolderlabel: function() {
                $("#MusicFolderlabel").animate({opacity: "hide"}, "slow");
            },
            save: function(_rid, title, status)
            {
                var Title = $("#title").val();
                var Rid = $("#rid").val();
                var Id = $("#id").val();
                var Status = $("#status").val();
                var Sort = $("#sort").val();
                var isok = true;
                var msg;
                if (Check.trim(Title) == "") {
                    $("#error").html("系统分类名称不能为空!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/SysClass/save.html";
                    $.post(url, {"id": Id, "rid": Rid, "status": Status, "title": Title, "sort": Sort},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/SysClass/index.html?_rid=" + _rid + "&title=" + title + "&status=" + status;
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            batch: function()
            {
                var url = Basic.path + "/SysClass/batch.html";
                Basic.batch(url);
            },
            change: function()
            {
                var _rid = $("#_rid").val();
                var level = $("#_rid").find("option:selected").attr("level");
                var isContentForm = $("#isContentForm").val();
                if (level == 2)
                {
                    var url = Basic.path + "/SysClass/ajaxFeachClass.html";
                    $.post(url, {"_rid": _rid, "level": level},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            var html = "";
                            var list = data.list;
                            if (data.ret == 1)
                            {
                                var onchange = "";
                                if (isContentForm == 1) //是否联动专辑
                                    onchange = "onchange='Special.change()'";
                                html += "<select id='threeClassId' class='input' name='threeClassId' " + onchange + ">";
                                for (var i = 0; i < list.length; i++)
                                {
                                    html += '<option value="' + list[i].id + '">' + list[i].title + '</option>';
                                }
                                html += "</select>";
                            }
                            $("#threeClass").html(html);
                        } catch (e) {
                            alert("JSON解析错误");
                        }
                    });
                }
            },
            animeBatch: function()
            {
                var url = Basic.path + "/SysAnimeClass/batch.html";
                Basic.batch(url);
            },
            addClass: function() {
                window.location.href = Basic.path + "/SysClass/form.html";
            },
            Return: function(_rid, title, status) {
                window.location.href = Basic.path + "/SysClass/index.html?_rid=" + _rid + "&title=" + title + "&status=" + status;
            },
            confirmDel: function(id)
            {
                try {
                    if (confirm("确定要删除!")) {
                        var url = Basic.path + "/SysClass/del.html";
                        $.get(url, {id: id}, function(msg) {
                            var data = jQuery.parseJSON(msg);
                            if (data.ret == 1) {
                                window.location.href = Basic.path + "/SysClass/index.html";
                            } else {
                                alert(data.msg);
                            }
                        })
                    } else {
                        return false;
                    }
                } catch (e) {
                    // $("#error").html("JSON解析错误");
                }
            }
        }

var Music =
        {
            musicSave: function() {
                var Name = $('#name').val();
                var Name_en = $('#name_en').val();
                var Reader = $('#reader').val();
                var Area = $('#area').val();
                var Language = $('#language').val();
                var Timelength = $('#timelength').val();
                var Folderlabe = $('#label').val();
                var Classid = $('#classid').val();
                var Special = $('#Special').val();
                if (Check.trim(Name) == "" && Check.trim(Name_en) == "") {
                    $("#error").html("音频中英文名称不能都为空!");
                    return false;
                }
                if (Check.trim(Timelength) == "") {
                    $("#error").html("音频时长不能为空!");
                    return false;
                }
                if (Check.trim(Folderlabe) == "N") {
                    $("#error").html("文件夹标签信息不能为空!");
                    return false;
                }
                if (Check.trim(Classid) == "N") {
                    $("#error").html("请选择分类一!");
                    return false;
                }
                if (Check.trim(Special) == "") {
                    $("#error").html("请选择专辑!");
                    return false
                }
            },
            ftpFile: function() {
                var ids = "";
                $("input[name='cid']").each(function(index, element) {
                    if (this.checked == true) {
                        var val = $(this).val();
                        ids += val + ",";
                    }
                });
                ids = ids.substr(0, ids.length - 1);
                if (ids == '') {
                    alert('请选择音频');
                } else {
                    $('#ids').val(ids);
                    $("#PcColumn").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                }
            },
            httpFile: function() {
                $("#httpFile").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
            },
            saveFiile: function() {
                var Ids = $('#ids').val();
                var Frequency = $('#frequency').val();
                var Type = $('#type').val();
                var url = Basic.path + "/SysMusic/ftpfile.html";
                $.post(url, {"ids": Ids, "frequency": Frequency, "type": Type},
                function(data) {
                    try {
                        var data = jQuery.parseJSON(data);
                        if (data.ret == 1) {
                            if (data.file_music != '') {
                                $('#error').html('上传成功!' + data.file_music + "没有上传音频文件，请ftp上传");
                            } else {
                                $('#error').html('上传成功');
                                window.parent.location.reload();
                            }
                        } else {
                            if (data.file_music == '') {
                                $('#error').html(data.musicid_no + "已上传相同的音频文件");
                            } else {
                                $('#error').html(data.file_music + "没有上传音频文件，请ftp上传");
                            }
                        }
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                });
            },
            musicInit: function(name, w, h)
            {
                $('#file_upload').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadPicture.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': w, 'h': h, 'type': name}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.gif;*.jpg;*.png;*.jpeg', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                $('#imgsize').html('');
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathurl").attr("src", url);
                                    $("#pathurl").show();
                                    $("#path").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {
                                $('#imgsize').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
            musicAudio: function()
            {
                $('#files_upload').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadAudio.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择文件', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': true, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    // 'fileTypeDesc': 'Files', //只允许上传图像
                    'fileTypeExts': '*.mp3;*.exe;*.apk', //限制允许上传的文件后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                $('#filesize').html('');
                                $("#filePath").val(r.file);
                                $('#timelength').val(r.length);
                                $('#filePath_url').html(file.name);
                            } else {
                                $('#filesize').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
            uploadFile: function()
            {
                $('#upload_files').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadAudio.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择歌词', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    // 'fileTypeDesc': 'Files', //只允许上传图像
                    'fileTypeExts': '*.lrc', //限制允许上传的文件后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                $('#filename').html('');
                                $("#songwordpath").val(r.file);
                                $('#songwordpath_url').html(file.name);
                            } else {
                                $('#filesize').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
            batch: function()
            {
                var url = Basic.path + "/SysMusic/batch.html";
                Basic.batch(url);
            },
            commentBatch: function()
            {
                var url = Basic.path + "/SysMusicComment/batch.html";
                Basic.batch(url);
            },
            search: function()
            {
                var s_name = $("#s_name").val();
                var special_id = $("#special_id").val();
                var threeClassId = $("#threeClassId").val();
                if (threeClassId == null || threeClassId == undefined) {
                    threeClassId = 0;
                }
                var url = Basic.path + "/SysMusic/ajaxSearch.html";
                $.post(url, {"name": s_name, "special_id": special_id, "classId": threeClassId},
                function(data) {
                    try {
                        var data = jQuery.parseJSON(data);
                        var list = data.list;
                        if (data.ret == 1 && list != null && list != undefined)
                        {
                            var html = "";
                            for (var i = 0; i < list.length; i++)
                            {
                                html += '<option value="' + list[i].id + '">' + list[i].name + '</option>';
                            }
                            $("#source_select1").html(html);
                        } else {
                            alert("没有相关单曲!");
                        }
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                });
            },
            change: function() {
                var _rid = $("#e_rid").val();
                var level = $("#e_rid").find("option:selected").attr("level");
                var isContentForm = $("#isContentForm").val();
                if (level == 2)
                {
                    var url = Basic.path + "/SysClass/ajaxFeachClass.html";
                    $.post(url, {"_rid": _rid, "level": level},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            var html = "";
                            var list = data.list;
                            if (data.ret == 1)
                            {
                                var onchange = "";
                                if (isContentForm == 1) //是否联动专辑
                                    onchange = "onchange='Special.change()'";
                                html += "<select id='threeClassId2' class='input' name='classid2' " + onchange + ">";
                                for (var i = 0; i < list.length; i++)
                                {
                                    html += '<option value="' + list[i].id + '">' + list[i].title + '</option>';
                                }
                                html += "</select>";
                            }
                            $("#threeClass2").html(html);
                        } catch (e) {
                            //  alert("JSON解析错误");
                        }
                    });
                }
            },
            confirmDel: function(id)
            {
                if (confirm("确定要删除!")) {
                    var url = Basic.path + "/SysMusic/del.html";
                    $.get(url, {id: id}, function(msg) {
                        try {
                            var data = jQuery.parseJSON(msg);
                            if (data.ret == 1) {
                                window.location.href = Basic.path + "/SysMusic/index.html";
                            } else {
                                alert('删除失败');
                            }
                        } catch (e) {
                            //  alert("JSON解析错误");
                        }
                    })
                } else {
                    return false;
                }
            },
            pcchange: function() {
                var _pid = $("#_pid").val();
                var url = Basic.path + "/PcColumnMusic/ajaxFeachClass.html";
                $.post(url, {pid: _pid}, function(msg) {
                    var html = '';
                    if (msg) {
                        html += "<select id='threeClassId2' name='class_id' >";
                        $(msg).each(function(i, item) {
                            html += '<option value="' + item.id + '">' + item.name + '</option>';
                        })
                        html += "</select>";
                    }
                    $("#pthreeClass").html(html);
                }, 'json')
            },
            Return: function(_rid, name, status, threeClassId) {
                window.location.href = Basic.path + "/SysMusic/index.html?_rid=" + _rid + "&name=" + name + "&status=" + status + "&threeClassId=" + threeClassId;
            },
            addClass: function() {
                window.location.href = Basic.path + "/SysMusic/form.html";
            },
            focusSpecial: function() {
                var name = $('#specialname').val();
                if (name == '输入专辑名称搜索') {
                    $('#specialname').val('');
                    $('#specialname').css('color', 'black');
                }
            },
            blurSpecial: function() {
                var name = $('#specialname').val();
                if (name != '输入专辑名称搜索') {
                    $('#specialname').val('输入专辑名称搜索');
                    $('#specialname').css('color', '#B0BABA');
                }
            },
            selSpecial: function() {
                var specialname = $('#specialname').val();
                if (specialname != '') {
                    var url = Basic.path + "/SysSpecial/selSpecaialByname.html";
                    $.post(url, {specialname: specialname}, function(msg) {
                        try {
                            var html = '';
                            if (msg.ret == 1)
                            {
                                $(msg.srow).each(function(i, item) {
                                    if (item.name == '') {
                                        html += '<option value="' + item.id + '">' + item.name_en + '</option>';
                                    } else {
                                        html += '<option value="' + item.id + '">' + item.name + '</option>';
                                    }
                                })
                                $("#Special").html(html);
                                $("#Special").onclick;
                            } else {
                                $("#error").html(msg.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    }, 'json')
                } else {
                    //alert('专辑名不能为空');
                }
            },
            selSpecialindex: function() {
                var specialname = $('#specialname').val();
                if (specialname != '') {
                    var url = Basic.path + "/SysSpecial/selSpecaialByname.html";
                    $.post(url, {specialname: specialname}, function(msg) {
                        try {
                            var html = '';
                            if (msg.ret == 1)
                            {
                                $(msg.srow).each(function(i, item) {
                                    if (item.name == '') {
                                        html += '<div style="width:300px;height:30px;font-size:12px;" id="' + item.id + '" onmouseout="Music.hiddenSpecial(' + item.id + ')" onmouseover="Music.showSpecial(' + item.id + ')" onclick="Music.addSpecial(' + item.id + ')">' + item.name_en + '</div>';
                                    } else {
                                        html += '<div style="width:300px;height:30px;font-size:12px;" id="' + item.id + '" onmouseout="Music.hiddenSpecial(' + item.id + ')" onmouseover="Music.showSpecial(' + item.id + ')" onclick="Music.addSpecial(' + item.id + ')">' + item.name + '</div>';
                                    }
                                })
                                $('#special').css('display', 'block');
                                $("#special").html(html);
                            } else {
                                $("#error").html(msg.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    }, 'json')
                } else {
                    //alert('专辑名不能为空');
                }
            },
            hiddenSpecial: function(id) {
                $('#' + id).css('background', 'buttonface');
            },
            showSpecial: function(id) {
                $('#' + id).css('background', '#0099FF');
            },
            addSpecial: function(id) {
                $('#special_id').val(id);
                $('#specialname').val($('#' + id).html());
                $('#special').css('display', 'none');
            },
            addFolderlabe: function(addFolderlabe) {
                var f_id = $('#folderlabel_id').val();
                var folderlabel = $('#' + f_id).html();
                var weight = $('#weight').val();
                if (folderlabel != '', weight != '') {
                    $('#error1').html("");
                    var html = '';
                    var rd = Math.floor(Math.random() * 1000 + 1);
                    html += "<div id='t" + rd + "' style='width:400px;'><span  ><input  type='hidden' name='folderlabel_id[]' value='" + f_id + "'/>标签：" + folderlabel + "</span>&#12288;&#12288;<span ><input  type='hidden' name='weight[]' value='" + weight + "'/>权重：" + weight + "</span>&#12288;&#12288;<a style='color:red;float:right;' onclick='Music.removetr(" + rd + ")'>删除</a></div>";
                    $('#addFolderlabe').append(html);
                    $('#label').val('Y');
                    $('#weight').val('')
                } else {
                    $('#error1').html("权重不能为空");
                }
            },
            delFolderlabe: function(folderlabel_id) {
                var url = Basic.path + "/SysFolderlabel/delMusicFolderlabe.html";
                $.post(url, {"folderlabel_id": folderlabel_id}, function(data) {
                    try {
                        if (data.ret == 1) {
                            window.parent.location.reload()
                        } else {
                            alert(data.msg);
                        }

                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                }, 'json')
            },
            addFile: function() {
                var type = $('#type').val();
                var frequency = $('#frequency').val();
                var fpath = $('#fpath').val();
                var html = '';
                if (type != '' && frequency != '' && fpath != '') {
                    var rd = Math.floor(Math.random() * 1000 + 1);
                    html += "<div id='t" + rd + "' style='width:400px;'><span ><input  type='hidden' name='type[]' value='" + type + "'/>文件格式：" + type + "</span>&#12288;&#12288;<span ><input  type='hidden' name='frequency[]' value='" + frequency + "'/>码频：" + frequency + "</span>&#12288;&#12288;<span ><input  type='hidden' value='" + fpath + "' name='fpath[]'/>音频文件路径：" + fpath + "</span><a style='color:red;float:right;' onclick='Music.removetr(" + rd + ")'>删除</a></div>";
                    $('#addFiles').append(html);
                }
            },
            delFile: function(file_id, path) {
                var url = Basic.path + "/SysMusic/delFile.html";
                $.post(url, {"file_id": file_id, "path": path}, function(data) {
                    try {
                        if (data.ret == 1) {
                            window.parent.location.reload()
                        } else {
                            alert(data.msg);
                        }
                    } catch (e) {
                        alert("JSON解析错误");
                    }
                }, 'json')

            },
            removetr: function(rd) {
                $('#t' + rd).html('');
            },
            jumpMusicFrom: function(id) {
                //window.location.href = Basic.path + "/SysMusic/form.html?id=" + id;
                window.open(Basic.path + "/SysMusic/form.html?id=" + id);
            },
            jumpSpecialFrom: function(id) {
                // window.location.href = Basic.path + "/SysSpecial/form.html?id=" + id;
                window.open(Basic.path + "/SysSpecial/form.html?id=" + id);
            },
        }
var Special =
        {
            musicClass: function() {
                var ids = "";
                $("input[name='cid']").each(function(index, element) {
                    if (this.checked == true) {
                        var val = $(this).val();
                        ids += val + ",";
                    }
                });
                ids = ids.substr(0, ids.length - 1);
                if (ids == '') {
                    alert('请选择专辑');
                } else {
                    $('#ids').val(ids);
                    $("#MusicClass").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                }
            },
            addMusicClass: function() {
                var Ids = $('#ids').val();
                var Classid = $('#threeClassMusic').val();
                var Classid2 = $('#threeClassId2').val();
                var threeClassMusics = $('#threeClassMusics').html();
                var isok = true;
                if (threeClassMusics == "") {
                    $("#errorr").html("请选择分类一!");
                    isok = false;
                    return false;
                }
                $("#errorr").html("正在添加请等待...");
                if (isok == true)
                {
                    var url = Basic.path + "/SysSpecial/addMusicClass.html";
                    $.post(url, {"ids": Ids, "classid": Classid, "classid2": Classid2},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1) {
                                $("#errorr").html("");
                                window.parent.location.reload();
                            } else {
                                $("#errorr").html(data.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            hidedivMusicClass: function() {
                $("#MusicClass").animate({opacity: "hide"}, "slow");
            },
            specialSave: function() {
                var Name = $('#name').val();
                var Reader = $('#reader').val();
                var Area = $('#area').val();
                var Language = $('#language').val();
                var Name_en = $('#name_en').val();
                if (Check.trim(Name) == "" && Check.trim(Name_en) == "") {
                    $("#error").html("专辑中英文名称不能都为空!");
                    return false;
                }
            },
            specialInit: function(name, w, h)
            {
                $('#file_upload').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadPicture.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': w, 'h': h, 'type': name}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.gif;*.jpg;*.png;*.jpeg', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                $('#imgsize').html('');
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathurl").attr("src", url);
                                    $("#pathurl").show();
                                    $("#path").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {
                                $('#imgsize').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
            batch: function()
            {
                var url = Basic.path + "/SysSpecial/batch.html";
                Basic.batch(url);
            },
            commentBatch: function()
            {
                var url = Basic.path + "/SysSpecialComment/batch.html";
                Basic.batch(url);
            },
            changeMusic: function()
            {
                var _rid = $("#m_rid").val();
                var level = $("#m_rid").find("option:selected").attr("level");
                var isContentForm = $("#isContentForm").val();
                if (level == 2)
                {
                    var url = Basic.path + "/SysClass/ajaxFeachClass.html";
                    $.post(url, {"_rid": _rid, "level": level},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            var html = "";
                            var list = data.list;
                            if (data.ret == 1)
                            {
                                var onchange = "";
                                if (isContentForm == 1) //是否联动专辑
                                    onchange = "onchange='Special.change()'";
                                html += "<select id='threeClassMusic' class='input' name='threeClassMusic' " + onchange + ">";
                                for (var i = 0; i < list.length; i++)
                                {
                                    html += '<option value="' + list[i].id + '">' + list[i].title + '</option>';
                                }
                                html += "</select>";
                            }
                            $("#threeClassMusics").html(html);
                        } catch (e) {
                            alert("JSON解析错误");
                        }
                    });
                }
            },
            change: function()
            {
                var classId = $("#threeClassId").val();
                var url = Basic.path + "/SysSpecial/ajaxFeach.html";
                $.post(url, {"classId": classId},
                function(data) {
                    try {
                        var data = jQuery.parseJSON(data);
                        var list = data.list;
                        var isSpecialContainer = $("#isSpecialContainer").val();
                        var selectId = "special_id";
                        if (isSpecialContainer == 1) { //需要存在专辑的容器
                            selectId = "source_select1";
                        }
                        $("#" + selectId).empty();
                        if (isSpecialContainer != 1) {
                            $("#" + selectId).append("<option value='0'>全 部</option>");
                        }
                        if (list != null && list != "" && list.length >= 1)
                        {
                            for (var i = 0; i < list.length; i++)
                            {
                                $("#" + selectId).append("<option value='" + list[i].id + "'>" + list[i].name + "</option>");
                            }
                        }
                    } catch (e) {
                        alert("JSON解析错误");
                    }
                });
            },
            search: function()
            {
                var s_name = $("#s_name").val();
                var threeClassId = $("#threeClassId").val();
                if (threeClassId == null || threeClassId == undefined) {
                    threeClassId = 0;
                }
                var url = Basic.path + "/SysSpecial/ajaxSearch.html";
                $.post(url, {"name": s_name, "classId": threeClassId},
                function(data) {
                    try {
                        var data = jQuery.parseJSON(data);
                        var list = data.list;
                        if (data.ret == 1 && list != null && list != undefined)
                        {
                            var html = "";
                            for (var i = 0; i < list.length; i++)
                            {
                                html += '<option value="' + list[i].id + '">' + list[i].name + '</option>';
                            }
                            $("#source_select1").html(html);
                        } else {
                            alert("没有相关专辑!");
                        }
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                });
            },
            Return: function(_rid, name, status, threeClassId) {
                window.location.href = Basic.path + "/SysSpecial/index.html?_rid=" + _rid + "&name=" + name + "&status=" + status + "&threeClassId=" + threeClassId;
            },
            addClass: function() {
                window.location.href = Basic.path + "/SysSpecial/form.html";
            },
            confirmDel: function(id)
            {
                if (confirm("确定要删除!")) {
                    var url = Basic.path + "/SysSpecial/del.html";
                    $.get(url, {id: id}, function(msg) {
                        var data = jQuery.parseJSON(msg);
                        if (data.ret == 1) {
                            window.location.href = Basic.path + "/SysSpecial/index.html";
                        } else {
                            alert('删除失败');
                        }
                    })

                } else {
                    return false;
                }
            },
            hidediv: function() {
                $("#PcColumn").animate({opacity: "hide"}, "slow");
                window.location.href = Basic.path + "/SysSpecial/index.html";

            },
            addMusicsSort: function(music_ids, SpecialId, name) {
                var sorts = '';
                var sottArray = new Array();
                $(music_ids).each(function(i, item) {
                    if ($("#" + item).val() != '') {
                        sottArray.push($("#" + item).val());
                        sorts += item + ',' + $("#" + item).val() + ',';

                    }
                })
                var type = $('#type').val();
                if (type == "true") {
                    var url = Basic.path + "/SysMusic/updMusicSort.html";
                    $.post(url, {sorts: sorts}, function(msg) {
                        try {
                            if (msg.ret == 1) {
                                Special.musicSrot(SpecialId, name);
                            } else {
                                $("#error").html(msg.msg);
                            }
                        } catch (e) {
                            // $("#error").html("JSON解析错误");
                        }
                    }, 'json')
                } else {
                    // alert('添加排序值不能重复');
                }
            },
            musicSrot: function(SpecialId, name) {
                var url = Basic.path + "/SysSpecial/music.html";
                $.post(url, {SpecialId: SpecialId}, function(msg) {
                    try {
                        var music_ids = new Array();
                        if (msg.ret == 1 && msg.ssmusics != null && msg.ssmusics != undefined) {
                            var html = "<table class='tb' cellspacing='0' cellpadding='0'><tr class='tit-bg'><span align='center'  width='100' style=' left: 70px; position: absolute; top: 42px;'>ID</span><span align='center'  width='100' style='left: 160px; position: absolute; top: 42px;'>名称</span><span align='center'  width='100'style=' left: 250px; position: absolute; top: 42px;' >序号</span><span align='center'  width='150' style=' left: 350px; position: absolute; top: 42px;'>新序号</span></tr>";
                            $(msg.ssmusics).each(function(i, item) {
                                if (item.name == '') {
                                    item.name = item.name_en;
                                }
                                html += "<tr> <td align='center' width='100' >" + item.id + "</td><td  width='100' align='center'>" + item.name + "</td><td  width='100' align='center' id='t" + item.id + "'>" + item.sort + "</td><td align='left'  width='150'><input type='text' class='input' onblur='Special.blueSort(" + item.id + "," + SpecialId + ")' style='width:50px;' id='" + item.id + "' /><span id='s" + item.id + "' class='red'></span></td></tr>";
                                music_ids.push(item.id);
                            })
                            html += " </table>";
                            $('#specialname').html(name);
                            $("#music").html(html);
                            $('#PcColumn').animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                        } else {
                            alert("没有相关音频!");
                        }
                        $('#addMusicSort').bind('click', function() {
                            Special.addMusicsSort(music_ids, msg.specialId, name);
                        })
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                }, 'json')
            },
            blueSort: function(music_id, SpecialId) {
                var sort = $('#' + music_id).val();
                var url = Basic.path + "/SysMusic/musicBysort.html";
                $.post(url, {sort: sort, music_id: music_id, SpecialId: SpecialId}, function(msg) {
                    try {
                        if (msg == 1) {
                            $('#s' + music_id).html('已存在');
                            $('#type').val('false');
                        } else {
                            $('#s' + music_id).html('');
                            $('#type').val('true');
                        }
                    } catch (e) {
                        // $("#error").html("JSON解析错误");
                    }
                }, 'json')
            },
            importSpeical: function()
            {
                var specialname = $("#specialname").val();
                var class_id = $("#class_id").val();
                var class_id2 = $("#class_id2").val();
                var agesection = $("#agesection").val();
                var path = $("#path").val();
                var lable_str = "";
                $("input[name='lable']:checkbox").each(function() {
                    if ($(this).attr("checked")) {
                        var lableId = $(this).val();
                        var weight = $("#" + lableId + "_weight").val();
                        if (parseInt(weight) >= 1) {
                            lable_str += lable_str == "" ? lableId + "-" + weight : "||" + lableId + "-" + weight;
                        }
                    }
                });
                if (Check.trim(specialname) == "") {
                    $("#error").html("专辑名称不能为空!");
                    isok = false;
                    return false;
                }
                if (parseInt(class_id) <= 1) {
                    $("#error").html("请选择基础分类一!");
                    isok = false;
                    return false;
                }
                if (Check.trim(path) == "") {
                    $("#error").html("音频目录不能为空!");
                    isok = false;
                    return false;
                }
                if (Check.trim(lable_str) == "") {
                    $("#error").html("文件夹属性不能为空!");
                    isok = false;
                    return false;
                }
                $("#message").html("正在处理....");
                var url = Basic.path + "/SysSpecial/submitImportSpecial.html";
                $.post(url, {"specialname": specialname, "class_id": class_id,
                    "class_id2": class_id2, "agesection": agesection, "path": path, "lable": lable_str},
                function(data) {
                    try {
                        $("#message").html("");
                        var data = jQuery.parseJSON(data);
                        if (data.ret == 1) {
                            var messageList = data.messageList;
                            $("#error").html("");
                            for (var i = 0; i < messageList.length; i++) {
                                $("#message").append(messageList[i] + "<BR>");
                            }
                        } else {
                            $("#error").html(data.msg);

                        }
                    } catch (e) {
                        $("#error").html("JSON解析错误");
                    }
                });
            }
        }






var PadColumn = {
    bannerjump: function(column_id, banner_id) {
        window.location.href = Basic.path + "/PadColumnBanner/form.html?columnId=" + column_id + '&banner_id=' + banner_id;
    },
    bannerSetInterval: function(page) {
        var url = Basic.path + "/PadColumn/bannerIndex.html";
        var column_id = $('#column_id').val();
        var total = '';
        $.post(url, {"column_id": column_id, 'page': page},
        function(data) {
            try {
                var data = jQuery.parseJSON(data);
                var pageprev = parseInt(data.page) - 1;
                if (pageprev < 1) {
                    pageprev = data.pagetotal;
                }
                var pagenext = parseInt(data.page) + 1;
                if (pagenext > data.pagetotal) {
                    pagenext = 1;
                }
                var html = '';
                $(data.banners).each(function(i, item) {
                    html += '<input type="hidden" id="banner_id" name="banner_id"  value="' + item.id + '"/><img src="' + Basic.image + '/' + item.path + '" id="bannerPath" style="height:170px; width:400px; border:3px solid #CCC;" onclick="PadColumn.bannerjump(' + data.column_id + ',' + item.id + ')">';
                })
                var pagenext = '<div  style="width:100px;height:100px;" onclick="PadColumn.bannerSetInterval(' + pagenext + ')"><img src="' + Basic.imgPath + '/icon_xiangyou.png" style="margin-top:50px;" /></div>';
                var pageprev = '<div  style="width:100px;height:100px;" onclick="PadColumn.bannerSetInterval(' + pageprev + ')"><img src="' + Basic.imgPath + '/icon_xiangzuo.png" style="margin-top:50px;" /></div>'
                for (var i = 1; i <= data.pagetotal; i++) {
                    if (data.page == i) {
                        total += '<span><img src="' + Basic.imgPath + '/point_hover.png"/></span>' + '&#12288';
                    } else {
                        total += '<span ><img src="' + Basic.imgPath + '/point.png" /></span>' + '&#12288';
                    }
                }
                $('#bannerindex').html(html);
                $('#pagenext').html(pagenext);
                $('#pageprev').html(pageprev);
                $('#total').html(total);

            } catch (e) {
                //// $("#error").html("JSON解析错误");
            }
        });
    },
    RecommendAnime: function(val, page) {
        var url = Basic.path + "/SysAnime/selAnime.html";
        var Animename = $('#sname').val();
        $.post(url, {"page": page, "name": Animename},
        function(data) {
            try {
                var status = '';
                var data = jQuery.parseJSON(data);
                var pageprev = parseInt(data.page) - 1;
                if (pageprev < 1) {
                    pageprev = data.pagetotal;
                }
                var pagenext = parseInt(data.page) + 1;
                if (pagenext > data.pagetotal) {
                    pagenext = 1;
                }
                var html = '<table  border="1" cellspacing="0" cellpadding="0">';
                html += '<tr><td></td><td align="center">节目图片</td><td align="center" >名称</td><td align="center">状态</td></tr>';
                if (data.ret == 1) {
                    $(data.animelist).each(function(i, item) {
                        if (item.status == 1) {
                            status = "上柜";
                        } else {
                            status = "下柜";
                        }
                        html += '<tr><td width="100px;" align="center"><input class="input" style="font-size:10px;"  type="button" onclick="PadColumn.addBabyAnime(' + item.id + ',' + val + ',' + "'baby'" + ',' + "'s'" + ')" value="设置到当前位"/></td><td width="100" align="center"  ><img src="' + Basic.image + '/' + item.thumbnail + '" style="height:50px;width:50px; border:3px solid #CCC;"/></td><td align="center" width="118" height="32">' + item.name + '</td><td  width="50" align="center">' + status + '</td></tr>';
                    })
                    html += " </table>";
                    $('#animes').html(html);
                    $('#spageing').html(data.page + '/' + data.pagetotal);
                    $('#spage').html('<a id="pageprev" onclick="PadColumn.RecommendAnime(' + val + ',' + pageprev + ')">上一页 </a>&#12288;<a  id="pagenext" onclick="PadColumn.RecommendAnime(' + val + ',' + pagenext + ')">下一页</a>');
                    $('#animeByname').html('<input type="text" id="sname" class="input" value="' + data.animename + '" /><input type="button" onclick=" PadColumn.RecommendAnime(' + val + ',' + 1 + ')" value="动画片名称查询" /><div id="error" style="color:red"></div>');
                    $("#recommendAnime").animate({left: $(document).width() - 800, top: -$(document).height() + 400, opacity: "show"}, "slow");
                } else {
                    $("#error").html(data.msg);
                }

            } catch (e) {
                //// $("#error").html("JSON解析错误");
            }
        });
    },
    addBabyAnime: function(anime_id, val, style, type) {
        var url = Basic.path + "/PadColumn/baby.html";
        $.post(url, {"anime_id": anime_id, "val": val, "type": type, "style": style},
        function(data) {
            try {
                var data = jQuery.parseJSON(data);
                if (data.ret == 1) {
                    window.parent.location.reload();
                } else {
                    $('#error').html(data.msg);
                }

            } catch (e) {
                // $("#error").html("JSON解析错误");
            }
        });
    },
    padBanner: function(columnId) {
        window.location.href = Basic.path + "/PadColumnBanner/index.html?columnId=" + columnId;
    },
    addAnimeSort: function(anime_ids, column_id) {
        var sorts = '';
        var sottArray = new Array();
        $(anime_ids).each(function(i, item) {
            if ($("#" + item).val() != '') {
                sottArray.push($("#" + item).val());
                sorts += item + ',' + $("#" + item).val() + ',';

            }
        })
        var url = Basic.path + "/SysAnime/updAnimeSort.html";
        var column_id = $('#column_id').val();
        $.post(url, {"sorts": sorts, "column_id": column_id}, function(msg) {
            try {
                if (msg.ret == 1) {
                    PadColumn.animeSort(column_id);
                } else {
                    $("#aerror").html(msg.msg);
                }
            } catch (e) {
                // $("#error").html("JSON解析错误");
            }
        }, 'json')

    },
    animeSort: function(column_id) {
        var url = Basic.path + "/PadColumn/anime.html";
        var animeName = $('#sname').val();
        $.post(url, {"column_id": column_id, "name": animeName}, function(msg) {
            try {
                var anime_ids = new Array();
                if (msg.ret == 1 && msg.list != false && msg.list != undefined) {
                    var html = '<table  border="1" cellspacing="0" cellpadding="0">';
                    html += '<tr><td align="center">序号</td><td align="center">名称</td><td align="center" >节目图片</td><td align="center">分类</td><td align="center">新序号</td></tr>';
                    $(msg.list).each(function(i, item) {
                        html += "<tr> <td align='center' width='100' >" + item.sort + "</td><td  width='100' align='center'>" + item.name + "</td><td width='100' align='center'> <img src='" + Basic.Image + "/" + item.thumbnail + "' style='height:50px;width: 50px; border:3px solid #CCC;'/></td><td  width='100' align='center' id='t" + item.id + "'>" + item.classname + "</td><td align='left'  width='150'><input type='text' class='input'  style='width:50px;' id='" + item.id + "' /><span id='s" + item.id + "' class='red'></span></td></tr>";
                        anime_ids.push(item.id);
                    })
                    html += " </table>";
                    $("#anime").html(html);
                    $('#animeByname').html('<input type="text" id="sname" class="input" value="" /><input type="button" onclick="PadColumn.animeSort(' + msg.column_id + ',' + 1 + ')"  value="动画片名称查询" /><div id="error" style="color:red"></div>');
                    $('#animeSort').animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                } else {
                    alert('没有相关动画片!');
                }
                $('#addAnimeSort').bind('click', function() {
                    PadColumn.addAnimeSort(anime_ids, msg.column_id);
                })
            } catch (e) {
                // $("#error").html("JSON解析错误");
            }
        }, 'json')
    },
    save: function()
    {
        var Name = $("#namepad").val();
        var Code = $("#code").val();
        var Id = $("#id").val();
        var Status = $("#status").val();
        var Sign = $("#sign").val();
        var isok = true;
        var msg;
        if (Check.trim(Name) == "") {
            $("#error").html("栏目名不能为空!");
            isok = false;
            return false;
        }
        if (Check.trim(Code) == "") {
            $("#error").html("编码不能为空!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/PadColumn/save.html";
            $.post(url, {"id": Id, "name": Name, "code": Code, "status": Status, "sign": Sign},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadColumn/index.html";
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    // $("#error").html("JSON解析错误");
                }
            });
        }
    },
    orderBanner: function(columnId, order) {
        window.location.href = Basic.path + "/PadColumnBanner/index.html?columnId=" + columnId + "&order=" + order;
    },
    saveClass: function() {
        var Name = $("#name").val();
        var Sign = $("#sign").val();
        var Description = $('#description').val();
        var Id = $("#id").val();
        var Coverpath = $("#path").val();
        var Path_old = $("#path_old").val();
        var Sort = $('#sort').val();
        var Status = $("#status").val();
        var isok = true;
        if (Check.trim(Name) == "") {
            $("#error").html("请填类型名称!");
            isok = false;
            return false;
        }
        if (Check.trim(Coverpath) == "") {
            $("#error").html("请上传图片!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/PadClass/save.html";
            $.post(url, {"id": Id, "coverpath": Coverpath, "path_old": Path_old, "name": Name, "sort": Sort, "status": Status, "sign": Sign, "description": Description},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadClass/index.html";
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    // $("#error").html("JSON解析错误");
                }
            });
        }
    },
    returnClass: function() {
        window.location.href = Basic.path + "/PadClass/index.html";
    },
    columnReturn: function(column_id) {
        window.location.href = Basic.path + "/PadColumnBanner/index.html?columnId=" + column_id;
    },
    saveBanner: function()
    {
        var ColumnId = $('#column_id').val();
        var Sort = $("#sort").val();
        var Link = $("#link").val();
        var linktype = $('#linktype').val();
        var Path = $("#path").val();
        var Status = $("#status").val();
        var isok = true;
        var msg;
        if (Check.trim(Path) == "") {
            $("#error").html("请上传图片!");
            isok = false;
            return false;
        }
        if (parseInt(Link) <= 0) {
            $("#error").html("请填写链接地址!");
            isok = false;
            return false;
        }
       if (isok == true) {
            var url = "/mother/web/addBanner.action";
            $.post(url, { "path": Path, "link": Link, "sort": Sort, "status": Status, "column_id": ColumnId, "linktype": linktype},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadColumnBanner/index.html?columnId=" + ColumnId;
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    // $("#error").html("JSON解析错误");
                }
            }, 'josn');
        }
    },
    confirmDelClass: function(id)
    {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/PadClass/del.html";
            $.get(url, {id: id}, function(msg) {
                try {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadClass/index.html";
                    } else {
                        alert(data.msg);
                    }
                } catch (e) {
                    // $("#error").html("JSON解析错误");
                }
            })

        } else {
            return false;
        }
    },
    Addcolumn: function() {
        $("#namepad").val('');
        $("#code").val('');
        $("#status").val('');
        $("#PadColumn").animate({left: 500, top: -500, opacity: "show"}, "slow");
    },
    updBanner: function(bannerId, columnId) {
        window.location.href = Basic.path + "/PadColumnBanner/form.html?banner_id=" + bannerId + "&columnId=" + columnId;
    },
    bannerSortUpd: function(banner_id, Column_id, sort) {
        var html = '<span onmouseout="PadColumn.changeSrot(' + banner_id + ',' + Column_id + ',' + sort + ')"><input type="text" id="sort" name="sort" style="width:30px;" /></span>';
        $("#" + banner_id).html(html);
        $('#sort').focus();
    },
    changeSrot: function(Id, Column_id, sortid) {

        var Sort = $('#sort').val();
        if (Sort == '' || Sort == sortid) {
            window.parent.location.reload();
        } else {
            var url = Basic.path + "/PadColumnBanner/save.html";
            $.post(url, {"id": Id, "sort": Sort, "column_id": Column_id},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.parent.location.reload();
                    } else {
                        $("#" + Id).html(data.msg);
                        window.parent.location.reload();
                    }
                } catch (e) {
                    // $("#error").html("JSON解析错误");
                }
            });
        }

    },
    addBanner: function(columnId) {
        window.location.href = Basic.path + "/PadColumnBanner/form.html?columnId=" + columnId;
    },
    animeBatch: function()
    {
        var url = Basic.path + "/PadColumn/batch.html";
        Basic.batch(url);
    },
    addAnime: function(column_id) {
        window.location.href = Basic.path + "/PadColumn/connectClassForm.html?column_id=" + column_id;
    },
    addAnimeClass: function(id) {
        window.location.href = Basic.path + "/PadClass/animeForm.html?id=" + id;
    },
    addClass: function() {
        window.location.href = Basic.path + "/PadClass/form.html";
    },
    selectAll: function()
    {
        $("input[name='cid']").each(function(index, element) {
            this.checked = !this.checked;
        });
    },
    bannerBatch: function()
    {
        var url = Basic.path + "/PadColumnBanner/batch.html";
        Basic.batch(url);
    },
    saveColumn: function(id) {
        var url = Basic.path + "/PadColumn/form.html";
        $.post(url, {id: id}, function(msg) {
            try {
                if (msg.ret == 1)
                {
                    $("#namepad").val(msg.info.name);
                    $("#code").val(msg.info.code);
                    $("#status").val(msg.info.status);
                    if (msg.info.status == 1) {
                        $('#status1').attr('selected', 'selected');
                    } else {
                        $('#status2').attr('selected', 'selected');
                    }
                    $("#sign").val(msg.info.sign);
                    if (msg.info.sign == 1) {
                        $('#sing1').attr('selected', 'selected');
                    } else {
                        $('#sing2').attr('selected', 'selected');
                    }
                    if (msg.info.id != '') {
                        $("#id").val(msg.info.id);
                    } else {
                        $("#id").val(0);
                    }
                }
                $("#PadColumn").animate({left: 500, top: -500, opacity: "show"}, "slow");
            } catch (e) {
                //   // $("#error").html("JSON解析错误");
            }
        }, 'json')
    },
    confirmDel: function(id)
    {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/PadColumn/del.html";
            $.get(url, {id: id}, function(msg) {
                try {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadColumn/index.html";
                    } else {
                        alert(data.msg);
                    }
                } catch (e) {
                    // // $("#error").html("JSON解析错误");
                }

            })

        } else {
            return false;
        }
    },
    hidediv: function() {
        $("#id").val('');
        $("#PadColumn").animate({opacity: "hide"}, "slow");
    },
    close: function() {
        $('#sname').val('');
        $("#aerror").html('');
        $("#animeSort").animate({opacity: "hide"}, "slow");
        $("#recommendAnime").animate({opacity: "hide"}, "slow");
    },
}


var PadType = {
    save: function()
    {
        var Name = $("#name").val();
        var Sign = $("#sign").val();
        var Path = $("#path").val();
        var Dscription = $("#description").val();
        var Id = $("#id").val();
        var isok = true;
        if (Check.trim(Name) == "") {
            $("#error").html("名称不能为空!");
            isok = false;
            return false;
        }
        if (parseInt(Sign) <= 0) {
            $("#error").html("请选择标记!");
            isok = false;
            return false;
        }
        if (isok == true) {
            var url = Basic.path + "/PadType/save.html";
            $.post(url, {"id": Id, "name": Name, "sign": Sign, "coverpath": Path, "description": Dscription},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadType/index.html";
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    // // $("#error").html("JSON解析错误");
                }
            });
        }
    },
    search: function()
    {
        $('#source_select1').html('');
        var type_id = $("#addtype_id").val();
        var agesection = $("#agesection").val();
        var s_name = $("#s_name").val();
        var url = Basic.path + "/PadType/ajaxAnimeForm.html";
        $.post(url, {sname: s_name, type_id: type_id, agesection: agesection}, function(msg) {
            if (msg) {
                $(msg).each(function(i, item) {
                    var name = msg[i].name;
                    var id = msg[i].id;
                    var op = new Option(name, id);
                    $("#source_select1").append(op);
                })
            } else {
                alert('名称不存在');
            }
        }, 'json')

    },
    animeBatch: function()
    {
        var url = Basic.path + "/PadType/batch.html";
        Basic.batch(url);
    },
    selectAll: function()
    {
        $("input[name='cid']").each(function(index, element) {
            this.checked = !this.checked;
        });
    },
    classBatch: function()
    {
        var url = Basic.path + "/PadClass/batch.html";
        Basic.batch(url);
    }
}
var Modul = {
    showModul: function(modul_id) {
        $('#modul_id').val('');
        $('#name').val('');
        $('#rid').val('');
        $('#location').val('');
        $("#PcColumn").animate({left: $(document).width() - 800, top: -$(document).height() + 300, opacity: "show"}, "slow");
    },
    updModul: function(modul_id) {
        var url = Basic.path + "/SysModul/form.html";
        $.post(url, {modul_id: modul_id}, function(msg) {
            try {
                if (msg.ret == 1) {
                    $('#modul_id').val(msg.info.id);
                    $('#name').val(msg.info.name);
                    $('#rid').val(msg.info.rid);
                    $('#location').val(msg.info.location);
                } else {
                    alert(msg.msg);
                }
                $("#PcColumn").animate({left: $(document).width() - 800, top: -$(document).height() + 300, opacity: "show"}, "slow");
            } catch (e) {
                // // $("#error").html("JSON解析错误");
            }
        }, 'json')
    },
    saveModul: function() {
        var Name = $('#name').val();
        var Rid = $('#rid').val();
        var Location = $('#location').val();
        var modul_id = $('#modul_id').val();
        var url = Basic.path + "/SysModul/save.html";
        $.post(url, {modul_id: modul_id, name: Name, rid: Rid, location: Location}, function(msg) {
            try {
                if (msg.ret == 1) {
                    window.location.href = Basic.path + "/SysModul/index.html";
                } else {
                    alert(msg.msg);
                }
            } catch (e) {
                // // $("#error").html("JSON解析错误");
            }
        }, 'json')
    },
    modulDel: function(modul_id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/SysModul/del.html";
            $.get(url, {id: modul_id}, function(msg) {
                try {
                    if (msg.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysModul/index.html";
                    } else {
                        alert(msg.msg);
                    }
                } catch (e) {
                    // // $("#error").html("JSON解析错误");
                }
            }, 'json')

        } else {
            return false;
        }
    },
    addFolderlaber: function() {
        $('#id').val('');
        $('#name').val('');
        $('#type').val('');
        $('#sort').val('');
        $('#type').html("<h1>添加</h1>");
        $("#PcColumn").animate({left: $(document).width() - 800, top: -$(document).height() + 300, opacity: "show"}, "slow");
    },
    save: function()
    {
        var Name = $("#name").val();
        var Id = $('#id').val();
        var isok = true;
        var msg;
        if (Check.trim(Name) == "") {
            $("#error").html("标签名不能为空!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/SysFolderlabel/save.html";
            $.post(url, {"id": Id, "name": Name},
            function(data) {
                try {

                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysFolderlabel/index.html";
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    // // $("#error").html("JSON解析错误");
                }
            });
        }

    },
    updFolderlaber: function(id) {
        var url = Basic.path + "/SysFolderlabel/form.html";
        $.post(url, {id: id}, function(msg) {
            try {
                $('#id').val(msg.id);
                $('#name').val(msg.name);
                $('#type').html("<h1>修改</h1>");
                $("#PcColumn").animate({left: $(document).width() - 800, top: -$(document).height() + 300, opacity: "show"}, "slow");
            } catch (e) {
                // // $("#error").html("JSON解析错误");
            }
        }, 'json')
    },
    confirmDel: function(id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/SysFolderlabel/del.html";
            $.get(url, {id: id}, function(msg) {
                try {
                    if (msg.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysFolderlabel/index.html";
                    } else {
                        alert(msg.msg);
                    }
                } catch (e) {
                    //// $("#error").html("JSON解析错误");
                }
            }, 'json')

        } else {
            return false;
        }
    },
    addSversion: function() {
        $('#filePath_url').html('');
        $('[class="input"]').val('');
        $('#style').html("<h1>添加</h1>");
        $("#PcColumn").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
    },
    closeSversion: function() {
        $('#filePath_url').html('');
        $('[class="input"]').val('');
        $('#error').html('');
        $("#PcColumn").animate({opacity: "hide"}, "slow");
    },
    saveSversion: function() {
        var Id = $('#id').val();
        var Url = $('#url').val();
        var Type = $('#type').val();
        var Equtype = $('#equtype').val();
        var Softwaretype = $('#softwaretype').val();
        var Title = $('#title').val();
        var Path = $('#filePath').val();
        var Path_old = $('#filePath_old').val();
        var Description = $('#description').val();
        var Versionnumber = $('#versionnumber').val();
        var isok = true;
        var msg;
        if (Check.trim(Type) == "") {
            $("#error").html("类型不能为空!");
            isok = false;
            return false;
        }
        if (Check.trim(Title) == "") {
            $("#error").html("标题不能为空!");
            isok = false;
            return false;
        }
        if (Check.trim(Versionnumber) == "") {
            $("#error").html("版本号不能为空!");
            isok = false;
            return false;
        }
        if (Check.trim(Url) == "" && Check.trim(Path) == "") {
            $("#error").html("地址和文件不能同时为空!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/SysSversion/save.html";
            $.post(url, {"id": Id, "title": Title, "type": Type, "equtype": Equtype, "softwaretype": Softwaretype, "path": Path, "path_old": Path_old, "description": Description, "versionnumber": Versionnumber, "url": Url},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        $('#serversionAdd').attr('onclick', '');
                        window.location.href = Basic.path + "/SysSversion/index.html";
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    // // $("#error").html("JSON解析错误");
                }
            });
        }
    },
    sversionDel: function(id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/SysSversion/del.html";
            $.get(url, {id: id}, function(msg) {
                try {
                    if (msg.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysSversion/index.html";
                    } else {
                        alert(msg.msg);
                    }
                } catch (e) {
                }
            }, 'json')

        } else {
            return false;
        }
    },
    sversionupd: function(id) {
        var url = Basic.path + "/SysSversion/form.html";
        $.post(url, {id: id}, function(msg) {
            try {
                if (msg.ret == 1) {
                    $("#PcColumn").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                    $('#id').val(msg.info.id);
                    if (msg.info != '') {
                        $('#' + msg.info.type).attr('selected', 'selected');
                    }
                    if (msg.info.equtype != '') {
                        $('#' + msg.info.equtype).attr('selected', 'selected');
                    }
                    if (msg.info.softwaretype != '') {
                        $('#' + msg.info.softwaretype).attr('selected', 'selected');
                    }
                    $('#description').val(msg.info.description);
                    if (msg.res == 1) {
                        $('#filePath').val(msg.info.url);
                        $('#filePath_old').val(msg.info.url);
                        $('#filePath_url').html(msg.info.url);
                    } else {
                        $('#url').val(msg.info.url);
                    }
                    $('#versionnumber').val(msg.info.versionnumber);
                    $('#title').val(msg.info.title);
                    $('#style').html("<h1>修改</h1>");
                } else {
                    $('#error').html(msg.msg);
                }
            } catch (e) {
                // $("#error").html("JSON解析错误");
            }
        }, 'json')
    }
}
var PadWeacher = {
    addWeacher: function() {
        $('#type').html("<h1>添加</h1>");
        $('#id').val('');
        $('#wname').val('');
        $('#pathname').val('');
        $('#description').html('');
        $("#PadWeather").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
    },
    updWeacher: function(id) {
        var url = Basic.path + "/PadWeather/form.html";
        $.post(url, {"id": id}, function(msg) {
            try {
                if (msg.ret == 1) {
                    $('#type').html("<h1>修改</h1>");
                    $('#id').val(msg.info.id);
                    $('#wname').val(msg.info.name);
                    $('#pathname').val(msg.info.pathname);
                    $('#description').html(msg.info.description);
                } else {
                    alert(msg.msg);
                }
                $("#PadWeather").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
            } catch (e) {
            }
        }, 'json')
    },
    saveWeacher: function() {
        var Id = $('#id').val();
        var Name = $('#wname').val();
        var Pathname = $('#pathname').val();
        var Description = $('#description').val();
        var isok = true;
        var msg;
        if (Check.trim(Name) == "") {
            $("#error").html("场景名称不能为空!");
            isok = false;
            return false;
        }
        if (Check.trim(Pathname) == "") {
            $("#error").html("文件夹不能为空!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/PadWeather/save.html";
            $.post(url, {"id": Id, "name": Name, "pathname": Pathname, "description": Description},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadWeather/index.html";
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                }
            });
        }
    },
    delWeacher: function(id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/PadWeather/del.html";
            $.get(url, {id: id}, function(msg) {
                try {
                    if (msg.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadWeather/index.html";
                    } else {
                        alert(msg.msg);
                    }
                } catch (e) {
                }
            }, 'json')

        } else {
            return false;
        }
    },
    weacherHidediv: function() {
        $('#id').val('');
        $('#wname').val('');
        $('#pathname').val('');
        $('#description').val('');
        $("#PadWeather").animate({opacity: "hide"}, "slow");
    },
    addWeatherConnect: function(weatcher_id) {
        $('#type').html("<h1>添加</h1>");
        $('#weatherid').val(weatcher_id);
        $('#id').val('');
        $('#code').val('');
        $("#PadWeather").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
    },
    saveWeatherConnect: function() {
        var Id = $('#id').val();
        var Weather_id = $('#weatherid').val();
        var Code = $('#code').val();
        var isok = true;
        var msg;
        if (Check.trim(Code) == "") {
            $("#error").html("编码不能为空!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/PadWeatherConnect/save.html";
            $.post(url, {"id": Id, "weather_id": Weather_id, "code": Code},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadWeatherConnect/index.html?id=" + Weather_id;
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                }
            });
        }
    },
    updWeacherConnect: function(id) {
        var url = Basic.path + "/PadWeatherConnect/form.html";
        $.post(url, {"id": id}, function(msg) {
            try {
                if (msg.ret == 1) {
                    $('#type').html("<h1>修改</h1>");
                    $('#id').val(msg.info.id);
                    $('#weatherid').val(msg.info.weather_id);
                    $('#code').val(msg.info.code);
                } else {
                    alert(msg.msg);
                }
                $("#PadWeather").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
            } catch (e) {
            }
        }, 'json')
    },
    delWeacherConnect: function(id, weather_id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/PadWeatherConnect/del.html";
            $.get(url, {id: id}, function(msg) {
                try {
                    if (msg.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadWeatherConnect/index.html?id=" + weather_id;
                    } else {
                        alert(msg.msg);
                    }
                } catch (e) {
                }
            }, 'json')

        } else {
            return false;
        }
    },
    addWeatherImage: function(weatcher_id) {
        $('#type').html("<h1>添加</h1>");
        $('#weatherid').val(weatcher_id);
        $('#id').val('');
        $('#path').val('');
        $('#path_old').val('');
        $('#pathurl').attr('src', '');
        $('#pathbigurl').attr('src', '');
        $("#PadWeather").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
    },
    saveWeatherImage: function() {
        var Id = $('#id').val();
        var Weather_id = $('#weatherid').val();
        var Coverpath = $("#path").val();
        var Path_old = $("#path_old").val();
        var Sort = $('#sort').val();
        var isok = true;
        var msg;
        if (Check.trim(Coverpath) == "") {
            $("#error").html("请上传图片背景!");
            isok = false;
            return false;
        }
        if (Check.trim(Sort) == "") {
            $("#error").html("请填写排序!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/PadWeatherImage/existSort.html";
            $.post(url, {"id": Id, "sort": Sort, "weather_id": Weather_id}, function(msg) {
                try {
                    if (msg.ret == 1) {
                        $("#error").html("排序已存在!");
                    } else {
                        var url = Basic.path + "/PadWeatherImage/save.html";
                        $.post(url, {"id": Id, "weather_id": Weather_id, "coverpath": Coverpath, "path_old": Path_old, "sort": Sort},
                        function(data) {
                            try {
                                var data = jQuery.parseJSON(data);
                                if (data.ret == 1)
                                {
                                    window.parent.location.reload();
                                } else {
                                    $("#error").html(data.msg);
                                }
                            } catch (e) {
                            }
                        });
                    }
                } catch (e) {
                }
            }, 'json')
        }
    },
    delWeacherImage: function(id, weather_id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/PadWeatherImage/del.html";
            $.get(url, {id: id}, function(msg) {
                try {
                    if (msg.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadWeatherImage/index.html?id=" + weather_id;
                    } else {
                        alert(msg.msg);
                    }
                } catch (e) {
                }
            }, 'json')

        } else {
            return false;
        }
    },
    updWeacherImage: function(id) {
        var url = Basic.path + "/PadWeatherImage/form.html";
        $.post(url, {"id": id}, function(msg) {
            try {
                if (msg.ret == 1) {
                    $('#type').html("<h1>修改</h1>");
                    $('#id').val(msg.info.id);
                    $('#weatherid').val(msg.info.weather_id);
                    $('#path').val(msg.info.coverpath);
                    $('#path_old').val(msg.info.coverpath);
                    $('#sort' + msg.info.sort).attr('selected', 'selected');
                    $('#pathurl').attr('src', Basic.Weather + msg.info.coverpath);
                    $('#pathbigurl').attr('src', Basic.Weather + msg.info.nightcoverpath);
                    $("#PadWeather").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                } else {
                    alert(msg.msg);
                }
            } catch (e) {
                alert("json");
            }
        }, 'json')
    },
    batch: function()
    {
        var url = Basic.path + "/PadWeatherImage/batch.html";
        Basic.batch(url);
    },
    hidediv: function() {
        $('#id').val('');
        $("#path").val('');
        $("#path_old").val('');
        $("#PadWeather").animate({opacity: "hide"}, "slow");
    },
}
var PadCard = {
    link: function() {
        var link = $('#linktype').val();
        $('#animeName').val("");
        switch (link)
        {
            case "1":
                PadCard.linktype1();
                break;
            case "2":
                PadCard.linktype2();
                break;
            case "3":
                PadCard.linktype3();
                break;
            default:
                PadCard.linktype4();
                break;
        }
    },
    linktype1: function(page, type) {
        var animeName = "";
        if (type != "p") {
            animeName = $('#animeName').val();
        }
        PadCard.cardLinkType();
        var url = Basic.path + "/SysAnime/selAnimeByname.html";
        $.get(url, {'page': page, 'name': animeName}, function(data) {
            try {
                var pageprev = parseInt(data.page) - 1;
                if (pageprev < 1) {
                    pageprev = data.pagetotal;
                }
                var pagenext = parseInt(data.page) + 1;
                if (pagenext > data.pagetotal) {
                    pagenext = 1;
                }
                if (data.ret == 1)
                {
                    var html = '<table  border="1" cellspacing="0" cellpadding="0">';
                    html += '<tr><td></td><td align="center">ID</td><td align="center" >名称</td><td  align="center" >年龄段</td></tr>';
                    $(data.animelist).each(function(i, item) {
                        if (item.agesection == null) {
                            item.agesection = "无";
                        }
                        var name = "'" + item.name + "'";
                        html += '<tr><td width="100px;" align="center"><input class="input" style="font-size:10px;"  type="button"  onclick="PadCard.addeAnimeCard(' + item.id + ',' + name + ')"  value="确 定"/></td><td width="100" align="center" >' + item.id + '</td><td align="center" width="118" height="32">' + item.name + '</td><td width="100" align="center">' + item.agesection + '</td></tr>';
                    })
                    html += " </table>";
                    $('#Cardname').html('选择您要添加的动画片');
                    $('#CardAnime').html(html);
                    $('#Cardpageing').html(data.page + '/' + data.pagetotal);
                    $('#Cardpage').html('<a id="pageprev" onclick=" PadCard.linktype1(' + pageprev + ',' + "'p'" + ')">上一页 </a>&#12288;<a  id="pagenext" onclick=" PadCard.linktype1(' + pagenext + ',' + "'p'" + ')">下一页</a>');
                    $('#CardAnimeByname').html('<input type="text" id="animeName" class="input" value="' + data.sname + '" /><input type="button" onclick="PadCard.linktype1()" value="查询" /> <div id="error2" style="color:red"></div> ');
                    $("#PadCard").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                } else {
                    $('#error2').html(data.msg);
                }
            } catch (e) {
                // $("#error").html("JSON解析错误");
            }
        }, 'json')
    },
    linktype2: function() {
        var html = " &#12288;<input type='text' class='input' id='link' name='link' style='width:150px;' />";
        $('#cardLinkType').html(html);
    },
    addeAnimeCard: function(id, name) {
        $('#link').html('<option value="' + id + '" id="wblink">' + name + '</option> ');
        $("#PadCard").animate({opacity: "hide"}, "slow");
    },
    cardLinkType: function() {
        var html = '&#12288;<select name="link"  id="link" class="input" style="width:200px;height:25px;">';
        html += " </select> ";
        $('#cardLinkType').html(html);
    },
    hidediv: function() {
        $("#PadCard").animate({opacity: "hide"}, "slow");
    },
    cardReturn: function(column_id) {
        window.location.href = Basic.path + "/SysCard/index.html";
    },
}
var SysUser = {
    addUser: function() {
        $('#style').html("<h1>添加用户</h1>");
        $("#SysUserFrom").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
    },
    saveUser: function() {
        var Id = $('#id').val();
        var Username = $('#username').val();
        var Password = $('#password').val();
        var Qrpassword = $('#qrpassword').val();
        var Nickname = $('#nickname').val();
        var Authority = new Array();
        $("input[name='authority']:checkbox").each(function() {
            if ($(this).attr("checked")) {
                Authority.push($(this).val());
            }
        });
        var isok = true;
        var msg;
        if (Check.trim(Username) == "") {
            $("#error").html("用户名不能为空!");
            isok = false;
            return false;
        }
        if (Check.trim(Password) == "") {
            $("#error").html("密码不能为空!");
            isok = false;
            return false;
        }
        if (Check.trim(Password) != Check.trim(Qrpassword)) {
            $("#error").html("俩次密码不一致!");
            isok = false;
            return false;
        }
        if (Authority.length <= 0) {
            $("#error").html("请选择权限!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/SysUser/save.html";
            $.post(url, {"id": Id, "username": Username, "password": Password, "qrpassword": Qrpassword, "nickname": Nickname, "authority": Authority},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysUser/index.html";
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                }
            });
        }
    },
    delUser: function(id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/SysUser/del.html";
            $.get(url, {id: id}, function(msg) {
                try {
                    if (msg.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysUser/index.html";
                    } else {
                        alert(msg.msg);
                    }
                } catch (e) {
                }
            }, 'json')

        } else {
            return false;
        }
    },
    updUser: function(id) {
        var url = Basic.path + "/SysUser/form.html";
        $("input[name='authority']:checkbox").each(function() {
            $(this).attr("checked", "");
        });
        $.post(url, {"id": id}, function(msg) {
            try {
                if (msg.ret == 1) {
                    $('#style').html("<h1>用户修改</h1>");
                    $('#id').val(msg.info.id);
                    $('#username').val(msg.info.username);
                    $('#password').val(msg.info.password);
                    $('#qrpassword').val(msg.info.password);
                    $('#nickname').val(msg.info.nickname);
                    $(msg.modul_ids).each(function(i, item) {
                        $('#' + item).attr("checked", "checked");
                    })
                    $("#SysUserFrom").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                } else {
                    alert(msg.msg);
                }
            } catch (e) {
                alert("json");
            }
        }, 'json')
    },
    returnUser: function() {
        window.location.href = Basic.path + "/SysUser/index.html";
    },
}
var PadTransceiver = {
    addBluetooth: function() {
        window.location.href = Basic.path + "/PadBluetooth/form.html";
    },
    BluetoothReturn: function() {
        window.location.href = Basic.path + "/PadBluetooth/index.html";
    },
    saveBluetooth: function() {
        var Id = $('#id').val();
        var Name = $('#name').val();
        var Versions = $('#versions').val();
        var Path = $("#path").val();
        var Path_old = $("#path_old").val();
        var isok = true;
        var msg;
        if (Check.trim(Name) == "") {
            $("#error").html("蓝牙名称不能为空!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/PadBluetooth/save.html";
            $.post(url, {"id": Id, "name": Name, "versions": Versions, "path": Path, "path_old": Path_old},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadBluetooth/index.html";
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }
            });
        }
    },
    bluetoothDel: function(id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/PadBluetooth/del.html";
            $.get(url, {"id": id}, function(msg) {
                try {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadBluetooth/index.html";
                    } else {
                        alert(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }

            })
        } else {
            return false;
        }
    },
    addTransceive: function() {
        $('#head').html("添加电台")
        $('[class="input"]').val('');
        $('#description').val('');
        $("#sceiverForm").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
    },
    saveTransceiver: function() {
        var Id = $('#id').val();
        var Name = $('#name').val();
        var Sort = $('#sort').val();
        var Path = $("#path").val();
        var Hertz = $('#hertz').val();
        var Path_old = $("#path_old").val();
        var Description = $('#description').val();
        var isok = true;
        var msg;
        if (Check.trim(Name) == "") {
            $("#error").html("电台名称不能为空!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/PadTransceiver/save.html";
            $.post(url, {"id": Id, "name": Name, "hertz": Hertz, "sort": Sort, "description": Description, "path": Path, "path_old": Path_old},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadTransceiver/index.html";
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }
            });
        }
    },
    updTransceiver: function(id) {
        var url = Basic.path + "/PadTransceiver/form.html";
        $.post(url, {"id": id},
        function(data) {
            try {
                var data = jQuery.parseJSON(data);
                if (data.ret == 1)
                {
                    $('#head').html('<h1>修改电台</h1>');
                    $('#id').val(data.info.id);
                    $('#name').val(data.info.name);
                    $('#sort').val(data.info.sort);
                    $('#path').val(data.info.path);
                    $('#hertz').val(data.info.hertz);
                    $('#path_old').val(data.info.path);
                    $('#description').val(data.info.description);
                    $('#pathurl').attr('src', Basic.Image + '/' + data.info.path);
                    $('#pathurl').css('display', 'block');
                    $("#sceiverForm").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                } else {
                    $("#error").html(data.msg);
                }
            } catch (e) {
                $("#error").html("JSON解析错误");
            }
        });
    },
    delTransceiver: function(id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/PadTransceiver/del.html";
            $.get(url, {"id": id}, function(msg) {
                try {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/PadTransceiver/index.html";
                    } else {
                        alert(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }

            })
        } else {
            return false;
        }
    },
    transceiverMusic: function(id) {
        window.location.href = Basic.path + "/PadTransceiver/music.html?id=" + id;
    },
    addMusic: function(id) {
        window.location.href = Basic.path + "/PadTransceiver/musicForm.html?id=" + id;
    },
    hidden: function() {
        $('#pathurl').css('display', 'none');
        $("#sceiverForm").animate({opacity: "hide"}, "slow");
    },
}
var SysHall = {
    Hall: function(page, mark) {
        var url = Basic.path + "/SysHall/getBaby.html";
        var name = $('#name').val();
        $.get(url, {'page': page, 'name': name}, function(data) {
            try {
                if (data.info.ret == 1) {
                    var pageprev = parseInt(data.page) - 1;
                    if (pageprev < 1) {
                        pageprev = data.pagetotal;
                    }
                    var pagenext = parseInt(data.page) + 1;
                    if (pagenext > data.pagetotal) {
                        pagenext = 1;
                    }
                    var html = '<table  border="1" cellspacing="0" cellpadding="0">';
                    html += '<tr><td></td><td align="center">名称</td><td align="center" >封面</td><td  align="center" >性别</td></tr>';
                    $(data.list).each(function(i, item) {
                        if (item.sex == 1) {
                            var sexname = '女';
                        } else if (item.sex == 2) {
                            var sexname = '男';
                        } else {
                            var sexname = '保密';
                        }
                        html += '<tr><td width="100px;" align="center"><input class="input" style="font-size:10px;"  type="button" onclick="SysHall.addHall(' + item.user_id + "," + mark + ')" value="确 定"/></td><td width="100" align="center" >' + item.name + '</td><td align="center" width="118" height="32"><img src="' + item.coverpath + '" style="height:50px; width:80px; border:3px solid #CCC;"></td><td width="100" align="center">' + sexname + '</td></tr>';
                    })
                    html += " </table>";
                    $('#lists').html(html);
                    $('#babyTitle').html('选择您要添加的宝宝封面');
                    $('#babyPage').html(data.page + '/' + data.pagetotal);
                    $('#babyPageIng').html('<a id="pageprev" onclick=" SysHall.Hall(' + pageprev + ',' + mark + ')">上一页 </a>&#12288;<a  id="pagenext" onclick=" SysHall.Hall(' + pagenext + ',' + mark + ')">下一页</a>');
                    $('#babyName').html('<input type="text" id="name" class="input"  value="' + data.bobyname + '"/><input type="button" onclick=" SysHall.Hall(' + 1 + "," + mark + ')" value="查询" /><div id="error1" style="color:red"></div> ');
                    $("#babyList").animate({left: $(document).width() - 800, top: -$(document).height() + 100, opacity: "show"}, "slow");
                } else {
                    $('#error1').html(data.info.msg);
                }

            } catch (e) {
                alert('解析错误');
            }
        }, 'json')
    },
    addHall: function(id, mark) {
        var url = Basic.path + "/SysHall/saveHall.html";
        $.post(url, {"id": id, "mard": mark},
        function(msg) {
            try {
                var data = jQuery.parseJSON(msg);
                if (data.ret == 1) {
                    window.parent.location.reload();
                } else {
                    alert(data.msg);
                }
            } catch (e) {
                alert('解析错误');
            }
        });
    },
    hidediv: function() {
        $('#name').val('');
        $("#babyList").animate({opacity: "hide"}, "slow");
    }

}
var LogFiles = {
    url: function(name) {
        window.location.href = Basic.path + "/SysLogFiles/downLoads.html?name=" + name;
    },
    batch: function()
    {
        var url = Basic.path + "/SysLogFiles/batch.html";
        LogFiles.batchs(url);
    },
    LogDel: function(id)
    {
        try {
            if (confirm("确定要删除!")) {
                var url = Basic.path + "/SysLogFiles/del.html";
                $.get(url, {id: id}, function(msg) {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1) {
                        window.location.href = Basic.path + "/SysLogFiles/index.html";
                    } else {
                        alert(data.msg);
                    }
                })
            } else {
                return false;
            }
        } catch (e) {
            // $("#error").html("JSON解析错误");
        }
    },
    batchs: function(url)
    {
        var ids = "";
        var urls = "";
        $("input[name='cid']").each(function(index, element) {
            if (this.checked == true) {
                var val = $(this).val();
                var url = $('#' + val).val();
                ids += val + ",";
                urls += url + ',';
            }
        });
        if (ids != "") {
            ids = ids.substr(0, ids.length - 1);
            $.post(url, {"sign": $("#sign").val(), "ids": ids, 'urls': urls},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1) {
                        window.location.reload();
                    } else if (data.ret == 2) {
                        LogFiles.url(data.msg);
                    } else {
                       alert(data.msg);
                    }
                } catch (e) {
                    // alert("JSON解析错误");
                }
            });
        } else {
            alert("请选择信息!");
        }
    },
}