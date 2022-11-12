function getDimboostRequiredGenID(){
    if(player.totalAstroids.lessThan(4)){
        requiredGenerator=player.totalAstroids.add(4);
    }
    else{
        requiredGenerator=8;
    }
    return requiredGenerator;
}
function getDefaultDimension(genID){
    let generator = {
        cost: new Decimal("10").mul(new Decimal("10").pow(genID*genID)),
        bought: new Decimal("0"),
        amount: new Decimal("0"),
        mult: new Decimal("1"),
        multByDimB: new Decimal("1"),
        totalMult: new Decimal("1"),
        costMult: new Decimal("10"),
        costMultDrift: new Decimal("10")
      }
    return generator;
}
function ResetDimension(genID,type="H"){
    player.generatorList[type][genID]=getDefaultDimension(genID);
}
function ResetDimensionRange(start,end,type="H"){
    for(let i=start;i<=end;i++){
        ResetDimension(i-1,type);
    }
}
function DimensionBoost(){
    CalMult();
    if(GetIfBuyable(player.astroidCost,player.generatorList["H"][getDimboostRequiredGenID()-1].amount)){
        ResetDimensionRange(1,8);
        if(player.totalAstroids.lessThan(4)) player.currentMaxGenerator++;
        else{
            player.astroidCost=player.astroidCost.add(player.astroidCostIncrease);
        }
        player.astroidAmount=player.astroidAmount.add(1);
        player.totalAstroids=player.totalAstroids.add(1);
        player.money=player.defaultMoney;
        player.currentVisibleGenerators=1;
        player.energy.amount=new Decimal(0);
        player.helium=player.defaultHelium;
        CalMult();
        PutText(1);
        return true;
    }
    else{
        return false;
    }
}
function ToggleActivateFusion(){
    player.fusion.activated=!player.fusion.activated;
    player.money=player.defaultMoney;
}