function maxDecimal(a=new Decimal(), b=new Decimal()){
    if(a.greaterThan(b)){
        return a;
    }
    else{
        return b;
    }
}
function getMultFromEnergy(){
    ({amount}=player.energy)
    if(amount.equals(0)) return new Decimal(1);
    return maxDecimal(
        amount.pow(amount.absLog10().log10()), amount.log10().add(2)).add(1);
}
function CalMult(){
    player.generatorList["hydrogen"][0].multByDimB=new Decimal("2").pow(player.astroidAmount);
    let energyMult=getMultFromEnergy();
    for(let i=0;i<MAX_GENERATOR;i++){
        g=player.generatorList["hydrogen"][i];
        g.totalMult=g.mult.mul(g.multByDimB).mul(energyMult);
        //console.log(1);
    }
}