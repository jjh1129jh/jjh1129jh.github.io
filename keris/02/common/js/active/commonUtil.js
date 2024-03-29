// JavaScript Document
var currentOS;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent.toLowerCase());
isMobile += navigator.userAgent.match(/iPhone|iPad|iPod/i) === null && navigator.maxTouchPoints != 5 ? false : true;
//isMobile=true;
if (isMobile) {
	// 유저에이전트를 불러와서 OS를 구분합니다.
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.search("android") > -1)
		currentOS = "android";
	else if ((userAgent.search("iPhone") > -1)
			 || (userAgent.search("iPad") > -1)
			 || (userAgent.search("iPod") > -1)
			 || (userAgent.search("like Mac") > -1)
			 || (userAgent.match(/iPhone|iPad|iPod/i) === null && navigator.maxTouchPoints != 5 ? false : true))
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
		if(curpagearray[currentSceneNumber - 1] != 1){
			$(".next").removeClass('end');
		}else{
			$(".next").addClass('end');
		}
	}
	$('#resultgif01').hide();
	langugae6()
}
/** 이전버튼 클릭 **/
function handlePrevClick() {
	if(currentSceneNumber == 1){
		alert("첫 페이지 입니다.")
	}else{
		_doComplete();
		currentSceneNumber--;
				_ChangeScene(currentSceneNumber);
		if(curpagearray[currentSceneNumber - 1] != 1){
			$(".next").removeClass('end');
		}else{
			$(".next").addClass('end');
		}
	}
	$('#resultgif01').hide();
	langugae6()
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


