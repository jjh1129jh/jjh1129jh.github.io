/**
	2017. 03. 10
	stroy21
	FunnsySky 
	funnysky@story21.co.kr
	Bottom View 
	top.navi_frame.FnNextMove(next_page)
**/

///////////////////////////////////////////////////////////////////////////////////////////////////

var langcookie = Number(getCookie("language"));
var langNo = langcookie;
var Player, _rect, _slide_bg, _sound_bar, _handleGap = 11, speedNum, pictureNum, _dragWidth, _dragX;
var videoChk = false;
var scriptFlag = false;
var volume = 0.5;
var rateNum = 1;
var mapFlag = false;
var percent;
var slideDownFlag = false;
var soundBarW;
var enableScript = true;
var pictFlag = false;
var firstPlay = false
var quizStart = false; // 퀴즈 버튼 눌렀는지 확인
var quizTemp1 = false;
var quizTemp2 = false;
var quizTemp3 = false;
var quizTemp4 = false;
var quizShow = false;
var chanceCount = 0;
var chromeAudio = false;
var currentSceneNumberarray = [];
var checkCount = 0;
// var quizCount = quizType.length //퀴즈 개수 퀴즈없으면 주석


/****************************/


// function fnProgressCheck(){
// 	if(parent.parent.cntStdyFncYn == 'N'){
// 		if(top.bolPorted){
// 			if(currentSceneNumber == totalPages){
// 				return true;
// 			}
// 			else{
// 				if(currentSceneNumber < parent.strMaxPage){
// 					return true;
// 				}
// 				else{
// 					return false;
// 				}
// 			}
// 		}
// 		else{
// 			return true;
// 		}
// 	}
// 	else{	// 모의학습 및 복습하기
// 		return true;
// 	}
// }

/****************************/

//
// var progressControll = 0;

function classEnd() {
	currentSceneNumberarray[currentSceneNumber - 1] = 1
	$(".next").addClass("end");
	if(currentSceneNumber == totalSceneNumber) {
		setTimeout(() => {
			$("#pageresult").show()
		}, 2500);
	}
}

function chooseAnswer(e) {
	var title = $(e).parent().parent().children(".title_text").text();
	var realAnswer = $(e).parent().children(".correct").children("span").text();
	var choosenOne = $(e).children("span").text();
	console.log("title : " + title)
	console.log("RealAnswer : " + realAnswer)
	console.log("choosenOne : " + choosenOne)
	if ($(e).hasClass("correct")) {
		classEnd();
		$(e).children(".check").attr("src", "./common/css/img/contents/yes_check.png");
		$(e).css("pointer-events", "none");
		$(e).siblings("li").css("pointer-events", "none");
		$("#resultgif01").show();
		playSound("s_true")

		$(e).siblings("li").css("opacity", "0.5") // 정답 제외 투명하게
		$(e).css("opacity", "1") // 정답만 밝게(반드시 정답이 아래로 오게 위치 주의!)


		setTimeout(function () {
			$("#resultgif01").fadeOut(300);
		}, 2000);
		if (top.bolPorted) {//포팅 되었을 때
			top.opener.playerChk.contsState(title, realAnswer, "선택형", choosenOne, 100, (chanceCount + 1))
			top.opener.playerChk.setPoint('LFC01', 1)
			top.opener.playerChk.setPoint('LFC02', 1)
			setCoin()
		}
	} else {
		if (chanceCount == 0) {
			if (top.bolPorted) {//포팅 되었을 때
				top.opener.playerChk.contsState(title, realAnswer, "선택형", choosenOne, 0, (chanceCount + 1))
			}
			chanceCount++
			$("#chance01").show();
			playSound("s_false")
			$(e).css("pointer-events", "none");
			$(e).siblings("li").css("pointer-events", "none");
			$(e).children(".check").attr("src", "./common/css/img/contents/yes_check.png");
			setTimeout(function () {
				$("#chance01").fadeOut(300);
				$(e).css("pointer-events", "auto");
				$(e).siblings("li").css("pointer-events", "auto");
				$(e).children(".check").attr("src", "./common/css/img/contents/no_check.png");
			}, 2000);
		}else{
			$("#resultgif02").show();
        	$(e).children(".check").attr("src", "./common/css/img/contents/yes_check.png");
			$(e).css("pointer-events", "none");
			$(e).siblings("li").css("pointer-events", "none");
        	playSound("s_false");

			$(e).siblings("li").css("opacity", "0.5") // 정답 제외 투명하게
			$(e).css("opacity", "0.5") // 정답 제외 투명하게
			$(e).siblings(".correct").css("opacity", "1") // 정답만 밝게(반드시 정답이 아래로 오게 위치 주의!)

			setTimeout(function(){
				$("#resultgif02").fadeOut(300);
			},2000)
			classEnd();
			if(top.bolPorted){//포팅 되었을 때
				top.opener.playerChk.contsState(title, realAnswer, "선택형", choosenOne, 0, (chanceCount + 1))
			}
		}
	}
}

function setBottom() {
	var footerStr = '';
	footerStr += '<div class="scriptView"><div class="script_inner"></div></div> ';
	footerStr += '<div class="footer_inner"> ';
	footerStr += '		<p class="full tab over" title="전체화면" alt="전체화면" tabindex="26" ></p> ';
	footerStr += '		<p class="fullexit tab over" title="전체화면끄기" alt="전체화면끄기" tabindex="27" ></p> ';
	footerStr += '<div class="controlLap"></div>';
	footerStr += '	<div class="control"> ';
	footerStr += '		<div class="time"> ';//시간
	footerStr += '			<ul class="cf"> ';
	footerStr += '				<li class="time_cur"> 00:00 </li> ';
	footerStr += '				<li> &nbsp;| &nbsp; </li>';
	footerStr += '				<li class="time_tol"> 00:00 </li> ';
	footerStr += '			</ul> ';
	footerStr += '		</div> ';
	footerStr += '		<div class="slide trans"> <div class="timeWarpBox"></div>';//슬라이드 바
	footerStr += '			<div class="slide_inner"> ';
	footerStr += '				<p class="slide_bg" id="slide_bg"><span class="slide_current"></span></p> ';
	footerStr += '			</div> ';
	footerStr += '		</div> ';
	footerStr += '		<p class="play tab over" title="재생"  alt="재생" tabindex="21" ></p> ';
	footerStr += '		<p class="pause tab over" title="일시정지" alt="일시정지" tabindex="22" ></p> ';
	footerStr += '		<p class="replay tab over" title="다시보기" alt="다시보기" tabindex="23" ></p> ';
	footerStr += '		<p class="script tab over" title="자막" alt="자막" tabindex="24"  ></p> ';
	footerStr += '		<p class="sound_btn tab over" title="소리끄기" alt="소리끄기"  tabindex="25" ></p> ';

	footerStr += '<div id="volumControl">'
	footerStr += '<div id="positionV"></div>'	
	footerStr += '<div class="progress">'
	footerStr += '<div class="seekBtn"></div>'
	footerStr += '<div class="seekBar"></div>'
	footerStr += '</div>'
	footerStr += '</div>'

	footerStr += '		<div class="speed select trans tab" title="배속선택" alt="배속선택" tabindex="28"> ';//배속
	footerStr += '			<ul> ';
	footerStr += '				<li class="curRate">X 1.0</li> ';
	footerStr += '			</ul>';
	footerStr += '			<div class  = "speed choice">';
	footerStr += '				<div class= "tab magni choice1" tabindex="29">X 0.5</div>';
	footerStr += '				<div class= "tab magni choice2" tabindex="29">X 0.8</div>';
	footerStr += '				<div class= "tab magni choice3 on" tabindex="29">X 1.0</div>';
	footerStr += '				<div class= "tab magni choice4" tabindex="29">X 1.5</div>';
	footerStr += '				<div class= "tab magni choice5" tabindex="29">X 2.0</div>';
	footerStr += '			</div>';
	footerStr += '		</div> ';


	footerStr += '		<p class="close_btn tab over" title="닫기" alt="닫기"  tabindex="12" ></p> ';
	footerStr += '	</div> ';//end control
	footerStr += '		<div class="paging"> ';
	footerStr += '			<ul> ';

	footerStr += '				<li class="pre tab over"  title="이전페이지" alt="이전페이지"  tabindex="30"></li> ';
	footerStr += '				<li class="page_current">1</li> ';
	footerStr += '				<li class="dash"></li> ';
	footerStr += '				<li class="page_total">1</li> ';
	footerStr += '				<li class="next tab over"  title="다음페이지" alt="다음페이지"  tabindex="31"></li> ';

	footerStr += '			</ul> ';
	footerStr += '		</div> ';
	footerStr += '	<div class="next_tooltip"></div> ';
	footerStr += '</div> ';

	$("#fs-footer").append(footerStr);

	setScript();

    /** 메인 컨텐츠 || 비디오 장착**/
	if (pageArray[currentSceneNumber][1] == "V3") {
		contentstart()
		$('.control').css('display','none')
		$('#fs-index').css('display','block')
	} else if (pageArray[currentSceneNumber][1] == "V1") {
		writeMedia(".mp4")
		$('.control').css('display','block')
		$('#fs-index').css('display','none')
	} else{
		writeMedia(".mp3")
		$('.control').css('display','block')
		$('#fs-index').css('display','none')
	}

	bottomEvent();
}

function bottomTimeWarp() {
	try {
		// 페이지 시간 없을 때 처리
		if (warpTimeData[Number(currentSceneNumber)].length == 0) {
			return;
		}
	} catch (e) {
		return;
	}
	var timeWarpBoxElem = document.getElementsByClassName('timeWarpBox')[0];
	for (var warpNum = 0; warpNum < warpTimeData[Number(currentSceneNumber)].length; warpNum++) {
		var dot = document.createElement('span');
		var titleTxtBox = document.createElement('span');
		var titleTxt = document.createElement('span');
		dot.className = "warpDot";
		dot.style.left = ($(".slide_bg").width() * (warpTimeData[Number(currentSceneNumber)][warpNum].time / Player.duration) + "px")
		if (warpTimeData[Number(currentSceneNumber)][warpNum].hasOwnProperty('left')) {
			titleTxtBox.className = "titltTxtBox custom";
			titleTxtBox.style.left = warpTimeData[Number(curChasi)][warpNum].left + "px";
		} else {
			titleTxtBox.className = "titltTxtBox";
		}
		titleTxt.className = "titltTxt";
		titleTxt.innerHTML = warpTimeData[Number(currentSceneNumber)][warpNum].title
		titleTxtBox.appendChild(titleTxt)
		dot.appendChild(titleTxtBox)
		$(dot).attr('dotTime', warpTimeData[Number(currentSceneNumber)][warpNum].time)
		console.log(timeWarpBoxElem)
		timeWarpBoxElem.appendChild(dot)
	}

	$('.warpDot').on('click', function () {
		setPause()
		Player.currentTime = $(this).attr('dotTime')
		setPlay()
	})
}

