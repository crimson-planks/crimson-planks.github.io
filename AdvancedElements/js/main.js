const MAX_GENERATOR = 9;

const amountOfGenerators = 8
$.getJSON("./json/notation_property.json",function(data){
    var NotationData=data;
});

function ClickButton(){
    player.money = player.money.plus(player.clickMult);
    player.clickAmount++;
}

function UpdateGUI(){
    notatison=player.notation;
    let tmpstring;
    document.getElementById("currency").innerHTML=format(player.money);
    document.getElementById("get-money-button").innerHTML=`Click to get ${format(player.clickMult,{dec: 2, smallDec: 0})} hydrogen`;
    document.getElementById("currency-per-second").innerHTML=format(currencyPerSecond);

    tmpstring=player.totalAstroids+[];
    if(player.astroidAmount.lessThan(player.totalAstroids)){
        tmpstring+=" - "+player.totalAstroids.minus(player.astroidAmount);
    }
    document.getElementById("dimB-text").innerHTML=`Hydrogen Astroids(${tmpstring}): requires ${format(player.astroidCost,{smallDec: 0})} Hydrogen Generator-${getDimboostRequiredGenID()}s`;
    document.getElementById("dimB-button").innerHTML= player.totalAstroids.greaterThanOrEqualTo(4) ? "Reset for a boost" : "Reset for a new generator"

    for(let i=0;i<player.amountOfGenerators;i++){
        let g=player.generatorList["hydrogen"][i];
        document.getElementById("gen"+(i+1)).innerHTML="Hydrogen Generator-"+(i+1)+"<br> Amount: " + format(g.amount)+"("+format(g.bought,{smallDec: 0})+") x"+format(g.totalMult);

        ChangeColorIfBuyable(
            document.getElementById("BG"+(i+1)),
            player.generatorList["hydrogen"][i].cost);
        document.getElementById("BG"+(i+1)).innerHTML="Cost: " + format(player.generatorList["hydrogen"][i].cost,{dec: 0, smallDec: 0});
    }
    ChangeColorIfBuyable(
        document.getElementById("dimB-button"),
        
        player.astroidCost,player.generatorList["hydrogen"][getDimboostRequiredGenID()-1].amount);
        
    ShowIfBoolean(
        document.getElementById("unlock-div"),
        GetIfBuyable(new Decimal("1"),player.totalAstroids));
    
    ShowIfBoolean(
        document.getElementById("unlock-energy-button"),
        !player.energy.unlocked);
    
    ChangeColorIfBuyable(
        document.getElementById("unlock-energy-button"),
        player.energy.unlockCost,
        player.astroidAmount);
    
    for(let i=0;i<tabArray.length;i++){
        //console.log(tmpHtml);
        ShowIfBoolean(document.getElementById(tabArray[i]+"-tab-button"),player[tabArray[i]].unlocked);
    }
    //energy
    document.getElementById("energy-text1").innerHTML=`${format(player.energy.astroidsAllocated,{dec: 2,smallDec: 0})} Astroids are producing ${format(energyPerSecond)} energy per second.`
    document.getElementById("energy-text2").innerHTML=`You have ${format(player.energy.amount)} energy, which is boosting all generators by ${format(getMultFromEnergy())}x.`
    document.getElementById("energy-text3").innerHTML=`Allocatable Astroids: ${format(allocatableAstroids)}, Total Astroids: ${format(player.totalAstroids)}`
    //fusion
    ShowIfBoolean(document.getElementById("unlock-fusion-button"),GetIfBuyable(player.fusion.showCost));
    ChangeColorIfBuyable(document.getElementById("unlock-fusion-button"),player.fusion.unlockCost);
}
function ProductionLoop(diff){
    ({totalAstroids,generatorList,energy}=player);
    ({astroidsAllocated}=player.energy);
    moneyAdd=generatorList["hydrogen"][0].amount.mul(generatorList["hydrogen"][0].totalMult).mul(new Decimal(diff));
    currencyPerSecond=moneyAdd.mul(1/diff);
    player.money=player.money.plus(moneyAdd);
    player.totalHydrogen=player.totalHydrogen.plus(moneyAdd);
    CalMult();
    for(let i=1;i<player.amountOfGenerators;i++){
        g=generatorList["hydrogen"][i-1];
        g.amount=g.amount.plus(generatorList["hydrogen"][i].amount.mul(generatorList["hydrogen"][i].totalMult).mul(diff));
    }
    player.clickMult=new Decimal("2").pow(player.astroidAmount);
    //energy

    allocatableAstroids=totalAstroids.minus(astroidsAllocated);
    energyPerSecond=energy.astroidsAllocated;
    energy.amount=energy.amount.add(energyPerSecond.mul(diff));
}

function MainLoop(){
    let diff = (Date.now() - player.lastUpdate)/1000;
    //console.log(diff+[]+lastUpdate);
    ProductionLoop(diff);
    UpdateGUI();
    player.lastUpdate = Date.now();
}
window.addEventListener('keydown', function (e) {
    if(e.key.toLowerCase()=='m'){
        BuyMax();
    }
  }, false);
initHtml();
initGen();
initLoad();
initTab();
initNotify();
setInterval(MainLoop, 50);