function getDimboostRequiredGenID(){
    if(player.DimensionBoostAmount.lessThan(4)){
        requiredGenerator=player.DimensionBoostAmount.add(4);
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
function GetMultByDimb(){
    player.GeneratorList["hydrogen"][0].multByDimB=new Decimal("2").pow(player.DimensionBoostAmount);
}
function DimensionBoost(){
    let requiredGenerator=0;
    requiredGenerator=getDimboostRequiredGenID();
    calMult();
    if(getIfBuyable(player.DimensionBoostCost,player.GeneratorList["hydrogen"][getDimboostRequiredGenID()-1].amount)){
        ResetDimensionRange(1,8);
        if(player.DimensionBoostAmount.lessThan(4)) player.currentMaxGenerator++;
        else{
            player.DimensionBoostCost=player.DimensionBoostCost.add("7");
        }
        player.DimensionBoostAmount=player.DimensionBoostAmount.add(1);
        player.TotalAstroids=player.TotalAstroids.add(1);
        player.money=player.defaultMoney;
        GetMultByDimb();
        putText(1);
        return true;
    }
    else{
        return false;
    }
}