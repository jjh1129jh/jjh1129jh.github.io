var orgThisPage = 1;

function trunCheck(num) {
  for (var w = 0; w < pageDivision.length; w++) {
    if (pageDivision[w] == num || num == 0) {
      return true
    }
  }
  return false;
}
function trunCheck2(num) {
  for (var w = 0; w < pageDivision.length; w++) {
    if (pageDivision[w] == num) {
      return true
    }
  }
  return false;
}

function organizeInit(){
  var elemDatadiv = document.createElement('div')
  elemDatadiv.className = "printdiv";
  document.getElementsByClassName('printBox')[0].appendChild(elemDatadiv) 

  var elemDataEq = document.createElement('div');
  elemDataEq.className = 'printEq';

  var elemTitleImg = document.createElement('img')
  elemDataEq.className = "printEq";
  elemTitleImg.classList = "orgTitleImg";
  elemTitleImg.src = './common/css/img/top/chasi_' + itostr(curChasi) +'.png';




//디지털그리기1
  var canvas1 = document. getElementById ( "myCanvas1" );
  var context1 = canvas1. getContext ( "2d" );
  context1.lineWidth = 5 ;
  context1.lineCap = "round";
  context1.lineJoin = "round";
  //var context2 = canvas2. getContext ( "2d" );
  //canvas에 mousedown 이벤트 추가 : 이벤트 발생시 mDown 호출
  canvas1. addEventListener ( "mousedown" , function (canvas1) {
  mDown (canvas1)}, false );
  //canvas에 mousemove 이벤트 추가 : 이벤트 발생시 mMove 호출
  canvas1. addEventListener ( "mousemove" , function (canvas1) {
  mMove (canvas1)}, false );
  //canvas에 mouseup 이벤트 추가 : 이벤트 발생시 : mUp 호출
  canvas1. addEventListener ( "mouseup" , function (canvas1) {
  mUp (canvas1)}, false ); 
  //canvas에 mouseout 이벤트 추가 : 이벤트 발생시 mOut 호출
  canvas1. addEventListener ( "mouseout" , function (canvas1) {
  mOut (canvas1)}, false );

  //처음 마우스 X좌표
  var stX =0;

  //처음 마우스 Y좌표
  var stY =0;

  //마우스를 캔버스에서 움직였을 때 그림 그리기 여부
  var drag = false ;
  function mDown(me){
    stX = me. offsetX ; //눌렀을 때 현재 마우스 X좌표를 stX에 담음
    stY = me. offsetY ; //눌렀을 때 현재 마우스 Y좌표를 stY에 담음
    drag = true ; //그림 그리기는 그리는 상태로 변경
  }
  function mMove(me){
    //drag가 false 일때는 return(return 아래는 실행 안함)
    if (!drag){
      return ;
    }
  //마우스를 움직일 때마다 X좌표를 nowX에 담음
    var nowX = me. offsetX ;

  //마우스를 움직일 때마다 Y좌표를 nowY에 담음
    var nowY = me. offsetY ;

  //실질적으로 캔버스에 그림을 그리는 부분
    canvasDraw (nowX,nowY);

  //마우스가 움직일때마다 X좌표를 stX에 담음
    stX = nowX;

  //마우스가 움직일때마다 Y좌표를 stY에 담음
    stY = nowY;
  }
  function canvasDraw(currentX,currentY){
    context1. beginPath ();
    //context2. beginPath ();

    //마우스를 누르고 움직일 때마다 시작점을 재지정
    context1. moveTo (stX,stY);
    //context2. moveTo (stX,stY);

    //마우스 시작점부터 현재 점까지 라인 그리기
    context1. lineTo (currentX,currentY);
    //context2. lineTo (currentX,currentY);

    context1. stroke ();
    //context2. stroke ();
  }
  
  function mUp(me){
    drag = false ; //마우스를 떼었을 때 그리기 중지
  }

  function mOut(me){
    drag = false ; //마우스가 캔버스 밖으로 벗어났을 때 그리기 중지
  }

  //모바일

  canvas1.addEventListener("touchstart", function (e) {
  mousePos = getTouchPos(canvas1, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
  clientX: touch.clientX,
  clientY: touch.clientY
  });
  canvas1.dispatchEvent(mouseEvent);
  }, false);
  canvas1.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas1.dispatchEvent(mouseEvent);
  }, false);
  canvas1.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
  clientX: touch.clientX,
  clientY: touch.clientY
  });
  canvas1.dispatchEvent(mouseEvent);
  }, false);
  
  
  function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
  x: touchEvent.touches[0].clientX - rect.left,
  y: touchEvent.touches[0].clientY - rect.top
  };
  }
  
  document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas1) {
  }
  }, false);
  document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas1) {
  }
  }, false);
  document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas1) {
  }
  }, false);
  //모바일
