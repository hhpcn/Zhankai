var scripts = [null,"/ShopSys/common/ace/assets/js/jqGrid/jquery.jqGrid.src.js",
	               "/ShopSys/common/ace/assets/js/jqGrid/i18n/grid.locale-cn.js",
	               "/ShopSys/common/ace/assets/js/jquery.validate.js",null];
	$('.page-content-area').ace_ajax('loadScripts', scripts, function() {
	  //inline scripts related to this page

	
	jQuery(function($) {
		var grid_selector = "#grid-table-kind";
		var pager_selector = "#grid-pager-kind";
		
		//resize to fit page size
		$(window).on('resize.jqGrid', function () {
			$(grid_selector).jqGrid( 'setGridWidth', $(".page-content").width() );
	    });
		//resize on sidebar collapse/expand
		var parent_column = $(grid_selector).closest('[class*="col-"]');
		$(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
			if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
				//setTimeout is for webkit only to give time for DOM changes and then redraw!!!
				setTimeout(function() {
					$(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
				}, 0);
			}
	    });
	  
        //文档载入完成后，执行以下函数	
		jQuery(grid_selector).jqGrid({
	
			url:'/ShopSys/productmanage/kindAction_listKinds.action', //这是Action的请求地址 
			mtype: 'POST', 
			datatype: "json",
			height: 370,
			colNames:['', 'ID','类别名称','栏目id','栏目类别','是否发布','pageUrl'],
			colModel:[
				{name:'myac',index:'', width:80, fixed:true, sortable:false, resize:false,search:false,
					formatter:'actions', 
					formatoptions:{ 
						keys:true,
						//delbutton: false,//disable delete button
						delOptions:{recreateForm: true, beforeShowForm:beforeDeleteCallback},
						editbutton:false//禁用航编辑按钮
						//editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
					}
				},
				{name:'id',index:'id', width:20, sorttype:"int",search:false},
				{name:'kindName',index:'kindName', width:60,
					searchoptions:{sopt:["eq","ne","cn","nc"]}},
				{name:'categoryId',index:'categoryId', width:40,search:false,hidden:true},
				{name:'categoryName',index:'categoryName', width:120,searchoptions:{sopt:["eq","ne","cn","nc"]}},
				{name:'isPublish',index:'isPublish', width:120,searchoptions:{sopt:["eq","ne","cn","nc"]},
					formatter: publishformatter},
				{name:'pageUrl',index:'pageUrl', width:60,search:false}
			],
	
			viewrecords : true,
			rowNum:10,
			rowList:[10,20,30],
			pager : pager_selector,
			altRows: true,
			//toppager: true,
			
			multiselect: true,
			//multikey: "ctrlKey",
	        multiboxonly: true,
	
			loadComplete : function() {
				var table = this;
				setTimeout(function(){
					styleCheckbox(table);
					
					updateActionIcons(table);
					updatePagerIcons(table);
					enableTooltips(table);
				}, 0);
			},
			editurl: "/ShopSys/productmanage/kindAction_edit.action",//nothing is saved
			caption: "产品分类表格"
			
	
	
		});
		$(window).triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size
		
		
		//navButtons
		jQuery(grid_selector).jqGrid('navGrid',pager_selector,
			{ 	//navbar options
				edit: true,
				editicon : 'ace-icon fa fa-pencil blue',
				editfunc : editRecord,
				add: true,
				addicon : 'ace-icon fa fa-plus-circle purple',
				addfunc : addNewRecord,
				del: true,
				delicon : 'ace-icon fa fa-trash-o red',
				search: true,
				searchicon : 'ace-icon fa fa-search orange',
				refresh: true,
				refreshicon : 'ace-icon fa fa-refresh green',
			},
			{
				//edit record form
			},
			{
				//new record form
			},
			{
				//delete record form
				recreateForm: true,
				beforeShowForm : function(e) {
					var form = $(e[0]);
					if(form.data('styled')) return false;
					
					form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
					style_delete_form(form);
					
					form.data('styled', true);
				},
				onClick : function(e) {
					alert(1);
				}
			},
			{
				
				//search form
				
				recreateForm: true,
				afterShowSearch: function(e){
					var form = $(e[0]);
					form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
					style_search_form(form);
				},
				afterRedraw: function(){
					style_search_filters($(this));
				}
				,
				multipleSearch: true,
				/**
				multipleGroup:true,
				showQuery: true
				*/
			}
		);
	
		function style_delete_form(form) {
			var buttons = form.next().find('.EditButton .fm-button');
			buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
			buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
			buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
		}
		
		function style_search_filters(form) {
			form.find('.delete-rule').val('X');
			form.find('.add-rule').addClass('btn btn-xs btn-primary');
			form.find('.add-group').addClass('btn btn-xs btn-success');
			form.find('.delete-group').addClass('btn btn-xs btn-danger');
		}
		function style_search_form(form) {
			var dialog = form.closest('.ui-jqdialog');
			var buttons = dialog.find('.EditTable');
			buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
			buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
			buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
		}
		
		function beforeDeleteCallback(e) {
			var form = $(e[0]);
			if(form.data('styled')) return false;
			
			form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
			style_delete_form(form);
			
			form.data('styled', true);
		}
		
		function beforeEditCallback(e) {
			var form = $(e[0]);
			form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
			style_edit_form(form);
		}
	
	
	
		//it causes some flicker when reloading or navigating grid
		//it may be possible to have some custom formatter to do this as the grid is being created to prevent this
		//or go back to default browser checkbox styles for the grid
		function styleCheckbox(table) {
		
		}
		
	
		//unlike navButtons icons, action icons in rows seem to be hard-coded
		//you can change them like this in here if you want
		function updateActionIcons(table) {
			
		}
		
		//replace icons with FontAwesome icons like above
		function updatePagerIcons(table) {
			var replacement = 
			{
				'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
				'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
				'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
				'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
			};
			$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
				var icon = $(this);
				var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
				
				if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
			});
		}
	
		function enableTooltips(table) {
			$('.navtable .ui-pg-button').tooltip({container:'body'});
			$(table).find('.ui-pg-div').tooltip({container:'body'});
		}
	
		$(document).one('ajaxloadstart.page', function(e) {
			$(grid_selector).jqGrid('GridUnload');
			$('.ui-jqdialog').remove();
		});
		
		
		
/**********************更新产品分类开始*****************************************************/
		var editIds;//存储表格上选中的记录的id
		var editIdsArr= new Array(); //editIds转成数组
		
		
		//修改类别的div模态化
		$('#editkindmodal').modal({
			  keyboard: false,
			  show:false
		});
		//模态框展开时触发的操作
		$('#editkindmodal').on('show.bs.modal', function (e) {
			 //ajax获取栏目种类,初始化种类下拉选择框
			$.ajax({
        		url:"/ShopSys/productmanage/categoryAction_listCategoryForKind.action",
        		type:"post",
        		dataType:"json",
        		success:function(data){
        			var categorys=data.rows;
        			var options="";
        			$("#editkindform select[name='category']").empty();
        			for(var i=0;i<categorys.length;i++){
        				options=options+"<option value='"+categorys[i].id+"'>"+categorys[i].categoryName+"</option>";
        			}
        			$("#editkindform select[name='category']").append(options);
        			loadEditData();
        		}
        	});
		  
        });
		
		
		
		//点击更新记录按钮
		function editRecord(){
			editIds=$(grid_selector).jqGrid('getGridParam','selarrrow');
			editIdsArr =editIds.toString().split(",");
		    if(editIdsArr.length>1){
		    	alert("不能同时选中多行进行编辑，请重新选择！");
		    	return false;
		    }
		    $('#editkindmodal').modal('show');
		 
		}
		
		//数值初始化
		function loadEditData(){
			//ajax，根据id到取得记录
			$.ajax({
        		url:"/ShopSys/productmanage/kindAction_loadKindById.action",
        		type:"post",
        		dataType:"json",
        		data:{
        			"id":editIdsArr[0]
        		},
        		success:function(data){
        			var kind=data.kind;
        			$("#editkindform input[name='id']").val(kind.id);
        			$("#editkindform input[name='kindName']").val(kind.kindName);
        			$("#editkindform input[name='pageUrl']").val(kind.pageUrl);
        			$("#editkindform select[name='category'] option[value='"+kind.categoryId+"']").attr("selected","selected");
        			
        			if(kind.isPublish){
        				$("#eIsPublish").empty().html(
            					"<input name='isPublish' type='radio' class='ace '  value='true' checked='checked'/>" +
            					"<span class='lbl '> 是</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
            					"<input name='isPublish' type='radio' class='ace ' value='false' />" +
            					"<span class='lbl '> 否</span>"
            			);
        			}else{
        				$("#eIsPublish").empty().html(
            					"<input name='isPublish' type='radio' class='ace '  value='true' />" +
            					"<span class='lbl '> 是</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
            					"<input name='isPublish' type='radio' class='ace ' value='false' checked='checked'/>" +
            					"<span class='lbl '> 否</span>"
            			);
        			}
        				
        			
        		}
        	});
		}
		
		//点击对话框保存按钮，保存产品种类信息
		$("#editKind").on("click",function(){
			var id=$("#editkindform input[name='id']").val();
			var kindName=$("#editkindform input[name='kindName']").val();
			var pageUrl=$("#editkindform input[name='pageUrl']").val();
			var categoryId=$("#editkindform select[name='category']").val();
			var categoryName=$("#editkindform select[name='category'] option:selected").text();
			var isPublish=$("#editkindform input[name='isPublish']:checked").val();
			
			$.ajax({
        		url:"/ShopSys/productmanage/kindAction_updateKind.action",
        		type:"post",
        		dataType:"json",
        		data:{
        				"kind.id":id,
        				"kind.kindName":kindName,
        				"kind.pageUrl":pageUrl,
        				"kind.categoryId":categoryId,
        				"kind.categoryName":categoryName,
        				"kind.isPublish":isPublish
        		},
        		success:function(d){
        			$('#editkindmodal').modal('hide');
        			jQuery(grid_selector).jqGrid().trigger("reloadGrid");
        		}
        	});
			
			
		});
		
		//点击取消按钮时，也清空表单
		$("#cancleEdit").on("click",function(){
			
		});

		
/**********************更新产品分类结束*****************************************************/	
		
		
		
		
		
/**********************增加记录开始*******************************************************/
		//增加类别的div模态化
		$('#addkindmodal').modal({
			  keyboard: false,
			  show:false
		});
		//模态框展开时触发的操作
		$('#addkindmodal').on('show.bs.modal', function (e) {
			 //ajax获取栏目种类,初始化种类下拉选择框
			$.ajax({
        		url:"/ShopSys/productmanage/categoryAction_listCategoryForKind.action",
        		type:"post",
        		dataType:"json",
        		success:function(data){
        			var categorys=data.rows;
        			var options="";
        			$("#addkindform select[name='category']").empty();
        			for(var i=0;i<categorys.length;i++){
        				options=options+"<option value='"+categorys[i].id+"'>"+categorys[i].categoryName+"</option>";
        			}
        			$("#addkindform select[name='category']").append(options);
        		}
        	});
		  
        });
		
		
		
		//增加一条记录，弹出对话框
		function addNewRecord(){
			$('#addkindmodal').modal('show');
		}
		
		//点击对话框保存按钮，保存产品信息
		$("#addKind").on("click",function(){
			var kindName=$("#addkindform input[name='kindName']").val();
			var pageUrl=$("#addkindform input[name='pageUrl']").val();
			var categoryId=$("#addkindform select[name='category']").val();
			var categoryName=$("#addkindform select[name='category'] option:selected").text();
			var isPublish=$("#addkindform input[name='isPublish']:checked").val();
			$.ajax({
        		url:"/ShopSys/productmanage/kindAction_addKind.action",
        		type:"post",
        		dataType:"json",
        		data:{
        				"kind.kindName":kindName,
        				"kind.pageUrl":pageUrl,
        				"kind.categoryId":categoryId,
        				"kind.categoryName":categoryName,
        				"kind.isPublish":isPublish
        		},
        		success:function(d){
        			$('#addkindmodal').modal('hide');
        			jQuery(grid_selector).jqGrid().trigger("reloadGrid");
        		}
        	});
			
			
		});
		
		//点击取消按钮时，也清空表单
		$("#cancleAdd").on("click",function(){
			
		});
		
		
		
/*******************增加记录结束***********************************************************/
	
		
		
	});
	
	//publish格式转换
	function publishformatter( cellvalue, options, cell){
		if(cellvalue == true){
			return "是";
		}else{
			return "否";
		}
	   // return $('img', cell).attr('src');
	}

});
