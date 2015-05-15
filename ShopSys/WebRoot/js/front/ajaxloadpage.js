$(function(){
	//
	
       $(window).hashchange( function(){
            var defaulthash="#page/mainIndex";
            var hash=location.hash.toString();
            if(hash==""){
            	hash=defaulthash;
            }
            hash=hash.replace("#", "");
       		loadPage(hash);
        });
        $(window).hashchange();
        
	//window.addEventListener("hashchange", loadPageByhash(), false);    
        
        
       
   });
//根据hash值触发加载界面事件
function loadPageByhash(){
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

function loaddata(id){
   		//$("#id").val(id);
}

function changeTitle(title){
	$("#title").val(title);
	loadPageByhash();
}