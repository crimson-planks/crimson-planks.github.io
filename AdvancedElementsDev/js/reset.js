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
function ResetGeneratorRange(start,end,type=0){
    for(let i=start;i<=end;i++){
        ResetGenerator([type,i]);
    }
    PutText(1);
}
function reset(stage){
    if(stage>=0){
        CalMult();
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
    }
    if(stage>=1){
        player.energy.multByAccel=new Decimal(1)
        player.energy.mult=new Decimal(1)
        player.energy.unlocked=false;
        player.energy.astroidsAllocated=new Decimal(0);
        player.totalAstroids=new Decimal(0);
        player.astroidAmount=player.totalAstroids;
        player.currentMaxGenerator=4;
    }
    if(stage>=2){
        tmp=jQuery.extend({},defaultPlayer.upgrades[1]);
        player.upgrades[1]=undefined
        player.upgrades[1]=tmp;
    }
}
function ObtainAstroid(){
    if(GetIfBuyable(player.astroidCost,player.generatorList[0][getAstroidRequiredGenID()].amount)){
        reset(0);
    }
}
function ToggleActivateFusion(){
    player.fusion.activated=!player.fusion.activated;
    player.money=player.defaultMoney;
    ResetGeneratorRange(0,7);
}