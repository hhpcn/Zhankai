<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>后台管理系统</title>

		<meta name="description" content="User login page" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="common/ace/assets/css/bootstrap.css" />
		<link rel="stylesheet" href="common/ace/assets/css/font-awesome.css" />

		<!-- text fonts -->
		<link rel="stylesheet" href="common/ace/assets/css/ace-fonts.css" />

		<!-- ace styles -->
		<link rel="stylesheet" href="common/ace/assets/css/ace.css" />

		<!--[if lte IE 9]>
			<link rel="stylesheet" href="common/ace/assets/css/ace-part2.css" />
		<![endif]-->
		<link rel="stylesheet" href="common/ace/assets/css/ace-rtl.css" />

		<!--[if lte IE 9]>
		  <link rel="stylesheet" href="common/ace/assets/css/ace-ie.css" />
		<![endif]-->

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

		<!--[if lt IE 9]>
		<script src="common/ace/assets/js/html5shiv.js"></script>
		<script src="common/ace/assets/js/respond.js"></script>
		<![endif]-->
		
	<script type="text/javascript" src="/ShopSys/js/common/rsa/Barrett.js"></script>  
    <script type="text/javascript" src="/ShopSys/js/common/rsa/BigInt.js"></script>  
    <script type="text/javascript" src="/ShopSys/js/common/rsa/RSA.js"></script>   
    
      
