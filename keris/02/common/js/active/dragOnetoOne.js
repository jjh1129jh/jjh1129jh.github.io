// JavaScript Document
/*드래그 액션*/
var dragArray = new Array();
var dropArray = new Array();

var totalDragNum=0;
var totalDropNum=0;
var isClickEnabledFlag=true;

var dragMc=null;
var dropTarget

var isDragingFlag=false;

var nPosX;
var nPosY;

var iszIndex=0;;

var isCorrectNum=0; //해당 페이지 맞춰야 하는 개수
var curpagearray = [];

var chanceCount = 1; // 시도횟수

function _doActivityInit(){
	//isActivityIntroSound
	writeEffectAudio();
	console.log(currentSceneNumber+" / isActivityIntroSound = "+isActivityIntroSound);
	if(currentSceneNumber==1){
		playSound(isActivityIntroSound);
		_doActivityInit2();
	}else{
		_doActivityInit2();
	}
	
}


function _doActivityInit2(){
	$(".isDragObj").each(function(idx){
		dragArray.push({
			objElm:$(this),
			obj:this,
			id:this.id,
			top:$(this).offset.top,
			left:$(this).offset.left
			
		});
		
		this["thisNum"] = idx+1;
		this["initTop"] = $(this).css("top");
		this["initLeft"] = $(this).css("left");
		this["dap"] = $(this).data("dap");
		
		// console.error($(this).offset().top+" , "+$(this).offset().left+" // "+this["initTop"]+" , "+this["initLeft"]);
		
		//$(this).offset({top:0 , left: 100});
		
		console.log(this.id +" , dap = "+this["dap"] +" / idx= "+idx);
		
		_dragInit($(this));
	});
	
	$(".isDropObj").each(function(idx){
		dropArray.push($(this));
		
		this["dap"] = $(this).data("dap");
		this["initTop"] = $(".dropPos").css("top");
		this["initLeft"] = $(this).css("left");
		console.log("DROP ::"+this["dap"]+" / "+this.id+" :: "+this["initTop"]);
		totalDropNum++;
	});
}

function _dragInit(mc){
	mc[0].addEventListener(mousedownEvent,_DragStart,false);
}

function _DragStart(e){
	var e = e || window.event;
	if(!isClickEnabledFlag){return;}
	dragMc = e.currentTarget;
	iszIndex++;
	 $(dragMc).css("z-index",iszIndex);
	e.preventDefault();
	isDragingFlag=true;

	//isDragMc[0].css("opacity",0.3);
	playSound('s_click');
	window.addEventListener(mousemoveEvent,_mouseMove);
	window.addEventListener(mouseupEvent,_mouseMoveStop);
}

function _mouseMove(e){
	var e = e || window.event;
	e.preventDefault();
	isDragingFlag=true;
	nPosX = getClientX(e);
	nPosY = getClientY(e);
	_doMOVE_MOUSE(nPosX , nPosY);

}


﻿function _doMOVE_MOUSE(_nPosX ,_nPosY){
    /*2023.07.27*/
    var sw = $(dragMc)[0].clientWidth;
    var sh = $(dragMc)[0].clientHeight;
    var new_left = ((nPosX - $("#contents"+itostr(currentSceneNumber)).find("#dragBox").offset().left)* 1/container_scale) ;
    var new_top  = ((nPosY - $("#contents"+itostr(currentSceneNumber)).find("#dragBox").offset().top)* 1/container_scale);
    $(dragMc).css("top",(new_top-sh/2)+"px");
    $(dragMc).css("left",(new_left-sw/2)+"px");
    /*2023.07.27*/
}

