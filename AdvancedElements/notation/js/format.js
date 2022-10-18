function format(amount, property={}){
    let option={...{
        dec:2,
        smallDec:2,
        maxBeforeNotate:3,
        maxExp: new Decimal("1e9"),
        maxNotatedLayer: 4,
        notation: player.notation
    }, ...property};
    if(option.notation=="scientific"){
        let eString="";
        let eCount=amount.layer-1;
        if(option.maxExp.lessThanOrEqualTo(amount.mag)){
            eCount++;
        }
        if(eCount<=option.maxNotatedLayer) for(let i=0;i<eCount;i++) eString+="e";
        //console.log(Decimal.fromComponents(1,option.maxLayerNotate,option.maxExp))
        let mNumber=new Decimal(404);
        if(amount.layer-eCount>=0) mNumber=Decimal.fromComponents(amount.sign,amount.layer-eCount,amount.mag);
        if(amount.abs().lessThan(new Decimal(new Decimal(10).pow(option.maxExp)))){
            let power=amount.absLog10().floor();
            if(power.isNan()) return new Decimal(0).toFixed(option.smallDec);
            if(power.lessThan(option.maxBeforeNotate)) return amount.toFixed(option.smallDec);
            let mantissa=amount.dividedBy(new Decimal("10").pow(power));
            return mantissa.toFixed(option.dec) + "e" + power;
        }
        else if(amount.abs().lessThan(Decimal.fromComponents(1,option.maxNotatedLayer+1,option.maxExp))){
            return eString+format(mNumber,{...option, ...{dec:2}});
        }
        else{
            return `(e^${format(new Decimal(eCount),{...option, ...{smallDec:0,dec:3,maxBeforeNotate:4}})})${format(mNumber,option)}`;
        }
    }
    return "Format Error"
}