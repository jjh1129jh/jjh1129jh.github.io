function newstyle() {
		if (pageArray[currentSceneNumber][1] == "V1") {
		$('#fs-content').css('background', 'none')
	}else{
		// $('#fs-content').css('background', 'url(./common/css/img/pop/content_bg.gif)')
		// setTimeout(function() {
		// 	$('#fs-content').css('background', 'url(./common/css/img/pop/content_bg2.png)')
		// }, 2000);
	}
	if (Number(currentSceneNumber) == introgudiePage) {
		$('#pageContent').css('background', 'url(./common/css/img/pop/notice.png)')
	}
	if (Number(currentSceneNumber) == introQuizPage) {
		if (drag) {
			$('#pageContent').css('background', 'url(./common/css/img/pop/introquiz.png)')
		}else $('#pageContent').css('background', 'url(./common/css/img/pop/introquiz.png)')
	}
	if (Number(currentSceneNumber) == goalPage) {
		$('#pageContent').css('background', 'url(./common/css/img/pop/goalbg.png)')
	}
	if (Number(currentSceneNumber) == quizPage) {
		$('#fs-content').css('background', 'url(./common/css/img/pop/content_bg2.png)')
	}
	if (Number(currentSceneNumber) == organizePage) {
		// $('#pageContent').css('background', 'url(./common/css/img/pop/orgbg.png)')
	}
}