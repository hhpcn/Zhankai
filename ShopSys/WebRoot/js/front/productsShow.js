$(function(){
  var pro_CTitle=localStorage.CTitle;
  var pro_CId=localStorage.CId;
  var pro_KId=localStorage.KId;
  
  
  //CId、KId空值的情况需要根据url路径的hash值做处理
  if(typeof(pro_CId) == "undefined"){
	   var hash=window.location.hash;
	    if(hash!=""){
	    	hash=hash.replace("#", "");
		    var linkPlace=hash.indexOf("_", 0);
		    if(linkPlace>0){
		    	hash=hash.substring(linkPlace+1, hash.length);
		    	pro_CId=hash.replace("C", "");
		    	localStorage.CId=pro_CId;
		    }
	    }
	    
  }
  if(typeof(pro_KId) == "undefined"){
	  pro_KId=0;
	  localStorage.KId=0;
  }
  
  
  
  var kinds=JSON.parse(localStorage.kinds);
  //var categories=JSON.parse(localStorage.categories);
  $("#ps_CTitle").empty().html("<b>"+pro_CTitle+"</b>");
  

  var tempCId="C"+pro_CId;
  var selectKinds;
  for(var i=0;i<kinds.length;i++){
	  if(tempCId==kinds[i].cn){
		  selectKinds=kinds[i].list;
		  break;
	  }
  }
  

  if ( typeof(selectKinds) != "undefined"){
	  var navhtml="";
	  for(var j=0;j<selectKinds.length;j++){
		  //0是点击顶级栏目时触发的
		  if(pro_KId==0){
			  if(j==0){
				  navhtml += "<li id='K"+selectKinds[j].id+"' class=\"active\">" +
					"<a  onclick=\"change(\'"+selectKinds[j].id+"\')\">"+selectKinds[j].kindName+"</a>" +
				 "</li>";
				  localStorage.KId = selectKinds[j].id;//选择的子栏目id存在这里
			  }
			  pro_KId=-1;//这样设值后，后面的判断必然不会再选择其他子栏目
		  }else{
			  if(selectKinds[j].id==pro_KId){
				  navhtml += "<li id='K"+selectKinds[j].id+"' class=\"active\">" +
					"<a  onclick=\"change(\'"+selectKinds[j].id+"\')\">"+selectKinds[j].kindName+"</a>" +
				 "</li>";
				  localStorage.KId = selectKinds[j].id;//选择的子栏目id存在这里
			  }else{
				  navhtml += "<li id='K"+selectKinds[j].id+"'>" +
					"<a  onclick=\"change(\'"+selectKinds[j].id+"\')\">"+selectKinds[j].kindName+"</a>" +
				 "</li>";
			  }
		  }
		  
		  
		  
		  
	  }
	  navhtml="<ul class=\"nav nav-tabs\" style=\"font-size: 14px\"> "+navhtml+"</ul>";
	  $("#navtabs").empty().html(navhtml);
	  var nowKId=localStorage.KId;
	  initialPagination_products(nowKId);
	  //根据选中的二级栏目加载相对的产品
	  loadProducts(nowKId,1);
  }
  
  
  $("#searchBtn").click(function(){
	  var searchParam=$("#searchParam").val();
	  if (searchParam=="") return false;
	  //触发搜索前，更换子导航栏
	  //changeChildNav(navId);
	  
	  //根据搜索条件加载产品
	  loadProductsBySearParam(searchParam,9,1);
	  //根据搜搜条件加载分页栏
	  initialPagination_products_search(searchParam);
  });
  


}); 


//点击子界面栏目时触发的事件
function change(id){
	  $("li").removeClass("active");
	  $("#K"+id).addClass("active"); 
	  
	//将选中的二级栏目id存在localStorage中
	 localStorage.KId = id;
	 //初始化分页栏
	 initialPagination_products(id);
	 loadProducts(id,1);
	 
	  
}