function _mouseMoveStop(e){
	var e = e || window.event;
	e.preventDefault();
	window.removeEventListener(mousemoveEvent,_mouseMove);
	window.removeEventListener(mouseupEvent,_mouseMoveStop);
	
	dropTarget = _getDropTarget(dragMc["dap"] ,dropArray);
	var isHitFlag=false;
	if(dropTarget){
		console.log("dropTarget = "+dropTarget.attr("id"));	
		var hit = _ChkHitTest($(dragMc)[0] , dropTarget[0]);
		console.log("hit >> "+hit);
		console.log(hit);
		if(hit){
			isHitFlag=true;
		}
		
	}else{
		console.log("no target!");
		
	}
	console.log("isHitFlag = "+isHitFlag);
	if(isHitFlag){
		playSound('drag_ok');
		_doCheckOK();
	}else{
		chanceCount ++; // 시도횟수
		playSound('drag_no');
		$(dragMc).css("top" , dragMc["initTop"]);
		$(dragMc).css("left" , dragMc["initLeft"]);
		_doCheckNo();
		
	}
	
}

function _doCheckOK(){
	_doCheck(true);
}

function _doCheckNo(){
	_doCheck(false);
}

function _getDropTarget(n , _arr){
	
	var returnObject=null;
	for(var i=0;i<_arr.length;i++){
		console.log(_arr[i])
		console.log($(_arr[i]).attr("id"));
		console.log($(_arr[i]).data("dap"));
		console.log(n+" == "+_arr[i].dap);
		if(n == $(_arr[i]).data("dap")){
			returnObject = _arr[i];
			break;
		}
	}
	if(returnObject){
		console.log(returnObject.id+" , "+returnObject.dap);	
	}
	
	return returnObject;
	
}

