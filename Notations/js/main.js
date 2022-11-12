player={
    notation: "scientific"
}
function MainLoop(){
    let resultText="";
    let resultDecimal=new Decimal(document.getElementById("input-text").value);
    resultText+=FormatValue(resultDecimal)
    document.getElementById("output-text").innerHTML=resultText;
}
setInterval(MainLoop, 50);