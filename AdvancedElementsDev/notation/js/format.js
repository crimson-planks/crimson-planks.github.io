//Warning: bugs, lots of bugs.
function magAbs(amount){
    if(amount.equals(0)){
        return amount;
    }
    if(amount.abs().lessThan(1)){
        if(amount.layer==0){
            return amount.abs().recip();
        }
        else{
            return Decimal.fromComponents(1,amount.layer,Math.abs(amount.mag))
        }
    }
    else{
        return amount.abs();
    }
}
function format(amount, property={}){
    let tmpOption={...{notation: player.notation}, ...property};
    let defaultOption={ 
        "general":{
            dec:2,
            smallDec:2,
            maxBeforeNotate:3,
            maxExp: new Decimal("1e9"),
            maxNotatedLayer: 4,
            customNegative: false,
            customNegativeExp: false,
            notation: player.notation
        }
    }
    let optionName=tmpOption.notation;
    if(defaultOption.optionName===undefined){
        optionName="general";
    }
    //console.log(optionName,defaultOption["general"]+defaultOption[optionName]+(optionName==="general"))
    let option={...(defaultOption[optionName]), ...property}

    //<code used by many formats>
    let eString="";
    let eCount=amount.layer-1;
    if(option.maxExp.lessThanOrEqualTo(Math.abs(amount.mag))){
        eCount++;
    }
    console.log("eCount: "+eCount)
    if(eCount<=option.maxNotatedLayer) for(let i=0;i<eCount;i++) eString+="e";
    let mNumber=new Decimal(404);
    if(amount.layer-eCount>=0) mNumber=Decimal.fromComponents(amount.sign,amount.layer-eCount,amount.mag);

    if(!option.customNegative&&amount.sign===-1){
        return "-"+format(amount.abs(),option);
    }
    //</code used by many formats>
    console.log(mNumber);
    if(option.notation==="scientific"){
        if(magAbs(amount).lessThan(new Decimal(new Decimal(10).pow(option.maxExp)))){
            let power=amount.absLog10().floor();
            if(power.isNan()) return new Decimal(0).toFixed(option.smallDec);
            if(magAbs(power).lessThan(option.maxBeforeNotate)) return amount.toFixed(option.smallDec);
            let mantissa=amount.dividedBy(new Decimal("10").pow(power));
            return `${mantissa.toFixed(option.dec)}e${power}`;
        }
        else if(magAbs(amount).lessThan(Decimal.fromComponents(1,option.maxNotatedLayer+1,option.maxExp))){
            console.log(mNumber);
            return eString+format(mNumber,{...option, ...{dec:2}});
        }
        else{
            return `(e^${format(new Decimal(eCount),{...option, ...{smallDec:0,dec:3,maxBeforeNotate:4}})})${format(mNumber,option)}`;
        }
    }
    else if(option.notation==="engineering"){
        if(magAbs(amount).lessThan(new Decimal(new Decimal(10).pow(option.maxExp)))){
            let power=amount.absLog10().dividedBy(3).floor().mul(3);
            if(power.isNan()) return new Decimal(0).toFixed(option.smallDec);
            if(power.lessThan(option.maxBeforeNotate)) return amount.toFixed(option.smallDec);
            let mantissa=amount.dividedBy(new Decimal("10").pow(power));
            return `${mantissa.toFixed(option.dec)}e${power}`;
        }
        else if(magAbs(amount).lessThan(Decimal.fromComponents(1,option.maxNotatedLayer+1,option.maxExp))){
            return eString+format(mNumber,{...option, ...{dec:2}});
        }
        else{
            return `(e^${format(new Decimal(eCount),{...option, ...{smallDec:0,dec:3,maxBeforeNotate:4}})})${format(mNumber,option)}`;
        }
    }
    else if(option.notation==="logarithm"){
        if(magAbs(amount).lessThan(new Decimal(new Decimal(10).pow(option.maxExp)))){
            let power=amount.absLog10();
            if(power.isNan()) return new Decimal(0).toFixed(option.smallDec);
            if(power.lessThan(option.maxBeforeNotate)) return amount.toFixed(option.smallDec);
            return `e${power.toFixed(option.dec)}`
        }
        else if(magAbs(amount).lessThan(Decimal.fromComponents(1,option.maxNotatedLayer+1,option.maxExp))){
            return eString+format(mNumber,{...option, ...{dec:2}});
        }
        else{
            return `(e^${format(new Decimal(eCount),{...option, ...{smallDec:0,dec:3,maxBeforeNotate:4}})})${format(mNumber,option)}`;
        }
    }
    return "Format Error";
}