function magnievent(speed){
	var speed_text = speed.text().split('X')[1];
	$('.magni').removeClass('on').css({ 'color': '#A2A2A2' });
	$(speed).addClass('on').css({ 'color': '#19d1ff' });;

	$('.choice').hide();
	$('.curRate').html('X' + speed_text);
	Player.playbackRate = Number(speed_text);
}

var ecoThisPage = 1;
//하단 컨트롤러 이벤트
function bottomEvent() {
	$('.curRate').on("click", function () {
		if ($('.choice').css('display') == 'none') {
			$('.choice').css({ 'display': 'block' });
		}
		else {
			$('.choice').css({ 'display': 'none' });
		}
	})

	$('.magni').hover(function () {
		$(this).css({ 'color': '#19d1ff' });
	}, function () {
		if (!$(this).hasClass('on')) {
			$(this).css({ 'color': '#A2A2A2' });
		}
	});

	$('.magni').on("click", function () {
		magnievent($(this));
	})

	$('.option').hover(function(){
		$('.optionTooltip').show()
	}, function(){
		$('.optionTooltip').hide()
	})


	$("#learningClose").on("click", function () {
		if (!(Player.currentTime >= Player.duration)) {
			setPlay();
		}
		$('#learningMap').fadeOut();
	})
	$(".map").on("click", function () {
		setPause();
		$('#learningMap').fadeIn();
	})
	$("#ecoClose").on("click", function () {
		$('#ecoMap').fadeOut();
	})
	$(".gudieBtn").on("click", function () {
		$('#ecoMap').fadeIn();
	})
	$(".ecoPrevBtn").on("click", function () {
		if (ecoThisPage == 1) {
			return
		}
		ecoThisPage -= 1
		$('.ecoPrevBtn').show()
		$('.ecoNextBtn').show()
		if (ecoThisPage == 1) {
			$('.ecoPrevBtn').hide()
		}
		$("#ecoImg").attr('src', './common/css/img/learningmap/ee00' + itostr(ecoThisPage) + '.png')
		$("#ecopageInfo").html(ecoThisPage + " / 3")
	})
	$(".ecoNextBtn").on("click", function () {
		if (ecoThisPage == 3) {
			return;
		}
		ecoThisPage += 1
		$('.ecoPrevBtn').show()
		$('.ecoNextBtn').show()
		if (ecoThisPage == 3) {
			$('.ecoNextBtn').hide()
		}
		$("#ecoImg").attr('src', './common/css/img/learningmap/ee00' + itostr(ecoThisPage) + '.png')
		$("#ecopageInfo").html(ecoThisPage + " / 3")
	})
	$("#fs-footer .note").on("click", handleNoteClick);
	$("#fs-footer .help").on("click", handleGuideClick);
	$("#fs-footer .play").on("click", handlePlayClick);
	$("#fs-footer .pause").on("click", handlePauseClick);
	$("#fs-footer .replay").on("click", handleReplayClick);
	$("#fs-footer .full").on("click", nmr_fullScreenOnFn);
	$("#fs-footer .fullexit").on("click", nmr_fullScreenOffFn);
	$("#fs-footer .sound_btn").on("click", function () {
		if (volume == 0) {
			nmr_setVolumeFn(1)
		} else {
			nmr_setVolumeFn(0)
		}
	});

$("#fs-footer .next").on("click", function(){
		$(".langSelectBox").css({"display":"none"})
		$("#resultgif01").css({"display":"none"})
		$("#resultgif02").css({"display":"none"})
		$("#chance01").css({"display":"none"})
		$("#chance02").css({"display":"none"})
		$("#chance03").css({"display":"none"})
		
	});

	$("#fs-footer .script").on("click", handleScriptClick);

	$("#fs-footer .speed .low").on("click", handleSpeedLowClick);
	$("#fs-footer .speed .high").on("click", handleSpeedHighClick);

	$("#fs-footer .picture span").on("click", handlePictureClick);
	
	$("#fs-footer .pre").on("click", handlePrevClick);
	$("#fs-footer .pre").on("click", function(){
		$(".langSelectBox").css({"display":"none"})
	});
	$("#fs-footer .next").on("click", handleNextClick);
	$("#fs-footer .next").on("click", function(){
		$(".langSelectBox").css({"display":"none"})
		
	});
	$("#fs-footer .close_btn").on("click", handleCloseClick);
	$('#fs-footer .control').mouseover(function() {
		$('.control').css('opacity', '1');
	})
	$('#fs-footer .control').mouseover(function() {
		$('.control').css('opacity', '1');
	})
	$('#fs-footer .control').mouseout(function() {
		$('.control').css('opacity', '0');
	})

	$(".speakerbtn").on("click", function(){
		if(speakerbtntoggle == 0){
			playSound(isActivityIntroSound)
		}else if(speakerbtntoggle == 1){
		if(langNo == 2){
			playSound(isActivityIntroSound2)
		}else if(langNo == 3){
			playSound(isActivityIntroSound3)
		}else if(langNo == 4){
			playSound(isActivityIntroSound4)
		}else if(langNo == 5){
			playSound(isActivityIntroSound5)
		}else if(langNo == 6){
			playSound(isActivityIntroSound6)
		}
	}
	})

	//팝업창 보기/닫기
	$(".popup_btn").click(function(){
        $(".popup_wrap").css("display","block");
    });

    $(".popupclose_btn").click(function(){
        $(".popup_wrap").css("display","none");
    });

	//스피커
	$("#contents01 .listen").click(function(){
		playSound("el_2_01_01_m14_01_04")
    });

		setTimeout(function(){
		playSound2("next_m");
	})
	
	setTimeout(function() {
		$("#loop").remove();
		playSound2("indie_loop")
	},500);  

	$("#fs-footer .control .pre").on("click", setTimeout);
	$("#fs-footer .control .next").on("click", setTimeout);

	$("#fs-footer .control .preM").on("click", handlePrevClick);
	$("#fs-footer .control .nextM").on("click", handleNextClick);

	$("#fs-footer .page_current").text(itostr(currentSceneNumber));
	$("#fs-footer .page_total").text(itostr(curTol));

	$('.control .tab').on('keypress', function (e) {
		if (e.which == 13) {//여기
			switch (Number($(this).attr("tabindex"))) {
				case 1: indexBookmarkToggle();//인덱스 열기
					break;
				case 2: indexBookmarkToggle();//인덱스 닫기
					break;
				case 20 : window.open('./common/down/' + itostr(curChasi) + '.zip');
					break;
				case 21: handlePlayClick();//재생
					break;
				case 22: handlePauseClick();//일시정지
					break;
				case 23: handleReplayClick();//다시 재생
					break;
				case 24: handleScriptClick();//자막
					break;
				case 25: handleSoundClick();//사운드 on/off
					break;
				case 26: nmr_fullScreenOnFn();//전체화면
					break;
				case 27: nmr_fullScreenOffFn();//전체화면 끄기
					break;
				case 28 : $('.choice').css('display') == 'none' ? $('.choice').css({ 'display': 'block' }) : $('.choice').css({ 'display': 'none' });
					break;
				case 29 : magnievent($(this));//배속
					break;
				case 30: handlePrevClick();//이전 페이지 이동
					break;
				case 31: handleNextClick();//다음페이지 이동
					break;
			}
		}
	});

	$(".over").on("mouseover", { state: "u" }, HandlechangeBg);
	$(".over").on("mouseout", { state: "d" }, HandlechangeBg);

	function HandlechangeBg(e) {
		var state = e.data.state;
		var thisBg = $(this).css("background-image");
		thisBg = thisBg.substr(0, thisBg.length - 8);
		$(this).css("background-image", thisBg + '_' + state + '.png")')
	}

	if (isMobilePlatform()) {
		// $(".paging").css("right", "120px");
		// $("#fs-footer .next_tooltip").css("right", "125px");
		volume = 1;
	}
}


