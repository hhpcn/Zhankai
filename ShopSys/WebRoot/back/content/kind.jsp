<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
 String path = request.getContextPath();
 String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<title>产品管理</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<link rel="stylesheet" href="<%=basePath %>/common/ace/assets/css/jquery-ui.css" />
<link rel="stylesheet" href="<%=basePath %>/common/ace/assets/css/ui.jqgrid.css" />
<!-- ajax layout which only needs content area -->
	<!-- <div class="page-header">
							<h1>
								jqGrid
								<small>
									<i class="ace-icon fa fa-angle-double-right"></i>
									Dynamic tables and grids using jqGrid plugin
								</small>
							</h1>
	</div> -->
	<!-- /.page-header -->


<div class="row">
	<div class="col-xs-12">
		<!-- PAGE CONTENT BEGINS -->

		<table id="grid-table-kind"></table>

		<div id="grid-pager-kind"></div>
		
		<script type="text/javascript">
			var $path_base = "../..";//in Ace demo this will be used for editurl parameter
		</script>

		<!-- PAGE CONTENT ENDS -->
	</div><!-- /.col -->
</div><!-- /.row -->



<!---------------- addForm start------------------->
<div  id="addkindmodal" class="modal fade"  role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" >
				<i class="ace-icon fa fa-hand-o-right icon-animated-hand-pointer blue"></i> 添加产品种类
			</h4>
	     </div>
      <div class="modal-body">
             <div class="row">
             	<form id="addkindform" class="form-horizontal" role="form">
					<div class="form-group">
						<label class="col-sm-4 control-label no-padding-right" > 种类名称： </label>
		
						<div class="col-sm-8">
							<input name="kindName" type="text"  placeholder="种类名称" class="col-xs-10 col-sm-9" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-4 control-label no-padding-right" > 栏目类别： </label>
						<div class="col-sm-8">
							<select name="category" placeholder="栏目类别" class="col-xs-10 col-sm-9">
							</select>		
						</div>
						
					</div>
					<div class="form-group">
					    
						<label class="col-sm-4 control-label no-padding-right" > 是否发布： </label>
						<div class="col-sm-8">
						    <div style="margin-top:6px;">
							    <input name="isPublish" type="radio" class="ace "  value="true" />
								<span class="lbl "> 是</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<input name="isPublish" type="radio" class="ace " value="false" checked="checked"/>
								<span class="lbl "> 否</span>
						    </div>
						
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-4 control-label no-padding-right" > 访问路径： </label>
						<div class="col-sm-8">
							<input name="pageUrl" type="text"  placeholder="访问路径" class="col-xs-10 col-sm-9" />
						</div>
					</div>
					
             </form>
            </div>
      </div>
      <div class="modal-footer" style="height:55px;">
	        <button id="cancleAdd" type="button" class="btn btn-white btn-info btn-round" data-dismiss="modal">
	        	<i class="ace-icon fa fa-times  red2"></i>取消
	        </button>
	        <button id="addKind" type="button" class="btn btn-white btn-info btn-round" >
	        	<i class="ace-icon fa fa-floppy-o  blue"></i>保存
	        </button>
	        
      </div>
    </div>
  </div>
</div>
<!-- ----------------------------addForm end------------------------------- -->




<!---------------- updateForm start------------------->
<div  id="editkindmodal" class="modal fade"  role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" >
				<i class="ace-icon fa fa-hand-o-right icon-animated-hand-pointer blue"></i> 更新产品种类
			</h4>
	     </div>
      <div class="modal-body">
             <div class="row">
             	<form id="editkindform" class="form-horizontal" role="form">
					<div class="form-group">
					    <input name="id" value="" style="display:none;"/>
						<label class="col-sm-4 control-label no-padding-right" > 种类名称： </label>
		
						<div class="col-sm-8">
							<input name="kindName" type="text"  placeholder="种类名称" class="col-xs-10 col-sm-9" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-4 control-label no-padding-right" > 栏目类别： </label>
						<div class="col-sm-8">
							<select name="category" placeholder="栏目类别" class="col-xs-10 col-sm-9">
							</select>		
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-sm-4 control-label no-padding-right" > 是否发布： </label>
						<div class="col-sm-8">
						    <div id="eIsPublish" style="margin-top:6px;">
							    <input name="isPublish" type="radio" class="ace "  value="true" />
								<span class="lbl "> 是</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<input name="isPublish" type="radio" class="ace " value="false" checked="checked"/>
								<span class="lbl "> 否</span>
						    </div>
						</div>
						
					</div>
					
					<div class="form-group">
						<label class="col-sm-4 control-label no-padding-right" > 访问路径： </label>
						<div class="col-sm-8">
							<input name="pageUrl" type="text"  placeholder="访问路径" class="col-xs-10 col-sm-9" />
						</div>
					</div>
					
             </form>
            </div>
      </div>
      <div class="modal-footer" style="height:55px;">
	        <button id="cancleEdit" type="button" class="btn btn-white btn-info btn-round" data-dismiss="modal">
	        	<i class="ace-icon fa fa-times  red2"></i>取消
	        </button>
	        <button id="editKind" type="button" class="btn btn-white btn-info btn-round" >
	        	<i class="ace-icon fa fa-floppy-o  blue"></i>保存
	        </button>
	        
      </div>
    </div>
  </div>
</div>
<!-- ----------------------------updateForm end------------------------------- -->










<!-- page specific plugin scripts -->
<script src="<%=basePath %>/js/back/kind.js"></script>
