var amountOfGenerators = 8

function ClickButton(){
    player.money = player.money.plus(player.clickMult);
    player.totalHydrogen= player.totalHydrogen.plus(player.clickMult);
    player.clickAmount=player.clickAmount.add(1);
}


function ProductionLoop(diff){
    ({totalAstroids,generatorList,energy}=player);
    ({astroidsAllocated}=player.energy);
    ({He}=player.upgrades)
    currencyPerSecond=generatorList["H"][0].amount.mul(generatorList["H"][0].mult);
    moneyAdd=currencyPerSecond.mul(new Decimal(diff));
    if(player.fusion.activated){
        player.money=GetFusedAmount(player.money,diff);
    }
    player.money=player.money.plus(moneyAdd);
    player.totalHydrogen=player.totalHydrogen.plus(moneyAdd);
    CalEnergyMult();
    CalMult();
    for(let i=1;i<player.currentVisibleGenerators;i++){
        let gAmount;
        g=generatorList["H"][i-1];
        
        gAmount=g.amount.plus(generatorList["H"][i].amount.mul(generatorList["H"][i].mult).mul(diff));
        if(player.fusion.activated&&generatorList["H"][i].amount.gt(1)){
            gAmount=GetFusedAmount(gAmount,diff);
        }
        g.amount=gAmount;
    }
    player.clickMult=new Decimal("2").pow(player.astroidAmount);
    //energy

    allocatableAstroids=totalAstroids.minus(astroidsAllocated);
    energyPerSecond=energy.astroidsAllocated.mul(energy.mult);
    energy.amount=energy.amount.add(energyPerSecond.mul(diff));

    //fusion
    player.fusion.productionCap=player.energy.amount
        .mul(player.upgrades.He[14].bought.gt(0) ? player.upgrades.He[14].value : 1)
        .mul(player.upgrades.He[21].bought.gt(0) ? player.upgrades.He[21].value : 1)
    heliumPerSecond=Decimal.min(
        Decimal.max(
            AbsPow(
                player.money
                .div(player.fusion.unlockCost)
                ,0.125)
            .minus(maxToleratedHeliumPerSecond),maxToleratedHeliumPerSecond),player.fusion.productionCap);
    if(player.fusion.activated){
        player.helium=player.helium.add(heliumPerSecond.mul(diff));
    }
    //helium upgrades
    He["12"].value=GetMultFromEnergy().absLog10().add(1);
    He["13"].value=player.money.abs().add(1).absLog10().pow(Decimal.pow(1.125,He["13"].bought));
    He["21"].value=player.helium.abs().add(1).absLog10().pow(3).pow(He["21"].bought).add(1);
    He["22"].value=player.helium.abs().add(1).absLog10().add(1);
    He["24"].value=He["24"].bought.add(1);
    player.maxAstroidBoostGenerator=He["24"].value;
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