var srtNum = -1;
var capion_html;


function parseSRT(content) {
    var quotesArray = [];
    var lines = content.split('\r\n');
    var currentQuoteNumber = 0;
    var lineTypes = {
        INDEX: 0,
        TIMECODE: 1,
        TEXT: 2
    };
    var nextLineType = lineTypes.INDEX;


    for (var n = 0; n < lines.length; n++) {
        var line = lines[n].toString();
        var quoteNumber = parseInt(line, 10);

        if (line == '') nextLineType = lineTypes.INDEX;
        else if (nextLineType == lineTypes.INDEX && quoteNumber !== NaN) {
            currentQuoteNumber = quoteNumber;
            var quote = {
                start_time: '',
                end_time: '',
                text: ''
            };
            quotesArray[currentQuoteNumber] = quote;
            nextLineType = lineTypes.TIMECODE;
        } else if (nextLineType == lineTypes.TIMECODE) {
            var timeCode = line.split(' --> ');
            quotesArray[currentQuoteNumber].start_time = timeCode[0];
            quotesArray[currentQuoteNumber].end_time = timeCode[1];
            nextLineType = lineTypes.TEXT;
        } else if (nextLineType == lineTypes.TEXT) {
            if (quotesArray[currentQuoteNumber].text != '') {
                quotesArray[currentQuoteNumber].text += '\n';
            }
            quotesArray[currentQuoteNumber].text += line;
        }
    }
    return quotesArray.filter(function (q) { return (q != null); });
}
function srtChange() {

    // console.log(capion_html)
    var capion_data = capion_html;
    for (var i = 0; i < capion_data.length; i++) {

        // alert(343)
        if (capion_data[i].start_time < Player.currentTime && capion_data[i].end_time > Player.currentTime) {
            srtNum = i;
            $('.script_inner').html("<span class='trans'>" + capion_data[i].text + "</span>")
            break;
        }
        if (i == capion_data.length - 1) {
            $('.script_inner').html("")
        }
    }
}

// 자막로딩
function loadSRT() {

    var srtPath = './common/srt/' + itostr(curChasi) + '_' + itostr(currentSceneNumber) + '.srt'
    $.ajax({
        url: srtPath,
        type: 'get',
        dataType: 'text',
        success: function (data) {
            capion_html = parseSRT(data);
            //console.log(capion_html)
            var capion_data = capion_html;
            for (var i = 0; i < capion_data.length; i++) {
                var totalStart = 0;
                console.log(capion_data[i].start_time)
                var startTimes = capion_data[i].start_time.split(':')
                var sHour = Number(startTimes[0])
                var sMin = Number(startTimes[1])
                var sSecond = Number(startTimes[2].split(',')[0])
                var sdecimal = Number(startTimes[2].split(',')[1])
                totalStart += (sHour * 60 * 60);
                totalStart += (sMin * 60);
                totalStart += (sSecond);
                totalStart += (sdecimal * 0.001)
                capion_html[i].start_time = totalStart;
                // console.log(sHour, sMin, sSecond, sdecimal, totalStart)
            }
            for (var j = 0; j < capion_data.length; j++) {
                var totalEnd = 0;
                var endTimes = capion_data[j].end_time.split(':')
                var eHour = Number(endTimes[0])
                var eMin = Number(endTimes[1])
                var eSecond = Number(endTimes[2].split(',')[0])
                var edecimal = Number(endTimes[2].split(',')[1])
                totalEnd += (eHour * 60 * 60);
                totalEnd += (eMin * 60);
                totalEnd += (eSecond);
                totalEnd += (edecimal * 0.001)
                capion_html[j].end_time = totalEnd;
                // console.log(eHour, eMin, eSecond, edecimal, totalEnd)
            }
        }, error: function () {
            srtNum = false;
            //console.log("실패")
        }
    })

}