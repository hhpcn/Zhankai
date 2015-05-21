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
	  
	  
	  //根据选中的二级栏目加载相对的产品
	  loadProducts(localStorage.KId);
  }
  
  
  


}); 


//点击子界面栏目时触发的事件
function change(id){
	  $("li").removeClass("active");
	  $("#K"+id).addClass("active"); 
	  
	//将选中的二级栏目id存在localStorage中
	 localStorage.KId = id;
	 
	 loadProducts(id);
	  
	  
}

//根据类别加载产品
function loadProducts(kindId){
	
	
	$.ajax({
		url:"/ShopSys/productmanage/productAction_frontLoadProducts.action",
		type:"post",
		data:{
			"id":kindId,
			"page":1,
			"rows":9
		},
		dataType:"json",
		success:function(data){
			
		}
	});
	
	
	
}

