//Warning: bugs, lots of bugs.
//dependent on ../js/components/notation.js
let clickerHeroesList=["K","M","B","T","q","Q","s","S","O","N","d","U","D","!","@","#","$","%","^","&","*","[","}","\'","\"","/","|",":",";","<",">",",",".","\\","?","~","\xb1","a","A","\xe1","\xc1","\xe9","\xc9","\xed","\xcd","\xfa","\xda","\xe6","\xc6","\xd8","\xbf","\xb6","\u0192","\xa3","\u20a3","\u20bf","\u20ac","\u20b2","h",0,"j","J","p","P","w","\u20a9","v","V","y","\xa5","\xa4","\u2211","\xae","\u2020","\xa8","\u0131","\u03c0","\xdf","\u2202","\xa9","\u03bb","\u03a9","\u2248","\xe7","\u221a","\u222b","\u2122","\u2021","\u0130","\u220f","\u2206","\xc7","\u25ca","\xab","\xbb","\u2227","\u2229","\u22bb","\xf1","\xd1","C","\u0393","\u221e","\u03b1","\u03b3","\u03b4","\u03b5","\u03b6","\u03b8","\u03bb","\u03be","\u03c4","\u03c5","\u03c6","\u03c7","\u03c8","\u039e","\u03a6","\u2192","\u2190","\u2191","\u2193","\u272a","+","-","\xd7","\xf7","\u2573","\u2660","\u2665","\u2666","\u2663","\u24b6","\u24b7","\u24b8","\u24b9","\u24ba","\u24bb","\u24bc","\u24bd","\u24be","\u24bf","\u24c0","\u24c1","\u24c2","\u24c3","\u24c4","\u24c5","\u24c6","\u24c7","\u24c8","\u24c9","\u24ca","\u24cb","\u24cc","\u24cd","\u24ce","\u24cf","\u2070","\xb9","\xb2","\xb3","\u2074","\u2075","\u2076","\u2077","\u2078","\u2079","\u207a","\u207b","\u207c","\u207d","\u207e","\u2220","\u29a3","\xb0","\u27c2","\u2225","\u221f","\ud83c\udd30","\ud83c\udd31","\ud83c\udd32","\ud83c\udd33","\ud83c\udd34","\ud83c\udd35","\ud83c\udd36","\ud83c\udd37","\ud83c\udd38","\ud83c\udd39","\ud83c\udd3a","\ud83c\udd3b","\ud83c\udd3c","\ud83c\udd3d","\ud83c\udd3e","\ud83c\udd3f","\ud83c\udd40","\ud83c\udd41","\ud83c\udd42","\ud83c\udd43","\ud83c\udd44","\ud83c\udd45","\ud83c\udd46","\ud83c\udd47","\ud83c\udd48","\ud83c\udd49",]
const MAX_ECOUNT_CAL=8;
function RepeatArr(func,n){
    let arr=Array(n)
    for(let i=0;i<n;i++){
        arr[i]=func(i);
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
    let rsltarr=Array(arr.length);
    arr.forEach(function(value,index,array){
        if(index!==array.length-1) rsltarr[index]=BigInt.cmp(array[index],array[index+1]);
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
    let skippedAmount=rsltLen.minus(option.show);
    ({eCount,mNumber}=calEcountAndMnumber(skippedAmount,option.base,option.powMaxExp));
    console.log(skippedAmount);
    console.log(eCount);
    if(n.absLog10().lt(powMaxExp)){
        //console.log("skippedAmount: "+skippedAmount)
        let isSkipped=rsltLen.gt(option.maxFullShow);
        //console.log("isSkipped: "+isSkipped+" maxfullshow: "+option.maxFullShow)
        if(isSkipped){
            n=n.div(Decimal.pow(len,skippedAmount)).floor();
            //console.log(n);
            resultString=`[${FormatValue(skippedAmount, { notation: option.notation, smallDec: 0 })}]`
        }
        while(n.gt(0)){
            resultString=str[(n-1)%len]+resultString;
            n=n.minus(1).div(len).floor();
            //console.log(n.toString());
        }
        if(isNegative) resultString=option.negativeSign+resultString;
        return resultString;
    }
    else if(n.absLog10().absLog10().lt(powMaxExp)){
        resultString=`[${FormatValue(skippedAmount, { notation: option.notation, smallDec: 0 })}]${eCount}`;
        return resultString;
    }
    else{
        resultString=`[${FormatValue(skippedAmount, { notation: option.notation, smallDec: 0 })}]${eCount}`;
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
    if(!(["string","object"].includes(typeof chrArr))) chrArr=GetDefaultBaseStr(base);
    if(chrArr.length<base){
        throw RangeError("chrArr.length must be larger or equal to base");
    }
    if(n<0){
        isNegative=true;
        n=-n;
    }
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
        n=n/base;
    }
    if(isArr) return tmpString;
    return (isNegative?'-':'')+tmpString;
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
    let isNegative=false;
    if(n<0) {
        isNegative=true;
        n=-n;
    }
    if(minDigit===undefined) minDigit=digits;
    if(digits<0||digits>20) throw RangeError("must be 0<=digits<=20");
    if(minDigit<0||minDigit>20) throw RangeError("must be 0<=minDigit<=20");
    if(base<2) throw RangeError("Base must be >=2")
    if(chrArr===undefined) chrArr=GetDefaultBaseStr(base);
    if(digits===0) return (isNegative?'-':'')+IntegerToBase(Math.round(n),base,chrArr);
    let rsltArr=NumberToBaseArr(n,base,digits,minDigit,chrArr);
    let rsltStr="";
    rsltArr[0].forEach(function(value){
        rsltStr=rsltStr.concat(chrArr[value]);
    });
    rsltStr+='.';
    rsltArr[1].forEach(function(value){
        rsltStr=rsltStr.concat(chrArr[value]);
    });
    if(isNegative) rsltStr='-'.concat(rsltStr);
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
    if((["scientific","engineering","engineering-alt","letters","seximal"].includes(option.notation))){
        let cord=Math.pow(option.base,option.dec+2);
        let ford=cord-option.base/2;
        power=power.add(Math.log(cord/ford)/Math.log(option.base));
    }
    power=power.minus(option.extraDigit);
    if(["scientific","engineering","engineering-alt","logarithm","letters","seximal"].includes(option.notation)){
        if(amount.eq(0)||power.abs().lessThan(power.sign===-1 ? option.maxBeforeNegativePowerNotate : option.maxBeforeNotate))
            return NumberToBase(amount,option.base,option.smallDec)
    }
    //notations with the same code beyond ee9
    if(["scientific","engineering","engineering-alt","logarithm"].includes(option.notation)){

        //console.log(power);

        if(Decimal.MagAbs(amount).lessThan(Decimal.pow(option.base,powMaxExp))){
            if(option.notation==="scientific"){
                power=power.floor();
                if(power.lt(0)){
                    power=power.add(-1);
                }
                
                let mantissa=amount.div(Decimal.pow(option.base,power));
                //console.log(`amount: ${amount.toString()} power: ${power.toString()} mantissa: ${mantissa.toString()}`)
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
    if(option.notation==="seximal"){
        power=power.abs().div(4).floor().mul(4).mul(power.sign);
        if(power.lte(0)) power=power.add(-4);
        let id=power.div(4);
        let mantissa=amount.div(Decimal.pow(option.base,power));
        let powerStr=NumberToBase(id,option.base,0,0,["N","U","B","T","Q","P"]);
        
        return `${NumberToBase(mantissa,option.base,option.dec)} ${powerStr}`
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