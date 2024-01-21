var pageArray = new Array();
/**

	파일명, 타입(V1:동영상만 , V2:html 화면 이벤트 X, V3:html 화면 이벤트 X), html 나오는 시간, A mp3 페이지 

**/
pageArray[1] = ["01.html", "V3", 0, ""];

var totalPages = 1;
var introQuizPage = 9999;
var quizPage = 1
var organizePage = 97;
var introgudiePage = 9999;
var goalPage = 9999;
var videoPage = 9999;
var orgPrintCount = 1;
var pageDivision = [1, 2, 3, 4]
var drag = true;

var _cw = 1280;
var _ch = 720;

var cssPath = "./common/css/img/";
var imgType = ".png";

var thisurl = location.href;
var fileurl = thisurl.lastIndexOf("/");
var fileName = thisurl.substring(fileurl + 1);

var curTol = totalPages;
var balloonFlag = true;

// 과정명
var topTitle = "다문화학생을 위한 한국어-중등 1단계"; //브라우저 타이틀
var leftChapterTitle = "";//왼쪽 챕터명
var rightChasiTitle = "";//오른쪽 차시명
var summaryPrintPage = 3//정리하기 인쇄 페이지 수
window.addEventListener('load', function(){
	parent.document.title = topTitle;
});

var isActivityIntroSound="0098";
var isActivityIntroSound2="eng_0098"; //영어
var isActivityIntroSound3="cn_0098"; //중국어
var isActivityIntroSound4="vn_0098"; //베트남
var isActivityIntroSound5="ru_0098"; //러시아
var isActivityIntroSound6="km_0098"; //캄보디안 //현지화 음성

var warpTimeData = new Array();
// warpTimeData[4] = [ 
// 	{
// 		title: "우체국 택배 용어",
// 		time: 0,
// 	},
// ]
// warpTimeData[5] = [ 
// 	{
// 		title: "이용조건 및 이용제한",
// 		time: 0,
// 	},
// ]
// warpTimeData[6] = [ 
// 	{
// 		title: "우체국 택배 계약 종류 및 계약서 작성법",
// 		time: 0,
// 	},
// ]


///////////////////////////////////////////////////////////////////////////////////////////////////
//msg("차시 : " + curChasi + " 페이지 : " + currentSceneNumber + " 총 페이지 : " + curTol);
///////////////////////////////////////////////////////////////////////////////////////////////////


document.write('<script language="javascript" src="./common/js/common.js"></script>');


function itostr(inum) {
	return inum < 10 ? "0" + inum : inum;
}

function msg(str) {
	console.log(str);
}

function protoAlt() {
	alert("프로토에서는 지원하지 않습니다.");
}

function handleOver() {//오버시 이미지 o
	//playSound("over");
	var imgAttr = $(this).children().attr("src");
	imgAttr = imgAttr.substr(0, imgAttr.length - 5);
	$(this).children().attr("src", imgAttr + "o.png");
	$(this).children().css("cursor", "pointer");
}
function handleOut() {//아웃시 이미지 b
	var imgAttr = $(this).children().attr("src");
	imgAttr = imgAttr.substr(0, imgAttr.length - 5);
	$(this).children().attr("src", imgAttr + "b.png");
}

function handleDown() {//크클릭 이미지 u
	var imgAttr = $(this).children().attr("src");
	imgAttr = imgAttr.substr(0, imgAttr.length - 5);
	$(this).children().attr("src", imgAttr + "u.png");
}
function handleUp() {//크클릭 후 기본 b
	playSound("click");
	var imgAttr = $(this).children().attr("src");
	imgAttr = imgAttr.substr(0, imgAttr.length - 5);
	$(this).children().attr("src", imgAttr + "b.png");

}