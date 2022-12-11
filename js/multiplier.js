function maxDecimal(a, b){
    if(a.isNan()) return b;
    if(b.isNan()) return a;
    if(a.gt(b)){
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
    if(amount.eq(0)) return new Decimal(1);
    return maxDecimal(
        amount.pow(amount.absLog10().absLog10()), amount.log10().add(2)).add(1);
}
function getMultFromBuy(genID){
    return Decimal.pow(2,player.generatorList.H[genID].bought);
}
function CalMult(){
    let energyMult=GetMultFromEnergy();
    for(let i=0;i<MAX_GENERATOR;i++){
        g=player.generatorList["H"][i];
        let tmp=new Decimal(1)
        if(i<player.maxAstroidBoostGenerator){
            tmp=new Decimal("2").pow(player.astroidAmount)
            if(player.upgrades.He[12].bought.gt(0)) tmp=tmp.mul(player.upgrades.He[12].value.pow(allocatableAstroids));
            if(i===0&&player.upgrades.He[22].bought.gt(0)){
                tmp=tmp.mul(player.upgrades.He[22].value);
            }
        }

        g.mult=new Decimal("0.5").pow(i).mul(tmp).mul(getMultFromBuy(i)).mul(energyMult);
    }
}
function CalEnergyMult(){
    let tmp=player.energy.multByAccel;
    if(player.upgrades.He[11].bought.gt(0)){
        tmp=tmp.mul((player.upgrades.He[11].value.pow(player.energy.astroidsAllocated)));
    }
    if(player.upgrades.He[13].bought.gte(player.upgrades.He[13].type[1])){
        tmp=tmp.mul(player.upgrades.He[13].value);
    }
    player.energy.mult=tmp
}
const GetFusedLoseRate= function(d){
    if(d.lte(1)&&d.gte(-1)) return new Decimal(1);
    return player.fusion.loseRate.pow(d.absLog10().absLog10().abs().mul(player.fusion.loseDriftFactor));
}
function GetFusedAmount(d,diff){
    if(d.lte(1)&&d.gte(-1)) return d;
    return d.mul(GetFusedLoseRate(d).pow(diff));
}