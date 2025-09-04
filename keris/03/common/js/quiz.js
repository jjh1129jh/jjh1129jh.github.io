

var quizCount = quizType.length //퀴즈 개수 퀴즈없으면 주석
var thisQuizPage = 0; // 0이 1페이지
var selectInData = [];
var quizChance = [0, 0, 0, 0, 0]; //기회
var answerOk = [false, false, false, false, false];
var clickX = [false, false, false, false, false]; //이미 푼 문제
var reChance;
var narrupdata;
var quizmake1 = 0;
var coin1 = 0;
var coin2 = 0;
var coin3 = 0;

function quizInit() {
	for (var i = 0; i < quizCount; i++) {
		quizMake(i);
	}
	resultMake();
	$('.popupBtn').on('click', function () {
		$(this).parent().parent().find('.popupBox').fadeIn();
	})
	$('.popup_close').on('click', function () {
		$('.popupBox').fadeOut();
	})
	$(".inputBox input").on("propertychange change keyup paste input", function () {
		if (!clickX[thisQuizPage]) {
			$(".quizEq").eq(thisQuizPage).find('.checkBtn').show();
		}
	});
	$('.reStartBtn').on('click', function () {
		reQuizStart();

	})
	$('.resultBtn').on('click', function () {
		resultSet();
		$('.resultBtn').hide();
		$('#quizDiv').hide();
		$('#resultBox').fadeIn();
		//다음페이지로 툴팁
		toolTipFlag = true;
		progressControll = 1;
		if (endFlag && toolTipFlag) {
			$(".next_tooltip").fadeIn(1000, function () {
				playSound("chimes");
			});
			if(parent.bolPorted){
				if(parent.parent.playInfo > parent.strMaxPage || parent.parent.playInfo == undefined || parent.parent.playInfo == ""){
					parent.strMaxPage = parent.parent.playInfo;
				}
				else{
					parent.strMaxPage = itostr(currentSceneNumber);
				}
			}
		} else {
			$(".next_tooltip").hide();
		}
	})
	$('.preQuizBtn').on('click', function () {
		thisQuizPage -= 1;
		$('#resultgif01').hide();
		$('#resultgif02').hide();
		$('.quizEq').hide();
		$('.quizEq').eq(thisQuizPage).show();
		// $('.o_btn').css('background', 'url(./common/quizData/images/o_non.png)')
		// $('.x_btn').css('background', 'url(./common/quizData/images/x_non.png)')
		if(thisQuizPage == 0){
			if(coin1 == 1){
				$('.o_btn').css('background', 'url(./common/quizData/images/o_on.png)')
				$('.x_btn').css('background', 'url(./common/quizData/images/x_non.png)')
			}else{
				$('.o_btn').css('background', 'url(./common/quizData/images/o_non.png)')
				$('.x_btn').css('background', 'url(./common/quizData/images/x_non.png)')
			}
		}
		else if(thisQuizPage == 1){
			if(coin2 == 1){
				$('.o_btn').css('background', 'url(./common/quizData/images/o_non.png)')
				$('.x_btn').css('background', 'url(./common/quizData/images/x_on.png)')
			}else{
				$('.o_btn').css('background', 'url(./common/quizData/images/o_non.png)')
				$('.x_btn').css('background', 'url(./common/quizData/images/x_non.png)')
			}
		}
		else if(thisQuizPage == 2){
			if(coin3 == 1){
				$('.o_btn').css('background', 'url(./common/quizData/images/o_non.png)')
				$('.x_btn').css('background', 'url(./common/quizData/images/x_on.png)')
			}else{
				$('.o_btn').css('background', 'url(./common/quizData/images/o_non.png)')
				$('.x_btn').css('background', 'url(./common/quizData/images/x_non.png)')
			}
		}
		clearTimeout(narrupdata)
		if(thisQuizPage == 0){
			$('.preQuizBtn').hide()
		}
		if(clickX[thisQuizPage] == true){
			$(".next").addClass("end")
		}
		$(".quizaddtitle").attr("alt",addquiztitle[thisQuizPage])
		$(".quizaddtitle").attr("title",addquiztitle[thisQuizPage])
		// playSoundQuizNarr('')
		// narrupdata = setTimeout((function () {
		// 	playSoundQuizNarr('.././common/quizData/narrSound/' + itostr(Number(curChapStr)) + '/' + itostr(thisQuizPage + 1) + '_answp.mp3');
		// }), 1500)
	})
	$('.nextQuizBtn').on('click', function () {
		thisQuizPage += 1;
		$('#resultgif01').hide();
		$('#resultgif02').hide();
		$('.quizEq').hide();
		$('.quizEq').eq(thisQuizPage).show();
		$('.preQuizBtn').show()
		$('.o_btn').css('background', 'url(./common/quizData/images/o_non.png)')
		$('.x_btn').css('background', 'url(./common/quizData/images/x_non.png)')
		clearTimeout(narrupdata)

		$(".quizaddtitle").attr("alt",addquiztitle[thisQuizPage+1])
		$(".quizaddtitle").attr("title",addquiztitle[thisQuizPage+1])
		// playSoundQuizNarr('')
		// narrupdata = setTimeout((function () {
		// 	playSoundQuizNarr('.././common/quizData/narrSound/' + itostr(Number(curChapStr)) + '/' + itostr(thisQuizPage + 1) + '_answp.mp3');
		// }), 1500)
	})
	$('.gogoBtn').on('click', function () {
		nmr_gotoNextPage();
	})
	$('.checkBtn').on('click', function () {
		// clearTimeout(narrupdata)
		// playSoundQuizNarr('')
		if (quizType[thisQuizPage] == "A") {
			selectCheck();
		} else if (quizType[thisQuizPage] == "B") {
			oxCheck();
		} else if (quizType[thisQuizPage] == "C") {
			inputCheck();
		}
	})

	$('.selectBox > li').on('click', function () {
		if (clickX[thisQuizPage]) {
			return;
		}
		playSound('click');
		$(this).parent().find('.selectCheck').hide();
		$(this).parent().find('div').removeClass("select_over1");
		$(this).parent().find('div').removeClass("select_over2");
		$(this).parent().find('div').removeClass("select_over3");
		$(this).parent().find('div').removeClass("select_over4");
		var selectCount = Number($(this).index() + 1);
		if ($.isArray(answer[thisQuizPage])) {
			selectInData[thisQuizPage].unshift(selectCount);
			selectInData[thisQuizPage].splice(2, 1);
			try {
				$(this).parent().find('.selectCheck').eq(selectInData[thisQuizPage][0] - 1).show();
				$(this).parent().find('.selectCheck').eq(selectInData[thisQuizPage][1] - 1).show();
				
			} catch (e) {

			}
			//console.log(selectInData)
			if (selectInData[thisQuizPage][0] == selectInData[thisQuizPage][1] || selectInData[thisQuizPage].length == 1) {
				$(this).parent().parent().find('.checkBtn').hide();
			} else {
				$(this).parent().parent().find('.selectListTxt').removeClass("textcolor");
				$(this).find('.selectListTxt').addClass("textcolor");
			}
		} else {
			$(this).parent().parent().find('.checkBtn').show();
			selectInData[thisQuizPage] = selectCount;

			/***********************************/
			 
			// $(this).parent().find('div').eq(selectInData[thisQuizPage] - 1).addClass("select_over" + selectCount);

			 /**********************************/
			//  selectCheck()

			$(this).parent().find('.selectCheck').eq(selectInData[thisQuizPage] - 1).show();
			$('.selectListTxt').removeClass("textcolor");
			//$(this).find('.selectListTxt').addClass("textcolor");
			////console.log(f)
		}

	})

	$('.oxBox .o_btn').on('click', function () {

		if (clickX[thisQuizPage]) {
			return;
		}
		playSound('s_click');
		selectInData[thisQuizPage] = "o";
		//console.log($(this));
		// $('.x_btn').css('background', 'url(./common/quizData/images/x_non.png)')
		// 
		// $(this).parent().parent().find('.checkBtn').show();
		oxCheck();
		if(thisQuizPage+1 == quizCount){
			setTimeout(() => {
				$("#pageresult").show()
			}, 2500);
		}
		$(".next").addClass("end")
		if(answer[thisQuizPage] == selectInData[thisQuizPage]){
			$('.o_btn').css('background', 'url(./common/quizData/images/o_on.png)')
			currentSceneNumberarray= 1;
		} else {
			$('.x_btn').css('background', 'url(./common/quizData/images/x_on.png)')
			currentSceneNumberarray= 1;
		}
	})

	$('.oxBox .x_btn').on('click', function () {

		if (clickX[thisQuizPage]) {
			return;
		}
		playSound('s_click');
		// $('.o_btn').css('background', 'url(./common/quizData/images/o_non.png)')
		// $('.x_btn').css('background', 'url(./common/quizData/images/x_on.png)')
		selectInData[thisQuizPage] = "x";
		// $(this).parent().parent().find('.checkBtn').show();
		oxCheck();
		if(thisQuizPage+1 == quizCount){
			setTimeout(() => {
				$("#pageresult").show()
			}, 2500);
		}

		$(".next").addClass("end")
		if(answer[thisQuizPage] == selectInData[thisQuizPage]){
			$('.x_btn').css('background', 'url(./common/quizData/images/x_on.png)')
			currentSceneNumberarray= 1;
		} else {
			$('.o_btn').css('background', 'url(./common/quizData/images/o_on.png)')
			currentSceneNumberarray= 1;
		}
		$(".quizEq").eq(thisQuizPage).find(".feedback").fadeIn();
	})

	$('.quizStartBtn').on('click', function () {
		$('#pageContent').fadeIn();
		$('.quizStartBtn').fadeOut();
		$('.intro_img2').hide();
        $('.intro_img1').hide();
        $('.intro_img3').hide();
		$('#quizDiv').fadeIn();
		Player.currentTime = Player.duration-0.1;//재생할 시간으로 보내서
		quizStart = true;
		// narrupdata = setTimeout((function () {
		// 	playSoundQuizNarr('.././common/quizData/narrSound/' + itostr(Number(curChapStr)) + '/' + itostr(thisQuizPage + 1) + '_answp.mp3');
		// }), 1500)
	})

	$('.checkBtn').mouseover(function() {
		$(this).css('background', 'url(./common/quizData/images/check_btn_over.png)');
	})
	.mouseout(function() {
		$(this).css('background', 'url(./common/quizData/images/check_btn.png)');
	});
	// $('.preQuizBtn').mouseover(function() {
	// 	$(this).css('background', 'url(./common/css/img/footer/footer_paging_pre_d.png) no-repeat');
	// })
	// .mouseout(function() {
	// 	$(this).css('background', 'url(./common/css/img/footer/footer_paging_pre_d.png) no-repeat');
	// });
	$('.nextQuizBtn').mouseover(function() {
		$(this).css('background', 'url(./common/css/img/footer/footer_paging_nex_d.png) no-repeat');
	})
	.mouseout(function() {
		$(this).css('background', 'url(./common/css/img/footer/footer_paging_nex_d.png) no-repeat');
	});

	$('.resultBtn').mouseover(function() {
		//$(this).css('background', 'url(./common/quizData/images/btn_result_over.png)');
	})
	.mouseout(function() {
		$(this).css('background', 'url(./common/quizData/images/btn_result.png)');
	});
}

