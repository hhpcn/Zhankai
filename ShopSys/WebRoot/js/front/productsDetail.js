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
			//加载图片及各类信
			
			document.getElementById("productDis").innerHTML=
			"<div style='margin-left: 10px;font-size: 16px;margin-top: 10px;margin-right: 10px'>名称："+data.product.productName+"</div>"+
			"<div style='margin-left: 10px;font-size: 16px;margin-top: 10px;margin-right: 10px'>价格："+data.product.price+"</div>"+
			"<div style='margin-left: 10px;font-size: 16px;margin-top: 10px;margin-right: 10px'>库存："+data.product.stock+"</div>"+
			"<div style='margin-left: 10px;font-size: 16px;margin-top: 10px;margin-right: 10px'>材质："+data.product.material+"</div>"+
			"<div style='margin-left: 10px;font-size: 16px;margin-top: 10px;margin-right: 10px'>淘宝链接：" 
			+"<a href='http://"+data.product.url+"'>购买产品请点击</a></div>";
			
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
					     kindUrl=kindlist[j].kind;
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

		var imgMap;
		$.ajax({
			url:"/ShopSys/productmanage/productAction_frontGetProcuctById.action",
			type:"post",
			data:{
				"id":localStorage.ProId
			},
			dataType:"json",
			success:function(data){
				 imgMap=data.product.guideMap;
				 var imgSrc=imgMap.split([";"]);
				 var img=new Array();
				 for(var i=0;i<imgSrc.length;i++){
					 img[i]={
							    'alt':"图片"+i,
								'src':"/ShopSys/"+imgSrc[i],
								'smallSrc':"/ShopSys/"+imgSrc[i],
								'title':"标题"+i	 
					 };
					 
					 
				 }
				 loadImg(img);
			}
		});
		
	
<<<<<<< HEAD
	
		
	
=======
>>>>>>> refs/remotes/origin/master

function loadImg(img){
	//大图编号
	var i=0,len=img.length,//img数组的长度
		cur=0;//当前图片编号
		j=4,//默认显示小图个数
		page=0,//小图的页码
		$s_next=$('#smallImg-next'),//小图下一页
		$s_pre=$('#smallImg-pre'),//小图上一页
		box=$('#smallImg-box').width()/5,//显示的长度
		$ul=$('#smallImg-ul'),//小图外层
		$imgLi=$ul.find('li'),//小图li
		html=_html='';//存放载入的代码		
	$('#detailImg-box').append('<a'+'\" class=\"detailImg_1\"><img alt=\"'+img[0].alt+'\" src=\"'+img[i].src+'\"></a><p>');
	//大图	
	$('#detailImg-next').click(function(){
		--i;
		detailImg_click($s_next,i,len,img);
	});
	$('#detailImg-pre').click(function(){
		++i;
		detailImg_click($s_pre,i,len,img);
	});
	//小图
	for(var k=0;k<j;k++){
		var _k=k%len;
		s_html(_k,' ',img);
		html+=h;
	}
	$ul.append(html);
	$('.smallImg_1').addClass('cur');	
	
	//小图下一页
	$('#smallImg-next').click(function(){
		
		--i;
		detailImg_click($s_pre,i,len,img);
	
		
	
	});
	//小图上一页
	$('#smallImg-pre').click(function(){
		++i;
		detailImg_click($s_pre,i,len,img);
		
	});
	//点击小图
	$('#smallImg-ul li').click(function (){
		var _this=$(this);
		i=_this.attr('class').replace(/[^0-9]/ig,'')-1;
		img_info(i,img);
		s_a_r(_this,'cur');
		cur=i;
	});
}



//大图图片信息
function img_info(i,img){

	var alt=img[i].alt,
		src=img[i].src,
		/* title=img[i].title, */
		$main=$('#detailImg-box');
	$main.find('a').attr({'class':'detailImg_'+(i+1)});
	$main.find('img').attr({'alt':alt,'src':src});
	/* $main.find('p').text(title); */
}
function s_a_r(o,c){
	o.addClass(c).siblings().removeClass(c);	
}
//大图左右点击
function i_cur(i,len){

	i=i % len;
	if(i<0){
		i=len+i;	
	}
	return i;	
}


function detailImg_click($pn,i,len,img){
	
	i=i_cur(i,len);
	
	img_info(i,img);
	var imgCur=$('.smallImg_'+(i+1));
	if(!imgCur.html()){
		$pn.click();
	} 
	s_a_r($('.smallImg_'+(i+1)),'cur');//小图选中
}
//小图左右点击
function smallImg_click(a,_a,len,i,img){
	_a=a;
	_a=a%len;
	
	if(_a<0){
		_a+=len;
	}
	c=_a==i?'cur':'';
	s_html(_a,c,img);
	
}
function s_html(_a,c,img){
	return h='<li class=\"smallImg_'+(_a+1)+' '+c+'\"><a><img   alt=\"'+img[_a].alt+'\" src=\"'+img[_a].smallSrc+'\"></a></li>';
}

