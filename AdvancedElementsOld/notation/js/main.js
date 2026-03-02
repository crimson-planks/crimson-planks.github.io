player={
    notation: "scientific"
}
function UpdateGUI(){
    let resultText="";
    let resultDecimal=new Decimal(document.getElementById("input-text").value);
    resultText+=FormatValue(resultDecimal,{notation: document.getElementById("notation-dropdown").value})
    document.getElementById("output-text").innerHTML=resultText;
}