function resultMake() {

	var elemTr = document.createElement('tr')

	for (var j = 0; j < quizCount; j++) {
		var elemTd = document.createElement('td')

		var elemImg = document.createElement('img')
		elemImg.src = "";
		elemTd.appendChild(elemImg)
		elemTr.appendChild(elemTd);
	}
	document.getElementsByClassName('resultView')[0].appendChild(elemTr);
}


function selectCheck() {
	//console.log(answer, 'answer')
	//console.log(selectInData, 'selectInData')
	if (clickX[thisQuizPage]) {
		return;
	}
	if ($.isArray(answer[thisQuizPage])) {
		// 정답이 2개이상인지
		var multipleCheck = true; // 
		selectInData[thisQuizPage].sort(function (a, b) {
			return a - b;
		});
		for (var w = 0; w < 2; w++) {
			if (answer[thisQuizPage][w] != selectInData[thisQuizPage][w]) {
				multipleCheck = false;
				break;
			}
		}
		if (multipleCheck) {
			//정답
			feedbackOpen(true);
			clickX[thisQuizPage] = answerOk[thisQuizPage] = true;
		} else {
			//오답
			if (quizChance[thisQuizPage] != 0) {
				feedbackOpen(false);
				clickX[thisQuizPage] = true;
			} else {
				playSound('s_false');
				$('.selectCheck').hide();
				$('.checkBtn').hide();
				$('.noAlert').fadeIn(300);
				clearTimeout(reChance);
				reChance = setTimeout(function () {
					$('.noAlert').fadeOut(300);
				}, 600)
				quizChance[thisQuizPage] += 1;
			}
		}
	} else {
		// 정답이 1개인 객관식
		if (answer[thisQuizPage] == selectInData[thisQuizPage]) {
			//정답
			clickX[thisQuizPage] = answerOk[thisQuizPage] = true;
			feedbackOpen(true);
			$('.noAlert1').fadeIn(300);
			clearTimeout(reChance);
			$(this).parent().find('div').eq(answer[thisQuizPage] - 1).addClass("select_over" + answer[thisQuizPage]);
			reChance = setTimeout(function () {
				$('.noAlert1').fadeOut(300);
			}, 600)
		} else {
			//오답
			if (quizChance[thisQuizPage] != 0) {
				clickX[thisQuizPage] = true;
				feedbackOpen(false);
				$('.noAlert3').fadeIn(300);
				clearTimeout(reChance);
				
				reChance = setTimeout(function () {
					$('.noAlert3').fadeOut(300);
				}, 600)
			} else {
				playSound('s_false');
				$('.selectCheck').hide();
				$('.checkBtn').hide();
				$('.noAlert2').fadeIn(300);
				clearTimeout(reChance);
				reChance = setTimeout(function () {
					$('.noAlert2').fadeOut(300);
				}, 600)
				quizChance[thisQuizPage] += 1;
				$('.selectNumIcon1').removeClass("select_over1");
				$('.selectNumIcon2').removeClass("select_over2");
				$('.selectNumIcon3').removeClass("select_over3");
				$('.selectNumIcon4').removeClass("select_over4");
				$('.selectListTxt').removeClass("textcolor");
			}
		}
	}
}