<script type="text/javascript">  
function rsapwd(pwd){  
     
    bodyRSA();  
    var result = encryptedString(key, encodeURIComponent(pwd)); 
    return result;  
}  
var key ;  
function bodyRSA(){  
    setMaxDigits(130);  
    key = new RSAKeyPair("10001","","8246a46f44fc4d961e139fd70f4787d272d374532f4d2d9b7cbaad6a15a8c1301319aa6b3f30413b859351c71938aec516fa7147b69168b195e81df46b6bed7950cf3a1c719d42175f73d7c97a85d7d20a9e83688b92f05b3059bb2ff75cd7190a042cd2db97ebc2ab4da366f2a7085556ed613b5a39c9fdd2bb2595d1dc23b5");   
}  
</script>  
	
		
	</head>

	<body class="login-layout">
		<div class="main-container">
			<div class="main-content">
				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<div class="login-container">
							<div class="center">
								<h1>
									<i class="ace-icon fa fa-leaf green"></i>
								<!-- 	<span class="red">后台</span> -->
									<span class="white" id="id-text2">网站后台管理系统</span>
								</h1>
								<h4 class="blue" id="id-company-text">&copy; 战士凯歌</h4>
							</div>

							<div class="space-6"></div>

							<div class="position-relative">
								<div id="login-box" class="login-box visible widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header blue lighter bigger">
												<i class="ace-icon fa fa-coffee green"></i>
												请输入登入信息
											</h4>

											<div class="space-6"></div>

											<form method="post" action="personnel/userAction_login.action" >
												<fieldset>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input name="userName" type="text" class="form-control" placeholder="Username" id="Username" />
															<i class="ace-icon fa fa-user"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input name="password" type="password" class="form-control" placeholder="Password" id="Password"/>
															<i class="ace-icon fa fa-lock"></i>
														</span>
													</label>

													<div class="space"></div>

													<div class="clearfix">
														<label class="inline">
															<input type="checkbox" class="ace" />
															<span class="lbl"> 记录登入信息</span>
														</label>

														<button id="login" type="submit" class="width-35 pull-right btn btn-sm btn-primary">
															<i class="ace-icon fa fa-key"></i>
															<span class="bigger-110">登入</span>
														</button>
													</div>

													<div class="space-4"></div>
												</fieldset>
											</form>

										<!-- 	<div class="social-or-login center">
												<span class="bigger-110">Or Login Using</span>
											</div>

											<div class="space-6"></div>

											<div class="social-login center">
												<a class="btn btn-primary">
													<i class="ace-icon fa fa-facebook"></i>
												</a>

												<a class="btn btn-info">
													<i class="ace-icon fa fa-twitter"></i>
												</a>

												<a class="btn btn-danger">
													<i class="ace-icon fa fa-google-plus"></i>
												</a>
											</div> -->
										</div><!-- /.widget-main -->

										<div class="toolbar clearfix">
											<div>
												<a href="#" data-target="#forgot-box" class="forgot-password-link">
													<i class="ace-icon fa fa-arrow-left"></i>
													忘记密码？
												</a>
											</div>

											<div>
												<a href="#" data-target="#signup-box" class="user-signup-link">
													注册？
													<i class="ace-icon fa fa-arrow-right"></i>
												</a>
											</div>
										</div>
									</div><!-- /.widget-body -->
								</div><!-- /.login-box -->

								<div id="forgot-box" class="forgot-box widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header red lighter bigger">
												<i class="ace-icon fa fa-key"></i>
												取回密码
											</h4>

											<div class="space-6"></div>
											<p>
												输入账户邮箱获取指令
											</p>

											<form>
												<fieldset>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="email" class="form-control" placeholder="邮箱" />
															<i class="ace-icon fa fa-envelope"></i>
														</span>
													</label>

													<div class="clearfix">
														<button type="button" class="width-35 pull-right btn btn-sm btn-danger">
															<i class="ace-icon fa fa-lightbulb-o"></i>
															<span class="bigger-110">发送!</span>
														</button>
													</div>
												</fieldset>
											</form>
										</div><!-- /.widget-main -->

										<div class="toolbar center">
											<a href="#" data-target="#login-box" class="back-to-login-link">
												返回登入
												<i class="ace-icon fa fa-arrow-right"></i>
											</a>
										</div>
									</div><!-- /.widget-body -->signup-box
								</div><!-- /.forgot-box -->

								<div id="signup-box" class="signup-box widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header green lighter bigger">
												<i class="ace-icon fa fa-users blue"></i>
												新用户注册
											</h4>

											<div class="space-6"></div>
											<p> 输入注册信息: </p>

											<form id="registerForm">
												<fieldset>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="email" class="form-control" name="email" placeholder="邮箱" />
															<i class="ace-icon fa fa-envelope"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" class="form-control" id="reusername" name="username" placeholder="用户名" />
															<i class="ace-icon fa fa-user"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input id="password1" type="password" class="form-control" name="password" placeholder="密码" />
															<i class="ace-icon fa fa-lock"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control" placeholder="重复密码" />
															<i class="ace-icon fa fa-retweet"></i>
														</span>
													</label>

													<!-- <label class="block">
														<input type="checkbox" class="ace" />
														<span class="lbl">
															我接受
															<a href="#">用户协议</a>
														</span>
													</label>
 -->
													<div class="space-24"></div>

													<div class="clearfix">
														<button type="reset" class="width-30 pull-left btn btn-sm">
															<i class="ace-icon fa fa-refresh"></i>
															<span class="bigger-110">重置</span>
														</button>

														<button type="button" id="btnRegister" class="width-65 pull-right btn btn-sm btn-success" >
															<span class="bigger-110">注册</span>

															<i class="ace-icon fa fa-arrow-right icon-on-right"></i>
														</button>
													</div>
												</fieldset>
											</form>
										</div>

										<div class="toolbar center">
											<a href="#" data-target="#login-box" class="back-to-login-link">
												<i class="ace-icon fa fa-arrow-left"></i>
												返回登入
											</a>
										</div>
									</div><!-- /.widget-body -->
								</div><!-- /.signup-box -->
							</div><!-- /.position-relative -->

							<div class="navbar-fixed-top align-right">
								<br />
								&nbsp;
								<a id="btn-login-dark" href="#">深</a>
								&nbsp;
								<span class="blue">/</span>
								&nbsp;
								<a id="btn-login-blur" href="#">蓝</a>
								&nbsp;
								<span class="blue">/</span>
								&nbsp;
								<a id="btn-login-light" href="#">浅</a>
								&nbsp; &nbsp; &nbsp;
							</div>
						</div>
					</div><!-- /.col -->
				</div><!-- /.row -->
			</div><!-- /.main-content -->
		</div><!-- /.main-container -->

		<!-- basic scripts -->

		<!--[if !IE]> -->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='common/ace/assets/js/jquery.js'>"+"<"+"/script>");
		</script>

		<!-- <![endif]-->

		<!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script src='common/ace/assets/js/jquery1x.js'>"+"<"+"/script>");
