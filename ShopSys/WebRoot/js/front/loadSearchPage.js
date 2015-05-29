//点击搜索触发更换子导航栏
function changeChildNav(navId){
	var childNavHtml="";
	//获取顶级菜单栏
	var categories=JSON.parse(localStorage.categories);
	for(var i=0;i<categories.length;i++){
		//从第二项开始加载
		if(i>0){
			if(i==1){
				childNavHtml=childNavHtml+" <li id='nav_fli'><a  href='"+categories[i].pageUrl+"_Cl"+categories[i].id+"' style='color:white;'" +
						" onclick=\"changeTitle(\'"+categories[i].categoryName+"\',"+categories[i].id+",0)\">"+categories[i].categoryName+"</a></li>";
			
			}else{
				childNavHtml=childNavHtml+" <li><a  href='"+categories[i].pageUrl+"_Cl"+categories[i].id+"' style='color:white;'" +
				" onclick=\"changeTitle(\'"+categories[i].categoryName+"\',"+categories[i].id+",0)\">"+categories[i].categoryName+"</a></li>";
			}
		}
	}
	
	childNavHtml="<nav class='navbar ' style='background-color:#36613b;font-size: 14px;  border-radius: 0;min-height: 30px;'>" +
			"<div class='collapse navbar-collapse'  > <ul id='nav_ul' class='nav navbar-nav' >"
	         +childNavHtml+"</ul></div></nav>";
	
	$("#"+navId).empty().html(childNavHtml);
	
}


//初始搜索结果界面元素 
function InitialSearchResutlPage(pageContentId){
	var pageNavHtml="<div class='row' id='products_childnav'>" +
						"<div id='ps_CTitle' class='col-md-2' style='border-bottom: 1px solid #36613b;height:44px;text-align: center;vertical-align: middle;line-height:43px;font-size: 16px;color: #36613b;'></div>" +
						"<div id='navtabs' class='col-md-10 ' style='margin-bottom:10px;background-color: #ffffff;border-bottom: 0px;padding-left:0px;padding-right: 0px;' ></div>" +
					"</div>";
	var pagelistHtml=" <div id='pageInfo'><div id='productlist' class='row ' style=' background-color: #ffffff;'>" +
							" <div class='col-md-12'>" +
								"<div class='row' >" +
								"</div>" +
							" </div>" +
						  "</div>" +
						  "<div class='row'  style='margin-top: 30px;margin-left: 110px;'>" +
						    " <div id='pagination_parent' class='col-md-10 col-md-offset-1'>" +
						        "<ul style='float:left;' id='pagination-products' class='pagination'></ul>" +
						    " </div>" +
						  "</div>" +
					  "</div>";
	
	
	$("#"+pageContentId).empty().html(pageNavHtml+pagelistHtml);
	$("#"+pageContentId).css({"min-height":"610px","background-color":"#ffffff","border":"1px solid #000000"});
	
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
						"<a class='thumbnail' ><img  src='"+getImageUrl()+"/"+productList[i].guideImageUrl+"'></a>" +
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

 


