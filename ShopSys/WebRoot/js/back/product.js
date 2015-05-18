var scripts = [null,"/ShopSys/common/ace/assets/js/dropzone.js",
	               "/ShopSys/common/ace/assets/js/date-time/moment.js",
	               "/ShopSys/common/ace/assets/js/date-time/moment-with-locales.js",
	               "/ShopSys/common/ace/assets/js/date-time/bootstrap-datetimepicker.js",
	               "/ShopSys/common/ace/assets/js/jqGrid/jquery.jqGrid.src.js",
	               "/ShopSys/common/ace/assets/js/jqGrid/i18n/grid.locale-cn.js",
	               "/ShopSys/common/ace/assets/js/jquery.validate.js",null];
	$('.page-content-area').ace_ajax('loadScripts', scripts, function() {
	  //inline scripts related to this page
		//数组根据值删除掉该元素
		 Array.prototype.indexOf = function(val) {  
	         for (var i = 0; i < this.length; i++) {  
	             if (this[i] == val) return i;  
	         }  
	         return -1;  
	     };  
	     Array.prototype.remove = function(val) {  
	         var index = this.indexOf(val);  
	         if (index > -1) {  
	             this.splice(index, 1);  
	         }  
	     }; 
	     
		
		
		
	
	jQuery(function($) {
		var grid_selector = "#grid-table-product";
		var pager_selector = "#grid-pager-product";
		
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
	
			url:'/ShopSys/productmanage/productAction_listProducts.action', //这是Action的请求地址 
			mtype: 'POST', 
			datatype: "json",
			height: 370,
			colNames:['', 'ID','产品编号','名称', '类别','价格','品牌','创建日期','是否发布','url'],
			colModel:[
				{name:'myac',index:'', width:50, fixed:true, sortable:false, resize:false,search:false,
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
				{name:'productNo',index:'productNo', width:60,editable: true,editoptions:{size:"20",maxlength:"30"},
					searchoptions:{sopt:["eq","ne","cn","nc"]}},
				{name:'productName',index:'productName', width:120,editable: true,editoptions:{size:"20",maxlength:"30"},
					searchoptions:{sopt:["eq","ne","cn","nc"]}},
				{name:'kindName',index:'kindName', width:60,editable: true,editoptions:{size:"20",maxlength:"30"},
					searchoptions:{sopt:["eq","ne","cn","nc"]}},
				{name:'price',index:'price', width:40,editable: true,editoptions:{size:"20",maxlength:"30"},
					searchoptions:{sopt:["eq","ne","cn","nc"]}},
				{name:'brandName',index:'brandName', width:80,editable: true,editoptions:{size:"20",maxlength:"30"},
					searchoptions:{sopt:["eq","ne","cn","nc"]}},
				{name:'createTime',index:'createTime', width:100,searchoptions:{sopt:["eq","ne","cn","nc"]}},
				{name:'isPublish',index:'isPublish', width:45,searchoptions:{sopt:["eq","ne"]},formatter: publishformatter},
				{name:'url',index:'url', width:150,editable: true,editoptions:{size:"20",maxlength:"30"},search:false}
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
			editurl: "/ShopSys/productmanage/productAction_edit.action",//nothing is saved
			caption: "产品表格"
			
	
	
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
				refreshicon : 'ace-icon fa fa-refresh green'
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
			},
			{
				//view record form
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
			/**
			var replacement = 
			{
				'ui-ace-icon fa fa-pencil' : 'ace-icon fa fa-pencil blue',
				'ui-ace-icon fa fa-trash-o' : 'ace-icon fa fa-trash-o red',
				'ui-icon-disk' : 'ace-icon fa fa-check green',
				'ui-icon-cancel' : 'ace-icon fa fa-times red'
			};
			$(table).find('.ui-pg-div span.ui-icon').each(function(){
				var icon = $(this);
				var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
				if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
			})
			*/
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
		
		
		
		//publish格式转换
		function publishformatter( cellvalue, options, cell){
			if(cellvalue == true){
				return "是";
			}else{
				return "否";
			}
		   // return $('img', cell).attr('src');
		}
		
/*****************添加产品开始************************************************************/
		var guideImgArray = new Array();
		//添加界面上传引导图插件
		try {
			  Dropzone.autoDiscover = false;
			  var myDropzone = new Dropzone("#dropzone" , {
			    paramName: "guideImg", // The name that will be used to transfer the file
			    maxFilesize:2.0, // MB
				maxFiles: 1000,
				addRemoveLinks : true,
				init:function(){
					this.on("success",function(file,data){
						file.serverId = data.guideImgUrl;
						guideImgArray.push(file.serverId);
						$("#addProductform input[name='guideMap']").val(guideImgArray.join(";"));
					});
					this.on("maxfilesexceeded",function(){
						alert("引导图最多1000张");
					});
					this.on("removedfile",function(file){
						
					var message=file.serverId;
					$.post("/ShopSys/ckeditorUploadAction_removeFile.action",{message:message},function(data){
						//更新input guidemap的值
						guideImgArray.remove(message);
						$("#addProductform input[name='guideMap']").val(guideImgArray.join(";"));
					});
					$("#addProductform input[name='guideMap']").val("");
					
				});
					
				},
				dictDefaultMessage :
				'<span class="bigger-150 bolder"></span>  \
				<span class="smaller-80 grey">上传引导图</span> <br /> \
				<i class="upload-icon ace-icon fa fa-cloud-upload blue fa-3x"></i>'
			,
				dictResponseError: '上传失败！',
				dictRemoveFile:'删除',
			
				
				//change the previewTemplate to use Bootstrap progress bars
				previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>"
			  });
			  
			   $(document).one('ajaxloadstart.page', function(e) {
					try {
						myDropzone.destroy();
						myDropzone.init();
					} catch(e) {}
			   });
			
			} catch(e) {
			  alert('不支持该版本的浏览器!');
			}
		
		
		
		
		//增加类别的div模态化
		$('#addProductmodal').modal({
			  keyboard: false,
			  show:false
		});
		//模态框展开时触发的操作
		$('#addProductmodal').on('show.bs.modal', function (e) {
			//初始化增加产品界面的时间
			var nowTime=getNowTime();
			$("#createTime").val(nowTime);
			//日期控件
			$('#createTime').datetimepicker(
					{
	                    language: 'zh-CN'
					}
				).next().on(ace.click_event, function(){
				$(this).prev().focus();
			});
			
			//初始化优先级为10
			$("#addProductform input[name='priority']").val(10);
			
			
		});
		
		//模态框展开时触发的操作
		$('#addProductmodal').on('shown.bs.modal', function (e) {
			//加载栏目
			loadCategory("category","kind");
			
		});
		
		
		
		//增加一条记录，弹出对话框
		function addNewRecord(){
			$("#addProductform input[name='id']").val("");
			//清空引导图
			clearGuideMap();
			$('#addProductmodal').modal('show');
		}
		
		
		
		//点击对话框保存按钮，保存产品信息
		$("#saveProduct").on("click",function(){
			var productId=$("#addProductform input[name='id']").val();
			var productNo = $("#addProductform input[name='productNo']").val();
			var productName=$("#addProductform input[name='productName']").val();
			var price=$("#addProductform input[name='price']").val();
			var color=$("#addProductform input[name='color']").val();
			var brandId=$("#addProductform select[name='brand'] option:selected").val();
			var kindId=$("#kind").val(); //类别id
			var url=$("#addProductform input[name='url']").val();
			var createTime=$("#createTime").val();
			var priority=$("#addProductform input[name='priority']").val();
			var isPublish=$("#addProductform input[name='isPublish']:checked").val();
			var guideMap=$("#addProductform input[name='guideMap']").val();
			var detailInfo=CKEDITOR.instances.editor1.getData();
			var imgUrls="";
			var retImgArr = detailInfo.match(/src\s*=\s*[\"|\']?\s*[^>\"\'\s]*\.(jpg|jpeg|png|gif|bmp)[\"|\']?/gi);
			 if(retImgArr!=null){
				 for(var i=0;i<retImgArr.length;i++)
				 {
				    relativeImgArr=retImgArr[i].match(/\/img\s*[^>\"\'\s]*\.(jpg|jpeg|png|gif|bmp)/gi);
				    if(i>0)
					    imgUrls+="|";
				    imgUrls=imgUrls+relativeImgArr[0];
				    
				 }
			 }
			
			 
			 
			$.ajax({
        		url:"/ShopSys/productmanage/productAction_addProduct.action",
        		type:"post",
        		dataType:"json",
        		data:{
        			    "product.id":productId,
        				"product.productNo":productNo,
        				"product.productName":productName,
        				"product.price":price,
        				"product.color":brandId,
        				"product.url":url,
        				"product.brandId":brandId,
        				"product.kindId":kindId,
        				"product.imgUrls":imgUrls,
        				"product.detailInfo":detailInfo,
        				"product.createTime":createTime,
        				"product.priority":priority,
        				"product.isPublish":isPublish,
        				"product.guideMap":guideMap,
        				"product.color":color
        				
        				
        		},
        		success:function(d){
        			
        			$('#addProductmodal').modal('hide');
        			jQuery(grid_selector).jqGrid().trigger("reloadGrid");
        			//清空表单
        			clearaddProductform();
        		}
        	});
			
		});
		
		//点击取消按钮时，也清空表单
		$("#cancleAddProduct").on("click",function(){
			//清空表单
			clearaddProductform();
		});
		
		
		
		
		//清空表单
		function clearaddProductform(){
			$("#addProductform input[name='id']").val("");
			$("#addProductform input[name='productNo']").val("");
			$("#addProductform input[name='productName']").val("");
			$("#addProductform input[name='price']").val("");
			$("#addProductform input[name='color']").val("");
			$("#addProductform input[name='url']").val();
			$("#createTime").val(getNowTime());
			$("#addProductform input[name='priority']").val(10);
			$("#addProductform select option").removeAttr('selected');
			$("#addProductform select[name='brand'] option[value=0]").attr("selected", "selected");
			$("#addProductform select[name='kind'] option[value=0]").attr("selected", "selected");
			$("select").trigger("liszt:updated");//更新前端界面
			$("#addProductform input[name='isPublish'][value=true]").attr("checked","selected");
			$("#addProductform input[name='guideMap']").val("");
			CKEDITOR.instances.editor1.setData("");
		}
		
		//清空引导图插件上的内容
		function clearGuideMap(){
			$("#addProductmodal div .dz-image-preview").remove();
			guideImgArray.splice(0);
		}
		
		//下拉选择框改变触发事件
		$("#category").change(function(){
			var selectId=$("#category").val();
			loadKind("kind",selectId);
			
		});
		
		
		
		
		
/*****************添加产品结束************************************************************/		
	
		
		
		
/*****************更新产品开始************************************************************/
		var editIds;
		var editStrs;
		
		var edit_guideImgArray = new Array();
		//更新界面上传引导图插件
		try {
			  Dropzone.autoDiscover = false;
			  var editDropzone = new Dropzone("#editdropzone" , {
			    paramName: "guideImg", // The name that will be used to transfer the file
			    maxFilesize:2.0, // MB
				maxFiles: 1000,
				addRemoveLinks : true,
				init:function(){
					this.on("success",function(file,data){
						file.serverId = data.guideImgUrl;
						edit_guideImgArray.push(file.serverId);
						$("#editProductform input[name='guideMap']").val(edit_guideImgArray.join(";"));
					});
					this.on("maxfilesexceeded",function(){
						alert("引导图最多1000张");
					});
					this.on("removedfile",function(file){
						
					var message=file.serverId;
					$.post("/ShopSys/ckeditorUploadAction_removeFile.action",{message:message},function(data){
						//更新input guidemap的值
						edit_guideImgArray.remove(message);
						$("#editProductform input[name='guideMap']").val(edit_guideImgArray.join(";"));
					});
					$("#editProductform input[name='guideMap']").val("");
					
				});
					
				},
				dictDefaultMessage :
				'<span class="bigger-150 bolder"></span>  \
				<span class="smaller-80 grey">上传引导图</span> <br /> \
				<i class="upload-icon ace-icon fa fa-cloud-upload blue fa-3x"></i>'
			,
				dictResponseError: '上传失败！',
				dictRemoveFile:'删除',
			
				
				//change the previewTemplate to use Bootstrap progress bars
				previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>"
			  });
			  
			   $(document).one('ajaxloadstart.page', function(e) {
					try {
						editDropzone.destroy();
						editDropzone.init();
					} catch(e) {}
			   });
			
			} catch(e) {
			  alert('不支持该版本的浏览器!');
			}
		
		
		
		
		//增加类别的div模态化
		$('#editProductmodal').modal({
			  keyboard: false,
			  show:false
		});
		//模态框展开时触发的操作
		$('#editProductmodal').on('show.bs.modal', function (e) {
			loadEditData();
		});		
		
		
		//点击更新记录按钮
		function editRecord(){
			editIds=$(grid_selector).jqGrid('getGridParam','selarrrow');
			editStrs= new Array(); 
			editStrs =editIds.toString().split(",");
		    if(editStrs.length>1){
		    	alert("不能同时选中多行进行编辑，请重新选择！");
		    	return false;
		    }
		    //打开模态框
		    $('#editProductmodal').modal('show');

		}
		
		
		//点击对话框保存按钮，保存产品信息
		$("#saveEditProduct").on("click",function(){
			var productId=$("#editProductform input[name='id']").val();
			var productNo = $("#editProductform input[name='productNo']").val();
			var productName=$("#editProductform input[name='productName']").val();
			var price=$("#editProductform input[name='price']").val();
			var color=$("#editProductform input[name='color']").val();
			var brandId=$("#editProductform select[name='brand'] option:selected").val();
			var kindId=$("#editkind").val(); //类别id
			var url=$("#editProductform input[name='url']").val();
			var createTime=$("#editcreateTime").val();
			var priority=$("#editProductform input[name='priority']").val();
			var isPublish=$("#editProductform input[name='isPublish']:checked").val();
			var guideMap=$("#editProductform input[name='guideMap']").val();
			var detailInfo=CKEDITOR.instances.editInformation.getData();
			var imgUrls="";
			var retImgArr = detailInfo.match(/src\s*=\s*[\"|\']?\s*[^>\"\'\s]*\.(jpg|jpeg|png|gif|bmp)[\"|\']?/gi);
			 if(retImgArr!=null){
				 for(var i=0;i<retImgArr.length;i++)
				 {
				    relativeImgArr=retImgArr[i].match(/\/img\s*[^>\"\'\s]*\.(jpg|jpeg|png|gif|bmp)/gi);
				    if(i>0)
					    imgUrls+="|";
				    imgUrls=imgUrls+relativeImgArr[0];
				    
				 }
			 }
			
			 
			 
			$.ajax({
        		url:"/ShopSys/productmanage/productAction_editProduct.action",
        		type:"post",
        		dataType:"json",
        		data:{
        			    "product.id":productId,
        				"product.productNo":productNo,
        				"product.productName":productName,
        				"product.price":price,
        				"product.color":brandId,
        				"product.url":url,
        				"product.brandId":brandId,
        				"product.kindId":kindId,
        				"product.imgUrls":imgUrls,
        				"product.detailInfo":detailInfo,
        				"product.createTime":createTime,
        				"product.priority":priority,
        				"product.isPublish":isPublish,
        				"product.guideMap":guideMap,
        				"product.color":color
        				
        				
        		},
        		success:function(d){
        			
        			$('#editProductmodal').modal('hide');
        			jQuery(grid_selector).jqGrid().trigger("reloadGrid");
        			//清空表单
        			clearEditProductform();
        		}
        	});
			
		});
		
		
		//点击取消按钮时，也清空表单
		$("#cancleEditProduct").on("click",function(){
			//清空表单
			clearEditProductform();
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
function loadEditData(){
    //ajax，根据id到取得记录
	$.ajax({
		url:"/ShopSys/productmanage/productAction_loadProductById.action",
		type:"post",
		dataType:"json",
		data:{
			"id":editStrs[0]
		},
		success:function(data){
			var product=data.product;
			$("#editProductform input[name='id']").val(product.id);
			$("#editProductform input[name='productNo']").val(product.productNo);
			$("#editProductform input[name='productName']").val(product.productName);
			$("#editProductform input[name='price']").val(product.price);
			$("#editProductform input[name='color']").val(product.color);
			
			$("#editProductform select option").removeAttr('selected');
			$("#editbrand option[value='"+product.brandId+"']").attr("selected", "selected");
			$("#editkind option[value='"+product.kindId+"']").attr("selected", "selected");
			$("select").trigger("liszt:updated");//更新前端界面
			
			$("#editProductform input[name='url']").val(product.url);
			$("#editProductform input[name='guideMap']").val(product.guideMap);
			//将所属种类和栏目的id暂时存起来
	
			
			loadCategorySelect("editcategory",data.categoryId,data.categorys);
			loadKindSelect("editkind",product.kindId, data.kinds);
			
			
			
			
			//引导图预览
			viewEditGuideMap(product);
			
			
			
			
			$("#editProductform input[name='color']").val(product.color);
			$("#editcreateTime").val(product.createTime);
			$("#editProductform input[name='priority']").val(product.priority);
			$("#editProductform input[name='isPublish'][value='"+product.isPublist+"']").attr("checked",true);
		
			CKEDITOR.instances.editInformation.setData(product.detailInfo);
		}
	});
}		
	


//导航图片预览
function viewEditGuideMap(product){
	//文件路径需要判断
	
	//删除预览图
	clearEditGuideMap();
	if(product.guideMap=="") return false;
	edit_guideImgArray = product.guideMap.split(";");
	
	//添加图片预览图
	for(var i = 0;i<edit_guideImgArray.length;i++){
		var s =edit_guideImgArray[i].split("/");
		var mockFile = { name: s[3],serverId : edit_guideImgArray[i]};
         
		// Call the default addedfile event handler
		editDropzone.emit("addedfile", mockFile);

		// And optionally show the thumbnail of the file:
		editDropzone.emit("thumbnail", mockFile, "http://localhost:8080/ShopSys/"+edit_guideImgArray[i]);

		// Make sure that there is no progress bar, etc...
		editDropzone.emit("complete", mockFile);
	}
	
}


//清空表单
function clearEditProductform(){
	$("#editProductform input[name='id']").val("");
	$("#editProductform input[name='productNo']").val("");
	$("#editProductform input[name='productName']").val("");
	$("#editProductform input[name='price']").val("");
	$("#editProductform input[name='color']").val("");
	$("#editProductform input[name='url']").val();
	$("#editcreateTime").val(getNowTime());
	$("#editProductform input[name='priority']").val(10);
	$("#editProductform select option").removeAttr('selected');
	$("#editProductform select[name='brand'] option[value=0]").attr("selected", "selected");
	$("#editProductform select[name='kind'] option[value=0]").attr("selected", "selected");
	$("select").trigger("liszt:updated");//更新前端界面
	$("#editProductform input[name='isPublish'][value=true]").attr("checked","selected");
	$("#editProductform input[name='guideMap']").val("");
	CKEDITOR.instances.editor1.setData("");
}





//清空引导图插件上的内容
function clearEditGuideMap(){
	$("#editProductmodal div .dz-image-preview").remove();
	edit_guideImgArray.splice(0);
}


//下拉选择框改变触发事件
$("#editcategory").change(function(){
	var selectId=$("#editcategory").val();
	loadKind("editkind",selectId);
	
});


/*****************更新产品结束************************************************************/	
		
			
});
	
	
	

	
	

	
	
	
/*******************************公用的方法************************************/
	
	//初始化下拉选择框，并且选中初始项
	function loadCategorySelect(selectId,optionValue,categoryobj){
		$("#"+selectId).empty();
		var options="";
		for(var i=0;i<categoryobj.length;i++){
			
			if(categoryobj[i].id==optionValue){
				options=options+"<option value='"+categoryobj[i].id+"' selected='selected'>"+categoryobj[i].categoryName+"</option>";
			}else{
				options=options+"<option value='"+categoryobj[i].id+"'>"+categoryobj[i].categoryName+"</option>";
			}
		}
		$("#"+selectId).append(options);
	}
	function loadKindSelect(selectId,optionValue,kindobj){
		$("#"+selectId).empty();
		var options="";
		for(var i=0;i<kindobj.length;i++){
			if(kindobj[i].id==optionValue){
				options=options+"<option value='"+kindobj[i].id+"' selected='selected'>"+kindobj[i].kindName+"</option>";
			}else{
				options=options+"<option value='"+kindobj[i].id+"'>"+kindobj[i].kindName+"</option>";
			}
		}
		$("#"+selectId).append(options);
	}
	
	
	
	
	
	
	//ajax获取栏目种类,初始化种类下拉选择框
	function loadCategory(categorySelectId,kindSelectId){
		 //ajax获取栏目种类,初始化种类下拉选择框
		$.ajax({
    		url:"/ShopSys/productmanage/categoryAction_listCategoryForKind.action",
    		type:"post",
    		dataType:"json",
    		success:function(data){
    			var categorys=data.rows;
    			var options="";
    			$("#"+categorySelectId).empty();
    			for(var i=0;i<categorys.length;i++){
    				options=options+"<option value='"+categorys[i].id+"'>"+categorys[i].categoryName+"</option>";
    			}
    			$("#"+categorySelectId).append(options);
    			var currentOption=$("#"+categorySelectId).val();
    			loadKind(kindSelectId,currentOption);
    		}
    	});
	}
	
	//ajax，根据category选中项加载产品种类
	function loadKind(kindSelectId,currentOption){
		$.ajax({
    		url:"/ShopSys/productmanage/kindAction_listKindsByCategoryId.action",
    		type:"post",
    		data:{
    			"id":currentOption
    		},
    		dataType:"json",
    		success:function(data){
    			var kinds=data.rows;
    			var options="";
    			$("#"+kindSelectId).empty();
    			for(var i=0;i<kinds.length;i++){
    				options=options+"<option value='"+kinds[i].id+"'>"+kinds[i].kindName+"</option>";
    			}
    			$("#"+kindSelectId).append(options);
    			
    		}
    	});
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//获得现在的时间
	function getNowTime(){
		var myDate = new Date();
		var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
		var month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
		var date=myDate.getDate();        //获取当前日(1-31)
		var hours=myDate.getHours();       //获取当前小时数(0-23)
		var hourslocale="";
		if(hours>=12){
			hourslocale="下午"+hours%12+"点";
		}else{
			hourslocale="上午"+hours+"点";
		}
		var smonth="";
		if(month<10){
			smonth="0"+month;
		}else{
			smonth=month;
		}
		var sdate="";
		if(date<10){
			sdate="0"+date;
		}else{
			sdate=date;
		}
		var minutes=myDate.getMinutes();     //获取当前分钟数(0-59)
		var nowTime=year+"-"+smonth+"-"+sdate+" "+hourslocale+minutes;
		return nowTime;
	}
/*******************************公用的方法************************************/
});
