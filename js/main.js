const MAX_GENERATOR = 9;

const amountOfGenerators = 8
$.getJSON("./json/notation_property.json",function(data){
    var NotationData=data;
});

function ClickButton(){
    player.money = player.money.plus(player.clickMult);
    player.clickAmount++;
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