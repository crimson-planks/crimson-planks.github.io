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
    return arr;
}
const FormatWithCommas= (num)=>Intl.NumberFormat('en-US').format(num);

function calEcountAndMnumber(amount,base=10,powMaxExp=new Decimal(1e9)){
    let isExpNegative=false;
    let calFinalmNumber=(mNumber)=>isExpNegative?Decimal.minus(0,mNumber):mNumber
    let logbase=Math.log(base);
    amount=new Decimal(amount).abs();
    if(amount.absLog10().lt(0)){
        isExpNegative=true;
        amount.mag=Math.abs(amount.mag);
    }
    powMaxExp=new Decimal(powMaxExp);

    if(base!==Math.floor(base)) throw Error("base must be an integer");
    if(base<2) throw RangeError("base must be greater than or equal to 2");
    
    let eCount=-1;
    let tmpDecimal=powMaxExp;
    let mNumber=Decimal.dNaN;
    let tmpAmount=amount;
    if(amount.layer<=MAX_ECOUNT_CAL){
        while(tmpDecimal.lte(amount)){
            tmpDecimal=Decimal.pow(base,tmpDecimal);
            tmpAmount=tmpAmount.log(base);
            eCount++;
        }
        mNumber=Decimal.pow(base,tmpAmount);
    }
    else{
        
        let reducedAmount=amount.layer-MAX_ECOUNT_CAL;
        tmpAmount.layer=MAX_ECOUNT_CAL;
        let calResult=calEcountAndMnumber(tmpAmount,base,powMaxExp);
        console.log(calResult);
        eCount=calResult.eCount+reducedAmount;
        mNumber=calResult.mNumber;
        
    }
    return {eCount: eCount,mNumber: calFinalmNumber(mNumber)};
    //return amount.slog(base,5).minus(powMaxExp.slog(base,5)).floor().toNumber()
}
function GetOption(property){
    ({notationOption}=player)
    if(property.notation===undefined){
        property.notation=player.notation;
    }
    const tmpOption={...{notation: player.notation}, ...property};
    let optionName=tmpOption.notation;
    if(notationOption[optionName]===undefined){
        if(["letters","emoji"].includes(notationOption[optionName])) optionName="letters"
        else optionName="general";
    }
    let option={...(notationOption["general"]), ...(notationOption[optionName]), ...property}
    return option;
}

function ConsecutiveCharacter(chr,n){
    //f("M",3)=["","M","MM","MMM"];
    let rarr=(RepeatArr(
        (i)=>[RepeatArr(
            ()=>chr,i)],n));
    rarr.forEach(function(value,index){
        let rslt="";
        value.forEach(function(value){
            rslt+=value;
        });
        rarr[index]=rslt;
    });
    return rarr;
}
function ArrToInequality(arr){
    //console.log(arr);
    if(typeof arr===typeof ""){
        arr=arr.split('');
        arr=arr.map(value=>+value)
    }
    let rsltarr=[];
    arr.forEach(function(value,index,array){
        if(index!==array.length-1) rsltarr=rsltarr.concat(BigInt.cmp(array[index],array[index+1]));
    });
    return rsltarr;
}