function oxCheck() {
	//console.log(answer, 'answer')
	//console.log(selectInData, 'selectInData')
	// if (answer[thisQuizPage] == "o") {
	//     document.getElementsByClassName('quizEq' + (thisQuizPage + 1))[0].getElementsByClassName('checkImg')[0].style.left = "468px"
	// } else {
	//     document.getElementsByClassName('quizEq' + (thisQuizPage + 1))[0].getElementsByClassName('checkImg')[0].style.left = "663px"
	// }
	// document.getElementsByClassName('quizEq' + (thisQuizPage + 1))[0].getElementsByClassName('checkImg')[0].style.display = "block"
	if(thisQuizPage == 0){
		coin1 = 1;
	}else if(thisQuizPage == 1){
		coin2 = 1;
	}else if(thisQuizPage == 2){
		coin3 = 1;
	}
	if (answer[thisQuizPage] == selectInData[thisQuizPage]) {
		clickX[thisQuizPage] = answerOk[thisQuizPage] = true;
		playSound("s_true")
		$("#resultgif01").show()

		setTimeout(function(){
					$('#resultgif01').fadeOut(300);
		}, 2000)

		// 데이터 넣기 정답
		if(thisQuizPage == 0){
			if(top.bolPorted){
				top.opener.playerChk.contsState("다음 문장이 앞의 대화와 같으면 O, 다르면 X를 고르세요. 나은이는 뉴스를 봤습니다.", answer[thisQuizPage], "선택형", selectInData[thisQuizPage], 100, 1)
				top.opener.playerChk.setPoint('LFC01', 1)
				top.opener.playerChk.setPoint('LFC02', 1)
				setCoin()
			}
		}
		else if(thisQuizPage == 1){
			if(top.bolPorted){
				top.opener.playerChk.contsState("다음 문장이 앞의 대화와 같으면 O, 다르면 X를 고르세요. 세계 곳곳에서 비가 안 오고 있습니다.", answer[thisQuizPage], "선택형", selectInData[thisQuizPage], 100, 1)
				top.opener.playerChk.setPoint('LFC01', 1)
				top.opener.playerChk.setPoint('LFC02', 1)
				setCoin()
			}
		}
		else if(thisQuizPage == 2){
			if(top.bolPorted){
				top.opener.playerChk.contsState("다음 문장이 앞의 대화와 같으면 O, 다르면 X를 고르세요. 바얀의 고향에 비가 너무 많이 왔습니다.", answer[thisQuizPage], "선택형", selectInData[thisQuizPage], 100, 1)
				top.opener.playerChk.setPoint('LFC01', 1)
				top.opener.playerChk.setPoint('LFC02', 1)
				setCoin()
			}
		}
		// 데이터 넣기 정답
		//feedbackOpen(true);
		// $(".preQuizBtn").eq(thisQuizPage).fadeIn();

		$(".nextQuizBtn").eq(thisQuizPage).fadeIn();
	} else {
		clickX[thisQuizPage] = true;
		feedbackOpen(false);
		// 데이터 넣기 오답
		if(thisQuizPage == 0){
			if(top.bolPorted){
				top.opener.playerChk.contsState("다음 문장이 앞의 대화와 같으면 O, 다르면 X를 고르세요. 나은이는 뉴스를 봤습니다.", answer[thisQuizPage], "선택형", selectInData[thisQuizPage], 0, 1)
			}
		}
		else if(thisQuizPage == 1){
			if(top.bolPorted){
				top.opener.playerChk.contsState("다음 문장이 앞의 대화와 같으면 O, 다르면 X를 고르세요. 세계 곳곳에서 비가 안 오고 있습니다.", answer[thisQuizPage], "선택형", selectInData[thisQuizPage], 0, 1)
			}
		}
		else if(thisQuizPage == 2){
			if(top.bolPorted){
				top.opener.playerChk.contsState("다음 문장이 앞의 대화와 같으면 O, 다르면 X를 고르세요. 바얀의 고향에 비가 너무 많이 왔습니다.", answer[thisQuizPage], "선택형", selectInData[thisQuizPage], 0, 1)
			}
		}
		// 데이터 넣기 오답 
	}

}

