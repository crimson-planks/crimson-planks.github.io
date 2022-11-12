function InitHtml(){
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

    //notation buttons
    notationGroup.forEach(function(value){
        const tr=document.createElement("tr");
        function cb(value){
            const td=document.createElement("td");
            const button=document.createElement("button");
            button.setAttribute("class","buyable-button select-notation-button");
            button.setAttribute("onclick",`ChangeNotation('${value}')`);
            button.appendChild(document.createTextNode(notationNames[value]));
            td.appendChild(button);
            tr.appendChild(td);
        }
        value.forEach(cb);

        document.getElementById("floating-notation-tbody").appendChild(tr);
    });

    //helium upgrades
    
    tmp="";
    for(let i=0;i<4;i++){
        tmp+="<tr>"
        for(let j=0;j<4;j++){
            tmp+=
            `<td>
                <button id="he-${i+1+[]+(j+1)}-button" class="upgrade-button" onclick="BuyUpgrade('${i+1+[]+(j+1)}','He')">
                    <span id="he-${i+1+[]+(j+1)}-description" class="upgrade-description"></span>
                    <br>
                    <span id="he-${i+1+[]+(j+1)}-cost" style="font-size: 13px;"></span>
                </button>
            </td>`
        }
        tmp+="</tr>"
    }
    document.getElementById("helium-upgrade-table").innerHTML=tmp;
}
function InitGen(){
    for (let i = 0; i < MAX_GENERATOR; i++) {
        let generator = getDefaultDimension(i);
        player.generatorList["H"][i]=generator;
    }
}
function InitTab(){
    ShowIfBoolean(document.getElementById(selectedTab),true)
}
function InitLoad(){
    var loadSuccess = load();
    if(!loadSuccess){
        PutText(1);
    }
}
function InitNotify(){
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
function InitSetInputValue(){
    document.getElementById("astroid-per-allocation-input").value=player.inputValue.astroidPerAllocation;
}
function InitSettingsBasedOnDate(){
    let todayDate=new Date();
    if(todayDate.getMonth()===(4-1)&&todayDate.getdate()===1){
        console.log("April Fools!");
    }
    else if(todayDate.getMonth()===(10-1)){
        console.log("ttest sstring");
    }
}
/*
$.getJSON("./json/notation_property.json",function(data){
    var NotationData=data;
});
*/