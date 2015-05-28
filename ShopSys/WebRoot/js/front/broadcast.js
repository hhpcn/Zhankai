
function broadcast(){
       loadUrl="/ShopSys/front/page/Broadcast.html";
        $.ajax({
              type: "POST",
			  url: loadUrl,
			  cache: false,
			  success: function(result){
				  
			    $("#broadcast").empty().html(result);
		      }
		});
} 