function inputCheck() {

	//console.log(answer, 'answer')
	//console.log(selectInData, 'selectInData')

	if (answer[thisQuizPage].replace(/(^\s*)|(\s*$)/g, "") == $(".quizEq").eq(thisQuizPage).find('.inputBox input').val().replace(/(^\s*)|(\s*$)/g, "")) {
		clickX[thisQuizPage] = answerOk[thisQuizPage] = true;
		feedbackOpen(true);
		$(".quizEq").eq(thisQuizPage).find('.inputBox input').attr('readonly', true)
	} else {
		if (quizChance[thisQuizPage] != 0) {
			clickX[thisQuizPage] = true;
			feedbackOpen(false);
			$(".quizEq").eq(thisQuizPage).find('.inputBox input').attr('readonly', true)
		} else {
			quizChance[thisQuizPage] += 1;
			playSound('s_false');
			// $('.selectCheck').hide();
			$(".quizEq").eq(thisQuizPage).find('.inputBox input').val('')
			$('.checkBtn').hide();
			$('.noAlert').fadeIn(300);
			clearTimeout(reChance);
			reChance = setTimeout(function () {
				$('.noAlert').fadeOut(300);
			}, 1000)
		}
	}
}


function feedbackOpen(check) {

	if (check) {
		// $('.quizEq').eq(thisQuizPage).find('.titleO').fadeIn();
		// $("#resultgif01").fadeIn()
		// $("#resultgif01").get(0).play();
		// setTimeout(function(){
		// 			$('#resultgif01')[0].style.display='none';
		// }, 4500)
		playSound('s_true');
	} else {
		// $('.quizEq').eq(thisQuizPage).find('.titleX').fadeIn();
		if(thisQuizPage == 0){
			//$(".o_btn").css('background', 'url(./common/quizData/images/o_on.png)')
		}else if(thisQuizPage == 1){
			//$(".x_btn").css('background', 'url(./common/quizData/images/x_on.png)')
		}

		$("#resultgif02").fadeIn()
		setTimeout(function(){
					$('#resultgif02').fadeOut(300);
		}, 2000)
		playSound('s_false');
		if((thisQuizPage+1) == quizCount){
			if(clickX[thisQuizPage] == true){
				console.log("학습 완료");
			}
		}
	}
	// narrupdata = setTimeout((function () {
	// 	playSoundQuizNarr('.././common/quizData/narrSound/' + itostr(Number(curChapStr)) + '/' + itostr(thisQuizPage + 1) + '_gotjf.mp3');
	// }), 1500)
	$(".feedback").eq(thisQuizPage).fadeIn();
	$(".checkBtn").eq(thisQuizPage).fadeOut();
	// $('.quizEq').eq(thisQuizPage).find('.selectListTxt').eq(answer[thisQuizPage] - 1).addClass("textcolor");
	$('.quizEq').eq(thisQuizPage).find('.answerCheck').eq(answer[thisQuizPage] - 1).show();
	//var temp = $('.quizEq').eq(thisQuizPage).find('li').eq(answer[thisQuizPage] - 1).find('div').attr('class').substr(13,1);;
	//$('.quizEq').eq(thisQuizPage).find('li').eq(answer[thisQuizPage] - 1).find('div').addClass("select_over" + temp);
	// $('.selectListTxt').addClass("textcolor");
	if (thisQuizPage == (quizCount - 1)) {
		$(".resultBtn").fadeOut();
	} else {
		// $(".preQuizBtn").eq(thisQuizPage).fadeIn();
		$(".nextQuizBtn").eq(thisQuizPage).fadeIn();
	}
}

