// hideTopLogo = function () {
// 	if (Number(currentSceneNumber) !== Number(quizPage)) {
// 		$('.top-logo1').hide();
// 	}
// }

///////////////////////////////////////////////////////////////////////////////////////////////////


//상단 텍스트 pageInfo에서 받아와 출력
function setHeadText() {
	$(".header_left .chapter_num").text(itostr(curChasi));//왼쪽 챕터 넘버
	$(".header_left .header_right").append(rightChasiTitle);//오른쪽 차시명
	$(".header_left .chapter_title").append(leftChapterTitle);//왼쪽 챕터명
}