//비디오 or 오디오 셋팅
function contentstart() {

	//학습 도우미
	$("#fs-content").append('<div id="content">'
/* 0328 */
+ '<div id="pageresultbox">'
+ '		<img id="pageresult" src="./common/css/img/contents/pageresult.gif"/>'
+ '</div>'
+ '<div id="resultgif01box">'
+ '		<img id="resultgif01" src="./common/css/img/contents/answer.gif"/>'
+ '		<img id="resultgif02" src="./common/css/img/contents/wrong.gif"/>'
+ '		<img id="chance01" src="./common/css/img/contents/chance01.gif"/>'
+ '		<img id="chance02" src="./common/css/img/contents/chance02.gif"/>'
+ '</div>'

		+ '<img class="backgroundmotion1" src="./common/css/img/pop/backgroundmotion1.png" title="비행기" alt="비행기">'
+ '<img class="backgroundmotion2" src="./common/css/img/pop/backgroundmotion2.png" title="에듀벌룬" alt="에듀벌룬">'
+ '<img class="backgroundmotion3" src="./common/css/img/pop/backgroundmotion3.png" title="지구본" alt="지구본">'
	+ '<div id="contents_box">'

	+ 	'<div id="contents01" class="sceneLayer left1">'
	+ 		'<span class="title_text" title="요즘 날씨가 어때요?">요즘 날씨가 어때요?</span>'
	// + 		'<img class="artwork" src="./common/css/img/contents/artwork.png" title="내용" alt="내용">'
	+ 			'<ul class="selectBox">'
	+ 				'<li class="selectList01 correct" onclick="chooseAnswer(this)">'
	+ 		'			<img class="illust01 illust" src="./common/css/img/contents/1.png">'
	+ 		'			<img class="check01 check" src="./common/css/img/contents/no_check.png" title="체크박스" alt="체크박스">'
	+		'			<span style="display: none">1</span>'
	+ 				'</li>'
	+ 				'<li class="selectList02" onclick="chooseAnswer(this)">'
	+ 		'			<img class="illust02 illust" src="./common/css/img/contents/2.png">'
	+ 		'			<img class="check02 check" src="./common/css/img/contents/no_check.png" title="체크박스" alt="체크박스">'
	+		'			<span style="display: none">2</span>'
	+ 				'</li>'
	+ 				'<li class="selectList03" onclick="chooseAnswer(this)">'
	+ 		'			<img class="illust03 illust" src="./common/css/img/contents/3.png">'
	+ 		'			<img class="check03 check" src="./common/css/img/contents/no_check.png" title="체크박스" alt="체크박스">'
	+		'			<span style="display: none">3</span>'
	+ 				'</li>'
	+ 				'<li class="selectList04" onclick="chooseAnswer(this)">'
	+ 		'			<img class="illust04 illust" src="./common/css/img/contents/4.png">'
	+ 		'			<img class="check04 check" src="./common/css/img/contents/no_check.png" title="체크박스" alt="체크박스">'
	+		'			<span style="display: none">4</span>'
	+ 				'</li>'
	+ 			'</ul>'
	+ '</div>'


	+ '</div>'
	)

	//인덱스 버튼에 설명 추가
	$(".speakerbtn").attr("alt","다시듣기 버튼");
	$(".speakerbtn").attr("title","다시듣기 버튼");
	$(".langs").attr("alt","번역 버튼");
	$(".langs").attr("title","번역 버튼");

	totalSceneNumber = $(".sceneLayer").length;
	console.log("totalSceneNumber = "+totalSceneNumber);
	sceneAreaObject = $("#contents_box");
	sceneAreaObject.addClass("just left1");

	// miniplayer 영상 재생
	$("#miniPlayerBtn").on("click", function () {
		document.querySelector("#miniPlayerBtn").style.opacity=0;
		$("#miniPlayer").get(0).play();
	})
	$("#miniPlayerBtn2").on("click", function () {
		document.querySelector("#miniPlayerBtn2").style.opacity=0;
		$("#miniPlayer2").get(0).play();
	})

	$("#ecoMap").append('<span id="ecoClose"/>')
	$("#ecoMap").append('<div id="ecopageInfo">1 / 3</div>')

	//러닝맵 버튼들
	$("#fs-content").append('<div id="learningMap"/>')
	$("#learningMap").append('<span id="learningClose"/>')
	$("#learningMap").append('<span id="learningTitles"/>')
	$("#learningMap").append('<span id="learningTitleBg"/>')
	var defultTop = 250;
	var defultLeft = 340;
	var nextTop = 52.5;

	$("#learningTitleBg").css('top', defultTop + ((curChasi - 1) * nextTop))
	$("#learningTitleBg").css('left', defultLeft)


$("#fs-content").append('<div id="learningBtns"/>')

/*유형별 액션 스타트*/
_doActivityInit();

function _doActivityInit(){
	//isActivityIntroSoundd
	writeEffectAudio();
	console.log(currentSceneNumber+" / isActivityIntroSound = "+isActivityIntroSound);
	if(currentSceneNumber==1){
		playSound(isActivityIntroSound);	
	}
}

}
function writeMedia(obj) {
	if (pageArray[currentSceneNumber][1] == "V3") {
		$("#fs-content").append('	<audio id="MPlayer"/> ');
	} else {
		$("#fs-content").append('	<div id="mediaObj" />	');
		if (currentSceneNumber == videoPage) {
				$("#mediaObj").append('	<div id="darkGudie" />	');
				$("#mediaObj").append('	<div id="videoCon" />	');
				$("#videoCon").append('	<video id="MPlayer" contextmenu="false" playsinline webkitplaysinline/> ');
		} else {
				$("#mediaObj").append('	<video id="MPlayer" contextmenu="false" playsinline webkitplaysinline/> ');
		}
	}
	try {
		// 210716 수정
		if (currentSceneNumber == introQuizPage) {
			try {
				if (drag) {
					pathMp4 = vodPath + itostr(curChasi) + "_" + itostr(currentSceneNumber) + ".mp4";
				} else {
					pathMp4 = vodPath + itostr(curChasi) + "_" + itostr(currentSceneNumber) + ".mp4";
				}
			} catch (e) {
				pathMp4 = './common/sound/introQuiz.mp3';
			}
		}else if(currentSceneNumber == quizPage){
			pathMp4 = './common/sound/quiz.mp3';
		}else if(currentSceneNumber == introQuizPage){
			pathMp4 = './common/sound/introQuiz.mp3';
		}else{
			if(top.bolPorted){
				pathMp4 = vodPath + itostr(curChasi) + "_" + itostr(currentSceneNumber) + ".mp3";
			}
			else{
				pathMp4 = vodPath + itostr(curChasi) + "_" + itostr(currentSceneNumber) + ".mp3";
			}
		}
	} catch (e) {

	}
	Player = document.getElementById("MPlayer");
	Player.controls = false;
	// Player.src = pathMp4;
	Player.volume = volume;
	Player.addEventListener('error', function () {
		Player.src = vodPath + 'error.mp4'
	});
	soundBarW = $('.sound_bar_bg').width();
	if (document.cookie.indexOf("volume") == -1) {
		console.log("쿠키 없음")
		Player.volume = volume;
		$('.sound_bar').css("width", volume * soundBarW);
	} else {
		Player.volume = getCookie('volume');
		//	console.log("쿠키 있음");
		//	console.log(document.cookie);
		getCookie('volume');
		$('.sound_bar').css("width", getCookie('volume') * soundBarW);
	}

	commonControl();

	getCookie('volume');

	if(currentSceneNumber != quizPage && currentSceneNumber != introQuizPage){
		if(top.bolPorted){
			Player.src = pathMp4;
		}
		else{
			Player.src = pathMp4;
		}
	}
	else{
		Player.src = pathMp4;
	}
	
}
//슬라이더 드래그 이벤트 
function sliderEvent() {
	if (videoPage == currentSceneNumber) {

		$(".slide_inner_video").on("mouseup", sliderGo);
		$(".slide_inner_video").on("mouseleave", sliderGo);

		$(".slide_inner_video").on("mousedown", function (e) {//무브 true로

				_rect = _slide_bg.getBoundingClientRect();
				_dragX = _rect.left;//슬라이더 시작점
				_dragWidth = _rect.left + _rect.width;//슬라이더 끝점
				slideDownFlag = true;//드래그 가능성 있음	

				console.log('e.clientX' + e.clientX)
				console.log('_rect.left' + _rect.left)

				slideDownFlag = true;//드래그 가능성 있음	
				var cX = e.clientX;
				var slideX = e.clientX - _dragX;//슬라이더 상에 마우스 x값
				var _dragPerc = slideX / (_rect.width);
				var seekto = Player.duration * _dragPerc;//현재 시간
				setPause();//일시정지

				if (cX < _dragX) {
					seekto = 0;
				} else if (cX > _dragWidth) {
					seekto = Player.duration;//마지막시간으로 보내기

				} else {
					slideX = e.clientX - _dragX;//슬라이더 상에 마우스 x값
					_dragPerc = slideX / (_rect.width);
					seekto = Player.duration * _dragPerc;//현재 시간

				}
				Player.currentTime = seekto;//재생할 시간으로 보내서
		});

		$(".slide_inner_video").on("mousemove", function (e) {//무브 잡기

			if (slideDownFlag) {
				setPause();//정지
				var cX = e.clientX;//마우스 위치값
				var slideX = cX - _dragX;//슬라이더 상에 마우스 x값 _drage = 슬라이더 left좌표값
				var _dragPerc = slideX / (_rect.width);//슬라이더 너비값
				var seekto = Player.duration * _dragPerc;//현재 시간

				if (cX < _dragX) {
					seekto = 0;
					//	setPlay();//재생
				} else if (cX > _dragWidth) {
					seekto = Player.duration;//마지막시간으로 보내기
				} else {
					//	setPlay();//재생
				}
				Player.currentTime = seekto;//재생할 시간으로 보내서

			}

		});
	} else {
		$(".slide_inner").on("mouseup", sliderGo);
		$(".slide_inner").on("mouseleave", sliderGo);

		$(".slide_inner").on("mousedown", function (e) {//무브 true로 

				_rect = _slide_bg.getBoundingClientRect();
				_dragX = _rect.left;//슬라이더 시작점
				_dragWidth = _rect.left + _rect.width;//슬라이더 끝점
				slideDownFlag = true;//드래그 가능성 있음	

				console.log('e.clientX' + e.clientX)
				console.log('_rect.left' + _rect.left)

				slideDownFlag = true;//드래그 가능성 있음	
				var cX = e.clientX;
				var slideX = e.clientX - _dragX;//슬라이더 상에 마우스 x값
				var _dragPerc = slideX / (_rect.width);
				var seekto = Player.duration * _dragPerc;//현재 시간
				setPause();//일시정지

				if (cX < _dragX) {
					seekto = 0;
				} else if (cX > _dragWidth) {
					seekto = Player.duration;//마지막시간으로 보내기

				} else {
					slideX = e.clientX - _dragX;//슬라이더 상에 마우스 x값
					_dragPerc = slideX / (_rect.width);
					seekto = Player.duration * _dragPerc;//현재 시간

				}
				Player.currentTime = seekto;//재생할 시간으로 보내서
			
		});

		$(".slide_inner").on("mousemove", function (e) {//무브 잡기

			if (slideDownFlag) {
				setPause();//정지
				var cX = e.clientX;//마우스 위치값
				var slideX = cX - _dragX;//슬라이더 상에 마우스 x값 _drage = 슬라이더 left좌표값
				var _dragPerc = slideX / (_rect.width);//슬라이더 너비값
				var seekto = Player.duration * _dragPerc;//현재 시간

				if (cX < _dragX) {
					seekto = 0;
					//	setPlay();//재생
				} else if (cX > _dragWidth) {
					seekto = Player.duration;//마지막시간으로 보내기
				} else {
					//	setPlay();//재생
				}
				Player.currentTime = seekto;//재생할 시간으로 보내서

			}

		});
	}




	// 




}
function sliderGo(e) {
	var cX = e.clientX;
	var slideX = e.clientX - _dragX;//슬라이더 상에 마우스 x값
	var _dragPerc = slideX / (_rect.width);
	var seekto = Player.duration * _dragPerc;//현재 시간

	if (slideDownFlag) {//일단 슬라이드에 마우스 누르는중
		if (cX < _dragX) {
			seekto = 0;
			Player.currentTime = seekto;//재생할 시간으로 보내서
			setPlay();//재생
		} else if (cX > _dragWidth) {
			seekto = Player.duration;//마지막시간으로 보내기
			Player.currentTime = seekto;//재생할 시간으로 보내서
			setPause()
		} else {
			slideX = e.clientX - _dragX;//슬라이더 상에 마우스 x값
			_dragPerc = slideX / (_rect.width);
			seekto = Player.duration * _dragPerc;//현재 시간
			Player.currentTime = seekto;//재생할 시간으로 보내서
			setPlay();//재생
		}

	}
	slideDownFlag = false;//드래그 끝
}
function commonControl() {
	if (videoPage == currentSceneNumber) {
		_slide_bg = document.getElementById("slide_bg_video");
	} else {
		_slide_bg = document.getElementById("slide_bg");
	}
	if (!isMobilePlatform()) {
		_sound_bar = document.getElementById("sound_bar");
	}

	nmr_volumeInitFn();
	var _interval = window.setInterval(function () {
		if (_slide_bg == null) {
			_slide_bg = document.getElementById("slide_bg_video");
		}
		if (Player.readyState > 0) {//비디오 들어왔을때
			bottomTimeWarp();
			if (!isMobilePlatform()) {
				// _sound_bar.addEventListener("mousedown", volSeek, false);//사운드
			}

			Player.addEventListener("timeupdate", seekTimeUpdate, false);//비디오 시간체크
			_rect = _slide_bg.getBoundingClientRect();
			_dragX = _rect.left;//슬라이더 시작점
			_dragWidth = _rect.left + _rect.width;//슬라이더 끝점
			slideDownFlag = false;
			sliderEvent();

			clearInterval(_interval);
			videoChk = true;
			setPause()
		} else {
			console.log("loading!!!");
		}
	}, 200);

}

