// JavaScript Document
var currentOS;
var isMobile = (/iphone|ipad|ipod|android|macintosh|samsung/i.test(navigator.userAgent.toLowerCase()));
//isMobile=true;
if (isMobile) {
	// 유저에이전트를 불러와서 OS를 구분합니다.
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.search("android") > -1)
		currentOS = "android";
	else if ((userAgent.search("iphone") > -1) 
			 || (userAgent.search("ipod") > -1)
			 || (userAgent.search("macintosh") > -1)
			 || (userAgent.search("ipad") > -1))
		currentOS = "ios";
	else
		currentOS = "else";
} else {
	// 모바일이 아닐 때
	currentOS = "nomobile";

}
var mousedownEvent = currentOS=="nomobile" ? "mousedown" : "touchstart";
var mouseupEvent =  currentOS=="nomobile" ? "mouseup" : "touchend";
var mousemoveEvent =  currentOS=="nomobile" ? "mousemove" : "touchmove";
var mouseoverEvent =  currentOS=="nomobile" ? "mouseover" : "touchover";
var mouseoutEvent =  currentOS=="nomobile" ? "mouseout" : "touchcancle";
var mouseleaveEvent =  currentOS=="nomobile" ? "mouseleave" : "touchcancle";


function _doCheck(){
	
}

function _doComplete(){
	$(".footer_inner .paging .next").addClass("end");
}
function _doCompleteEnd(){
	$(".footer_inner .paging .next").removeClass("end");
}


function getClientX(e){
	var returnVal = (e.originalEvent && e.originalEvent.clientX) || (e.touches && e.touches[0] && e.touches[0].clientX) || e.clientX || e.pageX ;
	return returnVal;
}
function getClientY(e){
	var returnVal = (e.originalEvent && e.originalEvent.clientY) || (e.touches && e.touches[0] && e.touches[0].clientY) || e.clientY || e.pageY ;
	return returnVal;
}
function _ChkHitTest(o, l){

	function getOffset(o){

		for(var r = {l: o.offsetLeft, t: o.offsetTop, r: o.offsetWidth, b: o.offsetHeight};

			o = o.offsetParent; r.l += o.offsetLeft, r.t += o.offsetTop);

		return r.r += r.l, r.b += r.t, r;

	}

	for(var b, s, r = [], a = getOffset(o), j = isNaN(l.length), i = (j ? l = [l] : l).length; i;

		b = getOffset(l[--i]), (a.l == b.l || (a.l > b.l ? a.l <= b.r : b.l <= a.r))

		&& (a.t == b.t || (a.t > b.t ? a.t <= b.b : b.t <= a.b)) && (r[r.length] = l[i]));

	return j ? !!r.length : r;

};

/** 다음버튼 클릭(씬 이동) **/
function handleNextClick() {
	if(currentSceneNumber == totalSceneNumber){
		//
		top.opener.playerChk.wcontsComplete();
	}else{
		currentSceneNumber++;
				_ChangeScene(currentSceneNumber);
		if(currentSceneNumberarray[currentSceneNumber - 1] != 1){
			$(".next").removeClass('end');
		}else{
			$(".next").addClass('end');
		}


		if(currentSceneNumber == 2){
			$('.contentspop').hide();
			$(".img02_04").css('display','block');
		}else if(currentSceneNumber == 3){
			$('.contentspop').hide();
			$(".img03_04").css('display','block');
		}else if(currentSceneNumber == 4){
			$('.contentspop').hide();
			$(".img04_04").css('display','block');
		}

		if(currentSceneNumber == 2){
			$(".footer_inner .paging .pre").css("display","block");
		}
		exampleCheck()
	}
	
	if(currentSceneNumber == 1){
		$(".footer_inner .paging .pre").css("display","none");
	}
	else if(currentSceneNumber == totalSceneNumber){
		$(".footer_inner .paging .pre").css("display","block");
		$(".next").addClass("end")
	}else{
		$(".footer_inner .paging .pre").css("display","block");
	}
	chanceCount = 0;
	checkCount = 0;
	$("#resultgif01").hide();
	console.log("찬스초기화")
	langugae6();
	$('#resultgif01').hide();
}
/** 이전버튼 클릭 **/
function handlePrevClick() {
	if(currentSceneNumber == 1){
		alert("첫 페이지 입니다.")
	}else{
		currentSceneNumber--;
				_ChangeScene(currentSceneNumber);
		if(currentSceneNumberarray[currentSceneNumber - 1] != 1){
			$(".next").removeClass('end');
		}else{
			$(".next").addClass('end');
		}


		if(currentSceneNumber == 1){
			$('.contentspop').hide();
			$(".img01_04").css('display','block');
		}else if(currentSceneNumber == 2){
			$('.contentspop').hide();
			$(".img02_04").css('display','block');
		}else if(currentSceneNumber == 3){
			$('.contentspop').hide();
			$(".img03_04").css('display','block');
		}else if(currentSceneNumber == 4){
			$('.contentspop').hide();
			$(".img04_04").css('display','block');
		}else if(currentSceneNumber == 5){
			$('.contentspop').hide();
			$(".img05_04").css('display','block');
		}else if(currentSceneNumber == 6){
			$('.contentspop').hide();
			$(".img06_04").css('display','block');
		}

		if(currentSceneNumber == 1){
			$(".footer_inner .paging .pre").css("display","none");
		}
		exampleCheck()
	}
	
	if(currentSceneNumber == 1){
		$(".footer_inner .paging .pre").css("display","none");
	}
	else if(currentSceneNumber == totalSceneNumber){
		$(".footer_inner .paging .pre").css("display","block");
		$(".next").addClass("end")
	}else{
		$(".footer_inner .paging .pre").css("display","block");
	}
	chanceCount = 0;
	checkCount = 0;
	$("#resultgif01").hide();
	console.log("찬스초기화")
	langugae6();
	$('#resultgif01').hide();
}

function _ChangeScene(n){
	playSound("click")
	currentSceneNumber = n;
	console.log("currentSceneNumber = "+currentSceneNumber);
	
	for(var i=1;i<=totalSceneNumber;i++){
		sceneAreaObject.removeClass("just left"+i);	
	}
	sceneAreaObject.addClass("left"+currentSceneNumber);
}

function exampleCheck() {
	if($('#example_q1 > img').hasClass("_inTextImage")){
		$(".img01_04").css('display','none');
	}else{
		$(".img01_04").css('display','block');
	}

	if($('#example_q2 > img').hasClass("_inTextImage")){
		$(".img02_04").css('display','none');
	}else{
		$(".img02_04").css('display','block');
	}

	if($('#example_q3 > img').hasClass("_inTextImage")){
		$(".img03_04").css('display','none');
	}else{
		$(".img03_04").css('display','block');
	}

	if($('#example_q4 > img').hasClass("_inTextImage")){
		$(".img04_04").css('display','none');
	}else{
		$(".img04_04").css('display','block');
	}

	if($('#example_q5 > img').hasClass("_inTextImage")){
		$(".img05_04").css('display','none');
	}else{
		$(".img05_04").css('display','block');
	}

	if($('#example_q6 > img').hasClass("_inTextImage")){
		$(".img06_04").css('display','none');
	}else{
		$(".img06_04").css('display','block');
	}
}