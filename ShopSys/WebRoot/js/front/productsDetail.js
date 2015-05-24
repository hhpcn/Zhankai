$(function(){
	  $("#searchBtn").click(function(){
		  var searchParam=$("#searchParam").val();
		  if (searchParam=="") return false;
		  //初始搜索结果界面元素
		  InitialSearchResutlPage("product_pagecontent");
		  //触发搜索前，更换子导航栏
		  changeChildNav("products_childnav");
	
		  //根据搜索条件加载产品
		  loadProductsBySearParam(searchParam,9,1);
		  //根据搜搜条件加载分页栏
		  initialPagination_products_search(searchParam);
	  });
	  
	//搜索输入框回车事件
	  $('#searchParam').bind('keypress',function(event){
          if(event.keyCode == "13")    
          {
        	  var searchParam=$("#searchParam").val();
    		  if (searchParam=="") return false;
    		  //初始搜索结果界面元素
    		  InitialSearchResutlPage("product_pagecontent");
    		  //触发搜索前，更换子导航栏
    		  changeChildNav("products_childnav");
    	
    		  //根据搜索条件加载产品
    		  loadProductsBySearParam(searchParam,9,1);
    		  //根据搜搜条件加载分页栏
    		  initialPagination_products_search(searchParam);
          }
      });
	  
	 // alert("ss"+localStorage.ProId);
	  $.ajax({
		url:"/ShopSys/productmanage/productAction_frontGetProcuctById.action",
		type:"post",
		data:{
			"id":localStorage.ProId
		},
		dataType:"json",
		success:function(data){
			//加载图片及各类信息
			/*
			var productList=data.rows;
			var productHtml="";
			
			productHtml="<div class='col-md-12'><div class='row' >"+productHtml+"</div></div>";
			
			$("#productlist").empty().html(productHtml);*/
			
			document.getElementById("productDis").innerHTML=
			"<div style='margin-left: 10px;font-size: 14px;margin-top: 10px;margin-right: 10px'>产品名称："+data.product.productName+"</div>"+
			"<div style='margin-left: 10px;font-size: 14px;margin-top: 10px;margin-right: 10px'>产品名称："+data.product.productName+"</div>"+
			"<div style='margin-left: 10px;font-size: 14px;margin-top: 10px;margin-right: 10px'>产品名称："+data.product.productName+"</div>";
			
			
			
		}
	});
	
	  
	  
	  
});