function FormatLetter(n,str,property){
    ({notationOption}=player)
    if(Object.keys(n)!==Object.keys(new Decimal())) n=new Decimal(n);
    if(str===undefined){
        str="abcdefghijklmnopqrstuvwxyz";
    }

    let option=GetOption(property);
    let powMaxExp=Decimal.pow(option.base,option.maxExp);
    let resultString="";
    let isNegative=false;
    if(n.lt(0)){
        n=n.abs();
        isNegative=true;
    }
    const len=str.length;
    let getRsltLen= (x,m) => Decimal.logarithm(Decimal.minus(m,1).mul(x).plus(1),m);
    const rsltLen = getRsltLen(n,len).floor();
    //console.log("rsltLen: "+rsltLen);
    if(n.absLog10().lt(powMaxExp)){
        let skippedAmount=rsltLen.minus(option.show);
        //console.log("skippedAmount: "+skippedAmount)
        let isSkipped=rsltLen.gt(option.maxFullShow);
        //console.log("isSkipped: "+isSkipped+" maxfullshow: "+option.maxFullShow)
        if(isSkipped){
            n=n.div(Decimal.pow(len,skippedAmount)).floor();
            //console.log(n);
            resultString="["+FormatValue(skippedAmount,{notation: option.notation,smallDec: 0})+"]"
        }
        while(n.gt(0)){
            resultString=str[(n-1)%len]+resultString;
            n=n.minus(1).div(len).floor();
            //console.log(n.toString());
        }
        if(isNegative) resultString=option.negativeSign+resultString;
        return resultString;
    }
    return "Format Error";
}
function GetDefaultBaseStr(base){
    chrArr="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/".split("")
    if(base==64){
        chrArr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    }
    return chrArr;
}
function IntegerToBase(n,base,chrArr,isArr=false){
    n=BigInt(n);
    base=BigInt(base);
    let isNegative=false;
    if(typeof chrArr!=="string") chrArr=GetDefaultBaseStr(base);
    if(chrArr.length<base){
        throw RangeError("chrArr.length must be larger or equal to base");
    }
    if(n<0) isNegative=true;
    let tmpString="";
    if(isArr) tmpString=[];
    if(n===0n) return isArr?[0]:"0"
    if(isArr){
        while(n>0){
            tmpString=[n%base].concat(tmpString);
            n=n/base
        }
    }
    else while(n>0){
        tmpString=chrArr[n%base]+tmpString;
        n=n/base
    }
    if(isArr) return tmpString;
    return isNegative?'-':''+tmpString;
}
function NumberToBaseArr(n,base=10,digits=20,minDigit,chrArr){
    if(minDigit===undefined) minDigit=digits;
    if(digits<0||digits>20) throw RangeError("must be 0<=digits<=20");
    if(minDigit<0||minDigit>20) throw RangeError("must be 0<=minDigit<=20");
    if(digits===0) return [IntegerToBase(Math.round(n),base,chrArr,true)];
    let maxRemainder=Math.pow(base,digits);
    let whole=Math.floor(n);
    let remainder=Math.floor((n-whole)*Math.pow(base,digits+1));
    let tmpArr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] //len:20
    remainder=Math.round(remainder/base);
    if(remainder>=maxRemainder){
        whole+=remainder/maxRemainder;
        remainder=remainder%maxRemainder;
    }
    let wholeArr=IntegerToBase(whole,base,chrArr,true);
    let remainderArr=IntegerToBase(remainder,base,chrArr,true);
    remainderArr=tmpArr.concat(remainderArr).slice(-digits);
    return [wholeArr,remainderArr];
}
function NumberToBase(n,base=10,digits=20,minDigit,chrArr){
    if(minDigit===undefined) minDigit=digits;
    if(digits<0||digits>20) throw RangeError("must be 0<=digits<=20");
    if(minDigit<0||minDigit>20) throw RangeError("must be 0<=minDigit<=20");
    if(base<2) throw RangeError("Base must be >=2")
    if(chrArr===undefined) chrArr=GetDefaultBaseStr(base);
    if(digits===0) return IntegerToBase(Math.round(n),base,chrArr);
    let rsltArr=NumberToBaseArr(n,base,digits,minDigit,chrArr);
    let rsltStr="";
    rsltArr[0].forEach(function(value){
        rsltStr=rsltStr.concat(chrArr[value]);
    });
    rsltStr+='.';
    rsltArr[1].forEach(function(value){
        rsltStr=rsltStr.concat(chrArr[value]);
    });
    return rsltStr;
}
function RomanNumeralsUnit(n){
    ({notationOption}=player)
    if(n.constructor===new Decimal().constructor) n=n.toNumber();
    if(n>3999+11/12){
        return "Format Error"
    }
    let pump=Math.pow(2,-42);
    n+=pump;
    let prefixes=[
                ["","M","MM","MMM","MMM"],
                ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],
                ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],
                ["","I","II","III","IV","V","VI","VII","VIII","XI"],
                ]
    let rslt=""
    let subPrefixes=notationOption.roman.altFractions ? [] : ["","\xb7",":","\u2234","\u2237","\u2059",];
    if(notationOption.roman.altFractions){
        subPrefixes=ConsecutiveCharacter("\xb7",6)
    }
    //console.log(subPrefixes)
    let subPrefixes2=[]
    subPrefixes.forEach(function(value,index){
        subPrefixes2=subPrefixes2.concat(["S"+subPrefixes[index]])
    });
    subPrefixes=subPrefixes.concat(subPrefixes2)
    //console.log(subPrefixes)
    let floorN=Math.floor(n)
    let remainder=Math.floor((n-floorN)*12);
    let strArray=("0000"+floorN).slice(-4).split("");
    strArray.forEach(function(value,index){
        rslt+=prefixes[index][+value]
    });
    rslt+=subPrefixes[remainder];
    return rslt;
}
function FormatValue(amount, property={}){
    ({notationOption}=player)
    if(property.notation===undefined){
        property.notation=player.notation;
    }
    const tmpOption={...{notation: player.notation}, ...property};
    let optionName=tmpOption.notation;
    if(notationOption[optionName]===undefined){
        if(["emoji"].includes(notationOption[optionName])) optionName="letters"
        else optionName="general";
    }

    let option=GetOption(property);

    if(option.htmlSafe){
        return FormatValue(amount,{...option, ...{htmlSafe: false}});
    }
    //code used by many formats
    let powMaxExp=Decimal.pow(option.base,option.maxExp);
    amount=new Decimal(amount);
    
    if(!Decimal.isFinite(amount)){
        return "Infinite";
    }
    if(Decimal.isNaN(amount)){
        return "NaN";
    }
    let eString="";
    /*
    let eCount=amount.layer-1;
    if(powMaxExp.lte(Math.abs(amount.mag))){
        eCount++;
    }
    //Number that comes after the eString
    let mNumber;
    if(eCount>=0){
        mNumber=Decimal.fromComponents(amount.sign,amount.layer-eCount,amount.mag);
    }
    //Old way of calculating eCount and mNumber. Doesn't support different bases.
    (dev.formerECountCalFunc())
    */
    //New way of calculating eCount
    let calResult= calEcountAndMnumber(amount,option.base,powMaxExp);
    let eCount=calResult.eCount;
    let mNumber=calResult.mNumber;
    if(eCount>0){
        if(option.powerTower) eString=FormatValue(eCount,{...option, smallDec:0,dec:4,maxBeforeNotate:4})+"PT"
        else if(eCount<=option.maxNotatedLayer) for(let i=0;i<eCount;i++) eString+="e";
    }
    
    //console.log("eCount: "+eCount+" mNumber: "+mNumber);
    if(!option.customNegative&&amount.sign===-1){
        return option.negativeSign+FormatValue(amount.abs(),option);
    }
    //console.log("mNumber: "+mNumber.toString());
    
    //fix 9995 formatting to 10.00e3 -> formatting to 1.00e4
    let power=amount.abs().log(option.base);
    //console.log("power: "+power.toString())
    if((["scientific","engineering","engineering-alt","letters"].includes(option.notation))){
        let cord=Math.pow(option.base,option.dec+2);
        let ford=cord-option.base/2;
        power=power.add(Math.log(cord/ford)/Math.log(option.base));
    }
    power=power.minus(option.extraDigit);
    if(["scientific","engineering","engineering-alt","logarithm","letters"].includes(option.notation)){
        if(amount.eq(0)||power.abs().lessThan(power.sign===-1 ? option.maxBeforeNegativePowerNotate : option.maxBeforeNotate))
            return NumberToBase(amount,option.base,option.smallDec)
    }
    //notations with the same code beyond ee9
    if(["scientific","engineering","engineering-alt","logarithm"].includes(option.notation)){

        //console.log(power);

        if(Decimal.MagAbs(amount).lessThan(Decimal.pow(option.base,powMaxExp))){
            if(option.notation==="scientific"){
                power=power.floor();
                if(power.lessThan(0)){
                    power=power.add(-1);
                }
                
                let mantissa=amount.div(Decimal.pow(option.base,power));
                //console.log(`amount: ${amount.toString()} power: ${power.toString()} mantissa: ${mantissa.toString()}`)
                //console.log(NumberToBase(mantissa,option.base,option.dec))
                return `${NumberToBase(mantissa,option.base,option.dec)}e${NumberToBase(power,option.base,0)}`;
            }
            if(option.notation==="engineering"){
                //console.log(power)
                power=power.abs().div(3).floor().mul(3).mul(power.sign);
                //console.log(power)
                if(power.lte(0)) power=power.add(-3);

                let mantissa=amount.div(Decimal.pow(option.base,power));
                return `${NumberToBase(mantissa,option.base,option.dec)}e${NumberToBase(power,option.base,0)}`;
            }
            if(option.notation==="engineering-alt"){
                power=power.floor();
                let rpower=power;

                power=power.add(power.sign===1 ? 2 : 0).div(3).floor().mul(3).minus(option.extraDigit);

                rpower=rpower.minus(power).toNumber();
                let mantissa=amount.div(Decimal.pow(10,power));
                return `${NumberToBase(mantissa,option.base,option.dec-rpower+(power.sign===-1))}e${power}`;
            }
            if(option.notation==="logarithm"){
                return `e${NumberToBase(power,option.base,option.dec)}`
            }
        }
        else if(Decimal.MagAbs(amount).lessThan(Decimal.fromComponents(1,option.maxNotatedLayer,powMaxExp))){
            return eString+FormatValue(mNumber,{...option, ...{dec: option.hExpDec}});
        }
        else{
            if(notationOption.general.powerTower) return eString+FormatValue(mNumber,{...option, dec: option.hExpDec});
            return `(e^${FormatValue(eCount, {...option, ...{smallDec:0,dec:3,maxBeforeNotate: option.hExpDec}})})${FormatValue(mNumber,{...option, dec:4})}`;
        }
    }
    if(["letters"].includes(option.notation)){
        power=power.abs().div(3).floor().mul(3).mul(power.sign);
        if(power.lte(0)) power=power.add(-3);
        let letterId=power.div(3).floor();
        let mantissaStr="";
        let letterStr="";
        if(power.abs().lt(powMaxExp)){
            mantissa=amount.div(Decimal.pow(10,power));
            mantissaStr=NumberToBase(mantissa,option.base,option.dec);
        }
        if(option.notation==="letters"){
            letterStr=FormatLetter(letterId,"abcdefghijklmnopqrstuvwxyz",option);
        }

        if(letterStr!="") return mantissaStr+letterStr;
    }
    if(option.notation==="inequality"){
        const convertTable={
            "-1":"<",
            "0":"=",
            "1":">"
        }
        const numArrToInequalityStrArr=function(numArr){
            let tmpArr=numArr.map(function(value){
                if(value.length<2) return [0].concat(value);
                return value;
            });
            tmpArr=tmpArr.map(function(value){
                return ArrToInequality(value);
            });
            let rsltArr=tmpArr.map(function(value){
                let rsltStr=""
                value=value.map(function(value){
                    rsltStr+=convertTable[value]
                });
                return rsltStr;
            });
            return rsltArr;
        };
        function convertToInequality(n,dec){
            let tmpArr=numArrToInequalityStrArr(NumberToBaseArr(n,option.base,dec));
            let rsltStr;
            if(tmpArr[1]===undefined) rsltStr=tmpArr[0];
            else rsltStr=tmpArr[0]+'.'+tmpArr[1];
            return rsltStr;
        }
        if(amount.eq(0)||Decimal.MagAbs(power).lt(amount.sign===-1?option.maxBeforeNegativePowerNotate:option.maxBeforeNotate)){
            return ConvertToHTMLSafe(convertToInequality(amount,option.smallDec));
        }
        if(Decimal.MagAbs(amount).lessThan(Decimal.pow(option.base,powMaxExp))){
            return ConvertToHTMLSafe('e'+convertToInequality(power,option.dec));
        }
    }
    return "Format Error";
}


