var tabindex = 2;
var timeLine = []
var langNo = 1;
document.cookie = "language";
document.cookie = "langToggle"; //1:보임 0:안보임
document.cookie = "Userlanguage = 4"; // 1:한국어 2:영어 3:중국어 4:베트남어 5:러시아어 6:캄보디아어
var userlangNo = 0;
var langcookie = Number(getCookie("language"));
var langToggle = Number(getCookie("langToggle"));
var speakerbtntoggle = 0;

//차시명
var chasiName = "02. 이건 뭐예요?"

var bookmarkMenu = [
	{
		"name": "button1",
		"pageWarp": 2,
	},
	{
		"name": "button2",
		"pageWarp": 3,
	},
	{
		"name": "button3",
		"pageWarp": 9,
	},
	{
		"name": "button4",
		"pageWarp": 12,
	},
]


/** 메뉴 세팅 **/
function setIndex() {
	if(top.bolPorted){
		userlangNo = top.opener.playerChk.trans_lang;
	}else{
		userlangNo = Number(getCookie("Userlanguage"));
	}
	function makeIndexBookmark() {
		var uiIndexBookmark = document.getElementById("fs-index");
		var indexdiv = document.createElement('div')
		// var indexclassName = document.createElement('p')
		var indexTab = document.createElement('p')
		var languagebtn = document.createElement('p')
		
		uiIndexBookmark.style.display = "block"
		// uiIndexBookmark.style.top = "-76px"
		indexdiv.className = 'indexdiv'
		// indexclassName.innerHTML = chasiName;
		// indexclassName.style.display = "block";
		// indexclassName.style.width = "103px";
		// indexclassName.style.height = "37px";
		// indexclassName.className = 'classname';
		indexTab.className = 'index'
		indexTab.onclick = indexBookmarkToggle;
		languagebtn.className = 'languagebtn'
	
		uiIndexBookmark.appendChild(indexdiv)
		indexdiv.appendChild(indexTab)
		// indexdiv.appendChild(indexclassName)
		// indexdiv.appendChild(languagebtn)

		//언어 변경버튼
		var topmenu = document.createElement('div')
		var speaker = document.createElement('div')
		var speakerbtn = document.createElement('div')
		var languageSel = document.createElement('div')
		var langselectKOR = document.createElement('div')
		var langselectENG = document.createElement('div')
		var langselectCHI = document.createElement('div')
		var langselectVIE = document.createElement('div')
		var langselectRUS = document.createElement('div')
		var langselectCAM = document.createElement('div')

		topmenu.className='topmenu'
		speaker.className='speaker'
		speakerbtn.className='speakerbtn'
		languageSel.className='languageSel'
		langselectKOR.className='KOR langs'
		langselectENG.className='ENG langs'
		langselectCHI.className='CHI langs'
		langselectVIE.className='VIE langs'
		langselectRUS.className='RUS langs'
		langselectCAM.className='CAM langs'

		langselectKOR.onclick = kor;
		langselectENG.onclick = eng;
		langselectCHI.onclick = chi;
		langselectVIE.onclick = vet;
		langselectRUS.onclick = rus;
		langselectCAM.onclick = cam;

		langselectKOR.innerHTML = '초기화';

		indexdiv.appendChild(topmenu)
		topmenu.appendChild(speaker)
		speaker.appendChild(speakerbtn)
		topmenu.appendChild(languageSel)
		languageSel.appendChild(langselectKOR)
		languageSel.appendChild(langselectENG)
		languageSel.appendChild(langselectCHI)
		languageSel.appendChild(langselectVIE)
		languageSel.appendChild(langselectRUS)
		languageSel.appendChild(langselectCAM)

		if(top.bolPorted){
			if(userlangNo == "KR"){
				$(".KOR").show()
			}
			else if(userlangNo == "EN"){
				$(".ENG").show()
			}
			else if(userlangNo == "ZH"){
				$(".CHI").show()
			}
			else if(userlangNo == "VI"){
				$(".VIE").show()
			}
			else if(userlangNo == "RU"){
				$(".RUS").show()
			}
			else if(userlangNo == "KM"){
				$(".CAM").show()
			}
		}else{
			if(userlangNo == 1){
				$(".KOR").show()
			}
			else if(userlangNo == 2){
				$(".ENG").show()
			}
			else if(userlangNo == 3){
				$(".CHI").show()
			}
			else if(userlangNo == 4){
				$(".VIE").show()
			}
			else if(userlangNo == 5){
				$(".RUS").show()
			}
			else if(userlangNo == 6){
				$(".CAM").show()
			}
		}
				//언어변경 버튼
		var bgsound = document.createElement('div')
		var bgsound_on = document.createElement('div')
		var bgsound_off = document.createElement('div')
		bgsound.className='bgsound'
		bgsound_off.className='bgsound_off'
		bgsound_on.className='bgsound_on'
		topmenu.appendChild(bgsound)
		bgsound.appendChild(bgsound_off)
		bgsound.appendChild(bgsound_on)

		$(".bgsound_off").on("click",function(){
			playSound2("indie_loop");
			$(".bgsound_off").hide();
			$(".bgsound_on").show();
		})
		$(".bgsound_on").on("click",function(){
			playSoundStop("indie_loop");
			$(".bgsound_on").hide();
			$(".bgsound_off").show();
		})
		//언어변경 함수모음
		//한국어S

		function kor() {
			if(langNo == 1){
				langNo = 1;
				document.cookie = "language= 1";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 1";
				langToggle = Number(getCookie("langToggle"));
			}else{
				langNo = 1;
				document.cookie = "language= 1";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 0";
				langToggle = Number(getCookie("langToggle"));
			}
		}
		function eng() {
			if(langNo == 1){
				langNo = 2;
				document.cookie = "language= 2";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 1";
				langToggle = Number(getCookie("langToggle"));
				$(".ENG").css("background","url(./common/css/img/top/glocalization_red.png)")
				$(".ENG").css("background-size","70px")
				$(".speakerbtn").css("background","url(./common/css/img/top/speaker_red.png)")
				$(".speakerbtn").css("background-size","70px")
				speakerbtntoggle = 1;
			}else{
				langNo = 1;
				document.cookie = "language= 1";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 0";
				langToggle = Number(getCookie("langToggle"));
				$(".ENG").css("background","url(./common/css/img/top/glocalization.png)")
				$(".ENG").css("background-size","70px")
				$(".speakerbtn").css("background","url(./common/css/img/top/speaker.png)")
				$(".speakerbtn").css("background-size","70px")
				speakerbtntoggle = 0;
			}
		}
		function chi() {
			if(langNo == 1){
				langNo = 3;
				document.cookie = "language= 3";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 1";
				langToggle = Number(getCookie("langToggle"));
				$(".CHI").css("background","url(./common/css/img/top/glocalization_red.png)")
				$(".CHI").css("background-size","70px")
				$(".speakerbtn").css("background","url(./common/css/img/top/speaker_red.png)")
				$(".speakerbtn").css("background-size","70px")
				speakerbtntoggle = 1;
			}else{
				langNo = 1;
				document.cookie = "language= 1";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 0";
				langToggle = Number(getCookie("langToggle"));
				$(".CHI").css("background","url(./common/css/img/top/glocalization.png)")
				$(".CHI").css("background-size","70px")
				$(".speakerbtn").css("background","url(./common/css/img/top/speaker.png)")
				$(".speakerbtn").css("background-size","70px")
				speakerbtntoggle = 0;
			}
		}
		function vet() {
			if(langNo == 1){
				langNo = 4;
				document.cookie = "language= 4";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 1";
				langToggle = Number(getCookie("langToggle"));
				$(".VIE").css("background","url(./common/css/img/top/glocalization_red.png)")
				$(".VIE").css("background-size","70px")
				$(".speakerbtn").css("background","url(./common/css/img/top/speaker_red.png)")
				$(".speakerbtn").css("background-size","70px")
				speakerbtntoggle = 1;
			}else{
				langNo = 1;
				document.cookie = "language= 1";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 0";
				langToggle = Number(getCookie("langToggle"));
				$(".VIE").css("background","url(./common/css/img/top/glocalization.png)")
				$(".VIE").css("background-size","70px")
				$(".speakerbtn").css("background","url(./common/css/img/top/speaker.png)")
				$(".speakerbtn").css("background-size","70px")
				speakerbtntoggle = 0;
			}
		}
		function rus() {
			if(langNo == 1){
				langNo = 5;
				document.cookie = "language= 5";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 1";
				langToggle = Number(getCookie("langToggle"));
				$(".RUS").css("background","url(./common/css/img/top/glocalization_red.png)")
				$(".RUS").css("background-size","70px")
				$(".speakerbtn").css("background","url(./common/css/img/top/speaker_red.png)")
				$(".speakerbtn").css("background-size","70px")
				speakerbtntoggle = 1;
			}else{
				langNo = 1;
				document.cookie = "language= 1";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 0";
				langToggle = Number(getCookie("langToggle"));
				$(".RUS").css("background","url(./common/css/img/top/glocalization.png)")
				$(".RUS").css("background-size","70px")
				$(".speakerbtn").css("background","url(./common/css/img/top/speaker.png)")
				$(".speakerbtn").css("background-size","70px")
				speakerbtntoggle = 0;
			}
		}
		function cam() {
			if(langNo == 1){
				langNo = 6;
				document.cookie = "language= 6";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 1";
				langToggle = Number(getCookie("langToggle"));
				$(".CAM").css("background","url(./common/css/img/top/glocalization_red.png)")
				$(".CAM").css("background-size","70px")
				$(".speakerbtn").css("background","url(./common/css/img/top/speaker_red.png)")
				$(".speakerbtn").css("background-size","70px")
				speakerbtntoggle = 1;
			}else{
				langNo = 1;
				document.cookie = "language= 1";
				langcookie = Number(getCookie("language"));
				document.cookie = "langToggle = 0";
				langToggle = Number(getCookie("langToggle"));
				$(".CAM").css("background","url(./common/css/img/top/glocalization.png)")
				$(".CAM").css("background-size","70px")
				$(".speakerbtn").css("background","url(./common/css/img/top/speaker.png)")
				$(".speakerbtn").css("background-size","70px")
				speakerbtntoggle = 0;
			}
		}
		
		window.addEventListener('load', function(){
			document.cookie = "langToggle = 0";
			langToggle = Number(getCookie("langToggle"));
			lengshowhide();
		})
		function lengshowhide(){
			if(langToggle == 1){
				$('.textbox > span').css("display","block")
			}else{
				$('.textbox > span').css("display","none")
			}
		}
		//한국어
		//영어
		//영어
		//중국어
		
		//언어변경 함수모음


		// for (var i = 0; i < bookmarkMenu.length; i++) {
		// 	var p = document.createElement("button")
		// 	// p.innerHTML = bookmarkMenu[i]["name"];
		// 	p.onclick = gotoTimeLine;
		// 	p.className = 'main-index' + ' ' + 'main-index'+(i+1)
		// 	p.setAttribute("pageWarp", bookmarkMenu[i]["pageWarp"])
		// 	tabindex = tabindex+1;
		// 	p.setAttribute('tabindex', tabindex)

		// 	p.onfocus = function(){this.style.outline = '#fff solid 2px';}
		// 	$(p).on('focusout', function(){this.style.outline = 'none'})

		// 	indexdiv.appendChild(p)
		// 	if (true) { //학습하기 페이지만 리스트 오픈
		// 		if (bookmarkMenu[i]["subBookmarkName"]) {
		// 			timeLine.push(-1)
		// 			for (var j = 0; j < bookmarkMenu[i]["subBookmarkName"].length; j++) {
		// 				var span = document.createElement("button")
		// 				span.className = 'sub-index';
		// 				span.onclick = gotoTimeLine;
		// 				span.innerHTML = bookmarkMenu[i]["subBookmarkName"][j]["name"];
		// 				span.setAttribute("time", bookmarkMenu[i]["subBookmarkName"][j]["time"])
		// 				span.setAttribute("pageWarp", bookmarkMenu[i]["subBookmarkName"][j]["pageWarp"])
		// 				timeLine.push(bookmarkMenu[i]["subBookmarkName"][j]["time"])
		// 				tabindex = tabindex + 1;
		// 				span.setAttribute('tabindex', tabindex)

		// 				span.onfocus = function(){this.style.outline = '#fff solid 2px';}
		// 				$(span).on('focusout', function(){this.style.outline = 'none'}) 

		// 				uiIndexBookmark.appendChild(span)
		// 			}
		// 		} else {
		// 			p.setAttribute("pageWarp", bookmarkMenu[i]["pageWarp"])
		// 			p.setAttribute("time", bookmarkMenu[i]["time"])
		// 			timeLine.push(bookmarkMenu[i]["time"])
		// 		}
		// 	} else {
		// 		p.setAttribute("pageWarp", bookmarkMenu[i]["pageWarp"])
		// 		p.setAttribute("time", bookmarkMenu[i]["time"])
		// 		timeLine.push(bookmarkMenu[i]["time"])
		// 	}
		// }
		setindexBookmarkActive();
	}
	makeIndexBookmark();

	function setindexBookmarkActive(event) {
		var uiIndexBookmark = document.getElementById("fs-index");
		// var uiIndexBookmarkP = uiIndexBookmark.getElementsByTagName('p'); // 제목
		// var uiIndexBookmarkS = uiIndexBookmark.getElementsByTagName('span'); // 소제목
		var uiIndexBookmarkP = uiIndexBookmark.getElementsByClassName('main-index'); // 제목
		var uiIndexBookmarkS = uiIndexBookmark.getElementsByClassName('sub-index'); // 소제목

		var tihsPageNumber = Number(currentSceneNumber);
		// for (var i = uiIndexBookmarkP.length - 1; 0 <= i; i--) {
		// 	if (tihsPageNumber >= Number(uiIndexBookmarkP[i].getAttribute('pageWarp'))) {
		// 		uiIndexBookmarkP[i].setAttribute("class", "main-index ui-bookmark-active");
		// 		break;
		// 	}
		// }
		// for (var j = uiIndexBookmarkS.length - 1; 0 <= j; j--) {
		// 	if (tihsPageNumber >= Number(uiIndexBookmarkS[j].getAttribute('pageWarp'))) {
		// 		uiIndexBookmarkS[j].setAttribute("class", "sub-index ui-bookmark-active");
		// 		break;
		// 	}
		// }
	}

}

