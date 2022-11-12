function maxDecimal(a, b){
    if(a.isNan()) return b;
    if(b.isNan()) return a;
    if(a.greaterThan(b)){
        return a;
    }
    else{
        return b;
    }
}
function AbsPow(amount,power){
    return amount.abs().pow(power).mul(amount.sign);
}

function GetMultFromEnergy(){
    ({amount}=player.energy)
    if(amount.equals(0)) return new Decimal(1);
    return maxDecimal(
        amount.pow(amount.absLog10().absLog10()), amount.log10().add(2)).add(1);
}
function CalMult(){
    for(let i=0;i<player.maxAstroidBoostGenerator;i++){
        let tmp=new Decimal("2").pow(player.astroidAmount)
        if(player.upgrades.He[21].bought) tmp=tmp.mul(player.upgrades.He["21"].value.pow(allocatableAstroids));
        player.generatorList["H"][i].multByDimB=tmp;
    }
    let energyMult=GetMultFromEnergy();
    for(let i=0;i<MAX_GENERATOR;i++){
        g=player.generatorList["H"][i];
        g.totalMult=g.mult.mul(g.multByDimB).mul(energyMult);
        //console.log(1);
    }
}
function CalEnergyMult(){
    let tmp=player.energy.multByAccel;
    if(player.upgrades.He[11].bought.greaterThan(0)){
        tmp=tmp.mul((player.upgrades.He[11].value.pow(player.energy.astroidsAllocated)));
    }
    if(player.upgrades.He[31].bought){
        tmp=tmp.mul(player.upgrades.He[31].value);
    }
    player.energy.mult=tmp
}