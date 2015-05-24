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
			"<div style='margin-left: 10px;font-size: 16px;margin-top: 10px;margin-right: 10px'>名称："+data.product.productName+"</div>"+
			"<div style='margin-left: 10px;font-size: 16px;margin-top: 10px;margin-right: 10px'>价格："+data.product.price+"</div>"+
			"<div style='margin-left: 10px;font-size: 16px;margin-top: 10px;margin-right: 10px'>颜色："+data.product.color+"</div>"+
			"<div style='margin-left: 10px;font-size: 16px;margin-top: 10px;margin-right: 10px'>淘宝链接：" 
			+"<a href='"+data.product.guideMap+"'>购买产品请点击</a></div>";
			
			document.getElementById("productXQ").innerHTML=
				"<div style='margin-left: 10px;margin-top: 10px;margin-right: 10px'>"+data.product.detailInfo+"</div>";
			var kindId=data.product.kindId;
			var kinds=JSON.parse(localStorage.kinds);
			
			var categories=JSON.parse(localStorage.categories);
			var CGId;
			var kindName;
			var catName;
			var catUrl;
			
			
			for(var i=0;i<kinds.length;i++){
				
				var kindlist=kinds[i].list;
				for(var j=0;j<kindlist.length;j++){
					if(kindlist[j].id==kindId){
						 CGId=kindlist[j].categoryId;
					     kindName=kindlist[j].kindName;
					     kindUrl=kindlist[j].kind
					     i=kinds.length;
					     break;
					}
				}
			}
		
            
			for(var i=0;i<categories.length;i++)
			{
				if(categories[i].id == CGId){
					 catUrl=categories[i].pageUrl;
				     catName=categories[i].categoryName;
				     break;
				}
			}
			
			document.getElementById("fuji").innerHTML=	
		     " <a  style='font-size: 14px;' href='"+catUrl+"_C"+CGId+"'>"+catName+"</a>";
			document.getElementById("ziji").innerHTML=	
			     " <a  style='font-size: 14px;' href='"+catUrl+"_K"+kindId+"'>"+kindName+"</a>";
			
		}
	});
	
	  
	  
	  
});