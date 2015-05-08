var scripts = [null,"/ShopSys/common/ace/assets/js/dropzone.js",
	               "/ShopSys/common/ace/assets/js/date-time/moment.js",
	               "/ShopSys/common/ace/assets/js/date-time/moment-with-locales.js",
	               "/ShopSys/common/ace/assets/js/date-time/bootstrap-datetimepicker.js",
	               "/ShopSys/common/ace/assets/js/jqGrid/jquery.jqGrid.src.js",
	               "/ShopSys/common/ace/assets/js/jqGrid/i18n/grid.locale-cn.js",
	               "/ShopSys/common/ace/assets/js/jquery.validate.js",null];
	$('.page-content-area').ace_ajax('loadScripts', scripts, function() {
	  //inline scripts related to this page

	
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
			height: 300,
			colNames:['', 'ID','产品编号','名称', '价格','颜色','品牌','url'],
			colModel:[
				{name:'myac',index:'', width:50, fixed:true, sortable:false, resize:false,
					formatter:'actions', 
					formatoptions:{ 
						keys:true,
						//delbutton: false,//disable delete button
						delOptions:{recreateForm: true, beforeShowForm:beforeDeleteCallback},
						editbutton:false//禁用航编辑按钮
						//editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
					}
				},
				{name:'id',index:'id', width:60, sorttype:"int"},
				{name:'productNo',index:'productNo', width:150,editable: true,editoptions:{size:"20",maxlength:"30"}},
				{name:'productName',index:'productName', width:150,editable: true,editoptions:{size:"20",maxlength:"30"}},
				{name:'price',index:'price', width:150,editable: true,editoptions:{size:"20",maxlength:"30"}},
				{name:'color',index:'color', width:150,editable: true,editoptions:{size:"20",maxlength:"30"}},
				{name:'brandName',index:'brandName', width:150,editable: true,editoptions:{size:"20",maxlength:"30"}},
				{name:'url',index:'url', width:150,editable: true,editoptions:{size:"20",maxlength:"30"}}
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
				refreshicon : 'ace-icon fa fa-refresh green',
				view: true,
				viewicon : 'ace-icon fa fa-search-plus grey',
				viewfunc : viewRecord
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
		
		
	
		

		//更新记录
		function editRecord(){
			var ids=$(grid_selector).jqGrid('getGridParam','selarrrow');
			var strs= new Array(); 
		    strs =ids.toString().split(",");
		    if(strs.length>1){
		    	alert("不能同时选中多行进行编辑，请重新选择！");
		    	return false;
		    }
		    //ajax，根据id到取得记录
			$.ajax({
        		url:"/ShopSys/productmanage/productAction_loadProductById.action",
        		type:"post",
        		dataType:"json",
        		data:{
        			"id":strs[0]
        		},
        		success:function(data){
        			var product=data.product;
        			alert(product.id);
        			$("#productform input[name='id']").val(product.id);
        			$("#productform input[name='productNo']").val(product.productNo);
        			$("#productform input[name='productName']").val(product.productName);
        			$("#productform input[name='price']").val(product.price);
        			$("#productform input[name='color']").val(product.color);
        			alert("brand:"+product.brandId);
        			alert("kind:"+product.kindId);
        			
        			$("#productform select option").removeAttr('selected');
        			$("#brand option[value='"+product.brandId+"']").attr("selected", "selected");
        			$("#kind option[value='"+product.kindId+"']").attr("selected", "selected");
        			$("select").trigger("liszt:updated");//更新前端界面
        			
        			$("#productform input[name='url']").val(product.url);
        			$("#productform input[name='guideMap']").val(product.guideMap);
        			$("#productform input[name='color']").val(product.color);
        			$("#createTime").val(product.createTime);
        			$("#productform input[name='priority']").val(product.priority);
        			$("#productform input[name='isPublish'][value='"+product.isPublist+"']").attr("checked",true);
        			
        			CKEDITOR.instances.editor1.setData(product.detailInfo);
        			$('#productmodal').modal('show');
        		}
        	});
		}
		
	
		//增加一条记录，弹出对话框
		function addNewRecord(){
			$("#productform input[name='id']").val("");
			$('#productmodal').modal({
				  keyboard: false
				});
		}
		
		//点击对话框保存按钮，保存产品信息
		$("#saveproduct").on("click",function(){
			var productId=$("#productform input[name='id']").val();
			var productNo = $("#productform input[name='productNo']").val();
			var productName=$("#productform input[name='productName']").val();
			var price=$("#productform input[name='price']").val();
			var color=$("#productform input[name='color']").val();
			var brandId=$("#productform select[name='brand'] option:selected").val();
			var kindId=$("#productform select[name='kind'] option:selected").val(); //类别id
			var url=$("#productform input[name='url']").val();
			var createTime=$("#createTime").val();
			var priority=$("#productform input[name='priority']").val();
			var isPublish=$("#productform input[name='isPublish']:checked").val();
			var guideMap=$("#productform input[name='guideMap']").val();
			var detailInfo=CKEDITOR.instances.editor1.getData();
			var imgUrls="";
			 retImgArr = detailInfo.match(/src\s*=\s*[\"|\']?\s*[^>\"\'\s]*\.(jpg|jpeg|png|gif|bmp)[\"|\']?/gi);
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
        			
        			$('#productmodal').modal('hide');
        			jQuery(grid_selector).jqGrid().trigger("reloadGrid");
        			//清空表单
        			clearProductForm();
        		}
        	});
			
		});
		
		//点击取消按钮时，也清空表单
		$("#canclebutton").on("click",function(){
			//清空表单
			clearProductForm();
		});
		

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
		$("#productform input[name='priority']").val(10);
		
		
		function viewRecord(){
			$('#lookproductmodal').modal('show');
		}
		
		//查看产品信息的模态框
		$('#lookproductmodal').modal({
			  keyboard: false,
			  show:false
		});
		//模态框展开时触发的操作
		$('#lookproductmodal').on('show.bs.modal', function (e) {
			var ids=$(grid_selector).jqGrid('getGridParam','selarrrow');
			var strs= new Array(); 
		    strs =ids.toString().split(",");
		    if(strs.length>1){
		    	alert("不能同时选中多行进行编辑，请重新选择！");
		    	return false;
		    }
		    //ajax，根据id到取得记录
			$.ajax({
        		url:"/ShopSys/productmanage/productAction_loadProductById.action",
        		type:"post",
        		dataType:"json",
        		data:{
        			"id":strs[0]
        		},
        		success:function(data){
        			var product=data.product;
        			alert(product.id);
        			//$("#lookproductform input[name='id']").val(product.id);
        			$("#lookproductform input[name='productNo']").val(product.productNo);
        			$("#lookproductform input[name='productName']").val(product.productName);
        			$("#lookproductform input[name='price']").val(product.price);
        			$("#lookproductform input[name='color']").val(product.color);
        			alert("brand:"+product.brandId);
        			alert("kind:"+product.kindId);
        			
        			$("#lookproductform select option").removeAttr('selected');
        			$("#lookproductform select[name='brand'] option[value='"+product.brandId+"']").attr("selected", "selected");
        			$("#lookproductform select[name='kind'] option[value='"+product.kindId+"']").attr("selected", "selected");
        			//$("#lookproductform select").trigger("liszt:updated");//更新前端界面
        			
        			$("#lookproductform input[name='url']").val(product.url);
        			$("#lookproductform input[name='guideMap']").val(product.guideMap);
        			$("#lookproductform input[name='color']").val(product.color);
        			$("#lookproductform input[name='createTime']").val(product.createTime);
        			$("#lookproductform input[name='priority']").val(product.priority);
        			$("#lookproductform input[name='isPublish'][value='"+product.isPublist+"']").attr("checked",true);
        			
        			
        			
        		}
        	});
		});
		
		
		
	});
	
	
	
	//清空表单
	function clearProductForm(){
		
		$("#productform input[name='id']").val("");
		$("#productform input[name='productNo']").val("");
		$("#productform input[name='productName']").val("");
		$("#productform input[name='price']").val("");
		$("#productform input[name='color']").val("");
		$("#productform input[name='url']").val();
		$("#createTime").val(getNowTime());
		$("#productform input[name='priority']").val(10);
		$("#productform select option").removeAttr('selected');
		$("#productform select[name='brand'] option[value=0]").attr("selected", "selected");
		$("#productform select[name='kind'] option[value=0]").attr("selected", "selected");
		$("select").trigger("liszt:updated");//更新前端界面
		$("#productform input[name='isPublish'][value=true]").attr("checked","selected");
		$("#productform input[name='guideMap']").val("");
		CKEDITOR.instances.editor1.setData("");
	}
	
	
	
	
	
	//上传引导图插件
	try {
		  Dropzone.autoDiscover = false;
		  var myDropzone = new Dropzone("#dropzone" , {
		    paramName: "guideImg", // The name that will be used to transfer the file
		    maxFilesize:2.0, // MB
			maxFiles: 1,
			addRemoveLinks : true,
			init:function(){
				this.on("success",function(data){
					var jsonObj=eval('(' + data.xhr.responseText + ')');//转换为json对象
					$("#productform input[name='guideMap']").val(jsonObj.guideImgUrl);
				});
				this.on("maxfilesexceeded",function(){
					alert("引导图只能有一张");
				});
				this.on("removedfile",function(){
				var message=$("#productform input[name='guideMap']").val();
				$.post("/ShopSys/ckeditorUploadAction_removeFile.action",{message:message},function(data){
					$("#productform input[name='guideMap']").val("");
				});
				
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
				} catch(e) {}
		   });
		
		} catch(e) {
		  alert('不支持该版本的浏览器!');
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
});
