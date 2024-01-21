var w_h;
var w_w;
var container1_scale = 1;
var container2_scale = 1;
var container3_scale = 1;

window.onload = function () {
	responsive();
}

/** resizing **/
$(window).resize(function (e) {
    // console.log("아오 페리시치")
	responsive();
    // console.log(container2_scale)
});

/** 모바일 화면 돌릴때 **/
$(window).on("orientationchange", function (event) {
	responsive();
});

$(function(){
    //PC 클릭시 스크롤 이벤트
    $(".Pscreensc").click(function(){
        $(".Pscreensc>img").removeAttr("style"),
        $(".Pscreensc>img").stop().animate({
            bottom:"0"
        },1500)
    })
    //PC 마우스아웃시 스크롤 복구
    $(".Pscreensc").mouseout(function(){
        $(".Pscreensc>img").stop().animate({
            top:"0"
        },1500)
    })
    //IPAD 클릭시 스크롤 이벤트
    $(".Iscreensc").click(function(){
        $(".Iscreensc>img").removeAttr("style"),
        $(".Iscreensc>img").stop().animate({
            bottom:"0"
        },1500)
    })
    //IPAD 마우스아웃시 스크롤 복구
    $(".Iscreensc").mouseout(function(){
        $(".Iscreensc>img").stop().animate({
            top:"0"
        },1500)
    })
    //MOBILE 클릭시 스크롤 이벤트
    $(".Mscreensc").click(function(){
        $(".Mscreensc>img").removeAttr("style"),
        $(".Mscreensc>img").stop().animate({
            bottom:"0"
        },1500)
    })
    //MOBILE 마우스아웃시 스크롤 복구
    $(".Mscreensc").mouseout(function(){
        $(".Mscreensc>img").stop().animate({
            top:"0"
        },1500)
    })
})

//반응형 scale 조정
function responsive() {
	w_h = $('.fp-tableCell').height();
	w_w = $('.fp-tableCell').width();

    //1구역
    var h1_scale = w_h / 300;
	var w1_scale = w_w / 960;
    //2구역
    var h2_scale = w_h / 780;
	var w2_scale = w_w / 1500;
    //3구역
    var h3_scale = w_h / 1150;
	var w3_scale = w_w / 1280;

    //배율 조정
	container1_scale = (w1_scale * 0.5);
	container2_scale = (w2_scale * 0.79);
	container3_scale = (w3_scale * 0.5);
    


    $(".intro").css("transform", 'scale(' + container1_scale + ',' + container1_scale + ')')
    $('.intro').css('left', "50%");
    $('.intro').css('top', "50%");
	$('.intro').css('margin-top', container1_scale * -150);
	$('.intro').css('margin-left', container1_scale * -480);

    $(".backgroundBox").css("transform", 'scale(' + container2_scale + ',' + container2_scale + ')')
    $('.backgroundBox').css('left', "50%");
    $('.backgroundBox').css('top', "50%");
	$('.backgroundBox').css('margin-top', container2_scale * -390);
	$('.backgroundBox').css('margin-left', container2_scale * -750);

    $("#Box").css("transform", 'scale(' + container3_scale + ',' + container3_scale + ')')
    $('#Box').css('left', "50%");
    $('#Box').css('top', "50%");
	$('#Box').css('margin-top', container3_scale * -575);
	$('#Box').css('margin-left', container3_scale * -640);
}