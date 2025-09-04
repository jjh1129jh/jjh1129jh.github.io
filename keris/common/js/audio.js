/*
  2023. 08. 01
  Creator : woojung

    오디오 객체
*/
var soundContainerNum = [];

var bgm_volume=1;
var eff_volume=1;
var currentAudioID;

function audio(){
    if(top.bolPorted){
        this.soundPath = top.odpath;
    }
    else{
        this.soundPath = "./media/";
    }
    this.soundType = ".mp3";
}

function audio2(){
    if(top.bolPorted){
        this.soundPath = top.odpath;
    }
    else{
        this.soundPath = "./media/";
    }
    this.soundType = ".mp3";
}

audio.prototype = {
    isEFF:false,
    
    init : function($id,url , completeFn){
        console.log(url);
        this.audio_tag = $('<audio id='+$id+' width="0px" height="0px" >Your browser does not support HTML5 video.</audio>');
        currentAudioID = $id; 
        $("#audioObj").append(this.audio_tag);
        this.audio_tag.controls=false;
        if(url=="chimes" 
           || url=="s_click" 
           || url=="s_true" 
           || url=="s_false" 
           || url=="click"
           || url=="drag_ok"
           || url=="drag_no"
           || url=="over"
        ){
            isEFF=true;
        }else{
            isEFF=false;
        }
        this.getSrc($id,url, completeFn);
    },

    getSrc : function($id, $url, completeFn){
        var path = this.soundPath + $url + this.soundType;
        var id = document.getElementById($id)
        id.src = path;
        //id.play();
        $(this.audio_tag).on("ended", function (e) {
            $(e.target).remove();
            soundContainerNum.pop();            
        });
        
        $(this.audio_tag).on("canplay", function (e) {
            console.log("canplay!!");
            if(completeFn){
                completeFn();
            }
            _doOnCanplay();
            var _Promise = id.play();
            if(isEFF){
                id.volume = eff_volume;
            }
            console.log("id.volume = "+id.volume+" , eff_volume = "+eff_volume);
            if (_Promise !== undefined) {
                _Promise.then(function(){
                    console.log("11");
                }).catch(function(){
                    console.log("22");
                    $("#audioObj").append('<div id="SoundstartBtn"></div>');
                    $("#SoundstartBtn").on("click",function(){
                        id.play();
                        $("#SoundstartBtn").remove();
                    });
                })
            }
        });
    }
}

audio2.prototype = {
    isBGM:false,
    
    init : function($id,url , completeFn){
        console.log(completeFn);
        this.audio_tag = $('<audio id="loop" width="0px" height="0px" >Your browser does not support HTML5 video.</audio>');
        $("#audioObj").append(this.audio_tag);
        this.audio_tag.controls=false;
        if(url=="indie_loop"){
            isBGM=true;
        }else{
            isBGM=false;
        }
        this.getSrc($id,url, completeFn);
    },

    getSrc : function($id, $url, completeFn){
        var path2 = this.soundPath + $url + this.soundType;
        var id = document.getElementById("loop")
        id.src = path2;
        //id.play();
        $(this.audio_tag).on("ended", function (e) {
            $(e.target).remove();
            soundContainerNum.pop();
            if(completeFn){
                completeFn();
            }
        });
        
        $(this.audio_tag).on("canplay", function (e) {
            console.log("canplay!! // isBGM = "+isBGM);
            _doOnCanplay();
            var _Promise = id.play();
            if(isBGM){
                id.volume = bgm_volume;
            }
            console.log("id.volume = "+id.volume);
            if (_Promise !== undefined) {
                _Promise.then(function(){
                    console.log("11");
                }).catch(function(){
                    console.log("22");
                    if (pageArray[currentSceneNumber][1] == "V1") {
                        $("#audioObj").append('<img id="SoundstartBtn" src="/mr/common/css/img/footer/btn_start.png">');
                        $("#SoundstartBtn").on("click",function(){
                            setPlay();
                            $("#SoundstartBtn").remove();
                        });
                    }
                })
            }
        });
    },
    
}

function _doOnCanplay(){
    
}


// 오디오 플레이어
function writeEffectAudio(){
    console.log("writeEffectAudio!! : "+$("#fs-container").find("#audioObj").length);
    if($("#fs-container").find("#audioObj").length){
        
    }else{
        $("#fs-container").append('<div id="audioObj" ></div>') 
    }
    
    return;
}

function playSoundStop() {
    var audioTags = document.getElementsByTagName('audio')
    //$(audioTags).remove()
    $(audioTags).not("#loop").remove()
    $(".bgsound_on").on("click", function(){
        $("#loop").remove();
    })
}

function playSound(url , completeFn){
    playSoundStop();
    var _audio = new audio();
    soundContainerNum.push(_audio);
    _audio.init("audioPlayer_"+soundContainerNum.length,url , completeFn);
}

function playSound2(url , completeFn){
    var _audio2 = new audio2();
    soundContainerNum.push(_audio2);
    console.log("url = "+url);
    _audio2.init("audioPlayer_"+soundContainerNum.length,url , completeFn);
}