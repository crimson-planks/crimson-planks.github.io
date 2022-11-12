const MAX_GENERATOR = 9;

const amountOfGenerators = 8

function ClickButton(){
    player.money = player.money.plus(player.clickMult);
    player.clickAmount=player.clickAmount.add(1);
}


function ProductionLoop(diff){
    ({totalAstroids,generatorList,energy}=player);
    ({astroidsAllocated}=player.energy);
    ({He}=player.upgrades)
    currencyPerSecond=generatorList["H"][0].amount.mul(generatorList["H"][0].totalMult);
    if(player.fusion.activated){
        currencyPerSecond=currencyPerSecond.pow(0.5);
        player.money=player.money.mul(player.fusion.hydrogenLoseRate.pow(player.money.abs().add(1).absLog10().pow(player.fusion.hydrogenLoseDriftFactor)).pow(diff));
    }
    moneyAdd=currencyPerSecond.mul(new Decimal(diff));
    player.money=player.money.plus(moneyAdd);
    player.totalHydrogen=player.totalHydrogen.plus(moneyAdd);
    CalEnergyMult();
    CalMult();
    for(let i=1;i<player.amountOfGenerators;i++){
        g=generatorList["H"][i-1];
        g.amount=g.amount.plus(generatorList["H"][i].amount.mul(generatorList["H"][i].totalMult).mul(diff));
    }
    player.clickMult=new Decimal("2").pow(player.astroidAmount);
    //energy

    allocatableAstroids=totalAstroids.minus(astroidsAllocated);
    energyPerSecond=energy.astroidsAllocated.mul(energy.mult);
    energy.amount=energy.amount.add(energyPerSecond.mul(diff));

    //fusion
    heliumPerSecond=maxDecimal(
        AbsPow(
            player.money
            .dividedBy(AbsPow(player.fusion.unlockCost,0.5))
            .dividedBy(maxDecimal(player.helium,new Decimal(1)))
        ,0.5)
        ,maxToleratedHeliumPerSecond).minus(maxToleratedHeliumPerSecond);
    if(player.fusion.activated){
        player.helium=player.helium.add(heliumPerSecond.mul(diff));
    }
    else if(player.upgrades.He[41].bought.greaterThan(0)){
        player.helium=player.helium.mul(player.upgrades.He[41].value.pow(diff));
    }
    //helium upgrades
    He["21"].value=GetMultFromEnergy().pow(0.5);
    He["31"].value=player.money.abs().add(10).absLog10().pow(2);
}
function UpdateVariables(){
    player.lastUpdate = Date.now();
    playTime=(Date.now()-player.createdTime)/1000;
}
function InputLoop(){
    player.inputValue.astroidPerAllocation=new Decimal(document.getElementById("astroid-per-allocation-input").value).floor();
}
function MainLoop(){
    let diff = (Date.now() - player.lastUpdate)/1000;
    saveTimer+=diff;
    if(saveTimer>=60){
        save();
        saveTimer=0;
    }
    //console.log(diff+[]+lastUpdate);
    InputLoop();
    UpdateVariables();
    ProductionLoop(diff);
    UpdateGUI();
}
window.addEventListener('keydown', function (e) {
    if(e.key.toLowerCase()=='m'){
        BuyMax();
    }
  }, false);
InitHtml();
InitGen();
InitLoad();
InitTab();
InitNotify();
InitSetInputValue();
InitSettingsBasedOnDate();
setInterval(MainLoop, 50);