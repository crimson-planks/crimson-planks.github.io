function GetIfBuyable(cost,money=player.money){
    if(money.sign!==cost.sign){
        return false;
    }
    if(cost.abs().lessThanOrEqualTo(money.abs())){
        return true;
    }
    else{
        return false;
    }
}
function CostIncrease(genID){
    ({costDriftFactor,costDriftStartValue}=player)
    let g=player.generatorList[genID[0]][genID[1]];
    
    g.costMultDrift=g.costMult;
        if(g.bought.gt(costDriftStartValue[0])&&genID[0]==0){
            g.costMultDrift=g.costMultDrift.mul(g.costMult.pow(g.bought.minus(costDriftStartValue[0]).mul(genID+1).pow(costDriftFactor).floor()))
        }
    return g.costMultDrift;
}
function BuyGenerator(genID,buyType="manual"){
    if(player.currentVisibleGenerators<genID){
        return false;
    }
    let g=player.generatorList[genID[0]][genID[1]];
    if(GetIfBuyable(g.cost)){
        g.bought=g.bought.plus(1);
        g.amount=g.amount.plus(1);
        player.money=player.money.minus(g.cost);
        g.costMultDrift=CostIncrease(genID);
        g.cost=g.cost.mul(g.costMultDrift);
        //g.mult=g.mult.mul(2);
        if(player.amountOfGenerators===genID[1]+1 && player.amountOfGenerators<player.currentMaxGenerator){
            player.currentVisibleGenerators=genID[1]+2;
            PutText(player.currentVisibleGenerators);
        }
        return true;
    }
    else{
        return false;
    }
}
function BuyMultipleGenerators(genID,buyAmount=0,buyMethod="manual"){
    //buyAmount === 0 for buy max
    let i=0;
    if(buyAmount==0){
        while(BuyGenerator(genID,buyMethod)) i++;
        return i;
    }
    for(;i<buyAmount;i++){
        if(!BuyGenerator(genID,buyMethod)) break;
    }
    return i;
}
function BuyMax(){
    for(let i=0;i<player.currentVisibleGenerators;i++){
        BuyMultipleGenerators([0,i]);
    }
}
function UnlockEnergy(){
    if(GetIfBuyable(player.energy.unlockCost,player.astroidAmount)){
        player.generator.unlocked=true;
        player.energy.unlocked=true;
        save();
    }
}
function AllocateAstroid(amount){
    amount=new Decimal(amount);
    ({energy}=player);
    if(amount.sign===0) return 0;
    if(amount.sign===1){
        if(GetIfBuyable(amount,allocatableAstroids)){
            energy.astroidsAllocated=energy.astroidsAllocated.plus(amount);
            player.astroidAmount=player.astroidAmount.minus(amount);
            return amount;
        }
        else{
            energy.astroidsAllocated=energy.astroidsAllocated.plus(allocatableAstroids);
            player.astroidAmount=player.astroidAmount.minus(allocatableAstroids);
            return allocatableAstroids;
        }
    }
    if(amount.sign===(-1)){
        if(energy.astroidsAllocated.plus(amount).lt(0)){
            let tmp=energy.astroidsAllocated.mul(-1);
            energy.astroidsAllocated=new Decimal(0);
            player.astroidAmount=player.astroidAmount.minus(tmp);
            return tmp;
        }
        else{
            energy.astroidsAllocated=energy.astroidsAllocated.plus(amount);
            player.astroidAmount=player.astroidAmount.minus(amount);
            return amount;
        }
    }
}
function UnlockFusion(){
    if(GetIfBuyable(player.fusion.unlockCost)){
        player.fusion.unlocked=true;
        save();
    }
}
function BuyUpgrade(id){
    upgrade=player.upgrades[id[0]][id[1]];
    upgrade.buyOnce();
}
function GetEnergyMultFromAstroidAccel(){
    return maxDecimal(player.energy.amount.div(
        maxDecimal(new Decimal(1),player.energy.lastAccelEnergy)
        ).pow(0.5),
        new Decimal(1)
    );
}
function AstroidAccelation(){
    player.energy.multByAccel=player.energy.multByAccel.mul(GetEnergyMultFromAstroidAccel());
    
    player.energy.lastAccelEnergy=maxDecimal(player.energy.amount,player.energy.lastAccelEnergy);
    player.energy.amount=new Decimal(player.energy.defaultEnergy);
}