/** 러닝맵 클릭 **/
function handleMapClick(e) {

}

/** 강의 자료 다운 클릭 **/
function handleNoteClick(e) {
	alert("강의 노트")
	//	var fileName = ".././common/down/note.zip";
	//	window.open(fileName);
}

/** 학습도우미 클릭 **/
function handleGuideClick() {
	//protoAlt();
	//return;
	window.open("../ot/ot.html", "", "width=900, height=506")
}

/** play 클릭 **/
function handlePlayClick(e) {
	playPause()
	// setPlay();
}

/** pause 클릭 **/
function handlePauseClick(e) {
	playPause()
	// setPause();
}

/** 리플레이 클릭 **/
function handleReplayClick(e) {
	Player.currentTime = 0;
	replayBtn()

	if(currentSceneNumber == quizPage) {
		$("#pageContent").hide();
		reQuizStart();
	} else {
	}
}

/** 스크립트 셋팅 **/
function setScript() {

	if (scriptArr[currentSceneNumber][0] == "") {
		$(".script_inner").append('<span>자막을 지원하지 않는 페이지입니다.</span>');
	} else if (scriptArr[currentSceneNumber] == "srt") {
		loadSRT();
	} else {
		try {
			for (var i = 0; i < scriptArr[currentSceneNumber].length; i++) {
				$(".script_inner").append('<span>' + scriptArr[currentSceneNumber][i].replace('★', " : ") + '</span>');
			}
		} catch (e) {

		}
	}
}

/** 스크립트 클릭 **/
function handleScriptClick(e) {		
	if (enableScript) {
		if (!scriptFlag) {
			$(".scriptView").show();
			$(".scriptView").stop().animate({
				"top": "-50px"
			}, 600);
			// scriptFlag = true
		}else {
			$(".scriptView").stop().animate({
				"top": "50px"
			}, 600)
			// $(".scriptView").hide();
		}
		scriptFlag = !scriptFlag;
	}
}

var rate = 1;
var rateArr = [0.5, 0.8, 1.0, 1.5, 2.0];
var rateArrText = ["x0.5", "x0.8", "x1.0", "x1.5", "x2.0"];
var rateFlag = false;

/**  배속 왼쪽 버튼 클릭**/
function handleSpeedLowClick() {
	if (rateFlag == false) {
		if (rate > 0) {
			rate--;
		}
		if (rate == 0) {
			rate = 0;
			rateFlag = true;
		}
		$(".curRate").text(rateArrText[rate]);
		fnRate(rate);
	} else {
		if (rate >= 0 || rate <= 4) {
			rateFlag = false;
		}
	}
}
/**  배속 오른쪽 버튼 클릭**/
function handleSpeedHighClick() {

	if (rateFlag == false) {
		if (rate < 4) {
			rate++;
		} else {
			rate = 4;
			rateFlag = true;
		}
		$(".curRate").text(rateArrText[rate]);
		fnRate(rate);
	} else {
		if (rate >= 0 || rate <= 4) {
			rateFlag = false;
		}
	}
}
// 배속 변경 
function fnRate(num) {
	try {
		Player.playbackRate = rateArr[num];
		rateNum = rateArr[num];
	} catch (e) {
		//console.log(e);
	}
}

/** 화질 선택 버튼 클릭  **/
function handlePictureClick() {
	if (!pictFlag) {
		$("#fs-footer .footer_inner .picture ul").append('<li>800k</li>');
		$("#fs-footer .footer_inner .picture ul").append('<li>1000k</li>');
		$("#fs-footer .footer_inner .picture ul").show();
		$("#fs-footer .footer_inner .picture span").css("color", "#D29364");
		pictFlag = true;
		$("#fs-footer .footer_inner .picture ul li").on("click", function () {
			fnReMov($(this).index());
			pictureNum = $(this).text();
			$("#fs-footer .footer_inner .picture ul").show();
			$("#fs-footer .footer_inner .picture ul").empty();
			$("#fs-footer .footer_inner .picture span").text(pictureNum);
			$("#fs-footer .footer_inner .picture span").css("color", "#999");
			$("#fs-footer .footer_inner .picture span").hover(function () {
				if (!PC_MODE) {
					$(this).css("color", "#D29364");
				}
			}, function () {
				$(this).css("color", "#999");
			});
			pictFlag = false;
		});
	} else if (pictFlag) {
		pictFlag = false;
		$("#fs-footer .footer_inner .picture ul").empty();
		$("#fs-footer .footer_inner .picture span").hover(function () {
			$(this).css("color", "#D29364");
		}, function () {
			$(this).css("color", "#999");
		});
		pictFlag = false;
	}
}
// 화질 변경
function fnReMov(num) {
	var removArr = ["800k", "1000k"];
	try {
		changeVod(removArr[num], Player.currentTime);
		rateNum = rateArr[num];
	} catch (e) {
		//console.log(e);
	}
}

function changeVod(_fileName, _time) {
	try {
		if (currentSceneNumber == introQuizPage) {
			if (drag) {
				pathMp4 = vodPath + "drag.mp4";
			} else {
				pathMp4 = vodPath + "introQuiz.mp4";
			}
		} else if (currentSceneNumber == quizPage) {
			pathMp4 = vodPath + "quiz.mp4";
		} else if (currentSceneNumber == organizePage) {
			pathMp4 = vodPath + "organize.mp4";
		} else if (currentSceneNumber == introgudiePage) {
			pathMp4 = vodPath + "introGudie.mp4";
		} else if (currentSceneNumber == goalPage) {
			pathMp4 = vodPath + "goal.mp4";
		} else {
			pathMp4 = vodPath + itostr(curChasi) + "_" + itostr(currentSceneNumber) + "_" + _fileName + ".mp4";
		}
	} catch (e) {

	}
	Player.src = pathMp4;
	//console.log("Player.src : "+Player.src);

	var _interval = window.setInterval(function () {
		if (Player.readyState >= 4) {
			Player.play();
			Player.currentTime = _time
			Player.playbackRate = rateNum;
			clearInterval(_interval);
		} else {
			//console.log("loading!!!");
		}
	}, 200);
}


/** 이전버튼 클릭 **/
function handlePrevClick() {
	var _targetUrl;
	if (currentSceneNumber != 1) {
		currentSceneNumber--;
		_targetUrl = itostr(currentSceneNumber) + '.html';
		if (!isLocal) {
			NextMove(_targetUrl)
			//studyProc(itostr(curChasi)+'_'+itostr(currentSceneNumber));
		} else {
			location = _targetUrl;
		}
	} else {
		alert("처음 페이지입니다.");
	}

}



/** 다음버튼 클릭 **/
function handleNextClick() {
	if (!isLocal) {
		if (progressControll == 0) {
			alert("학습 완료 후 이동 가능 합니다.");
			return;
		}
	}

	var _targetUrl;
	if (currentSceneNumber != curTol) {
		if (progressControll == 0) {
			alert("학습 완료 후 이동 가능 합니다.");
			return;
		}
		
		currentSceneNumber++;
		_targetUrl = itostr(currentSceneNumber) + '.html';
		//alert("_targetUrl: "+_targetUrl)
		//location= _targetUrl;
		NextMove(_targetUrl)
	} else {
		if (isLocal) {
			
			return;
		} else {
			if (curChasi < 45) {
				var targetChap = Number(curChasi) + 1;
				_targetUrl = itostr(targetChap) + '_' + itostr(1) + '.html';
				//				if(!isLocal){
				NextMove(_targetUrl)
				//				}
				//location= _targetUrl;			
			} else {
				
			}
		}
		/*}else{
			
		}*/

	}

}


// 전체화면 관련
var screenW;
var screenH;
var fullBtnClick = false;


// 전체화면 관련
function nmr_fullScreenOnFn() {
	$('.full').css({ 'display': 'none' });
	$('.fullexit').css({ 'display': 'block' });
	var fullScreenTarget;
	fullScreenTarget = document.getElementById("wrap");
	if (fullScreenTarget.requestFullscreen) {

		fullScreenTarget.requestFullscreen();
		fullBtnClick = true;
	} else if (fullScreenTarget.msRequestFullscreen) {
		fullScreenTarget.msRequestFullscreen();
		fullBtnClick = true;
		fullScreenTarget.style.width = '100%';
		fullScreenTarget.style.height = '100%';
		fullScreenTarget.style.top = '0%';
		fullScreenTarget.style.left = '0%';
		console.log(document.msFullscreenElement)
	} else if (fullScreenTarget.webkitRequestFullscreen) {
		fullScreenTarget.webkitRequestFullscreen();
		fullBtnClick = true;
	} else if (fullScreenTarget.webkitEnterFullScreen) {
		fullScreenTarget.webkitEnterFullScreen();
		fullBtnClick = true;
	} else if (fullScreenTarget.webkitRequestFullScreen) {
		fullScreenTarget.webkitRequestFullScreen();
		fullBtnClick = true;
	} else if (fullScreenTarget.mozRequestFullScreen) {
		alert("전체화면 기능을 지원하지 않는 브라우저입니다.");
		//fullScreenTarget.mozRequestFullScreen();
	} else {
		alert("전체화면 기능을 지원하지 않는 브라우저입니다.");
	}
}