function resultSet() {
	// clearTimeout(narrupdata);
	// playSoundQuizNarr('');
	// nmr_nextPageFn(1);
	var totalYes = 0;
	for (i = 0; i < quizCount; i++) {
		if (answerOk[i]) {
			$('.resultView').find('img').eq(i).attr('src', './common/quizData/images/quiz_result_o.png')
			totalYes += 1;
		} else {
			$('.resultView').find('img').eq(i).attr('src', './common/quizData/images/quiz_result_x.png')
		}
	}
	$(".quizCountNum").html(quizCount)
	$(".totalYes").html(totalYes + "")
}

function reQuizStart() {
	// clearTimeout(narrupdata)
	// narrupdata = setTimeout((function () {
	// 	playSoundQuizNarr('.././common/quizData/narrSound/' + itostr(Number(curChapStr)) + '/' + itostr(thisQuizPage + 1) + '_answp.mp3');
	// }), 1500)
	$('.selectListTxt').removeClass("textcolor");
	$('.selectCheck').hide();
	$('.answerCheck').hide();
	thisQuizPage = 0; // 0이 1페이지
	selectInData = [];
	quizChance = [0, 0, 0, 0, 0]; //기회
	answerOk = [false, false, false, false, false];
	clickX = [false, false, false, false, false]; //이미 푼 문제
	$('#resultBox').hide();
	$('#quizDiv').show();
	$('.quizEq').hide();
	$('.quizEq1').show();
	$('.titleO').hide();
	$('.titleX').hide();
	$('.feedback').hide();
	$('.checkBtn').hide();
	$('.nextQuizBtn').hide();
	$('.preQuizBtn').hide();
	$('.selectCheck').hide();
	$('.resultBtn').hide();
	$('.checkImg').hide();
	$('.inputBox input').val('')
	$('.inputBox input').attr('readonly', false)
	$('.o_btn').css('background', 'url(./common/quizData/images/o_non.png)')
	$('.x_btn').css('background', 'url(./common/quizData/images/x_non.png)')
	$('.selectNumIcon1').removeClass("select_over1");
	$('.selectNumIcon2').removeClass("select_over2");
	$('.selectNumIcon3').removeClass("select_over3");
	$('.selectNumIcon4').removeClass("select_over4");
	//$('.selectNumIcon1').css('background-image', 'url(./common/quizData/images/num1.png)')
	//$('.selectNumIcon2').css('background-image', 'url(./common/quizData/images/num2.png)')
	//$('.selectNumIcon3').css('background-image', 'url(./common/quizData/images/num3.png)')
	//$('.selectNumIcon4').css('background-image', 'url(./common/quizData/images/num4.png)')
}



