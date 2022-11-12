//Warning: bugs, lots of bugs.
let clickerHeroesList=["K","M","B","T","q","Q","s","S","O","N","d","U","D","!","@","#","$","%","^","&","*","[","}","’","”","/","|",":",";","<",">",",",".","\\","?","~","±","a","A","á","Á","é","É","í","Í","ú","Ú","æ","Æ","Ø","¿","¶","ƒ","£","₣","₿","€","₲","h","H","j","J","p","P","w","₩","v","V","y","¥","¤","∑","®","†","¨","ı","π","ß","∂","©","λ","Ω","≈","ç","√","∫","™","‡","İ","∏","∆","Ç","◊","«","»","∧","∩","⊻","ñ","Ñ","C","Γ","∞","α","γ","δ","ε","ζ","θ","λ","ξ","τ","υ","φ","χ","ψ","Ξ","Φ","→","←","↑","↓","✪","+","-","×","÷","╳","♠","♥","♦","♣","Ⓐ","Ⓑ","Ⓒ","Ⓓ","Ⓔ","Ⓕ","Ⓖ","Ⓗ","Ⓘ","Ⓙ","Ⓚ","Ⓛ","Ⓜ","Ⓝ","Ⓞ","Ⓟ","Ⓠ","Ⓡ","Ⓢ","Ⓣ","Ⓤ","Ⓥ","Ⓦ","Ⓧ","Ⓨ","Ⓩ","⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹","⁺","⁻","⁼","⁽","⁾","∠","⦣","°","⟂","∥","∟","🄰","🄱","🄲","🄳","🄴","🄵","🄶","🄷","🄸","🄹","🄺","🄻","🄼","🄽","🄾","🄿","🅀","🅁","🅂","🅃","🅄","🅅","🅆","🅇","🅈","🅉"]
let defaultNotationOption={ 
    "general":{
        dec:2,
        smallDec:2,
        maxBeforeNotate:3,
        maxBeforeNegativePowerNotate: 2,
        maxExp: new Decimal("1e9"),
        maxNotatedLayer: 4,
        customNegative: false,
        customNegativeExp: false,
        extraDigit: 0,
    }
}
defaultNotationOption["letters"]={...defaultNotationOption["general"],};

function MagAbs(amount){
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
function FormatLetters(amount,str,property){
    let tmpOption={...{notation: player.notation}, ...property};
    let optionName=tmpOption.notation;
    if(defaultNotationOption.optionName===undefined){
        optionName="general";
    }
    let option={...(defaultNotationOption[optionName]), ...property};
    let power=amount.absLog10();
    const len=str.length;
    
    if(amount.equals(0)) return new Decimal(0).toFixed(option.smallDec);
    if(power.abs().lessThan(power.sign===-1 ? option.maxBeforeNegativePowerNotate : option.maxBeforeNotate)){
        return amount.toFixed(option.smallDec);
    }
    if(MagAbs(amount).lessThan(new Decimal(new Decimal(10).pow(option.maxExp)))){
        let intPower=power.floor();
        return intPower.minus(intPower.dividedBy(len).floor().mul(len)); 
    }
    return "Format Error";
}
function FormatValue(amount, property={}){
    if(property.notation===undefined){
        property.notation=player.notation;
    }
    const tmpOption={...{notation: player.notation}, ...property};
    let optionName=tmpOption.notation;
    if(defaultNotationOption.optionName===undefined){
        optionName="general";
    }
    //console.log(optionName,defaultNotationOption["general"]+[optionName]+(optionName==="general"))
    let option={...(defaultNotationOption[optionName]), ...property}

    //code used by many formats
    if(typeof amount==='number'){
        amount=new Decimal(amount);
    }
    let eString="";
    let eCount=amount.layer-1;
    if(option.maxExp.lessThanOrEqualTo(Math.abs(amount.mag))){
        eCount++;
    }
    //console.log("eCount: "+eCount)
    if(eCount<=option.maxNotatedLayer) for(let i=0;i<eCount;i++) eString+="e";
    let mNumber=new Decimal("-42");
    if(amount.layer-eCount>=0) mNumber=Decimal.fromComponents(amount.sign,0,amount.mag);
    if(!option.customNegative&&amount.sign===-1){
        return "-"+FormatValue(amount.abs(),option);
    }
    //console.log(mNumber);
    
    //notations with the same code beyond ee9
    if(["scientific","engineering","engineering-alt","logarithm"].includes(option.notation)){

        if(amount.equals(0)) return new Decimal(0).toFixed(option.smallDec);
        let power=amount.absLog10();

        //console.log(power)
        //console.log((power.sign===-1)+[]+"a: "+(power.sign===-1 ? option.maxBeforeNegativePowerNotate : option.maxBeforeNotate)+[])
        //console.log(MagAbs(power).lessThan(power.sign===-1 ? option.maxBeforeNegativePowerNotate : option.maxBeforeNotate))
        if(power.abs().lessThan(power.sign===-1 ? option.maxBeforeNegativePowerNotate : option.maxBeforeNotate)){
            return amount.toFixed(option.smallDec);
        }

        if(MagAbs(amount).lessThan(new Decimal(Decimal.pow(10,option.maxExp)))){
            if(option.notation==="scientific"){
                power=power.floor();
                if(power.lessThan(0)){
                    power=power.add(-1);
                }
                power=power.minus(option.extraDigit);
                
                let mantissa=amount.dividedBy(new Decimal("10").pow(power));
                return `${mantissa.toFixed(option.dec)}e${power}`;
            }
            if(option.notation==="engineering"){
                power=power.dividedBy(3).floor().mul(3);
                if(power.lessThan(0)){
                    power=power.add(-3);
                }
                power=power.minus(option.extraDigit);

                let mantissa=amount.dividedBy(new Decimal("10").pow(power));
                return `${mantissa.toFixed(option.dec)}e${power}`;
            }
            if(option.notation==="engineering-alt"){
                power=power.floor();
                let rpower=power;

                power=power.add(power.sign===1 ? 2 : 0).dividedBy(3).floor().mul(3);
                power=power.minus(option.extraDigit);

                rpower=rpower.minus(power).toNumber();
                let mantissa=amount.dividedBy(new Decimal("10").pow(power));
                return `${mantissa.toFixed(option.dec-rpower+(power.sign===-1))}e${power}`;
            }
            if(option.notation==="logarithm"){
                if(MagAbs(power).lessThan(option.maxBeforeNotate)) return amount.toFixed(option.smallDec);
                return `e${power.toFixed(option.dec)}`
            }
        }
        else if(MagAbs(amount).lessThan(Decimal.fromComponents(1,option.maxNotatedLayer,option.maxExp))){
            return eString+FormatValue(mNumber,{...option, ...{dec:4}});
        }
        else{
            return `(e^${FormatValue(new Decimal(eCount),{...option, ...{smallDec:0,dec:3,maxBeforeNotate:4}})})${FormatValue(mNumber,{...option, ...{dec:4}})}`;
        }
    }
    return "Format Error";
}