function _doCheck(v){
	
	
	if(v){
		
		
		console.log("\n ************");
		console.log("정답보여주기");
		console.log($(dropTarget)["initTop"]);
		console.log($(dropTarget)["initLeft"]);
		console.log(dropTarget.css("top"))
		console.log(dropTarget.offset().top);
		console.log(dropTarget.offset().left);
		console.log($(dragMc).css("background-image"));
		$(dragMc).addClass("off");
		$(dragMc).offset({top:$(dropTarget)["initTop"] , left: dropTarget.offset().left});
		$(dragMc).hide();
		dropTarget.addClass("off");	
		dropTarget.css("background-image" , $(dragMc).css("background-image")); 
		// if(currentSceneNumber == 5){
		// 	if(dropTarget.attr("id","vacuum0501")){
		// 		$("#vacuum0502").hide();
		// 	}else if(dropTarget.attr("id","vacuum0502")){
		// 		$("#vacuum0501").hide();
		// 	}
		// }
		// if(currentSceneNumber == 1){ //1페이지 일때 조건문
		// 	$("#vacuum0101").css("background", "url(././common/css/img/contents/1answer.png) no-repeat")
		// 	$("#vacuum0101").css("background-size", "290px 68px")
		// }else if(currentSceneNumber == 2){ //2페이지 일때 조건문
		// 	$("#vacuum0201").css("background", "url(././common/css/img/contents/2answer.png) no-repeat")
		// 	$("#vacuum0201").css("background-size", "290px 68px")
		// }else if(currentSceneNumber == 3){ //3페이지 일때 조건문
		// 	$("#vacuum0301").css("background", "url(././common/css/img/contents/3answer.png) no-repeat")
		// 	$("#vacuum0301").css("background-size", "290px 68px")
		// }
		
		isCorrectNum++;
		nexthover();

	
	//$(dragMc).hide();
	//dropTarget.css("background-image" , $(dragMc).css("background-image"));
	//dropTarget.css("width" , $(dragMc).css("width"));
	//dropTarget.css("height" , $(dragMc).css("height"));
	
	
}

function nexthover() {
	if(currentSceneNumber == 1){
		if(isCorrectNum == 1){ //한개 맞췄을때 isCorrectNum 드랍할때마다 1개씩 증가

			console.log("시도 횟수: " + chanceCount) //시도 횟수
			if(top.bolPorted){
				top.opener.playerChk.contsState("그림을 보고 <보기>에서 알맞은 것을 고르세요.", "내리다", "드래그앤드랍", "내리다", -1, chanceCount)
				top.opener.playerChk.setPoint('LFC02', 1);
				setCoin();
			}
			chanceCount = 1; //시도횟수 초기화

			console.log("끝!!");
			playSound("el_4_01_02_m05_04_01")
			setTimeout(() => {
				$("#resultgif01").show()
				playSound("s_true")
				setTimeout(function () {
					$('#resultgif01').fadeOut(300);
				}, 2000)
				curpagearray[currentSceneNumber - 1] = 1
				$(".footer_inner .paging .next").addClass("end");

			isCorrectNum = 0;
			_doComplete();
			}, 3000);
		}
	}
	else if(currentSceneNumber == 2){
		if(isCorrectNum == 1){ //한개 맞췄을때로

			console.log("시도 횟수: " + chanceCount) //시도 횟수
			if(top.bolPorted){
				top.opener.playerChk.contsState("그림을 보고 <보기>에서 알맞은 것을 고르세요.", "들다", "드래그앤드랍", "들다", -1, chanceCount)
				top.opener.playerChk.setPoint('LFC02', 1);
				setCoin();
			}
			chanceCount = 1; //시도횟수 초기화

			console.log("끝!!");
			playSound("el_4_01_02_m05_03_01")
			setTimeout(() => {
				$("#resultgif01").show()
				playSound("s_true")
				setTimeout(function () {
					$('#resultgif01').fadeOut(300);
				}, 2000)
				curpagearray[currentSceneNumber - 1] = 1
				$(".footer_inner .paging .next").addClass("end");

			isCorrectNum = 0;
			_doComplete();
			}, 3000);
		}
	}else if(currentSceneNumber == 3){
		if(isCorrectNum == 1){ //한개 맞췄을때로

			console.log("시도 횟수: " + chanceCount) //시도 횟수
			if(top.bolPorted){
				top.opener.playerChk.contsState("그림을 보고 <보기>에서 알맞은 것을 고르세요.", "오다", "드래그앤드랍", "오다", -1, chanceCount)
				top.opener.playerChk.setPoint('LFC02', 1);
				setCoin();
			}
			chanceCount = 1; //시도횟수 초기화

			console.log("끝!!");
			playSound("el_4_01_02_m05_01_01")
			setTimeout(() => {
				$("#resultgif01").show()
				playSound("s_true")
				setTimeout(function () {
					$('#resultgif01').fadeOut(300);
				}, 2000)
				curpagearray[currentSceneNumber - 1] = 1
				$(".footer_inner .paging .next").addClass("end");

			isCorrectNum = 0;
			_doComplete();
			}, 3000);
		}
	}else if(currentSceneNumber == 4){
		if(isCorrectNum == 1){ //한개 맞췄을때로

			console.log("시도 횟수: " + chanceCount) //시도 횟수
			if(top.bolPorted){
				top.opener.playerChk.contsState("그림을 보고 <보기>에서 알맞은 것을 고르세요.", "나다", "드래그앤드랍", "나다", -1, chanceCount)
				top.opener.playerChk.setPoint('LFC02', 1);
				setCoin();
			}
			chanceCount = 1; //시도횟수 초기화

			console.log("끝!!");
			playSound("el_4_01_02_m05_08_01")
			setTimeout(() => {
				$("#resultgif01").show()
				playSound("s_true")
				setTimeout(function () {
					$('#resultgif01').fadeOut(300);
				}, 2000)
				curpagearray[currentSceneNumber - 1] = 1
				$(".footer_inner .paging .next").addClass("end");

			isCorrectNum = 0;
			_doComplete();
			}, 3000);
		}
	}else if(currentSceneNumber == 5){
		if(isCorrectNum == 1){ //한개 맞췄을때로

			console.log("시도 횟수: " + chanceCount) //시도 횟수
			if(top.bolPorted){
				top.opener.playerChk.contsState("그림을 보고 <보기>에서 알맞은 것을 고르세요.", "계속되다", "드래그앤드랍", "계속되다", -1, chanceCount)
				top.opener.playerChk.setPoint('LFC02', 1);
				setCoin();
			}
			chanceCount = 1; //시도횟수 초기화

			console.log("끝!!");
			playSound("el_4_01_02_m05_06_01")
			setTimeout(() => {
				$("#resultgif01").show()
				playSound("s_true")
				setTimeout(function () {
					$('#resultgif01').fadeOut(300);
				}, 2000)
				curpagearray[currentSceneNumber - 1] = 1
				$(".footer_inner .paging .next").addClass("end");

			isCorrectNum = 0;
			_doComplete();
			}, 3000);
		}
	}else if(currentSceneNumber == 6){
		if(isCorrectNum == 1){ //한개 맞췄을때로

			console.log("시도 횟수: " + chanceCount) //시도 횟수
			if(top.bolPorted){
				top.opener.playerChk.contsState("그림을 보고 <보기>에서 알맞은 것을 고르세요.", "내리다", "드래그앤드랍", "내리다", -1, chanceCount)
				top.opener.playerChk.setPoint('LFC02', 1);
				setCoin();
			}
			chanceCount = 1; //시도횟수 초기화

			console.log("끝!!");
			playSound("el_4_01_02_m05_05_01")
			setTimeout(() => {
				$("#resultgif01").show()
				playSound("s_true")
				setTimeout(function () {
					$('#resultgif01').fadeOut(300);
				}, 2000)
				curpagearray[currentSceneNumber - 1] = 1
				$(".footer_inner .paging .next").addClass("end");

			isCorrectNum = 0;
			_doComplete();
			}, 3000);
		}
	}else if(currentSceneNumber == 7){
		if(isCorrectNum == 1){ //한개 맞췄을때로

			console.log("시도 횟수: " + chanceCount) //시도 횟수
			if(top.bolPorted){
				top.opener.playerChk.contsState("그림을 보고 <보기>에서 알맞은 것을 고르세요.", "나다", "드래그앤드랍", "나다", -1, chanceCount)
				top.opener.playerChk.setPoint('LFC02', 1);
				setCoin();
			}
			chanceCount = 1; //시도횟수 초기화

			console.log("끝!!");
			playSound("el_4_01_02_m05_02_01")
			setTimeout(() => {
				$("#resultgif01").show()
				playSound("s_true")
				setTimeout(function () {
					$('#resultgif01').fadeOut(300);
				}, 2000)
				curpagearray[currentSceneNumber - 1] = 1
				$(".footer_inner .paging .next").addClass("end");

			isCorrectNum = 0;
			_doComplete();
			}, 3000);
		}
	}else if(currentSceneNumber == 8){
		if(isCorrectNum == 1){ //한개 맞췄을때로

			console.log("시도 횟수: " + chanceCount) //시도 횟수
			if(top.bolPorted){
				top.opener.playerChk.contsState("그림을 보고 <보기>에서 알맞은 것을 고르세요.", "오다", "드래그앤드랍", "오다", -1, chanceCount)
				top.opener.playerChk.setPoint('LFC02', 1);
				setCoin();
			}
			chanceCount = 1; //시도횟수 초기화

			console.log("끝!!");
			playSound("el_4_01_02_m05_07_01")
			setTimeout(() => {
				$("#resultgif01").show()
				playSound("s_true")
				setTimeout(function () {
					$('#resultgif01').fadeOut(300);
				}, 2000)
				curpagearray[currentSceneNumber - 1] = 1
				$(".footer_inner .paging .next").addClass("end");
				if(currentSceneNumber == totalSceneNumber) {
					setTimeout(() => { //정답 나타내는 수리
						$("#pageresult").show()
					}, 2500);
				}
			isCorrectNum = 0;
			_doComplete();
			}, 3000);
		}
	}

		
}
}
