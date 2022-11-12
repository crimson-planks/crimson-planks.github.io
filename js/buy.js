function GetIfBuyable(cost,money=player.money){
    if(money.sign!=cost.sign){
        return false;
    }
    if(cost.abs().lessThanOrEqualTo(money.abs())){
        return true;
    }
    else{
        return false;
    }
}
function CostIncrease(Gnum,Gtype="H"){
    let g=player.generatorList[Gtype][Gnum-1];
    let costDriftStartValue2=player.costDriftStartValue[0].mul(player.costDriftStartValue[1]);
    let costDriftStartValue3=costDriftStartValue2.mul(player.costDriftStartValue[2])
    g.costMultDrift=g.costMult;
        if(g.bought.greaterThan(player.costDriftStartValue[0])&&Gtype=="H"){
            g.costMultDrift=g.costMultDrift.mul(
                g.costMult.pow(
                    g.bought.mul(
                        new Decimal(Gnum).plus(1)
                        ).mul(player.costDriftFactor)
                        .minus(player.costDriftStartValue[0])
                        .pow(player.costDriftFactor)
                        .floor()));
            if(g.bought.greaterThan(costDriftStartValue2)){
                g.costMultDrift=g.costMultDrift.mul(
                    g.costMult.pow(
                        g.bought.minus(costDriftStartValue2)
                        .pow(player.costDriftFactor.mul(2))));
                if(g.bought.greaterThan(costDriftStartValue3)){
                    
                }
            }
        }
    return g.costMultDrift;
}
function BuyGenerator(Gnum,Gtype="H",buyType="manual"){
    if(player.currentVisibleGenerators<Gnum){
        return false;
    }
    let g=player.generatorList[Gtype][Gnum-1];
    if(GetIfBuyable(g.cost)){
        g.bought=g.bought.plus(new Decimal("1"));
        g.amount=g.amount.plus(new Decimal("1"));
        player.money=player.money.minus(g.cost);
        g.costMultDrift=CostIncrease(Gnum,Gtype);
        g.cost=g.cost.mul(g.costMultDrift);
        g.mult=g.mult.mul(2);
        if(player.amountOfGenerators==Gnum && player.amountOfGenerators<player.currentMaxGenerator){
            player.currentVisibleGenerators=Gnum+1;
            PutText(player.currentVisibleGenerators);
        }
        return true;
    }
    else{
        return false;
    }
}
function BuyMultipleGenerators(Gnum,buyAmount=0,Gtype="H",buyMethod="manual"){
    //buyAmount === 0 for buy max
    let i=0;
    if(buyAmount==0){
        while(BuyGenerator(Gnum,Gtype,buyMethod)) i++;
        return i;
    }
    for(;i<buyAmount;i++){
        if(!BuyGenerator(Gnum,Gtype,buyMethod)) break;
    }
    return i;
}
function BuyMax(){
    for(let i=1;i<=player.currentVisibleGenerators;i++){
        BuyMultipleGenerators(i);
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
        if(energy.astroidsAllocated.plus(amount).lessThan(0)){
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
function BuyUpgrade(id,type="He"){
    upgrade=player.upgrades[type][id];
    //upgrade.bought may not be a boolean
    if(upgrade.bought===true){
        return;
    }
    if(type=="He"){
        if(GetIfBuyable(upgrade.cost,player.helium)){
            player.helium=player.helium.minus(upgrade.cost);
            if(id==="11"){
                upgrade.value=upgrade.value.mul("1.01");
                upgrade.cost=upgrade.cost.mul(Decimal.pow(10,upgrade.bought.pow(0.5).add(1).floor()));
                upgrade.bought=upgrade.bought.add(1);
                return;
            }
            else if(id==="21"){
                upgrade.bought=true;
                return;
            }
            else if(id==="31"){
                upgrade.bought=true;
                return;
            }
            else if(id==="41"){
                upgrade.value=upgrade.value.mul("0.90");
                upgrade.cost=upgrade.cost.mul("1e5");
                upgrade.bought=upgrade.bought.add(1);
                return;
            }
        }
    }
}
function GetEnergyMultFromAstroidAccel(){
    return maxDecimal(player.energy.amount.dividedBy(
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