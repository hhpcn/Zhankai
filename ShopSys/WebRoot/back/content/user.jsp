<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<title>用户管理</title>

<link rel="stylesheet" href="<%=basePath %>/common/ace/assets/css/jquery-ui.css" />
<link rel="stylesheet" href="<%=basePath %>/common/ace/assets/css/datepicker.css" />
<link rel="stylesheet" href="<%=basePath %>/common/ace/assets/css/ui.jqgrid.css" />

<!-- ajax layout which only needs content area -->

<div class="row">
	<div class="col-xs-12">
		<!-- PAGE CONTENT BEGINS -->

		<table id="grid-table"></table>

		<div id="grid-pager"></div>
		
		<script type="text/javascript">
			var $path_base = "../..";//in Ace demo this will be used for editurl parameter
		</script>

		<!-- PAGE CONTENT ENDS -->
	</div><!-- /.col -->
</div><!-- /.row -->

<!-- page specific plugin scripts -->
<script src="<%=basePath %>/js/back/user.js"></script>
