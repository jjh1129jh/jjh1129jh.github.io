function setCoin() {
    var coinStr = '';
    coinStr += '<div id = coin>'
    coinStr +=     '<div id = totalCoinBox>'
    coinStr +=       '<div id = totalCoin>'
    coinStr +=           '<div id = allCoin>'
    // coinStr +=               '<span class = allC>000</span>'
    coinStr +=               '<span class = allC>' + top.opener.playerChk.coin + '</span>'
    coinStr +=           '</div>'
    coinStr +=           '<div id = speakingCoin>'
    // coinStr +=               '<span class = speakingC>00</span>'
    coinStr +=               '<span class = speakingC>' + top.opener.playerChk.s_point + '</span>'
    coinStr +=           '</div>'
    coinStr +=           '<div id = readCoin>'
    // coinStr +=               '<span class = readC>00</span>'
    coinStr +=               '<span class = readC>' + top.opener.playerChk.r_point + '</span>'
    coinStr +=           '</div>'
    coinStr +=           '<div id = listeningCoin>'
    // coinStr +=               '<span class = listeningC>00</span>'
    coinStr +=               '<span class = listeningC>' + top.opener.playerChk.l_point + '</span>'
    coinStr +=           '</div>'
    coinStr +=           '<div id = writeCoin>'
    // coinStr +=               '<span class = writeC>00</span>'
    coinStr +=               '<span class = writeC>' + top.opener.playerChk.w_point + '</span>'
    coinStr +=           '</div>'
    coinStr +=       '</div>'
    coinStr +=     '</div>'
 
    coinStr +=     '<div id = "topPassport">'
    coinStr +=     '</div>'
    coinStr +=     '<div id = "TopMap">'
    coinStr +=     '</div>'
    coinStr += '</div>'
    $("#fs-header").html(coinStr);
}