function nmr_fullScreenOffFn() {
	$('.full').css({ 'display': 'none' });
	$('.fullexit').css({ 'display': 'block' });
	fullBtnClick = false;
	var fullScreenTarget = document;
	var videoTarget = document.getElementById("wrap");
	if (fullScreenTarget.exitFullscreen) {
		console.log("aaa")
		fullScreenTarget.exitFullscreen();
	} else if (fullScreenTarget.cancelFullScreen) {
		console.log("bbb")
		fullScreenTarget.cancelFullScreen();
	} else if (fullScreenTarget.webkitCancelFullScreen) {
		console.log("ccc")
		fullScreenTarget.webkitCancelFullScreen();
	} else if (fullScreenTarget.webkitExitFullscreen) {
		console.log("ddd")
		fullScreenTarget.webkitExitFullscreen();
	} else if (fullScreenTarget.msCancelFullScreen) {
		console.log("eee")
		fullScreenTarget.msCancelFullScreen();
	} else if (fullScreenTarget.msExitFullscreen) {
		console.log("fff")
		fullScreenTarget.msExitFullscreen();
	} else if (fullScreenTarget.mozCancelFullScreen) {
		console.log("ggg")
		fullScreenTarget.mozCancelFullScreen();
	} else {
		console.log("why!!!!!!!!!!!")
		//var wscript = new ActiveXObject("Wscript.shell");
		//wscript.SendKeys("{F11}");
	}
}


if (document.addEventListener) {
	document.addEventListener('webkitfullscreenchange', exitHandler, false);
	document.addEventListener('mozfullscreenchange', exitHandler, false);
	document.addEventListener('fullscreenchange', exitHandler, false);
	document.addEventListener('MSFullscreenChange', exitHandler, false);
}

var handlerNum;
function exitHandler() {
	if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
		handlerNum = 1;
	} else {
		fullBtnClick = false;
		responsive();
		$('.full').css({ 'display': 'block' });
		$('.fullexit').css({ 'display': 'none' });
		handlerNum = 2;
	}
}


//재생 일시정지 동시에 
function playPause() {
	if (Player.paused) {
		setPlay();
	} else {
		setPause();
	}
}


function setPause() {
	Player.pause();
	if (currentSceneNumber != videoPage) {
		$('.pause').hide();
		$('.play').show();
	}
	$('.vStop_btn').hide();
	$('.vPlay_btn').show();
}

function setPlay() {
	Player.play();
	if (currentSceneNumber != videoPage) {
		$('.play').hide();
		$('.pause').show();
	}
	$('.vPlay_btn').hide();
	$('.vStop_btn').show();
}

function replayBtn() {
	Player.currentTime = 0;
	setPause();
}



function nmr_setVolumeFn(num) {
	if (num == 0) {
		nmr_setVol(0);
		$(".sound_btn").css("background-image", "url(./common/css/img/footer/footer_sound_off_d.png)");

		$(".sound_btn").attr("alt", "소리켜기");
		$(".sound_btn").attr("title", "소리켜기")

	} else {
		if (volume == 0) {

			volume = 0.5;
		}
		nmr_setVol(num);
		$(".sound_btn").css("background-image", "url(./common/css/img/footer/footer_sound_on_d.png)");

		$(".sound_btn").attr("alt", "소리끄기");
		$(".sound_btn").attr("title", "소리끄기")
	}
}

// 볼륨 설정
function nmr_setVol(_value) {
	// console.log(value.toFixed(1))

	if (_value <= 0) {
		_value = 0;
	}
	else if (_value >= 1) {
		_value = 1;
	}
	else {
		// console.log(Number(value))
	}
	Player.volume = _value;
	volume = _value;


	if (_value < 0) {
		console.log("bbb")
		$(".sound_btn").css("background-image", "url(./common/css/img/footer/footer_sound_off_d.png)");
		$(this).attr("alt", "소리끄기");
		$(this).attr("title", "소리끄기")
		nmr_volumePositionFn(0);
		document.cookie = "volume=" + 0;
	} else {
		$(".sound_btn").css("background-image", "url(./common/css/img/footer/footer_sound_on_d.png)");
		$(this).attr("alt", "소리켜기");
		$(this).attr("title", "소리켜기")
		nmr_volumePositionFn(volume);
		document.cookie = "volume=" + volume;
	}
}


// 볼륨 설정
function nmr_setVol1(value) {
	Player.volume = value;
	tempVol = value;
	if (value == 0) {
		$(".sound_btn").css("background-image", "url(./common/css/img/footer/footer_sound_off_d.png)");
		$(this).attr("alt", "소리켜기");
		$(this).attr("title", "소리켜기")
		document.cookie = "volume=" + 0;
	} else {
		$(".sound_btn").css("background-image", "url(./common/css/img/footer/footer_sound_on_d.png)");
		$(this).attr("alt", "소리켜기");
		$(this).attr("title", "소리켜기")
		document.cookie = "volume=" + volume;
	}
}

// 볼륨 조절
var volMax;
var volxmin;
// function nmr_volumeInitFn() {
// 	if (document.cookie.indexOf("volume") != -1) {
// 		volume = getCookie("volume");
// 	}

// 	volMax = $('#volumControl .seekBtn').width();
// 	if (isMobilePlatform()) {
// 		nmr_setVol(volume);
// 	} else {
// 		nmr_setVol1(volume);
// 		volSpace = parseInt($('#positionV').css("width"));
// 		$('#volumControl #positionV').on('mousedown', function (e) {
// 			e.preventDefault();
// 			xmin = $('#volumControl .seekBtn').offset().left;
// 			volPos_width = $('#volumControl .seekBtn').width();
// 			xmax = xmin + volPos_width;
// 			var pos = (e.pageX - xmin) / volPos_width;
// 			if (pos > 0 && pos <= volPos_width) {
// 				volume = pos;
// 				nmr_setVolumeFn(volume);
// 			}
// 			$(document).on('mousemove', function (e) {
// 				e.preventDefault();
// 				//if(e.pageX-xmin >= 0 && (e.pageX-xmin) <= volPos_width){
// 				var pos = (e.pageX - xmin) / volPos_width;
// 				if (pos >= 1) {
// 					pos = 1;
// 				} else if (pos <= 0) {
// 					pos = 0;
// 				}
// 				$('#text1').html(pos);
// 				volume = pos;
// 				nmr_setVolumeFn(volume);
// 				//$('#volumControl #positionV').css("left",Math.round(volMax * vol - volSpace));
// 				if (volMax * num - volSpace >= 0) {
// 					$('#volumControl #positionV').css("left", volMax * num - volSpace);
// 				} else {
// 					$('#volumControl #positionV').css("left", 0);
// 				}
// 				//}
// 			})
// 			$(document).on('mouseup', function (e) {
// 				e.preventDefault();
// 				$(document).off();
// 			})
// 		});
// 		nmr_volumePositionFn(volume);
// 	}
// }

//0125 모바일 오류 수정
function nmr_volumeInitFn() {
	if (document.cookie.indexOf("volume") != -1) {
		volume = getCookie("volume");
	}

	volMax = $('#volumControl .seekBtn').width();
	nmr_setVol1(volume);
		volSpace = parseInt($('#positionV').css("width"));
		$('#volumControl #positionV').on('mousedown', function (e) {
			e.preventDefault();
			xmin = $('#volumControl .seekBtn').offset().left;
			volPos_width = $('#volumControl .seekBtn').width();
			xmax = xmin + volPos_width;
			var pos = (e.pageX - xmin) / volPos_width;
			if (pos > 0 && pos <= volPos_width) {
				volume = pos;
				nmr_setVolumeFn(volume);
			}
			$(document).on('mousemove', function (e) {
				e.preventDefault();
				//if(e.pageX-xmin >= 0 && (e.pageX-xmin) <= volPos_width){
				var pos = (e.pageX - xmin) / volPos_width;
				if (pos >= 1) {
					pos = 1;
				} else if (pos <= 0) {
					pos = 0;
				}
				$('#text1').html(pos);
				volume = pos;
				nmr_setVolumeFn(volume);
				//$('#volumControl #positionV').css("left",Math.round(volMax * vol - volSpace));
				if (volMax * num - volSpace >= 0) {
					$('#volumControl #positionV').css("left", volMax * num - volSpace);
				} else {
					$('#volumControl #positionV').css("left", 0);
				}
				//}
			})
			$(document).on('mouseup', function (e) {
				e.preventDefault();
				$(document).off();
			})
		});
		nmr_volumePositionFn(volume);
}
//0125 모바일 오류 수정

// 볼륨헤드 위치, 볼륨바 크기 조절
function nmr_volumePositionFn(num) {
	volSpace = parseInt($('#positionV').css("width"));
	var dragWidth = $("#volumControl .seekBtn").width();
	var curPos = dragWidth * num;
	if (curPos > dragWidth) {
		curPos = 0
	}
	$('#volumControl .seekBar').css("width", curPos);
	if (volMax * num - volSpace >= 0) {
		$('#volumControl #positionV').css("left", volMax * num - (volSpace - 6));
	} else {
		$('#volumControl #positionV').css("left", 0);
	}
}


