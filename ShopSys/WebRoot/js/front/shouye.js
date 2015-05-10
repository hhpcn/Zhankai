var _faiAjax = function(){
	//for regexp
	var r = /\?/;
	var _o = {
		type:"get",
		url:"",
		data:"",
		error:function(){},
		success:function(){}
	};
	var _sendRequest=function(o) {
		var xmlhttp = null;
		//init option code
		o.type = o.type || _o.type;
		o.url = o.url || _o.url;
		o.data = o.data || _o.data;
		o.error = o.error || _o.error;
		o.success = o.success || _o.success;
		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}else{
			// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		//the instructions param takes the form of an eval statement
		if(o.type != "post") {
			o.url += ( this.r.test( o.url ) ? "&" : "?" ) + o.data;
			xmlhttp.open("GET", o.url, true);
				xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					o.success( xmlhttp.responseText );
				}else if( o.error ){
					o.error();
				}
			}
			xmlhttp.send();
		} else {
			xmlhttp.open("POST", o.url, true);
			//Send the proper header information along with the request
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
			xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					o.success( xmlhttp.responseText );
				}else{
					o.error();
				}
			}
			xmlhttp.send(o.data);
		}
	}
	return {
		ajax:function(option){
			try {
				//此次调用的错误不让抛出给window。防止函数重入
				_sendRequest(option);	
			}catch(e){
				//alert(e);
			}
		}
	};
}();
var _jsErrCahche = [];
window.onerror = function(sMsg,sUrl,sLine){
	if (typeof Site == 'undefined') {
		alert('您的网页未加载完成，请尝试按“CTRL+功能键F5”重新加载。');
	}
	if( sLine < 1 || typeof sMsg != 'string' || sMsg.length < 1 ){
		return;
	}
	
	var log = "Error:" + sMsg + ";Line:" + sLine + ";Url:" + sUrl;
	var alertLog = "Error:"+sMsg+"\n" + "Line:" + sLine + "\n" + "Url:" + sUrl + "\n";
	var encodeUrl = function (url){
		return typeof url === "undefined" ? "" : encodeURIComponent(url);
	};
	
	var ajax = true;
	var obj = { 'm' : sMsg, 'u' : sUrl, 'l' : sLine };
	for( var i = 0; i < _jsErrCahche.length; i ++ ){
		if( _jsErrCahche[i].m == obj.m && _jsErrCahche[i].u == obj.u && _jsErrCahche[i].l == obj.l  ){
			ajax = false;
			break;
		}
	}
	
	if( ajax ){
		_jsErrCahche.push( obj );
		_faiAjax.ajax({
			type	: "post",
			url		: "ajax/logJsErr_h.jsp?cmd=jsErr",
			data	: 'msg='+ encodeUrl(log)
		});
	}
	if(false){
		alert( alertLog );
	}
};
Fai.top = window;
var bgmCloseToOpen = false;
var _devMode = false;
var _colOtherStyleData = {"independentList":[],"y":0,"h":0,"layout4Width":0,"layout5Width":0};						// 当前页面的数据    
var _templateOtherStyleData = {"independentList":[],"h":480,"y":0,"layout4Width":0,"layout5Width":0};						// 全局的数据   
$(function() {
	if(false){
		Fai.ing("",true);
	}
	//topBarMember 
	
	
	// 管理态下, QQ/微博登陆 禁止登陆
	if( _manageMode ) {
		$('#memberBar .l_Btn').click(function(){
			Fai.ing('您目前处于网站管理状态，请先点击网站右上方的“退出”后再登录会员。', true);
		});
		//绑定放大镜遮罩效果事件
		Site.bindEventToOverLayer();		
	}
	
	
	var faiscoAd = $.cookie('faiscoAd',{path:'/'});
	
	if( true && faiscoAd !== "false" ){
		$(".siteAdvertisement_box").show();
	}
	
	

	
	
	
	
	// 绑定退出事件
	$(window).bind("beforeunload", function(e) { 

		 
			if(bgmCloseToOpen){
				Site.bgmFlushContinue();
			}	
	
	
	
	
		
	});
	

	Site.initTemplateLayout(1, true, false );

	// spider统计
	

	
	// ajax统计
	Site.total({colId:2, pdId:-1, ndId:-1, sc:0, rf:"http://www.k8woke.icoc.cc/pr.jsp"});
	//前端性能数据上报
	Site.report();
	//保留旧用户的初始化版式区域4 和区域5 中，区域4的padding-right空间
	Site.colLayout45Width();

	Site.initModuleSiteSearch('392');
Site.initBanner({"_open":true,"data":[{"title":"","desc":"","imgWidth":1440,"imgHeight":380,"src":"/ShopSys/image/ABUIABACGAAgxNyplQUo76HyKTCyBzi0Aw.jpg","edgeLeft":"","edgeRight":""},
{"title":"","desc":"","imgWidth":1440,"imgHeight":380,"src":"/ShopSys/image/130001.jpg","edgeLeft":"","edgeRight":""},
{"title":"","desc":"","imgWidth":1440,"imgHeight":380,"src":"/ShopSys/image/40001.jpg","edgeLeft":"","edgeRight":""}],"width":1440,"height":380,"playTime":4000,"animateTime":1500,"from":"banner","btnType":1,"wideScreen":false}, {"_open":false}, 4);


Site.loadNewsList(313);
Site.initMixNews({moduleId:313, leader:'0'});

Site.initMulColModuleInIE('#module311');
Fai.top.Product386 = {};
Fai.top.Product386.ieOpt = {"effType":1,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"style":3};
Fai.top.Product386.tgOpt = {"mallShowBuy":false,"productSelect":true,"targetParent":"productMarqueeForm","target":"imgDiv","propNameShow":true,"productNameShow":true,"productTextCenter":true,"productNameWordWrap":true};
Fai.top.Product386.callbackArgs = [{"m386marqueeProduct1":"[]","productName":"产品1","productBuyBtnText":"购买","productBuyBtnClick":""},{"m386marqueeProduct2":"[]","productName":"产品2","productBuyBtnText":"购买","productBuyBtnClick":""},{"m386marqueeProduct3":"[]","productName":"产品3","productBuyBtnText":"购买","productBuyBtnClick":""},{"m386marqueeProduct4":"[]","productName":"产品4","productBuyBtnText":"购买","productBuyBtnClick":""},{"m386marqueeProduct5":"[]","productName":"产品5","productBuyBtnText":"购买","productBuyBtnClick":""}];
Site.loadProductMarquee(386, true, false, 0);
Fai.top.changeMarquee386 = function(){Fai.stopInterval('marquee386');Site.loadProductMarquee(386, true, false, 0);};




	


	Site.initPage();	// 这个要放在最后，因为模块组初始化时会把一些模块隐藏，导致没有高度，所以要放最后执行

	
	
	
	setTimeout("afterModuleLoaded()", 0);

	if( _manageMode ) {
	
		Site.initManagePage();
		
		
	}
	
	if (!_oem && _manageMode) {
		Site.siteGuideInit();
		if( false ){
			$.cookie('_loadedRegStatIframe',true,{ expires: 2 });
		}
	}	

	

});

