class Upgrade{
    constructor(type,id,cost,defaultCost,defaultValue,value,bought){
        //new Upgrade([type{0: "unlimited",1:"limited"},max])
        if(type===undefined){
            type=[0]
        }
        if(type.length===1){
            type=type.concat(Decimal.dInf);
        }
        if(typeof type[1]==="number"){
            type[1]=new Decimal(type[1]);
        }
        if(defaultValue===undefined){
            defaultValue=new Decimal(1);
        }
        if(value===undefined){
            value=defaultValue;
        }
        if(bought===undefined){
            bought=new Decimal(0);
        }
        if(defaultCost===undefined){
            defaultCost=cost;
        }
        this.type=type;
        this.id=id;
        this.cost=cost;
        this.defaultCost=defaultCost;
        this.defaultValue=defaultValue;
        this.value=value;
        this.bought=bought;
    }
    reset(){
        this.bought=new Decimal(0);
    }
    buyOnce(){
        if(this.bought.gte(this.type[1])){
            return;
        }
        
        if(this.id[0]===1){
            if(GetIfBuyable(this.cost,player.helium)){
                player.helium=player.helium.minus(this.cost);
                this.bought=this.bought.add(1);
                if(this.id[1]==="11"){
                    this.cost=this.cost.mul(10);
                    return;
                }
                else if(this.id[1]==="13"){
                    this.cost=this.cost.mul("1e10")
                }
                else if(this.id[1]==="14"){
                    this.cost=this.cost.mul(10);
                }
                else if(this.id[1]==="21"){
                    this.cost=this.cost.mul("1e3");
                }
                else if(this.id[1]==="22"){
                    this.cost=this.cost.mul("1e50");
                }
                else if(this.id[1]==="23"){
                    this.cost=this.cost.mul("1e5");
                }
                else if(this.id[1]==="24"){
                    this.cost=this.cost.mul("1e12");
                }
            }
        }
    }
}
Upgrade.fromObject=function(object){
    const ot=[object.type[0],Decimal.fromObject(object.type[1])];
    return new Upgrade(ot,
        object.id,
        Decimal.fromObject(object.cost),
        Decimal.fromObject(object.defaultCost),
        Decimal.fromObject(object.defaultValue),
        Decimal.fromObject(object.value),
        Decimal.fromObject(object.bought));
}