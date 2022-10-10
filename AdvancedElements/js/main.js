var lastUpdate = Date.now()
var player = {
    money: new Decimal("0"),
    GeneratorList: {"hydrogen":[]},
    notation: "scientific",
    amountOfGenerators: 0,
    currentMaxGenerator: 4,
    DimensionBoostAmount: new Decimal("0"),
    DimensionBoostCost: new Decimal("7"),
    clickAmount: 0,
    clickMult: new Decimal("1"),
    defaultMoney: new Decimal("0"),
    TotalAstroids: new Decimal("0"),
    Energy: 0,
    TotalHydrogen: new Decimal("0"),
    CostDriftFactor: new Decimal("0.5")
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
    multByDimB: new Decimal("1"),
    totalMult: new Decimal("1"),
    costMult: new Decimal("10"),
    costMultDrift: new Decimal("10")
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
        tmp+=`<tr><td><div class="generator" id="gen${i+1}"></div></td><td><button id="BG${i+1}" class="buy-button" type="button" onclick="buyGenerator(${i+1})"></button></td></tr>`;
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
        g.costMultDrift=g.costMult
        if(g.bought>6&&Gtype=="hydrogen"){
            g.costMultDrift=g.costMultDrift.mul(g.costMult.pow(g.bought.add(Gnum-6-1).pow(player.CostDriftFactor).floor()));
        }
        g.cost=g.cost.mul(g.costMultDrift);
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
    let tmpstring;
    document.getElementById("currency").innerHTML=format(player.money);
    document.getElementById("get-money-button").innerHTML="Click to get "+ format(player.clickMult,2,0) +" hydrogen";
    tmpstring=player.TotalAstroids+[];
    if(player.DimensionBoostAmount.lessThan(player.TotalAstroids)){
        tmpstring+=" - "+player.TotalAstroids.minus(player.DimensionBoostAmount);
    }
    document.getElementById("dimB-text").innerHTML=`Hydrogen Astroids(${tmpstring}): requires ${format(player.DimensionBoostCost,2,0)} Hydrogen Generator-${getDimboostRequiredGenID()}s`;
    for(let i=0;i<player.amountOfGenerators;i++){
        let g=player.GeneratorList["hydrogen"][i];
        document.getElementById("gen"+(i+1)).innerHTML="Hydrogen Generator-"+(i+1)+"<br> Amount: " + format(g.amount)+"("+format(g.bought,2,0)+") x"+format(g.totalMult);
        
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
    let moneyAdd=player.GeneratorList["hydrogen"][0].amount.mul(player.GeneratorList["hydrogen"][0].totalMult).mul(new Decimal(diff));
    player.money=player.money.plus(moneyAdd);
    player.TotalHydrogen=player.TotalHydrogen.plus(moneyAdd);
    calMult();
    for(let i=1;i<player.amountOfGenerators;i++){
        g=player.GeneratorList["hydrogen"][i-1];
        g.amount=g.amount.plus(player.GeneratorList["hydrogen"][i].amount.mul(player.GeneratorList["hydrogen"][i].totalMult).mul(diff));
    }
    player.clickMult=new Decimal("2").pow(player.DimensionBoostAmount);
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