function quizMake(Number) {
	var elemQuizEq = document.createElement('div');
	var elemQuizContent = document.createElement('div');
	var resultgif = document.createElement('div');

	elemQuizEq.className = "quizEq quizEq" + (Number + 1);
	elemQuizContent.className = "quizContent";
	resultgif.className = "resultgif";

	$(elemQuizContent).append("<div class='titleTopBox'></div><div class='quizTitleDiv'><span class='titleNum'></span><div class='quizTitleWarp'><h2 class='quizTitle'>" + quizTitleTxt[Number].replace(/@@/gi, "<span class='titleBold'>").replace(/##/gi, "</span>") + "</h2></div><div class='quizaddtitle'>"+ addquiztitle[Number] +"</div> </div><div class='titleLine'></div><div class='contentBox'></div>")
	$(resultgif).append("<img id ='resultgif01' src='./common/quizData/answer.gif'/><img id ='resultgif02' src='./common/quizData/wrong.gif'/>")
	$(resultgif).append("<img class='Question' src='./common/css/img/contents/Question.png' title='퀘스천박스' alt='퀘스천박스'/>")


	$(".quizaddtitle").attr("alt",addquiztitle[thisQuizPage])
	$(".quizaddtitle").attr("title",addquiztitle[thisQuizPage])
	$(".quizTitle").attr("alt",quizTitleTxt[thisQuizPage])
	$(".quizTitle").attr("title",quizTitleTxt[thisQuizPage])
	if (quizType[Number] == "A") {
		$(elemQuizContent).append(selectMake(Number));
	} else if (quizType[Number] == "B") {
		$(elemQuizContent).append(oxMake(Number));
	} else if (quizType[Number] == "C") {
		$(elemQuizContent).append(inputMake(Number));
	}

	$(elemQuizContent).append("<span class='checkBtn'></span>");
	$(elemQuizContent).append("<span class='preQuizBtn'></span>");
	if ((Number + 1) == quizCount) {
		//마지막 결과보기
		$(elemQuizContent).append("<span class='resultBtn'></span>");
	} else {
		//넥스트
		$(elemQuizContent).append("<span class='nextQuizBtn'></span>");
	}

	//팝업 만들기
    /*var popupBox = document.createElement('div');
    popupBox.className = "popupBox"
    var popup_h2 = document.createElement('h2')
    popup_h2.innerHTML = popupData[Number].title
    var popup_close = document.createElement('span')
    popup_close.className = "popup_close"
    popupBox.appendChild(popup_close)

    popupBox.appendChild(popup_h2)
    try {
        for (var w = 0; w < popupData[Number].content.length; w++) {
            var popup_p = document.createElement('p')
            var popup_dot = document.createElement('span')
            var popup_text = document.createElement('span')
            popup_dot.innerHTML = popupData[Number].content[w].dot
            popup_text.innerHTML = popupData[Number].content[w].text
            popup_p.appendChild(popup_dot)
            popup_p.appendChild(popup_text)
            popupBox.appendChild(popup_p)
        }
    } catch (e) {

    }*/

	//피드백 만들기
	var elemFeedback = document.createElement('div');
	elemFeedback.className = "feedback";
	var feedbackContent = "";
	if (quizType[Number] == "A") {
		//feedbackContent += "<p class='answer'><span>" +answer[Number];
	} else if (quizType[Number] == "B") {
		//feedbackContent += "<p class='answer'><span>" +answer[Number];
	}
	if ($.isArray(answer[Number])) {
		var answerCon = "";
		for (var j = 0; j < answer[Number].length; j++) {
			if (j == 0) {
				answerCon = answer[Number][j]
			} else {
				answerCon = (answerCon + ", " + answer[Number][j])
			}
		}
		feedbackContent += answerCon;
	} else {
		// feedbackContent += answer[Number];
	}
	feedbackContent += "</span></p>";

	feedbackContent += ("<img class = 'feedback_line' style = 'position : absolute; left : 5px; top : -16px;' src = './common/quizData/images/feedback_line.png'><p class='commentary'>" + "<span>" + explainArr[Number] + "</span>" + "</p>")
	feedbackContent += ("<span class='popupBtn'></span>")
	$(elemFeedback).append(feedbackContent)

	elemQuizEq.appendChild(elemQuizContent);
	elemQuizEq.appendChild(elemFeedback);
	// elemQuizEq.appendChild(popupBox);


	document.getElementById('quizDiv').appendChild(elemQuizEq)
	if(quizmake1 == 0){
		document.getElementById('quizDiv').appendChild(resultgif)
	}
	quizmake1 ++;

}

function selectMake(Number) {
	var thisSelectList = selectList[Number];
	var elemSelectBox = document.createElement('ul');
	elemSelectBox.className = "selectBox";
	for (var i = 0; i < thisSelectList.length; i++) {
		$(elemSelectBox).append("<li>" +
			"<div class='selectNumIcon" + (i + 1) + "'></div>" +
			"<span class='selectListTxt'>" + thisSelectList[i] + "</span>" +
			// "<img src='./common/quizData/images/check.png' class='selectCheck'>" +
			"<img src='./common/quizData/images/listcheck.png' class='answerCheck'>" +

			"</li>"
		)
	}
	return elemSelectBox;
}

function oxMake(Number) {
	var elemBtnBox = document.createElement('div')
	var elemObtn = document.createElement('span')
	var elemXbtn = document.createElement('span')
	var elemCheck = document.createElement('img')
	// elemCheck.src = "./common/quizData/images/check.png"
	elemCheck.className = "checkImg"
	elemBtnBox.className = "oxBox"

	elemObtn.className = "o_btn"
	elemObtn.setAttribute('alt','O버튼');
	elemObtn.setAttribute('title','O버튼');

	elemXbtn.className = "x_btn"
	elemXbtn.setAttribute('alt','X버튼');
	elemXbtn.setAttribute('title','X버튼');

	elemBtnBox.appendChild(elemCheck)
	elemBtnBox.appendChild(elemObtn)
	elemBtnBox.appendChild(elemXbtn)
	return elemBtnBox;
}

function inputMake(Number) {
	var elemInputBox = document.createElement('div')
	var elemExample = document.createElement('div')
	var elemInput = document.createElement('input')
	elemInput.type = "text";
	elemInputBox.className = "inputBox";
	elemExample.innerHTML = inputExample[Number]
	elemInputBox.appendChild(elemExample)
	elemInputBox.appendChild(elemInput)
	return elemInputBox;
}
