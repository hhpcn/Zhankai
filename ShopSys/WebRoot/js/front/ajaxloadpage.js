$(function(){
       $(window).hashchange( function(){
            var defaulthash="#mainIndex";
            var hash=location.hash.toString();
            if(hash==""){
            	hash=defaulthash;
            }
            hash=hash.replace("#", "");
       		loadPage(hash);
        });
        $(window).hashchange();
       
   });

function loadPage(hash){
       loadUrl="/ShopSys/front/page/"+hash+".html";
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