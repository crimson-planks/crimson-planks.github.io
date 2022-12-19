var dev={};
dev.repeatNotification=function(amount=50){
    for(let i=0;i<amount;i++){
    $.notify("Test String");
    }
}
dev.inequalityFunc=function(len,base){
    const convertTable={
        "-1":"T",
        "0":"0",
        "1":"1"
    }
    let arr=Array(len)
    let rsltarr=[]
    for(let i=0;i<len;i++){
        arr[i]=0;
    }
    while(true){
        arr.forEach(function(value,index){
            if(index===len-1) return;
            let quotient=Math.floor(value/base);
            if(quotient!==0){
                arr[index+1]+=quotient; 
            }
            arr[index]=value%base;
        });
        if(!(arr[len-1]<base)) break;
        let ai=ArrToInequality(arr);
        let aistr=""
        ai.forEach(function(value){
            aistr=aistr.concat(convertTable[value])
        });
        rsltarr=rsltarr.concat(aistr);
        console.log(aistr);
        arr[0]+=1;
    }
    let strcount={};
    console.log(rsltarr);
    rsltarr.forEach(function(value){
        if(strcount[value]===undefined){
            strcount[value]=0;
        }
        strcount[value]++;
    });
    console.log(strcount);
}
dev.formerECountCalFunc=function(amount,powMaxExp=new Decimal("1e9")){
    amount=new Decimal(amount);
    let eCount=amount.layer-1;
    if(powMaxExp.lte(Math.abs(amount.mag))){
        eCount++;
    }
    let mNumber=Decimal.fromComponents(amount.sign,amount.layer-eCount,amount.mag);
    return {eCount: eCount,mNumber: mNumber};
}
dev.compareECount=function(array){
    //[2,3,4,"1e8","1e9","ee9",new Decimal("10pt7")]
    let wrongcount=0;
    array=array.map(function(value){
        return new Decimal(value);
    });
    array.forEach(function(value){
        let a=dev.formerECountCalFunc(value).eCount;
        let b=calEcountAndMnumber(value,10).eCount;
        if(a!==b){
            console.log(`%cwrong: ${value}`,"color: red; font-size: 30px");
            wrongcount++;
        };
        //console.log(`former: ${a} latest: ${b}`)
    });
    return {correct: array.length-wrongcount,wrong: wrongcount}
}
dev.addEventListener=function(key,func){
    window.addEventListener('keydown', function (e) {
        if(e.key.toLowerCase()==key){
            func();
        }
      }, false);
}