function indexBookmarkToggle() {

	var uiIndexBookmark = document.getElementById("fs-index");
	var indexTab = document.getElementsByClassName('index')[0]
	

	if (uiIndexBookmark.getAttribute("showing") == "false") {
		uiIndexBookmark.setAttribute("showing", true)
		//uiIndexBookmark.animate({'top': '0px'}, 500)
		uiIndexBookmark.style.top = "0px"
		$('.index').removeClass('menuoff');
		$('.index').addClass('menuon');
		$('.langSelectBox').show()

	} else if (uiIndexBookmark.getAttribute("showing") == "true"){
		uiIndexBookmark.setAttribute("showing", false)
		//uiIndexBookmark.animate({'top': '-76px'}, 500)
		uiIndexBookmark.style.top = "-76px"
		$('.index').removeClass('menuon');
		$('.index').addClass('menuoff');
		$('.langSelectBox').hide()
	}
}

function gotoTimeLine() {
	var pageWarp = this.getAttribute("pageWarp");
	var time = this.getAttribute("time");

	if (pageWarp != null) {
		if (currentSceneNumber != pageWarp) {
			// _targetUrl = itostr(curChasi) + '01_' + itostr(Number(pageWarp)) + '.html'
			_targetUrl = itostr(Number(pageWarp)) + '.html'
			NextMove(_targetUrl, false);
			// nmr_movePage(pageWarp);
		}
	}

	if (time == null) {
		time = this.nextSibling.getAttribute("time")
	}

	//nmr_pauseFn();
	Player.currentTime = time;
	nmr_playFn();

}
