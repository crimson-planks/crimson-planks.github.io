function getAstroidRequiredGenID(){
    if(player.totalAstroids<4){
        requiredGenerator=player.totalAstroids.toNumber()+3;
    }
    else{
        requiredGenerator=7;
    }
    return requiredGenerator;
}
const ResetGenerator=function(id){
    //console.log(id);
    player.generatorList[id[0]][id[1]]=Generator.getDefaultGenerator(id)
}
function ResetGeneratorRange(start,end,type="H"){
    for(let i=start;i<=end;i++){
        ResetGenerator([type,i]);
    }
    PutText(1);
}
function ObtainAstroid(){
    CalMult();
    if(GetIfBuyable(player.astroidCost,player.generatorList["H"][getAstroidRequiredGenID()].amount)){
        ResetGeneratorRange(0,7);
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
    ResetGeneratorRange(0,7);
}