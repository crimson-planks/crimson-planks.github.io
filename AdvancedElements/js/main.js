var lastUpdate = Date.now()
var player = {
    money: new Decimal("0"),
    GeneratorList: {"hydrogen":[]},
    notation: "scientific",
    amountOfGenerators: 0,
    currentMaxGenerator: 4,
    DimensionBoostAmount: 0,
    DimensionBoostCost: new Decimal("7"),
    clickAmount: 0,
    clickMult: new Decimal("1"),
    defaultMoney: new Decimal("0"),
    TotalAstroids: 0,
    Energy: 0
}

var NotationData;

const MAX_GENERATOR = 9;

$.getJSON("./json/notation_property.json",function(data){
    NotationData=data;
});

for (let i = 0; i < MAX_GENERATOR; i++) {
  let generator = {
    cost: new Decimal("10").mul(new Decimal("10").pow(i*i)),
    bought: new Decimal("0"),
    amount: new Decimal("0"),
    mult: new Decimal("1"),
    costMult: new Decimal("10")
  }
  player.GeneratorList["hydrogen"].push(generator);
}

function putText(n){
    let tmp="";
    if(player.amountOfGenerators>n){
        player.amountOfGenerators=0;
    }
    tmp="<table>";
    for(let i=0;i<n;i++){
        tmp+="<tr><td><div class=\"generator\" id=\"gen"+(i+1)+"\"></div></td><td><button id=\"BG"+(i+1)+"\" class=\"buy-button\" type=\"button\" onclick=\"buyGenerator("+(i+1)+")\"></button></td></tr>";
    }
    tmp+="</table>";
    //console.log(tmp);
    document.getElementById("generator-div").innerHTML=tmp
    player.amountOfGenerators=n;
}
function clickButton(){
    player.money = player.money.plus(player.clickMult);
    player.clickAmount++;
}

function buyGenerator(Gnum,Gtype="hydrogen",buyType="manual"){
    let g=player.GeneratorList[Gtype][Gnum-1];
    if(getIfBuyable(g.cost)){
        g.bought=g.bought.plus(new Decimal("1"));
        g.amount=g.amount.plus(new Decimal("1"));
        player.money=player.money.minus(g.cost);
        g.costMult=new Decimal("10");
        if(g.bought>6){
            g.costMult=g.costMult.mul(new Decimal("10").pow(g.bought.add(Gnum-6-1).pow(new Decimal("0.5")).floor()));
        }
        g.cost=g.cost.mul(g.costMult);
        g.mult=g.mult.mul(2);

        if(player.amountOfGenerators==Gnum && player.amountOfGenerators<player.currentMaxGenerator){
            putText(Gnum+1);
        }
        return true;
    }
    else{
        return false;
    }
}
function getIfBuyable(cost,money=player.money){
    if(money.sign()!=cost.sign()){
        return false;
    }
    if(cost.abs().lessThanOrEqualTo(money.abs())){
        return true;
    }
    else{
        return false;
    }
}
function changeColorIfBuyable(element,cost,money=player.money){
    if(getIfBuyable(cost,money)){
        element.classList.remove('unavailable-button');
        element.classList.add('buyable-button');
    }
    else{
        element.classList.remove('buyable-button');
        element.classList.add('unavailable-button');
    }
}
function UpdateGUI(){
    document.getElementById("currency").innerHTML=format(player.money);
    document.getElementById("get-money-button").innerHTML="Click to get "+ format(player.clickMult,2,0) +" hydrogen";
    for(let i=0;i<player.amountOfGenerators;i++){
        let g=player.GeneratorList["hydrogen"][i];
        document.getElementById("gen"+(i+1)).innerHTML="Hydrogen Generator-"+(i+1)+"<br> Amount: " + format(g.amount)+"("+format(g.bought,2,0)+") x"+format(g.mult);
        
        changeColorIfBuyable(
            document.getElementById("BG"+(i+1)),
            player.GeneratorList["hydrogen"][i].cost);
        document.getElementById("BG"+(i+1)).innerHTML="Cost: " + format(player.GeneratorList["hydrogen"][i].cost,0,0);
    }
    changeColorIfBuyable(
        document.getElementById("dimB-button"),
        
        player.DimensionBoostCost,player.GeneratorList["hydrogen"][getDimboostRequiredGenID()-1].amount);
    document.getElementById("")
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
    //console.log(diff+[]+lastUpdate);
    productionLoop(diff);
    UpdateGUI();
    lastUpdate = Date.now();
}

putText(1);

setInterval(MainLoop, 50);