</script>
<![endif]-->
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='common/ace/assets/js/jquery.mobile.custom.js'>"+"<"+"/script>");
		</script>
  <script type="text/javascript" src="/ShopSys/js/common/jquery.validate.min.js"></script>
		<!-- inline scripts related to this page -->
		<script type="text/javascript">
			jQuery(function($) {
			 $(document).on('click', '.toolbar a[data-target]', function(e) {
				e.preventDefault();
				var target = $(this).data('target');
				$('.widget-box.visible').removeClass('visible');//hide others
				$(target).addClass('visible');//show target
			 });
			 
			
			 
			/*  $('#login').on('click',function(e){
			
				 alert( $("#Password").val());
			 	 $.ajax({
							type : "get",
							url : "personnel/userAction_login.action",
							data : {
								username : $("#Username").val(),
								password : $("#Password").val(),
							},
							dataType : "html",
							success : function(data) {
							   alert("hhahf");
							}
						});
						
			 });
			  */
			});
			
			
			
			//you don't need this, just used for changing background
			jQuery(function($) {
			 $('#btn-login-dark').on('click', function(e) {
				$('body').attr('class', 'login-layout');
				$('#id-text2').attr('class', 'white');
				$('#id-company-text').attr('class', 'blue');
				
				e.preventDefault();
			 });
			 $('#btn-login-light').on('click', function(e) {
				$('body').attr('class', 'login-layout light-login');
				$('#id-text2').attr('class', 'grey');
				$('#id-company-text').attr('class', 'blue');
				
				e.preventDefault();
			 });
			 $('#btn-login-blur').on('click', function(e) {
				$('body').attr('class', 'login-layout blur-login');
				$('#id-text2').attr('class', 'white');
				$('#id-company-text').attr('class', 'light-blue');
				
				e.preventDefault();
			 });
			 
			 
			 
			});
			
			jQuery(function($){
	    //被验证的元素是一个form元素，如果原来不是，请用一个<form></form>包裹一下表单
		$("#registerForm").validate({
	             onkeyup: false,
	             errorClass: 'error',
	             validClass: 'valid',
	             highlight: function(element) {
	                 $(element).closest('div').addClass("f-error");
	             },
	             unhighlight: function(element) {
	                 $(element).closest('div').removeClass("f-error");
	             },
	             errorPlacement: function(error, element) {
	                 $(element).closest('div').append(error);
	             },
	             rules: {
	                 userName:{required: true ,minlength: 6},
	                 password:{required: true ,minlength: 6,maxlength:20},
	                 password2:{required: true ,equalTo: "#password1"},
	                 email:{required: true,email:true },
	                
	             },
	             messages:{
	                 userName:{required: "用户名不能为空",minlength:"用户名不能小于6个字符"},
	                 password:{required: "密码不能为空" ,minlength:"密码不能小于6位数",maxlength:"密码最多20位数"},
	                 password2:{required: "请输入相同的密码" ,equalTo: "请输入相同的密码"},
	                 email:{required: "邮箱不能为空",email:"请输入正确格式的邮箱地址"},
	             }
	        });
  			
          
    		$('#registerForm')[0].reset();
    		
    		
    		
    		$("#btnRegister").click(
	    		function() {
	    			//.validate({。。。})是初始化验证表单，.valid()是进行验证
		    		  if($("#registerForm").valid()){
		    		      //如果表单验证通过则执行
		    		      $.ajax({
								type : "POST",
								url : "personnel/userAction_register.action",
								data : {//取值，$("#username").val()
									"user.userName":$("#registerForm").find("[name=username]").val(),
		        					
		        					"user.password":rsapwd($("#registerForm").find("[name=password]").val()),
		        			
		        					"user.email":$("#registerForm").find("[name=email]").val(),
		        					
								},
								dataType : "json",
								success : function(data) {
								alert(data);
									<%-- if(data.success){
										if(data.msg=="恭喜,注册成功!"){
											$.W.alert("系统消息","恭喜,注册成功!即将跳转到登录页面...",true,function(){
												window.location.href ='<%=path%>'+"/login.jsp";
											});
										}else{
											$.W.alert("系统消息",data.msg,true);
										}
									}else{
										$.W.alert("系统消息",data.msg,true);
									} --%>
								}
							}) ;
		    		  }
				}
			);
	
	});
	
			
		</script>
	</body>
</html>