var soundW;
/** 볼륨조절 **/
function volSeek(e) {
	var _dragX = $("#sound_bar").offset().left;
	var xx = (e.clientX - _dragX);
	soundBarW = $('.sound_bar_bg').width();
	soundW = $("#sound_bar").width();//현재 볼륨 너비

	if (xx < 3) {//음소거
		xx = 0;
		Player.muted = true;
		$(".sound_btn").css("background-image", "url(./common/css/img/footer/footer_sound_off_d.png)");
		$(this).attr("alt", "소리켜기");
		$(this).attr("title", "소리켜기");

		SoundFlag = true;
	} else {
		console.log("소리조절, 쿠키 저장")
		Player.muted = false;
		$(".sound_btn").css("background-image", "url(./common/css/img/footer/footer_sound_on_d.png)");
		$(this).attr("alt", "소리끄기");
		$(this).attr("title", "소리끄기");
		volume = xx / soundBarW;//0.xxxx  현재 너비//전체너비
		Player.volume = volume;
		document.cookie = "volume=" + volume;//쿠키에 저장
		SoundFlag = false;
	}

	$('.sound_bar').css("width", xx);

}

// 쿠키 가져오기
function getCookie(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if (start != -1) {
		start += cName.length;
		var end = cookieData.indexOf(';', start);
		if (end == -1) end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}
var SoundFlag = false;
/** 사운드 on,off **/
function handleSoundClick(e) {
	soundBarW = $('.sound_bar_bg').width();
	$(this).removeClass("over");
	if (!SoundFlag) {
		soundW = $("#sound_bar").width();
		$('.sound_bar').css("width", 0);
		Player.muted = true;
		$(".sound_btn").css("background-image", "url(./common/css/img/footer/footer_sound_off_d.png)");
		$(this).attr("alt", "소리켜기");
		$(this).attr("title", "소리켜기");

	} else {
		Player.muted = false;
		$(".sound_bar").width(soundW)
		$(".sound_btn").css("background-image", "url(./common/css/img/footer/footer_sound_on_d.png)");
		$(this).attr("alt", "소리끄기");
		$(this).attr("title", "소리끄기");

	}
	SoundFlag = !SoundFlag;
}

function handleCloseClick(e) {
	setPause();
	if (isMobilePlatform()) {
		window.location = "close://";
	} else {
		top.close();
	}
}

function HandlechangeBg(e) {
	var state = e.data.state;
	var thisBg = $(this).css("background-image");
	thisBg = thisBg.substr(0, thisBg.length - 8);
	$(this).css("background-image", thisBg + '_' + state + '.png")')
}
var endFlag = false;
var toolTipFlag = false;
var eventFlag = false;
var timeLimit = pageArray[currentSceneNumber][2];

/** 시간 표시 **/
function seekTimeUpdate() {
	if (!firstPlay) {
		// timea();
	}
	firstPlay = true;

	if (quizPage == currentSceneNumber) {
		if (Player.duration - 1 > Player.currentTime && quizStart) {
			quizStart = false;
			reQuizStart();
			$('#quizDiv').hide()
		} else {
		}
	}

	//var mov_curTime = document.getElementsByClassName("mov_curTime");
	//var mov_tolTime = document.getElementsByClassName("mov_tolTime");
	if (Player.duration) {
		percent = (Player.currentTime / Player.duration);
		var nt = Player.currentTime * (100 / Player.duration);
		var curmins = Math.floor(Player.currentTime / 60);
		var cursecs = Math.floor(Player.currentTime - curmins * 60);
		var durmins = Math.floor(Player.duration / 60);
		var dursecs = Math.floor(Player.duration - durmins * 60);
		if (cursecs < 10) { cursecs = "0" + cursecs; }
		if (dursecs < 10) { dursecs = "0" + dursecs; }
		if (curmins < 10) { curmins = "0" + curmins; }
		if (durmins < 10) { durmins = "0" + durmins; }

		$(".time .time_cur").text(curmins + ":" + cursecs);
		$(".time .time_tol").text(durmins + ":" + dursecs);

		parent.nTemp = parseInt(Player.duration);

		if (videoChk) {

			/** 슬라이드바 제어 **/
			if (videoPage == currentSceneNumber) {
				var xW = $(".slide_bg_video").width() * (Player.currentTime / Player.duration);
				$(".slide_current_video").css("width", xW);
			} else {
				var xW = ($(".slide_bg").width()) * (Player.currentTime / Player.duration);
				$(".slide_current").css("width", xW);
			}

			try {
				srtChange();
			} catch (e) {

			}

			//일단 영상 끝났는지 체크
			if (Player.currentTime >= Player.duration) {

				endFlag = true;
				setBalloon();//이래나 저래나 nexttooltip 나옴
			} else {
				endFlag = false;
				$(".next_tooltip").hide();
			}
			//html show 
			if (pageArray[currentSceneNumber][1] == "V3" || pageArray[currentSceneNumber][1] == "A") {
				if (Player.currentTime <= timeLimit) {
					$("#htmlShow").hide();
					//console.log(pageArray[currentSceneNumber][3])
					/** 이벤트 페이지 초기화 **/
					if (pageArray[currentSceneNumber][3] == "Check") {
						// quizInit();
					}
					if (pageArray[currentSceneNumber][3] == "Summary") {
						// initSummary();
					}
					if (pageArray[currentSceneNumber][3] == "Ot") {
						// otInit2();
					}
					endFlag = false;

					toolTipFlag = false;

					$(".next_tooltip").hide();

				} else {
					$("#htmlShow").show();
				}
			}

		}//end if(videoChk){

		if (Number(currentSceneNumberStr) == organizePage) {
			if (Player.currentTime > 14) {
				$("#pageContent").fadeIn()
			} else $("#pageContent").hide()
		}

	}
	if (Number(currentSceneNumberStr) == introQuizPage) {
		try {
			if (drag) {
				if (Player.currentTime > 3) {
					$('#pageContent').fadeIn()
					$('#quizDiv').fadeIn()
					$('.quizStartBtn').remove();
					$(".play").off();
					$(".pause").off();
				} else {
					$('#pageContent').hide()
					$('#quizDiv').hide()
					for (var w = 0; w < drdrWarp.length; w++) {
						document.getElementsByClassName('dragBox')[w].style.left = drdrWarp[w].left + 'px'
						document.getElementsByClassName('dragBox')[w].style.top = drdrWarp[w].top + 'px'
						document.getElementsByClassName('dragTarget' + (w + 1))[0].style.left = drdrTop[w].left + 'px'
						document.getElementsByClassName('dragTarget' + (w + 1))[0].style.top = drdrTop[w].top + 'px'
						fnDragReset();
					}
					toolTipFlag = false
					dragCheck = [];
				}
				// return
			}
		} catch (e) {

		}
		if (Player.currentTime >= 0.1 && chromeAudio == false) {
			//playSound('introquizSound');
			chromeAudio = true;
		}
		if (Player.currentTime >= 3 && quizTemp1 == false) {
			quizTemp1 = true;
			playPause();
		}
		if (Player.currentTime >= 5 && quizTemp2 == false) {
			quizTemp2 = true;
			playPause();
		}
		if (Player.currentTime >= 7 && quizTemp3 == false) {
			quizTemp3 = true;
			playPause();
		}
		if (quizStart) {
			return;
		}
		if (Player.currentTime > 3 && quizShow == false) {
			$('.quizStartBtn').fadeIn();
			$('#pageContent').fadeIn();
			$(".play").off();
			$(".pause").off();
		}
		// if (Player.currentTime > 1) { 

		// 	$('#pageContent').fadeIn();
		// } 
		// else{
		// 	$('#pageContent').hide();
		// }
		// if(Player.currentTime > 2){
		// 	$('.intro_img1').fadeIn();
		// }
		// else{
		// 	$('.intro_img1').hide();
		// }
		// if(Player.currentTime > 3){
		// 	$('.intro_img2').fadeIn();
		// }
		// else{
		// 	$('.intro_img2').hide();
		// }
		// if(Player.currentTime > 4){
		// 	$('.intro_img3').fadeIn();
		// }
		// else{
		// 	$('.intro_img3').hide();
		// }
		// if(Player.currentTime > 5){
		// 	$('.quizStartBtn').fadeIn();
		// }
		// else{
		// 	$('.quizStartBtn').hide();
		// }
	}

	if (Number(currentSceneNumberStr) == totalPages) {
		if (Player.currentTime > 3) {
			$('.out_img').fadeIn();
		}
		else {
			$('.out_img').hide();
		}
	}

	if (Number(currentSceneNumberStr) == 1) {
		if (Player.currentTime > 5) {
			$('.in_img').fadeIn();
		}
		else {
			$('.in_img').hide();
		}
	}

	// 바로시작
	if (currentSceneNumber == quizPage) {
		if(Player.currentTime >= Player.duration - 0.1){
			$('#pageContent').fadeIn();
		}
		// if (Player.currentTime < Player.duration - 0.3) {
		// 	quizStart = false
		// 	$('#pageContent').hide();
		// 	// $('.quizStartBtn').fadeOut();
		// 	//  $('#pageContent').show();
		// }
		// if (Player.currentTime >= Player.duration - 0.3 && Player.currentTime && !quizStart) {
		// 	$('#pageContent').fadeIn();
		// }
	}
	// 바로시작 끝

}//end if(Player.duration){

/** 다음페이지 이동 툴팁 **/
function setBalloon() {
	if (currentSceneNumber == curTol) {
		$('.next_tooltip').css({ "background": "url('./common/css/img//footer/footer_last_tooltip.png') 100% 50% no-repeat" });
	} else {
		$('.next_tooltip').css({ "background": "url('./common/css/img//footer/footer_next_tooltip.png') 100% 50% no-repeat" });
	}
	if (isMobilePlatform()) {
		$(".next_tooltip").css("right", "125px");
	}
	if (pageArray[currentSceneNumber][1] == "V1") {
		if (endFlag) {
			progressControll = 1;
			$(".next_tooltip").hide(1000, function () {
				// playSound("chimes");
			});
		} else {
			$(".next_tooltip").hide();
		}
	} else if (pageArray[currentSceneNumber][1] == "V3" || pageArray[currentSceneNumber][1] == "A") {
		if (endFlag && toolTipFlag) {
			progressControll = 1;
			// $(".next_tooltip").fadeIn(1000, function () {
			// 	// playSound("chimes");
			// });
			$(".next_tooltip").hide();
			// playSound("chimes");
		}
		if (pageArray[currentSceneNumber][3] == "Practice") {
			if (endFlag) {
				progressControll = 1;
				// $(".next_tooltip").fadeIn(1000, function () {
				// 	// playSound("chimes");
				// });
			$(".next_tooltip").hide();
			// playSound("chimes");
			} else {
				$(".next_tooltip").hide();
			}
		}
	}
}

var languageElem = "<div id=\"organizeDiv\">\n <div class='boxData'></div>  <div class=\"organizePageInfo\">\n    <span></span>\n    <span></span>\n    <span></span>\n  </div>\n  <img src=\"./common/organizeData/images/prev_btn.png\" alt=\"\" class=\"org_prev\">\n  <img src=\"./common/organizeData/images/next_btn.png\" alt=\"\" class=\"org_next\">\n  <div class=\"printBox\"></div>\n</div>";
var introQuizElem = "<div id=\"quizDiv\"></div>\n<div class=\"noAlert\"></div>\n<div id=\"resultBox\" style=\"display: none;\">\n    <p class=\"countBox\"><img src=\"./common/introQuizData/images/result_text.png\"><span class=\"quizCountNum\"></span><span class=\"totalYes\"></span></p>\n   <img src=\"./common/introQuizData/images/quiz_result_re.png\" alt=\"\"  style=\"cursor: pointer; display: inline-block; margin-top: 80px;\" class=\"reStartBtn\">\n    </div>";
var quizElem = "<div id=\"quizDiv\"></div>\n<div class=\"noAlert1\"></div>\n<div class=\"noAlert2\"></div>\n<div class=\"noAlert3\"></div>\n<div class=\"noAlert4\"></div>\n<div id=\"resultBox\" style=\"display: none;\"><table class=\"resultView\"></table>\n   <p class=\"countBox\"><span class=\"quizCountNum\"></span><span class=\"totalYes\"></span></p>\n</div>";
// var quizElem = "<div id=\"quizDiv\"></div>\n<div class=\"noAlert\"></div>\n<div id=\"resultBox\" style=\"display: none;\">\n    <p class=\"countBox\"><span class=\"quizCountNum\"></span><span class=\"totalYes\"></span></p>\n    <table class=\"resultView\"></table>\n    \n    <img src=\".././common/quizData/images/quiz_result_re.png\" alt=\"\" onmouseover=\"this.src='.././common/quizData/images/quiz_result_re_over.png';\" onmouseout=\"this.src='.././common/quizData/images/quiz_result_re.png';\" style=\"cursor: pointer; display: inline-block; margin-top: 40px;\" class=\"reStartBtn\">\n    </div>";
var organizeElem = "<div id=\"organizeDiv\">\n <canvas id = 'myCanvas1' width = '193' height = '210'></canvas><canvas id = 'myCanvas2' width = '193' height = '210'></canvas><p class=\"clearcan\"></p><span class=\"orgDownBtn\"></span>\n  <span class=\"orgPrintBtn\"></span>\n  <div class=\"printBox\"></div>\n</div>";
var goalElem = "";
goalElem += "<textarea class='text_data' placeholder='의견을 입력 하여 주세요..'></textarea>";
goalElem += "<div class='ReflectionBox'>";
goalElem += "<img class='ReflectionBtn1' src='./common/css/img/btn1.png'/>";
goalElem += "<img class='ReflectionBtn2' src='./common/css/img/btn2.png'/>";
goalElem += "<img class='ReflectionBtn3' src='./common/css/img/btn3.png'/>";
goalElem += "</div>";
var introgudie = ""
introgudie += "<div id='introgudie'>"
introgudie += "<div class='unit1'>";
introgudie += "<img src='./common/css/img/introgudie_top.png'>";
introgudie += "<div class='textboxs'><div class='textbox'></div></div>";
introgudie += "</div>";
introgudie += "<div class='unit2'>";
introgudie += "<img src='./common/css/img/introgudie_bottom.png'>";
introgudie += "<div class='textboxs'><div class='textbox'></div></div>";
introgudie += "</div>";
introgudie += "</div>";
var language6 = ""
language6 += "<div id='language6'>"
language6 += "<div class='languagetitle'>";
language6 += "<div class='textboxs'><div class='textbox'></div></div>";
language6 += "</div>";
language6 += "</div>";


$(function () {
	window.addEventListener('keydown', function(e){
		if(e.keyCode == 37){
			// ArrowLeft
			if (progressControll == 0) {
				alert("학습 완료 후 이동 가능 합니다.");
			}
			else{
				e.preventDefault();
				if(Player.currentTime - 10 <= 0){
					Player.currentTime = 0;
				}else{
					Player.currentTime = Player.currentTime - 10;
				}
				setPlay();
			}
		}else if(e.keyCode == 39){
			// ArrowRight
			if (progressControll == 0) {
				alert("학습 완료 후 이동 가능 합니다.");
			}
			else{
				e.preventDefault();
				if(Player.currentTime >= Player.duration - 10){
					Player.currentTime = Player.duration;
				}else{
					Player.currentTime = Player.currentTime + 10;
					setPlay();
				}
			}	
		}else if(e.keyCode == 38){	//윗방향키(소리늘림)
			var soundTemp = Number(getCookie('volume'));

			soundTemp += 0.1;
			document.cookie = "volume=" + soundTemp;
			nmr_setVolumeFn(soundTemp);
		}
		else if(e.keyCode == 40){	//아랫방향키(소리줄임)
			var soundTemp = Number(getCookie('volume'));
			soundTemp = Number(soundTemp.toFixed(1));
			if(soundTemp == 0 || soundTemp == 0.0){
				soundTemp = 0;
				document.cookie = "volume=" + soundTemp;
				nmr_setVolumeFn(soundTemp);
			}
			else{
				soundTemp -= 0.1;
				document.cookie = "volume=" + soundTemp;
				nmr_setVolumeFn(soundTemp);
			}
		}else if(e.keyCode == 32){
			// Spacebar
			playPause();
		}
	})

	window.addEventListener('load', function(){
		if(currentSceneNumber == totalSceneNumber){
			$(".next").addClass("end")
			$(".end").css("animation","blink 0.5s linear infinite both")
		}
		// 
		$('#languageText').html(language6);
		if(currentSceneNumber == currentSceneNumber){
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber1')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber2')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber3')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber4')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber5')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber6')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber7')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber8')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber9')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber10')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber11')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber12')
			$(".languagetitle  .textboxs  .textbox").addClass('currentSceneNumber' + currentSceneNumber)
			langugae6();
		}

		
	})

	

	if (Number(currentSceneNumber) == videoPage) {
		
		videoInit();
	}
	if (Number(currentSceneNumber) == introQuizPage) {
		$('#pageContent').html(introQuizElem);
		//$('#fs-content').append('<img src=".././common/introQuizData/images/start_btn.png" alt="start" class="quizStartBtn" style="display:none;">')
		// $('#pageContent').css('background', 'url(.././common/introQuizData/images/quiz_bg.png)');
		// $('#pageContent').css('backgroundColor', '#989898');
		introQuizInit();
	}
	if (Number(currentSceneNumber) == quizPage) {
		$('#pageContent').html(quizElem);
		$('#fs-content').append('<img src="./common/quizData/images/start_btn.png" alt="start" class="quizStartBtn" >')
		// $('#pageContent').css('background', 'url(.././common/quizData/images/quiz_bg.png)');
		// $('#pageContent').css('backgroundColor', '#989898');
		quizInit();
	}
	if (Number(currentSceneNumber) == organizePage) {
		$('#pageContent').html(organizeElem);
		// $('#pageContent').css('background', 'url(.././common/organizeData/images/summary_bg.png)');
		organizeInit();
	}
	if (Number(currentSceneNumber) == goalPage) {
		$('#pageContent').html(goalElem);
		goalInit();
	}
	if (Number(currentSceneNumber) == introgudiePage) {
		$('#pageContent').html(introgudie);
		introgudieInit();
	}
	if(true){
		
	}
	newstyle();
	// $(document).keyup(function(e){

	// 	if(e.keyCode == 27){
	// 		if(fullBtnClick == true){
	// 			fullBtnClick = false;
	// 			container_scale = 1;
	// 			nmr_fullScreenOffFn();
	// 			responsive();
	// 		}
	// 	}
	// })
})


