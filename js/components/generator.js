class Generator{
    constructor(id,cost,bought,amount,mult,costMult,costMultDrift){
        if(cost===undefined){
            cost=new Decimal(10);
        }
        if(bought===undefined){
            bought=new Decimal(0);
        }
        if(amount===undefined){
            amount=new Decimal(0);
        }
        if(mult===undefined){
            mult=new Decimal(1);
        }
        if(costMult===undefined){
            costMult=new Decimal(10);
        }
        if(costMultDrift===undefined){
            costMultDrift=new Decimal(10);
        }
        this.id=id;
        this.cost=cost
        this.bought=bought
        this.amount=amount;
        this.mult=mult;
        this.costMult=costMult;
        this.costMultDrift=costMultDrift;
    }
    GetCost(boughtAmount){
        function fastCal(x){
            return x.pow(new Decimal(1.5)).mul(3).div(2)
        }
        let finalCost = this.costMult.pow(boughtAmount)
        if(boughtAmount.gt(player.costDriftStartValue[0])&&this.id[0]===0){
            finalCost = finalCost.mul(this.costMult.pow(fastCal(boughtAmount.minus(player.costDriftStartValue[0]).add(1)).mul(this.id[1]+1).mul(player.costDriftFactor).div(fastCostIncreaseCalcErrorFactor).floor()))
        }
        return finalCost
    }
    GetNextCost(){
        return this.GetCost(this.bought)
    }
    getMaxBuyableAmount(money){

    }
    getMaxBuyableCost(){}
}
Generator.fromObject=function(object){
    return new Generator(object.id,
        Decimal.fromObject(object.cost),
        Decimal.fromObject(object.bought),
        Decimal.fromObject(object.amount),
        Decimal.fromObject(object.mult),
        Decimal.fromObject(object.costMult),
        Decimal.fromObject(object.costMultDrift));
}
Generator.getDefaultCost=function(id){
    return new Decimal("10").mul(new Decimal("10").pow(id[1]*id[1]))
}
Generator.getDefaultGenerator=function(id){
    return new Generator(
    id,
    new Decimal("10").mul(new Decimal("10").pow(id[1]*id[1])),
    new Decimal("0"),
    new Decimal("0"),
    new Decimal("0.5").pow(id[0]),
    new Decimal("10"),
    new Decimal("10")
    );
}