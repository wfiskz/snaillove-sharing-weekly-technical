<%@ page language="java" import="java.util.*,java.io.*"
	pageEncoding="UTF-8"%>
<div id="pagerinfo" class="paging fr"></div>
<script src="${ctx}/js/jquery-pager-1.0.js" type="text/javascript"></script>
<script type="text/javascript">
	$(document).ready(function() {
		//加载的总条数及加载进来显示的页码
		InitPager(${page.totalPage*10}, ${page.currentPage});

	});
	function InitPager(RecordCount, PageIndex) {
		$("#pagerinfo").setPager({
			RecordCount : RecordCount,
			PageIndex : PageIndex,
			buttonClick : PageClick
		});
		// $("#result").html(index.jsp);
		$("#result").html("您点击的是第" + PageIndex + "页");
	};
</script>