//디지털그리기1

//디지털그리기2
var canvas2 = document. getElementById ( "myCanvas2" );
var context2 = canvas2. getContext ( "2d" );
context2.lineWidth = 5 ;
context2.lineCap = "round";
context2.lineJoin = "round";
//var context2 = canvas2. getContext ( "2d" );
//canvas에 mousedown 이벤트 추가 : 이벤트 발생시 mDown 호출
canvas2. addEventListener ( "mousedown" , function (canvas2) {
mDown2 (canvas2)}, false );
//canvas에 mousemove 이벤트 추가 : 이벤트 발생시 mMove 호출
canvas2. addEventListener ( "mousemove" , function (canvas2) {
mMove2 (canvas2)}, false );
//canvas에 mouseup 이벤트 추가 : 이벤트 발생시 : mUp 호출
canvas2. addEventListener ( "mouseup" , function (canvas2) {
mUp2 (canvas2)}, false ); 
//canvas에 mouseout 이벤트 추가 : 이벤트 발생시 mOut 호출
canvas2. addEventListener ( "mouseout" , function (canvas2) {
mOut2 (canvas2)}, false );

//처음 마우스 X좌표
var stX2 =0;

//처음 마우스 Y좌표
var stY2 =0;

//마우스를 캔버스에서 움직였을 때 그림 그리기 여부
var drag2 = false ;
function mDown2(me2){
  stX2 = me2. offsetX ; //눌렀을 때 현재 마우스 X좌표를 stX에 담음
  stY2 = me2. offsetY ; //눌렀을 때 현재 마우스 Y좌표를 stY에 담음
  drag2 = true ; //그림 그리기는 그리는 상태로 변경
}
function mMove2(me2){
  //drag가 false 일때는 return(return 아래는 실행 안함)
  if (!drag2){
    return ;
  }
//마우스를 움직일 때마다 X좌표를 nowX에 담음
  var nowX2 = me2. offsetX ;

//마우스를 움직일 때마다 Y좌표를 nowY에 담음
  var nowY2 = me2. offsetY ;

//실질적으로 캔버스에 그림을 그리는 부분
  canvasDraw2 (nowX2,nowY2);

//마우스가 움직일때마다 X좌표를 stX에 담음
  stX2 = nowX2;

//마우스가 움직일때마다 Y좌표를 stY에 담음
  stY2 = nowY2;
}
function canvasDraw2(currentX,currentY){
  context2. beginPath ();
  //context2. beginPath ();

  //마우스를 누르고 움직일 때마다 시작점을 재지정
  context2. moveTo (stX2,stY2);
  //context2. moveTo (stX,stY);

  //마우스 시작점부터 현재 점까지 라인 그리기
  context2. lineTo (currentX,currentY);
  //context2. lineTo (currentX,currentY);

  context2. stroke ();
  //context2. stroke ();
}

function mUp2(me){
  drag2 = false ; //마우스를 떼었을 때 그리기 중지
}

function mOut2(me){
  drag2 = false ; //마우스가 캔버스 밖으로 벗어났을 때 그리기 중지
}

//모바일

canvas2.addEventListener("touchstart", function (e) {
mousePos = getTouchPos2(canvas2, e);
var touch = e.touches[0];
var mouseEvent = new MouseEvent("mousedown", {
clientX: touch.clientX,
clientY: touch.clientY
});
canvas2.dispatchEvent(mouseEvent);
}, false);
canvas2.addEventListener("touchend", function (e) {
var mouseEvent = new MouseEvent("mouseup", {});
canvas2.dispatchEvent(mouseEvent);
}, false);
canvas2.addEventListener("touchmove", function (e) {
var touch = e.touches[0];
var mouseEvent = new MouseEvent("mousemove", {
clientX: touch.clientX,
clientY: touch.clientY
});
canvas2.dispatchEvent(mouseEvent);
}, false);


