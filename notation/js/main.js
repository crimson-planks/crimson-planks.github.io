function init(){
    notationList.forEach(function(value){
        const NewElement=document.createElement("option");
        NewElement.setAttribute("value",value);
        const NewTextNode=document.createTextNode(notationNames[value]);
        NewElement.appendChild(NewTextNode);
        document.getElementById("notation-dropdown").appendChild(NewElement);
    });
}
function UpdateGUI(){
    let resultText="";
    let resultDecimal=new Decimal(document.getElementById("input-text").value);
    player.notation=document.getElementById("notation-dropdown").value
    resultText+=FormatValue(resultDecimal)
    document.getElementById("output-text").innerHTML=resultText;
}
document.body.onload=init()