window.addEventListener('load', function () {
	if (Number(currentSceneNumber) == introQuizPage) {
		$(".replay").off();
		$(".slide").off();
		$(".slide_inner").off();
		$(".slide_bg").off();
		$(".slide_current").off();
		$(".slide_inner_video").off();
		var tempCount = 0;
		var repeat = setInterval(function () {
			if (Player.readyState > 0) {
				tempCount++;
				$(".slide").off();
				$(".slide_inner").off();
				$(".slide_bg").off().css({ 'cursor': 'default' });
				$(".slide_current").off();
				$(".slide_inner_video").off();
				if (tempCount >= 0) {
					clearInterval(repeat);
				}
			}
			else {
			}
		}, 201);

	}

})
window.addEventListener('load' ,function(){
	$('.languageSel > div').on('click', function () {
		$('#languageText').html(language6);
		if(currentSceneNumber == currentSceneNumber){
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber1')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber2')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber3')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber4')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber5')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber6')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber7')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber8')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber9')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber10')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber11')
			$(".languagetitle  .textboxs  .textbox").removeClass('currentSceneNumber12')
			$(".languagetitle  .textboxs  .textbox").addClass('currentSceneNumber' + currentSceneNumber)
		}
		langugae6();
	})
	
  //0323 03폴더 1페이지 관련 함수
  $("#season_spring").on('click', function(){
	$("#Question").show()
  })
  $("#season_summer").on('click', function(){
	$("#Question").show()
  })
  $("#season_autumn").on('click', function(){
	$("#Question").show()
  })
  $("#season_winter").on('click', function(){
	$("#Question").show()
  })
  $("#page1pop1close").on('click', function(){
	$("#Question").hide()
	$("#page1pop1").show()
	$("#page1pop2").hide()
  })
  $("#page1pop2close").on('click', function(){
	$("#Question").hide()
	$("#page1pop1").show()
	$("#page1pop2").hide()
  })
  $("#seasonmicbtn").on('click', function(){
	$("#page1pop1").hide()
	$("#page1pop2").show()
  })
})


