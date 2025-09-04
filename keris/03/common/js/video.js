
var warpopen = false;

var soundOpen = false;

function videoInit() {
    var videoDesign = document.createElement('div')
    var videoDesignLine = document.createElement('span')
    videoDesign.className = "videoDesign"
    videoDesignLine.className = "videoDesignLine"
    videoDesign.appendChild(videoDesignLine)
    var timeWarpBox = document.createElement('div')
    timeWarpBox.className = "timeWarpBox"
    var timebox = document.createElement('div')
    var timeBtn = document.createElement('span');
    timeBtn.className = "timeBtn";
    timeBtn.innerHTML = "목<br>록"
    for (var i = 0; i < videoWarpData.length; i++) {
        var timeWarp = document.createElement('span')
        timeWarp.className = "timeWarp"
        timeWarp.innerHTML = videoWarpData[i]
        $(timeWarp).attr('warpTime', videoWarpTime[i])
        timebox.appendChild(timeWarp)
    }
    timebox.appendChild(timeBtn)
    timeWarpBox.appendChild(timebox)
    $('#videoCon').append(timeWarpBox)
    $('#videoCon').append(videoDesign)
    $('.timeWarp').on('click', function () {
        Player.currentTime = $(this).attr('warpTime')
        setPlay()
    })
    $('.timeBtn').on('click', function () {
        warpopen = !warpopen;
        if (warpopen) {
            $('.timeWarpBox > div').css('left', 460)
        } else {
            $('.timeWarpBox > div').css('left', 780)
        }
    })


    var soundBox = document.createElement('div')
    var soundMinus = document.createElement('span')
    var soundPlus = document.createElement('span')
    var soundText = document.createElement('span')
    soundBox.className = "soundBox"
    soundMinus.className = "soundMinus"
    soundMinus.onclick = soundMinusFn
    soundPlus.className = "soundPlus"
    soundPlus.onclick = soundPlusFn
    soundText.className = "soundText"
    if (document.cookie.indexOf("volume") == -1) {
        soundText.innerHTML = Math.round(volume * 100)
    } else {
        volume = Number(getCookie('volume'))
        soundText.innerHTML = Math.round(getCookie('volume') * 100)
    }
    soundMinus.innerHTML = "-"
    soundPlus.innerHTML = "+"
    soundBox.appendChild(soundMinus)
    soundBox.appendChild(soundPlus)
    soundBox.appendChild(soundText)



    var videoControl = document.createElement('div')
    var vPlay_btn = document.createElement('span')
    var vStop_btn = document.createElement('span')
    var vReplay_btn = document.createElement('span')
    var vSound_btn = document.createElement('span')
    var vMp3_btn = document.createElement('span')
    var vDown_btn = document.createElement('span')
    var vfull_btn = document.createElement('span')
    var vfullClose_btn = document.createElement('span')
    videoControl.appendChild(soundBox)
    videoControl.className = "videoControl"
    vPlay_btn.className = "vPlay_btn videoBtn"
    vStop_btn.className = "vStop_btn videoBtn"
    vReplay_btn.className = "vReplay_btn videoBtn"
    vSound_btn.className = "vSound_btn videoBtn"
    vMp3_btn.className = "vMp3_btn videoBtn"
    vDown_btn.className = "vDown_btn videoBtn"
    vfull_btn.className = "vfull_btn videoBtn"
    vfullClose_btn.className = "vfullClose_btn videoBtn"
    vPlay_btn.onclick = playPause;
    vStop_btn.onclick = playPause;
    vReplay_btn.onclick = replayBtn;
    vMp3_btn.onclick =vMp3_btnFn
    vDown_btn.onclick =vDown_btnFn
    vfull_btn.onclick = nmr_fullScreenOnFn;
    vfullClose_btn.onclick = nmr_fullScreenOffFn;
    vSound_btn.onclick = vSound_btnFn
    videoControl.appendChild(vPlay_btn)
    videoControl.appendChild(vStop_btn)
    videoControl.appendChild(vReplay_btn)
    videoControl.appendChild(vSound_btn)
    videoControl.appendChild(vMp3_btn)
    videoControl.appendChild(vDown_btn)
    videoControl.appendChild(vfull_btn)
    videoControl.appendChild(vfullClose_btn)
    var footerStr = '';
    footerStr += '		<div class="time"> ';//시간
    footerStr += '			<ul class="cf"> ';
    footerStr += '				<li class="time_cur"> 00:00 </li> ';
    footerStr += '				<li> &nbsp;/ &nbsp; </li>';
    footerStr += '				<li class="time_tol"> 00:00 </li> ';
    footerStr += '			</ul> ';
    footerStr += '		</div> ';

    footerStr += '		<div class="slide_video"> ';//슬라이드 바
    footerStr += '			<div class="slide_inner_video"> ';
    footerStr += '				<p class="slide_bg_video" id="slide_bg_video"><span class="slide_current_video"></span></p> ';
    footerStr += '			</div> ';
    footerStr += '		</div> ';
    $('#videoCon').append(videoControl)
    $('.videoControl').append(footerStr)

    if ((Math.floor(volume * 10) / 10) <= 0) {
        $('.videoControl .vSound_btn').css('background', 'url(.././common/css/img/video/sound0003.png)')
    }
}

