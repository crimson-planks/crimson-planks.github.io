function initHtml(){
    let tmp="<table>";
    for(let i=0;i<MAX_GENERATOR;i++){
        tmp+=   `<tr id="genRow${i+1}" class="hidden">
                    <td>
                        <span class="generator" id="gen${i+1}"></span>
                        <span></span>
                    </td>
                    <td>
                        <button id="BG${i+1}" class="buy-button" type="button" onclick="BuyGenerator(${i+1})"></button>
                    </td>
                </tr>`;
    }
    tmp+="</table>";
    //console.log(tmp);
    document.getElementById("generator-div").innerHTML=tmp;
    document.getElementById("version-text").innerHTML=currentVersion;
}
function initGen(){
    for (let i = 0; i < MAX_GENERATOR; i++) {
        let generator = getDefaultDimension(i);
        player.generatorList["hydrogen"].push(generator);
    }
}
function initTab(){
    ShowIfBoolean(document.getElementById(selectedTab),true)
}
function initLoad(){
    var loadSuccess = load();
    if(!loadSuccess){
        PutText(1);
    }
}
function initNotify(){
    $.notify.addStyle('blue', {
        html: "<div><span data-notify-text/></div>",
        classes: {
          base: {
            "border": "1px solid #2378af",
            "background-color": "#459aef"
          }
        }
      });
}