//根据类别加载产品
function loadProducts(kindId,page){
	
	$.ajax({
		url:"/ShopSys/productmanage/productAction_frontLoadProducts.action",
		type:"post",
		data:{
			"id":kindId,
			"page":page,
			"rows":9
		},
		dataType:"json",
		success:function(data){
			//加载图片及各类信息
			//var rowsSize=data.rowsSize;
			var productList=data.rows;
			var productHtml="";
			for(var i=0;i<productList.length;i++){
				productHtml=productHtml+"<div class='col-sm-6 col-md-4'>" +
						"<a class='thumbnail' ><img  src='/ShopSys/"+productList[i].guideImageUrl+"'></a>" +
						"<div style='margin:-18px 5px 5px 5px;'>" +
							 "<p class='tit'>"+productList[i].productName+"</p>" +
							 "<p class='text'>"+productList[i].price+"</p>" +
						"</div>" +
					"</div>";
			}
			productHtml="<div class='col-md-12'><div class='row' >"+productHtml+"</div></div>";
			
			$("#productlist").empty().html(productHtml);
		}
	});
	
	
	
}

//初始化分页栏
function initialPagination_products(kindId){
	$.ajax({
		url:"/ShopSys/productmanage/productAction_frontCountPageNumber.action",
		type:"post",
		data:{
			"id":kindId,
			"rows":9
		},
		dataType:"json",
		success:function(data){
			$("#pagination_parent").empty().html("<ul style='float:left;'id='pagination-products' class='pagination'></ul>");
			
			var totalPages=data.pageNumber;
			var visiblePages=0;
			if(totalPages>7){
				visiblePages=7;
			}else if(totalPages>0){
				visiblePages=totalPages;
			}else{
				totalPages=1;
				visiblePages=1;
			}
			$('#pagination-products').twbsPagination({
		        totalPages: totalPages,
		        visiblePages: visiblePages,
		        first:"首页",
		        prev:"上一页",
		        next:"下一页",
		        last:"尾页",
		        onPageClick: function (event, page) {
		        	loadProducts(kindId,page);
		        }
	         });
		}
	});
}


//根据搜索参数搜索产品
function  loadProductsBySearParam(searchParam,rows,page){
	$.ajax({
		url:"/ShopSys/productmanage/productAction_frontLoadProductsBySearch.action",
		type:"post",
		data:{
			"searchString":searchParam,
			"page":page,
			"rows":rows
		},
		dataType:"json",
		success:function(data){
			//加载图片及各类信息
			//var rowsSize=data.rowsSize;
			var productList=data.rows;
			var productHtml="";
			for(var i=0;i<productList.length;i++){
				productHtml=productHtml+"<div class='col-sm-6 col-md-4'>" +
						"<a class='thumbnail' ><img  src='/ShopSys/"+productList[i].guideImageUrl+"'></a>" +
						"<div style='margin:-18px 5px 5px 5px;'>" +
							 "<p class='tit'>"+productList[i].productName+"</p>" +
							 "<p class='text'>"+productList[i].price+"</p>" +
						"</div>" +
					"</div>";
			}
			productHtml="<div class='col-md-12'><div class='row' >"+productHtml+"</div></div>";
			
			$("#productlist").empty().html(productHtml);
		}
	});
}


//根据搜索条件，初始化分页栏
function initialPagination_products_search(searchParam){
	$.ajax({
		url:"/ShopSys/productmanage/productAction_frontCountPageNumberBySearch.action",
		type:"post",
		data:{
			"searchString":searchParam,
			"rows":9
		},
		dataType:"json",
		success:function(data){
			$("#pagination_parent").empty().html("<ul style='float:left;'id='pagination-products' class='pagination'></ul>");
			
			var totalPages=data.pageNumber;
			var visiblePages=0;
			if(totalPages>7){
				visiblePages=7;
			}else if(totalPages>0){
				visiblePages=totalPages;
			}else{
				totalPages=1;
				visiblePages=1;
			}
			$('#pagination-products').twbsPagination({
		        totalPages: totalPages,
		        visiblePages: visiblePages,
		        first:"首页",
		        prev:"上一页",
		        next:"下一页",
		        last:"尾页",
		        onPageClick: function (event, page) {
		        	loadProductsBySearParam(searchParam,9,page);
		        }
	         });
		}
	});
}



//点击搜索触发更换子导航栏
function changeChildNav(navId){
	
}
