$(function(){
	var categoryIds = new Array();
	var categoryPageUrls = new Array();
	var categoryNames = new Array();
	var categoryPlace = new Array();//中间位置
	var startCategoryPlace = 252;//第二个栏目离左边的距离
	//取消异步加载
	$.ajaxSettings.async = false;
	//加载顶级栏目
	$.ajax({
		url:"/ShopSys/productmanage/categoryAction_frontLoadCategory.action",
		type:"post",
		dataType:"json",
		success:function(data){
			var categories=data.categories;
			//顶级栏目存在web存储中
			localStorage.categories=JSON.stringify(categories);
			var navli="";
			//遍历加载顶级栏目
			for(var i=0;i<categories.length;i++){
				//计算栏目中间的位置
				
					categoryPlace[i]=startCategoryPlace+(categories[i].categoryName.length*16+50)/2;
					startCategoryPlace=startCategoryPlace+categories[i].categoryName.length*16+50;
				
				
				//构建栏目的html代码
				navli=navli+"<li data-navPlace='C"+categories[i].id+"'>" +
			"<h2>" +
				"<a href='"+categories[i].pageUrl+"_C"+categories[i].id+"' onclick=\"changeTitle(\'"+categories[i].categoryName+"\',"+categories[i].id+",0)\">"+categories[i].categoryName+"</a>"+
			"</h2>" +
			"</li>";
				
			categoryIds.push(categories[i].id);
			categoryPageUrls.push(categories[i].pageUrl);
			categoryNames.push(categories[i].categoryName);
		  }
			$("#headnav li:last").after(navli);
		}
	});
	
    //加载二级栏目
	var ids=categoryIds.join(",");
	initialKinds(ids,categoryIds,categoryPageUrls,categoryNames,categoryPlace);
	
	//开启异步加载
	$.ajaxSettings.async = true;
	
	
	
	
	
	
	
	//导航栏鼠标移动触发事件等等
	var qcloud={};
	$('[data-navPlace]').hover(
	function(){
		var _nav = $(this).attr('data-navPlace');
		clearTimeout( qcloud[ _nav + '_timer' ] );
		qcloud[ _nav + '_timer' ] = setTimeout(function(){
			$('[data-navPlace]').each(function(){
				$(this)[ _nav == $(this).attr('data-navPlace') ? 'addClass':'removeClass' ]('nav-up-selected');
			});
			$('#'+_nav).slideDown(200);
		}, 150);
	},function(){
		var _nav = $(this).attr('data-navPlace');
		clearTimeout( qcloud[ _nav + '_timer' ] );
		qcloud[ _nav + '_timer' ] = setTimeout(function(){
		$('[data-navPlace]').removeClass('nav-up-selected');
		$('#'+_nav).slideUp(200);
		}, 150);
	});
	

	$('[data-navPlace]').click(function(){
		var _nav = $(this).attr('data-navPlace');
		$('[data-navPlace]').removeClass('nav-up-selected-inpage');
		$("[data-navPlace='"+_nav+"']").addClass('nav-up-selected-inpage');
	});
	
	
	
	
	
});



//加载导航栏二级栏目
function initialKinds(ids,categoryIds,categoryPageUrls,categoryNames,categoryPlace){
	$.ajax({
		url:"/ShopSys/productmanage/kindAction_frontLoadKindByIds.action",
		type:"post",
		dataType:"json",
		data:{
			"id":ids
			},
		success:function(data){
			//遍历加载栏目
			var rows=data.rows;
			//二级栏目存在web存储中
			localStorage.kinds=JSON.stringify(rows);
			var childNav="";
			var kindsLength = new Array();//每个二级导航栏navigation-down的div长度
			for(var i=0;i<rows.length;i++){
				
				//二级栏目的hash值有两种情况，第一种加载的页面和父栏目一样，第二种加载的页面是自己特定的，根据二级栏目的pageUrl是否为空来判断
				
				
				
				
				var list=rows[i].list;
				
				var dls="";
				kindsLength[i]=0;
				for(var j=0;j<list.length;j++){
					var  catePageUrl=categoryPageUrls[i];
					if(list[j].pageUrl != ""){
						catePageUrl=list[j].pageUrl;
					}
					//这里j==0是代表第一个二级栏目，要计算起始位置
					if(j==0){
						dls=dls+ 
					     "<dd>" +
					          "<a href='"+catePageUrl+"_K"+list[j].id+"' onclick=\"changeTitle(\'"+categoryNames[i]+"\',"+categoryIds[i]+","+list[j].id+")\">"+list[j].kindName+"</a>" +
					      "</dd>" +
					    "</dl>";
					}else{
						dls=dls+ "<dl>" +
					     "<dd>" +
					          "<a href='"+catePageUrl+"_K"+list[j].id+"' onclick=\"changeTitle(\'"+categoryNames[i]+"\',"+categoryIds[i]+","+list[j].id+")\">"+list[j].kindName+"</a>" +
					      "</dd>" +
					    "</dl>";
					}
					//kindsLength由每个二级导航栏的长度叠加计算;80为padding-right的长度
					kindsLength[i]=kindsLength[i]+list[j].kindName.length*14+80;
				}
				//1170,二级导航栏div长度，顶级导航标签位置，计算二级导航偏移距离
				var marginPlace=computePlace(kindsLength[i],categoryPlace[i]);
				
				if(kindsLength[i]>0){
					childNav=childNav+
					"<div class='navigation-down'>" +
					"<div id='"+rows[i].cn+"' class='nav-down-menu menu-1' style='display: none;' data-navPlace='"+rows[i].cn+"'>" +
							"<div class='navigation-down-inner'> <dl style='margin-left: "+marginPlace+"px;'>"+dls+"</div></div></div>";
				}
				
			}
			
			$(".navigation-down:last").after(childNav);
		}
	});
}

   //kindLength:子导航栏div长度，categoryPlace位置偏移左边的距离
  function computePlace(kindLength,categoryPlace){
	   var marginPlace=0;
		var left=categoryPlace;
		var right=1170-categoryPlace;
		var halfLength=kindLength/2;
		if(kindLength>=1170){
			marginPlace=20;
		}else if(halfLength<=left&&halfLength<=right){
			marginPlace=left-halfLength+60;
		}else if(halfLength>left&& halfLength<right){
			marginPlace=90;
		}else if(halfLength<left&&halfLength>right){
			
			marginPlace=1170-kindLength;
			
		}else{
			
			marginPlace=20;
		}
		
		return marginPlace;
  }
