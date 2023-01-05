var amountOfGenerators = 8

function ClickButton(){
    player.money = player.money.plus(player.clickMult);
    player.totalHydrogen= player.totalHydrogen.plus(player.clickMult);
    player.clickAmount=player.clickAmount.add(1);
}


function ProductionLoop(diff){
    ({totalAstroids,generatorList,energy}=player);
    ({astroidsAllocated}=player.energy);
    currencyPerSecond=generatorList[0][0].amount.mul(generatorList[0][0].mult);
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
        g=generatorList[0][i-1];
        
        gAmount=g.amount.plus(generatorList[0][i].amount.mul(generatorList[0][i].mult).mul(diff));
        if(player.fusion.activated&&generatorList[0][i].amount.gt(1)){
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
    heliumPerSecond=Decimal.max(
            AbsPow(
                player.money
                .div(player.fusion.unlockCost).div(Decimal.max(player.money.pow(0.01),1))
                ,0.125)
                .mul(player.upgrades[1][14].bought.gt(0) ? player.upgrades[1][14].value : 1)
            ,maxToleratedHeliumPerSecond).minus(maxToleratedHeliumPerSecond);
    if(player.fusion.activated){
        player.helium=player.helium.add(heliumPerSecond.mul(diff));
    }
    //helium upgrades
    player.upgrades[1]["11"].value=Decimal.pow(1.0210121257071934,player.upgrades[1]["11"].bought); //8-^0.01
    player.upgrades[1]["12"].value=GetMultFromEnergy().absLog10().add(1);
    player.upgrades[1]["13"].value=player.money.abs().add(1).absLog10().pow(Decimal.pow(1.125,player.upgrades[1]["13"].bought)).mul(player.upgrades[1]["13"].bought).add(1);
    player.upgrades[1]["14"].value=Decimal.pow(2,player.upgrades[1]["14"].bought);
    player.upgrades[1]["21"].value=Decimal.pow(2,player.upgrades[1]["21"].bought);
    player.upgrades[1]["22"].value=Decimal.max(player.helium.abs().pow(0.25).pow(player.upgrades[1]["22"].bought),1);
    player.upgrades[1]["23"].value=Decimal.pow(2,player.upgrades[1]["23"].bought)
    player.upgrades[1]["24"].value=player.upgrades[1]["24"].bought.add(1);
    player.maxAstroidBoostGenerator=player.upgrades[1]["24"].value;
}
function UpdateVariables(){
    player.lastUpdate = Date.now();
    playTime=(Date.now()-player.createdTime)/1000;
}
function InputLoop(){
    let tmpDecimal=new Decimal(document.getElementById("astroid-per-allocation-input").value).floor()
    if(!tmpDecimal.isFinite()||tmpDecimal.isNan()) tmpDecimal=Decimal.dZero;
    player.inputValue.astroidPerAllocation=tmpDecimal;
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