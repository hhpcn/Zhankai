$(function(){
	loadProducts();

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


