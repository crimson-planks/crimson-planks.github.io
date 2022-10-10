function buyGenerator(Gnum,Gtype="hydrogen",buyType="manual"){
    let g=player.GeneratorList[Gtype][Gnum-1];
    if(getIfBuyable(g.cost)){
        g.bought=g.bought.plus(new Decimal("1"));
        g.amount=g.amount.plus(new Decimal("1"));
        player.money=player.money.minus(g.cost);
        g.costMultDrift=g.costMult
        if(g.bought>6&&Gtype=="hydrogen"){
            g.costMultDrift=g.costMultDrift.mul(g.costMult.pow(g.bought.add(Gnum-6-1).pow(player.CostDriftFactor).floor()));
        }
        g.cost=g.cost.mul(g.costMultDrift);
        g.mult=g.mult.mul(2);

        if(player.amountOfGenerators==Gnum && player.amountOfGenerators<player.currentMaxGenerator){
            putText(Gnum+1);
        }
        return true;
    }
    else{
        return false;
    }
}
function unlockEnergy(){
    if(getIfBuyable(player.energy.unlockCost,player.DimensionBoostAmount)){
        player.energy.unlocked=true;
    }
}