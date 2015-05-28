$(function(){
	loadProducts();
	loadNewProducts();
	
});

function loadProducts(){
	
	$.ajax({
		url:"/ShopSys/productmanage/productAction_frontLoadProductsMainIndex.action",
		type:"post",
		data:{
			"rows":20
		},
		dataType:"json",
		success:function(data){
			var productList = data.rows;
			$("#marqueImg").empty();
			for(var i=0;i<productList.length;i++)
			{
				
				
				$("#marqueImg").append(
					"<td align='center' valign='middle'>" +
					"<a href='#page/productsDetail_P"+productList[i].id+"' onclick='saveProId("+productList[i].id+")'><img src= '/ShopSys/"
				        +productList[i].guideImageUrl +  "' alt='"+productList[i].productName +"'title='"+productList[i].productName+"' height='130px' width='154px'/></a></td>");
				
			}
			
			var Marquee1=new Marquee("marqueediv7", 2,2,1135,130,30,0,1000,52);
			 Marquee1.SwitchType = 1;
			
		}
		
	});
};

function saveProId(ProId){
	
	localStorage.ProId=ProId;
	
};
function loadNewProducts(){
	
	$.ajax({
		url:"/ShopSys/productmanage/productAction_frontLoadProductsByKindAndRows.action",
		type:"post",
		data:{
			"rows":3,
			"id":25
	
		},
		dataType:"json",
		success:function(data){
			var newProductList = data.rows;
			
			$("#newProductPush").empty();
			for(var i=0;i<newProductList.length;i++)
			{
				
				$("#newProductPush").append(
						
			"<div class=' row xinImage' style='border: 1px solid #99c3f2;height:110px;'>" +
						  "<a >" +
						      "<div class='col-md-5'>" +
						           "<img alt='"
						   	  		  +newProductList[i].productName +"' title='"+newProductList[i].productName +"' src='/ShopSys/"
						   	  		   +newProductList[i].guideImageUrl +"' style='width:130px;height:100px;margin-top:5px;'/>" +
						   	  "</div>" +
						   	"</a>"+
						"<div class='col-md-6'>"+
						   "<div style='margin-left: 10px;font-size: 14px;margin-top: 10px;margin-right: 0px'>商品名："
						     +newProductList[i].productName +
						   "</div>"+
						   "<div style='margin-left: 10px;font-size: 14px;margin-top: 10px;margin-right: 0px'>单价："
						     +newProductList[i].price+
						   "</div>"+
						   "<div style='margin-left: 10px;font-size: 14px;margin-top: 10px;margin-right: 0px'>产品详情：" 
						      +"<a href='#page/productsDetail_P"+newProductList[i].id+"' onclick='saveProId("+newProductList[i].id+")'>点击跳转</a>" +
						   "</div>" +
					 "</div>" +
		    "</div>"
			
				
				);
					
			}

		}
	});
}