function FormatTime(amount){
    const divArr=[
        60,
        60,
        24
    ]
    let wordArr=[
        "second",
        "minute",
        "hour",
        "day"
    ]
    let dividedTimeArr=[]
    let tmpAmount=amount;
    divArr.forEach(function(value,index){
        const tmpValue=tmpAmount%value;
        dividedTimeArr=dividedTimeArr.concat(tmpValue);
        tmpAmount=Math.floor(tmpAmount/value);
    });
    dividedTimeArr=dividedTimeArr.concat(tmpAmount);
    wordArr.forEach(function(value,index,array){
        if(Math.floor(dividedTimeArr[index])!==1){
            array[index]+='s'
        }
    });
    if(amount<10){
        return `${FormatValue(amount,{dec:3,smallDec:3})} ${wordArr[0]}` 
    }
    if(amount<60){
        return `${FormatValue(amount,{dec:2,smallDec:2})} ${wordArr[0]}`
    }
    if(amount<60*60){
        return `${FormatValue(dividedTimeArr[1],{dec:0,smallDec:0})} ${wordArr[1]} and ${FormatValue(dividedTimeArr[0],{dec:1,smallDec:1})} ${wordArr[0]}`
    }
    if(amount<60*60*24){
        return `${FormatValue(dividedTimeArr[2],{dec:0,smallDec:0})} ${wordArr[2]}, ${FormatValue(dividedTimeArr[1],{dec:0,smallDec:0})} ${wordArr[1]} and ${FormatValue(Math.floor(dividedTimeArr[0]),{dec:0,smallDec:0})} ${wordArr[0]}`
    }
    
    return `${FormatValue(dividedTimeArr[3],{dec:0,smallDec:0})} ${wordArr[3]}, ${FormatValue(dividedTimeArr[2],{dec:0,smallDec:0})} ${wordArr[2]}, ${FormatValue(dividedTimeArr[1],{dec:0,smallDec:0})} ${wordArr[1]} and ${FormatValue(Math.floor(dividedTimeArr[0]),{dec:0,smallDec:0})} ${wordArr[0]}`
}