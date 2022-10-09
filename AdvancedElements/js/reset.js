function getDimboostRequiredGenID(){
    if(player.DimensionBoostAmount<4){
        requiredGenerator=4+player.DimensionBoostAmount;
    }
    else{
        requiredGenerator=8;
    }
    return requiredGenerator;
}
function ResetDimension(dimID,type="hydrogen"){
    let generator = player.GeneratorList[type][dimID];
    generator.cost= new Decimal("10").mul(new Decimal("10").pow(dimID*dimID)),
    generator.bought= new Decimal("0"),
    generator.amount= new Decimal("0"),
    generator.mult= new Decimal("1"),
    generator.costMult= new Decimal("10")
}
function ResetDimensionRange(start,end,type="hydrogen"){
    for(let i=start;i<=end;i++){
        ResetDimension(i-1,type);
    }
}
function DimensionBoost(){
    let requiredGenerator=0;
    requiredGenerator=getDimboostRequiredGenID();
    if(getIfBuyable(player.DimensionBoostCost,player.GeneratorList["hydrogen"][getDimboostRequiredGenID()-1].amount)){
        ResetDimensionRange(1,8);
        if(player.DimensionBoostAmount<4) player.currentMaxGenerator++;
        player.clickMult=player.clickMult.mul(2);
        player.money=player.defaultMoney;
    }
}