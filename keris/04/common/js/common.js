/**
	2017. 01. 23
	stroy21
	FunnsySky 
	funnysky@story21.co.kr
**/

///////////////////////////////////////////////////////////////////////////////////////////////////

var cURL = this.location.href;
var preStr = cURL.substring(0, cURL.lastIndexOf('/') + 1);
var curChapStr = preStr.substring(preStr.length - 6, preStr.length - 4);
var curChapStr2 = preStr.substring(preStr.length - 3, preStr.length - 1);
curChapStr = parseInt(curChapStr2)
curChapStr = itostr(curChapStr)

var tl;

var preStr = cURL.substring(0, cURL.lastIndexOf('.html') + 1);
var currentSceneNumberStr = preStr.substring(preStr.length - 3, preStr.length - 1);

var curChasi = Number(curChapStr)
var currentSceneNumber = 1;
// var currentSceneNumber = Number(currentSceneNumberStr)

var isLocal = true;   // true 로컬, false 서버				
var vodPath;		       // 영상 주소
var controlcheck = 1;     // 0:순차진행안함 1:순차진행

if(top.bolPorted){
	vodPath = top.vdpath;
}
else{
	vodPath = "./media/";
}


/*공통 js, css*/
if(top.bolPorted){
	document.write('<link href="/mr/common/css/font.css"  rel="stylesheet" type="text/css" charset="utf-8" />');
	document.write('<link href="/mr/common/css/coin.css"  rel="stylesheet" />');
	document.write('<script language="javascript" src="/mr/common/js/coin.js"></script>')
	/** CSS **/
	document.write('<link href="/mr/common/css/reset.css"  rel="stylesheet" />');
	document.write('<link href="./common/css/style.css"  rel="stylesheet" />');
	document.write('<link href="./common/css/bottom.css"  rel="stylesheet" />');
	if (currentSceneNumber == quizPage) {
		document.write('<link href="/mr/common/css/quiz.css"  rel="stylesheet" />');
	} else if (currentSceneNumber == introQuizPage) {
		document.write('<link href="./common/css/introQuiz.css"  rel="stylesheet" />');
	} else if (currentSceneNumber == videoPage) {
		document.write('<link href="/mr/common/css/video.css"  rel="stylesheet" />');
	}

	document.write('<link href="/mr/common/css/summary.css"  rel="stylesheet" />');
	document.write('<link href="/mr/common/css/goal.css"  rel="stylesheet" />');
	document.write('<link href="./common/css/introgudie.css"  rel="stylesheet" />');

	document.write('<script language="javascript" src="/mr/common/js/jquery.PrintArea.js"></script>');
	document.write('<script language="javascript" src="/mr/common/js/jquery-ui.js"></script>');
	document.write('<script language="javascript" src="/mr/common/js/jquery.ui.touch-punch.min.js"></script>');
	document.write('<script language="javascript" src="/mr/common/js/temp/player.js"></script>');
	document.write('<script language="javascript" src="/mr/common/js/temp/hls.min.js"></script>');

	document.write('<script language="javascript" src="./js/language.js"></script>')

	document.write('<script language="javascript" src="./js/scriptInfo.js"></script>');

	if (currentSceneNumber == quizPage) {
		document.write('<script language="javascript" src="./js/quizInfo.js"></script>')
		document.write('<script language="javascript" src="./common/js/quiz.js"></script>')
	} else if (currentSceneNumber == introQuizPage) {
		document.write('<script language="javascript" src="./js/introQuizInfo.js"></script>')
		document.write('<script language="javascript" src="./common/js/introQuiz.js"></script>')
	} else if (currentSceneNumber == videoPage) {
		document.write('<script language="javascript" src="/mr/common/js/video.js"></script>')
	}
	document.write('<script language="javascript" src="/mr/common/js/summary.js"></script>')
	document.write('<script language="javascript" src="/mr/common/js/goal.js"></script>')
	document.write('<script language="javascript" src="/mr/common/js/introgudie.js"></script>')
	document.write('<script language="javascript" src="./common/js/newstyle.js"></script>')
	
	
	document.write('<script language="javascript" src="./common/js/bottom.js"></script>');
	document.write('<script language="javascript" src="./js/index.js"></script>');
	document.write('<script language="javascript" src="/mr/common/js/top.js"></script>');
	document.write('<script language="javascript" src="./common/js/ui.js"></script>');
	document.write('<script language="javascript" src="/mr/common/js/audio.js"></script>');
	document.write('<script language="javascript" src="/mr/common/js/srt.js"></script>');
	document.write('<script language="javascript" src="/mr/common/js/setting.js"></script>')
	document.write('<link href="/mr/common/css/setting.css"  rel="stylesheet" />');
}else{
	document.write('<link href="../common/css/font.css"  rel="stylesheet" type="text/css" charset="utf-8" />');
	/** CSS **/
	document.write('<link href="../common/css/reset.css"  rel="stylesheet" />');
	document.write('<link href="./common/css/style.css"  rel="stylesheet" />');
	document.write('<link href="./common/css/bottom.css"  rel="stylesheet" />');
	if (currentSceneNumber == quizPage) {
		document.write('<link href="../common/css/quiz.css"  rel="stylesheet" />');
	} else if (currentSceneNumber == introQuizPage) {
		document.write('<link href="./common/css/introQuiz.css"  rel="stylesheet" />');
	} else if (currentSceneNumber == videoPage) {
		document.write('<link href="../common/css/video.css"  rel="stylesheet" />');
	}
	document.write('<link href="../common/css/summary.css"  rel="stylesheet" />');
	document.write('<link href="../common/css/goal.css"  rel="stylesheet" />');
	document.write('<link href="./common/css/introgudie.css"  rel="stylesheet" />');

	document.write('<script language="javascript" src="../common/js/jquery.PrintArea.js"></script>');
	document.write('<script language="javascript" src="../common/js/jquery-ui.js"></script>');
	document.write('<script language="javascript" src="../common/js/jquery.ui.touch-punch.min.js"></script>');
	document.write('<script language="javascript" src="../common/js/temp/player.js"></script>');
	document.write('<script language="javascript" src="../common/js/temp/hls.min.js"></script>');

	document.write('<script language="javascript" src="./js/language.js"></script>')

	document.write('<script language="javascript" src="./js/scriptInfo.js"></script>');

	if (currentSceneNumber == quizPage) {
		document.write('<script language="javascript" src="./js/quizInfo.js"></script>')
		document.write('<script language="javascript" src="./common/js/quiz.js"></script>')
	} else if (currentSceneNumber == introQuizPage) {
		document.write('<script language="javascript" src="./js/introQuizInfo.js"></script>')
		document.write('<script language="javascript" src="./common/js/introQuiz.js"></script>')
	} else if (currentSceneNumber == videoPage) {
		document.write('<script language="javascript" src="../common/js/video.js"></script>')
	}
	document.write('<script language="javascript" src="../common/js/summary.js"></script>')
	document.write('<script language="javascript" src="../common/js/goal.js"></script>')
	document.write('<script language="javascript" src="../common/js/introgudie.js"></script>')
	document.write('<script language="javascript" src="./common/js/newstyle.js"></script>')


	document.write('<script language="javascript" src="./common/js/bottom.js"></script>');
	document.write('<script language="javascript" src="./js/index.js"></script>');
	document.write('<script language="javascript" src="../common/js/top.js"></script>');
	document.write('<script language="javascript" src="./common/js/ui.js"></script>');
	document.write('<script language="javascript" src="../common/js/audio.js"></script>');
	document.write('<script language="javascript" src="../common/js/srt.js"></script>');
}

function itostr(inum) {
	return inum < 10 ? "0" + inum : inum;
}

// 시분초 초로 변환 
function timeToSecond(str) {
	var timeArr = str.split(":");
	var SecondTime = Number(timeArr[0] * 60) + Number(timeArr[1]);
	console.log("SecondTime : " + SecondTime + " str : " + str);
	return SecondTime;
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


function NextMove(next_page, _bol) {
		location = next_page;
}

window.addEventListener('load', function(){
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
})