//언어 교체 함수
function langugae6() {
	var language = langNo; //1한국어 2영어 3중국어 4베트남어 5러시아어 6캄보디아어
    
    /*2023.08.01*/
    var localizationNO = getCookie("localizationNO");
    console.log("localizationNO = "+localizationNO);
    if(localizationNO=="" || localizationNO==undefined|| localizationNO==null){
        localizationNO=language;
    }else{
        language = Number(localizationNO) + 2 ;
    }
    console.log("bottom.js localizationNO = "+localizationNO+" // language = "+language);
    //language = 1 : 한글
    //language = 2 : 영어
    //language = 3 : 중국어
    //language = 4 : 베트남
    //language = 5 : 러시아
    //language = 6 : 캄보디아
    /*2023.08.01*/
    
	var languagebox = document.getElementsByClassName('languagetitle')[0].getElementsByClassName('textbox')[0];
	//$('.currentSceneNumber1').css({ "left":"563px","top":"41px" })

var langsel;
if(top.bolPorted){
	langsel = language
}else{
	langsel = langNo
}
	
	var length = totalLanguage[0].length;
	for (let i = 0; i < 6; i++) {
		if (i + 1 == langsel) {
			for (let j = 0; j < length; j++) {
				if (j + 1 == currentSceneNumber) {
					languagebox.innerHTML = '';
					for (let k = 0; k < totalLanguage[i][j].length; k++) {
						var span = document.createElement('span')
						span.innerHTML = totalLanguage[i][j][k]
						languagebox.appendChild(span)
					}
				}
			}
		}
	}	// if(language == 1){
	// 	languagebox.innerHTML = '';
	//   if(currentSceneNumber == 1){
	// 	for (var i = 0; i < Korean1.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean1[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 2){
	// 	for (var i = 0; i < Korean2.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean2[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 3){
	// 	for (var i = 0; i < Korean3.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean3[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 4){
	// 	for (var i = 0; i < Korean4.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean4[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 5){
	// 	for (var i = 0; i < Korean5.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean5[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 6){
	// 	for (var i = 0; i < Korean6.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean6[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 7){
	// 	for (var i = 0; i < Korean7.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean7[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 8){
	// 	for (var i = 0; i < Korean8.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean8[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 9){
	// 	for (var i = 0; i < Korean8.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean9[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 10){
	// 	for (var i = 0; i < Korean10.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean10[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 11){
	// 	for (var i = 0; i < Korean11.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean11[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 12){
	// 	for (var i = 0; i < Korean11.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = Korean12[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	// }
	// else if(language == 2){
	// 	languagebox.innerHTML = '';
	//   if(currentSceneNumber == 1){
	// 	for (var i = 0; i < English1.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English1[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 2){
	// 	for (var i = 0; i < English2.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English2[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 3){
	// 	for (var i = 0; i < English3.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English3[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 4){
	// 	for (var i = 0; i < English4.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English4[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 5){
	// 	for (var i = 0; i < English5.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English5[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 6){
	// 	for (var i = 0; i < English6.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English6[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 7){
	// 	for (var i = 0; i < English7.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English7[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 8){
	// 	for (var i = 0; i < English8.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English8[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 9){
	// 	for (var i = 0; i < English9.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English9[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 10){
	// 	for (var i = 0; i < English10.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English10[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 11){
	// 	for (var i = 0; i < English11.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English11[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	//   else if(currentSceneNumber == 12){
	// 	for (var i = 0; i < English12.length; i++) {
	// 	  var span = document.createElement('span')
	// 		span.innerHTML = English12[i]
	// 		languagebox.appendChild(span)
	// 	}
	//   }
	// }
	// else if(language == 3){
	// 	languagebox.innerHTML = '';
	// 	if(currentSceneNumber == 1){
	// 	  for (var i = 0; i < Chinese1.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese1[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 2){
	// 	  for (var i = 0; i < Chinese2.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese2[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 3){
	// 	  for (var i = 0; i < Chinese3.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese3[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 4){
	// 	  for (var i = 0; i < Chinese4.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese4[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 5){
	// 	  for (var i = 0; i < Chinese5.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese5[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 6){
	// 	  for (var i = 0; i < Chinese6.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese6[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 7){
	// 	  for (var i = 0; i < Chinese7.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese7[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 8){
	// 	  for (var i = 0; i < Chinese8.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese8[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 9){
	// 	  for (var i = 0; i < Chinese9.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese9[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 10){
	// 	  for (var i = 0; i < Chinese10.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese10[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 11){
	// 	  for (var i = 0; i < Chinese11.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese11[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 12){
	// 	  for (var i = 0; i < Chinese12.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Chinese12[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// }
	// else if(language == 4){
	// 	languagebox.innerHTML = '';
	// 	if(currentSceneNumber == 1){
	// 	  for (var i = 0; i < Vietnamese1.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese1[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 2){
	// 	  for (var i = 0; i < Vietnamese2.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese2[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 3){
	// 	  for (var i = 0; i < Vietnamese3.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese3[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 4){
	// 	  for (var i = 0; i < Vietnamese4.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese4[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 5){
	// 	  for (var i = 0; i < Vietnamese5.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese5[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 6){
	// 	  for (var i = 0; i < Vietnamese6.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese6[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 7){
	// 	  for (var i = 0; i < Vietnamese7.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese7[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 8){
	// 	  for (var i = 0; i < Vietnamese8.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese8[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 9){
	// 	  for (var i = 0; i < Vietnamese9.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese9[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 10){
	// 	  for (var i = 0; i < Vietnamese10.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese10[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 11){
	// 	  for (var i = 0; i < Vietnamese11.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese11[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 12){
	// 	  for (var i = 0; i < Vietnamese12.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Vietnamese12[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// }
	// else if(language == 5){
	// 	languagebox.innerHTML = '';
	// 	if(currentSceneNumber == 1){
	// 	  for (var i = 0; i < Russian1.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian1[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 2){
	// 	  for (var i = 0; i < Russian2.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian2[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 3){
	// 	  for (var i = 0; i < Russian3.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian3[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 4){
	// 	  for (var i = 0; i < Russian4.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian4[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 5){
	// 	  for (var i = 0; i < Russian5.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian5[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 6){
	// 	  for (var i = 0; i < Russian6.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian6[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 7){
	// 	  for (var i = 0; i < Russian7.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian7[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 8){
	// 	  for (var i = 0; i < Russian8.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian8[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 9){
	// 	  for (var i = 0; i < Russian9.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian9[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 10){
	// 	  for (var i = 0; i < Russian10.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian10[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 11){
	// 	  for (var i = 0; i < Russian11.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian11[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	//    else if(currentSceneNumber == 12){
	// 	  for (var i = 0; i < Russian12.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Russian12[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// }
	// else if(language == 6){
	// 	languagebox.innerHTML = '';
	// 	if(currentSceneNumber == 1){
	// 	  for (var i = 0; i < Cambodian1.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian1[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 2){
	// 	  for (var i = 0; i < Cambodian2.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian2[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 3){
	// 	  for (var i = 0; i < Cambodian3.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian3[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 4){
	// 	  for (var i = 0; i < Cambodian4.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian4[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 5){
	// 	  for (var i = 0; i < Cambodian5.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian5[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 6){
	// 	  for (var i = 0; i < Cambodian6.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian6[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 7){
	// 	  for (var i = 0; i < Cambodian7.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian7[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 8){
	// 	  for (var i = 0; i < Cambodian8.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian8[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 9){
	// 	  for (var i = 0; i < Cambodian9.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian9[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 10){
	// 	  for (var i = 0; i < Cambodian10.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian10[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 11){
	// 	  for (var i = 0; i < Cambodian11.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian11[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// 	else if(currentSceneNumber == 12){
	// 	  for (var i = 0; i < Cambodian12.length; i++) {
	// 		var span = document.createElement('span')
	// 		  span.innerHTML = Cambodian12[i]
	// 		  languagebox.appendChild(span)
	// 	  }
	// 	}
	// }
	//번역 위치 개별 조정 (반드시 이 위치)
	//$(".currentSceneNumber9 > span:nth-child(2)").css({ "text-align":"left" , "margin-left":"20px" , "margin-top":"75px"})
	//$(".currentSceneNumber9 > span:nth-child(3)").css({ "text-align":"left" , "margin-left":"20px" , "margin-top":"52px" })
	//$(".currentSceneNumber6 > span:nth-child(1)").css({ "margin-top":"25px" })
	//$(".currentSceneNumber6 > span:nth-child(2)").css({ "margin-left":"420px" , "margin-top":"-44px" })


	// $(".currentSceneNumber9 > span:nth-child(2)").css({ "display":"none","margin-left":"-100px" , "margin-top":"75px"})
	// setTimeout(function() {
	// 	$(".currentSceneNumber9 > span:nth-child(2)").fadeIn(600)
	// }, 500);
	// $(".currentSceneNumber9 > span:nth-child(3)").css({ "display":"none","margin-left":"-100px" , "margin-top":"52px" })
	// setTimeout(function() {
	// 	$(".currentSceneNumber9 > span:nth-child(3)").fadeIn(600)
	// }, 3800);

	
	//$(".currentSceneNumber2 > span:nth-child(2)").css({ "margin-left":"0" , "margin-top":"430px" })
	//번역 위치 개별 조정 (반드시 이 위치)
	if(langToggle == 1){
		$('.textbox > span').css("display","block")
	}else{
		$('.textbox > span').css("display","none")
	}
  }
  //언어 교체 함수



  var selectLine=1;
  function _displayImage(arr){
	  console.log(arr);
	  var _add=""
	  for(var i=0;i<arr.length;i++){
		  _add+='<img class="_inTextImage" src = '+arr[i]+'>'
	  }
	  $("#example_q"+selectLine).html(_add);
	  $("#example_q"+selectLine).show();
	  $(".contentspop").css('display','none')
	  if($("#contents_box  ._inTextImage").length == 11){// 다음페이지 버튼 관련 모듈마다 숫자 바꿔줘야 함
		$(".next").addClass('end'); // 다음버튼 활성화
		currentSceneNumberarray[currentSceneNumber - 1] = 1; //현재페이지 진도체크
		$(".end").css("animation","blink 0.5s linear infinite both") // 깜빡임 효과
		setTimeout(() => { //정답 나타내는 수리
		$("#pageresult").show()
		}, 2500);	
	  } 
	//   else if($("#contents_box  ._inTextImage").length == 15){// 진도체크 관련 모듈마다 숫자 바꿔줘야 함
	// } 
  }
  
  
  function _closeFrame(str){
	  console.log("selectLine >> "+selectLine);
	  $("#click_"+selectLine).show();
	  $(".contentspop").hide();
  }
