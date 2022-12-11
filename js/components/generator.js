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