$(function(){
	
	broadcast();
	
	var result=$("#title").val();
  $("#aboutUs").html(result);
  
  
  
  $("#searchBtn").click(function(){
	  var searchParam=$("#searchParam").val();
	  if (searchParam=="") return false;
	  //初始搜索结果界面元素
	  InitialSearchResutlPage("pageContent_right");
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
		  InitialSearchResutlPage("pageContent_right");
		  //触发搜索前，更换子导航栏
		  changeChildNav("products_childnav");
	
		  //根据搜索条件加载产品
		  loadProductsBySearParam(searchParam,9,1);
		  //根据搜搜条件加载分页栏
		  initialPagination_products_search(searchParam);
      }
  });
}); 
