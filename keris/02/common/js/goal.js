
function goalInit() {
  $('.ReflectionBtn1').on('click', function () {
    alert("프로토에선 지원하지 않습니다.")
  })
  $('.ReflectionBtn2').on('click', function () {
    alert("프로토에선 지원하지 않습니다.")
  })
  $('.ReflectionBtn3').on('click', function () {
    printBtnEvent()
    // alert("프로토에선 지원하지 않습니다.")
  })

}

function printBtnEvent() {
  var printBox = document.createElement('div');
  var boxTitle = document.createElement('div');
  boxTitle.innerHTML = "입력 내용"
  boxTitle.style.fontSize = "24px"
  boxTitle.style.fontWeight = "bold"
  boxTitle.style.textAlign = "center"

  var boxContent = document.createElement('div')
  console.log($('.text_data').val().replace('\n', '<br/>'))
  $(boxContent).html($('.text_data').val().replace(/(?:\r\n|\r|\n)/g, '<br />'))


  printBox.appendChild(boxTitle)
  printBox.appendChild(boxContent)
  var printStyle = "<style>\
	@page {\
		\
					size: A4;\
					\
					margin: 1cm  1cm 0 1cm;\
					\
					}\
					\
					@media print {\
					\
					html, body {\
					\
					width: 19cm;\
					\
					height: 28.69cm;\
					margin: 0;\
					padding: 0;\
					\
					}\
				\
	</style>"
  $(printBox).append(printStyle)
  $(printBox).printArea({
    //mode: "iframe",
    popClose: true,
    retainAttr: ["id", "class", "style"],
    printDelay: 0, // tempo de atraso na impressao
    printAlert: false
  })
}