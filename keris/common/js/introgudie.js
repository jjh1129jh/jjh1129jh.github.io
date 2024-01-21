function introgudieInit() {
    var box1 = document.getElementsByClassName('unit1')[0].getElementsByClassName('textbox')[0];
    var box2 = document.getElementsByClassName('unit2')[0].getElementsByClassName('textbox')[0];
    for (var i = 0; i < topText.length; i++) {
      var span = document.createElement('span')
      if(topText[i].substring(0, 3) == "1. "){
        span.innerHTML = topText[i].replace("1. ", "<div style = 'background : url(.././common/css/img/num1.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box1.appendChild(span)
      }
      else if(topText[i].substring(0, 3) == "2. "){
        span.innerHTML = topText[i].replace("2. ", "<div style = 'background : url(.././common/css/img/num2.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box1.appendChild(span)
      }
      else if(topText[i].substring(0, 3) == "3. "){
        span.innerHTML = topText[i].replace("3. ", "<div style = 'background : url(.././common/css/img/num3.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box1.appendChild(span)
      }
      else if(topText[i].substring(0, 3) == "4. "){
        span.innerHTML = topText[i].replace("4. ", "<div style = 'background : url(.././common/css/img/num4.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box1.appendChild(span)
      }
      else if(topText[i].substring(0, 3) == "5. "){
        span.innerHTML = topText[i].replace("5. ", "<div style = 'background : url(.././common/css/img/num5.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box1.appendChild(span)
      }
      else if(topText[i].substring(0, 3) == "6. "){
        span.innerHTML = topText[i].replace("6. ", "<div style = 'background : url(.././common/css/img/num6.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box1.appendChild(span)
      }
      else if(topText[i].substring(0, 3) == "7. "){
        span.innerHTML = topText[i].replace("7. ", "<div style = 'background : url(.././common/css/img/num7.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box1.appendChild(span)
      }
      else if(topText[i].substring(0, 3) == "8. "){
        span.innerHTML = topText[i].replace("8. ", "<div style = 'background : url(.././common/css/img/num8.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box1.appendChild(span)
      }
      else if(topText[i].substring(0, 3) == "9. "){
        span.innerHTML = topText[i].replace("9. ", "<div style = 'background : url(.././common/css/img/num9.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box1.appendChild(span)
      }
      else{
        span.innerHTML = topText[i]
        box1.appendChild(span)
      }
      
    }
    for (var j = 0; j < bottomText.length; j++) {
      var span = document.createElement('span')

      if(bottomText[j].substring(0, 3) == "1. "){
        span.innerHTML = bottomText[j].replace("1. ", "<div style = 'background : url(.././common/css/img/num1.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box2.appendChild(span)
      }
      else if(bottomText[j].substring(0, 3) == "2. "){
        span.innerHTML = bottomText[j].replace("2. ", "<div style = 'background : url(.././common/css/img/num2.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box2.appendChild(span)
      }
      else if(bottomText[j].substring(0, 3) == "3. "){
        span.innerHTML = bottomText[j].replace("3. ", "<div style = 'background : url(.././common/css/img/num3.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box2.appendChild(span)
      }
      else if(bottomText[j].substring(0, 3) == "4. "){
        span.innerHTML = bottomText[j].replace("4. ", "<div style = 'background : url(.././common/css/img/num4.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box2.appendChild(span)
      }
      else if(bottomText[j].substring(0, 3) == "5. "){
        span.innerHTML = bottomText[j].replace("5. ", "<div style = 'background : url(.././common/css/img/num5.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box2.appendChild(span)
      }
      else if(bottomText[j].substring(0, 3) == "6. "){
        span.innerHTML = bottomText[j].replace("6. ", "<div style = 'background : url(.././common/css/img/num6.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box2.appendChild(span)
      }
      else if(bottomText[j].substring(0, 3) == "7. "){
        span.innerHTML = bottomText[j].replace("7. ", "<div style = 'background : url(.././common/css/img/num7.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box2.appendChild(span)
      }
      else if(bottomText[j].substring(0, 3) == "8. "){
        span.innerHTML = bottomText[j].replace("8. ", "<div style = 'background : url(.././common/css/img/num8.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box2.appendChild(span)
      }
      else if(bottomText[j].substring(0, 3) == "9. "){
        span.innerHTML = bottomText[j].replace("9. ", "<div style = 'background : url(.././common/css/img/num9.png); position : relative; width : 22px; height : 22px; left : -27px; top : 27px;'></div>");
        box2.appendChild(span)
      }
      else{
        span.innerHTML = bottomText[j]
        box2.appendChild(span)
      }
    }
}