var money=new Decimal("0");

function clickButton(){
    money = money.plus(new Decimal("1"));
}


function format(amount){
    let power=Math.floor(amount.log10());
    let mentissa=amount.dividedBy(new Decimal("10").pow(power));
    return mentissa.toFixed(2) + "e" + power;
}
function UpdateGUI(){
    document.getElementById("currency").innerHTML=format(money);
}

setInterval(UpdateGUI, 50);