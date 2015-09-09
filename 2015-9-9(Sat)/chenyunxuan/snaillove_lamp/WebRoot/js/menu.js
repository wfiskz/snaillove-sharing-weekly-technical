$(document).ready(function(){
				$(".box .list_1").hide();//二级默认折叠
				jQuery(".box .title_2 span").attr("class","menu2")
				$(".box .title_1").toggle(function(){
					$(".box .list_1").hide();//二级默认折叠
					$(this).next(".list").slideToggle("slow");
					jQuery(".box .title_1 span").attr("class","menu2")
                    .siblings(".menu2")
                    .attr("class", "menu1");
				},function(){
					$(".box .list_1").hide();//二级默认折叠
					$(this).next(".list").slideToggle("slow");
					jQuery(".box .title_1 span").attr("class","menu1")
                    .siblings(".menu1")
                    .attr("class", "menu2");
				})
				
				$(".box .title_2").toggle(function(){
					$(".box .list").hide("slow");//二级默认折叠
					$(this).next(".list_1").slideToggle("slow");
					jQuery(".box .title_2 span").attr("class","menu2")
                    .siblings(".menu2")
                    .attr("class", "menu1");
				},function(){
					$(".box .list").hide("slow");//二级默认折叠
					$(this).next(".list_1").slideToggle("slow");
					jQuery(".box .title_2 span").attr("class","menu1")
                    .siblings(".menu1")
                    .attr("class", "menu2");
				})
				$("#red").treeview({
					persist: "location",
					collapsed: true,
					unique: true
				});
			});