function afterModuleLoaded() {
	Site.initPage2();
	
	Site.mallCartInit(_colId);
} // afterModuleLoaded end

var _portalHost = 'www.faisco.cn';

var _lcid = 2052;
var _userHostName = 'www.k8woke.icoc.cc';
var _siteDomain = 'http://www.k8woke.icoc.cc';
var _signupDays = 0;
var _cid = 5748191;
var _resRoot = 'http://0.ss.faidns.com';
var _colId = 2;
var _extId = 0;
var _fromColId = -1;
var _designAuth = false;
var _manageMode = false;
var _oem = false;
var _siteAuth = 0;
var _adm = false;
var _siteVer = 10;
var _manageStatus = false;
var nav2SubMenu=[];
var nav101SubMenu=[];
var nav3SubMenu=[];
var nav12SubMenu=[];
var nav102SubMenu=[];

var _customBackgroundData = {"styleDefault":true,"s":true,"h":false,"r":3,"o":"","sw":-1,"e":0,"wbh":-1,"wbw":-1,"clw":-1,"crw":-1,"id":"","p":"","bBg":{"y":0,"r":3,"f":"","p":"","c":"#000"},"cBg":{"y":0,"r":3,"f":"","p":"","c":"#000"},"cmBg":{"y":0,"r":3,"f":"","p":"","c":"#000"}};          //自定义的数据
var _templateBackgroundData = {"id":"","bBg":{"y":0,"r":3,"f":"","p":"","c":"#c7c7c7"},"cBg":{"y":0,"r":3,"f":"","p":"","c":"#000"},"cmBg":{"y":0,"r":3,"f":"","p":"","c":"#000"},"s":true,"h":false,"r":3,"o":"","sw":-1,"e":0,"wbh":-1,"wbw":-1,"clw":-1,"crw":-1,"p":""};// 模版的数据
var _useTemplateBanner = true;				// 是否使用全局模版

var _pageBannerData = {"s":0,"i":4000,"a":1500,"h":false,"o":false,"t":1,"p":0,"pt":0,"pl":0,"bt":1,"l":[],"f":{},"ce":{},"n":[],"c":3,"ws":false};					// 当前页面的自定义数据（页面独立样式设置）



var _aid = 5748191;
var _templateLayout = 1;
var _webBannerHeight = -1;
var _siteDemo = false;