function getTouchPos2(canvasDom, touchEvent) {
var rect = canvasDom.getBoundingClientRect();
return {
x: touchEvent.touches[0].clientX - rect.left,
y: touchEvent.touches[0].clientY - rect.top
};
}

document.body.addEventListener("touchstart", function (e) {
if (e.target == canvas2) {
}
}, false);
document.body.addEventListener("touchend", function (e) {
if (e.target == canvas2) {
}
}, false);
document.body.addEventListener("touchmove", function (e) {
if (e.target == canvas2) {
}
}, false);
//모바일
//디지털그리기2

  //캔버스 지우기
  $('.clearcan').on('click', function(){
    clearCanvas();
    context1.lineWidth = 5 ;
    context1.lineCap = "round";
    context1.lineJoin = "round";
    context2.lineWidth = 5 ;
    context2.lineCap = "round";
    context2.lineJoin = "round";
  })

  function clearCanvas() {
    canvas1.width = canvas1.width;
    canvas2.width = canvas2.width;
}
  //캔버스 지우기


  for(var i = 0; i < orgData.length; i++){
    organizePrintMake(i);
  }
 
  function organizePrintMake(num){
    // $(elemDataEq).prepend(elemTitleImg);

    // if (trunCheck(num)) {
    //   // if (true) {
    //   var elemBGImg = document.createElement('img');
    //   // elemBGImg.src = "./common/organizeData/images/printdesign.png"
    //   elemBGImg.style.position = "absolute";
    //   elemBGImg.style.width = "21cm";
    //   elemBGImg.style.minHeight = "29.7cm";
    //   elemBGImg.style.left = "0"
    //   elemBGImg.style.top = "0"
    //   elemBGImg.style.paddingTop = "-3cm"
    //   elemBGImg.style.zIndex = "-1"
    //   elemDataEq.appendChild(elemBGImg)

    // }

    for(var i = 0; i < orgData[num].length; i++){
      var elemDataListDiv = document.createElement('div')
      elemDataListDiv.className = "dataList";

      var elemListTitle = document.createElement('h3')      
      var elemListTitleText = document.createElement('span')
      elemListTitleText.innerHTML = orgData[num][i].title
      
      $('.dataList').eq(0).prepend(elemTitleImg)

      elemListTitle.appendChild(elemListTitleText)
      elemDataListDiv.appendChild(elemListTitle)
      elemDataListDiv.style.marginTop = "1cm"
      
      if (trunCheck2(num)) {
        console.log(trunCheck2(num));
        // if (true) {
        elemDataListDiv.style.pageBreakBefore = "always";
        elemDataListDiv.style.marginTop = "3cm"
      }

      if(orgData[num][i].content){
        for(var j = 0; j < orgData[num][i].content.length; j++){
          var elemListContent = document.createElement('p');
          elemListContent.style.display = 'table';

          var elemDataText = document.createElement('span');
          elemDataText.className = 'printTxt'
          elemDataText.style.display = 'table-cell';

          if(orgData[num][i].content[j] != ''){
            if(orgData[num][i].content[j].indexOf('♥') != -1){
              //console.log(orgData[num][i].content[j])
              orgData[num][i].content[j] = orgData[num][i].content[j].replace(/♥/g, '');
              orgData[num][i].content[j] = orgData[num][i].content[j].replace(/@@/g, '<span style="font-weight: bold;">');
              orgData[num][i].content[j] = orgData[num][i].content[j].replace(/##/g, '</span>');
              var elemBullet = document.createElement('span');
              // elemBullet.innerText = ' - '
              elemBullet.className = 'textBullet';
            }else{
              orgData[num][i].content[j] = orgData[num][i].content[j].replace(/@@/g, '<span style="font-weight: bold;">');
              orgData[num][i].content[j] = orgData[num][i].content[j].replace(/##/g, '</span>');
              var elemBullet = document.createElement('img');
              elemBullet.src = './common/organizeData/images/bullet.png'
              elemBullet.className = 'bullet';
            }
          }

          elemDataText.innerHTML += orgData[num][i].content[j]
          elemListContent.appendChild(elemBullet);
          elemListContent.appendChild(elemDataText);
          elemDataListDiv.appendChild(elemListContent)
        }
      }

      elemDataEq.appendChild(elemDataListDiv)
    }
    
    elemDatadiv.appendChild(elemDataEq)
  }

  $('.orgDownBtn').on('click', function(){
    alert('프로토에서는 제공되지 않습니다.');
  })

  $('.orgPrintBtn').on('click', function () {
        // alert("개발중");
        var printStyle = "<style>\
        * {\
    \
        box-sizing: border-box;\
        \
        -moz-box-sizing: border-box;\
        \
        }\
        @page {\
    \
          size: A4;\
          \
          margin: 0;\
          \
          }\
          \
          @media print {\
          \
          html, body {\
          \
          width: 210mm;\
          \
          height: 297mm;\
          margin: 0;\
          padding: 0;\
          \
          }\
        \
        .printEq {\
          padding: 1.5cm 1cm;\
          margin-bottom:100px;\
          position: relative; \
        }\
        .printEq .dataList {\
          margin-left: 50px;\
          margin-top: 10px;\
        }\
        .printEq .dataList h3 {\
          word-break: keep-all;\
          word-wrap: break-word;\
          font-size: 24px;\
          line-height: 30px;\
          color: #012f3d;\
          margin-top: 0px;\
          margin-bottom: 0px;\
        }\
        .printEq .dataList h3 img {\
          vertical-align: top;\
          margin-right: 6px;\
          display:inline-block;\
        }\
        .printEq .dataList .bullet {\
          display: inline-block;\
          width: 6px;\
          height: 6px;\
          margin-top: 9px;\
          background-image: url(./common/organizeData/images/bullet2.png);\
          vertical-align: top;\
          margin-right: 4px;\
        }\
        .printEq .dataList .dataText {\
          word-break: keep-all;\
          word-wrap: break-word;\
          display: inline-block;\
          font-size: 18px;\
          width: 600px;\
          line-height: 22px;\
        }\
        .printEq .dataList p {\
          margin: 4px 18px;\
          display: table;\
        }\
        .printEq .dataList p+p {\
          margin-top: 6x;\
        }\
        .printEq .orgTitleImg {\
          margin-bottom: 16px;\
        }\
        .printEq{\
          width: 800px;\
        }\
        .printTxt{\
          display: table-cell;\
        }\
        .bullet{\
          display: table-cell;\
          margin-right: 5px;\
        }\
        .textBullet{\
          margin: 0 5px 0 10px\
        }\
        <style>"
        $('.printBox').append(printStyle);
        $('.printBox').printArea({
          // mode: "iframe",
          popClose: false,
          // retainAttr: ["id", "class", "style"],
          // printDelay: 0, // tempo de atraso na impressao
          // printAlert: false
        });
    })
}

function autoNext() {
  if (orgThisPage == organizeImageCount) {
    return;
  }
  
  orgThisPage += 1;
  
  $('.dataEq').hide();
  $('.dataEq').eq(orgThisPage - 1).show();
  $('.organizePageInfo').find('span').eq(0).html(itostr(orgThisPage))
}

function downloadFile(n) {
  location.href = "./common/down/" + itostr(n) + ".zip";
  //window.open("./common/download/"+ n +".zip");
}

function sumDown() {
  downloadFile(Number(curChapStr));
}

  // function trunCheck(num) {
  //   for (var w = 0; w < pageDivision.length; w++) {
  //     if (pageDivision[w] == num || num == 0) {
  //       return true
  //     }
  //   }
  //   return false;
  // }
  // function trunCheck2(num) {
  //   for (var w = 0; w < pageDivision.length; w++) {
  //     if (pageDivision[w] == num) {
  //       return true
  //     }
  //   }
  //   return false;
  // }

  //     if (trunCheck(num)) {
  //     // if (true) {
  //     var elemBGImg = document.createElement('img');
  //     elemBGImg.src = "./common/organizeData/images/printdesign.png"
  //     elemBGImg.style.position = "absolute";
  //     elemBGImg.style.width = "21cm";
  //     elemBGImg.style.minHeight = "29.7cm";
  //     elemBGImg.style.left = "0"
  //     elemBGImg.style.top = "0"
  //     elemBGImg.style.paddingTop = "-3cm"
  //     elemBGImg.style.zIndex = "-1"
  //     elemDataEq.appendChild(elemBGImg)

  //   }
  //   if (trunCheck(num)) {
  //     elemDataEq.style.paddingTop = "3cm"
  //   } else {
  //     elemDataEq.style.marginTop = "-1.5cm"
  //   }
  //   if (trunCheck2(num)) {
  //     // if (true) {
  //     elemDataEq.style.pageBreakBefore = "always";
  //   }