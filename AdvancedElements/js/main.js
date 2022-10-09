var lastUpdate = Date.now()
var player = {
    money: new Decimal("0"),
    GeneratorList: {"hydrogen":[]},
    notation: "scientific",
    amountOfGenerators: 0
}

var NotationData;

const MAX_GENERATOR = 9;

$.getJSON("./json/notation_property.json",function(data){
    NotationData=data;
});

for (let i = 0; i < MAX_GENERATOR; i++) {
  let generator = {
    cost: new Decimal("10"),
    bought: new Decimal("0"),
    amount: new Decimal("0"),
    mult: new Decimal("1"),
    costMult: new Decimal("10")
  }
  player.GeneratorList["hydrogen"].push(generator);
}

function putText(n){
    let tmp=""
    if(player.amountOfGenerators>n){
        player.amountOfGenerators=0;
    }
    tmp="<table>";
    for(let i=player.amountOfGenerators;i<n;i++){
        tmp+="<tr><td><div class=\"generator\" id=\"gen"+(i+1)+"\"></div></td><td><button id=\"BG"+(i+1)+"\" class=\"buy-button\" type=\"button\"></button></td></tr>";
    }
    tmp+="</table>";
    console.log(tmp);
    document.getElementById("generator-div").innerHTML=tmp
    player.amountOfGenerators=n;
}
function clickButton(){
    player.money = player.money.plus(new Decimal("1"));
}

function format(amount, dec=2, notation="scientific"){
    if(notation=="scientific"){
        let power=Math.floor(amount.log10());
        let mentissa=amount.dividedBy(new Decimal("10").pow(power));
        if(power < 3) return amount.toFixed(dec);
        return mentissa.toFixed(dec) + "e" + power;
    }
}
function UpdateGUI(){
    document.getElementById("currency").innerHTML=format(player.money);
    for(let i=0;i<player.amountOfGenerators;i++){
        let g=player.GeneratorList["hydrogen"][i];
        document.getElementById("gen"+(i+1)).innerHTML=i+1+" Generator Amount: " + format(g.amount);
        document.getElementById("BG"+(i+1)).innerHTML="Cost: " + player.GeneratorList["hydrogen"][i].cost;
    }
}
function productionLoop(diff){
    player.money=player.money.plus(player.GeneratorList["hydrogen"][0].amount.mul(player.GeneratorList["hydrogen"][0].mult).mul(new Decimal(diff)));
    for(let i=1;i<player.amountOfGenerators;i++){
        n=player.GeneratorList["hydrogen"][i-1];
        n.amount=n.amount.plus(player.GeneratorList["hydrogen"][i].amount.mul(player.GeneratorList["hydrogen"][i].mult).mul(new Decimal(diff)));
    }
}

function MainLoop(){
    var diff = (Date.now() - lastUpdate)/1000;
    //console.log(lastUpdate)
    productionLoop(diff);
    UpdateGUI();
    lastUpdate = Date.now();
}

putText(4);

setInterval(MainLoop, 50);