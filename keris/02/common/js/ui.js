/**
	2017. 03. 10
	stroy21
	FunnsySky 
	funnysky@story21.co.kr
	UI View 
**/

var w_h;
var w_w;
var container_scale = 1;
var dev = true;// true 개발중 //false 검수
var mobileReadyFlag = false;//모바일 재생 확인
var samsung_Browser_4;
var deviceMobile;
var device_Android_4;
var device_iPhone;
var samsung_Browser_4;

/** onload **/
window.onload = function () {
	if (isMobilePlatform()) {
		responsive();
		console.log(" 모바일 ");
		movileAlertView();
		M_chage();
	}
	responsive();
};

/** resizing **/
$(window).resize(function (e) {
	M_chage();
	responsive();
});

/** 모바일 화면 돌릴때 **/
$(window).on("orientationchange", function (event) {

	M_chage();
	responsive();
});
/** 페이지 초기화 **/
if(top.bolPorted){
	function initialize() {
		$('#fs-index').attr('showing', false)
		if (!dev) {//개발 아닐때 
			$("body").attr("oncontextmenu", "return false");
			$("body").attr("ondragstart", "return false");
			$("body").attr("onselectstart", "return false");
		}
		/** coin */
		setCoin();
		settingStart()
		
		/** menu **/
		setIndex();
	
		/** bottom **/
		setBottom();
	
		/** top **/
		
		/** setTop(); **/
	
		/** 효과음 장착 **/
		writeEffectAudio();
		$("*").removeAttr("title")
	
	}
}else {
	function initialize() {
		$('#fs-index').attr('showing', false)
		if (!dev) {//개발 아닐때 
			$("body").attr("oncontextmenu", "return false");
			$("body").attr("ondragstart", "return false");
			$("body").attr("onselectstart", "return false");
		}
		/** coin */
		//setCoin();
		
		/** menu **/
		setIndex();
	
		/** bottom **/
		setBottom();
	
		/** top **/
		
		/** setTop(); **/
	
		/** 효과음 장착 **/
		writeEffectAudio();
		$("*").removeAttr("title")
	
	}
}
//반응형 scale 조정
function responsive() {
	// return;
	// w_h = $(window).height();
	// w_w = $(window).width();


	// $("#wrap").height("100%");
	// $("#wrap").width("100%");

	// if (w_w < 1280 || w_h < 765) {
	if (true) {
		w_h = $('#wrap').height();
		w_w = $('#wrap').width();
		if (deviceMobile) {
			//alert(deviceMobile);
			var h_scale = w_h / 720;
			//550
		} else {
			// alert(33)
			var h_scale = w_h / 720;
			//600
		}

		if(true){
			var w_scale = w_w / 1280;
			if (h_scale > w_scale) {//w 기준
				container_scale = w_scale;
			} else {//h 기준
				container_scale = h_scale;
			}
		} else {
			container_scale = 1;
		}
		if (device_Android_4) {//안드로이드 버전 4 일때
			//alert("안드로이드 버전 4 -webkit-transform")
			$("#fs-container").css("-webkit-transform", 'scale(' + container_scale + ',' + container_scale + ')')
			// $("#fs-container").css("-webkit-transform-origin", '50%')
		} else {//그외 기기들
			$("#fs-container").css("transform", 'scale(' + container_scale + ',' + container_scale + ')')
			// $("#fs-container").css("transform-origin",'50%')
			$('#fs-container').css('left', "50%");
			$('#fs-container').css('top', "50%");
		}
		//console.log($("#wrap").height() - 650 + h_scale);
		$('#fs-container').css('margin-top', container_scale * -360);
		$('#fs-container').css('margin-left', container_scale * -640);
	} else {
	}
}

function M_chage() {
}

//모바일 view
function movileAlertView() {
	var m_view = '';
	m_view += '<div id="mobile_ready" style="z-index:999;width:100%;height:100%;position:fixed;left:0;top:0;text-align:center;background:rgba(0,0,0,0.8);display:none;">';
	m_view += '	<img style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);">';
	m_view += '</div>';
	$("#wrap").append(m_view);

}

function isMobilePlatform() {
	//return true;
	if (navigator.userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null
		|| navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null) {
		return true;
	}
	else {
		return false;
	}
}

function MobileCheck() {
	deviceMobile = true;
	device_Android_4 = false;
	device_iPhone = false;
	samsung_Browser_4 = false;
	if (/Android/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) || /Mobile/i.test(navigator.userAgent)) {
		//mobile 
		//alert('mobile 접속'); 
		if (/SamsungBrowser\/4.0/i.test(navigator.userAgent)) {
			//alert("삼성내장브라우저 버전 4.0")
			alert("배속을 지원하지 않는 브라우저 입니다. ")
			samsung_Browser_4 = true;
		}
		if (/Android 4./i.test(navigator.userAgent)) {
			//alert("안드로이드 버전 4.")
			device_Android_4 = true;
			// 안드로이드 4
		} else {
			device_Android_4 = false;
			device_iPhone = false;
			if (/iPhone/i.test(navigator.userAgent)) {
				device_iPhone = true;
			}
			//alert("안드로이드4.버전이 아닌")
			// 그 외 디바이스
		}
		//return true;
	} else {
		//pc 
		deviceMobile = false;
		//return false;
	}
}