function soundPlusFn() {
    if ((Math.floor(volume * 10) / 10) >= 1) {
        return;
    }
    if (document.cookie.indexOf("volume") == -1) {
        volume += 0.1;
        nmr_setVol(volume)
        // document.cookie = "volume=" + volume;//쿠키에 저장        
    } else {
        volume += 0.1;
        nmr_setVol(volume)
        // document.cookie = "volume=" + volume;//쿠키에 저장        
    }
    document.getElementsByClassName("soundText")[0].innerHTML = Math.round(volume * 100)
    $('.videoControl .vSound_btn').css('background', 'url(.././common/css/img/video/sound0002.png)')
}

function soundMinusFn() {
    if ((Math.floor(volume * 10) / 10) <= 0) {
        return;
    }
    if (document.cookie.indexOf("volume") == -1) {
        volume -= 0.1;
        nmr_setVol(volume)

        // document.cookie = "volume=" + volume;//쿠키에 저장        
    } else {
        volume -= 0.1;
        nmr_setVol(volume)
        // document.cookie = "volume=" + volume;//쿠키에 저장        
    }
    if ((Math.floor(volume * 10) / 10) <= 0) {
        $('.videoControl .vSound_btn').css('background', 'url(.././common/css/img/video/sound0003.png)')
    }
    document.getElementsByClassName("soundText")[0].innerHTML = Math.round(volume * 100)
}

function vSound_btnFn() {
    if (!soundOpen) {
        soundOpen = !soundOpen;
        $('.soundBox').show();
        if ((Math.floor(volume * 10) / 10) <= 0) {
            $('.videoControl .vSound_btn').css('background', 'url(.././common/css/img/video/sound0003.png)')
        } else {
            $('.videoControl .vSound_btn').css('background', 'url(.././common/css/img/video/sound0002.png)')
        }
    } else {
        soundOpen = !soundOpen;
        $('.soundBox').hide();
        if ((Math.floor(volume * 10) / 10) <= 0) {
            $('.videoControl .vSound_btn').css('background', 'url(.././common/css/img/video/sound0003.png)')
        } else {
            $('.videoControl .vSound_btn').css('background', 'url(.././common/css/img/video/sound0001.png)')
        }
    }
}

function vMp3_btnFn() {
    location.href = ".././common/down/mp3_" + itostr(curChasi) + ".zip";
}
function vDown_btnFn() {
    location.href = ".././common/down/note_" + itostr(curChasi) + ".zip";
}