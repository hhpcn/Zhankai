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



function changeTitle(title){
	$("#title").val(title);
	hashChangeFire();
}