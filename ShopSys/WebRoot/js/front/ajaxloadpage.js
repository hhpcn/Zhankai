$(function(){
	
	//头尾加载完后立马加载中间部分
	hashChangeFire();
	 $(window).hashchange( function(){
		 hashChangeFire();
	});
        
        
       
   });
//根据hash值触发加载界面事件
function hashChangeFire(){
	var defaulthash="#page/mainIndex";
    var hash=window.location.hash;
    if(hash==""){
    	hash=defaulthash;
    }
    hash=hash.replace("#", "");
    var linkPlace=hash.indexOf("_", 0);
    if(linkPlace>0){
    	hash=hash.substring(0, linkPlace);
    }
	loadPage(hash);
}


function loadPage(hash){
       loadUrl="/ShopSys/front/"+hash+".html";
        $.ajax({
              type: "POST",
			  url: loadUrl,
			  cache: false,
			  success: function(result){
				  
			    $("#mymaincontainer").empty().html(result);
		      }
		});
} 



function changeTitle(CTitle,CId,KId,clickHash){
	localStorage.CTitle=CTitle;
	localStorage.CId=CId;
	localStorage.KId=KId;
	
	//如果当前的hash值和所点击的a的href是一样的则通过调用方法触发局部加载;首先排除clickhash为空的情况
	if(typeof(clickHash) != "undefined"){
		 var preHash=window.location.hash;
		 if(clickHash==preHash){
			 hashChangeFire();
		 }
		 
	}
		
}