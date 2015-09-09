$(function(){ 
                //全选与全不选 
                $("#ckall").click(function() 
                { 
                    $("[name=ck]:checkbox").attr("checked",this.checked); 
                }); 
                var objs=$("[name=ck]:checkbox"); 
                
                //当一个个的全部选中的时候 全选的按钮也是需要选中的 
                objs.click(function(){ 
                    $("#ckall").attr("checked",objs.length==objs.filter(":checked").length); 
                }); 
                
                
                 
                //  //全选与全不选   button
				$("#selectall").click(function() { 
				$(".userid").each(function() { 
				if (this.checked == true) { 
				this.checked = false; 
				} else { 
				this.checked = true; 
				} 
				}) 
				}); 
                    //批量删除 
            $("#largeDel").click(function () { 
                var str = ""; 
                $.each($("input[type='checkbox'][id!=ckall]"), function (k, v) { 
                    if (v.checked == false) 
                    { 
                        return; 
                    } 
                    else 
                    { 
                        str += v.value + ","; 
                    } 
                }); 
                if (str == "") 
                { 
                    alert("请选中一项"); 
                    return; 
                } 
                else if (confirm("确认删除吗?")) 
                { 
                    str = str.substring(0, str.length - 1); 
                    	$.ajax( {
									type : "POST",
									url : "/mother/web/deleteNewsAll.action",
									data : {
										
										"ids" : str
									},
									dataType : "json",
									success : function(data) {
									if(data.status == 1){
							              getBannerListContent(1);
							            }else{
							             alert("删除失败！");	
							            }
										
										
									}
								});
		                } 
		            }); 
                
             }); 
