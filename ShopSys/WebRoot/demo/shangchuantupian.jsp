<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'shangchuantupian.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	 <script src="/ShopSys/common/uploadPreview.min.js" type="text/javascript"></script>
	 <script src="/ShopSys/common/ace/assets/js/jquery.js" type="text/javascript"></script>
     <script src="/ShopSys/common/ajaxfileupload.js" type="text/javascript"></script>
    
	 <script>
       window.onload = function () { 
            new uploadPreview({ UpBtn: "guideImg", DivShow: "imgdiv", ImgShow: "imgShow" });
            $("#uploadguidmap").on("click",function(){
            	ajaxFileUpload();
            });
        };
        
        function ajaxFileUpload()
	    {
	        
	   /*      $("#loading").ajaxStart(function(){
	           					 $(this).show();})//开始上传文件时显示一个图片
	        			 .ajaxComplete(function(){
	           					 $(this).hide();});//文件上传完成将图片隐藏起来 */
	        $.ajaxFileUpload
	        (
	            {
	                url:'/ShopSys/ckeditorUploadAction_uploadGuideImg.action',//用于文件上传的服务器端请求地址
	                secureuri:false,//一般设置为false
	                fileElementId:'guideImg',//文件上传空间的id属性  <input type="file" id="file" name="file" />
	                dataType: 'json',//返回值类型 一般设置为json
	                complete: function () {
	                //只要完成即执行，最后执行
			        },
			        success: function (data, status)  //服务器成功响应处理函数
			        {
			            if (typeof (data.error) != 'undefined') {
			                if (data.error != '') {
			                    if (data.error == "1001") {//这个error（错误码）是由自己定义的，根据后台返回的json对象的键值而判断
			                    }
			                    else if (data.error == "1002") {
			                    }
			                    alert(data.msg);//同error
			                    return;
			                } else {
			                    alert(data.msg);
			                }
			            }
			            /*
			                *    这里就是做一些其他操作，比如把图片显示到某控件中去之类的。
			                */
			        },
			        error: function (data, status, e)//服务器响应失败处理函数
			        {
			            alert(e);
			        }
	            }
	        );
	        
	
	    }
    </script>
   

  </head>
  
  <body>
<!-- <img src="loading.gif" id="loading" style="display: none;"> -->
    <div id="imgdiv"><img id="imgShow" width="100" height="100" /></div>
	<input type="file" id="guideImg" name="guideImg" />
	<input type="button" value="上传" id="uploadguidmap"/>
	
  </body>
</html>
