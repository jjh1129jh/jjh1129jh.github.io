var bolPorted = false;
var strMaxPage;
var nTemp = 0;
var contentFrame = document.getElementById("contentFrame");

function openContent(){	
	contentFrame.src = './index.html';
	if(typeof parent.opener.playerChk != 'undefined'){ //미리보기에서도 호출함으로 필요
		parent.opener.playerChk.getDefaultInfo();
	}
}

function openInit(){
	contentFrame.src = './index.html';
}

function closeContent(){
	if(bolPorted){
		//top.savePlayInfo(strMaxPage, nTemp, 'Y');
	}
}